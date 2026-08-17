'use strict';

var AQUAWAY_PHONE = '201040296016';

function throttle(fn, wait) {
  var last = 0;
  return function() {
    var now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn.apply(this, arguments);
    }
  };
}

// Auto-detect browser language on first visit
(function autoDetectLanguage() {
  if (localStorage.getItem('aqw_lang')) return; // Already set by user
  var lang = (navigator.language || navigator.userLanguage || '').toLowerCase().slice(0, 2);
  var supported = ['en','ar','ru','de','fr','pl','it','es','tr','zh','uk','ro','cs','nl','sv','pt','ja','ko','hu','fi'];
  if (supported.indexOf(lang) !== -1 && lang !== 'en') {
    localStorage.setItem('aqw_lang', lang);
  }
})();

// ---- SEO Content Expansion (Scale to 1000) ----
const SEO_TRIP_CONTENT = {
  "orange-bay": {
    en: "Orange Bay is Hurghada's most iconic island destination, often called the 'Egyptian Caribbean'. This shallow turquoise lagoon is perfect for families and couples seeking a photogenic paradise. The bay is famous for its wooden swing in the water and its eco-friendly architecture. Our trip includes two distinct snorkeling stops at coral reefs teeming with Red Sea biodiversity, followed by a gourmet lunch served on the island. Guests can enjoy the premium lounge area, take stunning photos, and relax in the calmest waters in the Giftun Island National Park.",
    ar: "تعتبر أورانج باي أكثر وجهات الجزر شهرة في الغردقة، وغالبًا ما تسمى 'كاريبي مصر'. هذه البحيرة الفيروزية الضحلة مثالية للعائلات والأزواج الذين يبحثون عن جنة للتصوير الفوتوغرافي. تشتهر منطقة الخليج بالأرجوحة الخشبية في الماء وهندستها المعمارية الصديقة للبيئة. تشمل رحلتنا وقفتين متميزتين للغطس في الشعاب المرجانية التي تعج بالتنوع البيولوجي في البحر الأحمر، يليها غداء فاخر يقدم في الجزيرة."
  },
  "dolphin-house": {
    en: "The Dolphin House (Shaab El Fanous) is a protected reef area where wild spinner dolphins are frequently spotted. Unlike captive dolphin shows, this is a natural encounter where we respect the animals' habitat. Our expert guides ensure a safe and ethical experience. The trip also features two snorkeling sessions at vibrant reefs where you can see clownfish, rays, and sea turtles. Onboard, our chef prepares a fresh Mediterranean-style buffet. This is Hurghada's #1 eco-tour for nature lovers and families.",
    ar: "بيت الدرافيل (شعب الفانوس) هي منطقة شعاب مرجانية محمية حيث يتم رصد الدلافين الدوارة البرية بشكل متكرر. على عكس عروض الدلافين الأسيرة، فهذا لقاء طبيعي حيث نحترم موطن الحيوانات. يضمن مرشدونا الخبراء تجربة آمنة وأخلاقية."
  },
  "super-safari": {
    en: "Experience the vast Egyptian Eastern Desert in one high-octane day. Our Super Safari combines quad biking across the dunes, a rugged 4x4 jeep adventure, and a traditional camel ride. You will visit an authentic Bedouin village to learn about their ancient desert traditions, taste Bedouin bread, and enjoy a traditional tea ceremony. The day concludes with a spectacular sunset view, followed by a BBQ dinner and an Oriental show featuring Tanoura dancing and fire breathers under the Saharan starlight.",
    ar: "استمتع بتجربة الصحراء الشرقية المصرية الواسعة في يوم واحد مليء بالإثارة. يجمع السوبر سفاري بين ركوب الدراجات الرباعية عبر الكثبان الرملية، ومغامرة جيب 4x4 الوعرة، وركوب الجمال التقليدي."
  }
};

function renderSEOContent() {
  const container = document.querySelector('.trip-main-v0');
  if (!container) return;
  const slug = location.pathname.split('/').pop().replace('.html','');
  const seo = SEO_TRIP_CONTENT[slug];
  if (!seo) return;

  const content = getLang(seo);
  if (!content) return;

  const box = document.createElement('div');
  box.className = 'content-box-v0 seo-expansion-v0';
  box.innerHTML = `
    <h2 class="section-title-small-v0">${t('trip_overview')}</h2>
    <div class="seo-text-v0" style="line-height:1.8; color:var(--silver-light); font-size:1.05rem;">${content}</div>
  `;
  container.prepend(box);
}

// ---- Auto-render Rich Content on Trip Detail Pages ----
function renderTripDetailContent() {
  if (!document.querySelector('.trip-detail-page')) return;
  const slug = location.pathname.split('/').pop().replace('.html','');
  const detail = TRIP_DETAIL_DATA[slug];
  if (!detail) return;

  // Find trip data for video and schema
  const tripData = TRIPS.find(t => t.slug === slug);

  // 0. Inject Hero Video if defined in TRIPS
  const heroSection = document.querySelector('.trip-hero-v0');
  if (heroSection && tripData && tripData.video) {
    if (!heroSection.querySelector('.trip-hero-video')) {
       const video = document.createElement('video');
       video.className = 'trip-hero-video';
       video.autoplay = true;
       video.muted = true;
       video.loop = true;
       video.playsInline = true;
       video.style.opacity = "0";
       video.style.transition = "opacity 1.5s ease";
       video.innerHTML = `<source src="../${tripData.video}" type="video/mp4">`;
       heroSection.prepend(video);
       video.onloadeddata = () => video.style.opacity = "1";
    }
  }

  const main = document.querySelector('.trip-main-v0');
  if (!main) return;
  
  // Find all content boxes safely without :scope
  const boxes = Array.from(main.children).filter(el => el.classList.contains('content-box-v0'));
  if (boxes.length < 2) return;
  const photosBox = boxes[1]; // Photo Gallery box

  // 1. Append extra description to overview box
  const extraDesc = getLang(detail.extraDesc);
  if (extraDesc) {
    const p = document.createElement('p');
    p.className = 'extra-desc-v0';
    p.textContent = extraDesc;
    boxes[0].appendChild(p);
  }

  // 2. Itinerary box
  if (detail.itinerary && detail.itinerary.length) {
    const box = document.createElement('div');
    box.className = 'content-box-v0';
    box.innerHTML = '<h2 class="section-title-small-v0">' + t('trip_itinerary_l') + '</h2><div class="itinerary-list">' +
      detail.itinerary.map(function(item) {
        return '<div class="itinerary-item"><div class="itinerary-time">' + getLang(item.time) +
          '</div><div class="itinerary-dot"></div><div class="itinerary-text"><strong>' +
          getLang(item.title) + '</strong><span>' + getLang(item.desc) + '</span></div></div>';
      }).join('') + '</div>';
    main.insertBefore(box, photosBox);
  }

  // 3. Detail columns (bring + know)
  if ((detail.bring && detail.bring.length) || (detail.know && detail.know.length)) {
    var bringHtml = detail.bring && detail.bring.length
      ? '<div class="trip-detail-col"><h4>' + t('trip_bring_l') + '</h4><ul>' +
        detail.bring.map(function(i){return '<li>' + getLang(i) + '</li>';}).join('') + '</ul></div>' : '';
    var knowHtml = detail.know && detail.know.length
      ? '<div class="trip-detail-col"><h4>' + t('trip_know_l') + '</h4><ul>' +
        detail.know.map(function(i){return '<li>' + getLang(i) + '</li>';}).join('') + '</ul></div>' : '';
    const box = document.createElement('div');
    box.className = 'content-box-v0';
    box.innerHTML = '<h2 class="section-title-small-v0">' + t('trip_essential') + '</h2><div class="trip-detail-cols">' + bringHtml + knowHtml + '</div>';
    main.insertBefore(box, photosBox);
  }

  // 4. FAQ accordion + schema
  if (detail.faq && detail.faq.length) {
    const box = document.createElement('div');
    box.className = 'content-box-v0';
    box.innerHTML = '<h2 class="section-title-small-v0">' + t('trip_faq_l') + '</h2><div class="faq-list-v0">' +
      detail.faq.map(function(item) {
        const q = getLang(item.q);
        const a = getLang(item.a);
        return '<div class="faq-item-v0"><div class="faq-q-v0"><span>' + q +
          '</span><span class="faq-arrow-v0">▼</span></div><div class="faq-a-v0">' + a + '</div></div>';
      }).join('') + '</div>';
    main.insertBefore(box, photosBox);

    box.querySelectorAll('.faq-q-v0').forEach(function(q) {
      q.addEventListener('click', function() { q.closest('.faq-item-v0').classList.toggle('open'); });
    });

    // Inject FAQ schema
    var faqSchema = document.createElement('script');
    faqSchema.type = 'application/ld+json';
    faqSchema.textContent = JSON.stringify({
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: detail.faq.map(function(f) {
        return {'@type':'Question', name: getLang(f.q), acceptedAnswer:{'@type':'Answer', text: getLang(f.a)}};
      })
    });
    document.head.appendChild(faqSchema);
  }

  // 5. Inject Product/AggregateRating schema for SEO stars
  const tripDataForSchema = TRIPS.find(t => t.slug === slug);
  if (tripDataForSchema) {
    const productSchema = document.createElement('script');
    productSchema.type = 'application/ld+json';
    productSchema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'TouristTrip',
      name: getLang(tripDataForSchema.name),
      description: getLang(tripDataForSchema.desc),
      image: `https://www.aquaway.tours/${tripDataForSchema.img}`,
      offers: {
          '@type': 'Offer',
          price: tripDataForSchema.price,
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          url: `https://www.aquaway.tours/trips/${slug}.html`
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: tripDataForSchema.rating || 4.9,
        reviewCount: tripDataForSchema.reviewCount || 124
      }
    });
    document.head.appendChild(productSchema);
  }

  // 6. Inject Mobile Sticky Booking Bar
  renderStickyBookingBar();
}

