
/* narrator.js — Voices+ (naturaliser) */
class Narrator {
  constructor() {
    this.voices = [];
    this.selectedVoiceName = localStorage.getItem("voice.name") || "";
    this.forceEnglish = localStorage.getItem("voice.forceEnglish") === "true";
    this.rate = parseFloat(localStorage.getItem("voice.rate") || "0.95");
    this.pitch = parseFloat(localStorage.getItem("voice.pitch") || "1.0");
    this.pauseMs = parseInt(localStorage.getItem("voice.pauseMs") || "220", 10);
    this.isSpeaking = false;
    this.queue = [];
    this.currentUtterance = null;

    this.preferredEnglishNames = [
      "Microsoft Sonia Online (Natural) - English (United Kingdom)",
      "Microsoft Ryan Online (Natural) - English (United Kingdom)",
      "Microsoft Libby Online (Natural) - English (United Kingdom)",
      "Microsoft Thomas Online (Natural) - English (United Kingdom)",
      "Google UK English Female",
      "Google UK English Male",
      "Google English (Great Britain)",
      "Daniel","Serena","Moira","Samantha"
    ];

    this.bindUI();
    this.initVoices();
  }

  bindUI() {
    this.$select = document.getElementById("voiceSelect");
    this.$test = document.getElementById("testVoiceBtn");
    this.$force = document.getElementById("forceEnglish");
    this.$stop  = document.getElementById("stopNarrationBtn");
    this.$rate  = document.getElementById("rateSlider");
    this.$pitch = document.getElementById("pitchSlider");
    this.$pause = document.getElementById("pauseSlider");
    this.$preset= document.getElementById("naturalPresetBtn");

    if (this.$force) {
      this.$force.checked = this.forceEnglish;
      this.$force.addEventListener("change", () => {
        this.forceEnglish = !!this.$force.checked;
        localStorage.setItem("voice.forceEnglish", String(this.forceEnglish));
      });
    }

    const saveFloat = (key, val) => localStorage.setItem(key, String(val));

    if (this.$rate) {
      this.$rate.value = this.rate;
      this.$rate.addEventListener("input", () => {
        this.rate = parseFloat(this.$rate.value);
        saveFloat("voice.rate", this.rate);
      });
    }
    if (this.$pitch) {
      this.$pitch.value = this.pitch;
      this.$pitch.addEventListener("input", () => {
        this.pitch = parseFloat(this.$pitch.value);
        saveFloat("voice.pitch", this.pitch);
      });
    }
    if (this.$pause) {
      this.$pause.value = this.pauseMs;
      this.$pause.addEventListener("input", () => {
        this.pauseMs = parseInt(this.$pause.value, 10);
        localStorage.setItem("voice.pauseMs", String(this.pauseMs));
      });
    }

    if (this.$preset) {
      this.$preset.addEventListener("click", () => {
        this.rate = 0.95;
        this.pitch = 1.0;
        this.pauseMs = 260;
        if (this.$rate) this.$rate.value = this.rate;
        if (this.$pitch) this.$pitch.value = this.pitch;
        if (this.$pause) this.$pause.value = this.pauseMs;
        localStorage.setItem("voice.rate", String(this.rate));
        localStorage.setItem("voice.pitch", String(this.pitch));
        localStorage.setItem("voice.pauseMs", String(this.pauseMs));
      });
    }

    if (this.$test) {
      this.$test.addEventListener("click", () => {
        const voice = this.getSelectedVoice();
        const sample = this.forceEnglish
          ? "Hello. This is the natural voice test. Does this sound smoother to you?"
          : "Hello. This is the natural voice test. Does this sound smoother to you?";
        this.speak(sample, { interrupt: true, voice });
      });
    }

    if (this.$stop) {
      this.$stop.addEventListener("click", () => this.stop(true));
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
        this.voices = got.slice().sort((a,b)=> (a.name||"").localeCompare(b.name||""));
        this.populateSelect();
        return true;
      }
      return false;
    };
    if (!tryPopulate()) {
      window.speechSynthesis.onvoiceschanged = () => tryPopulate();
      setTimeout(()=>tryPopulate(), 400);
      setTimeout(()=>tryPopulate(), 1200);
      setTimeout(()=>tryPopulate(), 2400);
    }
  }

  populateSelect() {
    if (!this.$select) return;
    this.$select.innerHTML = "";
    const makeOpt = (v) => {
      const o = document.createElement("option");
      o.value = v.name;
      o.textContent = `${v.name} — ${v.lang}${v.default?" (default)":""}`;
      return o;
    };
    this.voices.forEach(v => this.$select.appendChild(makeOpt(v)));
    const saved = this.selectedVoiceName;
    if (saved && this.voices.find(v=>v.name===saved)) {
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
    for (const name of this.preferredEnglishNames) {
      const found = this.voices.find(v=>v.name===name);
      if (found) return found;
    }
    const gb = this.voices.find(v => /^en[-_](GB|UK)/i.test(v.lang));
    if (gb) return gb;
    return this.voices.find(v => /^en[-_]/i.test(v.lang));
  }
  getSelectedVoice() {
    const name = (this.$select && this.$select.value) || this.selectedVoiceName;
    return this.voices.find(v => v.name === name) || null;
  }

  speak(text, opts = {}) {
    const { interrupt=false, voice=null, rate=null, pitch=null, volume=1.0 } = opts;
    if (!text || typeof text !== "string") return;
    if (interrupt) this.stop(false);

    const u = new SpeechSynthesisUtterance(text);
    const chosen = voice || this.getSelectedVoice();
    if (chosen) u.voice = chosen;
    u.lang = this.forceEnglish
      ? (this.voices.find(v=>/^en[-_](GB|UK)/i.test(v.lang))?.lang || "en-GB")
      : (chosen?.lang || u.lang);

    u.rate  = rate?? this.rate;
    u.pitch = pitch?? this.pitch;
    u.volume= volume;

    u.onstart = () => { this.isSpeaking = true; this.currentUtterance=u; document.body.classList.add("is-speaking"); };
    const finish = () => {
      this.isSpeaking = false; this.currentUtterance=null; document.body.classList.remove("is-speaking");
      const next = this.queue.shift();
      if (next) {
        if (next.pause) {
          setTimeout(()=> this.speak(next.text, next.opts), next.pause);
        } else {
          this.speak(next.text, next.opts);
        }
      }
    };
    u.onend = finish; u.onerror = finish;
    try { speechSynthesis.speak(u); } catch(e){ console.error(e); finish(); }
  }

  readNaturally(longText) {
    if (!longText) return;
    const parts = this.segment(longText);
    // queue with pauses
    parts.forEach((p, idx) => {
      const opts = { interrupt:false };
      this.queue.push({ text: p, opts, pause: idx===0?0:this.pauseMs });
    });
    if (!this.isSpeaking) {
      const first = this.queue.shift();
      if (first) {
        if (first.pause) setTimeout(()=> this.speak(first.text, first.opts), first.pause);
        else this.speak(first.text, first.opts);
      }
    }
  }

  segment(t) {
    // split on sentence-ish boundaries, keep punctuation
    const parts = t.split(/(?<=[\.\?\!])\s+(?=[A-Z0-9])/).map(s=>s.trim()).filter(Boolean);
    return parts.length ? parts : [t];
  }

  stop(cancelQueueToo=true) {
    try { speechSynthesis.cancel(); } catch(e){}
    this.isSpeaking=false; this.currentUtterance=null; document.body.classList.remove("is-speaking");
    if (cancelQueueToo) this.queue = [];
  }
}
export const narrator = new Narrator();
window.narrator = narrator;
