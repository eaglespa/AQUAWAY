'use strict';

/**
 * Aquaway Elite AI Concierge — "AQUAWAY TOURS, Your Virtual Tour Expert"
 * Friendly, knowledgeable, persuasive salesman.
 * Auto-learns from TRIPS data in main.js
 */

class AquawayAI {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.interactionCount = 0;
        this.isTTSEnabled = localStorage.getItem('ai_tts') === 'true';
        try { this.siteKnowledge = JSON.parse(localStorage.getItem('ai_knowledge') || '{}'); } catch(e) { this.siteKnowledge = {}; }
        try { this.userInterests = JSON.parse(localStorage.getItem('ai_interests') || '[]'); } catch(e) { this.userInterests = []; }
        this.currentChatLang = null;
        this.init();
    }

    _logInterest(category) {
        if (!this.userInterests.includes(category)) {
            this.userInterests.push(category);
            localStorage.setItem('ai_interests', JSON.stringify(this.userInterests));
        }
    }

    init() {
        this.injectUI();
        this.bindEvents();
        this.refreshKnowledge();
        this.scheduleProactiveGreeting();
    }

    // ---- Get translation helper ----
    _t(key) {
        const lang = this._lang();
        if (key === 'ai_name') return 'AQUAWAY TOURS';
        if (key === 'ai_status') return 'Online | Elite Service';
        
        // Try to get from TRANSLATIONS global (from translations.js)
        if (typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
            return TRANSLATIONS[lang][key];
        }
        
        if (typeof window.t === 'function') return window.t(key);
        if (window.AQW_T && window.AQW_T[key]) return window.AQW_T[key];
        return key;
    }

    _lang() {
        return window.aqw_override_lang || this.currentChatLang || window.AQW_LANG || 'en';
    }

    _getLang(obj) {
        if (!obj) return '';
        if (typeof obj === 'string') return obj;
        return obj[this._lang()] || obj['en'] || '';
    }

    // ---- Build knowledge base from TRIPS ----
    _getTrips() {
        return typeof TRIPS !== 'undefined' ? TRIPS : (window.TRIPS_DATA || []);
    }

    _findTrip(query) {
        const trips = this._getTrips();
        const q = query.toLowerCase();
        return trips.find(t => {
            const nameEn = (t.slug || '').replace(/-/g, ' ').toLowerCase();
            const nameLocal = this._getLang(t.name).toLowerCase();
            let matchesAnyLang = false;
            if (t.name) {
                matchesAnyLang = Object.values(t.name).some(val => {
                   const v = val.toLowerCase();
                   return q.includes(v) || (q.length > 3 && v.includes(q));
                });
            }
            const nameWords = nameEn.split(' ');
            return q.includes(nameEn) || q.includes(nameLocal) || matchesAnyLang ||
                   nameWords.some(w => w.length > 3 && q.includes(w));
        });
    }

    _getPrice(trip) {
        if (typeof convertPrice !== 'undefined') return convertPrice(trip.price);
        return { sym: '€', val: trip.price };
    }

    _waLink(tripName) {
        const waBase = 'https://wa.me/201040296016';
        const waMsg = encodeURIComponent(`Hi AQUAWAY TOURS! I'm interested in ${tripName} from the website. Can I get the best price?`);
        return `${waBase}?text=${waMsg}`;
    }

    _bookButton(tripName, label) {
        return `<br><br><a href="${this._waLink(tripName)}" target="_blank" rel="noopener" class="btn-gold" style="display:block; text-align:center; padding:12px 20px; border-radius:12px; color:#000; text-decoration:none; font-weight:bold; font-size:0.9rem;">📲 ${label || 'Book with AQUAWAY TOURS on WhatsApp'}</a>`;
    }

    _tripSummary(trip) {
        const name = this._getLang(trip.name);
        const desc = this._getLang(trip.desc);
        const p = this._getPrice(trip);
        const priceText = trip.price === 0 ? (trip.slug === 'medical-care' ? 'INSURANCE COVERAGE' : 'Essential Info') : `${p.sym}${p.val} ${trip.slug === 'speed-boat' ? 'per trip' : 'per person'}`;
        return `<b>${name}</b> — ${desc}<br>💰 <b>${priceText}</b> · ⏱ ${trip.dur} · ⭐ ${trip.rating}/5`;
    }

    injectUI() {
        const launcher = document.createElement('div');
        launcher.id = 'ai-concierge-launcher';
        launcher.setAttribute('role', 'button');
        launcher.setAttribute('aria-label', 'Open AI Tour Concierge');
        launcher.setAttribute('aria-expanded', 'false');
        launcher.innerHTML = `<svg viewBox="0 0 24 24"><path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10-10-4.48-10-10 4.48-10 10-10zm0 2c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm0 2c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6zm0 2c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/></svg>`;
        document.body.appendChild(launcher);

        const chatWindow = document.createElement('div');
        chatWindow.id = 'ai-chat-window';
        chatWindow.setAttribute('role', 'dialog');
        chatWindow.setAttribute('aria-label', 'AI Tour Assistant');
        chatWindow.innerHTML = `
            <div id="ai-listening-overlay" class="ai-listening-overlay">
                <div class="listening-waves">
                    <div class="wave"></div><div class="wave"></div><div class="wave"></div><div class="wave"></div><div class="wave"></div>
                </div>
                <div class="listening-text">AQUAWAY is Listening...</div>
            </div>
            <div class="ai-header">
                <div class="ai-avatar" style="background:#0a0a0a; border:2px solid #d4af37; color:#d4af37">A</div>
                <div class="ai-header-info">
                    <span class="ai-name" data-t="ai_name">${this._t('ai_name')}</span>
                    <span class="ai-status" data-t="ai_status">${this._t('ai_status')}</span>
                </div>
                <div class="ai-header-actions" style="margin-left:auto; display:flex; gap:10px; align-items:center;">
                    <button id="ai-tts-toggle" title="Toggle Voice" style="background:none; border:none; cursor:pointer; color:white; font-size:1.1rem; opacity: 0.5; transition: 0.3s;">🔈</button>
                    <button id="ai-push-toggle" title="Enable Notifications" style="background:none; border:none; cursor:pointer; color:white; font-size:1.1rem;">🔔</button>
                    <button id="ai-close-btn" style="background:none; border:none; cursor:pointer; color:white; font-size:1.5rem; line-height:1;">&times;</button>
                </div>
            </div>
            <div class="ai-messages" id="ai-messages-list"></div>
            <div class="ai-suggestions" id="ai-suggestions-list"></div>
            <div class="ai-input-area">
                <button class="ai-mic-btn" id="ai-mic-btn" title="Voice Input">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
                </button>
                <input type="text" id="ai-user-input" placeholder="Ask me anything about Hurghada tours...">
                <button class="ai-send-btn" id="ai-send-btn">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                </button>
            </div>
        `;
        document.body.appendChild(chatWindow);
        window.aqwAI = this;
        this.updateTTSIcon();
    }

    bindEvents() {
        document.getElementById('ai-concierge-launcher').addEventListener('click', () => this.toggle());
        document.getElementById('ai-close-btn').onclick = () => this.toggle();
        document.getElementById('ai-push-toggle').onclick = () => this.requestNotificationPermission();
        document.getElementById('ai-tts-toggle').onclick = () => this.toggleTTS();
        document.getElementById('ai-send-btn').onclick = () => this.handleSendMessage();
        document.getElementById('ai-mic-btn').addEventListener('click', () => this.startVoiceInput());
        document.getElementById('ai-user-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSendMessage();
        });
    }

    toggle() {
        this.isOpen = !this.isOpen;
        const win = document.getElementById('ai-chat-window');
        const launcher = document.getElementById('ai-concierge-launcher');
        win.classList.toggle('open', this.isOpen);
        if (launcher) launcher.setAttribute('aria-expanded', this.isOpen ? 'true' : 'false');
        if (this.isOpen && this.messages.length === 0) {
            const welcomeMsg = this._getLang({
                en: `Welcome, my dear friend! 🌟 I'm <b>AQUAWAY TOURS</b>, your personal guide in Hurghada. We are here to make sure you have the most beautiful vacation of your lives! <br><br>What kind of magical adventure are you dreaming of today?`,
                ar: `مرحباً يا صديقي العزيز! 🌟 أنا <b>AQUAWAY TOURS</b>، مرشدك الشخصي في الغردقة. نحن هنا لنتأكد من حصولك على أجمل إجازة في حياتك! <br><br>ما نوع المغامرة الساحرة التي تحلم بها اليوم؟`,
                ru: `Добро пожаловать, мой дорогой друг! 🌟 Я <b>AQUAWAY TOURS</b>, ваш личный гид в Хургаде. Мы здесь, чтобы убедиться, что у вас самый прекрасный отпуск в жизни! <br><br>О каком волшебном приключении вы мечтаете сегодня?`
            }) || `Welcome, my dear friend! 🌟 I'm <b>AQUAWAY TOURS</b>, your personal guide in Hurghada. We are here to make sure you have the most beautiful vacation of your lives! <br><br>What kind of magical adventure are you dreaming of today?`;
            
            this.addMessage("ai", welcomeMsg);
            this.showSuggestions([
                this._getLang({en:"🏝 Best Islands", ar:"🏝 أفضل الجزر"}) || "🏝 Best Islands",
                this._getLang({en:"🐬 Meet Dolphins", ar:"🐬 الغوص مع الدلافين"}) || "🐬 Meet Dolphins",
                this._getLang({en:"🏜 Safari", ar:"🏜 سفاري"}) || "🏜 Safari",
                this._getLang({en:"💎 All trips", ar:"💎 كل الرحلات"}) || "💎 All trips"
            ]);
        }
    }

    addMessage(sender, text) {
        const list = document.getElementById('ai-messages-list');
        const msg = document.createElement('div');
        msg.className = `message msg-${sender}`;
        msg.innerHTML = text;
        list.appendChild(msg);
        list.scrollTop = list.scrollHeight;
        this.messages.push({ sender, text });
        this.interactionCount++;
        if (sender === 'ai') this.speak(text);
    }

    showSuggestions(texts) {
        const list = document.getElementById('ai-suggestions-list');
        list.innerHTML = '';
        texts.forEach(txt => {
            const chip = document.createElement('div');
            chip.className = 'suggestion-chip';
            chip.textContent = txt;
            chip.onclick = () => {
                this.addMessage("user", txt);
                this.processInput(txt);
            };
            list.appendChild(chip);
        });
    }

    handleSendMessage() {
        const input = document.getElementById('ai-user-input');
        const txt = input.value.trim();
        if (!txt) return;
        this.addMessage("user", txt);
        input.value = "";
        this.processInput(txt);
    }

    detectLanguage(text) {
        if (/[\u0600-\u06FF]/.test(text)) return 'ar';
        if (/[\u0400-\u04FF]/.test(text)) return 'ru';
        if (/\b(und|ist|ich|das|die|der|nicht|wir|sie|ja|nein|bitte|danke|hallo|gut|schön|insel|wüste|preis|buchen|ausflug)\b/i.test(text) || /[äöüß]/i.test(text)) return 'de';
        if (/\b(bonjour|merci|oui|non|s'il|vous|plaît|avec|dans|pour|très|bien|île|prix|réserver)\b/i.test(text)) return 'fr';
        if (/\b(tak|nie|proszę|dziękuję|dzień|dobry|jest|wycieczka|wyspa|cena|rezerwacja)\b/i.test(text) || /[ąęćłńóśźż]/i.test(text)) return 'pl';
        if (/\b(ciao|grazie|si|no|per|favore|isola|prezzo|prenota)\b/i.test(text)) return 'it';
        if (/\b(hola|gracias|sí|por|favor|isla|precio|reservar)\b/i.test(text)) return 'es';
        if (/\b(yes|no|hello|thanks|please|island|price|book|tour|trip)\b/i.test(text)) return 'en';
        return null;
    }

    processInput(txt) {
        const detected = this.detectLanguage(txt);
        if (detected) {
            this.currentChatLang = detected;
            window.aqw_override_lang = detected; // Force override for this transaction
        }

        const query = txt.toLowerCase();
        let response = "";
        let suggestions = [];

        const trips = this._getTrips();
        const found = this._findTrip(query);

        // =========== LEAD COLLECTION / PHONE NUMBER DETECTION ===========
        const phoneRegex = /(\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})/g;
        const potentialPhone = txt.match(phoneRegex);

        // =========== GREETINGS ===========
        if (/^(hi|hello|hey|hola|bonjour|merhaba|привет|ahoj|مرحب|أهلا|ciao|cześć)/i.test(query)) {
            response = this._getLang({
                en: `A huge, warm welcome to Hurghada, the city of sun! 🌊 My heart is happy you're here, my friend. Are you looking for a magical island escape, or should I show you the secrets of the desert? I am completely at your service!`,
                ar: `مرحباً بك في الغردقة، مدينة الشمس! 🌊 قلبي سعيد بوجودك هنا يا صديقي. هل تبحث عن هروب ساحر إلى جزيرة (مثل جزيرة بيانكا أو باراديس)، أم أريك أسرار الصحراء؟ أنا في خدمتك تماماً!`,
                ru: `Огромный, теплый прием в Хургаде, городе солнца! 🌊 Мое сердце радуется, что вы здесь. Ищете волшебный отдых на острове, или мне показать вам секреты пустыни? Я полностью к вашим услугам!`,
                de: `Ein herzliches Willkommen in Hurghada, der Stadt der Sonne! 🌊 Ich freue mich, dass Sie hier sind. Suchen Sie nach einer magischen Inselauszeit, oder soll ich Ihnen die Geheimnisse der Wüste zeigen? Ich stehe Ihnen zur Verfügung!`
            }) || `A huge, warm welcome to Hurghada, the city of sun! 🌊 My heart is happy you're here. Are you looking for a magical island escape, or should I show you the secrets of the desert?`;
            suggestions = [this._getLang({en:"🏝 Magical Islands", ar:"🏝 جزر ساحرة"})||"🏝 Magical Islands", this._getLang({en:"🐬 Meet Dolphins",ar:"🐬 رؤية الدلافين"})||"🐬 Meet Dolphins"];
        }
        // =========== THANK YOU ===========
        else if (query.includes("thank") || query.includes("شكر") || query.includes("спасиб") || query.includes("danke")) {
            response = this._getLang({
                en: `You are so very welcome! 😊 It is our absolute pleasure. Have a beautiful, sun-kissed day! 🌅🐬`,
                ar: `على الرحب والسعة! 😊 من دواعي سرورنا. أتمنى لك يومًا جميلاً مشمسًا! 🌅🐬`,
                ru: `Всегда пожалуйста! 😊 Это абсолютно наше удовольствие. Иметь красивый солнечный день! 🌅🐬`
            }) || `You are so very welcome! 😊`;
            response += this._bookButton('General Booking', this._getLang({en:'📲 Let\'s Make Magic Happen!',ar:'📲 دعنا نصنع السحر'})||'📲 Let\'s Make Magic Happen!');
            suggestions = ["Show all trips"];
        }
        // =========== LEAD COLLECTION / PHONE NUMBER DETECTION ===========
        else if (potentialPhone && potentialPhone[0].length >= 8) {
            const phone = potentialPhone[0];
            if (typeof window.saveLead === 'function') {
                window.saveLead(phone);
                response = this._getLang("ai_lead_success") || "Perfect! You're on my VIP list. 🌟 I'll send you the best updates soon!";
                suggestions = ["🏝 View trips", "🐬 Meet Dolphins", "🏜 Desert Safari"];
            }
        }
        // =========== SPECIFIC TRIP FOUND ===========
        else if (found) {
            const name = this._getLang(found.name);
            response = this._getLang({
                en: `Oh, you have <b>absolutely exquisite taste!</b> 🌟 This is one of my personal favorites. Let me tell you a secret... it's even more beautiful in person! You deserve this kind of luxury.<br><br>${this._tripSummary(found)}<br><br>Because I like you, I'll give you my <b>special Best Price Guarantee</b> — better than anything those hotels can offer! Shall we book your spot?`,
                ar: `أوه، لديك <b>ذوق رائع للغاية!</b> 🌟 هذه واحدة من مفضلاتي الشخصية. دعني أخبرك سراً... إنها أجمل بكثير في الواقع! أنت تستحق هذا النوع من الفخامة.<br><br>${this._tripSummary(found)}<br><br>لأنني معجب بك، سأعطيك <b>ضمان أفضل سعر خاص بي</b> — أفضل من أي شيء يمكن أن تقدمه الفنادق! هل نحجز مكانك؟`,
                de: `Oh, Sie haben <b>absolut exquisiten Geschmack!</b> 🌟 Dies ist einer meiner persönlichen Favoriten. Lassen Sie mich Ihnen ein Geheimnis verraten... es ist persönlich noch schöner! Sie verdienen diesen Luxus.<br><br>${this._tripSummary(found)}<br><br>Ich gebe Ihnen meine <b>spezielle Bestpreisgarantie</b>! Sollen wir Ihren Platz buchen?`,
                ru: `У вас <b>совершенно изысканный вкус!</b> 🌟 Это одно из моих любимых мест. Секрет... вживую это еще красивее! Вы заслуживаете такой роскоши.<br><br>${this._tripSummary(found)}<br><br>Я дам вам <b>особую Гарантию Лучшей Цены</b>! Хотите забронировать?`
            }) || `Oh, you have <b>absolutely exquisite taste!</b> 🌟<br><br>${this._tripSummary(found)}<br><br>Shall we book your spot?`;
            response += this._bookButton(name, this._getLang({en:'💖 Yes! Let\'s do it!',ar:'💖 نعم! لنفعلها!'})||'💖 Yes! Let\'s do it!');
            const otherTrips = trips.filter(t => t.id !== found.id).sort(() => 0.5 - Math.random()).slice(0, 2);
            suggestions = otherTrips.map(t => this._getLang(t.name));
        }
        // =========== AQUAWAY TOURS / PERSONAL ===========
        else if (query.includes("aquaway") || query.includes("tours") || query.includes("who are you") || query.includes("من أنت")) {
            response = this._getLang({
                en: `That's us! 😄 We are <b>AQUAWAY TOURS</b>! We were born with the Red Sea in our veins and a passion for making people smile. We've been organizing tours here for over 10 years because we love seeing our guests happy. <br><br>What can we do to make you go 'WOW' today?`,
                ar: `هؤلاء نحن! 😄 نحن <b>AQUAWAY TOURS</b>! وُلدنا وشغفنا البحر الأحمر وإسعاد الناس. نقوم بتنظيم الرحلات هنا لأكثر من 10 سنوات لأننا نحب رؤية ضيوفنا سعداء. <br><br>ماذا يمكننا أن نفعل لجعلك تقول 'واو' اليوم؟`
            }) || `That's us! 😄 We are <b>AQUAWAY TOURS</b>! <br><br>What can we do to make you go 'WOW' today?`;
            suggestions = [this._getLang({en:"🏝 Show me Paradise", ar:"🏝 أرني باراديس"})||"🏝 Show me Paradise", this._getLang({en:"📞 Message us", ar:"📞 راسلنا"})||"📞 Message us directly"];
        }
        // =========== SHOW ALL TRIPS ===========
        else if (query.includes("all trip") || query.includes("show me") || query.includes("what do you have") || query.includes("list") || query.includes("كل الرحلات") || query.includes("قائمة")) {
            response = this._getLang({
                en: `Here's our full collection of ${trips.length} premium experiences! 🎯<br><br>`,
                ar: `إليك مجموعتنا الكاملة المكونة من ${trips.length} تجربة مميزة! 🎯<br><br>`
            }) || `Here's our full collection of ${trips.length} premium experiences! 🎯<br><br>`;
            trips.forEach(t => {
                const name = this._getLang(t.name);
                const p = this._getPrice(t);
                const priceText = t.price === 0 ? 'INSURANCE' : `${p.sym}${p.val}`;
                response += `${t.popular ? '⭐' : '▸'} <b>${name}</b> — ${priceText} · ${t.dur}<br>`;
            });
            response += `<br>${this._getLang({en:'Which one catches your eye? Just type the name! 😊', ar:'أي منها لفت انتباهك؟ فقط اكتب الاسم! 😊'})}`;
            suggestions = ["Island Bianka", "Hula Hula Sunset", "Orange Bay", "Dolphin House"];
        }
        // =========== PRICE / CHEAP ===========
        else if (query.includes("price") || query.includes("cost") || query.includes("cheap") || query.includes("budget") || query.includes("سعر") || query.includes("أسعار") || query.includes("رخيص")) {
            const sorted = [...trips].filter(t => t.price > 0).sort((a, b) => a.price - b.price);
            const cheapest = sorted.slice(0, 4);
            response = this._getLang({
                en: `I love a smart traveler! 💎 You want the best value, and I am here to give it to you. Our prices are the <b>most honest in all of Hurghada</b> — I promise! Here are my top deals just for you:<br><br>`,
                ar: `أنا أحب المسافر الذكي! 💎 تريد أفضل قيمة، وأنا هنا لأقدمها لك. أسعارنا هي <b>الأكثر صدقًا في الغردقة كلها</b> — أعدك بذلك! إليك أفضل صفقاتي خصيصًا لك:<br><br>`
            }) || `I love a smart traveler! 💎 Here are my top deals just for you:<br><br>`;
            cheapest.forEach(t => {
                const name = this._getLang(t.name);
                const p = this._getPrice(t);
                response += `✦ <b>${name}</b> — only <b>${p.sym}${p.val}</b>${t.slug === 'speed-boat' ? '/trip' : '/person'}<br>`;
            });
            suggestions = cheapest.map(t => this._getLang(t.name));
        }
        // =========== ISLANDS / BEACH ===========
        else if (query.includes("island") || query.includes("beach") || query.includes("best") || query.includes("جزيرة") || query.includes("شاطئ") || query.includes("остров") || query.includes("insel")) {
            this._logInterest('Islands');
            const islands = trips.filter(t => t.cat === 'Hurghada').sort(() => 0.5 - Math.random());
            response = this._getLang({
                en: `Our island trips are absolute PARADISE! 🏝️ Here are my favorites:<br><br>`,
                ar: `رحلات الجزر لدينا هي الجنة المطلقة! 🏝️ إليك المفضلات لدي:<br><br>`
            }) || `Our island trips are absolute PARADISE! 🏝️ Here are my favorites:<br><br>`;
            islands.slice(0, 3).forEach(t => { response += `${this._tripSummary(t)}<br><br>`; });
            response += this._getLang({
                en: `Orange Bay, PARADISE ISLAND, and the new BIANKA ISLAND are incredible choices! Want me to book one for you?`,
                ar: `أورانج باي، رحلة باراديس، وجزيرة بيانكا الجديدة هي خيارات مذهلة! هل تريدني أن أحجز لك واحدة؟`
            }) || `These are incredible choices! Want me to book one for you?`;
            response += this._bookButton('Island Trip');
            suggestions = islands.slice(0, 3).map(t => this._getLang(t.name));
        }
        // =========== DOLPHINS ===========
        else if (query.includes("dolphin") || query.includes("دلفين") || query.includes("دلافين") || query.includes("дельфин") || query.includes("delfin")) {
            const dolphin = trips.find(t => t.slug === 'dolphin-house');
            if (dolphin) {
                response = this._getLang({
                    en: `Swimming with wild dolphins is one of the most <b>magical experiences on Earth</b>! 🐬<br><br>`,
                    ar: `السباحة مع الدلافين البرية هي واحدة من أكثر <b>التجارب سحراً على وجه الأرض</b>! 🐬<br><br>`
                }) || `Swimming with wild dolphins is one of the most <b>magical experiences on Earth</b>! 🐬<br><br>`;
                response += `${this._tripSummary(dolphin)}<br><br>`;
                response += this._getLang({
                    en: `We have a <b>90%+ dolphin encounter rate</b>. The boat departs early morning when dolphins are most playful. Shall I reserve your spot?`,
                    ar: `لدينا <b>معدل رؤية دلافين يتجاوز 90%</b>. يغادر القارب في الصباح الباكر حيث تكون الدلافين في أوج نشاطها. هل أحجز لك؟`
                }) || `Shall I reserve your spot?`;
                response += this._bookButton('Dolphin House Tour');
                suggestions = [this._getLang({en:"Yes, book it!", ar:"نعم، احجز"})||"Yes, book it!"];
            }
        }
        // =========== DESERT / SAFARI ===========
        else if (query.includes("desert") || query.includes("safari") || query.includes("quad") || query.includes("صحر") || query.includes("سفاري") || query.includes("wüste")) {
            this._logInterest('Desert Safaris');
            const desertTrips = trips.filter(t => t.cat === 'Desert');
            response = this._getLang({
                en: `The desert is INCREDIBLE at sunset! 🏜️ We have ${desertTrips.length} desert adventures:<br><br>`,
                ar: `الصحراء مذهلة وقت الغروب! 🏜️ لدينا ${desertTrips.length} مغامرات صحراوية:<br><br>`
            }) || `The desert is INCREDIBLE at sunset! 🏜️<br><br>`;
            desertTrips.forEach(t => { response += `${this._tripSummary(t)}<br><br>`; });
            response += this._getLang({
                en: `The Super Safari is our most popular — quad bikes, camels AND a Bedouin dinner under the stars!`,
                ar: `سوبر سفاري هي الأكثر شعبية لدينا - دراجات رباعية، جمال، وعشاء بدوي تحت النجوم!`
            }) || `The Super Safari is our most popular!`;
            response += this._bookButton('Super Safari');
            suggestions = desertTrips.map(t => this._getLang(t.name));
        }
        // =========== PYRAMIDS / CAIRO / LUXOR ===========
        else if (query.includes("pyramid") || query.includes("cairo") || query.includes("luxor") || query.includes("أهرام") || query.includes("قاهرة") || query.includes("أقصر") || query.includes("history") || query.includes("تاريخ")) {
            const histTrips = trips.filter(t => t.cat === 'Cairo' || t.cat === 'Luxor');
            response = `A trip to Egypt without seeing the pyramids? Never! 🏛️<br><br>`;
            histTrips.forEach(t => { response += `${this._tripSummary(t)}<br><br>`; });
            response += `Both trips include <b>air-conditioned transport, expert Egyptologist guide, and lunch</b>. Which one speaks to you?`;
            suggestions = histTrips.map(t => this._getLang(t.name));
        }
        // =========== SPA / RELAX ===========
        else if (query.includes("spa") || query.includes("relax") || query.includes("massage") || query.includes("hammam")) {
            const spa = trips.find(t => t.slug === 'spa');
            if (spa) {
                response = `You deserve it! 💆<br><br>${this._tripSummary(spa)}<br><br>Our Ottoman-style Turkish bath + professional massage is the perfect way to recharge between your Red Sea adventures!`;
                response += this._bookButton('Spa & Hammam Experience');
                suggestions = ["Book Spa", "Island trips", "Desert Safari"];
            }
        }
        // =========== DIVING ===========
        else if (query.includes("div") || query.includes("scuba") || query.includes("underwater")) {
            const dive = trips.find(t => t.slug === 'diving');
            if (dive) {
                response = `The Red Sea is one of the <b>TOP 5 diving destinations in the world</b>! 🤿<br><br>${this._tripSummary(dive)}<br><br>No experience needed! Our PADI-certified team provides 1-on-1 guidance. Ready to explore the deep?`;
                response += this._bookButton('Red Sea Discovery Dive');
                suggestions = ["Book Diving", "Dolphin House", "Nefertari Submarine"];
            }
        }
        // =========== VIP / PRIVATE ===========
        else if (query.includes("private") || query.includes("vip") || query.includes("yacht") || query.includes("luxury") || query.includes("خاص") || query.includes("يخت")) {
            this._logInterest('VIP Luxury');
            const speedboat = trips.find(t => t.slug === 'speed-boat');
            const nef = trips.find(t => t.slug === 'nefertari');
            response = this._getLang({
                en: `You have <b>truly royal taste</b>! 👑 For the ultimate luxury and privacy that you deserve:<br><br>`,
                ar: `لديك <b>ذوق ملكي حقاً</b>! 👑 للحصول على أقصى درجات الفخامة والخصوصية التي تستحقها:<br><br>`
            }) || `You have <b>truly royal taste</b>! 👑<br><br>`;
            if (speedboat) response += `${this._tripSummary(speedboat)}<br><br>`;
            if (nef) response += `${this._tripSummary(nef)}<br><br>`;
            response += this._getLang({
                en: `With a private boat, YOU are the captain of your own destiny. Shall I prepare a VIP quote for you?`,
                ar: `بفضل القارب الخاص، أنت قائد رحلتك. هل أجهز لك عرض أسعار لكبار الشخصيات؟`
            }) || `Shall I prepare a VIP quote for you?`;
            response += this._bookButton('Private VIP Experience', this._getLang({en:'🔱 Request My VIP Quote',ar:'🔱 اطلب عرض الـ VIP'})||'🔱 Request VIP Quote');
            suggestions = ["Speed Boat", "Nefertari Submarine"];
        }
        // =========== SAFETY ===========
        else if (query.includes("safe") || query.includes("آمن") || query.includes("أمان")) {
            response = this._getLang({
                en: `Safety is our <b>#1 priority</b>! 🛡️<br><br>✅ All boats certified and inspected<br>✅ Professional guides<br>✅ Life jackets for everyone<br>We've served <b>10,000+ guests</b> safely!`,
                ar: `سلامتك هي <b>أولويتنا الأولى</b>! 🛡️<br><br>✅ جميع القوارب معتمدة<br>✅ مرشدون محترفون<br>✅ سترات نجاة للجميع<br>خدمنا أكثر من <b>10,000 ضيف</b> بأمان!`
            }) || `Safety is our <b>#1 priority</b>! 🛡️`;
            suggestions = ["Show trips", "Book now"];
        }
        // =========== BOOKING / HOW TO BOOK ===========
        else if (query.includes("book") || query.includes("reserv") || query.includes("حجز") || query.includes("أحجز") || query.includes("how") || query.includes("كيف")) {
            response = `Booking with us is <b>super easy</b>! 📲<br><br>1️⃣ Click any "Book Now" button<br>2️⃣ Send us a WhatsApp message<br>3️⃣ Get instant confirmation<br><br>✅ <b>No deposit required</b><br>✅ <b>Free cancellation</b> up to 24h<br>✅ <b>Free hotel pickup</b> from anywhere in Hurghada<br><br>Ready to go?`;
            response += this._bookButton('General Booking', '📲 Message AQUAWAY TOURS Now');
            suggestions = ["Show all trips", "Best deals", "Private VIP"];
        }
        // =========== FAMILY / KIDS ===========
        else if (query.includes("family") || query.includes("kid") || query.includes("child") || query.includes("أطفال") || query.includes("عائلة")) {
            response = this._getLang({
                en: `We LOVE families! 👨‍👩‍👧‍👦 Here are our best family-friendly trips:<br><br>`,
                ar: `نحن نحب العائلات! 👨‍👩‍👧‍👦 إليك أفضل رحلاتنا العائلية الممتعة والآمنة للأطفال:<br><br>`
            }) || `We LOVE families! 👨‍👩‍👧‍👦 Here are our best family-friendly trips:<br><br>`;
            const familyTrips = trips.filter(t => ['island-bianka', 'hula-hula', 'dolphin-house', 'orange-bay'].includes(t.slug));
            familyTrips.forEach(t => {
                const name = this._getLang(t.name);
                const p = this._getPrice(t);
                response += `🌟 <b>${name}</b> — ${p.sym}${p.val}${t.slug === 'speed-boat' ? '/trip' : '/person'}<br>`;
            });
            response += `<br>${this._getLang({en:'All include life vests for children. Your kids will remember this forever! 🌈',ar:'جميعها تشمل سترات نجاة للأطفال. أطفالك سيتذكرون هذا إلى الأبد! 🌈'})}`;
            suggestions = familyTrips.map(t => this._getLang(t.name));
        }
        // =========== AIRPORT / TRANSFER ===========
        else if (query.includes("airport") || query.includes("transfer") || query.includes("shuttle") || query.includes("مطار") || query.includes("توصيل")) {
            const shuttle = trips.find(t => t.slug === 'airport-shuttle');
            if (shuttle) {
                response = this._getLang({
                    en: `We've got you covered from the moment you land! ✈️<br><br>${this._tripSummary(shuttle)}<br><br>Arriving late? No problem — we track your flight!`,
                    ar: `نحن نغطيك من لحظة هبوطك! ✈️<br><br>${this._tripSummary(shuttle)}<br><br>هبوط متأخر؟ لا مشكلة، نحن نراقب رحلتك!`
                }) || `We've got you covered from the moment you land! ✈️`;
                response += this._bookButton('Airport Shuttle');
                suggestions = [this._getLang({en:"Book Shuttle", ar:"احجز التوصيل"})||"Book Shuttle"];
            }
        }
        // =========== MEDICAL ===========
        else if (query.includes("medical") || query.includes("doctor") || query.includes("health") || query.includes("طبي") || query.includes("طبيب") || query.includes("دكتور")) {
            const medical = trips.find(t => t.slug === 'medical-care');
            if (medical) {
                response = this._getLang({
                    en: `Your health is our #1 priority! 🏥<br><br>${this._tripSummary(medical)}<br><br>We handle everything with your insurance. You're never alone with AQUAWAY TOURS! ❤️`,
                    ar: `صحتك أولويتنا! 🏥<br><br>${this._tripSummary(medical)}<br><br>نتعامل مع تأمينك لتستمتع أنت بأمان مع أكواواي تورز! ❤️`
                }) || `Your health is our #1 priority! 🏥`;
                response += this._bookButton('Medical Care Info');
                suggestions = ["Show all trips"];
            }
        }
        // =========== HELP / POPULAR ===========
        else if (query.includes("help") || query.includes("what") || query.includes("more") || query.includes("popular") || query.includes("مساعدة") || query.includes("ماذا")) {
            const popular = trips.filter(t => t.popular).sort(() => 0.5 - Math.random()).slice(0, 3);
            response = this._getLang({
                en: `Great question! 😊 Let me help you find the perfect adventure. Here are our most popular experiences:<br><br>`,
                ar: `سؤال رائع! 😊 دعني أساعدك في إيجاد المغامرة المثالية. إليك أكثر التجارب شعبية لدينا:<br><br>`
            }) || `Here are our most popular experiences:<br><br>`;
            popular.forEach(t => {
                const name = this._getLang(t.name);
                const p = this._getPrice(t);
                const priceText = t.price === 0 ? 'INSURANCE' : `${p.sym}${p.val}`;
                response += `⭐ <b>${name}</b> — ${priceText}<br>`;
            });
            suggestions = popular.map(t => this._getLang(t.name));
        }
        // =========== KNOWLEDGE BASE MATCH ===========
        else if (this.siteKnowledge && Object.keys(this.siteKnowledge).length > 0) {
            const foundK = Object.keys(this.siteKnowledge).find(k => query.includes(k.toLowerCase()));
            if (foundK) {
                response = `Regarding <b>${foundK}</b>, it says here: "${this.siteKnowledge[foundK]}". We always give you the most accurate and beautiful info!`;
                suggestions = ["🏝 View trips", "🐬 Meet Dolphins"];
            }
        }

        // =========== FINAL FALLBACK (If still empty) ===========
        if (!response) {
            response = this._getLang({
                en: `That's a very interesting question! 🤔 As an AI, I'm still learning every day, and I want to make sure you get the <b>perfect 100% accurate information</b> for your dream holiday.<br><br>My human colleague is an expert in this! May I connect you with him on WhatsApp? He responds in seconds! ⚡`,
                ar: `هذا سؤال مثير للاهتمام حقاً! 🤔 بصفتي ذكاءً اصطناعياً، ما زلت أتعلم كل يوم، وأريد التأكد من حصولك على <b>معلومات دقيقة بنسبة 100%</b> لعطلة أحلامك.<br><br>زميلي البشري خبير في هذا! هل يمكنني توصيلك به على واتساب؟ سيرد عليك في ثوانٍ! ⚡`,
                ru: `Это очень интересный вопрос! 🤔 Как ИИ, я все еще учусь каждый день, и я хочу быть уверен, что вы получите <b>100% точную информацию</b> для вашего отпуска мечты.<br><br>Мой коллега — эксперт в этом! Могу я соединить вас с ним в WhatsApp? Он отвечает за считанные секунды! ⚡`
            }) || this._t("ai_no_match") || `I'm still learning! My human colleague can answer this perfectly.`;
            
            response += `<br><br><a href="https://wa.me/201040296016?text=${encodeURIComponent('Hi! I have a special question for Aquaway Tours: ' + query)}" target="_blank" rel="noopener" class="btn-gold" style="display:block; text-align:center; padding:12px 20px; border-radius:12px; color:#000; text-decoration:none; font-weight:bold;">💬 Ask Human Expert Now</a>`;
            suggestions = ["Show all trips", "Best deals", "Hurghada info"];
        }

        // Apply personal touch based on learned interests (STANDALONE AUGMENTATION)
        if (this.userInterests.length > 0 && Math.random() > 0.7 && !query.includes("thank")) {
            const interest = this.userInterests[Math.floor(Math.random() * this.userInterests.length)];
            response = `<i>I remember you were interested in ${interest}...</i><br><br>` + response;
        }

        // Show typing indicator then respond
        this.showTyping();
        setTimeout(() => {
            this.removeTyping();
            this.addMessage("ai", response);
            if (suggestions && suggestions.length > 0) this.showSuggestions(suggestions);
        }, 800 + Math.random() * 500);
    }

    showTyping() {
        const list = document.getElementById('ai-messages-list');
        const typing = document.createElement('div');
        typing.className = 'message msg-ai ai-typing';
        typing.innerHTML = '<span class="typing-dots"><span>.</span><span>.</span><span>.</span></span>';
        typing.id = 'ai-typing-indicator';
        list.appendChild(typing);
        list.scrollTop = list.scrollHeight;
    }

    removeTyping() {
        const el = document.getElementById('ai-typing-indicator');
        if (el) el.remove();
    }

    startVoiceInput() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            this.addMessage("ai", "Voice input works best on Chrome or Safari. Please type your question instead! 😊");
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        const langMap = {
            ar: 'ar-EG', ru: 'ru-RU', de: 'de-DE', fr: 'fr-FR',
            pl: 'pl-PL', it: 'it-IT', es: 'es-ES', tr: 'tr-TR',
            zh: 'zh-CN', uk: 'uk-UA', ro: 'ro-RO', cs: 'cs-CZ',
            nl: 'nl-NL', sv: 'sv-SE', pt: 'pt-PT', ja: 'ja-JP',
            ko: 'ko-KR', hu: 'hu-HU', fi: 'fi-FI', en: 'en-US'
        };
        const activeLang = window.AQW_LANG || 'en';
        recognition.lang = langMap[activeLang] || 'en-US';
        
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        const micBtn = document.getElementById('ai-mic-btn');
        const overlay = document.getElementById('ai-listening-overlay');
        micBtn.classList.add('listening');
        overlay.classList.add('show');

        recognition.start();

        recognition.onresult = (event) => {
            const result = event.results[0][0].transcript;
            const input = document.getElementById('ai-user-input');
            input.value = result;
            micBtn.classList.remove('listening');
            overlay.classList.remove('show');
            this.handleSendMessage();
        };

        recognition.onerror = () => { micBtn.classList.remove('listening'); overlay.classList.remove('show'); };
        recognition.onspeechend = () => { recognition.stop(); micBtn.classList.remove('listening'); overlay.classList.remove('show'); };
    }

    // ---- Talk (TTS) ----
    toggleTTS() {
        this.isTTSEnabled = !this.isTTSEnabled;
        localStorage.setItem('ai_tts', this.isTTSEnabled);
        this.updateTTSIcon();
        if (!this.isTTSEnabled && window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
    }

    updateTTSIcon() {
        const btn = document.getElementById('ai-tts-toggle');
        if (btn) {
            btn.classList.toggle('active', this.isTTSEnabled);
            btn.innerHTML = this.isTTSEnabled ? '🔊' : '🔈';
        }
    }

    _bestVoice(lang) {
        if (!window.speechSynthesis) return null;
        const voices = window.speechSynthesis.getVoices();
        if (!voices || voices.length === 0) return null;

        // 1. Filter by language
        const langCode = lang.split('-')[0]; // 'en', 'ar', 'ru', etc.
        const langVoices = voices.filter(v => v.lang.startsWith(langCode));

        if (langVoices.length === 0) return voices.find(v => v.default) || voices[0];

        // 2. Identify "Female" voices by name keywords
        const femaleKeywords = ['female', 'samantha', 'victoria', 'google us english', 'microsoft aria', 'microsoft zira', 'karen', 'moira', 'tessa', 'milena', 'anna'];
        const femaleVoices = langVoices.filter(v => 
            femaleKeywords.some(key => v.name.toLowerCase().includes(key))
        );

        // 3. Prioritize Premium/Enhanced voices
        const premiumVoices = (femaleVoices.length > 0 ? femaleVoices : langVoices).filter(v => 
            v.name.toLowerCase().includes('premium') || v.name.toLowerCase().includes('enhanced') || v.name.toLowerCase().includes('google')
        );

        return premiumVoices[0] || femaleVoices[0] || langVoices[0];
    }

    speak(text) {
        if (!this.isTTSEnabled || !('speechSynthesis' in window)) return;
        
        window.speechSynthesis.cancel();

        const rawParagraphs = text.split(/<br\s*\/?>|<\/p>|\n\n/gi)
            .map(p => p.trim())
            .filter(p => p.length > 2);

        if (rawParagraphs.length === 0) return;

        const cleanParagraphs = rawParagraphs.map(p => {
            let processed = p.replace(/<[^>]*>/g, ' ');
            processed = processed.replace(/\d+(\.\d+)?\/5(\.0)?/g, ' ');
            processed = processed.replace(/[^\p{L}\p{N}\s.,!?€$£%]/gu, ' ');
            return processed.trim();
        }).filter(p => p.length > 1);

        if (cleanParagraphs.length === 0) return;

        let currentIndex = 0;
        const speakNext = () => {
            if (currentIndex >= cleanParagraphs.length || !this.isTTSEnabled) return;

            const utterance = new SpeechSynthesisUtterance(cleanParagraphs[currentIndex]);
            
            const langMap = {
                ar: 'ar-EG', ru: 'ru-RU', de: 'de-DE', fr: 'fr-FR',
                pl: 'pl-PL', it: 'it-IT', es: 'es-ES', tr: 'tr-TR',
                zh: 'zh-CN', uk: 'uk-UA', ro: 'ro-RO', cs: 'cs-CZ',
                nl: 'nl-NL', sv: 'sv-SE', pt: 'pt-PT', ja: 'ja-JP',
                ko: 'ko-KR', hu: 'hu-HU', fi: 'fi-FI', en: 'en-US'
            };
            const activeLang = this._lang() || 'en';
            const lang = langMap[activeLang] || 'en-US';
            
            utterance.lang = lang;
            utterance.voice = this._bestVoice(lang);
            utterance.rate = 0.92; // Calm, premium pace
            utterance.pitch = 1.0; // Natural and warm
            
            utterance.onend = () => {
                currentIndex++;
                if (currentIndex < cleanParagraphs.length) {
                    setTimeout(speakNext, 800); 
                }
            };

            window.speechSynthesis.speak(utterance);
        };

        // Ensure voices are loaded before speaking (required for some browsers)
        if (window.speechSynthesis.getVoices().length === 0) {
            window.speechSynthesis.onvoiceschanged = () => speakNext();
        } else {
            speakNext();
        }
    }

    // ---- Daily Knowledge Refresh ----
    refreshKnowledge() {
        const lastRead = localStorage.getItem('ai_last_read');
        const now = new Date().getTime();
        
        // If it's been more than 24 hours OR we have no knowledge, read the page
        if (!lastRead || (now - parseInt(lastRead)) > 86400000) {
            const newKnowledge = {};
            
            // Extract info from page headings and text
            const mainContent = document.querySelector('main') || document.body;
            const headers = mainContent.querySelectorAll('h1, h2, h3, h4');
            headers.forEach(h => {
                const q = h.innerText.trim();
                if (q.length < 3) return;

                // Try to find a related paragraph or data
                let a = "";
                let next = h.nextElementSibling;
                
                // Case 1: Simple next sibling P
                if (next && (next.tagName === 'P' || next.tagName === 'SPAN' || next.classList.contains('info-val'))) {
                    a = next.innerText.trim();
                } 
                // Case 2: Inside a card or parent (common for Info Hub)
                else if (h.parentElement && h.parentElement.querySelector('.info-val, .rate-val, p')) {
                    const val = h.parentElement.querySelector('.info-val, .rate-val');
                    if (val) a = val.innerText.trim();
                    else a = h.parentElement.querySelector('p').innerText.trim();
                }

                if (q && a && a.length > 1) {
                    newKnowledge[q] = a.substring(0, 300);
                }
            });

            // Extract from FAQs if they exist in DOM (Support both V0 and V1 styles)
            const faqs = document.querySelectorAll('.faq-item, .faq-question, .faq-item-v0');
            faqs.forEach(f => {
                const qEl = f.querySelector('.faq-q, .faq-q-v0') || f;
                const aEl = f.querySelector('.faq-a, .faq-a-v0') || f.nextElementSibling;
                
                if (qEl && aEl) {
                    const q = qEl.innerText.replace('▼', '').trim();
                    const a = aEl.innerText.trim();
                    if (q && a) newKnowledge[q] = a.substring(0, 500);
                }
            });

            this.siteKnowledge = newKnowledge;
            localStorage.setItem('ai_knowledge', JSON.stringify(newKnowledge));
            localStorage.setItem('ai_last_read', now.toString());
        }
    }

    requestNotificationPermission() {
        if (!('Notification' in window)) return;
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                const btn = document.getElementById('ai-push-toggle');
                if (btn) btn.innerHTML = "🔕";
                this.addMessage("ai", "<b>Notification Access Granted!</b> 🌊 I will now keep you updated on the best sea conditions and exclusive deals directly on your device.");
                
                // Show a test notification
                new Notification("Aquaway Tours", {
                    body: "Welcome to the VIP club, my friend! ✨",
                    icon: "assets/images/logo.jpg"
                });
            }
        });
    }

    scheduleProactiveGreeting() {
        setTimeout(() => {
            if (!this.isOpen && this.messages.length === 0) {
                const tooltip = document.createElement('div');
                tooltip.className = 'ai-proactive-tooltip';
                tooltip.innerHTML = this._t('ai_proactive') || "Hi! We're AQUAWAY TOURS 👋 Want the <b>magical tour deals</b> we've been saving for you?";
                document.body.appendChild(tooltip);
                setTimeout(() => { tooltip.classList.add('show'); }, 100);
                setTimeout(() => { tooltip.classList.remove('show'); setTimeout(() => tooltip.remove(), 500); }, 12000);
            }
        }, 15000);
    }
}

// Start
new AquawayAI();