// ---- Mobile Sticky Booking Bar ----
function renderStickyBookingBar() {
  if (window.innerWidth >= 1024) return; // Only for tablets and phones
  
  const slug = location.pathname.split('/').pop().replace('.html','');
  const trip = TRIPS.find(t => t.slug === slug);
  if (!trip) return;

  const bar = document.createElement('div');
  bar.id = 'sticky-booking-bar-v0';
  
  const p = typeof convertPrice === 'function' ? convertPrice(trip.price) : {sym: '€', val: trip.price};
  const waBase = "https://wa.me/" + AQUAWAY_PHONE;
  const waMsg = encodeURIComponent(`${t('whatsapp_msg')}${getLang(trip.name)}`);
  const waFull = `${waBase}?text=${waMsg}`;
  
  bar.innerHTML = `
    <div class="sticky-bar-left">
      <span class="sticky-bar-label">${t('trip_from')}</span>
      <span class="sticky-bar-price">${trip.price === 0 ? (trip.slug === 'medical-care' ? t('trip_insurance') : t('trip_essential')) : `<sup>${p.sym}</sup>${p.val}<sub>${trip.slug === 'speed-boat' ? ' ' + t('per_trip') : t('trip_person')}</sub>`}</span>
    </div>
    <div class="sticky-bar-right">
      <a href="${waFull}" target="_blank" rel="noopener" class="sticky-booking-btn">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
        ${t('book_whatsapp')}
      </a>
    </div>
  `;
  
  document.body.appendChild(bar);
  
  // Show/Hide bar on scroll to avoid overlap with footer
  window.addEventListener('scroll', throttle(function() {
    const scrollPos = window.innerHeight + window.scrollY;
    const bodyHeight = document.body.offsetHeight;
    if (scrollPos > bodyHeight - 150) {
      bar.classList.add('hidden');
    } else {
      bar.classList.remove('hidden');
    }
  }, 100));
}

// ---- Helpers ----
function t(key) { 
  if (window.AQW_T && window.AQW_T[key]) return window.AQW_T[key];
  if (typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS['en'] && TRANSLATIONS['en'][key]) return TRANSLATIONS['en'][key];
  return key; 
}
window.t = t; // Expose to global scope for components

function getLang(obj) { 
  if (!obj) return "";
  if (typeof obj === 'string') return obj;
  return obj[window.AQW_LANG] || obj['en'] || Object.values(obj)[0] || ""; 
}
window.getLang = getLang; // Expose to global scope

function waLink(trip) {
  const name = getLang(trip.name);
  let curr = localStorage.getItem('aqw_currency') || 'EUR';
  if (curr === 'EGP') curr = 'EUR';
  let price = trip.price;
  if (curr === 'USD') price = Math.round(price * 1.10);
  
  const msg = encodeURIComponent(
    `${t('whatsapp_msg')}${name}`
  );
  return `https://wa.me/${AQUAWAY_PHONE}?text=${msg}`;
}

function stars(r) {
  const full = Math.floor(r), half = r % 1 >= 0.5;
  return '★'.repeat(full) + (half ? '½' : '') + ` (${r})`;
}

// ---- Apply i18n ----
function applyTranslations() {
  const T = window.AQW_T;
  if (!T) return;
  document.documentElement.lang = T.lang;
  document.documentElement.dir = T.dir;
  
  // Apply visual text translations
  document.querySelectorAll('[data-t]').forEach(el => {
    const key = el.dataset.t;
    if (T[key] !== undefined) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = T[key];
      else el.innerHTML = T[key];
    }
  });

  // Apply Global SEO Translation
  const isTripPage = window.location.pathname.includes('/trips/');
  const metaDesc = document.querySelector('meta[name="description"]');
  
  if (!isTripPage) { // Homepage SEO
    if (T.seo_title) document.title = T.seo_title;
    if (metaDesc && T.seo_desc) metaDesc.setAttribute('content', T.seo_desc);
  } else { // Trip Pages SEO
    const slug = window.location.pathname.split('/').pop().replace('.html','');
    const tripsArray = (typeof TRIPS !== 'undefined') ? TRIPS : [];
    const trip = tripsArray.find(t => t.slug === slug);
    if (trip) {
       const tripName = typeof getLang === 'function' ? getLang(trip.name) : trip.slug;
       const tripDesc = typeof getLang === 'function' ? getLang(trip.desc) : '';
       document.title = `${tripName} | Aquaway Tours`;
       if (metaDesc) metaDesc.setAttribute('content', tripDesc);
    }
  }

  // Inject Dynamic JSON-LD structured data for Google
  let schemaData = document.getElementById('aqw-schema');
  if (!schemaData) {
      schemaData = document.createElement('script');
      schemaData.id = 'aqw-schema';
      schemaData.type = 'application/ld+json';
      document.head.appendChild(schemaData);
  }
  // BUG FIX: use textContent not innerText — innerText parses HTML & can corrupt JSON in some browsers
  schemaData.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      "name": "Aquaway Tours",
      "image": "https://www.aquaway.tours/assets/images/logo.webp",
      "url": "https://www.aquaway.tours",
      "telephone": "+" + AQUAWAY_PHONE,
      "address": { "@type": "PostalAddress", "addressLocality": "Hurghada", "addressCountry": "EG" },
      "description": t('footer_desc') || "Premium tours and excursions in Hurghada",
      "priceRange": "$–$$$"
  });
}


// ---- Lead Collection (VIP List) ----
function saveLead(phone) {
  // BUG FIX: removed console.log — do not expose lead data in browser dev tools in production
  let leads = JSON.parse(localStorage.getItem('aqw_leads') || '[]');
  leads.push({phone, ts: new Date().toISOString()});
  localStorage.setItem('aqw_leads', JSON.stringify(leads));
  return true;
}
window.saveLead = saveLead;

