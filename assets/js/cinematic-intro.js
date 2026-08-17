/**
 * 🎬 AQUAWAY TOURS — BLOCKBUSTER CINEMATIC INTRO (V4)
 * ===========================================================================
 * Full-screen Hollywood studio ident:
 *   Clapperboard slate -> Act I The Deep (AQUA) -> Act II The Desert (WAY)
 *   -> Act III The Sunset (TOURS) -> AQUAWAY / TOURS lockup with golden ring
 *   + circular logo, fireworks finale, anamorphic flares, liquid-gold pour.
 *
 * Audio: Web Audio synth SFX + 2s music sting from assets/3.mp3.
 * Runs once per session on the homepage; skippable; honors reduced motion.
 * Hands off to the site music player (window.aquawayMusic) on completion.
 */
(function AquawayBlockbuster() {
  'use strict';

  /* ─── 1. RUNTIME GUARDS ─── */
  var STORAGE_KEY = 'aqw_blockbuster_seen_v1';
  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var isReturning = false;
  try { isReturning = sessionStorage.getItem(STORAGE_KEY) === '1'; } catch (e) {}

  if (isReturning || prefersReducedMotion) return;

  var isIndexPage = (function () {
    var p = window.location.pathname;
    return p === '/' || p.endsWith('/index.html') ||
      p.endsWith('.tours/') || p === '';
  })();
  if (!isIndexPage) return;

  /* ─── 2. ASSET BASE PATH (works at any page depth) ─── */
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
  var MUSIC_URL = BASE_URL + 'assets/3.mp3';
  var LOGO_URL = BASE_URL + 'assets/images/logo.webp';

  /* ─── 3. SCOPED CSS INJECTION ─── */
  var css = `
#aqw-cinematic-intro {
  position: fixed; inset: 0; z-index: 999999; background: #050505;
  overflow: hidden; user-select: none; pointer-events: all;
  will-change: opacity;
  --gold: #d4af37; --gold-b: #ffe9a8; --gold-d: #8a6d1f;
  --aqua: #00e0ff; --aqua-d: #0077ff; --bg: #050505;
  font-family: Inter, sans-serif;
}
#aqw-cinematic-intro * { margin: 0; padding: 0; box-sizing: border-box; }

#aqw-cinematic-intro .stage {
  position: absolute; inset: 0; overflow: hidden; background: var(--bg);
  display: flex; align-items: center; justify-content: center;
  animation: aqiCamDrift 10.4s cubic-bezier(.25,.6,.35,1) both;
}
#aqw-cinematic-intro .layer { position: absolute; inset: 0; pointer-events: none; }

#aqw-cinematic-intro .grain {
  z-index: 60; opacity: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
}
#aqw-cinematic-intro.st-boot .grain { animation: aqiGrainJit .35s steps(2) infinite, aqiGrainFadeIn .9s ease forwards; }

#aqw-cinematic-intro .vignette { z-index: 59; background: radial-gradient(ellipse at center, transparent 52%, rgba(0,0,0,.88) 100%); }

#aqw-cinematic-intro .bar { position: absolute; left: 0; width: 100%; height: 10vh; background: #000; z-index: 58; transform: scaleY(0); }
#aqw-cinematic-intro .bar-top { top: 0; transform-origin: top; }
#aqw-cinematic-intro .bar-bottom { bottom: 0; transform-origin: bottom; }
#aqw-cinematic-intro.st-boot .bar-top { animation: aqiBarIn .8s .1s cubic-bezier(.7,0,.2,1) forwards; }
#aqw-cinematic-intro.st-boot .bar-bottom { animation: aqiBarIn .8s .1s cubic-bezier(.7,0,.2,1) forwards; }

#aqw-cinematic-intro .tc {
  position: absolute; z-index: 70; bottom: 4vh; left: 18px;
  font-family: 'Courier New', monospace; font-size: 12px; letter-spacing: .14em;
  color: rgba(255,255,255,.5); display: flex; align-items: center; gap: 8px;
  opacity: 0;
}
#aqw-cinematic-intro.st-tc .tc { opacity: 1; transition: opacity .6s ease; }
#aqw-cinematic-intro .rec { width: 8px; height: 8px; border-radius: 50%; background: #ff4d4d;
  box-shadow: 0 0 8px #ff4d4d; animation: aqiRecBlink 1s steps(2) infinite; }

#aqw-cinematic-intro .actcap {
  position: absolute; bottom: 14vh; left: 50%; transform: translateX(-50%);
  font-size: clamp(10px, 1.4vw, 14px); letter-spacing: .5em; text-transform: uppercase;
  color: rgba(200,200,200,.65); opacity: 0; z-index: 41; white-space: nowrap;
}
#aqw-cinematic-intro.st-cap1 .cap1, #aqw-cinematic-intro.st-cap2 .cap2, #aqw-cinematic-intro.st-cap3 .cap3 { animation: aqiCapShow 2.4s ease both; }

#aqw-cinematic-intro .clapboard {
  position: absolute; left: 50%; top: 50%; z-index: 56;
  width: min(540px, 80vw); height: clamp(150px, 27vh, 230px);
  transform: translate(-50%, -50%) rotate(-5deg) scale(1.12);
  opacity: 0; box-shadow: 0 30px 80px rgba(0,0,0,.7);
}
#aqw-cinematic-intro .cb-top {
  height: 60%; background: #0d0d0d; border: 2px solid var(--gold);
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;
}
#aqw-cinematic-intro .cb-top .cb-title {
  font-family: 'Playfair Display', Georgia, serif; font-weight: 900;
  font-size: clamp(26px, 4.6vw, 52px); letter-spacing: .12em; color: var(--gold);
  background: linear-gradient(100deg, var(--gold-d), var(--gold) 40%, var(--gold-b) 50%, var(--gold) 60%, var(--gold-d));
  background-size: 220% auto; -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent; animation: aqiTextShimmer 3s linear infinite;
}
#aqw-cinematic-intro .cb-top .cb-pres {
  font-size: clamp(9px, 1.4vw, 13px); letter-spacing: .6em; color: #9a9a9a; text-transform: uppercase;
}
#aqw-cinematic-intro .cb-stripes {
  height: 15%; background: repeating-linear-gradient(45deg, var(--gold) 0 16px, #0d0d0d 16px 32px);
  border-left: 2px solid var(--gold); border-right: 2px solid var(--gold);
}
#aqw-cinematic-intro .cb-bottom {
  height: 25%; background: #e9d9a0; color: #141005; display: flex; align-items: center;
  justify-content: center; letter-spacing: .34em; text-transform: uppercase;
  font-size: clamp(9px, 1.5vw, 14px); font-weight: 600;
}
#aqw-cinematic-intro.st-kicker .clapboard { animation: aqiCbIn .55s cubic-bezier(.15,.9,.25,1.15) both; }
#aqw-cinematic-intro.st-kicker-off .clapboard { animation: aqiCbOut .55s cubic-bezier(.6,0,.7,1) both; }

#aqw-cinematic-intro .clap { z-index: 52; opacity: 0; mix-blend-mode: screen;
  background: radial-gradient(circle at 50% 45%, #fff 0%, rgba(255,255,255,.85) 30%, transparent 70%);
}
#aqw-cinematic-intro.st-clap .clap { animation: aqiClapFlash .45s ease both; }

#aqw-cinematic-intro .flash { z-index: 52; opacity: 0; mix-blend-mode: screen;
  background: radial-gradient(circle at 50% 45%, #fff 0%, rgba(255,255,255,.9) 34%, rgba(255,255,255,.15) 62%, transparent 78%);
}
#aqw-cinematic-intro.st-quickflash .flash { animation: aqiFlashQuick .5s ease both; }
#aqw-cinematic-intro.st-megaflash .flash { animation: aqiFlashMega .85s ease both; }

#aqw-cinematic-intro .anamorph { position: absolute; left: 0; right: 0; top: 42%; height: 2px; opacity: 0;
  background: linear-gradient(90deg, transparent, rgba(130,200,255,0) 28%, rgba(150,215,255,.9) 50%, rgba(130,200,255,0) 72%, transparent);
  filter: blur(1px); box-shadow: 0 0 16px rgba(150,215,255,.65);
}
#aqw-cinematic-intro.st-anam1 .anamorph, #aqw-cinematic-intro.st-anam2 .anamorph { animation: aqiAnamSweep 1.35s cubic-bezier(.4,0,.3,1) both; }

#aqw-cinematic-intro .iris { position: absolute; left: 50%; top: 50%; z-index: 45;
  width: 150vmax; height: 150vmax; border-radius: 50%; background: #000;
  transform: translate(-50%, -50%) scale(0); opacity: 0;
}
#aqw-cinematic-intro.st-iris1 .iris { animation: aqiIrisCloseOpen 1.15s cubic-bezier(.7,0,.3,1) both; }
#aqw-cinematic-intro.st-iris2 .iris { animation: aqiIrisCloseOpen 1.15s cubic-bezier(.7,0,.3,1) both; }

#aqw-cinematic-intro .streak { z-index: 53; opacity: 0; width: 55vmax; height: 3px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.95) 50%, transparent);
  transform: rotate(-22deg) translateX(-130%);
}
#aqw-cinematic-intro .streak.s2 { height: 1.5px; background: linear-gradient(90deg, transparent, rgba(255,215,130,.7) 50%, transparent); top: 54%; }
#aqw-cinematic-intro.st-streak .streak { animation: aqiStreakSweep 1.15s cubic-bezier(.5,0,.3,1) both; }
#aqw-cinematic-intro.st-streak .streak.s2 { animation-delay: .14s; }

#aqw-cinematic-intro.st-shake { animation: aqiCamShake .45s linear both; }
#aqw-cinematic-intro.st-shake3 { animation: aqiCamShake3 .6s linear both; }

#aqw-cinematic-intro .sc { z-index: 1; opacity: 0; transition: opacity .9s ease; }
#aqw-cinematic-intro.st-bg-deep .sc-deep { opacity: 1; animation: aqiPlxIn 7s ease-out both; }
#aqw-cinematic-intro.st-bg-gold .sc-gold { opacity: 1; animation: aqiPlxIn 6s ease-out both; }
#aqw-cinematic-intro.st-bg-sunset .sc-sunset { opacity: 1; animation: aqiPlxIn 6s ease-out both; }
#aqw-cinematic-intro.st-bg-night .sc-night { opacity: 1; animation: aqiPlxIn 8s ease-out both; }

#aqw-cinematic-intro .sc-deep { background: radial-gradient(ellipse at 50% 44%, #06233f 0%, #04101f 60%, #02060d 100%); }
#aqw-cinematic-intro .sc-deep .godrays {
  position: absolute; inset: -40% -30%;
  background: repeating-conic-gradient(from 12deg at 50% 0%, rgba(0,190,255,.10) 0deg 6deg, transparent 6deg 20deg);
  filter: blur(6px); animation: aqiRaysSpin 40s linear infinite;
}
#aqw-cinematic-intro .sc-deep .caustics {
  position: absolute; inset: -30%;
  background:
    radial-gradient(circle at 22% 38%, rgba(120,230,255,.18) 0 2%, transparent 3.2%),
    radial-gradient(circle at 58% 22%, rgba(0,224,255,.22) 0 2.5%, transparent 4%),
    radial-gradient(circle at 78% 62%, rgba(120,230,255,.14) 0 2%, transparent 3%),
    radial-gradient(circle at 38% 76%, rgba(0,190,255,.20) 0 2%, transparent 3.6%);
  background-size: 500px 500px, 430px 430px, 580px 580px, 470px 470px;
  mix-blend-mode: screen; filter: blur(1.5px); opacity: .55;
  animation: aqiCausticDrift 10s linear infinite;
}
#aqw-cinematic-intro .sc-deep .wave { position: absolute; left: 0; bottom: 0; width: 100%; height: 26%; opacity: .5; }
#aqw-cinematic-intro .sc-deep .wave.w2 { bottom: -6%; height: 30%; opacity: .3; }
#aqw-cinematic-intro .sc-deep .wave svg { width: 200%; height: 100%; animation: aqiWaveDrift 12s linear infinite; }
#aqw-cinematic-intro .sc-deep .wave.w2 svg { animation-duration: 17s; }

#aqw-cinematic-intro .sc-gold { background: linear-gradient(180deg, #1c1203 0%, #4a3008 32%, #8a5f14 58%, #c99b3f 80%, #e8c97f 100%); }
#aqw-cinematic-intro .sc-gold .sun {
  position: absolute; left: 50%; top: 30%; width: 26vmin; height: 26vmin; margin-left: -13vmin;
  border-radius: 50%;
  background: radial-gradient(circle, #fff6d8 0%, #ffd27a 55%, rgba(255,180,80,0) 74%);
  filter: blur(1px); box-shadow: 0 0 100px 34px rgba(255,190,90,.5);
}
#aqw-cinematic-intro .sc-gold .sunrays {
  position: absolute; left: 50%; top: 30%; width: 60vmin; height: 60vmin; margin-left: -30vmin; margin-top: -30vmin;
  background: repeating-conic-gradient(from 0deg, rgba(255,220,140,.22) 0deg 5deg, transparent 5deg 14deg);
  border-radius: 50%; animation: aqiRaysSpin 30s linear infinite; filter: blur(2px);
}
#aqw-cinematic-intro .sc-gold .dune { position: absolute; left: 0; width: 100%; height: 42%; }
#aqw-cinematic-intro .sc-gold .dune.d1 { bottom: 0; opacity: .95; }
#aqw-cinematic-intro .sc-gold .dune.d2 { bottom: -8%; height: 40%; opacity: .8; }
#aqw-cinematic-intro .sc-gold .dune svg { width: 100%; height: 100%; }

#aqw-cinematic-intro .sc-sunset { background: linear-gradient(180deg, #2b1140 0%, #6b2a4a 30%, #c96a2e 50%, #f0a24b 58%, #0d3b52 58.5%, #07202f 100%); }
#aqw-cinematic-intro .sc-sunset .sunhalf {
  position: absolute; left: 50%; top: 42%; width: 30vmin; height: 14vmin; margin-left: -15vmin;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 100%, #ffe9b0 0%, #ffb45e 45%, rgba(255,160,70,0) 72%);
  filter: blur(1px); box-shadow: 0 0 70px 24px rgba(255,170,80,.45);
}
#aqw-cinematic-intro .sc-sunset .reflect {
  position: absolute; left: 50%; bottom: 0; width: 10vmin; height: 34%; margin-left: -5vmin;
  background: linear-gradient(180deg, rgba(255,190,110,.55), rgba(255,170,90,.12) 70%, transparent);
  filter: blur(6px);
}
#aqw-cinematic-intro .sc-sunset .wave { position: absolute; left: 0; bottom: 0; width: 100%; height: 24%; }
#aqw-cinematic-intro .sc-sunset .wave.w2 { bottom: -8%; height: 30%; opacity: .8; }
#aqw-cinematic-intro .sc-sunset .wave svg { width: 200%; height: 100%; animation: aqiWaveDrift 14s linear infinite; }
#aqw-cinematic-intro .sc-sunset .wave.w2 svg { animation-duration: 20s; }

#aqw-cinematic-intro .sc-night { background: radial-gradient(ellipse at 50% 28%, #101a3a 0%, #070b1c 55%, #02040c 100%); }
#aqw-cinematic-intro .sc-night .star { position: absolute; width: 3px; height: 3px; border-radius: 50%; background: #fff; opacity: 0; }
#aqw-cinematic-intro .sc-night .star.s1 { top: 14%; left: 12%; } #aqw-cinematic-intro .sc-night .star.s2 { top: 22%; left: 78%; }
#aqw-cinematic-intro .sc-night .star.s3 { top: 34%; left: 30%; } #aqw-cinematic-intro .sc-night .star.s4 { top: 12%; left: 55%; }
#aqw-cinematic-intro .sc-night .star.s5 { top: 28%; left: 8%; } #aqw-cinematic-intro .sc-night .star.s6 { top: 18%; left: 90%; }
#aqw-cinematic-intro .sc-night .star.s7 { top: 40%; left: 65%; } #aqw-cinematic-intro .sc-night .star.s8 { top: 8%; left: 38%; }
#aqw-cinematic-intro .sc-night .star.s9 { top: 36%; left: 48%; } #aqw-cinematic-intro .sc-night .star.s10 { top: 24%; left: 20%; }
#aqw-cinematic-intro.st-bg-night .star { animation: aqiTwinkle 2.6s ease infinite; }
#aqw-cinematic-intro.st-bg-night .star.s2, #aqw-cinematic-intro.st-bg-night .star.s5, #aqw-cinematic-intro.st-bg-night .star.s9 { animation-delay: .8s; }
#aqw-cinematic-intro.st-bg-night .star.s3, #aqw-cinematic-intro.st-bg-night .star.s7, #aqw-cinematic-intro.st-bg-night .star.s10 { animation-delay: 1.5s; }
#aqw-cinematic-intro.st-bg-night .star.s4, #aqw-cinematic-intro.st-bg-night .star.s6, #aqw-cinematic-intro.st-bg-night .star.s8 { animation-delay: 2.1s; }

#aqw-cinematic-intro .rays { z-index: 2; opacity: 0;
  background: repeating-conic-gradient(from 0deg, rgba(212,175,55,.09) 0deg 4deg, transparent 4deg 15deg);
  animation: aqiRaysSpin 40s linear infinite; filter: blur(1px);
}
#aqw-cinematic-intro.st-rays .rays { opacity: 1; transition: opacity 1s ease; }

#aqw-cinematic-intro .bubble { position: absolute; z-index: 4; border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, rgba(255,255,255,.9), rgba(180,240,255,.25) 55%, transparent 70%);
  border: 1px solid rgba(255,255,255,.28);
}
#aqw-cinematic-intro .bubble.b1 { width: 9px; height: 9px; left: 12%; bottom: -8vh; }
#aqw-cinematic-intro .bubble.b2 { width: 14px; height: 14px; left: 28%; bottom: -12vh; }
#aqw-cinematic-intro .bubble.b3 { width: 6px; height: 6px; left: 44%; bottom: -6vh; }
#aqw-cinematic-intro .bubble.b4 { width: 11px; height: 11px; left: 60%; bottom: -14vh; }
#aqw-cinematic-intro .bubble.b5 { width: 7px; height: 7px; left: 74%; bottom: -9vh; }
#aqw-cinematic-intro .bubble.b6 { width: 12px; height: 12px; left: 88%; bottom: -11vh; }
#aqw-cinematic-intro .bubble.b7 { width: 5px; height: 5px; left: 6%; bottom: -16vh; }
#aqw-cinematic-intro .bubble.b8 { width: 10px; height: 10px; left: 92%; bottom: -5vh; }
#aqw-cinematic-intro.st-bubbles .bubble { animation: aqiBubbleRise linear infinite; opacity: 0; }
#aqw-cinematic-intro.st-bubbles .bubble.b1 { animation-duration: 6.5s; animation-delay: .2s; }
#aqw-cinematic-intro.st-bubbles .bubble.b2 { animation-duration: 8s; animation-delay: 1.1s; }
#aqw-cinematic-intro.st-bubbles .bubble.b3 { animation-duration: 5.4s; animation-delay: .7s; }
#aqw-cinematic-intro.st-bubbles .bubble.b4 { animation-duration: 7.2s; animation-delay: 1.6s; }
#aqw-cinematic-intro.st-bubbles .bubble.b5 { animation-duration: 6s; animation-delay: .4s; }
#aqw-cinematic-intro.st-bubbles .bubble.b6 { animation-duration: 8.6s; animation-delay: 2s; }
#aqw-cinematic-intro.st-bubbles .bubble.b7 { animation-duration: 5.8s; animation-delay: 1.3s; }
#aqw-cinematic-intro.st-bubbles .bubble.b8 { animation-duration: 7.6s; animation-delay: .9s; }

#aqw-cinematic-intro .ember { position: absolute; z-index: 7; width: 4px; height: 4px; border-radius: 50%;
  background: #ffd27a; box-shadow: 0 0 10px #ffb84d; opacity: 0; bottom: -8vh;
}
#aqw-cinematic-intro .ember.e1 { left: 8%; } #aqw-cinematic-intro .ember.e2 { left: 18%; } #aqw-cinematic-intro .ember.e3 { left: 30%; }
#aqw-cinematic-intro .ember.e4 { left: 42%; } #aqw-cinematic-intro .ember.e5 { left: 55%; } #aqw-cinematic-intro .ember.e6 { left: 65%; }
#aqw-cinematic-intro .ember.e7 { left: 75%; } #aqw-cinematic-intro .ember.e8 { left: 84%; } #aqw-cinematic-intro .ember.e9 { left: 92%; }
#aqw-cinematic-intro .ember.e10 { left: 50%; }
#aqw-cinematic-intro.st-ember .ember { animation: aqiEmberRise linear infinite; }
#aqw-cinematic-intro.st-ember .ember.e1 { animation-duration: 3.2s; animation-delay: .1s; }
#aqw-cinematic-intro.st-ember .ember.e2 { animation-duration: 4.1s; animation-delay: .9s; }
#aqw-cinematic-intro.st-ember .ember.e3 { animation-duration: 3.6s; animation-delay: .4s; }
#aqw-cinematic-intro.st-ember .ember.e4 { animation-duration: 4.6s; animation-delay: 1.4s; }
#aqw-cinematic-intro.st-ember .ember.e5 { animation-duration: 3.4s; animation-delay: .7s; }
#aqw-cinematic-intro.st-ember .ember.e6 { animation-duration: 4.3s; animation-delay: 1.8s; }
#aqw-cinematic-intro.st-ember .ember.e7 { animation-duration: 3.8s; animation-delay: .2s; }
#aqw-cinematic-intro.st-ember .ember.e8 { animation-duration: 4.8s; animation-delay: 1.1s; }
#aqw-cinematic-intro.st-ember .ember.e9 { animation-duration: 3.5s; animation-delay: .6s; }
#aqw-cinematic-intro.st-ember .ember.e10 { animation-duration: 4.5s; animation-delay: 1.6s; }

#aqw-cinematic-intro .boat { position: absolute; z-index: 5; left: 10%; bottom: 23%; width: clamp(90px, 12vw, 170px); opacity: 0; }
#aqw-cinematic-intro.st-boat .boat { opacity: 1; transition: opacity .8s ease; animation: aqiBoatBob 3.4s ease-in-out infinite; }

#aqw-cinematic-intro .bird { position: absolute; z-index: 6; width: 44px; opacity: 0; }
#aqw-cinematic-intro .bird.bd1 { top: 16%; left: -10vw; }
#aqw-cinematic-intro .bird.bd2 { top: 22%; left: -14vw; width: 34px; }
#aqw-cinematic-intro.st-birds .bird { opacity: .85; animation: aqiBirdFly 9s ease-in-out infinite; }
#aqw-cinematic-intro.st-birds .bird.bd2 { animation-duration: 11s; animation-delay: 3.2s; }

#aqw-cinematic-intro .ripple { z-index: 3; border: 2px solid rgba(0,224,255,.55); border-radius: 50%;
  width: 24vmin; height: 24vmin; opacity: 0; left: 50%; top: 50%;
  transform: translate(-50%, -50%) scale(.2);
}
#aqw-cinematic-intro .ripple.r2 { width: 42vmin; height: 42vmin; border-color: rgba(255,255,255,.35); }
#aqw-cinematic-intro.st-ripple .ripple.r1 { animation: aqiRippleOut 1.6s .15s ease-out both; }
#aqw-cinematic-intro.st-ripple .ripple.r2 { animation: aqiRippleOut 1.6s .35s ease-out both; }

#aqw-cinematic-intro .impact-ring { z-index: 30; border: 2px solid rgba(255,225,140,.9); border-radius: 50%;
  width: 34vmin; height: 34vmin; opacity: 0;
  transform: translate(-50%, -50%) scale(.2); left: 50%; top: 50%;
  box-shadow: 0 0 30px rgba(255,200,90,.4), inset 0 0 30px rgba(255,200,90,.3);
}
#aqw-cinematic-intro.st-way .impact-ring { animation: aqiRingBoom .65s .62s cubic-bezier(.2,.8,.3,1) both; }
#aqw-cinematic-intro.st-tours .impact-ring { animation: aqiRingBoom .6s .6s cubic-bezier(.2,.8,.3,1) both; }

#aqw-cinematic-intro .stack {
  position: absolute; left: 50%; top: 50%;
  transform: translate(-50%, -50%);
  display: flex; flex-direction: column; align-items: center;
  gap: clamp(10px, 3.4vh, 30px); z-index: 20;
}
#aqw-cinematic-intro.st-bloom .stack { animation: aqiBloomOut .9s ease both; }

#aqw-cinematic-intro .word {
  position: relative;
  display: flex; gap: .06em;
  font-family: 'Playfair Display', Georgia, serif; font-weight: 900;
  font-size: clamp(46px, 9.5vw, 150px); letter-spacing: .1em; line-height: 1;
  user-select: none; will-change: transform, opacity, filter;
}
#aqw-cinematic-intro .word span { display: inline-block; opacity: 0; will-change: transform, filter; }

#aqw-cinematic-intro #w-aqua {
  background: linear-gradient(100deg, var(--aqua-d) 0%, var(--aqua) 30%, #dcfbff 50%, var(--aqua) 70%, var(--aqua-d) 100%);
  background-size: 230% auto;
  -webkit-background-clip: text; background-clip: text; color: transparent;
  text-shadow: 0 0 46px rgba(0,224,255,.4);
  overflow: hidden;
}
#aqw-cinematic-intro #w-aqua span { background: none; -webkit-background-clip: initial; background-clip: initial; color: inherit; text-shadow: none; }
#aqw-cinematic-intro.st-aqua #w-aqua { animation: aqiTextShimmer 3.2s linear infinite; }
#aqw-cinematic-intro.st-aqua #w-aqua span {
  animation: aqiAssemble .95s cubic-bezier(.2,.8,.25,1) both;
  animation-delay: calc(var(--i) * 150ms);
}
#aqw-cinematic-intro .aq-sweep { position: absolute; inset: -20%; pointer-events: none; opacity: 0;
  background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,.5) 50%, transparent 65%);
  transform: translateX(-150%) skewX(-8deg);
}
#aqw-cinematic-intro.st-aq-sweep .aq-sweep { animation: aqiAqSweep 1.6s .55s cubic-bezier(.4,0,.3,1) both; }

#aqw-cinematic-intro .aqua-reflect {
  position: absolute; left: 0; right: 0; top: 100%; height: 55%;
  display: flex; gap: .06em; z-index: -1; pointer-events: none;
  transform: scaleY(-1); opacity: .3;
  background: linear-gradient(180deg, rgba(0,224,255,.32), transparent);
  -webkit-mask-image: linear-gradient(180deg, rgba(0,0,0,.55), transparent 88%);
  mask-image: linear-gradient(180deg, rgba(0,0,0,.55), transparent 88%);
  font-family: 'Playfair Display', Georgia, serif; font-weight: 900;
  font-size: inherit; letter-spacing: .1em; overflow: hidden;
}
#aqw-cinematic-intro .aqua-reflect span { opacity: 0; }
#aqw-cinematic-intro.st-aqua .aqua-reflect span {
  animation: aqiAssemble .95s cubic-bezier(.2,.8,.25,1) both;
  animation-delay: calc(var(--i) * 150ms + 130ms);
}

#aqw-cinematic-intro #w-way span {
  background: linear-gradient(100deg, var(--gold-d) 0%, var(--gold) 30%, #fff3c4 50%, var(--gold) 70%, var(--gold-d) 100%);
  background-size: 230% auto;
  -webkit-background-clip: text; background-clip: text; color: transparent;
  text-shadow: 0 0 60px rgba(212,175,55,.45);
  -webkit-text-stroke: 1px rgba(255,225,150,.35);
  transform: translateY(150px) scale(1.3);
}
#aqw-cinematic-intro.st-way #w-way span {
  animation: aqiSunRise .7s cubic-bezier(.15,.85,.3,1.1) both, aqiTextShimmer 2.8s linear infinite;
  animation-delay: calc(var(--i) * 140ms), 0s;
}
#aqw-cinematic-intro.st-waypulse #w-way span { animation: aqiPulseGlow .55s ease both, aqiTextShimmer 2.8s linear infinite; }

#aqw-cinematic-intro #w-tours span {
  background: linear-gradient(100deg, #cfcfcf 0%, #fff 30%, var(--gold-b) 50%, #fff 70%, #cfcfcf 100%);
  background-size: 230% auto;
  -webkit-background-clip: text; background-clip: text; color: transparent;
  text-shadow: 0 0 70px rgba(255,220,140,.45);
  transform: translateY(-160px) scale(1.15);
}
#aqw-cinematic-intro.st-tours #w-tours span {
  animation: aqiDropSpin .78s cubic-bezier(.2,.8,.25,1) both, aqiTextShimmer 2.6s linear infinite;
  animation-delay: calc(var(--i) * 120ms), 0s;
}

#aqw-cinematic-intro.st-stack-off #w-aqua span, #aqw-cinematic-intro.st-stack-off #w-way span,
#aqw-cinematic-intro.st-stack-off #w-tours span, #aqw-cinematic-intro.st-stack-off .aqua-reflect span { animation: aqiFadeOutBlur .5s ease both; }

#aqw-cinematic-intro .emblem {
  position: absolute; left: 50%; top: 50%; z-index: 25;
  transform: translate(-50%, -50%);
  display: flex; flex-direction: column; align-items: center;
  gap: clamp(2.2vh, 4vh, 5vh); opacity: 0; pointer-events: none;
}
#aqw-cinematic-intro.st-emblem .emblem { animation: aqiEmblemPop .9s cubic-bezier(.2,.8,.25,1) both; }
#aqw-cinematic-intro .ring-wrap { position: relative; width: 44vmin; height: 44vmin; }
#aqw-cinematic-intro .badge-svg { position: absolute; inset: 0; width: 44vmin; height: 44vmin; opacity: 0; transform: rotate(-90deg); }
#aqw-cinematic-intro .badge-svg circle {
  fill: none; stroke: url(#aqiGoldGrad); stroke-width: 1.6; opacity: .95;
  stroke-dasharray: 1131; stroke-dashoffset: 1131;
  filter: drop-shadow(0 0 16px rgba(212,175,55,.65));
}
#aqw-cinematic-intro.st-circledraw .badge-svg { animation: aqiBadgeFade 1.5s ease both; }
#aqw-cinematic-intro.st-circledraw .badge-svg circle { animation: aqiBadgeDraw 1.25s cubic-bezier(.6,0,.2,1) both; }
#aqw-cinematic-intro .logo-badge {
  position: absolute; inset: 0; margin: auto;
  width: 26vmin; height: 26vmin; z-index: 2;
  display: flex; align-items: center; justify-content: center;
  opacity: 0; overflow: hidden; border-radius: 50%;
  background: radial-gradient(circle at 50% 42%, rgba(212,175,55,.22) 0%, transparent 68%);
}
#aqw-cinematic-intro .logo-badge img {
  width: 84%; height: 84%; object-fit: cover; border-radius: 50%;
  border: 2px solid rgba(212,175,55,.7);
  filter: drop-shadow(0 0 26px rgba(212,175,55,.5));
}
#aqw-cinematic-intro .logo-badge .logo-shine { position: absolute; inset: -20%;
  background: linear-gradient(105deg, transparent 42%, rgba(255,255,255,.5) 50%, transparent 58%);
  transform: translateX(-140%) skewX(-10deg);
}
#aqw-cinematic-intro.st-logo .logo-badge { animation: aqiLogoPop 1.05s .25s cubic-bezier(.2,.8,.25,1) both; }
#aqw-cinematic-intro.st-shine .logo-shine { animation: aqiShineSweep 1.4s .2s cubic-bezier(.4,0,.3,1) both; }

#aqw-cinematic-intro .lockup { z-index: 40; text-align: center; opacity: 0; }
#aqw-cinematic-intro.st-lockup .lockup { animation: aqiLockupPop 1.15s cubic-bezier(.2,.8,.25,1) both; }

#aqw-cinematic-intro .lockup .presents {
  font-size: clamp(10px, 1.4vw, 15px); letter-spacing: .72em; text-transform: uppercase;
  color: rgba(184,184,184,.75); margin-bottom: 2.2vh;
}
#aqw-cinematic-intro .lockup .brand {
  font-family: 'Playfair Display', Georgia, serif; font-weight: 900;
  font-size: clamp(52px, 11vw, 170px); line-height: 1; letter-spacing: .18em;
  background: linear-gradient(180deg, transparent 0%, transparent 49.8%, #ffe9a8 50%, #d4af37 78%, #8a6d1f 100%);
  background-size: 230% 200%;
  -webkit-background-clip: text; background-clip: text; color: transparent;
  -webkit-text-stroke: 1.5px rgba(212,175,55,.85);
  position: relative; overflow: hidden; padding-left: .18em;
}
#aqw-cinematic-intro.st-lockup .lockup .brand { animation: aqiGoldPour 1.9s cubic-bezier(.5,0,.3,1) both; }
#aqw-cinematic-intro .lockup .brand-sub {
  font-family: 'Playfair Display', Georgia, serif; font-weight: 700;
  font-size: clamp(22px, 4vw, 52px); letter-spacing: .68em; color: #d9d9d9;
  margin-top: 1.4vh; padding-left: .68em;
}
#aqw-cinematic-intro .lockup .rule { display: flex; align-items: center; justify-content: center; gap: 1.2em; margin: 3.4vh 0 2.4vh; }
#aqw-cinematic-intro .lockup .rule .line { width: clamp(40px, 9vw, 130px); height: 1px; background: linear-gradient(90deg, transparent, var(--gold)); }
#aqw-cinematic-intro .lockup .rule .line:last-child { background: linear-gradient(90deg, var(--gold), transparent); }
#aqw-cinematic-intro .lockup .rule .dot { width: 7px; height: 7px; background: var(--gold); transform: rotate(45deg); box-shadow: 0 0 12px rgba(212,175,55,.9); }
#aqw-cinematic-intro .lockup .tagline {
  font-size: clamp(10px, 1.5vw, 15px); letter-spacing: .5em; text-transform: uppercase;
  color: rgba(184,184,184,.85); padding-left: .5em;
}

#aqw-cinematic-intro .location {
  position: absolute; left: 50%; bottom: 13vh; z-index: 57;
  transform: translateX(-50%) translateY(20px);
  display: flex; align-items: center; gap: 1em;
  font-size: clamp(10px, 1.4vw, 14px); letter-spacing: .5em; text-transform: uppercase;
  color: rgba(220,220,220,.9); opacity: 0;
}
#aqw-cinematic-intro .location .lline { width: clamp(28px, 6vw, 80px); height: 1px; background: linear-gradient(90deg, transparent, var(--gold)); }
#aqw-cinematic-intro .location .lline:last-child { background: linear-gradient(90deg, var(--gold), transparent); }
#aqw-cinematic-intro.st-location .location { animation: aqiLocUp .9s .3s cubic-bezier(.2,.8,.25,1) both; }

#aqw-cinematic-intro .spark { position: absolute; width: 5px; height: 5px; background: #fff; border-radius: 50%; opacity: 0;
  box-shadow: 0 0 8px 2px rgba(255,255,255,.8);
}
#aqw-cinematic-intro .spark.s1 { top: 6%; left: 12%; } #aqw-cinematic-intro .spark.s2 { top: 18%; right: 10%; }
#aqw-cinematic-intro .spark.s3 { bottom: 14%; left: 20%; } #aqw-cinematic-intro .spark.s4 { bottom: 8%; right: 24%; }
#aqw-cinematic-intro .spark.s5 { top: 4%; left: 52%; } #aqw-cinematic-intro .spark.s6 { top: 28%; left: 6%; }
#aqw-cinematic-intro .spark.s7 { bottom: 22%; right: 8%; } #aqw-cinematic-intro .spark.s8 { top: 8%; right: 40%; }
#aqw-cinematic-intro.st-lockup .spark { animation: aqiTwinkle 2.6s ease infinite; }
#aqw-cinematic-intro.st-lockup .spark.s2, #aqw-cinematic-intro.st-lockup .spark.s5, #aqw-cinematic-intro.st-lockup .spark.s7 { animation-delay: .7s; }
#aqw-cinematic-intro.st-lockup .spark.s3, #aqw-cinematic-intro.st-lockup .spark.s8 { animation-delay: 1.3s; }
#aqw-cinematic-intro.st-lockup .spark.s4, #aqw-cinematic-intro.st-lockup .spark.s6 { animation-delay: 1.9s; }

#aqw-cinematic-intro .idle-glow { position: absolute; inset: -30%; z-index: -1; background: radial-gradient(circle, rgba(212,175,55,.18) 0%, transparent 60%); }
#aqw-cinematic-intro.st-lockup .lockup .idle-glow { animation: aqiIdlePulse 3.2s ease-in-out infinite; }

#aqw-cinematic-intro .sound-btn, #aqw-cinematic-intro .skip-btn {
  position: absolute; z-index: 70;
  font-family: Inter, sans-serif; font-size: 12px; letter-spacing: .18em; text-transform: uppercase;
  color: #e8e8e8; background: rgba(20,20,20,.85); border: 1px solid rgba(255,255,255,.22);
  padding: 11px 18px; border-radius: 3px; cursor: pointer; transition: all .25s ease;
}
#aqw-cinematic-intro .sound-btn { right: 14px; bottom: 26px; }
#aqw-cinematic-intro .skip-btn { right: 14px; bottom: 76px; opacity: 0; pointer-events: none; }
#aqw-cinematic-intro .sound-btn:hover, #aqw-cinematic-intro .skip-btn:hover { border-color: var(--gold); color: var(--gold-b); }
#aqw-cinematic-intro.show-skip .skip-btn { opacity: .88; pointer-events: auto; }

@keyframes aqiAssemble {
  0% { opacity: 0; transform: translate(var(--dx), var(--dy)) rotate(var(--rot)) scale(.3); filter: blur(16px); }
  60% { opacity: 1; filter: blur(2px); }
  80% { transform: translate(0, 0) rotate(0) scale(1.05); filter: blur(0); }
  100% { opacity: 1; transform: translate(0, 0) rotate(0) scale(1); filter: blur(0); }
}
@keyframes aqiSunRise {
  0% { opacity: 0; transform: translateY(150px) scale(1.3); filter: blur(16px); }
  55% { opacity: 1; transform: translateY(-16px) scale(1); filter: blur(0); }
  72% { transform: translateY(6px); }
  86% { transform: translateY(-2px); }
  100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
}
@keyframes aqiDropSpin {
  0% { opacity: 0; transform: translateY(-160px) scale(1.15) rotateX(85deg); filter: blur(12px); }
  50% { opacity: 1; transform: translateY(14px) scale(.98) rotateX(0); filter: blur(0); }
  68% { transform: translateY(-7px); }
  82% { transform: translateY(2px); }
  100% { opacity: 1; transform: translateY(0) scale(1) rotateX(0); filter: blur(0); }
}
@keyframes aqiFadeOutBlur {
  from { opacity: 1; transform: scale(1) rotate(0) rotateX(0); filter: blur(0); }
  to { opacity: 0; transform: scale(1) rotate(0) rotateX(0); filter: blur(22px); }
}
@keyframes aqiBloomOut {
  0% { opacity: 1; filter: none; }
  40% { opacity: 1; filter: brightness(5) blur(5px); }
  100% { opacity: 0; filter: brightness(7) blur(30px); }
}
@keyframes aqiTextShimmer {
  0% { background-position: 0% center; }
  100% { background-position: 230% center; }
}
@keyframes aqiGoldPour {
  0% { background-position: 0% 100%; }
  60% { background-position: 230% 0%; }
  100% { background-position: 230% 0%; }
}
@keyframes aqiPulseGlow {
  0% { transform: scale(1); filter: brightness(1); }
  40% { transform: scale(1.06); filter: brightness(1.4); }
  100% { transform: scale(1); filter: brightness(1); }
}
@keyframes aqiFlashQuick {
  0% { opacity: 0; } 12% { opacity: .95; } 26% { opacity: .08; }
  42% { opacity: .85; } 100% { opacity: 0; }
}
@keyframes aqiFlashMega {
  0% { opacity: 0; } 8% { opacity: 1; } 20% { opacity: .18; }
  30% { opacity: 1; } 46% { opacity: .08; } 100% { opacity: 0; }
}
@keyframes aqiClapFlash {
  0% { opacity: 0; } 15% { opacity: .9; } 100% { opacity: 0; }
}
@keyframes aqiStreakSweep {
  0% { opacity: 0; transform: rotate(-22deg) translateX(-140%); }
  12% { opacity: 1; }
  88% { opacity: 1; }
  100% { opacity: 0; transform: rotate(-22deg) translateX(270%); }
}
@keyframes aqiAnamSweep {
  0% { transform: translateX(-55vw) scaleX(.5); opacity: 0; }
  14% { opacity: 1; }
  86% { opacity: 1; }
  100% { transform: translateX(55vw) scaleX(1.3); opacity: 0; }
}
@keyframes aqiIrisCloseOpen {
  0% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
  14% { opacity: 1; }
  38% { transform: translate(-50%, -50%) scale(1); }
  62% { transform: translate(-50%, -50%) scale(1); }
  100% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
}
@keyframes aqiCamShake {
  0% { transform: translate(0,0) rotate(0); }
  15% { transform: translate(-6px,3px) rotate(-.5deg); }
  30% { transform: translate(5px,-4px) rotate(.4deg); }
  45% { transform: translate(-4px,-2px) rotate(-.3deg); }
  60% { transform: translate(3px,3px) rotate(.2deg); }
  100% { transform: translate(0,0) rotate(0); }
}
@keyframes aqiCamShake3 {
  0% { transform: translate(0,0) rotate(0); }
  20% { transform: translate(-10px,5px) rotate(-.7deg); }
  42% { transform: translate(8px,-7px) rotate(.6deg); }
  64% { transform: translate(-6px,-4px) rotate(-.4deg); }
  100% { transform: translate(0,0) rotate(0); }
}
@keyframes aqiRippleOut {
  0% { opacity: .85; transform: translate(-50%,-50%) scale(.18); }
  100% { opacity: 0; transform: translate(-50%,-50%) scale(1); }
}
@keyframes aqiRingBoom {
  0% { opacity: 0; transform: translate(-50%,-50%) scale(.2); }
  20% { opacity: .9; }
  100% { opacity: 0; transform: translate(-50%,-50%) scale(1.4); }
}
@keyframes aqiBubbleRise {
  0% { transform: translateY(0) scale(.6); opacity: 0; }
  12% { opacity: .75; }
  88% { opacity: .5; }
  100% { transform: translateY(-210px) scale(1.15); opacity: 0; }
}
@keyframes aqiEmberRise {
  0% { transform: translate(0, 0) scale(1); opacity: 0; }
  12% { opacity: .9; }
  85% { opacity: .55; }
  100% { transform: translate(var(--ex, 20px), -82vh) scale(.5); opacity: 0; }
}
@keyframes aqiBadgeDraw { to { stroke-dashoffset: 0; } }
@keyframes aqiBadgeFade {
  0% { opacity: 0; transform: rotate(-90deg) scale(.7); }
  30% { opacity: .5; }
  100% { opacity: 1; transform: rotate(90deg) scale(1); }
}
@keyframes aqiEmblemPop {
  0% { opacity: 0; transform: translate(-50%,-50%) scale(.8); filter: blur(10px); }
  60% { opacity: 1; filter: blur(0); }
  100% { opacity: 1; transform: translate(-50%,-50%) scale(1); }
}
@keyframes aqiLogoPop {
  0% { opacity: 0; transform: scale(.4); filter: blur(16px); }
  60% { opacity: 1; filter: blur(0); }
  78% { transform: scale(1.07); }
  100% { opacity: 1; transform: scale(1); filter: blur(0); }
}
@keyframes aqiLockupPop {
  0% { opacity: 0; transform: scale(.6) translateY(34px); filter: blur(18px); }
  55% { opacity: 1; filter: blur(0); }
  75% { transform: scale(1.04) translateY(-5px); }
  100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
}
@keyframes aqiShineSweep {
  0% { transform: translateX(-140%) skewX(-10deg); opacity: 0; }
  15% { opacity: 1; }
  75% { opacity: 1; }
  100% { transform: translateX(250%) skewX(-10deg); opacity: 0; }
}
@keyframes aqiAqSweep {
  0% { transform: translateX(-150%) skewX(-8deg); opacity: 0; }
  15% { opacity: .9; }
  80% { opacity: .9; }
  100% { transform: translateX(250%) skewX(-8deg); opacity: 0; }
}
@keyframes aqiFwBurst {
  0% { opacity: 1; transform: translate(0, 0) scale(1); }
  65% { opacity: 1; }
  100% { opacity: 0; transform: translate(var(--fx), var(--fy)) scale(.25); }
}
@keyframes aqiFwCore {
  0% { opacity: 1; transform: translate(-50%,-50%) scale(1); }
  100% { opacity: 0; transform: translate(-50%,-50%) scale(3.2); }
}
@keyframes aqiTwinkle {
  0%, 100% { opacity: 0; transform: scale(.4); }
  50% { opacity: 1; transform: scale(1.25); }
}
@keyframes aqiIdlePulse {
  0%, 100% { opacity: .55; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.08); }
}
@keyframes aqiRaysSpin { to { transform: rotate(360deg); } }
@keyframes aqiCausticDrift {
  0% { background-position: 0 0, 0 0, 0 0, 0 0; }
  100% { background-position: 500px 250px, 430px -190px, 580px 300px, 470px -230px; }
}
@keyframes aqiWaveDrift { to { transform: translateX(-50%); } }
@keyframes aqiBoatBob {
  0%, 100% { transform: translateY(0) rotate(-2deg); }
  50% { transform: translateY(-8px) rotate(2.5deg); }
}
@keyframes aqiBirdFly {
  0% { transform: translate(0, 0); }
  25% { transform: translate(32vw, -2.5vh); }
  50% { transform: translate(64vw, 0); }
  75% { transform: translate(96vw, -2vh); }
  100% { transform: translate(128vw, 0); }
}
@keyframes aqiCamDrift {
  0% { transform: scale(1); }
  100% { transform: scale(1.06); }
}
@keyframes aqiPlxIn {
  0% { transform: scale(1.08) translateX(-1.2%); }
  100% { transform: scale(1) translateX(0); }
}
@keyframes aqiGrainJit {
  0% { transform: translate(0,0); }
  25% { transform: translate(-2%,1%); }
  50% { transform: translate(1%,-2%); }
  75% { transform: translate(-1%,2%); }
  100% { transform: translate(2%,-1%); }
}
@keyframes aqiGrainFadeIn { to { opacity: .5; } }
@keyframes aqiBarIn { to { transform: scaleY(1); } }
@keyframes aqiCbIn {
  0% { opacity: 0; transform: translate(-50%, -50%) rotate(-8deg) scale(1.18); }
  100% { opacity: 1; transform: translate(-50%, -50%) rotate(-2deg) scale(1); }
}
@keyframes aqiCbOut {
  0% { opacity: 1; transform: translate(-50%, -50%) rotate(-2deg) scale(1); }
  100% { opacity: 0; transform: translate(-50%, -140%) rotate(-10deg) scale(.85); }
}
@keyframes aqiCapShow {
  0% { opacity: 0; transform: translateX(-50%) translateY(10px); letter-spacing: .8em; }
  14% { opacity: .85; transform: translateX(-50%) translateY(0); letter-spacing: .5em; }
  80% { opacity: .85; }
  100% { opacity: 0; transform: translateX(-50%) translateY(-8px); }
}
@keyframes aqiLocUp {
  0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
  100% { opacity: 1; transform: translateX(-50%) translateY(0); }
}
@keyframes aqiRecBlink { 0% { opacity: 1; } 50% { opacity: .15; } 100% { opacity: 1; } }
`;

  /* ─── 4. OVERLAY & STAGE DOM ─── */
  var overlay = document.createElement('div');
  overlay.id = 'aqw-cinematic-intro';
  overlay.setAttribute('aria-hidden', 'true');

  overlay.innerHTML = `
    <div class="stage" id="aqwStage">
      <div class="layer sc sc-deep">
        <div class="godrays"></div>
        <div class="caustics"></div>
        <div class="wave">
          <svg viewBox="0 0 2000 120" preserveAspectRatio="none">
            <path d="M0 80 Q 125 40 250 80 T 500 80 T 750 80 T 1000 80 T 1250 80 T 1500 80 T 1750 80 T 2000 80 L 2000 120 L 0 120 Z" fill="#0b3a55"/>
          </svg>
        </div>
        <div class="wave w2">
          <svg viewBox="0 0 2000 120" preserveAspectRatio="none">
            <path d="M0 60 Q 125 95 250 60 T 500 60 T 750 60 T 1000 60 T 1250 60 T 1500 60 T 1750 60 T 2000 60 L 2000 120 L 0 120 Z" fill="#072a40"/>
          </svg>
        </div>
      </div>

      <div class="layer sc sc-gold">
        <div class="sunrays"></div>
        <div class="sun"></div>
        <div class="dune d2">
          <svg viewBox="0 0 2000 400" preserveAspectRatio="none">
            <path d="M0 400 Q 300 300 600 370 T 1200 350 T 2000 380 L 2000 400 L 0 400 Z" fill="#8a5f14"/>
          </svg>
        </div>
        <div class="dune d1">
          <svg viewBox="0 0 2000 400" preserveAspectRatio="none">
            <path d="M0 400 Q 250 260 550 340 T 1100 320 T 2000 360 L 2000 400 L 0 400 Z" fill="#c99b3f"/>
          </svg>
        </div>
      </div>

      <div class="layer sc sc-sunset">
        <div class="sunhalf"></div>
        <div class="reflect"></div>
        <div class="wave">
          <svg viewBox="0 0 2000 120" preserveAspectRatio="none">
            <path d="M0 70 Q 125 35 250 70 T 500 70 T 750 70 T 1000 70 T 1250 70 T 1500 70 T 1750 70 T 2000 70 L 2000 120 L 0 120 Z" fill="#0e4258"/>
          </svg>
        </div>
        <div class="wave w2">
          <svg viewBox="0 0 2000 120" preserveAspectRatio="none">
            <path d="M0 50 Q 125 80 250 50 T 500 50 T 750 50 T 1000 50 T 1250 50 T 1500 50 T 1750 50 T 2000 50 L 2000 120 L 0 120 Z" fill="#082c3e"/>
          </svg>
        </div>
      </div>

      <div class="layer sc sc-night">
        <div class="star s1"></div><div class="star s2"></div><div class="star s3"></div>
        <div class="star s4"></div><div class="star s5"></div><div class="star s6"></div>
        <div class="star s7"></div><div class="star s8"></div><div class="star s9"></div>
        <div class="star s10"></div>
      </div>

      <div class="layer rays"></div>

      <div class="bubble b1"></div><div class="bubble b2"></div><div class="bubble b3"></div>
      <div class="bubble b4"></div><div class="bubble b5"></div><div class="bubble b6"></div>
      <div class="bubble b7"></div><div class="bubble b8"></div>

      <div class="ember e1" style="--ex:26px"></div><div class="ember e2" style="--ex:-30px"></div>
      <div class="ember e3" style="--ex:18px"></div><div class="ember e4" style="--ex:-22px"></div>
      <div class="ember e5" style="--ex:34px"></div><div class="ember e6" style="--ex:-26px"></div>
      <div class="ember e7" style="--ex:16px"></div><div class="ember e8" style="--ex:-34px"></div>
      <div class="ember e9" style="--ex:22px"></div><div class="ember e10" style="--ex:-14px"></div>

      <svg class="boat" viewBox="0 0 120 80">
        <path d="M8 55 Q60 78 112 55 L96 60 Q60 68 24 60 Z" fill="#241708"/>
        <path d="M58 8 L58 55 L80 55 Q80 22 58 8 Z" fill="#e8ddc8"/>
        <path d="M52 14 L52 55 L32 55 Q32 30 52 14 Z" fill="#cfc2a8"/>
        <line x1="55" y1="6" x2="55" y2="58" stroke="#5a4632" stroke-width="2.5"/>
      </svg>

      <svg class="bird bd1" viewBox="0 0 40 16">
        <path d="M2 12 Q10 4 20 12 Q30 4 38 12" fill="none" stroke="#1a0f22" stroke-width="2.5" stroke-linecap="round"/>
      </svg>
      <svg class="bird bd2" viewBox="0 0 40 16">
        <path d="M2 12 Q10 4 20 12 Q30 4 38 12" fill="none" stroke="#1a0f22" stroke-width="2.5" stroke-linecap="round"/>
      </svg>

      <div class="layer ripple r1"></div>
      <div class="layer ripple r2"></div>
      <div class="layer impact-ring"></div>

      <div class="emblem">
        <div class="ring-wrap">
          <svg class="badge-svg" viewBox="0 0 400 400">
            <defs>
              <linearGradient id="aqiGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#8a6d1f"/>
                <stop offset="30%" stop-color="#d4af37"/>
                <stop offset="55%" stop-color="#ffe9a8"/>
                <stop offset="75%" stop-color="#d4af37"/>
                <stop offset="100%" stop-color="#8a6d1f"/>
              </linearGradient>
            </defs>
            <circle cx="200" cy="200" r="180"/>
          </svg>
          <div class="logo-badge">
            <img src="${LOGO_URL}" alt="AQUAWAY TOURS logo" draggable="false">
            <div class="logo-shine"></div>
          </div>
        </div>
        <div class="lockup">
          <div class="idle-glow"></div>
          <div class="presents">AQUAWAY TOURS PRESENTS</div>
          <div class="brand">AQUAWAY</div>
          <div class="brand-sub">TOURS</div>
          <div class="rule"><span class="line"></span><span class="dot"></span><span class="line"></span></div>
          <div class="tagline">HURGHADA &middot; RED SEA &middot; EGYPT</div>
        </div>
      </div>

      <div class="stack">
        <div class="word" id="w-aqua">
          <span style="--i:0; --dx:-46px; --dy:52px; --rot:-22deg">A</span>
          <span style="--i:1; --dx:60px; --dy:-30px; --rot:18deg">Q</span>
          <span style="--i:2; --dx:-34px; --dy:-58px; --rot:14deg">U</span>
          <span style="--i:3; --dx:44px; --dy:44px; --rot:-16deg">A</span>
          <div class="aq-sweep"></div>
          <div class="aqua-reflect" aria-hidden="true">
            <span style="--i:0; --dx:-46px; --dy:52px; --rot:-22deg">A</span>
            <span style="--i:1; --dx:60px; --dy:-30px; --rot:18deg">Q</span>
            <span style="--i:2; --dx:-34px; --dy:-58px; --rot:14deg">U</span>
            <span style="--i:3; --dx:44px; --dy:44px; --rot:-16deg">A</span>
          </div>
        </div>
        <div class="word" id="w-way">
          <span style="--i:0">W</span><span style="--i:1">A</span><span style="--i:2">Y</span>
        </div>
        <div class="word" id="w-tours">
          <span style="--i:0">T</span><span style="--i:1">O</span><span style="--i:2">U</span><span style="--i:3">R</span><span style="--i:4">S</span>
        </div>
      </div>

      <div class="layer clap"></div>
      <div class="layer flash"></div>
      <div class="layer streak"></div>
      <div class="layer streak s2"></div>
      <div class="layer anamorph"></div>
      <div class="layer iris"></div>

      <div class="clapboard">
        <div class="cb-top">
          <div class="cb-title">AQUAWAY TOURS</div>
          <div class="cb-pres">Presents</div>
        </div>
        <div class="cb-stripes"></div>
        <div class="cb-bottom">Scene 1 &middot; Take 1 &middot; Red Sea</div>
      </div>

      <div class="actcap cap1">Act I &middot; The Deep</div>
      <div class="actcap cap2">Act II &middot; The Desert</div>
      <div class="actcap cap3">Act III &middot; The Sunset</div>

      <div class="spark s1"></div><div class="spark s2"></div><div class="spark s3"></div>
      <div class="spark s4"></div><div class="spark s5"></div><div class="spark s6"></div>
      <div class="spark s7"></div><div class="spark s8"></div>

      <div class="bar bar-top"></div>
      <div class="bar bar-bottom"></div>
      <div class="layer vignette"></div>
      <div class="layer grain"></div>
    </div>

    <div class="tc" id="aqwTc"><span class="rec"></span><span id="aqwTcText">00:00:00:00</span></div>
    <div class="location"><span class="lline"></span>Red Sea &middot; Egypt<span class="lline"></span></div>

    <button class="sound-btn" id="aqwSoundBtn" aria-label="Toggle intro sound">Sound: ON</button>
    <button class="skip-btn" id="aqwSkipBtn" aria-label="Skip cinematic intro">Skip Intro</button>
  `;

  var stage = overlay.querySelector('.stage');
  var tcText = overlay.querySelector('#aqwTcText');
  var soundBtn = overlay.querySelector('#aqwSoundBtn');
  var skipBtn = overlay.querySelector('#aqwSkipBtn');

  /* ─── 5. AUDIO ENGINE (WEB AUDIO + MUSIC STING) ─── */
  var AC = null, soundOn = true, musicBuf = null, stingPlayed = false;
  var timer = null, tcTimer = null;
  var timeouts = [];
  var done = false, isSkipping = false;

  function ctx() {
    if (!AC) { try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} }
    if (AC && AC.state === 'suspended') AC.resume();
    return AC;
  }

  fetch(MUSIC_URL).then(function (r) { return r.arrayBuffer(); })
    .then(function (b) { return ctx().decodeAudioData(b); })
    .then(function (buf) { musicBuf = buf; })
    .catch(function () {});

  function musicSting(t, vol) {
    if (!AC || !soundOn || !musicBuf) return;
    var s = AC.createBufferSource(), g = AC.createGain();
    s.buffer = musicBuf;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol || .32, t + .06);
    g.gain.setValueAtTime(vol || .32, t + 1.55);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 2.0);
    s.connect(g).connect(AC.destination);
    s.start(t, 0, 2.0);
    stingPlayed = true;
  }

  function noise(t, dur, vol, f0, f1, type) {
    if (!AC || !soundOn) return;
    var n = AC.createBufferSource(), g = AC.createGain(), f = AC.createBiquadFilter();
    var buf = AC.createBuffer(1, AC.sampleRate * dur, AC.sampleRate);
    var d = buf.getChannelData(0);
    for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    n.buffer = buf; n.loop = true;
    f.type = type || 'bandpass'; f.frequency.setValueAtTime(f0, t); f.frequency.exponentialRampToValueAtTime(f1, t + dur);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + dur * 0.18); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    n.connect(f).connect(g).connect(AC.destination);
    n.start(t); n.stop(t + dur + .05);
  }

  function boom(t, vol, f0) {
    if (!AC || !soundOn) return;
    var o = AC.createOscillator(), g = AC.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(f0 || 95, t); o.frequency.exponentialRampToValueAtTime(f0 ? f0 * .38 : 36, t + .55);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol || .7, t + .02); g.gain.exponentialRampToValueAtTime(0.0001, t + .6);
    o.connect(g).connect(AC.destination); o.start(t); o.stop(t + .7);
  }

  function subBoom(t, vol) {
    if (!AC || !soundOn) return;
    var o = AC.createOscillator(), g = AC.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(54, t); o.frequency.exponentialRampToValueAtTime(25, t + .95);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol || .85, t + .03); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.05);
    o.connect(g).connect(AC.destination); o.start(t); o.stop(t + 1.1);
  }

  function zap(t) {
    if (!AC || !soundOn) return;
    var n = AC.createBufferSource(), g = AC.createGain(), f = AC.createBiquadFilter();
    var buf = AC.createBuffer(1, AC.sampleRate * .22, AC.sampleRate);
    var d = buf.getChannelData(0);
    for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    n.buffer = buf; f.type = 'highpass'; f.frequency.value = 2600;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.5, t + .01); g.gain.exponentialRampToValueAtTime(0.0001, t + .2);
    n.connect(f).connect(g).connect(AC.destination); n.start(t); n.stop(t + .3);
  }

  function clap(t) {
    if (!AC || !soundOn) return;
    noise(t, .14, .55, 1800, 300, 'bandpass');
    boom(t + .02, .5, 120);
  }

  function pop(t, fr) {
    noise(t, .05, .16, fr || 1800, fr || 1800, 'highpass');
  }

  function crackle(t) {
    if (!AC || !soundOn) return;
    for (var i = 0; i < 10; i++) pop(t + i * .05 + Math.random() * .03, 2600 + Math.random() * 2200);
  }

  function shimmer(t) {
    if (!AC || !soundOn) return;
    [880, 1320, 1760].forEach(function (fr, i) {
      var o = AC.createOscillator(), g = AC.createGain();
      o.type = 'sine'; o.frequency.value = fr;
      g.gain.setValueAtTime(0, t + i * .05); g.gain.linearRampToValueAtTime(.06, t + i * .05 + .06); g.gain.exponentialRampToValueAtTime(0.0001, t + i * .05 + 1.4);
      o.connect(g).connect(AC.destination); o.start(t + i * .05); o.stop(t + i * .05 + 1.5);
    });
  }

  function water(t) {
    noise(t, 1.3, .2, 900, 160, 'lowpass');
  }

  function irisWhoosh(t) {
    noise(t, .7, .14, 2400, 150, 'bandpass');
  }

  function whoosh(t, dur, vol) {
    noise(t, dur || .9, vol || .16, 350, 2600, 'bandpass');
  }

  function burst(x, y, n, colors, size) {
    var fw = document.createElement('div');
    fw.style.cssText = 'position:absolute;z-index:43;left:' + x + '%;top:' + y + '%;pointer-events:none;';
    for (var i = 0; i < n; i++) {
      var p = document.createElement('span');
      var a = (i / n) * Math.PI * 2 + Math.random() * .3;
      var dist = size + Math.random() * size * .8;
      var c = colors[i % colors.length];
      p.style.cssText = 'position:absolute;width:5px;height:5px;border-radius:50%;background:' + c +
        ';box-shadow:0 0 8px ' + c + ';opacity:0;animation:aqiFwBurst .95s cubic-bezier(.1,.7,.3,1) forwards;animation-delay:' + (Math.random() * .12).toFixed(2) + 's;';
      p.style.setProperty('--fx', (Math.cos(a) * dist).toFixed(1) + 'px');
      p.style.setProperty('--fy', (Math.sin(a) * dist).toFixed(1) + 'px');
      fw.appendChild(p);
    }
    var core = document.createElement('div');
    core.style.cssText = 'position:absolute;left:50%;top:50%;width:16px;height:16px;border-radius:50%;transform:translate(-50%,-50%);background:radial-gradient(circle,#fff,rgba(255,255,255,0) 70%);opacity:0;animation:aqiFwCore .5s ease forwards;';
    fw.appendChild(core);
    stage.appendChild(fw);
    setTimeout(function () { if (fw.parentNode) fw.parentNode.removeChild(fw); }, 1700);
  }

  function addTimeout(fn, ms) {
    timeouts.push(setTimeout(fn, ms));
  }

  /* ─── 6. TIMELINE ─── */
  var STATES = {
    boot:        { t: 0 },
    tc:          { t: 0 },
    bgDeep:      { t: 250 },
    kicker:      { t: 500 },
    clap:        { t: 680 },
    kickerOff:   { t: 1300 },
    bubbles:     { t: 1150 },
    ripple:      { t: 1150 },
    aqua:        { t: 1150 },
    aqSweep:     { t: 1300 },
    cap1:        { t: 1400 },
    quickflash:  { t: 2650 },
    shake:       { t: 2650 },
    anam1:       { t: 2650 },
    iris1:       { t: 3050 },
    aquaOff:     { t: 3150 },
    bubblesOff:  { t: 3200, off: true },
    bgGold:      { t: 3350 },
    ember:       { t: 3400 },
    cap2:        { t: 3450 },
    way:         { t: 3550 },
    waypulse:    { t: 4900 },
    iris2:       { t: 5300 },
    wayOff:      { t: 5400 },
    emberOff:    { t: 5450, off: true },
    bgSunset:    { t: 5550 },
    boat:        { t: 5550 },
    birds:       { t: 5600 },
    cap3:        { t: 5650 },
    tours:       { t: 5750 },
    bloom:       { t: 7250 },
    stackOff:    { t: 7550 },
    megaflash:   { t: 7250 },
    anam2:       { t: 7250 },
    shake3:      { t: 7250 },
    boatOff:     { t: 7650, off: true },
    birdsOff:    { t: 7650, off: true },
    bgNight:     { t: 7700 },
    rays:        { t: 7700 },
    circledraw:  { t: 7850 },
    emblem:      { t: 8050 },
    logo:        { t: 8050 },
    shine:       { t: 8250 },
    lockup:      { t: 8350 },
    location:    { t: 8550 }
  };

  function runIntro() {
    if (timer) { clearTimeout(timer); timer = null; }
    if (tcTimer) { clearInterval(tcTimer); tcTimer = null; }
    overlay.classList.remove('st-boot', 'st-tc', 'st-bg-deep', 'st-kicker', 'st-clap', 'st-kicker-off',
      'st-bubbles', 'st-ripple', 'st-aqua', 'st-aq-sweep', 'st-cap1', 'st-quickflash', 'st-shake',
      'st-anam1', 'st-iris1', 'st-aqua-off', 'st-bg-gold', 'st-ember', 'st-cap2', 'st-way', 'st-waypulse',
      'st-iris2', 'st-way-off', 'st-bg-sunset', 'st-boat', 'st-birds', 'st-cap3', 'st-tours',
      'st-bloom', 'st-stack-off', 'st-megaflash', 'st-anam2', 'st-shake3', 'st-bg-night',
      'st-rays', 'st-circledraw', 'st-emblem', 'st-logo', 'st-shine', 'st-lockup', 'st-location');
    void overlay.offsetWidth;

    Object.keys(STATES).forEach(function (k) {
      var s = STATES[k];
      addTimeout(function () {
        if (s.off) overlay.classList.remove('st-' + k);
        else overlay.classList.add('st-' + k);
      }, s.t);
    });

    var t0 = performance.now();
    tcTimer = setInterval(function () {
      var el = (performance.now() - t0) / 1000;
      var sec = Math.min(Math.floor(el), 9);
      var fr = Math.floor((el - Math.floor(el)) * 24);
      tcText.textContent = '00:00:0' + sec + ':' + (fr < 10 ? '0' : '') + fr;
    }, 40);

    var now = ctx() ? AC.currentTime : 0;
    var t = now + .03;
    clap(t + .68);
    musicSting(t + .75);
    water(t + 1.15);
    pop(t + 1.5, 900); pop(t + 1.85, 1200); pop(t + 2.2, 700);
    zap(t + 2.65);
    whoosh(t + 2.65, .6, .14);
    irisWhoosh(t + 3.05);
    subBoom(t + 3.55);
    whoosh(t + 3.55, .8, .16);
    crackle(t + 3.92);
    boom(t + 4.9, .4, 80);
    irisWhoosh(t + 5.3);
    subBoom(t + 5.75);
    whoosh(t + 5.75, .7, .15);
    crackle(t + 6.12);
    zap(t + 7.25);
    subBoom(t + 7.27, .95);
    musicSting(t + 7.55, .26);
    shimmer(t + 8.35);
    whoosh(t + 8.4, 1.1, .1);
    burst(24, 22, 18, ['#ffd27a', '#fff3c4', '#fff'], 80);
    addTimeout(function () { boom(ctx().currentTime + .02, .45, 160); crackle(ctx().currentTime + .06); }, 8650);
    addTimeout(function () { burst(72, 18, 16, ['#fff', '#aee6ff', '#ffe9a8'], 70); }, 9050);
    addTimeout(function () { boom(ctx().currentTime + .02, .4, 170); crackle(ctx().currentTime + .06); }, 9050);
    addTimeout(function () { burst(48, 30, 20, ['#ffd27a', '#ff8a5c', '#fff'], 90); }, 9450);
    addTimeout(function () { boom(ctx().currentTime + .02, .5, 150); crackle(ctx().currentTime + .06); }, 9450);
  }

  /* ─── 7. COMPLETE / SKIP / SOUND ─── */
  function completeIntro() {
    if (done) return;
    done = true;
    if (timer) clearTimeout(timer);
    if (tcTimer) clearInterval(tcTimer);
    for (var i = 0; i < timeouts.length; i++) clearTimeout(timeouts[i]);

    try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch (e) {}

    document.body.style.overflow = '';

    if (soundOn && window.aquawayMusic) {
      try {
        if (window.aquawayMusic.audio) window.aquawayMusic.audio.muted = false;
        if (typeof window.aquawayMusic.play === 'function') window.aquawayMusic.play();
      } catch (e) {}
    }

    overlay.style.transition = 'opacity .5s cubic-bezier(.2,0,0,1)';
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    setTimeout(function () {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 520);
  }

  function handleSkip() {
    if (isSkipping || done) return;
    isSkipping = true;
    if (timer) clearTimeout(timer);
    if (tcTimer) clearInterval(tcTimer);
    for (var i = 0; i < timeouts.length; i++) clearTimeout(timeouts[i]);
    overlay.style.transition = 'opacity .28s ease';
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    setTimeout(completeIntro, 300);
  }

  skipBtn.addEventListener('click', function (e) { e.stopPropagation(); handleSkip(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === ' ') { handleSkip(); }
  });

  soundBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    soundOn = !soundOn;
    ctx();
    soundBtn.textContent = soundOn ? 'Sound: ON' : 'Sound: OFF';
    if (soundOn && !stingPlayed && musicBuf) musicSting(ctx().currentTime + .05, .3);
  });

  function resumeAC() {
    if (ctx()) {
      ctx().resume();
      if (!stingPlayed && musicBuf && soundOn) musicSting(ctx().currentTime + .05, .3);
    }
  }
  window.addEventListener('pointerdown', resumeAC, { once: true });
  window.addEventListener('keydown', resumeAC, { once: true });

  /* ─── 8. BOOTSTRAP ─── */
  function startIntro() {
    var loader = document.getElementById('page-loader');
    if (loader) {
      loader.style.opacity = '0';
      loader.style.pointerEvents = 'none';
    }

    // Keep the site's looping music silent during the intro
    try {
      if (window.aquawayMusic && window.aquawayMusic.audio) {
        window.aquawayMusic.audio.muted = true;
      }
    } catch (e) {}

    var styleEl = document.createElement('style');
    styleEl.id = 'aqw-intro-css';
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    addTimeout(runIntro, 350);
    addTimeout(function () { overlay.classList.add('show-skip'); }, 700);
    addTimeout(completeIntro, 1650);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startIntro);
  } else {
    startIntro();
  }
})();