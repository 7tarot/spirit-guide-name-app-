
/* narrator.js — Spirit Guide App voice module (drop-in)
 * Restores: voice selector, Test Voice, Force English, reliable Stop.
 * Usage:
 *  1) Include <link rel="stylesheet" href="patch/voices.css">
 *  2) Include <script type="module" src="patch/narrator.js"></script>
 *  3) Add the HTML snippet (see reference/index_voice_snippet.html) where you want the controls.
 */

class Narrator {
  constructor() {
    this.voices = [];
    this.selectedVoiceName = localStorage.getItem("voice.name") || "";
    this.forceEnglish = localStorage.getItem("voice.forceEnglish") === "true";
    this.isSpeaking = false;
    this.queue = [];
    this.currentUtterance = null;

    // Preferred English voices in order (browser/platform dependent).
    this.preferredEnglishNames = [
      "Microsoft Sonia Online (Natural) - English (United Kingdom)",
      "Microsoft Ryan Online (Natural) - English (United Kingdom)",
      "Microsoft Libby Online (Natural) - English (United Kingdom)",
      "Google UK English Female",
      "Google UK English Male",
      "Google English (Great Britain)",
      "Daniel", // macOS
      "Moira",  // macOS
      "Samantha" // macOS/US
    ];

    this.bindUI();
    this.initVoices();
  }

  bindUI() {
    this.$select = document.getElementById("voiceSelect");
    this.$test = document.getElementById("testVoiceBtn");
    this.$force = document.getElementById("forceEnglish");
    this.$stop  = document.getElementById("stopNarrationBtn");

    if (this.$force) {
      this.$force.checked = this.forceEnglish;
      this.$force.addEventListener("change", () => {
        this.forceEnglish = !!this.$force.checked;
        localStorage.setItem("voice.forceEnglish", String(this.forceEnglish));
      });
    }

    if (this.$test) {
      this.$test.addEventListener("click", () => {
        const voice = this.getSelectedVoice();
        const sample = this.forceEnglish
          ? "Hello. This is a test of the selected voice in English. How do I sound?"
          : "Hello. This is a test of the selected voice. How do I sound?";
        this.speak(sample, { interrupt: true, voice });
      });
    }

    if (this.$stop) {
      this.$stop.addEventListener("click", () => {
        this.stop(true);
      });
    }

    if (this.$select) {
      this.$select.addEventListener("change", () => {
        const val = this.$select.value;
        localStorage.setItem("voice.name", val);
      });
    }
  }

  initVoices() {
    const tryPopulate = () => {
      const got = speechSynthesis.getVoices();
      if (got && got.length) {
        this.voices = got.slice().sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        this.populateSelect();
        return true;
      }
      return false;
    };

    if (!tryPopulate()) {
      // Some browsers only populate voices after this event
      window.speechSynthesis.onvoiceschanged = () => {
        tryPopulate();
      };
      // Safari sometimes needs a nudge
      setTimeout(() => tryPopulate(), 400);
      setTimeout(() => tryPopulate(), 1200);
      setTimeout(() => tryPopulate(), 2400);
    }
  }

  populateSelect() {
    if (!this.$select) return;
    this.$select.innerHTML = "";

    const makeOpt = (v) => {
      const o = document.createElement("option");
      o.value = v.name;
      o.textContent = `${v.name}  —  ${v.lang}${v.default ? " (default)" : ""}`;
      return o;
    };

    this.voices.forEach(v => this.$select.appendChild(makeOpt(v)));

    // Restore last selection, else auto-pick a nice English voice
    const saved = this.selectedVoiceName;
    if (saved && this.voices.find(v => v.name === saved)) {
      this.$select.value = saved;
    } else {
      const fallback = this.pickPreferredEnglish() || this.voices[0];
      if (fallback) {
        this.$select.value = fallback.name;
        localStorage.setItem("voice.name", fallback.name);
      }
    }
  }

  pickPreferredEnglish() {
    // First: exact name match
    for (const name of this.preferredEnglishNames) {
      const found = this.voices.find(v => v.name === name);
      if (found) return found;
    }
    // Second: any voice with en-GB or en_ prefix
    const gb = this.voices.find(v => /^en[-_](GB|UK)/i.test(v.lang));
    if (gb) return gb;
    // Third: any English
    return this.voices.find(v => /^en[-_]/i.test(v.lang));
  }

  getSelectedVoice() {
    const name = (this.$select && this.$select.value) || this.selectedVoiceName;
    return this.voices.find(v => v.name === name) || null;
  }

  speak(text, opts = {}) {
    const { interrupt = false, voice = null, rate = 1.0, pitch = 1.0, volume = 1.0 } = opts;
    if (!text || typeof text !== "string") return;

    if (interrupt) {
      this.stop(false); // cancel the queue but don't flip UI twice
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const chosen = voice || this.getSelectedVoice();
    if (chosen) utterance.voice = chosen;

    // Respect Force English if set
    if (this.forceEnglish) {
      // Prefer UK English if available
      const enGb = this.voices.find(v => /^en[-_](GB|UK)/i.test(v.lang));
      utterance.lang = enGb ? enGb.lang : "en-GB";
    } else if (chosen && chosen.lang) {
      utterance.lang = chosen.lang;
    }

    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.currentUtterance = utterance;
      document.body.classList.add("is-speaking");
    };
    const finish = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      document.body.classList.remove("is-speaking");
      // Continue the queue if any
      const next = this.queue.shift();
      if (next) this.speak(next.text, next.opts);
    };
    utterance.onend = finish;
    utterance.onerror = finish;

    try {
      speechSynthesis.speak(utterance);
    } catch (e) {
      console.error("speechSynthesis error:", e);
      finish();
    }
  }

  readBlocks(blocks, opts = {}) {
    // blocks: string[] — pushes multiple chunks to the queue
    if (!Array.isArray(blocks) || !blocks.length) return;
    // Start with a disclaimer, once
    const disclaimerShown = localStorage.getItem("voice.disclaimerShown") === "true";
    if (!disclaimerShown) {
      const disclaimer = "Spiritual and numerological content is for guidance only. Always use your own judgement.";
      this.queue.push({ text: disclaimer, opts: { interrupt: false } });
      localStorage.setItem("voice.disclaimerShown", "true");
    }
    blocks.forEach(b => this.queue.push({ text: b, opts }));
    if (!this.isSpeaking) {
      const first = this.queue.shift();
      if (first) this.speak(first.text, first.opts);
    }
  }

  stop(cancelQueueToo = true) {
    try {
      speechSynthesis.cancel();
    } catch (e) {
      console.warn("cancel error", e);
    }
    this.isSpeaking = false;
    this.currentUtterance = null;
    document.body.classList.remove("is-speaking");
    if (cancelQueueToo) this.queue = [];
  }
}

// Expose a singleton
export const narrator = new Narrator();
window.Narrator = Narrator;
window.narrator = narrator;