// ---- Navbar ----
function initNavbar() {
  const nb = document.getElementById('navbar');
  if (!nb) return;
  window.addEventListener('scroll', throttle(function() {
    nb.classList.toggle('scrolled', window.scrollY > 40);
    const btt = document.getElementById('back-to-top');
    if (btt) btt.classList.toggle('visible', window.scrollY > 400);
  }, 80));
}

// ---- Weather & Sea Conditions Widget ----
async function loadWeather() {
  const el = document.getElementById('weather-val');
  const elSea = document.getElementById('sea-val');
  if (!el && !elSea) return;
  try {
    const r = await fetch('https://api.open-meteo.com/v1/forecast?latitude=27.2574&longitude=33.8097&current=temperature_2m,wind_speed_10m&wind_speed_unit=kn');
    const d = await r.json();
    const temp = Math.round(d.current.temperature_2m);
    const wind = d.current.wind_speed_10m;
    
    if (el) el.textContent = `${temp}°C`;
    
    if (elSea) {
      const T = window.AQW_T || {};
      let status = t('sea_calm') || 'Calm / Perfect';
      if (wind > 12 && wind <= 18) status = t('sea_breezy') || 'Slightly Breezy';
      else if (wind > 18) status = t('sea_alert') || 'Adventure Alert';
      elSea.innerHTML = `<span class="sea-dot"></span> ${t('sea_label')}: ${status}`;
    }
  } catch { 
    const T = window.AQW_T || {};
    if (el) el.textContent = '28°C'; 
    if (elSea) elSea.innerHTML = `<span class="sea-dot"></span> ${t('sea_label')}: ${t('sea_calm') || 'Calm'}`;
  }
}

// ---- Exchange Rate Widget ----
async function loadExchange() {
  const elUsd = document.getElementById('exchange-val');
  const elEur = document.getElementById('exchange-eur-val');
  if (!elUsd && !elEur) return;
  const cached = JSON.parse(localStorage.getItem('aqw_exchange3') || '{}');
  if (cached.usd && Date.now() - cached.ts < 6*3600*1000) {
    if (elUsd) elUsd.textContent = cached.usd;
    if (elEur) elEur.textContent = cached.eur;
    return;
  }
  try {
    const r = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const d = await r.json();
    const usdRate = d.rates && d.rates.EGP ? d.rates.EGP.toFixed(1) : '50.0';
    const eurRate = d.rates && d.rates.EGP && d.rates.EUR ? (d.rates.EGP / d.rates.EUR).toFixed(1) : '54.2';
    const usdVal = `${usdRate} EGP`;
    const eurVal = `${eurRate} EGP`;
    if (elUsd) elUsd.textContent = usdVal;
    if (elEur) elEur.textContent = eurVal;
    localStorage.setItem('aqw_exchange3', JSON.stringify({usd: usdVal, eur: eurVal, ts: Date.now()}));
  } catch {
    if (elUsd) elUsd.textContent = '50.0 EGP';
    if (elEur) elEur.textContent = '54.5 EGP';
  }
}


// ---- Multi-Currency 3.0 (Global Reach) ----
async function detectUserCurrency() {
  try {
    const res = await fetch('https://ipapi.co/json/');
    const data = await res.json();
    const country = data.country_code;
    const map = { 'RU': 'RUB', 'PL': 'PLN', 'GB': 'GBP', 'UA': 'UAH', 'DE': 'EUR', 'FR': 'EUR', 'IT': 'EUR' };
    const detected = map[country] || 'EUR';
    localStorage.setItem('aqw_currency', detected);
    return detected;
  } catch (e) {
    return 'EUR';
  }
}

async function initCurrency() {
  const container = document.querySelector('.info-widgets') || document.querySelector('.nav-widgets');
  if (!container) return;
  
  let current = localStorage.getItem('aqw_currency');
  if (!current) {
    current = await detectUserCurrency();
    // Only reload on first detection to set base state, or just update UI
    localStorage.setItem('aqw_currency', current);
  }
  
  const pill = document.createElement('div');
  pill.className = 'widget-pill currency-selector';
  pill.innerHTML = `
    <span class="curr-val">${current}</span>
    <div class="curr-dropdown">
      <div class="curr-opt" data-c="EUR">€ EUR</div>
      <div class="curr-opt" data-c="USD">$ USD</div>
      <div class="curr-opt" data-c="GBP">£ GBP</div>
      <div class="curr-opt" data-c="PLN">zł PLN</div>
      <div class="curr-opt" data-c="RUB">₽ RUB</div>
    </div>
  `;
  container.appendChild(pill);

  pill.querySelectorAll('.curr-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      const c = opt.dataset.c;
      localStorage.setItem('aqw_currency', c);
      pill.querySelector('.curr-val').textContent = c;
      // UX FIX: Refresh UI without reload
      refreshAllPrices();
    });
  });
}

function refreshAllPrices() {
  // Update grid
  renderTrips();
  // Update detail components if they exist
  if (typeof renderStickyBookingBar === 'function') {
    const bar = document.getElementById('sticky-booking-bar-v0');
    if (bar) { bar.remove(); renderStickyBookingBar(); }
  }
  if (typeof renderRelatedTripsDynamic === 'function') {
    renderRelatedTripsDynamic();
  }
}

function convertPrice(eur) {
  const curr = localStorage.getItem('aqw_currency') || 'EUR';
  // BUG FIX: updated to 2026 approximate rates (previously stale 2024 values)
  // These are display-only fallbacks; real rates come from loadExchange() API
  const rates = {
    'USD': { r: 1.10, s: '$' },
    'GBP': { r: 0.84, s: '£' },
    'PLN': { r: 4.28, s: 'zł' },
    'RUB': { r: 105.0, s: '₽' },
    'UAH': { r: 44.5, s: '₴' },
    'EUR': { r: 1,    s: '€' }
  };
  const m = rates[curr] || rates['EUR'];
  return { val: Math.round(eur * m.r), sym: m.s };
}

// ---- Counter Animation (Progressive Enhancement) ----
// The real values are hardcoded in HTML — this function only runs as an enhancement.
// If IntersectionObserver never fires within 2s, the real numbers stay visible.
function animateCounters() {
  document.querySelectorAll('.stat-number[data-target]').forEach(el => {
    const target = el.dataset.target;
    const isNum = !isNaN(parseInt(target));
    if (!isNum) return; // non-numeric targets left as-is (e.g. "5★")
    const end = parseInt(target);
    const suffix = el.dataset.suffix || '';
    // Reset to 0 only now that we're about to animate — guarantees visible fallback
    let start = 0;
    const dur = 2000, step = 20;
    const totalSteps = dur / step;
    const increment = Math.max(1, Math.ceil(end / totalSteps));
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        el.textContent = end.toLocaleString() + suffix;
        clearInterval(timer);
      } else {
        el.textContent = start.toLocaleString() + suffix;
      }
    }, step);
  });
}

// ---- Scroll Animations ----
function initScrollAnimations() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, {threshold: 0.1});
  document.querySelectorAll('.animate-on-scroll').forEach(el => obs.observe(el));

  // Stats counter — only animate if IO fires within 2 seconds
  const statsEl = document.getElementById('stats');
  if (statsEl && typeof IntersectionObserver !== 'undefined') {
    let fired = false;
    const guardTimer = setTimeout(() => {
      // 2s elapsed — IO hasn't fired yet. Values remain hardcoded in HTML. Do nothing.
      fired = true;
    }, 2000);
    const statsObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !fired) {
        clearTimeout(guardTimer);
        animateCounters();
        statsObs.disconnect();
      }
    }, {threshold: 0.5});
    statsObs.observe(statsEl);
  }

  // Video lazy preload (optional, but let's keep it hover-based for max speed)
  const videoObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if(e.isIntersecting) {
            const v = e.target.querySelector('video');
            if(v && !v.src && window.innerWidth > 1024) { // Preload on desktop only
                v.src = v.dataset.src;
                v.load();
            }
        }
    });
  }, { threshold: 0.1, rootMargin: '200px' });
  document.querySelectorAll('.has-hover-video').forEach(el => videoObs.observe(el));
}

