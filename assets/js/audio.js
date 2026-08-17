/* 
   Aquaway Tours — Background Music Controller
   Handles premium ambient audio across the site.
*/
'use strict';

class AudioController {
  constructor() {
    this.isPlaying = false;
    this.audio = null;
    this.toggleBtn = null;
    this.prefKey = "aqw_music_enabled";
    this.init();
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => {
      this.createElements();
      this.setupListeners();
      this.restorePreference();
    });
  }

  createElements() {
    const isSubPage = window.location.pathname.includes("/trips/");
    const audioPath = "/assets/3.mp3";

    this.audio = document.createElement("audio");
    this.audio.id = "bg-music";
    this.audio.src = audioPath;
    this.audio.loop = true;
    this.audio.preload = "auto";
    document.body.appendChild(this.audio);

    this.toggleBtn = document.createElement("div");
    this.toggleBtn.id = "music-toggle";
    this.toggleBtn.setAttribute("role", "button");
    this.toggleBtn.setAttribute("aria-label", "Toggle Background Music");
    this.toggleBtn.setAttribute("tabindex", "0");
    this.toggleBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>`;
    this.toggleBtn.title = "Toggle Background Music";
    document.body.appendChild(this.toggleBtn);
  }

  setupListeners() {
    this.toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggle();
    });

    document.addEventListener("click", () => {
      if (!this.isPlaying && localStorage.getItem(this.prefKey) !== "false") {
        this.play();
      }
    }, { once: true });
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
      localStorage.setItem(this.prefKey, "false");
    } else {
      this.play();
      localStorage.setItem(this.prefKey, "true");
    }
  }

  play() {
    if (!this.audio) return;
    this.audio.play().then(() => {
      this.isPlaying = true;
      if (this.toggleBtn) this.toggleBtn.classList.add("playing");
    }).catch(() => {});
  }

  pause() {
    if (!this.audio) return;
    this.audio.pause();
    this.isPlaying = false;
    if (this.toggleBtn) this.toggleBtn.classList.remove("playing");
  }

  restorePreference() {
    const pref = localStorage.getItem(this.prefKey);
    if (pref === "true" || pref === null) {
      document.addEventListener("click", () => {
        if (!this.isPlaying) this.play();
      }, { once: true });
    }
  }
}

// Global instance
window.aquawayMusic = new AudioController();
