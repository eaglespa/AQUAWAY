/* 
   Aquaway Tours — Effects & 3rd Party Integrations
   Mouse-Follow Glow | Particle Systems
*/
'use strict';

document.addEventListener('DOMContentLoaded', function() {
  // ---- Premium Mouse-Follow Gold/Silver Hover Glow ----
  const cardsWithGlow = new WeakSet();
  function initCardGlow() {
    const cards = document.querySelectorAll('.trip-card, .review-card, .gallery-item, .content-box-v0');
    cards.forEach(card => {
      if (cardsWithGlow.has(card)) return;
      cardsWithGlow.add(card);
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(212,175,55,0.12) 0%, rgba(192,192,192,0.06) 30%, rgba(20,20,20,0.9) 70%)`;
        card.style.borderColor = 'rgba(212,175,55,0.6)';
        card.style.boxShadow = `0 20px 60px rgba(0,0,0,0.4), 0 0 30px rgba(212,175,55,0.15), ${(x - centerX) * 0.05}px ${(y - centerY) * 0.05}px 20px rgba(212,175,55,0.1)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.background = '';
        card.style.borderColor = '';
        card.style.boxShadow = '';
      });
    });
  }

  // Re-init after trips render
  if (typeof window.renderTrips === 'function') {
    const _origRenderTrips = window.renderTrips;
    window.renderTrips = function(filter) {
      _origRenderTrips(filter);
      setTimeout(initCardGlow, 150);
    };
  }
  
  // Initial call
  setTimeout(initCardGlow, 1500);

  // Observe DOM changes for dynamically added cards
  const grid = document.getElementById('trips-grid');
  if (grid) {
    const observer = new MutationObserver(() => { setTimeout(initCardGlow, 250); });
    observer.observe(grid, { childList: true });
  }

  // ---- Luxury Gold Dust Cursor Trail ----
  function initCursorTrail() {
    if (window.innerWidth < 768) return; // Disable on mobile

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '10001';
    document.body.appendChild(canvas);

    let width, height;
    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const particles = [];
    const mouse = { x: 0, y: 0, moved: false };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.moved = true;
    });

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.015;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
      }
      draw() {
        ctx.fillStyle = `rgba(212, 175, 55, ${this.life * 0.5})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      if (mouse.moved) {
        for (let i = 0; i < 2; i++) {
          particles.push(new Particle(mouse.x, mouse.y));
        }
      }
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].life <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }
      requestAnimationFrame(animate);
    }
    animate();
  }

  initCursorTrail();

  // ---- Premium Parallax & Scroll Motion ----
  function initParallax() {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('#hero');
      if (hero) {
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent) {
          heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
          heroContent.style.opacity = 1 - (scrolled / 700);
        }
      }
      
      // Trip Hero Video Parallax
      const tripHeroVideo = document.querySelector('.trip-hero-video-v0');
      if (tripHeroVideo) {
        tripHeroVideo.style.transform = `translateY(${scrolled * 0.5}px) scale(1.1)`;
      }
    });
  }

  // ---- Advanced Staggered Intersection Observer ----
  function initRevealAnims() {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Stagger children if it's a grid
          if (entry.target.classList.contains('trips-grid') || entry.target.classList.contains('stats-grid')) {
            const children = entry.target.children;
            Array.from(children).forEach((child, i) => {
              setTimeout(() => {
                child.style.opacity = '1';
                child.style.transform = 'translateY(0) scale(1)';
              }, i * 100);
            });
          }
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealTargets = document.querySelectorAll('.animate-on-scroll, .trips-grid, .stats-grid, .bento-gallery');
    revealTargets.forEach(el => observer.observe(el));
  }

  initParallax();
  initRevealAnims();

  // ---- Premium Hero Typing Animation ----
  function initHeroTyping() {
    const titleEl = document.querySelector('.hero-title');
    if (!titleEl) return;
    
    setTimeout(() => {
      const goldWord = document.querySelector('.hero-title .gold-word');
      if (!goldWord) return;

      let tripsList = [];
      if (typeof TRIPS !== 'undefined') {
        const lang = localStorage.getItem('aqw_lang') || 'en';
        // Get top 6 most popular trip names in the current language
        tripsList = TRIPS.filter(t => t.name && t.name[lang]).slice(0, 6).map(t => t.name[lang]);
      }
      
      if (tripsList.length === 0) {
        tripsList = ["Paradise", "Adventure", "Dolphin House", "Orange Bay", "Scuba Diving"];
      }

      // Start with the current word
      tripsList.unshift(goldWord.textContent);
      
      let wordIndex = 0;
      let charIndex = goldWord.textContent.length;
      let isDeleting = false;
      
      // Styling the cursor without breaking layout
      goldWord.classList.add('typing-cursor');

      function type() {
        const currentWord = tripsList[wordIndex];
        
        if (isDeleting) {
          goldWord.textContent = currentWord.substring(0, charIndex - 1);
          charIndex--;
        } else {
          goldWord.textContent = currentWord.substring(0, charIndex + 1);
          charIndex++;
        }
        
        let typeSpeed = isDeleting ? 40 : 100; // Type slower, delete faster
        
        if (!isDeleting && charIndex === currentWord.length) {
          typeSpeed = 4000; // Wait 4 seconds before deleting
          isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % tripsList.length;
          typeSpeed = 600; // Wait slightly before typing new word
        }
        
        setTimeout(type, typeSpeed);
      }
      
      setTimeout(() => {
        isDeleting = true;
        type();
      }, 3000);
      
      const style = document.createElement('style');
      style.textContent = `
        .typing-cursor::after {
          content: '|';
          color: var(--gold);
          animation: blink 0.8s step-end infinite;
          display: inline-block;
          margin-left: 2px;
          vertical-align: text-bottom;
        }
        @keyframes blink { 50% { opacity: 0; } }
      `;
      document.head.appendChild(style);

    }, 800); // Wait for translation injection
  }
  
  initHeroTyping();

  // ---- Origin-Targeted Hyper-Personalized Media & Taglines ----
  function applyOriginDynamicPersonalization() {
    const subtitleEl = document.querySelector('.hero-subtitle');
    if (!subtitleEl) return;

    const lang = localStorage.getItem('aqw_lang') || 'en';
    
    // Highly tailored emotional/cultural taglines based on origin
    const taglines = {
      en: "Escape the ordinary. Experience elite yacht tours, dolphin swims, and VIP desert safaris in Hurghada.",
      ar: "هروب من المألوف. اختبر الجولات البحرية الفاخرة، والسباحة مع الدلافين، ورحلات السفاري المميزة في الغردقة.",
      ru: "Побег от зимних холодов! Почувствуйте теплое солнце Красного моря и непревзойденную роскошь.",
      de: "Erleben Sie unberührte Riffe, kristallklares Wasser und exklusive, umweltbewusste Abenteuer.",
      fr: "Plongez dans une aventure inoubliable en Mer Rouge depuis Hurghada",
      pl: "Ucieknij od chłodu! Poczuj ciepłe słońce Morza Czerwonego i niespotykany dotąd luksus.",
      it: "Vivi un'avventura indimenticabile nel Mar Rosso da Hurghada",
      es: "Vive una aventura inolvidable en el Mar Rojo desde Hurghada",
      tr: "Hurghada'dan Kızıl Deniz'de unutulmaz bir macera yaşayın",
      zh: "从赫尔格达出发，在红海开启难忘的冒险之旅",
      uk: "Незабутня пригода на Червоному морі з Хургади",
      ro: "Trăiește o aventură de neuitat în Marea Roșie de la Hurghada",
      cs: "Prožijte nezapomenutelné dobrodružství v Rudém moři z Hurghady",
      nl: "Ontdek ongerepte koraalriffen en ecologisch verantwoorde Rode Zee-avonturen met pure luxe.",
      sv: "Upptäck orörda korallrev, kristallklart vatten och exklusiva, miljömedvetna äventyr.",
      pt: "Viva uma aventura inesquecível no Mar Vermelho a partir de Hurghada",
      ja: "フルガダからレッドシーで忘れられない冒険を",
      ko: "푸르가다에서 홍해에서 잊지 못할 모험을",
      hu: "Éljen át felejthetetlen kalandot a Vörös-tengeren Hurghadából",
      fi: "Kokeile unohdettomat seikkailut Punaisellamerellä Hurghadasta"
    };

    if (taglines[lang]) {
      subtitleEl.textContent = taglines[lang];
    }
  }
  setTimeout(applyOriginDynamicPersonalization, 900); // Executed right after translations load
});