// ---- Gallery Lightbox ----
function initLightbox() {
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbClose = document.getElementById('lightbox-close');
  if (!lb) return;

  // Support both .gallery-item (trip pages) and .bento-item (homepage)
  const clickables = document.querySelectorAll('.gallery-item, .bento-item');
  clickables.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;
      lbImg.src = img.src;
      lbImg.alt = img.alt || 'Aquaway Tours Gallery';
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLb = () => {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.src = '';
  };

  if (lbClose) lbClose.addEventListener('click', closeLb);
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });
}

// ---- Render Trips ----
function renderTrips(filter = 'all') {
  const grid = document.getElementById('trips-grid');
  if (!grid) return;
  if (TRIPS.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:4rem;color:var(--text-muted)">${t('loading_catalog') || 'Loading...'}</div>`;
    return;
  }
  const filtered = filter === 'all' ? TRIPS : TRIPS.filter(t => t.cat === filter);
  
  grid.innerHTML = filtered.map((trip, i) => {
    const hasVideo = !!trip.video;
    const p = convertPrice(trip.price);
    const isSub = window.location.pathname.includes('/trips/');
    const detailLink = isSub ? `./${trip.slug}.html` : `./trips/${trip.slug}.html`;
    const waBase = "https://wa.me/" + AQUAWAY_PHONE;
    const waMsg = encodeURIComponent(`${t('whatsapp_msg')}${getLang(trip.name)}`);
    const waFull = `${waBase}?text=${waMsg}`;

    return `
    <div class="trip-card animate-on-scroll ${hasVideo ? 'has-hover-video' : ''}" 
         style="animation-delay:${(i % 6) * 0.08}s" 
         data-cat="${trip.cat}"
         onmouseenter="const v=this.querySelector('video'); if(v){ if(!v.src) v.src=v.dataset.src; v.play().catch(()=>{}); }" 
         onmouseleave="const v=this.querySelector('video'); if(v){ v.pause(); v.currentTime=0; }">
      <div class="trip-card-img">
        <img src="${isSub ? '../' + trip.img : './' + trip.img}" alt="${getLang(trip.name)}" loading="lazy">
        ${hasVideo ? `<video class="hover-video-v0" data-src="${isSub ? '../' + trip.video : './' + trip.video}" muted loop playsinline></video>` : ''}
        <span class="trip-card-category">${trip.cat}</span>
        ${trip.popular ? `<span class="trip-card-badge">${t('trip_popular')}</span>` : ''}
      </div>
      <div class="trip-card-body">
        <h3 class="trip-card-title">${getLang(trip.name)}</h3>
        <p class="trip-card-desc">${getLang(trip.desc)}</p>
        <div class="trip-card-meta">
          <div class="meta-item">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm.5 5v5.25l4.5 2.67-.75 1.23L11 13V7h1.5z"/></svg>
            ${getLang(trip.dur)}
          </div>
          <div class="trip-stars">${'★'.repeat(Math.floor(trip.rating))} ${trip.rating}</div>
          <div class="trip-price">${trip.price === 0 ? `<span class="text-gold">${trip.slug === 'medical-care' ? t('trip_insurance') : t('trip_essential')}</span>` : `<sup>${p.sym}</sup>${p.val}<sub>${trip.slug === 'speed-boat' ? ' ' + t('per_trip') : t('trip_person')}</sub>`}</div>
        </div>
        <div class="trip-card-footer">
          <a href="${detailLink}" class="btn-details">${t('see_details')}</a>
          <a href="${waFull}" target="_blank" rel="noopener" class="btn-whatsapp">
            <svg viewBox="0 0 24 24" style="width:14px;height:14px;fill:white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.524 5.845L.057 23.428a    .615.615l5.583-1.467A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-4.997-1.366l-.36-.213-3.713.976.992-3.617-.232-.374A9.818 9.818 0 0112 2.182c5.423 0 9.818 4.395 9.818 9.818 0 5.424-4.395 9.818-9.818 9.818z"/></svg>
            ${t('book_whatsapp')}
          </a>
        </div>
      </div>
    </div>
  `}).join('');
  // Re-observe new cards
  initScrollAnimations();
}

// ---- Filter Buttons ----
function initFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      renderTrips(btn.dataset.cat);
    });
  });
}

// ---- Page Loader ----
function hideLoader() {
  // Loader removal handled in ComponentManager.init()
}

// ---- Back to top ----
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (btn) btn.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));
}

// ---- Particle Canvas ----
function initParticles() {
  const canvas = document.getElementById('hero-particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  const particles = Array.from({length:60}, () => ({
    x: Math.random() * canvas.width, y: Math.random() * canvas.height,
    r: Math.random() * 2 + 0.5, vx: (Math.random()-0.5)*0.3, vy: -Math.random()*0.5-0.2,
    a: Math.random()
  }));
  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p => {
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle = `rgba(212,175,55,${p.a * 0.6})`; ctx.fill();
      p.x += p.vx; p.y += p.vy; p.a += (Math.random()-0.5)*0.02;
      if (p.y < 0) { p.y = canvas.height; p.x = Math.random()*canvas.width; }
      p.a = Math.max(0.1, Math.min(0.8, p.a));
    });
    requestAnimationFrame(draw);
  }
  draw();
  window.addEventListener('resize', () => { canvas.width=window.innerWidth; canvas.height=window.innerHeight; });
}

// ---- Slider logic for Related trips ----
window.initRelatedSlider = function() {
  const track = document.querySelector('.related-slider-track');
  if (!track) return;
  let isDown = false, startX, scrollLeft, timer;

  const startAuto = () => {
    timer = setInterval(() => {
      track.scrollLeft += 2;
      if (track.scrollLeft >= track.scrollWidth - track.clientWidth) track.scrollLeft = 0;
    }, 30);
  };
  const stopAuto = () => clearInterval(timer);

  track.addEventListener('mousedown', (e) => {
    isDown = true; stopAuto();
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });
  track.addEventListener('mouseleave', () => { isDown = false; startAuto(); });
  track.addEventListener('mouseup', () => { isDown = false; startAuto(); });
  track.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 2;
    track.scrollLeft = scrollLeft - walk;
  });

  // Touch support
  track.addEventListener('touchstart', stopAuto);
  track.addEventListener('touchend', startAuto);

  startAuto();
};

