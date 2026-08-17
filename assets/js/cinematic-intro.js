/**
 * 🎬 AQUAWAY TOURS — 3-SECOND HOLLYWOOD CINEMATIC BRAND FILM & STUDIO IDENT
 * ===========================================================================
 * Master Film Production Engine v9.0 [Hollywood Feature Director Standard]
 *
 * Story Arc:
 *   ONE WOMAN · ONE JOURNEY · ONE MEMORY · ONE ICONIC BRAND
 *
 * The 3-Second Master Timeline:
 *   0.00–0.45s: SHOT 01 — ESCAPE (Passport grab, eye reflection, door flood) ─────────► ☀️ GOLD OVEREXPOSURE
 *   0.45–0.75s: SHOT 02 — FLIGHT (Airplane window, clouds part, sea reveal) ────────► 🌊 CLOUDS TO SEA MATCH
 *   0.75–1.10s: SHOT 03 — RED SEA (Yacht bow, wind in hair, camera dive) ───────────► 💧 WATER DIVE MATCH
 *   1.10–1.40s: SHOT 04 — UNDERWATER (Caustics, dolphin pass, camera tilts up) ─────► ☀️ SUNBURST OVEREXPOSURE
 *   1.40–1.70s: SHOT 05 — DESERT (Sahara dunes, 4x4 ridge, sand whip across lens) ──► 🏜️ SAND WHIP MATCH
 *   1.70–2.05s: SHOT 06 — PYRAMIDS (Great Giza Pyramids, golden haze, awe) ─────────► 🏛️ SUNLIGHT MATCH
 *   2.05–2.30s: SHOT 07 — LUXOR (Ancient pillars, hand on stone, Nile reflection) ──► 🌅 NILE REFLECTION
 *   2.30–2.65s: THE MEMORY (Eye -> Sea -> Underwater -> Desert -> Pyramids -> Eye) ─► ⚡ ACCELERATED CUTS
 *   2.65–2.95s: THE TRANSFORMATION (Sudden Silence, gold stardust field, camera fly)► ✨ PARTICLE VORTEX
 *   2.95–3.35s: AQUAWAY TOURS (Studio Ident, royal gold edge light, light sweep) ──► 👑 ICONIC CREST
 *   3.35–3.50s: FINAL IMPACT (Light impact boom, fly-through into live website) ─────► 🚀 HOMEPAGE HERO
 *
 * Audio: Multi-layer Web Audio Cinematic Trailer Sound Studio + Live Site Audio Sync
 */
(function AquawayHollywoodMaster() {
  'use strict';

  /* ─── 1. CORE PARAMETERS ─── */
  var TOTAL_DURATION  = 3000;   // Exactly 3.00 Seconds
  var RETURN_DURATION =  850;   // 0.85s on repeat visits
  var SKIP_ANIM_TIME  =  300;   // 300ms fast exit on skip
  var STORAGE_KEY     = 'aqw_hollywood_seen_v9';

  var COLORS = {
    black:        '#000000',
    deepNavy:     '#020612',
    spaceBlue:    '#04091a',
    goldRoyal:    '#D4AF37',
    goldBright:   '#FFD700',
    goldChampagne:'#F5E7B2',
    goldDark:     '#8c6d1d',
    turquoise:    '#00B8C8',
    aqua:         '#00D5E8',
    warmWhite:    '#FFF9EA'
  };

  /* ─── 2. RUNTIME CHECKS ─── */
  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var isReturning = false;
  try {
    isReturning = sessionStorage.getItem(STORAGE_KEY) === '1';
  } catch (e) {}

  var isIndexPage = (function () {
    var p = window.location.pathname;
    return p === '/' || p.endsWith('/index.html') ||
      p.endsWith('.tours/') || p === '';
  })();

  if (!isIndexPage) return;

  function getBasePath() {
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
      var s = scripts[i];
      if (s.src && s.src.indexOf('cinematic-intro') !== -1) {
        return s.src.replace(/assets\/js\/cinematic-intro\.js.*/, '');
      }
    }
    return './';
  }
  var BASE_URL = getBasePath();
  var AUDIO_URL = BASE_URL + 'assets/3.mp3';

  /* ─── 3. EASING CURVES ─── */
  var Ease = {
    inCubic:    function(t) { return t * t * t; },
    outCubic:   function(t) { return 1 - Math.pow(1 - t, 3); },
    inOutCubic: function(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; },
    outExpo:    function(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); },
    inExpo:     function(t) { return t === 0 ? 0 : Math.pow(2, 10 * t - 10); }
  };

  function lerp(a, b, t)    { return a + (b - a) * t; }
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function norm(v, lo, hi)  { return clamp((v - lo) / (hi - lo), 0, 1); }

  /* ─── 4. THEATRICAL TRAILER SOUND DESIGN (WEB AUDIO + SITE MUSIC) ─── */
  var AudioEngine = (function() {
    var bgAudio = null;
    var ctx = null;
    var masterGain = null;
    var isMuted = false;
    var cues = {
      sub: false,
      plane: false,
      ocean: false,
      underwater: false,
      desert: false,
      pyramids: false,
      luxor: false,
      whips: {},
      silence: false,
      impact: false
    };

    function initAudio() {
      if (!bgAudio) {
        bgAudio = new Audio(AUDIO_URL);
        bgAudio.loop = false;
        bgAudio.volume = 0.82;
        bgAudio.preload = 'auto';
        var p = bgAudio.play();
        if (p !== undefined) {
          p.catch(function() {});
        }
        // Auto-fade and stop intro audio at exactly 3 seconds
        setTimeout(function() {
          if (!bgAudio) return;
          var fadeSteps = 20;
          var fadeInterval = setInterval(function() {
            if (!bgAudio || bgAudio.paused) { clearInterval(fadeInterval); return; }
            bgAudio.volume = Math.max(0, bgAudio.volume - (0.82 / fadeSteps));
            if (bgAudio.volume <= 0) {
              bgAudio.pause();
              bgAudio.currentTime = 0;
              clearInterval(fadeInterval);
            }
          }, 15);
        }, 2700); // Start fading 300ms before the 3s mark
      }

      if (!ctx) {
        try {
          var AudioCtx = window.AudioContext || window.webkitAudioContext;
          if (AudioCtx) {
            ctx = new AudioCtx();
            masterGain = ctx.createGain();
            masterGain.gain.setValueAtTime(isMuted ? 0 : 0.85, ctx.currentTime);
            masterGain.connect(ctx.destination);
          }
        } catch (e) {}
      }
    }

    function ensureRunning() {
      if (bgAudio && bgAudio.paused && !isMuted) {
        bgAudio.play().catch(function() {});
      }
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().catch(function() {});
      }
    }

    // 0.00s Low Cinematic Rumble (38Hz)
    function playSubRumble() {
      if (!ctx || isMuted || cues.sub) return;
      cues.sub = true;
      ensureRunning();
      try {
        var now = ctx.currentTime;
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(38, now);
        osc.frequency.exponentialRampToValueAtTime(62, now + 1.2);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.60, now + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 1.9);
      } catch (e) {}
    }

    // 0.45s Air Turbine Swell
    function playPlaneWhoosh() {
      if (!ctx || isMuted || cues.plane) return;
      cues.plane = true;
      ensureRunning();
      try {
        var now = ctx.currentTime;
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        var flt = ctx.createBiquadFilter();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(68, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.35);
        flt.type = 'lowpass';
        flt.frequency.setValueAtTime(240, now);
        flt.frequency.exponentialRampToValueAtTime(1200, now + 0.3);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.35, now + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.connect(flt);
        flt.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.5);
      } catch (e) {}
    }

    // 0.75s Ocean Swell
    function playOceanSwell() {
      if (!ctx || isMuted || cues.ocean) return;
      cues.ocean = true;
      ensureRunning();
      try {
        var now = ctx.currentTime;
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.linearRampToValueAtTime(140, now + 0.35);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.30, now + 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.5);
      } catch (e) {}
    }

    // 1.10s Underwater Muffled Dive
    function playUnderwaterFilter() {
      if (!ctx || isMuted || cues.underwater) return;
      cues.underwater = true;
      ensureRunning();
      try {
        var now = ctx.currentTime;
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(90, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.3);
        gain.gain.setValueAtTime(0.40, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.4);
      } catch (e) {}
    }

    // 1.70s Pyramids Cinematic Low Impact (55Hz)
    function playPyramidsImpact() {
      if (!ctx || isMuted || cues.pyramids) return;
      cues.pyramids = true;
      ensureRunning();
      try {
        var now = ctx.currentTime;
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(55, now);
        osc.frequency.exponentialRampToValueAtTime(32, now + 0.45);
        gain.gain.setValueAtTime(0.55, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.6);
      } catch (e) {}
    }

    // 2.30s Fast Acoustic Whip on Memory Cut
    function playMemoryWhip(id) {
      if (!ctx || isMuted || cues.whips[id]) return;
      cues.whips[id] = true;
      ensureRunning();
      try {
        var now = ctx.currentTime;
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(780, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.06);
        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.08);
      } catch (e) {}
    }

    // 2.65s Sudden Silence Drop (Pre-Climax Tension)
    function playSilenceDrop() {
      if (!ctx || isMuted || cues.silence) return;
      cues.silence = true;
      try {
        var now = ctx.currentTime;
        masterGain.gain.cancelScheduledValues(now);
        masterGain.gain.setValueAtTime(masterGain.gain.value, now);
        masterGain.gain.exponentialRampToValueAtTime(0.05, now + 0.12);
        masterGain.gain.setValueAtTime(0.85, now + 0.30);
      } catch (e) {}
    }

    // 2.95s Master Logo Impact (380Hz -> 38Hz + Crystal Anamorphic Chime)
    function playLogoImpact() {
      if (!ctx || isMuted || cues.impact) return;
      cues.impact = true;
      ensureRunning();
      try {
        var now = ctx.currentTime;

        // Sub Impact Boom
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(380, now);
        osc.frequency.exponentialRampToValueAtTime(36, now + 0.55);
        gain.gain.setValueAtTime(0.85, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.9);

        // Crystal Anamorphic Shimmer
        var chime = ctx.createOscillator();
        var chimeG = ctx.createGain();
        chime.type = 'sine';
        chime.frequency.setValueAtTime(1760, now);
        chime.frequency.exponentialRampToValueAtTime(2637, now + 0.6);
        chimeG.gain.setValueAtTime(0.20, now);
        chimeG.gain.exponentialRampToValueAtTime(0.001, now + 0.75);
        chime.connect(chimeG);
        chimeG.connect(masterGain);
        chime.start(now);
        chime.stop(now + 0.8);
      } catch (e) {}
    }

    function toggleMute(btnEl) {
      isMuted = !isMuted;
      if (bgAudio) {
        bgAudio.muted = isMuted;
        if (!isMuted && bgAudio.paused) bgAudio.play().catch(function() {});
      }
      if (masterGain && ctx) {
        masterGain.gain.setValueAtTime(isMuted ? 0 : 0.85, ctx.currentTime);
      }
      if (btnEl) {
        btnEl.setAttribute('aria-label', isMuted ? 'Unmute intro' : 'Mute intro');
        btnEl.innerHTML = isMuted
          ? '<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>'
          : '<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>';
      }
    }

    function handoffToWebsite() {
      if (window.aquawayMusic && typeof window.aquawayMusic.play === 'function') {
        try {
          if (bgAudio) {
            bgAudio.pause();
          }
          if (!isMuted) {
            window.aquawayMusic.play();
          }
        } catch (e) {}
      }
    }

    return {
      init: initAudio,
      sub: playSubRumble,
      plane: playPlaneWhoosh,
      ocean: playOceanSwell,
      underwater: playUnderwaterFilter,
      pyramids: playPyramidsImpact,
      whip: playMemoryWhip,
      silence: playSilenceDrop,
      impact: playLogoImpact,
      ensureRunning: ensureRunning,
      toggleMute: toggleMute,
      handoff: handoffToWebsite
    };
  })();

  /* ─── 5. STORY ASSETS ─── */
  var STORY_SHOTS = [
    { id: 'escape',    src: BASE_URL + 'assets/images/airport1.webp', title: 'THE ESCAPE',         geo: 'DEPARTURE · GOLDEN HOUR' },
    { id: 'flight',    src: BASE_URL + 'assets/images/airport2.webp', title: 'THE FLIGHT',         geo: '32,000 FT · OVER EGYPT' },
    { id: 'redsea',    src: BASE_URL + 'assets/images/gallery-1.webp', title: 'THE RED SEA',       geo: '27.2579°N 33.8116°E · HURGHADA' },
    { id: 'undersea',  src: BASE_URL + 'assets/images/dol1.webp',      title: 'UNDERWATER KINGDOM', geo: 'GIFTUN ISLANDS · RED SEA' },
    { id: 'desert',    src: BASE_URL + 'assets/images/camel1.webp',    title: 'THE SAHARA',        geo: 'EASTERN DESERT · EGYPT' },
    { id: 'pyramids',  src: BASE_URL + 'assets/images/pyramids.webp',  title: 'THE GREAT PYRAMIDS',geo: 'GIZA PLATEAU · CAIRO' },
    { id: 'luxor',     src: BASE_URL + 'assets/images/luxor.webp',     title: 'ANCIENT LUXOR',     geo: 'KARNAK TEMPLE · NILE VALLEY' },
    { id: 'finalhero', src: BASE_URL + 'assets/images/why.jpg',        title: 'THE DISCOVERY',     geo: 'AQUAWAY LUXURY TRAVEL' },
    { id: 'logo',      src: BASE_URL + 'assets/images/logo.webp',      title: 'AQUAWAY TOURS',     geo: 'HURGHADA · RED SEA · EGYPT' }
  ];

  var loadedImages = {};
  STORY_SHOTS.forEach(function(s) {
    var img = new Image();
    img.src = s.src;
    loadedImages[s.id] = img;
  });

  /* ─── 6. DOM SETUP WITH 2.39:1 CINEMATIC LETTERBOX ─── */
  var overlay = document.createElement('div');
  overlay.id = 'aqw-cinematic-intro';
  overlay.setAttribute('style',
    'position:fixed;inset:0;z-index:999999;' +
    'background:#000000;pointer-events:all;' +
    'will-change:opacity,transform;overflow:hidden;user-select:none;'
  );

  var canvas = document.createElement('canvas');
  canvas.setAttribute('style', 'position:absolute;inset:0;width:100%;height:100%;display:block;');
  var ctx = canvas.getContext('2d', { alpha: false });

  // Top Cinema Letterbox Bar
  var barTop = document.createElement('div');
  barTop.className = 'aqw-cinema-bar-top';
  barTop.setAttribute('style',
    'position:absolute;top:0;left:0;right:0;height:7.5vh;background:#000000;z-index:5;' +
    'display:flex;align-items:center;justify-content:space-between;padding:0 2rem;' +
    'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;' +
    'font-size:0.68rem;letter-spacing:0.25em;color:rgba(212,175,55,0.6);text-transform:uppercase;' +
    'transition:height 0.35s cubic-bezier(0.2,0,0,1);'
  );
  barTop.innerHTML = '<span>AQUAWAY FILMS // HOLLYWOOD IDENT</span><span id="aqw-timecode">00:00:00:00</span>';

  // Bottom Cinema Letterbox Bar
  var barBottom = document.createElement('div');
  barBottom.className = 'aqw-cinema-bar-bottom';
  barBottom.setAttribute('style',
    'position:absolute;bottom:0;left:0;right:0;height:7.5vh;background:#000000;z-index:5;' +
    'display:flex;align-items:center;justify-content:space-between;padding:0 2rem;' +
    'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;' +
    'font-size:0.68rem;letter-spacing:0.22em;color:rgba(255,255,255,0.5);text-transform:uppercase;' +
    'transition:height 0.35s cubic-bezier(0.2,0,0,1);'
  );
  barBottom.innerHTML = '<span id="aqw-geo-tag">THE JOURNEY TO EGYPT</span><span>2.39:1 ANAMORPHIC</span>';

  // Sound Button (Glass/Gold)
  var soundBtn = document.createElement('button');
  soundBtn.id = 'aqw-intro-sound';
  soundBtn.setAttribute('aria-label', 'Toggle intro sound');
  soundBtn.innerHTML = '<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>';
  soundBtn.setAttribute('style',
    'position:absolute;top:9.5vh;left:1.8rem;' +
    'background:rgba(8,12,24,0.65);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);' +
    'border:1px solid rgba(212,175,55,0.4);color:rgba(212,175,55,0.9);' +
    'width:40px;height:40px;border-radius:50%;cursor:pointer;display:flex;' +
    'align-items:center;justify-content:center;transition:all 0.25s ease;z-index:10;' +
    'box-shadow:0 4px 24px rgba(0,0,0,0.5);'
  );
  soundBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    AudioEngine.init();
    AudioEngine.toggleMute(soundBtn);
  });

  // Skip Button (Glass/Gold)
  var skipBtn = document.createElement('button');
  skipBtn.id = 'aqw-intro-skip';
  skipBtn.setAttribute('aria-label', 'Skip cinematic intro');
  skipBtn.textContent = 'SKIP';
  skipBtn.setAttribute('style',
    'position:absolute;bottom:9.5vh;right:1.8rem;' +
    'background:rgba(8,12,24,0.65);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);' +
    'border:1px solid rgba(212,175,55,0.35);color:rgba(212,175,55,0.85);' +
    'font-size:0.68rem;font-weight:600;letter-spacing:0.25em;text-transform:uppercase;' +
    'padding:0.5rem 1.25rem;border-radius:50px;cursor:pointer;font-family:inherit;' +
    'transition:all 0.3s ease;opacity:0;z-index:10;' +
    'box-shadow:0 4px 24px rgba(0,0,0,0.5);'
  );

  overlay.appendChild(canvas);
  overlay.appendChild(barTop);
  overlay.appendChild(barBottom);
  overlay.appendChild(soundBtn);
  overlay.appendChild(skipBtn);

  /* ─── 7. THEATRICAL VOLUMETRIC SEARCHLIGHTS ─── */
  function createSearchlights(W, H) {
    return [
      { x: W * -0.06, y: H * 1.12, startAngle: -84,  endAngle: -58,  color: 'rgba(255,248,225,', width: 30 },
      { x: W *  1.06, y: H * 1.12, startAngle: -104, endAngle: -122, color: 'rgba(255,248,225,', width: 28 },
      { x: W *  0.10, y: H * 0.98, startAngle: -74,  endAngle: -55,  color: 'rgba(212,175,55,',  width: 22 },
      { x: W *  0.90, y: H * 0.98, startAngle: -116, endAngle: -100, color: 'rgba(212,175,55,',  width: 22 },
      { x: W *  0.30, y: H * 1.08, startAngle: -90,  endAngle: -82,  color: 'rgba(0,184,200,',   width: 16 },
      { x: W *  0.70, y: H * 1.08, startAngle: -92,  endAngle: -98,  color: 'rgba(0,184,200,',   width: 16 },
      { x: W *  0.50, y: H * 1.15, startAngle: -90,  endAngle: -90,  color: 'rgba(255,215,0,',   width: 34 }
    ];
  }

  /* ─── 8. STARDUST TRANSFORMATION PARTICLES (2.65s - 2.95s) ─── */
  var isMobile = window.innerWidth < 768;
  var MAX_PARTICLES = isMobile ? 80 : 180;

  function makeParticle(W, H) {
    var angle = Math.random() * Math.PI * 2;
    var dist = Math.random() * Math.min(W, H) * 0.45;
    return {
      x: W * 0.5 + Math.cos(angle) * dist,
      y: H * 0.5 + Math.sin(angle) * dist,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      targetX: W * 0.5 + (Math.random() - 0.5) * 160,
      targetY: H * 0.5 + (Math.random() - 0.5) * 160,
      r: Math.random() * 2.2 + 0.6,
      life: Math.random(),
      isAqua: Math.random() > 0.7
    };
  }

  /* ─── 9. ENGINE CONTROLLER ─── */
  var W = 0, H = 0, dpr = 1;
  var startTime = null;
  var phase = 0;
  var beams = [];
  var particles = [];
  var done = false;
  var isSkipping = false;
  var skipStartTime = 0;
  var timecodeEl = null;
  var geoEl = null;
  var duration = isReturning ? RETURN_DURATION : TOTAL_DURATION;
  if (prefersReducedMotion) duration = 800;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2.0);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width  = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    beams = createSearchlights(W, H);
    particles = [];
    for (var i = 0; i < MAX_PARTICLES; i++) {
      particles.push(makeParticle(W, H));
    }
  }

  function handleSkip() {
    if (isSkipping || done) return;
    isSkipping = true;
    skipStartTime = performance.now();
    AudioEngine.impact();
  }

  function completeIntro() {
    if (done) return;
    done = true;
    cancelAnimationFrame(window._aqwIntroRaf);

    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch (e) {}

    document.body.style.overflow = '';
    barTop.style.height = '0';
    barBottom.style.height = '0';
    overlay.style.transition = 'opacity 0.35s cubic-bezier(0.2,0,0,1)';
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';

    AudioEngine.handoff();

    setTimeout(function() {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      var loader = document.getElementById('page-loader');
      if (loader) {
        loader.classList.add('fade-out');
        setTimeout(function() {
          if (loader.parentNode) loader.parentNode.removeChild(loader);
        }, 500);
      }
    }, 380);
  }

  /* ─── 10. MAIN ANIMATION LOOP (3.50s HOLLYWOOD TIMELINE) ─── */
  function loop(now) {
    if (done) return;

    if (isSkipping) {
      var skipElapsed = now - skipStartTime;
      var skipProgress = clamp(skipElapsed / SKIP_ANIM_TIME, 0, 1);
      phase = lerp(0.84, 1.0, skipProgress);
    } else {
      var elapsed = now - startTime;
      phase = clamp(elapsed / duration, 0, 1);
    }

    // Precision Sound Cue Triggers
    if (!isReturning && !prefersReducedMotion) {
      if (phase >= 0.00 && phase < 0.12) AudioEngine.sub();
      if (phase >= 0.13 && phase < 0.21) AudioEngine.plane();
      if (phase >= 0.21 && phase < 0.31) AudioEngine.ocean();
      if (phase >= 0.31 && phase < 0.40) AudioEngine.underwater();
      if (phase >= 0.48 && phase < 0.58) AudioEngine.pyramids();
      if (phase >= 0.75 && phase < 0.84) AudioEngine.silence();
      if (phase >= 0.84 && phase < 0.95) AudioEngine.impact();
    }

    // Live Rolling Timecode & Location
    if (!timecodeEl) timecodeEl = document.getElementById('aqw-timecode');
    if (!geoEl) geoEl = document.getElementById('aqw-geo-tag');

    if (timecodeEl) {
      var currentMs = Math.floor(phase * duration);
      var sec = Math.floor(currentMs / 1000);
      var frames = Math.floor((currentMs % 1000) / 41.6);
      timecodeEl.textContent = '00:00:0' + sec + ':' + (frames < 10 ? '0' : '') + frames;
    }

    render();

    if (phase < 1) {
      window._aqwIntroRaf = requestAnimationFrame(loop);
    } else {
      completeIntro();
    }
  }

  /* ─── 11. HOLLYWOOD STUDIO CINEMA RENDER PIPELINE ─── */
  function render() {
    ctx.clearRect(0, 0, W, H);

    if (prefersReducedMotion) {
      renderReduced();
      return;
    }

    // Master Continuous Camera Push (Hollywood Large-Format Feel)
    var masterPush = lerp(1.0, 1.07, Ease.inOutCubic(phase));
    ctx.save();
    ctx.translate(W * 0.5, H * 0.5);
    ctx.scale(masterPush, masterPush);
    ctx.translate(-W * 0.5, -H * 0.5);

    // ── STAGE 1: NARRATIVE HERO SHOTS (0.00s — 2.30s = phase 0.00 — 0.66) ──
    if (phase < 0.68) {
      drawNarrativeHeroShots();
    }

    // ── STAGE 2: THE MEMORY (2.30s — 2.65s = phase 0.65 — 0.76) ──
    if (phase >= 0.65 && phase <= 0.76) {
      drawMemorySequence(norm(phase, 0.65, 0.76));
    }

    // ── STAGE 3: THE TRANSFORMATION (2.65s — 2.95s = phase 0.75 — 0.85) ──
    if (phase >= 0.75 && phase <= 0.86) {
      drawTransformationField(norm(phase, 0.75, 0.86));
    }

    // ── STAGE 4: VOLUMETRIC SEARCHLIGHTS (0.80 — 0.96) ──
    if (phase > 0.80) {
      drawTheatricalSearchlights(norm(phase, 0.80, 0.94));
    }

    // ── STAGE 5: AQUAWAY TOURS LOGO REVEAL (2.95s — 3.35s = phase 0.84 — 0.95) ──
    if (phase > 0.83) {
      drawStudioLogoIdent(norm(phase, 0.83, 0.95));
    }

    // ── STAGE 6: FINAL IMPACT & PORTAL FLY-THROUGH (3.35s — 3.50s = phase 0.94 — 1.00) ──
    if (phase > 0.93) {
      drawFinalImpactPortal(norm(phase, 0.93, 1.0));
    }

    // Environmental Shutter Exposure Flashes Between Narrative Cuts
    renderEnvironmentalExposureFlashes();

    // 35mm Subtle Film Grain Simulation
    draw35mmFilmGrain();

    ctx.restore();

    // Skip Button Appearance after 0.6s
    if (phase > 0.18 && skipBtn.style.opacity === '0') {
      skipBtn.style.opacity = '0.88';
    }
  }

  /* ─── 12. NARRATIVE HERO SHOTS (PURPOSEFUL CAMERA & MOTIVATED LIGHT) ─── */
  function drawNarrativeHeroShots() {
    var shots = [
      // 0.00–0.45s: SHOT 01 — ESCAPE (Door opens, sunlight floods frame)
      { id: 'escape',   start: 0.00, end: 0.13, geo: 'THE ESCAPE · GOLDEN HOUR',
        type: 'push',  scaleFrom: 1.05, scaleTo: 1.18, yFrom: 0, yTo: -15, rot: 0 },

      // 0.45–0.75s: SHOT 02 — FLIGHT (Sunlight on cabin window, clouds part)
      { id: 'flight',   start: 0.14, end: 0.21, geo: '32,000 FT · OVER EGYPT',
        type: 'pan',   scaleFrom: 1.08, scaleTo: 1.20, xFrom: -25, xTo: 25, rot: -0.003 },

      // 0.75–1.10s: SHOT 03 — RED SEA (Yacht bow, wind moves hair, camera orbits)
      { id: 'redsea',   start: 0.22, end: 0.31, geo: '27.2579°N 33.8116°E · HURGHADA',
        type: 'ocean', scaleFrom: 1.08, scaleTo: 1.22, rotFrom: -0.008, rotTo: 0.008 },

      // 1.10–1.40s: SHOT 04 — UNDERWATER (Caustics, dolphin pass, camera tilts up)
      { id: 'undersea', start: 0.32, end: 0.40, geo: 'GIFTUN ISLANDS · RED SEA',
        type: 'dive',  scaleFrom: 1.06, scaleTo: 1.20, yFrom: -20, yTo: 20, rot: 0.005 },

      // 1.40–1.70s: SHOT 05 — DESERT (Dunes, 4x4 ridge, sand whip across lens)
      { id: 'desert',   start: 0.41, end: 0.49, geo: 'EASTERN DESERT · EGYPT',
        type: 'rush',  scaleFrom: 1.10, scaleTo: 1.25, yFrom: -10, yTo: 15, rot: 0.006 },

      // 1.70–2.05s: SHOT 06 — PYRAMIDS (Hero Shot: Giza Pyramids, pure awe)
      { id: 'pyramids', start: 0.50, end: 0.59, geo: 'GIZA PLATEAU · CAIRO',
        type: 'crane', scaleFrom: 1.08, scaleTo: 1.24, yFrom: 20, yTo: -20, rot: 0.003 },

      // 2.05–2.30s: SHOT 07 — LUXOR (Ancient Karnak columns, Nile reflection)
      { id: 'luxor',    start: 0.59, end: 0.67, geo: 'KARNAK TEMPLE · NILE VALLEY',
        type: 'pan',   scaleFrom: 1.10, scaleTo: 1.24, xFrom: -30, xTo: 30, rot: -0.003 }
    ];

    for (var i = 0; i < shots.length; i++) {
      var s = shots[i];
      if (phase >= s.start && phase <= s.end) {
        var localP = norm(phase, s.start, s.end);
        var alpha = Math.sin(localP * Math.PI);
        var img = loadedImages[s.id];

        if (geoEl && geoEl.textContent !== s.geo) {
          geoEl.textContent = s.geo;
        }

        ctx.save();
        ctx.globalAlpha = clamp(alpha * 1.35, 0, 1);

        // Motivated Camera Transforms
        var currentZoom = lerp(s.scaleFrom, s.scaleTo, Ease.inOutCubic(localP));
        var posX = 0, posY = 0, rotAngle = 0;

        if (s.type === 'push') {
          posY = lerp(s.yFrom, s.yTo, Ease.inOutCubic(localP));
        } else if (s.type === 'pan') {
          posX = lerp(s.xFrom, s.xTo, Ease.inOutCubic(localP));
          rotAngle = s.rot;
        } else if (s.type === 'ocean') {
          rotAngle = lerp(s.rotFrom, s.rotTo, Math.sin(localP * Math.PI));
          posY = Math.sin(localP * Math.PI * 2) * 6;
        } else if (s.type === 'dive') {
          posY = lerp(s.yFrom, s.yTo, Ease.inOutCubic(localP));
          rotAngle = Math.sin(localP * Math.PI) * 0.006;
        } else if (s.type === 'rush') {
          posY = lerp(s.yFrom, s.yTo, Ease.inCubic(localP));
          rotAngle = s.rot * Math.sin(localP * Math.PI);
        } else if (s.type === 'crane') {
          posY = lerp(s.yFrom, s.yTo, Ease.inOutCubic(localP));
          rotAngle = s.rot * localP;
        }

        ctx.translate(W * 0.5, H * 0.5);
        ctx.rotate(rotAngle);
        ctx.scale(currentZoom, currentZoom);
        ctx.translate(-W * 0.5 + posX, -H * 0.5 + posY);

        if (img && img.complete && img.naturalWidth) {
          var imgRatio = img.naturalWidth / img.naturalHeight;
          var canvasRatio = W / H;
          var dw, dh, dx, dy;
          if (canvasRatio > imgRatio) {
            dw = W;
            dh = W / imgRatio;
            dx = 0;
            dy = (H - dh) * 0.5;
          } else {
            dh = H;
            dw = H * imgRatio;
            dx = (W - dw) * 0.5;
            dy = 0;
          }
          ctx.drawImage(img, dx, dy, dw, dh);
        }

        // Scene-Specific Optical Sunlight & Environmental Lighting
        renderEnvironmentalLighting(s.type, localP, alpha);

        // Film Contrast & Highlight Rolloff
        var vig = ctx.createRadialGradient(W * 0.5, H * 0.5, Math.min(W, H) * 0.35, W * 0.5, H * 0.5, Math.max(W, H) * 0.78);
        vig.addColorStop(0, 'rgba(0,0,0,0)');
        vig.addColorStop(1, 'rgba(2,5,15,0.65)');
        ctx.fillStyle = vig;
        ctx.fillRect(0, 0, W, H);

        ctx.restore();
      }
    }
  }

  // Environmental Lighting & Natural Flares
  function renderEnvironmentalLighting(type, localP, alpha) {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';

    if (type === 'push') {
      // Overexposed Sunlight Floods Frame from Doorway
      var lightAlpha = Math.pow(localP, 2.5) * alpha * 0.85;
      var doorG = ctx.createRadialGradient(W * 0.8, H * 0.3, 0, W * 0.8, H * 0.3, W * 0.85);
      doorG.addColorStop(0,   'rgba(255,248,220,' + lightAlpha + ')');
      doorG.addColorStop(0.4, 'rgba(255,215,0,'   + (lightAlpha * 0.6) + ')');
      doorG.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = doorG;
      ctx.fillRect(0, 0, W, H);
    } else if (type === 'ocean') {
      // Natural Anamorphic Water Glints
      var glint = Math.sin(localP * Math.PI * 4) * 0.5 + 0.5;
      var waterG = ctx.createRadialGradient(W * 0.6, H * 0.65, 0, W * 0.6, H * 0.65, W * 0.4);
      waterG.addColorStop(0,   'rgba(255,255,255,' + (alpha * glint * 0.45) + ')');
      waterG.addColorStop(0.5, 'rgba(0,213,232,'   + (alpha * glint * 0.2)  + ')');
      waterG.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = waterG;
      ctx.fillRect(0, 0, W, H);
    } else if (type === 'dive') {
      // Underwater Sunbeams Cutting Through Surface
      var sunX = Math.sin(localP * Math.PI * 2) * 50;
      var rayG = ctx.createLinearGradient(W * 0.5 + sunX, 0, W * 0.5 - sunX, H);
      rayG.addColorStop(0,   'rgba(0,255,230,' + (alpha * 0.40) + ')');
      rayG.addColorStop(0.6, 'rgba(0,184,200,' + (alpha * 0.15) + ')');
      rayG.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = rayG;
      ctx.fillRect(0, 0, W, H);
    } else if (type === 'rush') {
      // Whip of Sand Blowing Across the Lens
      ctx.strokeStyle = 'rgba(255,210,120,' + (alpha * 0.55) + ')';
      ctx.lineWidth = 1.8;
      for (var s = 0; s < 10; s++) {
        var sx = (s * W / 10 + (localP * W * 1.6)) % W;
        var sy = H * 0.65 + Math.sin(s + localP * 6) * (H * 0.2);
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + 40, sy + 8);
        ctx.stroke();
      }
    } else if (type === 'crane') {
      // Warm Atmospheric Pyramid Sun Sweep
      var pyX = lerp(W * 0.25, W * 0.75, localP);
      var pyG = ctx.createLinearGradient(pyX - 180, 0, pyX + 180, H);
      pyG.addColorStop(0,   'rgba(255,215,0,0)');
      pyG.addColorStop(0.5, 'rgba(255,235,170,' + (alpha * 0.35) + ')');
      pyG.addColorStop(1,   'rgba(255,215,0,0)');
      ctx.fillStyle = pyG;
      ctx.fillRect(0, 0, W, H);
    }

    ctx.restore();
  }

  /* ─── 13. MOTIVATED ENVIRONMENTAL EXPOSURE FLASHES ─── */
  function renderEnvironmentalExposureFlashes() {
    var flashCues = [
      { id: 'c1', t: 0.13, color: 'gold' },   // Escape -> Flight (Window Light Match)
      { id: 'c2', t: 0.21, color: 'aqua' },   // Flight -> Red Sea (Clouds to Sea)
      { id: 'c3', t: 0.31, color: 'cyan' },   // Red Sea -> Underwater (Water Dive)
      { id: 'c4', t: 0.40, color: 'gold' },   // Underwater -> Desert (Sun Surface Burst)
      { id: 'c5', t: 0.49, color: 'orange' }, // Desert -> Pyramids (Sand Whip Match)
      { id: 'c6', t: 0.58, color: 'gold' }    // Pyramids -> Luxor (Sunlight Colonnade Match)
    ];

    var flashWindow = 0.042; // ~147ms natural exposure recovery (more cinematic punch)

    for (var i = 0; i < flashCues.length; i++) {
      var cue = flashCues[i];
      var diff = Math.abs(phase - cue.t);

      if (diff < flashWindow) {
        var rawIntensity = 1.0 - (diff / flashWindow);
        var flashIntensity = Ease.outExpo(rawIntensity);

        AudioEngine.whip(cue.id);
        renderLayeredExposureBurst(flashIntensity, cue.color);
      }
    }
  }

  function renderLayeredExposureBurst(intensity, colorType) {
    if (intensity <= 0.02) return;
    ctx.save();

    var flareCy = H * 0.5;
    var streakAlpha = intensity * 0.95;

    // PASS 1: Screen Blend Exposure Highlight
    ctx.globalCompositeOperation = 'screen';
    ctx.fillStyle = 'rgba(255,255,255,' + (intensity * 0.85) + ')';
    ctx.fillRect(0, 0, W, H);

    // PASS 2: 35mm Anamorphic Lens Flare Line
    var sg = ctx.createLinearGradient(0, flareCy, W, flareCy);
    sg.addColorStop(0,    'rgba(255,255,255,0)');
    if (colorType === 'aqua') {
      sg.addColorStop(0.35, 'rgba(0,213,232,' + (streakAlpha * 0.7) + ')');
      sg.addColorStop(0.50, 'rgba(255,255,255,' + streakAlpha + ')');
      sg.addColorStop(0.65, 'rgba(0,213,232,' + (streakAlpha * 0.7) + ')');
    } else if (colorType === 'orange') {
      sg.addColorStop(0.35, 'rgba(255,165,0,' + (streakAlpha * 0.7) + ')');
      sg.addColorStop(0.50, 'rgba(255,255,255,' + streakAlpha + ')');
      sg.addColorStop(0.65, 'rgba(255,165,0,' + (streakAlpha * 0.7) + ')');
    } else if (colorType === 'cyan') {
      sg.addColorStop(0.35, 'rgba(0,255,230,' + (streakAlpha * 0.7) + ')');
      sg.addColorStop(0.50, 'rgba(255,255,255,' + streakAlpha + ')');
      sg.addColorStop(0.65, 'rgba(0,255,230,' + (streakAlpha * 0.7) + ')');
    } else {
      sg.addColorStop(0.35, 'rgba(255,245,210,' + (streakAlpha * 0.7) + ')');
      sg.addColorStop(0.50, 'rgba(255,255,255,' + streakAlpha + ')');
      sg.addColorStop(0.65, 'rgba(255,245,210,' + (streakAlpha * 0.7) + ')');
    }
    sg.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = sg;
    ctx.fillRect(0, flareCy - 22, W, 44);

    // PASS 3: Central White-Hot Exposure Core
    var bg = ctx.createRadialGradient(W * 0.5, H * 0.5, 0, W * 0.5, H * 0.5, Math.min(W, H) * 0.72 * intensity);
    bg.addColorStop(0,    'rgba(255,255,255,' + (intensity * 0.98) + ')');
    bg.addColorStop(0.25, 'rgba(255,250,230,' + (intensity * 0.75) + ')');
    bg.addColorStop(0.65, 'rgba(212,175,55,'  + (intensity * 0.25) + ')');
    bg.addColorStop(1,    'rgba(0,0,0,0)');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    ctx.restore();
  }

  /* ─── 14. THE MEMORY (FAST EDITORIAL RHYTHM 2.30s - 2.65s) ─── */
  function drawMemorySequence(mPhase) {
    var memoryShots = ['redsea', 'undersea', 'desert', 'pyramids', 'luxor', 'finalhero'];
    var idx = Math.floor(mPhase * memoryShots.length * 2.5) % memoryShots.length;
    var img = loadedImages[memoryShots[idx]];

    if (geoEl) geoEl.textContent = 'THE MEMORY · RED SEA · EGYPT';

    ctx.save();
    ctx.globalAlpha = 0.92;

    if (img && img.complete && img.naturalWidth) {
      // Cover-fit: maintain aspect ratio, fill frame
      var ir = img.naturalWidth / img.naturalHeight;
      var cr = W / H;
      var mw, mh, mx, my;
      if (cr > ir) { mw = W; mh = W / ir; mx = 0; my = (H - mh) * 0.5; }
      else         { mh = H; mw = H * ir; mx = (W - mw) * 0.5; my = 0; }
      ctx.drawImage(img, mx, my, mw, mh);
    }

    // Environmental Light Strobe on Cut
    var strobe = Math.sin(mPhase * Math.PI * 7);
    if (strobe > 0.4) {
      ctx.fillStyle = 'rgba(255,255,255,' + (strobe * 0.65) + ')';
      ctx.fillRect(0, 0, W, H);
    }

    ctx.restore();
  }

  /* ─── 15. THE TRANSFORMATION (SILENCE & GOLDEN STARDUST 2.65s - 2.95s) ─── */
  function drawTransformationField(tPhase) {
    if (geoEl) geoEl.textContent = 'AQUAWAY LUXURY TRAVEL';

    ctx.save();
    // Deep Cinematic Space
    ctx.fillStyle = COLORS.black;
    ctx.fillRect(0, 0, W, H);

    // Camera Fly-Through into Light Field
    var flyScale = lerp(0.85, 1.35, Ease.inOutCubic(tPhase));
    ctx.translate(W * 0.5, H * 0.5);
    ctx.scale(flyScale, flyScale);
    ctx.translate(-W * 0.5, -H * 0.5);

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x = lerp(p.x, p.targetX, 0.08);
      p.y = lerp(p.y, p.targetY, 0.08);

      var pAlpha = clamp(Math.sin(tPhase * Math.PI), 0, 1) * 0.90;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.isAqua
        ? 'rgba(0,213,232,' + pAlpha + ')'
        : 'rgba(255,215,0,'  + pAlpha + ')';
      ctx.fill();
    }

    // Central Golden Light Birth
    var birthG = ctx.createRadialGradient(W * 0.5, H * 0.5, 0, W * 0.5, H * 0.5, Math.min(W, H) * 0.45 * tPhase);
    birthG.addColorStop(0,   'rgba(255,255,255,' + (tPhase * 0.9) + ')');
    birthG.addColorStop(0.4, 'rgba(212,175,55,'  + (tPhase * 0.5) + ')');
    birthG.addColorStop(0.8, 'rgba(0,184,200,'   + (tPhase * 0.2) + ')');
    birthG.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = birthG;
    ctx.fillRect(0, 0, W, H);

    ctx.restore();
  }

  /* ─── 16. THEATRICAL VOLUMETRIC SEARCHLIGHTS ─── */
  function drawTheatricalSearchlights(beamPhase) {
    ctx.save();
    var globalAlpha = Ease.outCubic(beamPhase);

    for (var i = 0; i < beams.length; i++) {
      var beam = beams[i];
      var angleRad = lerp(beam.startAngle, beam.endAngle, globalAlpha) * Math.PI / 180;
      var bLen = Math.max(W, H) * 2.0;

      var bx1 = beam.x, by1 = beam.y;
      var bx2 = bx1 + Math.cos(angleRad) * bLen;
      var by2 = by1 + Math.sin(angleRad) * bLen;
      var dx = bx2 - bx1, dy = by2 - by1;
      var dist = Math.sqrt(dx * dx + dy * dy);
      var nx = -dy / dist, ny = dx / dist;
      var halfW = beam.width * (0.5 + globalAlpha * 1.5);

      var grad = ctx.createLinearGradient(
        bx1 + nx * halfW, by1 + ny * halfW,
        bx1 - nx * halfW, by1 - ny * halfW
      );
      var a = globalAlpha * 0.88;
      grad.addColorStop(0,    beam.color + '0)');
      grad.addColorStop(0.14, beam.color + (a * 0.16).toFixed(3) + ')');
      grad.addColorStop(0.50, beam.color + (a * 0.78).toFixed(3) + ')');
      grad.addColorStop(0.86, beam.color + (a * 0.16).toFixed(3) + ')');
      grad.addColorStop(1,    beam.color + '0)');

      ctx.beginPath();
      ctx.moveTo(bx1 + nx * 2,  by1 + ny * 2);
      ctx.lineTo(bx2 + nx * halfW, by2 + ny * halfW);
      ctx.lineTo(bx2 - nx * halfW, by2 - ny * halfW);
      ctx.lineTo(bx1 - nx * 2,  by1 - ny * 2);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
    }
    ctx.restore();
  }

  /* ─── 17. AQUAWAY TOURS STUDIO IDENT (2.95s - 3.35s) ─── */
  function drawStudioLogoIdent(lPhase) {
    var alpha = Ease.outCubic(lPhase);
    var logoSize = Math.min(W, H) * 0.20;
    var cx = W * 0.5;
    var cy = H * 0.5 - logoSize * 0.32;
    var img = loadedImages['logo'];

    if (geoEl) geoEl.textContent = 'HURGHADA · RED SEA · EGYPT';

    ctx.save();
    ctx.globalAlpha = alpha;

    // Royal Gold Rim Light & Aqua Edge Aura
    var glowSize = logoSize * 1.95;
    var rimG = ctx.createRadialGradient(cx, cy, logoSize * 0.2, cx, cy, glowSize);
    rimG.addColorStop(0,   'rgba(212,175,55,' + (alpha * 0.58) + ')');
    rimG.addColorStop(0.5, 'rgba(0,184,200,'  + (alpha * 0.20) + ')');
    rimG.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = rimG;
    ctx.fillRect(cx - glowSize, cy - glowSize, glowSize * 2, glowSize * 2);

    ctx.translate(cx, cy);
    var scale = lerp(0.92, 1.0, Ease.outCubic(lPhase));
    ctx.scale(scale, scale);

    // Reveal Official AquaWay Emblem
    if (img && img.complete && img.naturalWidth) {
      ctx.drawImage(img, -logoSize * 0.5, -logoSize * 0.5, logoSize, logoSize);

      // Anamorphic Light Sweep across Emblem
      if (lPhase > 0.20 && lPhase < 0.85) {
        var sweepX = lerp(-logoSize, logoSize, norm(lPhase, 0.20, 0.85));
        var swG = ctx.createLinearGradient(sweepX - 25, 0, sweepX + 25, 0);
        swG.addColorStop(0, 'rgba(255,255,255,0)');
        swG.addColorStop(0.5, 'rgba(255,255,255,0.72)');
        swG.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = swG;
        ctx.fillRect(-logoSize * 0.5, -logoSize * 0.5, logoSize, logoSize);
      }
    }

    ctx.restore();

    // 5-Stop Royal Gold Typography (AQUAWAY TOURS)
    if (lPhase > 0.30) {
      var tAlpha = Ease.outCubic(norm(lPhase, 0.30, 1.0));
      var fontSize = Math.max(16, Math.min(W * 0.042, 38));
      var nameY = cy + logoSize * 0.85;

      ctx.save();
      ctx.globalAlpha = tAlpha;
      // Note: ctx.letterSpacing is not a Canvas 2D API — spacing is handled via font tracking
      ctx.font = '700 ' + fontSize + "px 'Playfair Display', Georgia, serif";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      var tg = ctx.createLinearGradient(cx - 130, nameY, cx + 130, nameY);
      tg.addColorStop(0,   COLORS.goldDark);
      tg.addColorStop(0.28,COLORS.goldRoyal);
      tg.addColorStop(0.50,COLORS.goldBright);
      tg.addColorStop(0.72,COLORS.goldRoyal);
      tg.addColorStop(1,   COLORS.goldDark);
      ctx.fillStyle = tg;
      ctx.shadowColor = COLORS.goldRoyal;
      ctx.shadowBlur = 14 * tAlpha;
      // Manual letter-spaced render for cinematic tracking effect
      var title = 'AQUAWAY TOURS';
      var trackW = fontSize * 0.35; // tracking: 0.35em between chars
      var totalTW = title.length * (fontSize * 0.62) + (title.length - 1) * trackW;
      var startX = cx - totalTW * 0.5;
      for (var ci = 0; ci < title.length; ci++) {
        var ch = title[ci];
        var cw = ctx.measureText(ch).width;
        ctx.fillText(ch, startX + cw * 0.5, nameY);
        startX += cw + trackW;
      }
      ctx.shadowBlur = 0;

      // Sub-Tagline Signature
      var tagSize = Math.max(9, fontSize * 0.38);
      ctx.font = '500 ' + tagSize + "px 'Inter', sans-serif";
      ctx.fillStyle = COLORS.warmWhite;
      ctx.globalAlpha = tAlpha * 0.85;
      ctx.fillText('HURGHADA  ·  RED SEA  ·  EGYPT', cx, nameY + fontSize * 1.55);
      ctx.restore();
    }
  }

  /* ─── 18. FINAL IMPACT & PORTAL TRANSITION (3.35s - 3.50s) ─── */
  function drawFinalImpactPortal(pPhase) {
    var intensity = Ease.outExpo(pPhase);
    var flareCx = W * 0.5, flareCy = H * 0.5;

    ctx.save();
    // Anamorphic Beam Expansion
    var sg = ctx.createLinearGradient(0, flareCy, W, flareCy);
    sg.addColorStop(0,    'rgba(255,255,255,0)');
    sg.addColorStop(0.45, 'rgba(255,255,255,' + (intensity * 0.98) + ')');
    sg.addColorStop(0.55, 'rgba(255,245,210,' + (intensity * 0.98) + ')');
    sg.addColorStop(1,    'rgba(255,255,255,0)');
    ctx.fillStyle = sg;
    ctx.fillRect(0, flareCy - 28, W, 56);

    // Pure White-Gold Expansion into Homepage Hero
    var bg = ctx.createRadialGradient(flareCx, flareCy, 0, flareCx, flareCy, Math.max(W, H) * 0.85 * intensity);
    bg.addColorStop(0,   'rgba(255,255,255,' + intensity + ')');
    bg.addColorStop(0.4, 'rgba(255,245,210,' + (intensity * 0.85) + ')');
    bg.addColorStop(0.8, 'rgba(0,184,200,'   + (intensity * 0.45) + ')');
    bg.addColorStop(1,   'rgba(0,0,0,'       + intensity + ')');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    ctx.restore();
  }

  // 35mm Subtle Film Grain Simulation
  function draw35mmFilmGrain() {
    ctx.save();
    ctx.globalAlpha = 0.035;
    for (var i = 0; i < 35; i++) {
      var gx = Math.random() * W;
      var gy = Math.random() * H;
      var gr = Math.random() * 1.5 + 0.5;
      ctx.fillStyle = Math.random() > 0.5 ? '#ffffff' : '#000000';
      ctx.fillRect(gx, gy, gr, gr);
    }
    ctx.restore();
  }

  // Reduced Motion Fallback
  function renderReduced() {
    ctx.fillStyle = COLORS.black;
    ctx.fillRect(0, 0, W, H);

    if (phase > 0.15) {
      var alpha = Ease.inOutCubic(norm(phase, 0.15, 0.70));
      var logoSize = Math.min(W, H) * 0.20;
      var cx = W * 0.5, cy = H * 0.5 - logoSize * 0.32;
      var img = loadedImages['logo'];

      ctx.save();
      ctx.globalAlpha = alpha;
      if (img && img.complete) {
        ctx.drawImage(img, cx - logoSize * 0.5, cy - logoSize * 0.5, logoSize, logoSize);
      }
      ctx.font = "700 24px 'Playfair Display', Georgia, serif";
      ctx.textAlign = 'center';
      ctx.fillStyle = COLORS.goldRoyal;
      ctx.fillText('AQUAWAY TOURS', cx, cy + logoSize * 0.85);
      ctx.restore();
    }
  }

  /* ─── 19. BOOTSTRAP ─── */
  function startIntro() {
    var loader = document.getElementById('page-loader');
    if (loader) {
      loader.style.opacity = '0';
      loader.style.pointerEvents = 'none';
    }

    resize();
    window.addEventListener('resize', resize);

    var onKey = function(e) {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        handleSkip();
        document.removeEventListener('keydown', onKey);
      }
    };
    document.addEventListener('keydown', onKey);
    skipBtn.addEventListener('click', handleSkip);

    var onFirstTouch = function() {
      AudioEngine.init();
      AudioEngine.ensureRunning();
      document.removeEventListener('click', onFirstTouch);
      document.removeEventListener('touchstart', onFirstTouch);
    };
    document.addEventListener('click', onFirstTouch, { once: true });
    document.addEventListener('touchstart', onFirstTouch, { once: true });

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    AudioEngine.init();
    startTime = performance.now();
    window._aqwIntroRaf = requestAnimationFrame(loop);

    setTimeout(function() {
      if (!done) completeIntro();
    }, 4500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startIntro);
  } else {
    startIntro();
  }

})();