// ---- Trip Map (Leaflet) ----
function initTripMap() {
  const mapEl = document.getElementById('trip-map');
  if (!mapEl) return;
  const tripId = parseInt(mapEl.dataset.id);
  const trip = TRIPS.find(t => t.id === tripId);
  if (!trip || !trip.coords) return;

  // Initialize map
  const map = L.map('trip-map', {
    scrollWheelZoom: false,
    zoomControl: false
  }).setView(trip.coords, 11);

  // Dark Luxury Tile Layer
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '©OpenStreetMap ©CARTO'
  }).addTo(map);

  L.control.zoom({ position: 'bottomright' }).addTo(map);

  // Custom Gold Marker
  const goldIcon = L.divIcon({
    className: 'custom-map-marker',
    html: `<div class="marker-pin"></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30]
  });

  L.marker(trip.coords, { icon: goldIcon }).addTo(map)
    .bindPopup(`<b style="color:#d4af37">${getLang(trip.name)}</b><br>${getLang(trip.cat)}`).openPopup();
}

// ---- Dynamically render related trips on trip pages ----
function renderRelatedTripsDynamic() {
  const container = document.querySelector('.related-trips-section-v0 .trips-grid-v0');
  if (!container) return;
  const slug = location.pathname.split('/').pop().replace('.html','');
  
  const currentTrip = TRIPS.find(t => t.slug === slug);
  let pool = TRIPS.filter(t => t.slug !== slug);
  if (currentTrip) {
    const sameCat = pool.filter(t => t.cat === currentTrip.cat);
    pool = sameCat.length >= 2 ? sameCat : pool;
  }
  
  // Randomize related trips
  pool = pool.sort(() => 0.5 - Math.random());
  const selected = pool.slice(0, 2);
  
  container.innerHTML = selected.map((trip, i) => {
    const hasVideo = !!trip.video;
    const p = typeof convertPrice === 'function' ? convertPrice(trip.price) : {sym: '€', val: trip.price};
    const detailLink = `./${trip.slug}.html`;
    const waBase = "https://wa.me/" + AQUAWAY_PHONE;
    const waMsg = encodeURIComponent(`${t('whatsapp_msg')}${getLang(trip.name)}`);
    const waFull = `${waBase}?text=${waMsg}`;

    return `
    <div class="trip-card animate-on-scroll ${hasVideo ? 'has-hover-video' : ''}" 
         style="animation-delay:${(i % 6) * 0.08}s" 
         data-cat="${trip.cat}"
         onmouseenter="const v=this.querySelector('video'); if(v){ if(!v.src) v.src=v.dataset.src; v.play().catch(()=>{}); }" 
         onmouseleave="const v=this.querySelector('video'); if(v){ v.pause(); v.currentTime=0; }">
      <div class="trip-card-img">
        <img src="../${trip.img}" alt="${getLang(trip.name)}" loading="lazy">
        ${hasVideo ? `<video class="hover-video-v0" data-src="../${trip.video}" muted loop playsinline></video>` : ''}
        <span class="trip-card-category">${trip.cat}</span>
        ${trip.popular ? `<span class="trip-card-badge">${t('trip_popular')}</span>` : ''}
      </div>
      <div class="trip-card-body">
        <h3 class="trip-card-title">${getLang(trip.name)}</h3>
        <p class="trip-card-desc">${getLang(trip.desc)}</p>
        <div class="trip-card-meta">
          <div class="meta-item">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm.5 5v5.25l4.5 2.67-.75 1.23L11 13V7h1.5z"/></svg>
            ${getLang(trip.dur)}
          </div>
          <div class="trip-stars">${'★'.repeat(Math.floor(trip.rating))} ${trip.rating}</div>
          <div class="trip-price">${trip.price === 0 ? `<span class="text-gold">${trip.slug === 'medical-care' ? t('trip_insurance') : t('trip_essential')}</span>` : `<sup>${p.sym}</sup>${p.val}<sub>${trip.slug === 'speed-boat' ? ' ' + t('per_trip') : t('trip_person')}</sub>`}</div>
        </div>
        <div class="trip-card-footer">
          <a href="${detailLink}" class="btn-details">${t('see_details')}</a>
          <a href="${waFull}" target="_blank" rel="noopener" class="btn-whatsapp">
            <svg viewBox="0 0 24 24" style="width:14px;height:14px;fill:white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.524 5.845L.057 23.428a    .615.615l5.583-1.467A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-4.997-1.366l-.36-.213-3.713.976.992-3.617-.232-.374A9.818 9.818 0 0112 2.182c5.423 0 9.818 4.395 9.818 9.818 0 5.424-4.395 9.818-9.818 9.818z"/></svg>
            ${t('book_whatsapp')}
          </a>
        </div>
      </div>
    </div>
    `;
  }).join('');
  
  if (typeof initScrollAnimations === 'function') {
    initScrollAnimations();
  }
}

// Social Proof now handled by assets/js/social-proof.js

// ---- Global FAQ Toggle ----
function initGlobalFaqToggle() {
  document.addEventListener('click', (e) => {
    const q = e.target.closest('.faq-q-v0');
    if (q) {
      const item = q.closest('.faq-item-v0');
      if (item) item.classList.toggle('open');
    }
  });
}



// -------------------------------- Interactive Orbit Gallery --------------------------------
function initOrbitGallery() {
  const container = document.getElementById('orbit-gallery');
  if (!container) return;
  const items = Array.from(container.querySelectorAll('.orbit-item'));
  if (!items.length) return;

  const isMobile = window.innerWidth < 768;

  const stateList = items.map((el, index) => {
    // Index 0 is the "Sun" in the center
    if (index === 0) {
      return {
        el,
        angle: 0,
        speed: 0,
        radius: 0,
        baseSize: isMobile ? 100 : 160,
        centerX: 0,
        centerY: 0,
        isCenter: true
      };
    }

    // Others are "Planets" distributed in concentric orbital rings
    // Divide into 3 distinct rings based on index
    const ringIndex = (index % 3) + 1; // Rings 1, 2, 3
    const baseRadius = isMobile ? 80 : 130;
    const radius = baseRadius * ringIndex + (Math.random() * 20); 
    
    return {
      el,
      angle: (Math.PI * 2 * index) / items.length + Math.random(), 
      speed: (Math.random() * 0.015 + 0.01) * (index % 2 === 0 ? 1 : -1), // Faster alternating direction
      radius: radius,
      baseSize: isMobile ? 40 + (Math.random() * 30) : 60 + (Math.random() * 50),
      centerX: 0,
      centerY: 0,
      isCenter: false
    };
  });

  let mouseX = 0;
  let mouseY = 0;
  let isHovering = false;
  let time = 0;

  const handlePointerMove = (e) => {
    const rect = container.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    mouseX = clientX - rect.left - rect.width / 2;
    mouseY = clientY - rect.top - rect.height / 2;
    isHovering = true;
  };

  const handlePointerLeave = () => { isHovering = false; };

  container.addEventListener('mousemove', handlePointerMove);
  container.addEventListener('mouseleave', handlePointerLeave);
  container.addEventListener('touchmove', handlePointerMove, { passive: true });
  container.addEventListener('touchend', handlePointerLeave);

  function animate() {
    time++;
    stateList.forEach(state => {
      // Rotate constantly
      state.angle += state.speed;
      
      const orbitX = Math.cos(state.angle) * state.radius;
      const orbitY = Math.sin(state.angle) * state.radius;
      
      // Pull the whole solar system center towards mouse if hovering
      const targetCenterX = isHovering ? mouseX * 0.5 : 0;
      const targetCenterY = isHovering ? mouseY * 0.5 : 0;
      
      state.centerX += (targetCenterX - state.centerX) * 0.12; // Snappier follow
      state.centerY += (targetCenterY - state.centerY) * 0.12; // Snappier follow

      const x = state.centerX + orbitX;
      const y = state.centerY + orbitY;
      
      // The center sun pulses slightly, others do too
      const scaleBase = state.isCenter ? 1 + Math.sin(time * 0.03) * 0.05 : 1 + Math.sin(time * 0.02 + state.angle) * 0.1;

      state.el.style.transform = `translate(${x}px, ${y}px) scale(${scaleBase})`;
      state.el.style.width = `${state.baseSize}px`;
      state.el.style.height = `${state.baseSize}px`;
      state.el.style.marginLeft = `-${state.baseSize/2}px`;
      state.el.style.marginTop = `-${state.baseSize/2}px`;
      
      if (state.isCenter) {
        state.el.style.zIndex = "10";
      }
    });
    requestAnimationFrame(animate);
  }
  animate();
}

// -------------------------------- Centralized Component Management --------------------------------
// This enables instant site-wide updates for Navbar, Footer, and other global elements.
const ComponentManager = {
  get isSub() {
    return window.location.pathname.includes('/trips/');
  },
  get base() {
    const path = window.location.pathname;
    const isTrip = path.includes('/trips/');
    const pathParts = path.split('/').filter(Boolean);
    const langCodes = ['ar', 'ru', 'de', 'fr', 'pl', 'it', 'es', 'tr', 'zh', 'uk', 'ro', 'cs', 'nl', 'sv', 'pt', 'ja', 'ko', 'hu', 'fi'];
    const hasLangFolder = pathParts.some(p => langCodes.includes(p.toLowerCase()));
    if (isTrip && hasLangFolder) return '../../';
    if (isTrip || hasLangFolder) return '../';
    return '';
  },

  renderBookingForm() {
    const formContainer = document.getElementById('fallback-booking-container');
    if (!formContainer) return;

    formContainer.innerHTML = `
      <div class="booking-form-v1 content-box-v0">
        <h3 class="section-title-small-v0" data-t="book_fallback_title">Inquiry Form</h3>
        <p class="form-sub" data-t="book_fallback_sub">Prefer email? Send us your details and we'll reply within 2 hours.</p>
        <form id="lead-form" class="lead-form-v1">
          <div class="form-group">
            <input type="text" name="name" id="lead-name" placeholder="${t('form_name') || 'Full Name'}" required>
          </div>
          <div class="form-grid-2">
            <div class="form-group">
              <input type="date" name="date" id="lead-date" required>
            </div>
            <div class="form-group">
              <input type="number" name="guests" id="lead-guests" placeholder="${t('form_guests') || 'Guests'}" min="1" required>
            </div>
          </div>
          <div class="form-group">
            <input type="email" name="email" id="lead-email" placeholder="${t('form_email') || 'Email Address'}" required>
          </div>
          <button type="submit" class="btn-gold w-100" data-t="btn_send_inquiry">Send Inquiry via WhatsApp</button>
          <p id="form-status" class="form-status-msg"></p>
        </form>
      </div>
    `;

    const form = document.getElementById('lead-form');
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const status = document.getElementById('form-status');
        const name = document.getElementById('lead-name').value.trim();
        const date = document.getElementById('lead-date').value;
        const guests = document.getElementById('lead-guests').value;
        const email = document.getElementById('lead-email').value.trim();
        
        const T = window.AQW_T || {};
        status.textContent = t('form_saving') || 'Saving Inquiry...';
        status.style.color = "var(--gold)";
        
        if (typeof window.saveLead === 'function') {
          window.saveLead(email);
          window.saveLead(name);
        }
        
        const tripHeader = document.querySelector('.trip-title-v0, h1');
        const tripName = tripHeader ? tripHeader.textContent.trim() || t('trip_default') || 'Premium Tour' : t('trip_default') || 'Premium Tour';
        
        const greeting = t('wa_greeting');
        const body = `${t('wa_form_intro')}\n📌 ${t('wa_form_tour')}: *${tripName}*\n👤 ${t('wa_form_name')}: *${name}*\n📅 ${t('wa_form_date')}: *${date}*\n👥 ${t('wa_form_guests')}: *${guests}*\n✉️ ${t('wa_form_email')}: *${email}*\n${t('wa_form_confirm')}`;
          
        const waLink = "https://wa.me/" + AQUAWAY_PHONE + "?text=" + encodeURIComponent(greeting + '\n\n' + body);
        
        setTimeout(() => {
          status.textContent = t('form_redirecting') || 'Redirecting to WhatsApp...';
          status.style.color = "#4CAF50";
          setTimeout(() => {
            window.open(waLink, '_blank');
            form.reset();
            status.textContent = "";
          }, 1000);
        }, 1500);
      };
    }
  },

  renderJourneyMap() {
    const mapSection = document.getElementById('journey-map-container');
    if (!mapSection) return;
    const T = window.AQW_T || {};

    mapSection.innerHTML = `
      <div class="journey-map-v1">
        <h3 class="section-title" data-t="trip_itinerary_l" style="margin-bottom: 3rem;">Trip Itinerary</h3>
        <div class="map-illustration">
          <svg viewBox="0 0 800 200" class="journey-svg">
            <path id="route" d="M50,100 Q200,50 400,100 T750,100" fill="none" stroke="rgba(212,175,55,0.2)" stroke-width="4" stroke-dasharray="10,10" />
            <circle cx="50" cy="100" r="8" fill="var(--gold)" class="pulse-point" />
            <circle cx="225" cy="72" r="6" fill="var(--silver)" />
            <circle cx="400" cy="100" r="8" fill="var(--gold)" class="pulse-point" />
            <circle cx="575" cy="128" r="6" fill="var(--silver)" />
            <circle cx="750" cy="100" r="8" fill="var(--gold)" class="pulse-point" />
            
            <text x="50" y="140" text-anchor="middle" class="map-label">${t('map_departure') || 'DEPARTURE'}</text>
            <text x="225" y="45" text-anchor="middle" class="map-label">${t('map_snorkeling') || 'SNORKELING'}</text>
            <text x="400" y="140" text-anchor="middle" class="map-label">${t('map_island') || 'PARADISE ISLAND'}</text>
            <text x="575" y="165" text-anchor="middle" class="map-label">${t('map_buffet') || 'BUFFET LUNCH'}</text>
            <text x="750" y="140" text-anchor="middle" class="map-label">${t('map_sunset') || 'SUNSET RETURN'}</text>
          </svg>
        </div>
      </div>
    `;
  },

  init() {
    this.renderNavbar();
    this.renderFooter();
    this.renderJourneyMap();
    this.injectGlobalVideo();

    // ---- PWA Service Worker Registration ----
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        const swPath = this.base ? `${this.base}sw.js` : './sw.js';
        navigator.serviceWorker.register(swPath)
          .catch(err => console.warn('Service Worker registration failed:', err));
      });
    }

    try {
      applyTranslations();
      initNavbar();
      initBackToTop();
      renderTrips();
      initFilters();
      initLightbox();
      initScrollAnimations();
      initParticles();
      initCurrency();
      initTripMap();
      initOrbitGallery();

      loadWeather();
      loadExchange();
      initGlobalFaqToggle();

      if (this.isSub) {
        renderTripDetailContent();
        renderSEOContent();
        renderRelatedTripsDynamic();
        this.renderBookingForm();
      }
      
      setTimeout(() => {
        const loader = document.getElementById('page-loader');
        if (loader) loader.classList.add('fade-out');
      }, 500);

    } catch (err) {
      console.error("Critical ComponentManager Init Error:", err);
      const loader = document.getElementById('page-loader');
      if (loader) loader.style.display = 'none';
    }
  },

  renderNavbar() {
    const nav = document.getElementById('navbar');
    if (!nav) return;

    // Inject mobile backdrop if not present
    let backdrop = document.getElementById('nav-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'nav-backdrop';
      backdrop.className = 'nav-backdrop';
      document.body.appendChild(backdrop);
    }

    nav.innerHTML = `
      <div class="container nav-inner">
        <a href="${this.base}index.html" class="nav-logo" aria-label="Aquaway Tours">
          <img src="${this.base}assets/images/logo.webp" alt="Aquaway Tours" width="48" height="48">
          <div class="nav-logo-text">
            <span class="nav-logo-name">AQUAWAY</span>
            <span class="nav-logo-sub" data-t="nav_logo_sub">PREMIUM TOURS</span>
          </div>
        </a>
        <ul class="nav-links" id="nav-links">
          <li class="nav-link-item"><a href="${this.base}index.html#hero" data-t="nav_home"><span class="nav-link-icon">🌴</span> Home</a></li>
          <li class="nav-link-item"><a href="${this.base}index.html#trips" data-t="nav_trips"><span class="nav-link-icon">🛥️</span> Trips</a></li>
          <li class="nav-link-item"><a href="${this.base}index.html#gallery" data-t="nav_gallery"><span class="nav-link-icon">📸</span> Gallery</a></li>
          <li class="nav-link-item"><a href="${this.base}index.html#reviews" data-t="nav_reviews"><span class="nav-link-icon">⭐</span> Reviews</a></li>
          <li class="nav-link-item"><a href="${this.base}index.html#map-section" data-t="nav_map"><span class="nav-link-icon">📍</span> Location</a></li>
          <li class="nav-link-item"><a href="${this.base}index.html#footer" data-t="nav_contact"><span class="nav-link-icon">✉️</span> Contact</a></li>
          
          <!-- MOBILE WHATSAPP CALLOUT (Moves into mobile drop menu on mobile screens) -->
          <li class="nav-mobile-wa-item">
            <a href="https://wa.me/${AQUAWAY_PHONE}" target="_blank" rel="noopener" class="nav-mobile-wa-btn">
              <div class="nav-mobile-wa-icon-box">
                <img src="${this.base}assets/WA.png" alt="WhatsApp" class="nav-mobile-wa-img" width="32" height="32">
              </div>
              <div class="nav-mobile-wa-info">
                <div class="nav-mobile-wa-head">
                  <span class="nav-mobile-wa-title" data-t="book_whatsapp">Chat on WhatsApp</span>
                  <span class="nav-mobile-wa-badge"><span class="nav-wa-pulse-dot"></span> Online</span>
                </div>
                <span class="nav-mobile-wa-sub">+20 1040296016 • Instant Confirmation</span>
              </div>
              <svg class="nav-mobile-wa-arrow" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </a>
          </li>
        </ul>
        <div class="nav-actions">
          <div class="lang-selector">
            <button class="lang-sel-btn" id="lang-sel-btn" aria-label="${t('select_lang')}" title="${t('select_lang')}">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" style="display: block;">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            </button>
            <div class="lang-dropdown" id="lang-dropdown">
              <a href="#" data-lang="en">🇬🇧 English</a>
              <a href="#" data-lang="ar">🇪🇬 العربية</a>
              <a href="#" data-lang="ru">🇷🇺 Русский</a>
              <a href="#" data-lang="de">🇩🇪 Deutsch</a>
              <a href="#" data-lang="fr">🇫🇷 Français</a>
              <a href="#" data-lang="pl">🇵🇱 Polski</a>
              <a href="#" data-lang="it">🇮🇹 Italiano</a>
              <a href="#" data-lang="es">🇪🇸 Español</a>
              <a href="#" data-lang="tr">🇹🇷 Türkçe</a>
              <a href="#" data-lang="zh">🇨🇳 中文</a>
              <a href="#" data-lang="uk">🇺🇦 Українська</a>
              <a href="#" data-lang="ro">🇷🇴 Română</a>
              <a href="#" data-lang="cs">🇨🇿 Čeština</a>
              <a href="#" data-lang="nl">🇳🇱 Nederlands</a>
              <a href="#" data-lang="sv">🇸🇪 Svenska</a>
              <a href="#" data-lang="pt">🇵🇹 Português</a>
              <a href="#" data-lang="ja">🇯🇵 日本語</a>
              <a href="#" data-lang="ko">🇰🇷 한국어</a>
              <a href="#" data-lang="hu">🇭🇺 Magyar</a>
              <a href="#" data-lang="fi">🇫🇮 Suomi</a>
            </div>
          </div>
          <a href="https://wa.me/${AQUAWAY_PHONE}" target="_blank" rel="noopener" class="btn-gold nav-cta">
            <svg viewBox="0 0 24 24"><path fill="currentColor" d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.103 8.103 0 0 1 -1.24 -4.38c0-4.51 3.67-8.19 8.19-8.19 2.19 0 4.24.85 5.79 2.4s2.4 3.6 2.4 5.79c0 4.51-3.67 8.19-8.19 8.19zM16.5 13.1c-.24-.12-1.44-.71-1.66-.8-.22-.08-.38-.12-.54.12s-.62.8-.76.96-.28.18-.52.06c-.24-.12-1.02-.37-1.94-1.19-.72-.64-1.2-1.42-1.34-1.66-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4s.04-.32-.02-.44c-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3s-.84.82-.84 2c0 1.18.86 2.32.98 2.48s1.69 2.58 4.1 3.62c.57.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.46-.07 1.44-.59 1.64-1.15.2-.56.2-1.03.14-1.14-.06-.1-.22-.16-.46-.28z"/></svg>
            <span data-t="trip_book_now">Book Now</span>
          </a>
          <button class="nav-menu-btn" id="nav-menu-btn" aria-label="Toggle navigation menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    `;
    
    // Dynamic Dropdown Router
    const langLinks = nav.querySelectorAll('.lang-dropdown a');
    langLinks.forEach(link => {
      link.onclick = (e) => {
        e.preventDefault();
        const targetLang = link.getAttribute('data-lang');
        localStorage.setItem('aqw_lang', targetLang);
        
        const path = window.location.pathname;
        const isTrip = path.includes('/trips/');
        const pathParts = path.split('/').filter(Boolean);
        const filename = pathParts[pathParts.length - 1] || 'index.html';
        
        let newPath = '';
        if (targetLang === 'en') {
          if (isTrip) newPath = this.base + 'trips/' + filename;
          else newPath = this.base + 'index.html';
        } else {
          if (isTrip) newPath = this.base + targetLang + '/trips/' + filename;
          else newPath = this.base + targetLang + '/index.html';
        }
        
        window.location.href = newPath;
      };
    });

    const langBtn = nav.querySelector('#lang-sel-btn');
    const langDropdown = nav.querySelector('#lang-dropdown');
    if (langBtn && langDropdown) {
      langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('open');
      });
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.lang-selector')) {
          langDropdown.classList.remove('open');
        }
      });
    }

    const btn = nav.querySelector('#nav-menu-btn');
    const links = nav.querySelector('#nav-links');
    
    const closeMobileMenu = () => {
      if (btn) {
        btn.classList.remove('active', 'open');
        btn.setAttribute('aria-expanded', 'false');
      }
      if (links) {
        links.classList.remove('active', 'open');
      }
      if (backdrop) {
        backdrop.classList.remove('active');
      }
    };

    const toggleMobileMenu = () => {
      const isOpen = links && (links.classList.contains('active') || links.classList.contains('open'));
      if (isOpen) {
        closeMobileMenu();
      } else {
        if (btn) {
          btn.classList.add('active', 'open');
          btn.setAttribute('aria-expanded', 'true');
        }
        if (links) {
          links.classList.add('active', 'open');
        }
        if (backdrop) {
          backdrop.classList.add('active');
        }
      }
    };

    if (btn) {
      btn.onclick = (e) => {
        e.stopPropagation();
        toggleMobileMenu();
      };
    }

    if (backdrop) {
      backdrop.onclick = () => closeMobileMenu();
    }

    if (links) {
      links.querySelectorAll('a').forEach(l => {
        l.addEventListener('click', () => {
          closeMobileMenu();
        });
      });
    }
  },

  renderFooter() {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const tripMap = TRIPS.reduce((acc, trip) => { acc[trip.slug] = trip; return acc; }, {});

    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-col brand-col">
            <div class="nav-logo" style="margin-bottom: 20px;">
              <img src="${this.base}assets/images/logo.webp" alt="Aquaway" width="48" height="48">
              <div class="nav-logo-text">
                <span class="nav-logo-name">AQUAWAY</span>
                <span class="nav-logo-sub" data-t="nav_logo_sub">PREMIUM TOURS</span>
              </div>
            </div>
            <p class="footer-desc" data-t="footer_desc">Premium tours and excursions in Hurghada, Egypt. Your adventure begins here.</p>
            <div class="footer-social">
              <a href="https://www.facebook.com/profile.php?id=61583713821419" target="_blank" rel="noopener" class="social-btn" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg></a>
              <a href="https://www.instagram.com/aquaway.tours" target="_blank" rel="noopener" class="social-btn" aria-label="Instagram"><svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.56.216.96.474 1.38.894.42.42.678.82.894 1.38.163.422.358 1.057.412 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.412 2.227-.216.56-.474.96-.894 1.38-.42.42-.82.678-1.38.894-.422.163-1.057.358-2.227.412-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.412-.56-.216-.96-.474-1.38-.894-.42-.42-.678-.82-.894-1.38-.163-.422-.358-1.057-.412-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.412-2.227.216-.56.474-.96.894-1.38.42-.42.82-.678 1.38-.894.422-.163 1.057-.358 2.227-.412 1.266-.058 1.646-.07 4.85-.07zM12 0C8.74 0 8.333.015 7.053.072 5.775.129 4.903.332 4.145.627c-.783.304-1.447.712-2.108 1.373-.66.66-1.069 1.325-1.373 2.108-.295.758-.498 1.63-.555 2.908C.014 8.333 0 8.74 0 12s.015 3.667.072 4.947c.057 1.278.26 2.15.555 2.908.304.783.712 1.447 1.373 2.108.66.66 1.325 1.069 2.108 1.373.758.295 1.63.498 2.908.555 1.28.057 1.687.072 4.947.072s3.667-.015 4.947-.072c1.278-.057 2.15-.26 2.908-.555.783-.304 1.447-.712 2.108-1.373.66-.66 1.069-1.325 1.373-2.108.295-.758.498-1.63.555-2.908.057-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.057-1.278-.26-2.15-.555-2.908-.304-.783-.712-1.447-1.373-2.108-.66-.66-1.325-1.069-2.108-1.373-.758-.295-1.63-.498-2.908-.555C15.667.014 15.26 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
              <a href="https://www.tiktok.com/@aquaway.tours" target="_blank" rel="noopener" class="social-btn" aria-label="TikTok"><svg viewBox="0 0 24 24"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.59-1.01V14a7 7 0 0 1 -7 7 7 7 0 0 1 -7-7 7 7 0 0 1 7-7c.03 0 .06 0 .09.01V11c-.03 0-.06-.01-.09-.01a3 3 0 0 0 -3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V0h3.13z"/></svg></a>
              <a href="https://snapchat.com/add/aquaway.tours" target="_blank" rel="noopener" class="social-btn" aria-label="Snapchat"><svg viewBox="0 0 24 24"><path d="M12 0C8.618 0 6.646 1.761 6.556 4.417c-.027.794-.365 3.018-1.748 4.39-1.04 1.04-2.822 1.373-3.056 1.415-.436.078-.574.654-.253.94l1.397 1.24c.73.65 1.11 1.554 1.056 2.502-.108 1.933-2.316 2.467-2.835 2.576-.438.093-.655.6-.39 1.002.348.528 1.17 1.597 2.067 1.597.234 0 .47-.058.647-.138 1.325-.6 2.924-.606 4.305-1.16.892-.357 1.448-1.284 2.809-1.284 1.4 0 1.924.896 2.768 1.246 1.375.572 2.973.57 4.295 1.166.18.082.42.14.66.14.893 0 1.716-1.062 2.062-1.588.267-.403.05-.91-.39-1.003-.518-.11-2.723-.643-2.83-2.574-.055-.95.326-1.85 1.055-2.5l1.398-1.242c.32-.284.183-.86-.252-.938-.236-.042-2.018-.376-3.057-1.415-1.385-1.373-1.724-3.598-1.75-4.392C17.388 1.76 15.42 0 12 0"/></svg></a>
              <a href="https://wa.me/${AQUAWAY_PHONE}" target="_blank" rel="noopener" class="social-btn" aria-label="WhatsApp"><svg viewBox="0 0 24 24"><path d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.103 8.103 0 0 1 -1.24 -4.38c0-4.51 3.67-8.19 8.19-8.19 2.19 0 4.24.85 5.79 2.4s2.4 3.6 2.4 5.79c0 4.51-3.67 8.19-8.19 8.19zM16.5 13.1c-.24-.12-1.44-.71-1.66-.8-.22-.08-.38-.12-.54.12s-.62.8-.76.96-.28.18-.52.06c-.24-.12-1.02-.37-1.94-1.19-.72-.64-1.2-1.42-1.34-1.66-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4s.04-.32-.02-.44c-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3s-.84.82-.84 2c0 1.18.86 2.32.98 2.48s1.69 2.58 4.1 3.62c.57.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.46-.07 1.44-.59 1.64-1.15.2-.56.2-1.03.14-1.14-.06-.1-.22-.16-.46-.28z"/></svg></a>
            </div>
          </div>
          <div class="footer-col">
            <h4 data-t="footer_links">Quick Links</h4>
            <ul class="footer-links">
              <li><a href="${this.base}index.html#hero" data-t="nav_home">Home</a></li>
              <li><a href="${this.base}index.html#trips" data-t="nav_trips">Trips</a></li>
               <li><a href="${this.base}index.html#reviews" data-t="nav_reviews">Reviews</a></li>
              <li><a href="${this.base}index.html#map-section" data-t="nav_map">Location</a></li>
              <li><a href="${this.base}privacy.html" data-t="footer_privacy">Privacy Policy</a></li>
              <li><a href="${this.base}terms.html" data-t="footer_terms">Terms & Conditions</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4 data-t="footer_top_trips">Top Trips</h4>
            <ul class="footer-links" id="footer-top-trips">
              <li><a href="${this.base}trips/orange-bay.html">${getLang(tripMap['orange-bay'].name)}</a></li>
              <li><a href="${this.base}trips/paradise-island.html">${getLang(tripMap['paradise-island'].name)}</a></li>
              <li><a href="${this.base}trips/island-bianka.html">${getLang(tripMap['island-bianka'].name)}</a></li>
              <li><a href="${this.base}trips/dolphin-house.html">${getLang(tripMap['dolphin-house'].name)}</a></li>
              <li><a href="${this.base}trips/super-safari.html">${getLang(tripMap['super-safari'].name)}</a></li>
              <li><a href="${this.base}trips/safari-stars.html">${getLang(tripMap['safari-stars'].name)}</a></li>
              <li><a href="${this.base}trips/diving.html">${getLang(tripMap['diving'].name)}</a></li>
              <li><a href="${this.base}trips/luxor.html">${getLang(tripMap['luxor'].name)}</a></li>
              <li><a href="${this.base}trips/pyramids.html">${getLang(tripMap['pyramids'].name)}</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4 data-t="footer_contact">Contact Us</h4>
            <div class="footer-contact-item">
              <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
              <a href="tel:+${AQUAWAY_PHONE}" class="text-gold">+20 1040296016</a>
            </div>
            <div class="footer-contact-item">
              <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              <a href="mailto:info@aquaway.tours" class="text-gold">info@aquaway.tours</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p class="footer-copy">&copy; 2026 <span>Aquaway Tours</span>. <span data-t="footer_rights">All rights reserved.</span> <span class="designer-credit">* DESIGNED BY <span class="designer-name" data-phone="+201224278490 | +201107871007">ROMERO'S STUDIOS</span> *</span></p>
        </div>
      </div>
    `;

    // Translations handled globally in init() via applyTranslations()
  },

  injectGlobalVideo() {
    if (document.querySelector('.global-video-bg')) return;
    const videoPath = this.base + 'assets/video/Aquaway-Compressed.mp4';
    const posterPath = this.base + 'assets/images/gallery-1.webp';

    const video = document.createElement('video');
    video.className = 'global-video-bg';
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute('poster', posterPath);
    video.innerHTML = `<source src="${videoPath}" type="video/mp4">`;
    
    const overlay = document.createElement('div');
    overlay.className = 'global-video-overlay';
    
    document.body.prepend(overlay);
    document.body.prepend(video);
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    try {
      ComponentManager.init();
    } catch (err) {
      console.warn("ComponentManager Init Failed:", err);
    }
  });
} else {
  try {
    ComponentManager.init();
  } catch (err) {
    console.warn("ComponentManager Init Failed:", err);
  }
}



