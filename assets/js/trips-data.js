'use strict';

// ---- Aquaway Tours — Centralized Trip Data and Detailed Content ----
const TRIPS = [
  {
    id: 99,
    slug: "ozaria-island",
    cat: "Hurghada",
    price: 55,
    rating: 5.0,
    reviewCount: 12,
    dur: "8 hours",
    img: "assets/images/OZA13.webp",
    gallery: ["assets/images/OZA1.webp", "assets/images/OZA2.webp", "assets/images/OZA3.webp"],
    popular: true,
    name: { 
      en: "Ozaria Island", ar: "جزيرة أوزاريا", ru: "Озария Премиум", de: "Ozaria Insel",
      fr: "Ozaria Île", it: "Ozaria Isola", es: "Ozaria Isla", pl: "Ozaria Wyspa",
      tr: "Ozaria Adası", zh: "欧扎里亚高级岛屿", uk: "Озарія Преміум", ro: "Ozaria Insulă",
      cs: "Ozaria Ostrov", nl: "Ozaria Eiland", sv: "Ozaria", pt: "Ozaria Ilha",
      ja: "オザリア・アイランド", ko: "오자리아 아일랜드", hu: "Ozaria Sziget", fi: "Ozaria-saari"
    },
    desc: {
      en: "Experience paradise at Ozaria Island!",
      ar: "استمتع بالجنة في جزيرة أوزاريا!",
      ru: "Рай на земле в Озарии!",
      de: "Paradies auf Erden!",
      fr: "Le paradis sur terre !",
      it: "Paradiso in terra!",
      es: "¡El paraíso en la tierra!",
      pl: "Raj na ziemi!",
      tr: "Yeryüzündeki cennet!",
      zh: "地上的天堂！",
      uk: "Рай на землі!",
      ro: "Paradisul pe pământ!",
      cs: "Ráj na zemi!",
      nl: "Paradijs op aarde!",
      sv: "Paradiset på jorden!",
      pt: "Paraíso na terra!",
      ja: "地上の楽園！",
      ko: "지상의 낙원!",
      hu: "Paradicsom a földön!",
      fi: "Paratiisi maan päällä!"
    },
    fullDesc: {
      en: "Experience paradise at Ozaria Island! This premium excursion takes you to the Red Sea's most stunning turquoise lagoon.",
      ar: "استمتع بالجنة في جزيرة أوزاريا! تأخذك هذه الرحلة المميزة إلى أجمل بحيرة فيروزية في البحر الأحمر."
    },
    coords: [27.2173, 33.9161],
    video: "assets/video/ozaria.mp4"
  },
  {
    id: 1,
    slug: "orange-bay",
    cat: "Hurghada",
    price: 30,
    rating: 4.9,
    reviewCount: 124,
    dur: "8 hours",
    img: "assets/images/orange-bay.webp",
    gallery: ["assets/images/orange-bay.webp", "assets/images/gallery-1.webp", "assets/images/gallery-2.webp", "assets/images/gallery-3.webp"],
    popular: true,
    name: { 
      en: "Orange Bay Premium Island", ar: "جزيرة أورانج باي", ru: "Оранж Бей Премиум", de: "Orange Bay Premium Insel",
      fr: "Orange Bay Île Premium", it: "Orange Bay Isola Premium", es: "Orange Bay Isla Premium", pl: "Orange Bay Wyspa Premium",
      tr: "Orange Bay Premium Adası", zh: "橙色湾高级岛屿", uk: "Оранж Бей Преміум", ro: "Orange Bay Insulă Premium",
      cs: "Orange Bay Prémiový Ostrov", nl: "Orange Bay Premium Eiland", sv: "Orange Bay Premiumö", pt: "Orange Bay Ilha Premium",
      ja: "オレンジベイ・プレミアム・アイランド", ko: "오렌지 베이 프리미엄 아일랜드", hu: "Orange Bay Prémium Sziget", fi: "Orange Bay Premium-saari"
    },
    desc: {
      en: "Paradise on earth! Relax under iconic orange parasols in turquoise lagoons.",
      ar: "الجنة على الأرض! استرخِ تحت المظلات البرتقالية الشهيرة في البحيرات الفيروزية.",
      ru: "Рай на земле! Отдых под культовыми оранжевыми зонтиками в бирюзовых лагунах.",
      de: "Paradies auf Erden! Entspannen Sie sich unter kultigen orangefarbenen Sonnenschirmen.",
      fr: "Le paradis sur terre ! Détendez-vous sous les parasols orange emblématiques.",
      it: "Paradiso in terra! Rilassati sotto gli iconici ombrelloni arancioni.",
      es: "¡El paraíso en la tierra! Relájate bajo las icónicas sombrillas naranjas.",
      pl: "Raj na ziemi! Relaks pod kultowymi pomarańczowymi parasolami.",
      tr: "Yeryüzündeki cennet! Turkuaz lagünlerde ikonik turuncu şemsiyelerin altında rahatlayın.",
      zh: "地上的天堂！在青绿色的泻湖中经典的橙色遮阳伞下放松身心。",
      uk: "Рай на землі! Відпочинок під культовими помаранчевими парасольками.",
      ro: "Paradisul pe pământ! Relaxați-vă sub umbrelele portocalii emblematice.",
      cs: "Ráj na zemi! Relaxujte pod ikonickými oranžovými slunečníky.",
      nl: "Paradijs op aarde! Ontspan onder iconische oranje parasols.",
      sv: "Paradiset på jorden! Koppla av under ikoniska orangea parasoller.",
      pt: "Paraíso na terra! Relaxe sob os icónicos guarda-sóis laranja.",
      ja: "地上の楽園！ターコイズブルー of ラグーンにあるオレンジ色のパラソルの下でリラックス。",
      ko: "지상의 낙원! 청록색 석호의 상징적인 오렌지색 파라솔 아래에서 휴식을 취하세요.",
      hu: "Paradicsom a földön! Pihenjen az ikonikus narancssárga napernyők alatt.",
      fi: "Paratiisi maan päällä! Rentoudu ikonisten oranssien päivänvarjojen alla."
    },
    fullDesc: {
      en: "Experience paradise at Orange Bay! This premium excursion takes you to the Red Sea’s most stunning turquoise lagoon. Our certified crew ensures a safe, relaxing day under the iconic orange sunshades, complete with professionally guided snorkeling at two vibrant reefs and a delicious, freshly prepared shore-side buffet. Your perfect Egyptian memory starts here.",
      ar: "استمتع بالجنة في أورانج باي! تأخذك هذه الرحلة المميزة إلى أجمل بحيرة فيروزية في البحر الأحمر. يضمن طاقمنا المعتمد يومًا مريحًا وآمنًا تحت المظلات البرتقالية الشهيرة، مع الغطس بصحبة مرشدين محترفين في شعاب مرجانية نابضة بالحياة وبوفيه شهي يُعد طازجًا على الشاطئ. ذكرياتك المصرية المثالية تبدأ من هنا."
    },
    coords: [27.2173, 33.9161], // Orange Bay
    video: "assets/video/Orange-Bay.mp4"
  },
  {
    id: 2,
    slug: "hula-hula",
    cat: "Hurghada",
    price: 30,
    rating: 4.8,
    dur: "8 hours",
    img: "assets/images/hula-hula.webp",
    gallery: ["assets/images/hula-hula.webp", "assets/images/hula1.webp", "assets/images/hula2.webp", "assets/images/hula3.webp", "assets/images/hula4.webp"],
    name: { 
      en: "Hula Hula Beach Escape", ar: "شاطئ هولا هولا", ru: "Пляж Хула-Хула", de: "Hula Hula Beach Ausflug",
      fr: "Escapade Plage Hula Hula", it: "Hula Hula Beach Fuga", es: "Hula Hula Beach Escape", pl: "Hula Hula Beach Ucieczka",
      tr: "Hula Hula Plaj Kaçışı", zh: "草裙舞海滩逃离", uk: "Пляж Хула-Хула", ro: "Hula Hula Beach Evadare",
      cs: "Hula Hula Beach Únik", nl: "Hula Hula Beach Ontsnapping", sv: "Hula Hula Beach Escape", pt: "Hula Hula Beach Escape",
      ja: "フラフラ・ビーチ・エスケープ", ko: "훌라훌라 비치 이스케이프", hu: "Hula Hula Beach Menekülés", fi: "Hula Hula Beach -pako"
    },
    desc: {
      en: "Tropical vibes at Giftun Island! Sail to the exclusive Hula Hula beach for a day of sun and sea.",
      ar: "أجواء استوائية في جزيرة جفتون! أبحر إلى شاطئ هولا هولا الحصري لقضاء يوم من الشمس والبحر.",
      ru: "Тропическая атмосфера на острове Гифтун! Плывите на эксклюзивный пляж Хула-Хула.",
      de: "Tropische Atmosphäre auf der Insel Giftun! Segeln Sie zum exklusiven Strand Hula Hula.",
      fr: "Ambiance tropicale sur l'île de Giftun ! Naviguez vers la plage exclusive Hula Hula.",
      it: "Vibrazioni tropicali sull'isola di Giftun! Naviga verso l'esclusiva spiaggia di Hula Hula.",
      es: "Vibras tropicales en la isla Giftun! Navega a la exclusiva playa Hula Hula.",
      pl: "Tropikalny klimat na wyspie Giftun! Popłyń na ekskluzywną plażę Hula Hula.",
      tr: "Giftun Adası'nda tropikal esintiler! Gün boyu güneş ve deniz için Hula Hula plajına yelken açın.",
      zh: "吉夫顿岛的热带风情！航行到独特的草裙舞海滩，享受阳光和大海的一天。",
      uk: "Тропічна атмосфера на острові Гіфтун! Пливіть на ексклюзивний пляж Хула-Хула.",
      ro: "Atmosferă tropicală pe insula Giftun! Navigați către plaja exclusivistă Hula Hula.",
      cs: "Tropická atmosfera na ostrově Giftun! Vydejte se na exkluzivní pláž Hula Hula.",
      nl: "Tropische sfeer op Giftun Eiland! Vaar naar het exclusieve Hula Hula-strand.",
      sv: "Tropiska vibbar på ön Giftun! Segla till den exklusiva stranden Hula Hula.",
      pt: "Vibrações tropicais na Ilha Giftun! Navegue até a exclusiva praia Hula Hula.",
      ja: "ギフトゥン島のトロピカルな雰囲気！独占的なフラフラビーチへ航海し、太陽と海の一日を。",
      ko: "기프툰 섬의 열대 분위기! 독점적인 훌라훌라 해변으로 항해하여 태양과 바다를 즐겨보세요.",
      hu: "Trópusi hangulat a Giftun-szigeten! Hajózzon el az exkluzív Hula Hula strandra.",
      fi: "Trooppista tunnelmaa Giftun-saarella! Purjehti eksklusiiviselle Hula Hula -rannalle."
    },
    fullDesc: {
      en: "Set sail for the ultimate island escape! We take you to the exclusive Hula Hula Beach at Giftun Island, where tropical vibes meet crystal-clear waters. Enjoy a premium boat ride, two guided snorkeling stops at pristine reefs, and a warm, friendly atmosphere on board. Our staff is dedicated to making this your most relaxing day in Hurghada.",
      ar: "أبحر في الهروب النهائي للجزيرة! نأخذك إلى شاطئ هولا هولا الحصري في جزيرة جفتون، حيث تلتقي الأجواء الاستوائية بالمياه الكريستالية. استمتع برحلة بحرية فاخرة، ووقفتين للغطس بصحبة مرشدين في شعاب مرجانية خلابة، وأجواء دافئة وودية على متن السفينة. طاقمنا مكرس لجعل هذا اليوم الأكثر استرخاءً لك في الغردقة."
    },
    coords: [27.1895, 33.9312], // Hula Hula / Giftun
    video: "assets/video/hula.mp4"
  },
  {
    id: 3,
    slug: "dolphin-house",
    cat: "Sea",
    price: 25,
    rating: 4.9,
    reviewCount: 124,
    dur: "7 hours",
    img: "assets/images/dolphin-house.webp",
    gallery: ["assets/images/dolphin-house.webp", "assets/images/gallery-6.webp", "assets/images/gallery-7.webp"],
    popular: true,
    name: { 
      en: "Dolphin House Eco Adventure", ar: "دولفين هاوس", ru: "Дельфиний дом", de: "Dolphin House Eco Abenteuer",
      fr: "Aventure Éco Maison des Dauphins", it: "Dolphin House Eco Avventura", es: "Dolphin House Eco Aventura", pl: "Eco-Przygoda Dom Delfinów",
      tr: "Dolphin House Eko Macera", zh: "海豚之家生态探险", uk: "Будинок дельфінів", ro: "Aventura Eco Casa Delfinilor",
      cs: "Dolphin House Ekologické Dobrodružství", nl: "Dolphin House Eco Avontuur", sv: "Dolphin House Eco Adventure", pt: "Aventura Eco Dolphin House",
      ja: "ドルフィンハウス・エコアドベンチャー", ko: "돌핀 하우스 에코 어드벤처", hu: "Dolphin House Öko Kaland", fi: "Dolphin House -ekoseikkailu"
    },
    desc: {
      en: "Swim with wild dolphins! An eco-friendly adventure in natural habitats.",
      ar: "اسبح مع الدلافين البرية! مغامرة صديقة للبيئة في الموائل الطبيعية.",
      ru: "Плавание с дикими дельфинами! Экологичное приключение.",
      de: "Schwimmen Sie mit wilden Delfinen! Ein umweltfreundliches Abenteuer.",
      fr: "Nagez avec des dauphins sauvages ! Une aventure écologique.",
      it: "Nuota con i delfini selvatici! Un'avventura eco-friendly.",
      es: "¡Nada con delfines salvajes! Una aventura ecológica.",
      pl: "Pływaj z dzikimi delfinami! Ekologiczna przygoda.",
      tr: "Vahşi yunuslarla yüzün! Doğal ortamlarında çevre dostu bir macera.",
      zh: "与野生海豚共游！在自然栖息地进行的环保探险。",
      uk: "Плавання з дикими дельфінами! Екологічна пригода.",
      ro: "Înotați cu delfinii sălbatici! O aventură eco-friendly.",
      cs: "Plavte s divokými delfíny! Ekologické dobrodružství.",
      nl: "Zwem met wilde dolfijnen! Een milieuvriendelijk avontuur.",
      sv: "Simma med vilda delfiner! Ett miljövänligt äventyr.",
      pt: "Nade com golfinhos selvagens! Uma aventura ecológica.",
      ja: "野生のイルカと泳ごう！自然の生息地での環境に優しい冒険。",
      ko: "야생 돌고래와 함께 수영하세요! 자연 서식지에서의 친환경 어드벤처.",
      hu: "Ússzon vadon élő delfinekkel! Környezetbarát kaland.",
      fi: "Dolphin House -ekoseikkailu"
    },
    fullDesc: {
      en: "Meet the Red Sea's most playful residents! Our eco-conscious Dolphin House tour offers a high chance to swim alongside wild dolphins in their natural home. We prioritize safety and marine respect, providing professional equipment and expert guides. Includes two reef stops and a freshly prepared buffet lunch to recharge after your swim.",
      ar: "قابل سكان البحر الأحمر الأكثر مرحًا! توفر رحلة دولفين هاوس الصديقة للبيئة فرصة كبيرة للسباحة بجانب الدلافين البرية في موطنها الطبيعي. نحن نعطي الأولوية للسلامة واحترام البيئة البحرية، ونوفر معدات احترافية ومرشدين خبراء. تشمل وقفتين عند الشعاب المرجانية وغداء بوفيه مُعد طازجًا لاستعادة نشاطك بعد السباحة."
    },
    coords: [27.3615, 33.8827], // Dolphin House Reef
    video: "assets/video/dolphin.mp4"
  },
  {
    id: 4,
    slug: "parasailing",
    cat: "Adventure",
    price: 20,
    rating: 4.7,
    dur: "10-15 mins",
    img: "assets/images/parasailing.webp",
    gallery: ["assets/images/parasailing.webp", "assets/images/PARA (1).webp", "assets/images/PARA (2).webp", "assets/images/PARA (3).webp", "assets/images/PARA (4).webp", "assets/images/PARA (5).webp"],
    name: { 
      en: "Parasailing Adventure", ar: "باراسيلينج", ru: "Парасейлинг", de: "Parasegeln Abenteuer",
      fr: "Aventure Parachute Ascensionnel", it: "Paracadute Ascensionale", es: "Aventura Paracaidismo Acuático", pl: "Przygoda z Paraseilingiem",
      tr: "Deniz Paraşütü Macerası", zh: "帆伞运动探险", uk: "Парасейлінг", ro: "Aventura cu Parașuta",
      cs: "Parasailing Dobrodružství", nl: "Parasailing Avontuur", sv: "Parasegling Äventyr", pt: "Aventura de Parasailing",
      ja: "パラセーリング・アドベンチャー", ko: "패러세일링 어드벤처", hu: "Parasailing Kaland", fi: "Laskuvarjourheilu-seikkailu"
    },
    desc: {
      en: "Fly above the Red Sea! Breathtaking views and a thrilling adrenaline rush.",
      ar: "حلق فوق البحر الأحمر! مناظر خلابة واندفاع مثير للأدرينالين.",
      ru: "Полет над Красным морем! Захватывающие виды и адреналин.",
      de: "Fliegen Sie über das Rote Meer! Atemberaubende Ausblicke.",
      fr: "Volez au-dessus de la mer Rouge ! Une vue imprenable.",
      it: "Vola sopra il Mar Rosso! Viste mozzafiato.",
      es: "¡Vuela sobre el Mar Rojo! Vistas impresionantes.",
      pl: "Leć nad Morzem Czerwonym! Zapierające dech w piersiach widoki.",
      tr: "Kızıldeniz'in üzerinde uçun! Nefes kesen manzaralar ve heyecan dolu bir adrenalin patlaması.",
      zh: "在红海上空飞行！令人叹为观止的美景和激动人心的肾上腺素飙升。",
      uk: "Політ над Червоним морем! Захоплюючі види та адреналін.",
      ro: "Zboară deasupra Mării Roșii! Vedere uluitoare.",
      cs: "Leťte nad Rudým mořem! Dechberoucí výhledy.",
      nl: "Vlieg boven de Rode Zee! Adembenemende uitzichten.",
      sv: "Flyg över Röda havet! Hisnande vyer.",
      pt: "Voe acima do Mar Vermelho! Vistas deslumbrantes.",
      ja: "紅海の上を飛ぼう！息を呑むような景色とスリリングなアドレناリンラッシュ。",
      ko: "홍해 상공을 날아보세요! 숨막히는 전망과 짜릿한 아드레날린 분출.",
      hu: "Repüljön a Vörös-tenger felett! Lélegzetelállító kilátás.",
      fi: "Laskuvarjourheilu-seikkailu"
    },
    fullDesc: {
      en: "Get a bird's-eye view of paradise! Our certified instructors provide a safe, exhilarating parasailing experience, lifting you high above the sparkling Red Sea. Whether you fly solo or double, you'll enjoy breathtaking views of the coastline with top-tier safety gear and professional guidance every step of the way.",
      ar: "احصل على منظر طائر للجنة! يوفر مدربونا المعتمدون تجربة باراسيلينج آمنة ومبهجة، ترفعك عالياً فوق البحر الأحمر المتلألئ. سواء كنت تطير بمفردك أو مع مرافق، ستستمتع بمناظر خلابة للساحل مع معدات سلامة من الدرجة الأولى وتوجيه احترافي في كل خطوة على الطريق."
    },
    coords: [27.2252, 33.8427], // Hurghada Marina area
    video: "assets/video/Parasailing.mp4"
  },
  {
    id: 5,
    slug: "super-safari",
    cat: "Desert",
    price: 35,
    rating: 4.8,
    dur: "7 hours",
    img: "assets/images/super-safari.webp",
    gallery: ["assets/images/super-safari.webp", "assets/images/supsaf2.webp", "assets/images/gallery-8.webp"],
    popular: true,
    name: { 
      en: "Super Safari Saharan Trek", ar: "سوبر سفاري", ru: "Супер Сафари", de: "Super Safari Wüstentrip",
      fr: "Super Safari Désert", it: "Super Safari nel Deserto", es: "Super Safari por el Desierto", pl: "Super Safari na Pustyni",
      tr: "Süper Safari Sahra Yürüyüşü", zh: "超级萨哈拉长途跋涉", uk: "Супер Сафарі", ro: "Super Safari în Deșert",
      cs: "Super Safari Pouštní Výlet", nl: "Super Safari Woestijnreis", sv: "Super Safari Ökentur", pt: "Super Safari no Deserto",
      ja: "スーパーサファリ・サハラトレック", ko: "슈퍼 사파리 사하라 트레킹", hu: "Szuper Szafari Sivatagi Túra", fi: "Super Safari -aavikkoretki"
    },
    desc: {
      en: "The ultimate desert combo! Quad biking, camels, and a Bedouin dinner.",
      ar: "مزيج الصحراء النهائي! قيادة ربيعية وجمال وعشاء بدوي.",
      ru: "Полноценное сафари! Квадроциклы, верблюды и бедуинский ужин.",
      de: "Die ultimative Wüstentour! Quad bikes, Kamele und Beduinenessen.",
      fr: "Le pack désert ultime ! Quad, chameaux et dîner bédouin.",
      it: "Il combo definitivo nel deserto! Quad, cammelli e cena beduina.",
      es: "¡El combo definitivo en el deserto! Cuatrimotos, camellos y cena beduina.",
      pl: "Ostateczna pustynna przygoda! Quady, wielbłądy i kolacja u Beduinów.",
      tr: "Nihai çöl kombinasyonu! ATV sürüşü, develer ve bir Bedevi akşam yemeği.",
      zh: "终极沙漠组合！四轮摩托车、骆驼和贝都因晚餐。",
      uk: "Полноценное сафарі! Квадроцикли, верблюди та бедуїнська вечеря.",
      ro: "Combinatia ultimă în deșert! Quad, cămile și cină beduină.",
      cs: "Konečná pouštní kombinace! Čtyřkolky, velbloudi a beduínská večeře.",
      nl: "De ultieme woestijncombi! Quadrijden, kameleons en een bedoeïenendiner.",
      sv: "Den ultimata ökenkombon! Fyrhjulingar, kameler och beduinmiddag.",
      pt: "O combo definitivo no deserto! Moto-quatro, camelo e jantar beduíno.",
      ja: "究極のデザートコンボ！バギーとラクダ、そしてベドウィンの夕食。",
      ko: "궁극의 사막 콤보! 쿼드 바이크, 낙타, 그리고 베두인 저녁 식사.",
      hu: "A végső sivatagi kombó! Kvad, teve és beduin vacsora.",
      fi: "Super Safari -aavikkoretki"
    },
    fullDesc: {
      en: "Unfold the secrets of the Sahara! Our Super Safari is a full-throttle adventure featuring quad biking, camel rides, and a traditional spider-car trek. We finish the day with a heartfelt Bedouin welcome, an authentic dinner under the stars, and vibrant local cultural shows. Secure, organized, and truly unforgettable.",
      ar: "اكتشف أسرار الصحراء الكبرى! سوبر سفاري هو مغامرة كاملة تتميز بقيادة الدراجات الرباعية وركوب الجمال ورحلة سيارات العنكبوت التقليدية. ننهي اليوم بترحيب بدوي صادق وعشاء أصيل تحت النجوم وعروض ثقافية محلية نابضة بالحياة. آمن ومنظم ولا يُنسى حقًا."
    },
    coords: [27.2048, 33.6821], // Sahara Safari Camp
    video: "assets/video/quads.mp4"
  },
  {
    id: 6,
    slug: "horse-riding",
    cat: "Adventure",
    price: 15,
    rating: 4.6,
    dur: "1-2 hours",
    img: "assets/images/horse-riding.webp",
    gallery: ["assets/images/horse-riding.webp", "assets/images/trip1.webp", "assets/images/gallery-9.webp"],
    name: { 
      en: "Beach & Desert Horseback", ar: "ركوب الخيل", ru: "Верховая езда", de: "Reitausflug am Strand",
      fr: "Equitation Plage & Désert", it: "Equitazione Spiaggia e Deserto", es: "Equitación Playa y Desierto", pl: "Jazda Konna na Plaży",
      tr: "Sahil ve Çöl At Binme", zh: "海滩和沙漠骑马", uk: "Верхова їзда", ro: "Călărie pe Plajă și în Deșert",
      cs: "Jízda na Koni na Pláži", nl: "Paardrijden op het Strand", sv: "Ridning på Strand och i Öken", pt: "Andar a Cavalo na Praia",
      ja: "ビーチ＆デザート・ホースバック", ko: "해변 및 사막 승마", hu: "Lovaglás a Parton és a Sivatagban", fi: "Ratsastus rannalla ja aavikolla"
    },
    desc: {
      en: "Gallop through the desert or along the shore. A peaceful connection with nature.",
      ar: "انطلق عبر الصحراء أو على طول الشاطئ. تواصل سلمي مع الطبيعة.",
      ru: "Галоп по пустыне или вдоль берега. Связь с природой.",
      de: "Galoppieren Sie durch die Wüste oder am Ufer entlang.",
      fr: "Galopez à travers le désert ou le long de la rive.",
      it: "Galoppa attraverso il deserto o lungo la riva.",
      es: "Galopa por el desierto o por la orilla.",
      pl: "Galopuj przez pustynię lub wzdłuż brzegu.",
      tr: "Çölde veya sahil boyunca dörtnala gidin. Doğa ile huzurlu bir bağ.",
      zh: "在大漠中或沿着海岸飞驰. 与大自然的和平联系。",
      uk: "Галоп по пустелі або вздовж берега. Зв'язок з природою.",
      ro: "Galopați prin deșert sau de-a lungul țărmului.",
      cs: "Cválejte pouští nebo po pobřeží.",
      nl: "Galoppeer door de woestijn of langs de kust.",
      sv: "Galoppera genom öknen eller längs stranden.",
      pt: "Galope pelo deserto ou ao longo da costa.",
      ja: "ビーチ＆デザート・ホースバック. 砂漠や海岸を駆け抜けよう。",
      ko: "해변 및 사막 승마. 사막이나 해안을 따라 질주해 보세요.",
      hu: "Vágtázzon a sivatagban vagy a parton.",
      fi: "Ratsastus rannalla ja aavikolla"
    },
    fullDesc: {
      en: "Discover the beauty of the Red Sea on horseback! Whether you choose a sunset desert trail or a splash in the waves, our well-trained horses and professional handlers ensure a safe, magical ride for all skill levels. It’s a peaceful, friendly way to see the landscape from a new perspective.",
      ar: "اكتشف جمال البحر الأحمر على ظهر الخيل! سواء اخترت مسارًا صحراويًا عند غروب الشمس أو الاستمتاع بالأمواج، فإن خيولنا المدربة جيدًا ومعالجينا المحترفين يضمنون رحلة سحرية وآمنة لجميع مستويات المهارة. إنها طريقة هادئة وودودة لرؤية المناظر الطبيعية من منظور جديد."
    },
    video: "assets/video/horse.mp4"
  },
  {
    id: 7,
    slug: "camel-riding",
    cat: "Adventure",
    price: 15,
    rating: 4.5,
    dur: "1 hour",
    img: "assets/images/camel-riding.webp",
    gallery: ["assets/images/camel-riding.webp", "assets/images/trip3.webp", "assets/images/gallery-10.webp"],
    name: { 
      en: "Traditional Camel Trek", ar: "ركوب الجمال", ru: "Прогулка на верблюдах", de: "Traditioneller Kamelausritt",
      fr: "Randonnée Traditionnelle à Chameau", it: "Gita Tradizionale in Cammello", es: "Safari Tradicional en Camello", pl: "Tradycyjna Przejażdżka Wielbłądem",
      tr: "Geleneksel Deve Yürüyüşü", zh: "传统骆驼跋涉", uk: "Прогулянка на верблюдах", ro: "Plimbare Tradițională cu Cămila",
      cs: "Tradiční Výlet na Velbloudech", nl: "Traditionele Kameelrit", sv: "Traditionell Kameltur", pt: "Passeio Tradicional de Camelo",
      ja: "伝統的なラクダトレック", ko: "전통 낙타 트레킹", hu: "Hagyományos Tevegelés", fi: "Perinteinen kamelivaellus"
    },
    desc: {
      en: "A traditional Egyptian treasure! Explore the desert on a gentle camel trek.",
      ar: "كنز مصري تقليدي! استكشف الصحراء في رحلة لطيفة على الجمال.",
      ru: "Традиционное египетское сокровище! Прогулка на верблюдах.",
      de: "Ein traditioneller ägyptischer Schatz! Wüstentour auf dem Kamel.",
      fr: "Un trésor égyptien traditionnel ! Explorez le désert à dos de chameau.",
      it: "Un tesoro tradizionale egiziano! Esplora il deserto con un cammello.",
      es: "¡Un tesoro tradicional egipcio! Explora el deserto en camello.",
      pl: "Tradycyjny egipski skarb! Odkrywaj pustynię na wielbłądzie.",
      tr: "Geleneksel bir Mısır hazinesi! Nazik bir deve yürüyüşünde çölü keşfedin.",
      zh: "传统的埃及珍宝！在温柔的骆驼跋涉中探索沙漠。",
      uk: "Традиційний єгипетський скарб! Прогулянка на верблюдах.",
      ro: "O comoară tradițională egipteană! Explorează deșertul cu cămila.",
      cs: "Tradiční egyptský poklad! Prozkoumejte poušť na velbloudech.",
      nl: "Een traditionele Egyptische schat! Verken de woestijn op een kameel.",
      sv: "En traditionell egyptisk skatt! Utforska öknen på kamel.",
      pt: "Um tesouro egípcio tradicional! Explore o deserto num passeio de camelo.",
      ja: "伝統的なラクダトレック！穏やかなラクダトレックで砂漠を探索。",
      ko: "이집트의 전통 보물! 완만한 낙타 트레킹으로 사막을 탐험하세요.",
      hu: "Hagyományos egyiptomi kincs! Fedezze fel a sivatagot teveháton.",
      fi: "Perinteinen kamelivaellus"
    },
    fullDesc: {
      en: "Experience the spirit of Egypt! Join us for a gentle camel trek through the golden dunes of Hurghada. Our friendly guides and well-cared-for camels make this a perfect, relaxing photo opportunity and a genuine cultural connection for travelers of all ages.",
      ar: "جرب روح مصر! انضم إلينا في رحلة لطيفة بالجمال عبر الكثبان الذهبية في الغردقة. مرشدونا الودودون والجمال التي تحظى برعاية جيدة تجعل من هذه فرصة مثالية ومريحة لالتقاط الصور وتواصلًا ثقافيًا حقيقيًا للمسافرين من جميع الأعمار."
    },
    video: "assets/video/camel.mp4"
  },
  {
    id: 8,
    slug: "pyramids",
    cat: "Cairo",
    price: 90,
    rating: 4.9,
    reviewCount: 124,
    dur: "16-18 hours",
    img: "assets/images/pyramids.webp",
    gallery: ["assets/images/pyramids.webp", "assets/images/pyramid1.webp", "assets/images/pyramid2.webp"],
    popular: true,
    name: { 
      en: "Giza Pyramids & Cairo Discovery", ar: "الأهرامات والقاهرة", ru: "Пирамиды Гизы и Каир", de: "Gizeh Pyramiden & Kairo Tour",
      fr: "Pyramides de Gizeh & Le Caire", it: "Piramidi di Giza e Il Cairo", es: "Pirámides de Giza y El Cairo", pl: "Piramidy w Gizie i Kair",
      tr: "Giza Piramitleri ve Kahire Keşfi", zh: "吉萨金字塔和开罗发现", uk: "Піраміди Гізи та Каїр", ro: "Piramidele din Giza și Cairo",
      cs: "Pyramidy v Gíze a Káhira", nl: "Giza Piramides & Caïro", sv: "Giza Pyramider & Kairo", pt: "Pirâmides de Gizé e Cairo",
      ja: "ギザのピラミッドとカイロ発見", ko: "기자 피라미드와 카이로 발견", hu: "Gízai Piramisok és Kairó", fi: "Gizan pyramidit ja Kairo"
    },
    desc: {
      en: "Journey to the Ancient World! Visit the Great Pyramids, Sphinx, and the Museum.",
      ar: "رحلة إلى العالم القديم! زر الأهرامات العظيمة وأبو الهول والمتحف.",
      ru: "Путешествие в Древний мир! Великие пирамиды, Сфинкс и музей.",
      de: "Reise in die antike Welt! Große Pyramiden, Sphinx und Museum.",
      fr: "Voyage dans le monde antique ! Pyramides, Sphinx et Musée.",
      it: "Viaggio nel mondo antico! Grandi Piramidi, Sfinge e Museo.",
      es: "¡Viaje al Mundo Antiguo! Grandes Pirámides, Esfinge y Museo.",
      pl: "Podróż do starożytnego świata! Piramidy, Sfinks i Muzeum.",
      tr: "Antik Dünya'ya Yolculuk! Büyük Piramitleri, Sfenks'i ve Müze'yi ziyaret edin.",
      zh: "古世界之旅！参观大金字塔、狮身人面像和博物馆。",
      uk: "Піраміди Гізи та Каїр. Подорож до Стародавнього світу!",
      ro: "Călătorie în lumea antică! Piramidele, Sfinxul și Muzeul.",
      cs: "Cesta do starověkého světa! Pyramidy, Sfinga a muzeum.",
      nl: "Reis naar de oude world! Piramides, Sfinx en Museum.",
      sv: "Resa till den forntida världen. Pyramiderna, Sfinxen och Museet.",
      pt: "Viagem ao Mundo Antigo! Grandes Pirâmides, Esfinge e Museu.",
      ja: "古代の世界への旅！大ピラミッド、スフィンクス、博物館を訪問。",
      ko: "고대 세계로의 여행! 피라미드, 스핑크스, 박물관을 방문하세요.",
      hu: "Utazás az ókori világba! Piramisok, Szfinx és Múzeum.",
      fi: "Matka muinaiseen maailmaan! Pyramidit, Sfinksi ja Museo."
    },
    fullDesc: {
      en: "Walk through history on this premium Cairo day trip. Our expert Egyptologists lead you through the Great Pyramids of Giza and the Sphinx with deep knowledge and care. We take the stress out of travel with air-conditioned transport and a high-quality lunch, letting you focus on the majesty of the ancient world.",
      ar: "امشِ عبر التاريخ في هذه الرحلة اليومية المميزة إلى القاهرة. يقودك علماء المصريات الخبراء لدينا عبر أهرامات الجيزة الكبرى وأبو الهول بمعرفة وعناية عميقة. نحن نزيل ضغوط السفر من خلال وسائل النقل المكيفة والغداء عالي الجودة، مما يتيح لك التركيز على عظمة العالم القديم."
    },
    coords: [29.9792, 31.1342], // Giza Pyramids
    video: "assets/video/pyramids.mp4"
  },
  {
    id: 9,
    slug: "luxor",
    cat: "Luxor",
    price: 70,
    rating: 4.9,
    reviewCount: 124,
    dur: "16 hours",
    img: "assets/images/luxor.webp",
    gallery: ["assets/images/luxor.webp", "assets/images/hero (2).webp"],
    popular: true,
    name: { 
      en: "Luxor Kings & Temples", ar: "الأقصر والملوك", ru: "Луксор: Короли и Храмы", de: "Luxor Könige & Tempel Tour",
      fr: "Louxor Rois & Temples", it: "Luxor Re e Templi", es: "Luxor Reyes y Templos", pl: "Luksor Królowie i Świątynie",
      tr: "Luxor Krallar ve Tapınaklar", zh: "卢克索国王和神庙", uk: "Лукسور: Королі та Храми", ro: "Luxor Regi și Temple",
      cs: "Luxor Králové a Chrámy", nl: "Luxor Koningen & Tempels", sv: "Luxor Kungar & Tempel", pt: "Luxor Reis e Templos",
      ja: "ルクソール・キングス＆テンプル", ko: "룩소르 왕과 사원", hu: "Luxor Királyok és Templomok", fi: "Luxorin kuninkaat ja temppelit"
    },
    desc: {
      en: "Discover the world's largest open-air museum. Temples, tombs, and Nile views.",
      ar: "اكتشف أكبر متحف مفتوح في العالم. معابد ومقابر ومناظر النيل.",
      ru: "Крупнейший музей под открытым небом. Храмы, гробницы и Нил.",
      de: "Größtes Open-Air-Museum der Welt. Tempel, Gräber und Nilblick.",
      fr: "Le plus grand musée en plein air au monde. Temples, tombes et Nil.",
      it: "Il più grande museo all'aperto del mondo. Templi, tombe e il Nilo.",
      es: "El museo al aire libre más grande del mundo. Templos, tumbas y el Nilo.",
      pl: "Największe muzeum na wolnym powietrzu. Świątynie, grobowce i Nil.",
      tr: "Dünyanın en büyük açık hava müzesini keşfedin. Tapınaklar, mezarlar ve Nil manzaraları.",
      zh: "探索世界上最大的露天博物馆。寺庙、陵墓和尼罗河美景。",
      uk: "Луксор: Королі та Храми. Найбільший музей просто неба.",
      ro: "Cel mai mare muzeu în aer liber din lume. Temple, morminte și Nilul.",
      cs: "Největší muzeum pod širým nebem na světě. Chrámy, hrobky a Nil.",
      nl: "Grootste openluchtmuseum ter wereld. Tempels, graven en de Nijl.",
      sv: "Världens största utomhusmuseum. Tempel, gravar och Nilvyer.",
      pt: "O maior muzeum ao ar livre do mundo. Templos, túmulos e o Nilo.",
      ja: "世界最大の野外博物館を探索. 神殿、墓、そしてナイル川の景色。",
      ko: "세계 최대의 노천 박물관을 탐험하세요. 사원, 무덤, 나일강 전망.",
      hu: "A világ legnagyobb szabadtéri múzeuma. Templomok, sírok és Nílus.",
      fi: "Maailman suurin ulkoilmamuseo. Temppelit, haudat ja Niilin näkymät."
    },
    fullDesc: {
      en: "Step back in time to the capital of the Pharaohs. From the soaring pillars of Karnak to the mysterious Valley of the Kings, our Luxor tour is a masterclass in history. We provide a comfortable, organized journey with top-tier guides and a premium buffet overlooking the Nile. A bucket-list experience handled with care.",
      ar: "عد بالزمن إلى عاصمة الفراعنة. من أعمدة الكرنك الشاهقة إلى وادي الملوك الغامض، فإن جولتنا في الأقصر هي درس متقدم في التاريخ. نحن نوفر رحلة مريحة ومنظمة مع مرشدين من الدرجة الأولى وبوفيه فاخر يطل على النيل. تجربة لا بد منها يتم التعامل معها بعناية."
    },
    coords: [25.7402, 32.6014], // Luxor Karnak
    video: "assets/video/luxor.mp4"
  },
  {
    id: 10,
    slug: "mini-safari",
    cat: "Desert",
    price: 25,
    rating: 4.7,
    dur: "3 hours",
    img: "assets/images/mini-safari.webp",
    gallery: ["assets/images/mini-safari.webp", "assets/images/trip2.webp"],
    name: { 
      en: "Mini Desert Quad Trek", ar: "ميني سفاري", ru: "Мини-сафари", de: "Mini Quad Wüstentour",
      fr: "Mini Safari Quad", it: "Mini Safari in Quad", es: "Mini Safari en Cuatrimoto", pl: "Mini Safari na Quadach",
      tr: "Mini Çöl ATV Yürüyüşü", zh: "迷拟沙漠四轮摩托车长途跋涉", uk: "Міні-сафарі", ro: "Mini Safari cu Quad",
      cs: "Mini Pouštní Výlet na Čtyřkolkách", nl: "Mini Woestijn Quadrit", sv: "Mini Öken Quad Trek", pt: "Mini Safári de Moto-quatro",
      ja: "ミニデザート・バギートレック", ko: "미니 사막 쿼드 트레킹", hu: "Mini Sivatagi Kvad Túra", fi: "Mini-mönkijäretki"
    },
    desc: {
      en: "High-speed desert fun! A quick and thrilling quad bike trek across the dunes.",
      ar: "متعة صحراوية عالية السرعة! رحلة سريعة ومثيرة بالدراجات الرباعية عبر الكثبان الرملية.",
      ru: "Скоростное веселье в пустыне! Быстрая поездка на квадроциклах.",
      de: "Schneller Wüstenspaß! Eine kurze Quad-Tour durch die Dünen.",
      fr: "Fun à grande vitesse ! Une excursion en quad rapide et excitante.",
      it: "Divertimento ad alta velocità! Una gita in quad veloce ed emozionante.",
      es: "¡Diversión a alta velocidad! Un viaje rápido y emocionante en cuatrimoto.",
      pl: "Szybka zabawa na pustyni! Krótka i ekscytująca wyprawa quadem.",
      tr: "Yüksek hızlı çöl eğlencesi! Kumullar boyunca hızlı ve heyecan verici bir ATV yürüyüşü.",
      zh: "高速沙漠乐趣！快速而激动的四轮摩托车越过沙丘。",
      uk: "Міні-сафарі. Швидкісні розваги в пустелі!",
      ro: "Distracție de mare viteză! O excursie rapidă și palpitantă cu quadul.",
      cs: "Vysokorychlostní pouštní zábava! Rychlý výlet na čtyřkolkách.",
      nl: "Hogesnelheid woestijnplezier! Een snelle quadrit over de duinen.",
      sv: "Höghastighetsökenkul! En snabb fyrhjulingstur över dynerna.",
      pt: "Diversão em alta velocidade! Um passeio rápido e emocionante de moto-quatro.",
      ja: "ミニデザート・バギートレック. 砂丘を越える素早くスリリングなバギートレック。",
      ko: "고속 사막의 즐거움! 사구 전역에 걸친 빠르고 스릴 넘치는 쿼드 바이크 트레킹.",
      hu: "Gyors sivatagi móka! Gyors kvad túra a dűnéken.",
      fi: "Mini-mönkijäretki"
    },
    fullDesc: {
      en: "Big thrills in a shorter time! Perfect for those wanting a quick adrenaline hit, our Mini Safari takes you on a guided quad bike trek through the rugged Hurghada desert. With safety briefings and expert lead-riders, it’s a fast, fun, and secure way to feel the desert wind.",
      ar: "إثارة كبيرة في وقت قصير! مثالية لأولئك الذين يريدون جرعة سريعة من الأدرينالين، ميني سفاري تأخذك في رحلة موجهة بالدراجات الرباعية عبر صحراء الغردقة الوعرة. مع إحاطات السلامة والدراجين الخبراء، إنها طريقة سريعة وممتعة وآمنة للشعور برياح الصحراء."
    },
    video: "assets/video/mini-safari.mp4"
  },
  {
    id: 11,
    slug: "diving",
    cat: "Sea",
    price: 35,
    rating: 4.8,
    dur: "7 hours",
    img: "assets/images/diving.webp",
    gallery: ["assets/images/diving.webp", "assets/images/D.webp", "assets/images/D1.webp", "assets/images/D2.webp"],
    popular: true,
    name: { 
      en: "Red Sea Discovery Dive", ar: "غوص استكشافي", ru: "Дайвинг в Красном море", de: "Rotes Meer Tauchausflug",
      fr: "Plongée Découverte Mer Rouge", it: "Immersione Scoperta Mar Rosso", es: "Buceo de Descubrimiento Mar Rojo", pl: "Nurkowanie Odkrywcze",
      tr: "Kızıldeniz Keşif Dalışı", zh: "红海发现潜水", uk: "Дайвінг у Червоному морі", ro: "Scufundări în Marea Roșie",
      cs: "Potápění v Rudém moři", nl: "Rode Zee Ontdekkingsduik", sv: "Upptäcktsdyk i Röda havet", pt: "Mergulho de Descoberta no Mar Vermelho",
      ja: "紅海・ディスカバリー・ダイブ", ko: "홍해 디스커버리 다이브", hu: "Vörös-tengeri Felfedező Merülés", fi: "Punaisenmeren löytösukellus"
    },
    desc: {
      en: "Dive into the deep blue! Explore the hidden treasures of the world's best reefs.",
      ar: "غص في أعماق البحار! استكشف الكنوز المخفية في أفضل الشعاب المرجانية في العالم.",
      ru: "Погрузитесь в бездну! Тайные сокровища лучших рифов мира.",
      de: "Tauchen Sie ein ins tiefe Blau! Erkunden Sie verborgene Schätze der Riffe.",
      fr: "Plongez dans le bleu profond ! Explorez les trésors cachés des récifs.",
      it: "Immergiti nel blu profondo! Esplora i tesori nascosti.",
      es: "¡Bucea en el azul profundo! Explora tesoros escondidos.",
      pl: "Zanurz się في głębię! Odkrywaj ukryte skarby najlepszych raf świata.",
      tr: "Derin maviliklere dalın! Dünyanın en iyi resiflerinin gizli hazinelerini keşfedin.",
      zh: "潜入深蓝！探索世界上最好的珊瑚礁的隐秘宝藏。",
      uk: "Дайвінг у Червоному морі. Таємні скаربي найкращих рифів світу.",
      ro: "Scufundă-te în albastrul profund! Explorează comorile ascunse ale recifelor.",
      cs: "Ponořte se do hluboké modři! Prozkoumejte skryté poklady útesů.",
      nl: "Duik in het diepe blauw! Verken de verborgen schatten van de riffen.",
      sv: "Dyk ner i det djupblå! Utforska världens bästa rev.",
      pt: "Mergulho de Descoberta no Mar Vermelho! Explore os tesouros escondidos dos recifes.",
      ja: "紅海・ディスカバリー・ダイブ. 珊瑚礁の隠された宝物を探索。",
      ko: "깊은 파란색으로 다이빙하세요! 세계 최고의 산호초에서 숨겨진 보물을 탐험하세요.",
      hu: "Vörös-tengeri Felfedező Merülés. Fedezze fel a kincseket.",
      fi: "Punaisenmeren löytösukellus"
    },
    fullDesc: {
      en: "Discover the silent world beneath the waves. Our PADI-certified team offers a safe, welcoming introduction to scuba diving at Hurghada's finest reefs. We provide all premium equipment and 1-on-1 guidance, ensuring a calm and breathtaking first dive into the vibrant Red Sea coral gardens.",
      ar: "اكتشف العالم الصامت تحت الأمواج. يقدم فريقنا المعتمد من PADI مقدمة آمنة وودودة للغوص في أفضل الشعاب المرجانية في الغردقة. نحن نوفر جميع المعدات الفاخرة وتوجيهًا شخصيًا، مما يضمن أول غطسة هادئة ومذهلة في حدائق المرجان النابضة بالحياة في البحر الأحمر."
    },
    coords: [27.2405, 33.8687], // Diving Site
    video: "assets/video/Scuba.mp4"
  },
  {
    id: 12,
    slug: "spa",
    cat: "Relax",
    price: 30,
    rating: 4.8,
    dur: "2-3 hours",
    img: "assets/images/spa.webp",
    gallery: ["assets/images/spa.webp", "assets/images/spa1.webp"],
    name: { 
      en: "Ottoman Spa Sanctuary", ar: "السبا والحمام التركي", ru: "Турецкий хаммам и спа", de: "Hammam & Spa Entspannung",
      fr: "Sanctuaire Spa Ottoman", it: "Santuario Spa Ottomano", es: "Santuario Spa Otomano", pl: "Tureckie Spa i Hammam",
      tr: "Osmanlı Spa Mabedi", zh: "奥斯曼水疗避难所", uk: "Турецький хамам та спа", ro: "Sanctuar Spa Otoman",
      cs: "Turecké Lázně a Spa", nl: "Ottomaanse Spa Heiligdom", sv: "Ottomanskt Spa", pt: "Santuário Spa Otomano",
      ja: "オットマン・スパ・サンクチュアリ", ko: "오스만 스파 생츄어리", hu: "Oszmán Spa Szentély", fi: "Osmanien kylpylä"
    },
    desc: {
      en: "Pure relaxation. Enjoy a traditional Turkish bath and professional massage.",
      ar: "استرخاء خالص. استمتع بحمام تركي تقليدي ومساج احترافي.",
      ru: "Полное расслабление. Хаммам и профессиональный массаж.",
      de: "Reine Entspannung. Genießen Sie ein türkisches Bad und Massage.",
      fr: "Relaxation pure. Profitez d'un bain turc traditionnel et d'un massage.",
      it: "Puro relax. Goditi un bagno turco tradizionale e un massaggio.",
      es: "¡Relajación pura! Disfruta de un baño turco tradicional y un masaje.",
      pl: "Czysty relaks. Ciesz się tradycyjną łaźnią turecką i masażem.",
      tr: "Saf rahatlama. Geleneksel bir Türk hamamı ve profesyonel masajın keyfini çıkarın.",
      zh: "纯粹的放松。享受传统的土耳其浴和专业的按摩。",
      uk: "Турецький хамам та спа. Повне розслаблення!",
      ro: "Relaxare pură. Bucurați-vă de o baie turcească tradițională și masaj.",
      cs: "Čistá relaxace. Užijte si tradiční turecké lázně a masáž.",
      nl: "Pure ontspanning. Geniet van een traditioneel Turks bad en massage.",
      sv: "Ren avkoppling. Njut av ett traditionellt turkiskt bad och massage.",
      pt: "Relaxamento puro. Desfrute de um banho turco tradicional e massagem.",
      ja: "オットマン・スパ・サンクチュアリ. 伝統的なトルコ風呂とマッサージを堪能。",
      ko: "순수한 휴식. 전통 터키식 목욕과 전문 마사지를 즐겨보세요.",
      hu: "Tiszta relaxáció. Élvezze a hagyományos törökfürdőt és masszást.",
      fi: "Osmanien kylpylä"
    },
    fullDesc: {
      en: "Melt away your stress in our tranquil spa sanctuary. Experience the ancient luxury of a Turkish bath followed by a deep-tissue or relaxing massage from our professional therapists. It's the ultimate trustworthy way to rejuvenate your body and mind after your Hurghada adventures.",
      ar: "تخلص من توترك في ملاذ السبا الهادئ لدينا. جرب الفخامة القديمة للحمام التركي متبوعة بنسيج عميق أو تدليك مريح من المعالجين المحترفين لدينا. إنها الطريقة المثالية الموثوقة لتجديد جسدك وعقلك بعد مغامراتك في الغردقة."
    },
    video: "assets/video/spa.mp4"
  },
  {
    id: 13,
    slug: "nefertari",
    cat: "Sea",
    price: 95,
    rating: 5.0,
    dur: "4 hours",
    img: "assets/images/nefertari.webp",
    gallery: ["assets/images/nefertari.webp", "assets/images/nef1.webp", "assets/images/nef2.webp", "assets/images/nef3.webp", "assets/images/nef4.webp", "assets/images/nef5.webp"],
    popular: true,
    name: { 
      en: "Nefertari Luxury Submarine", ar: "نيفرتاري الغواصة الملكية", ru: "Нефертари: Роскошная подлодка", de: "Nefertari Luxus U-Boot",
      fr: "Submersible de Luxe Nefertari", it: "Nefertari Sottomarino di Lusso", es: "Nefertari Submarino de Lujo", pl: "Luksusowa Łódź Podwodna Nefertari",
      tr: "Nefertari Lüks Denizaltı", zh: "纳芙塔莉豪华潜艇", uk: "Нефертарі: Розкішний підводний човен", ro: "Submarinul de Lux Nefertari",
      cs: "Nefertari Luxusní Ponorka", nl: "Nefertari Luxe Duikboot", sv: "Nefertari Lyxubåt", pt: "Submarino de Luxo Nefertari",
      ja: "ネフェルタリ・ラグジュアリー・サブマリン", ko: "네페르타리 럭셔리 잠수함", hu: "Nefertari Luxus Tengeralattjáró", fi: "Nefertari-luksussukellusvene"
    },
    desc: {
      en: "Luxury submarine voyage! See the reef in style on this premium boat.",
      ar: "رحلة غواصة فاخرة! شاهد الشعاب المرجانية بأناقة على هذا القارب المميز.",
      ru: "Роскошное подводное путешествие! Посмотрите риф стильно.",
      de: "Luxus-U-Boot-Reise! Erleben Sie die Riffe mit Stil.",
      fr: "Voyage en sous-marin de luxe ! Découvrez le récif avec style.",
      it: "Viaggio in sottomarino di lusso! Guarda la barriera corallina con stile.",
      es: "¡Viaje submarino de lujo! Descubre el arrecife con estilo.",
      pl: "Luksusowy rejs łodzią podwodną! Zobacz rafę في wielkim stylu.",
      tr: "Lüks denizaltı yolculuğu! Bu birinci sınıf teknede resifleri şık bir şekilde görün.",
      zh: "豪华潜艇航行！在这艘高级船上时尚地欣赏珊瑚礁。",
      uk: "Нефертарі. Роскошная подлодка. Посмотрите риф стильно.",
      ro: "Călătorie de lux cu submarinul! Vizitează reciful cu stil.",
      cs: "Luxusní plavba ponorkou! Prohlédněte si útes stylově.",
      nl: "Nefertari Luxe Duikboot! Bekijk het rif in stijl op deze premium boot.",
      sv: "Lyxig ubåtsresa! Se revet med stil på denna premiumbåt.",
      pt: "Viagem de luxo em submarino! Veja o recife com estilo neste barco premium.",
      ja: "ネフェルタリ・ラグジュアリー・サブマリン. サンゴ礁を鑑賞。",
      ko: "럭셔리 잠수함 항해! 이 프리미엄 보트에서 멋진 산호초를 감상하세요.",
      hu: "Luxus tengeralattjáró utazás! Nézze meg a zátonyt stílusosan.",
      fi: "Nefertari-luksussukellusvene"
    },
    fullDesc: {
      en: "The Red Sea’s most luxurious maritime experience. The Nefertari is a stunning submarine-style vessel that lets you explore underwater wonders from a premium lounge. We offer five-star service, exquisite seafood dining, and a sophisticated atmosphere for those seeking the very best.",
      ar: "أفخم تجربة بحرية في البحر الأحمر. نيفرتاري هي سفينة مذهلة على طراز الغواصة تتيح لك استكشاف عجائب تحت الماء من صالة فاخرة. نحن نقدم خدمة خمس نجوم وتناول طعام بحري رائع وأجواء متطورة لأولئك الذين يبحثون عن الأفضل."
    },
    coords: [27.2281, 33.8443], // Submarine area
    video: "assets/video/Reef.mp4"
  },
  {
    id: 14,
    slug: "speed-boat",
    cat: "Sea",
    price: 150,
    rating: 5.0,
    dur: "2-4 hours",
    img: "assets/images/speed-boat.webp",
    gallery: ["assets/images/speed-boat.webp", "assets/images/speed1.webp", "assets/images/speed2.webp", "assets/images/speed3.webp", "assets/images/speed4.webp"],
    name: { 
      en: "Private Speed Boat Charter", ar: "لانش سريع خاص", ru: "Частный скоростной катер", de: "Privates Speedboot Charter",
      fr: "Location de Speed Boat Privé", it: "Noleggio Motoscafo Privato", es: "Alquiler de Lancha Rápida Privada", pl: "Prywatna Łódź Motorowa",
      tr: "Özel Sürat Teknesi Kiralama", zh: "私人快艇包租", uk: "Приватний швидкісний катер", ro: "Închiriere Barcă Rapidă Privată",
      cs: "Soukromý Rychlý Člun", nl: "Privé Speedboot Charter", sv: "Privat Speedbåt", pt: "Aluguer de Lancha Rápida Privada",
      ja: "プライベート・スピードボート・チャーター", ko: "프라이빗 스피드 보트 차터", hu: "Privát Gyorshajó Bérlés", fi: "Yksityinen pikavenevuokraus"
    },
    desc: {
      en: "Your private escape. Custom itineraries and absolute freedom at sea.",
      ar: "هروبك الخاص. مسارات مخصصة وحرية مطلقة في البحر.",
      ru: "Твой личный побег. Индивидуальные маршруты и полная свобода.",
      de: "Ihre private Flucht. Individuelle Reiserouten und Freiheit.",
      fr: "Votre évasion privée. Itinéraires personnalisés et liberté totale.",
      it: "La tua fuga privata. Itinerari personalizzati e libertà assoluta.",
      es: "Tu escape privado. Itinerarios personalizados y libertad absoluta.",
      pl: "Twoja prywatna ucieczka. Indywidualne trasy i pełna wolność.",
      tr: "Özel kaçışınız. Denizde özel güzergahlar ve mutlak özgürlük.",
      zh: "您的私人逃生。自定义行程和海上的绝对自由。",
      uk: "Приватний швидкісний катер. Твій особистий втеча!",
      ro: "Evadarea ta privată. Itinerarii personalizate și libertate absolută.",
      cs: "Váš soukromý útěk. Vlastní trasy a absolutní svoboda.",
      nl: "Uw privé-ontsnapping. Aangepaste routes en absolute vrijheid.",
      sv: "Din privata eskapad. Anpassade resplaner och absolut frihet.",
      pt: "A sua escapadela privada. Itinerários personalizados e liberdade absoluta.",
      ja: "プライベート・スピードボート・チャーター. 旅程と自由。",
      ko: "당신만의 프라이빗한 탈출. 맞춤형 여행 일정과 바다에서의 절대적인 자유.",
      hu: "Az Ön privát menekülése. Egyedi útvonalak és abszolút szabadság.",
      fi: "Yksityinen pikavenevuokraus"
    },
    fullDesc: {
      en: "Command your own adventure! Our private speed boat charters offer absolute freedom to visit any island or reef on your own schedule. With a professional captain at your service, you'll enjoy a secure, high-speed, and exclusive journey tailored exactly to your family’s wishes.",
      ar: "تحكم في مغامرتك الخاصة! توفر رحلات القوارب السريعة الخاصة لدينا حرية مطلقة لزيارة أي جزيرة أو شعاب مرجانية وفقًا لجدولك الخاص. مع قبطان محترف في خدمتك، ستستمتع برحلة آمنة وعالية السرعة وحصرية مصممة خصيصًا لرغبات عائلتك."
    },
    video: "assets/video/Speed-Boat.mp4"
  },
  {
    id: 15,
    slug: "medical-care",
    cat: "Services",
    price: 0,
    rating: 5.0,
    dur: "24/7",
    img: "assets/images/medical-care.webp",
    gallery: ["assets/images/medical-care.webp", "assets/images/med1.webp"],
    popular: true,
    name: { 
      en: "Our Medical Care", ar: "رعايتنا الطبية", ru: "Наша медицинская помощь", de: "Unsere medizinische Versorgung",
      fr: "Nos Soins Médicaux", it: "Nostra Assistenza Medica", es: "Nuestra Atención Médica", pl: "Nasza Opieka Medyczna",
      tr: "Tıbbi Bakımımız", zh: "我们的医疗护理", uk: "Наша медична допомога", ro: "Îngrijirea Noastră Medicală",
      cs: "Naše Zdravotní Péče", nl: "Onze Medische Zorg", sv: "Vår Medicinska Vård", pt: "Nossa Assistência Médica",
      ja: "私たちの医療ケア", ko: "우리의 의료 케어", hu: "Orvosi Ellátásunk", fi: "Meidän sairaanhoitomme"
    },
    desc: {
      en: "Inclusive medical support. 24/7 assistance for our guests at our private center.",
      ar: "دعم طبي شامل. مساعدة على مدار الساعة لضيوفنا في مركزنا الخاص.",
      ru: "Комплексная медицинская поддержка. Круглосуточная помощь гостям.",
      de: "Inklusive medizinische Unterstützung. 24/7 Assistenz für unsere Gäste.",
      fr: "Soutien médical inclus. Assistance 24h/24 pour nos clients.",
      it: "Supporto medico inclusivo. Assistenza 24 ore su 24 per i nostri ospiti.",
      es: "Apoyo médico incluido. Asistencia 24/7 para nuestros huéspedes.",
      pl: "Kompleksowa opieka medyczna. Pomoc 24/7 dla naszych gości.",
      tr: "Kapsamlı tıbbi destek. Özel merkezimizde misafirlerimize 7/24 asistanlık.",
      zh: "全天候包容性医疗支持，为我们的客人提供私人中心服务。",
      uk: "Наша медична допомога. Цілодобова допомога!",
      ro: "Suport medical inclus. Asistență non-stop pentru oaspeții noștri.",
      cs: "Včetně lékařské podpory. Nonstop asistence pro naše hosty.",
      nl: "Inclusieve medische ondersteuning. 24/7 assistentie voor onze gasten.",
      sv: "Inkluderande medicinskt stöd. Dygnet-runt-assistans för våra gäster.",
      pt: "Suporte médico inclusivo. Assistência 24/7 para os nossos hóspedes.",
      ja: "私たちの医療ケア. 24時間対応。",
      ko: "포괄적인 의료 지원. 전용 센터에서 게스트를 위한 연중무휴 지원.",
      hu: "Átfogó orvosi támogatás. Nonstop segítségnyújtás vendégeinknek.",
      fi: "Meidän sairaanhoitomme"
    },
    fullDesc: {
      en: "Your well-being is our absolute priority. 'Our Medical Care' provides round-the-clock professional medical assistance for Aquaway guests. From minor health issues to emergency coordination, our private medical center ensures you are never alone. We coordinate directly with your insurance to ensure full coverage so you can focus entirely on your recovery and vacation.",
      ar: "رفاهيتك هي أولويتنا المطلقة. توفر 'رعايتنا الطبية' مساعدة طبية احترافية على مدار الساعة لضيوف أكواواي. من المشاكل الصحية البسيطة إلى تنسيق الطوارئ، يضمن مركزنا الطبي الخاص أنك لست بمفردك أبدًا. نحن ننسق مباشرة مع تأمينك لضمان التغطية الكاملة حتى تقدر التركيز تمامًا على تعافيك وإجازتك."
    },
    video: "assets/video/medical.mp4"
  },
  {
    id: 16,
    slug: "city-tour",
    cat: "Hurghada",
    price: 30,
    rating: 4.8,
    dur: "5 hours",
    img: "assets/images/city1.webp",
    gallery: ["assets/images/city1.webp", "assets/images/city2.webp", "assets/images/city3.webp", "assets/images/city4.webp"],
    name: { 
      en: "Hurghada City Tour", ar: "جولة مدينة الغردقة", ru: "Обзорная экскурсия по Хургаде", de: "Hurghada Stadtrundfahrt",
      fr: "Tour de ville de Hurghada", it: "Tour della città di Hurghada", es: "Tour por la ciudad de Hurghada", pl: "Wycieczka po Hurghadzie",
      tr: "Hurgada Şehir Turu", zh: "赫尔格达城市观光", uk: "Оглядова екскурсія по Хургаді", ro: "Tur de oraș Hurghada",
      cs: "Prohlídka města Hurghada", nl: "Hurghada Stadstour", sv: "Hurghada Stadstur", pt: "Tour pela Cidade de Hurghada",
      ja: "フルガダ・シティ・ツアー", ko: "후르가다 시티 투어", hu: "Hurghada Városnézés", fi: "Hurghadan kaupunkikierros"
    },
    desc: {
      en: "Explore the real Hurghada! Visit the main mosque, church, marina, and local markets.",
      ar: "استكشف الغردقة الحقيقية! زر المسجد الرئيسي والكنيسة والمارينا والأسواق المحلية.",
      ru: "Узнайте настоящую Хургаду! Мечети, церкви, Марина и рынки.",
      de: "Entdecken Sie das echte Hurghada! Moschee, Kirche, Hafen und Märkte.",
      fr: "Explorez le vrai Hurghada ! Mosquée, église, marina et marchés.",
      it: "Esplora la vera Hurghada! Visita la moschea, la chiesa, il porto e i mercati.",
      es: "¡Explora la verdadera Hurghada! Visita la mezquita, la iglesia y el puerto.",
      pl: "Odkryj prawdziwą Hurghadę! Meczet, kościół, marina i lokalne targi.",
      tr: "Gerçek Hurgada'yı keşfedin! Ana camiyi, kiliseyi, marinayı ve yerel pazarları ziyaret edin.",
      zh: "探索真实的赫尔格达！参观主要的清真寺、教堂、码头和当地市场。",
      uk: "Обзорная экскурсия по Хургаде. Узнайте настоящую Хургаду!",
      ro: "Explorează adevărata Hurghada! Vizitează moscheea, biserica, marina și piețele.",
      cs: "Prozkoumejte skutečnou Hurghadu! Navštivte mešitu, kostel, marínu a trhy.",
      nl: "Verken het echte Hurghada! Bezoek de moskee, de kerk, de jachthaven en markten.",
      sv: "Utforska det verkliga Hurghada! Besök moskén, kyrkan, marinan och marknader.",
      pt: "Explore a verdadeira Hurghada! Visite a mesquita, a igreja, a marina e os mercados.",
      ja: "フルガダ・シティ・ツアー. モスク、教会を訪問。",
      ko: "진짜 후르가다를 탐험해보세요! 모스크, 교회, 마리나 및 현지 시장을 방문하세요.",
      hu: "Fedezze fel az igazi Hurghadát! Mecset, templom, kikötő és helyi piacok.",
      fi: "Hurghadan kaupunkikierros"
    },
    fullDesc: {
      en: "Experience the authentic heart of Hurghada. Our guided city tour takes you beyond the hotels to see the stunning El Mina Mosque, the historic St. Shenouda Church, and the vibrant fish market. We stroll through the luxury marina and explore the traditional Dahar district, providing a perfect blend of modern and ancient culture with professional guides and comfortable transport.",
      ar: "جرب القلب الحقيقي للغردقة. تأخذك جولة مدينتنا المصحوبة بمرشدين إلى ما وراء الفنادق لرؤية مسجد الميناء المذهل وكنيسة القديس شنودة التاريخية وسوق السمك النابض بالحياة. نحن نتجول في المارينا الفاخرة ونستكشف منطقة الدهار التقليدية، مما يوفر مزيجًا مثاليًا من الثقافة الحديثة والقديمة مع مرشدين محترفين ووسائل نقل مريحة."
    },
    video: "assets/video/City-Tour.mp4"
  },
  {
    id: 17,
    slug: "airport-shuttle",
    cat: "Services",
    price: 10,
    rating: 5.0,
    dur: "One Way",
    img: "assets/images/airport1.webp",
    gallery: ["assets/images/airport1.webp", "assets/images/airport2.webp", "assets/images/airport3.webp"],
    name: { 
      en: "Private Airport Shuttle", ar: "انتقالات المطار الخاصة", ru: "Частный трансфер из аэропорта", de: "Privater Flughafentransfer",
      fr: "Navette Aéroport Privée", it: "Navetta aeroportuale privata", es: "Traslado privado al aeropuerto", pl: "Prywatny transfer lotniskowy",
      tr: "Özel Havaalanı Servisi", zh: "私人机场班车", uk: "Приватний трансфер з аеропорту", ro: "Transfer Privat Aeroport",
      cs: "Soukromá doprava na letiště", nl: "Privé Luchthavenshuttle", sv: "Privat Flygplatstransfer", pt: "Serviço de Transfer do Aeroporto",
      ja: "プライベート・空港シャトル", ko: "프라이빗 공항 셔틀", hu: "Privát Repülőtéri Transzfer", fi: "Yksityinen lentokenttäkuljetus"
    },
    desc: {
      en: "Premium door-to-door transfer. Reliable 24/7 airport shuttle in luxury vehicles.",
      ar: "انتقالات مميزة من الباب إلى الباب. خدمة مطار موثوقة على مدار الساعة في سيارات فاخرة.",
      ru: "Премиум трансфер от двери до двери. Надежно 24/7 в элитных авто.",
      de: "Premium-Transfer von Tür zu Tür. Zuverlässige 24/7-Shuttle in Luxusfahrzeugen.",
      fr: "Transfert porte-à-porte premium. Navette fiable 24h/24 en véhicules de luxe.",
      it: "Trasferimento premium porta a porta. Navetta affidabile 24/7 in veicoli di lusso.",
      es: "Traslado premium puerta a puerta. Servicio fiable 24/7 en vehículos de lujo.",
      pl: "Transfer klasy premium od drzwi do drzwi. Niezawodna obsługa 24/7.",
      tr: "Birinci sınıf kapıdan kapıya transfer. Lüks araçlarda güvenilir 7/24 havaalanı servisi.",
      zh: "优质的门到门接送。豪华车辆中可靠的 24/7 机场班车。",
      uk: "Частный трансфер из аэропорта. Надежно 24/7!",
      ro: "Transfer premium door-to-door. Navetă fiabilă non-stop în vehicule de lux.",
      cs: "Spolehlivý nonstop transfer v luxusních vozech.",
      nl: "Premium deur-tot-deur transfer. Betrouwbare 24/7 luchthavenshuttle in luxe voertuigen.",
      sv: "Premium dörr-till-dörr-transfer. Pålitlig 24/7 flygplatstransfer i lyxbilar.",
      pt: "Transfer premium de porta a porta. Serviço de transporte confiável em veículos de luxo.",
      ja: "プレミアムなドアツードア送迎. 24時間年中無休。",
      ko: "프리미엄 도어 투 도어 이동 서비스. 고급 차량을 이용한 연중무휴 신뢰할 수 있는 공항 셔틀.",
      hu: "Prémium háztól-házig transzfer. Megbízható nonstop repülőtéri transzfer luxusautókkal.",
      fi: "Yksityinen lentokenttäkuljetus"
    },
    fullDesc: {
      en: "Start and end your trip in absolute comfort. Our private airport shuttle service provides stress-free, professional transfers between Hurghada International Airport and any resort. With bilingual drivers, air-conditioned premium vehicles, and real-time flight tracking, we ensure you arrive safely and on time, every time.",
      ar: "ابدأ وأنهِ رحلتك براحة تامة. تفر خدمة انتقالات المطار الخاصة لدينا انتقالات احترافية وخالية من الإجهاد بين مطار الغردقة الدولي وأي منتجع. مع سائقين ثنائي اللغة ومركبات فاخرة مكيفة وتتبع الرحلات الجوية في الوقت الفعلي، نضمن وصولك بأمان وفي الوقت المحدد، في كل مرة."
    },
    video: "assets/video/Airport.mp4"
  },
  {
    id: 18,
    slug: "paradise-island",
    cat: "Hurghada",
    price: 65,
    rating: 5.0,
    dur: "8 hours",
    img: "assets/images/paradise (4).jpeg",
    video: "assets/video/Paradise.mp4",
    gallery: ["assets/images/paradise (1).jpeg", "assets/images/paradise (2).jpeg", "assets/images/paradise (3).jpeg", "assets/images/paradise (4).jpeg", "assets/images/paradise (5).jpeg"],
    name: { 
      en: "PARADISE ISLAND", ar: "رحلة الجنة", ru: "Рай — морская экскурсия", de: "PARADISE ISLAND",
      fr: "PARADISE ISLAND", it: "PARADISE ISLAND", es: "PARADISE ISLAND", pl: "PARADISE ISLAND",
      tr: "PARADISE ISLAND", zh: "天堂岛游", uk: "Рай — морська екскурсія", ro: "PARADISE ISLAND",
      cs: "PARADISE ISLAND", nl: "PARADISE ISLAND", sv: "PARADISE ISLAND", pt: "PARADISE ISLAND",
      ja: "PARADISE ISLAND", ko: "PARADISE ISLAND", hu: "PARADISE ISLAND", fi: "PARADISE ISLAND"
    },
    desc: {
      en: "A magical boat excursion to the 'Egyptian Maldives'. White sands, turquoise lagoons, snorkeling, and pure island relaxation.",
      ar: "رحلة بحرية سحرية إلى 'المالديف المصرية'. رمال بيضاء، بحيرات فيروزية، غطس، واسترخاء جزيرى خالص.",
      ru: "Волшебная морская экскурсия к 'Египетским Мальдивам'. Белый песок, бирюзовые лагуны, сноркелинг и отдых.",
      de: "Eine magische Bootsfahrt zu den 'Ägyptischen Malediven'. Weißer Sand, türkise Lagunen und Entspannung.",
      fr: "Une excursion magique en bateau vers les 'Maldives égyptiennes'. Sable blanc et lagons turquoise.",
      it: "Una magica escursione in barca alle 'Maldive egiziane'. Sabbia bianca e lagune turchesi.",
      es: "Una excursión mágica en barco a las 'Maldivas egipcias'. Arena blanca y lagunas turquesas.",
      pl: "Magiczna wycieczka łodzią na 'Egipskie Malediwy'. Biały piasek i turkusowe laguny.",
      tr: "Mısır'ın Maldivleri'ne büyülü bir tekne gezisi. Beyاز kumlar ve turkuaz lagünler.",
      zh: "前往“埃及马尔代夫”的神奇船游。白沙滩、青绿色泻湖和纯粹的岛屿放松。",
      uk: "Рай — морська екскурсія. Чарівна морська екскурсія до 'Єгипетських Мальдів'.",
      ro: "O excursie magică cu barca către 'Maldivele Egiptene'. Nisip alb și lagune turcoaz.",
      cs: "Magický výlet lodí na 'Egyptské Maledivy'. Bílý písek a tyrkysové laguny.",
      nl: "Een magische boottocht naar de 'Egyptische Malediven'. Wit zand en turquoise lagunes.",
      sv: "En magisk båtutflykt till 'Egyptens Maldiver'. Vit sand och turkosa laguner.",
      pt: "Uma excursão mágica de barco às 'Maldivas Egípcias'. Areia branca e lagoas azul-turquesa.",
      ja: "PARADISE ISLAND. 「エジプトのモルディブ」へのボートツアー。",
      ko: "‘이집트의 몰디브’로 떠나는 마법 같은 보트 여행. 하얀 모래와 청록색 석호.",
      hu: "Varázslatos hajókirándulás az 'Egyiptomi Maldív-szigetekre'. Fehér homok és türkiz lagúnák.",
      fi: "PARADISE ISLAND"
    },
    fullDesc: {
      en: "PARADISE ISLAND is a magical boat excursion to a unique oasis in the heart of the Red Sea — often called the 'Egyptian Maldives'. The journey begins aboard a comfortable yacht, gliding through the azure Red Sea as you soak in the sun and sea breeze. The trip features two guided snorkeling stops at vibrant coral reefs teeming with colourful fish and starfish. Guests then spend several hours relaxing on the pristine white sandy beach of Paradise Island, swimming in crystal-clear emerald waters, and enjoying the island's facilities: a cosy café, a bar, a volleyball court, and dedicated photo spots with scenic swings and backdrops. Whether you seek adventure beneath the waves or tranquil relaxation on white sands, PARADISE ISLAND delivers the finest Red Sea island experience.",
      ar: "رحلة الجنة هي رحلة بحرية سحرية إلى واحة فريدة في قلب البحر الأحمر — تُعرف بـ'المالديف المصرية'. تبدأ الرحلة على متن يخت مريح، يُبحر عبر البحر الأحمر الأزرق بينما تستمتع بأشعة الشمس ونسيم البحر. تتضمن الرحلة وقفتين للغطس بإرشاد محترف في شعاب مرجانية نابضة بالحياة تعج بالأسماك الملونة ونجوم البحر. ثم يقضي الضيوف ساعات عدة في الاسترخاء على الشاطئ الرملي الناصع البياض لجزيرة الجنة، والسباحة في المياه الزمردية الصافية، والاستمتاع بمرافق الجزيرة: مقهى دافئ، بار، ملعب كرة طائرة، وأماكن مخصصة للتصوير. سواء كنت تبحث عن المغامرة تحت الأمواج أو الاسترخاء على الرمال البيضاء، فإن رحلة الجنة تقدم أفضل تجربة جزيرة في البحر الأحمر."
    },
    coords: [27.2173, 33.9161]
  },
  {
    id: 19,
    slug: "hula-hula-sunset",
    cat: "Sea",
    price: 35,
    rating: 5.0,
    dur: "8 hours",
    img: "assets/images/hula-hula.webp",
    video: "assets/video/hula.mp4",
    gallery: ["assets/images/hula-hula.webp", "assets/images/hula1.webp", "assets/images/hula2.webp", "assets/images/hula3.webp", "assets/images/hula4.webp"],
    name: { 
      en: "Hula Hula Sunset", ar: "هولا هولا صن سيت", ru: "Хула Хула Закат", de: "Hula Hula Sunset",
      fr: "Hula Hula Sunset", it: "Hula Hula Sunset", es: "Hula Hula Sunset", pl: "Hula Hula Sunset",
      tr: "Hula Hula Sunset", zh: "Hula Hula 日落", uk: "Хула Хула Захід", ro: "Hula Hula Sunset",
      cs: "Hula Hula Sunset", nl: "Hula Hula Sunset", sv: "Hula Hula Sunset", pt: "Hula Hula Sunset",
      ja: "フラフラ・サンセット", ko: "훌라훌라 선셋", hu: "Hula Hula Sunset", fi: "Hula Hula Sunset"
    },
    desc: {
      en: "The most magical sunset experience in the Red Sea. Tropical vibes, golden hours, and an exclusive island escape.",
      ar: "أكثر تجربة غروب سحرية في البحر الأحمر. أجواء استوائية، وساعات ذهبية، وهروب حصري للجزيرة.",
      ru: "Самый волшебный закат на Красном море. Тропическая атмосфера и эксклюзивный отдых.",
      de: "Das magischste Sonnenuntergangserlebnis im Roten Meer. Tropische Stimmung, goldene Stunden.",
      fr: "L'expérience de coucher de soleil la plus magique de la mer Rouge. Ambiance tropicale.",
      it: "L'esperienza del tramonto più magica del Mar Rosso. Vibrazioni tropicali e ore d'oro.",
      es: "La experiencia de atardecer más mágica en el Mar Rojo. Vibras tropicales y horas doradas.",
      pl: "Najbardziej magiczny zachód słońca na Morzu Czerwonym. Tropikalny klimat i złote godziny.",
      tr: "Kızıldeniz'deki en büyülü gün batımı deneyimi. Tropikal esintiler ve altın saatler.",
      zh: "红海最神奇的日落体验。热带风情、黄金时刻和独特的岛屿逃离。",
      uk: "Хула Хула Захід. Найчарівніший захід сонця на Червоному морі.",
      ro: "Cea mai magică experiență de apus de soare de la Marea Roșie. Atmosferă tropicală.",
      cs: "Nejkouzelnější zážitek při západu slunce v Rudém moři. Tropická atmosféra.",
      nl: "De meest magische zonsondergangervaring in de Rode Zee. Tropische sfeer.",
      sv: "Den mest magiska solnedgångsupplevelsen i Röda havet. Tropiska vibbar.",
      pt: "A expérience pôr do sol mais mágica no Mar Vermelho. Vibrações tropicais.",
      ja: "フラフラ・サンセット. 幻想적인 夕日体験.",
      ko: "홍해에서 가장 마법 같은 일몰 경험. 열대 분위기, 골든 아워.",
      hu: "A legvarázslatosabb naplemente élmény a Vörös-tengeren. Trópusi hangulat.",
      fi: "Hula Hula Sunset"
    },
    fullDesc: {
      en: "Set sail for the ultimate sunset island escape! We take you on an 8-hour journey to the exclusive Hula Hula Beach at Giftun Island, where tropical vibes meet crystal-clear waters and breathtaking golden hour views. Enjoy a premium boat ride, two guided snorkeling stops at pristine reefs, and a warm, friendly atmosphere on board as you watch the sun sink below the Red Sea horizon. Our staff is dedicated to making this your most romantic and relaxing day in Hurghada.",
      ar: "أبحر في الهروب النهائي للجزيرة وقت الغروب! نأخذك في رحلة مدتها 8 ساعات إلى شاطئ هولا هولا الحصري في جزيرة جفتون، حيث تلتقي الأجواء الاستوائية بالمياه الكريستالية ومناظر الساعة الذهبية الخلابة. استمتع برحلة بحرية فاخرة، ووقفتين للغطس بصحبة مرشدين في شعاب مرجانية خلابة، وأجواء دافئة وودية على متن السفينة بينما تشاهد الشمس تغوص تحت أفق البحر الأحمر."
    },
    coords: [27.1895, 33.9312]
  },
  {
    id: 20,
    slug: "island-bianka",
    cat: "Hurghada",
    price: 90,
    rating: 5.0,
    dur: "8 hours",
    img: "assets/images/BIANKA1.jpeg",
    video: "assets/video/bianka.mp4",
    gallery: ["assets/images/BIANKA1.jpeg", "assets/images/BIANKA2.jpeg", "assets/images/BIANKA3.jpeg", "assets/images/BIANKA4.jpeg", "assets/images/BIANKA5.jpeg", "assets/images/BIANKA6.jpeg"],
    name: { 
      en: "BIANKA ISLAND", ar: "جزيرة بيانكا", ru: "Остров Бьянка", de: "BIANKA ISLAND",
      fr: "BIANKA ISLAND", it: "BIANKA ISLAND", es: "BIANKA ISLAND", pl: "BIANKA ISLAND",
      tr: "BIANKA ISLAND", zh: "Bianka 岛", uk: "Острів Б'янка", ro: "BIANKA ISLAND",
      cs: "BIANKA ISLAND", nl: "BIANKA ISLAND", sv: "BIANKA ISLAND", pt: "BIANKA ISLAND",
      ja: "BIANKA ISLAND", ko: "BIANKA ISLAND", hu: "BIANKA ISLAND", fi: "BIANKA ISLAND"
    },
    desc: {
      en: "Experience the ultimate Greek-style luxury on the Red Sea. Pristine white sands, crystal-clear turquoise lagoons, and an exclusive island atmosphere.",
      ar: "استمتع بالفخامة القصوى على الطراز اليوناني في البحر الأحمر. رمال بيضاء نقية، بحيرات فيروزية صافية، وأجواء جزيرة حصرية.",
      ru: "Роскошь в греческом стиле на Красном море. Белоснежные пляжи, бирюзовые лагуны и эксклюзивная атмосфера.",
      de: "Erleben Sie ultimativen Luxus im griechischen Stil am Roten Meer. Kristallklare türkisfarbene Lagunen.",
      fr: "Découvrez le luxe ultime de style grec sur la mer Rouge. Lagons turquoise cristallins.",
      it: "Scopri l'ultimo lusso in stile greco sul Mar Rosso. Lagune turchesi cristalline.",
      es: "Vive el máximo lujo al estilo griego en el Mar Rojo. Lagunas turquesas cristalinas.",
      pl: "Doświadcz luksusu w greckim stylu nad Morzem Czerwonym. Krystaliczne laguny.",
      tr: "Kızıldeniz'de Yunan tarzı lüksü yaşayın. El değmemiş beyaz kumlar ve turkuaz lagünler.",
      zh: "在红海体验极致的希腊式奢华。纯净的白沙、晶莹剔透的青绿色泻湖。",
      uk: "Острів Б'янка. Відчуйте розкіш у грецькому стилі!",
      ro: "Experimentați luxul suprem în stil grecesc la Marea Roșie. Lagune de cristal.",
      cs: "Zažijte špičkový luxus v řeckém stylu v Rudém moři. Křišťálové laguny.",
      nl: "Ervaar de ultieme luxe in Griekse stijl aan de Rode Zee. Kristalheldere lagunes.",
      sv: "Upplev den ultimata lyxen i grekisk stil vid Röda havet. Kristallklara laguner.",
      pt: "Experimente o máximo luxo em estilo grego no Mar Vermelho. Lagoas cristalinas.",
      ja: "BIANKA ISLAND. 透明的な ラグーン。",
      ko: "홍해에서 궁극의 그리스식 럭셔리를 경험하세요. 수정처럼 맑은 석호.",
      hu: "Tapasztalja meg a görög stílusú luxust a Vörös-tengeren. Kristálytiszta lagúnák.",
      fi: "BIANKA ISLAND"
    },
    fullDesc: {
      en: "BIANKA ISLAND is a spectacular destination in the Red Sea, offering a unique blend of natural beauty and elegant modern architecture. Known for its Maldives-like white sands and shallow turquoise waters, this premium excursion provides a tranquil sanctuary for those seeking relaxation and style. The trip features a scenic yacht cruise, guided snorkeling at vibrant reefs, and plenty of time to soak in the photogenic, Greek-inspired scenery. With top-tier facilities including a beach club, restaurant, and diverse activity zones, Bianka Island is the definitive luxury escape in Hurghada.",
      ar: "جزيرة بيانكا هي وجهة مذهلة في البحر الأحمر، تقدم مزيجاً فريداً من الجمال الطبيعي والعمارة الحديثة الأنيقة. تشتهر برمالها البيضاء التي تشبه رمال جزر المالديف ومياهها الفيروزية الضحلة، وتوفر هذه الرحلة المميزة ملاذاً هادياً لأولئك الذين يبحثون عن الاسترخاء والأناقة. تتضمن الرحلة رحلة باليخت، وغوصاً موجهاً في شعاب مرجانية نابضة بالحياة، والكثير من الوقت للاستمتاع بالمناظر الخلابة المستوحاة من الطراز اليوناني."
    },
    coords: [26.1285, 34.3012] // Near Safaga/Bianca Island
  },
  {
    id: 21,
    slug: "safari-stars",
    cat: "Desert",
    price: 45,
    rating: 5.0,
    dur: "4.5 hours",
    img: "assets/images/safari-stars-1.webp",
    video: "assets/video/safari-stars.mp4",
    gallery: ["assets/images/safari-stars-1.webp", "assets/images/safari-stars-2.webp", "assets/images/safari-stars-3.webp", "assets/images/safari-stars-4.webp", "assets/images/safari-stars-5.webp"],
    name: { 
      en: "Safari Stars", ar: "سفاري ستارز", ru: "Сафари Звезды", de: "Safari Sterne",
      fr: "Safari Étoiles", it: "Safari Stelle", es: "Safari Estrellas", pl: "Safari Gwiazdy",
      tr: "Safari Yıldızları", zh: "Safari 星星", uk: "Сафарі Зірки", ro: "Safari Stele",
      cs: "Safari Hvězdy", nl: "Safari Sterren", sv: "Safari Stjärnor", pt: "Safari Estrelas",
      ja: "サファリ・スターズ", ko: "사파리 스타즈", hu: "Szafari Csillagok", fi: "Safari Tähdet"
    },
    desc: {
      en: "Embark on an extraordinary adventure with a Hurghada stargazing and Jeep safari tour, where the magic of the desert combines with the wonder of the cosmos.",
      ar: "مغامرة ليلية في الصحراء! بيتش باجي وجيب للقرية البدوية، غروب الشمس، عشاء وتأمل النجوم بالتلسكوب.",
      ru: "Ночное приключение в пустыне! Багги, джип, закат, ужин и наблюдение за звездами.",
      de: "Nächtliches Wüstenabenteuer! Strandbuggy, Jeep, Sonnenuntergang, Abendessen und Sternbeobachtung.",
      fr: "Aventure nocturne dans le désert ! Buggy, jeep, coucher de soleil et observation des étoiles.",
      it: "Avventura notturna nel deserto! Buggy, jeep, tramonto, cena e osservazione delle stelle.",
      es: "¡Aventura nocturna en el desierto! Buggy, jeep, atardecer, cena e observación de estrellas.",
      pl: "Nocna przygoda na pustyni! Buggy, jeep, zachód słońca, kolacja i obserwacja gwiazd.",
      tr: "Olağanüstü bir çöl macerası! Yıldız gözlemi, Jeep safari, gün batımı ve Bedevi akşam yemeği.",
      zh: "开启一场非凡的冒险，体验赫尔格达观星和吉普车冲沙之行，沙漠魔力与宇宙奇观相遇。",
      uk: "Сафарі Зірки. Нічна пригода в пустелі!",
      ro: "Aventură nocturnă în deșert! Buggy, jeep, apus de soare și observarea stelelor.",
      cs: "Noční pouštní dobrodružství! Buggy, jeep, západ slunce a pozorování hvězd.",
      nl: "Nachtelijk woestijnavontuur! Buggy, jeep, zonsondergang en sterrenkijken.",
      sv: "Nattligt ökenäventyr! Buggy, jeep, solnedgång och stjärnskådning.",
      pt: "Aventura noturna no deserto! Buggy, jeep, pôr do sol e observação de estrelas.",
      ja: "サファリ・スターズ. 星空観測。",
      ko: "비범한 사막 어드벤처! 지프 사파리, 베두인 저녁 식사 및 별자리 관측.",
      hu: "Rendkívüli sivatagi kaland! Csillagnézés, Jeep szafari és beduin vacsora.",
      fi: "Safari Tähdet"
    },
    fullDesc: {
      en: "Embark on an extraordinary adventure with a Hurghada stargazing and Jeep safari tour, where the magic of the desert combines with the wonder of the cosmos. Begin your journey with a convenient hotel pickup, setting the stage for an exhilarating ride through the scenic Red Sea desert. Travel 26 kilometers deep into the heart of the desert, where the golden hues of the sunset paint the dunes in breathtaking colors. Along the way, pause at a sunset observation area to marvel at the serene beauty of the desert landscape. Arriving at a traditional Bedouin camp, you’ll be greeted warmly with refreshing drinks and authentic herbal Bedouin tea. Immerse yourself in the rich Bedouin culture as you explore their unique way of life. The peaceful ambiance of the camp offers a perfect backdrop for your next experience—a sumptuous Bedouin BBQ dinner. Savor a variety of traditional dishes in this serene desert setting, where the stars begin to light up the sky as night falls. As the evening deepens, the real highlight of the tour begins: a guided stargazing experience. Step away from the noise and lights of the city to enjoy an unspoiled view of the night sky. With the help of a professional telescope, observe distant planets, stars, and even the Milky Way in stunning detail. Your experienced astronomy guide will captivate you with fascinating stories and insights about the science of the stars, offering a glimpse into the mysteries of the universe. After an unforgettable evening, the adventure concludes with a return journey to your hotel in the comfort of a Jeep, leaving you with cherished memories of this unique stargazing safari in Hurghada.",
      ar: "البدايه من الساعة الخامسة 30  دقيقه بيتش باجي & جيب حتي القريه البدويه تشمل جمل . زياره شجرة الاكاسيا العتيقة .غروب. كهف الجبل(شيشه + شاي freeلمن يرغب) &العشاء عبارة عن ربع دجاج +كفته+ارز بسمتي+2 مياه+كانز كولا + فاكهه الموسم بعد العشاء قعده بدويه في النجوم مع التلسكوب نهاية الرحله الساعه العاشره"
    },
    coords: [27.2048, 33.6821] // Sahara Safari Camp
  }
];

const TRIP_DETAIL_DATA = {
  "orange-bay": {
    extraDesc: {
      en: "Orange Bay is widely considered the most beautiful spot in the Egyptian Red Sea. This premium island experience offers a Caribbean-style lagoon with crystal-clear turquoise waters and iconic orange sunshades that have made it a global sensation. Part of the protected Giftun Island Nature Reserve, the area is a sanctuary for diverse marine life. Our PADI-certified team leads guests to exclusive snorkeling spots teeming with parrotfish, angelfish, and vibrant coral gardens. Whether you are seeking a romantic escape, a family adventure, or the perfect Instagram moment, Orange Bay provides a world-class beach experience that defines Sinai luxury.",
      ar: "تعتبر أورانج باي أجمل بقعة في البحر الأحمر المصري. توفر هذه الجزيرة المميزة بحيرة على طراز الكاريبي بمياه فيروزية صافية ومظلات برتقالية شهيرة جعلتها ظاهرة عالمية. كجزء من محمية جزيرة جفتون الطبيعية، تعد المنطقة ملاذاً للحياة البحرية المتنوعة. يقود فريقنا المعتمد من PADI الضيوف إلى أماكن الغوص الحصرية المليئة بالأسماك الملونة والحدائق المرجانية النابضة بالحياة. سواء كنت تبحث عن ملاذ رومانسي، أو مغامرة عائلية، أو لحظة مثالية لإنستغرام، فإن أورانج باي توفر تجربة شاطئية عالمية المستوى تحدد فخامة سيناء.",
      de: "Orange Bay gilt weithin als der schönste Ort im ägyptischen Roten Meer. Dieses erstklassige Inselerlebnis bietet eine Lagune im karibischen Stil mit kristallklarem, türkisfarbenem Wasser und den ikonischen orangefarbenen Sonnenschirmen, die sie zu einer weltweiten Sensation gemacht haben. Das Gebiet ist Teil des geschützten Giftun Island Naturschutzgebiets und ein Refugium für eine vielfältige Meeresfauna. Unser PADI-zertifiziertes Team führt die Gäste zu exklusiven Schnorchelplätzen, an denen es von Papageifischen, Kaiserfischen und lebhaften Korallengärten wimmelt. Egal, ob Sie einen romantischen Kurzurlaub, ein Familienabenteuer oder den perfekten Instagram-Moment suchen, Orange Bay bietet ein erstklassiges Stranderlebnis, das den Luxus des Sinai definiert."
    },
    itinerary: [
      {time: "08:00", title: { en: "Hotel Pickup", ar: "الاستقبال من الفندق", de: "Hotelabholung" }, desc: { en: "Free pickup from any hotel in Hurghada, El Gouna, Makadi Bay or Sahl Hasheesh.", ar: "استقبال مجاني من أي فندق في الغردقة، الجونة، خليج مكادي أو سهل حشيش.", de: "Kostenlose Abholung von jedem Hotel in Hurghada, El Gouna, Makadi Bay oder Sahl Hasheesh." }},
      {time: "09:30", title: { en: "Depart from Marina", ar: "المغادرة من المارينا", de: "Abfahrt von der Marina" }, desc: { en: "Board our premium boat at Hurghada Marina for a scenic 45-minute cruise to Orange Bay.", ar: "اصعد على متن قاربنا الفاخر في مارين الغردقة لرحلة بحرية خلابة لمدة 45 دقيقة إلى أورانج باي.", de: "Gehen Sie in der Hurghada Marina an Bord unseres Premium-Bootes für eine 45-minütige malerische Fahrt nach Orange Bay." }},
      {time: "10:15", title: { en: "Snorkeling Stop 1", ar: "وقفة الغطس الأولى", de: "Schnorchelstopp 1" }, desc: { en: "First guided snorkeling session at a vibrant coral reef bursting with colorful marine life.", ar: "أول جلسة غطس إرشادية في شعاب مرجانية نابضة بالحياة تعج بالحياة البحرية الملونة.", de: "Erstes geführtes Schnorcheln an einem lebhaften Korallenriff voller bunter Meereslebewesen." }},
      {time: "11:00", title: { en: "Orange Bay Beach", ar: "شاطئ أورانج باي", de: "Orange Bay Strand" }, desc: { en: "Arrive at the iconic turquoise lagoon. Relax on white sand under the famous orange parasols.", ar: "الوصول إلى البحيرة الفيروزية الشهيرة. استرخِ على الرمال البيضاء تحت المظلات البرتقالية المشهورة.", de: "Ankunft an der ikonischen türkisfarbenen Lagune. Entspannen Sie sich auf weißem Sand unter den berühmten orangefarbenen Sonnenschirmen." }},
      {time: "13:00", title: { en: "Buffet Lunch", ar: "غداء بوفيه", de: "Mittagsbuffet" }, desc: { en: "Freshly prepared buffet with Egyptian dishes, salads, fresh bread and desserts — fully included.", ar: "بوفيه مُعد طازجاً يضم أطباقاً مصرية، سلطات، خبزاً طازجاً وحلويات — مشمول بالكامل.", de: "Frisch zubereitetes Buffet mit ägyptischen Gerichten, Salaten, frischem Brot und Desserts – alles inklusive." }},
      {time: "14:00", title: { en: "Snorkeling Stop 2", ar: "وقفة الغطس الثانية", de: "Schnorchelstopp 2" }, desc: { en: "Second snorkeling session at a pristine reef garden with our professional snorkeling instructor.", ar: "جلسة غطس ثانية في حديقة شعاب مرجانية خلابة مع مدرب الغطس المحترف لدينا.", de: "Zweite Schnorchelsitzung in einem unberührten Riffgarten mit unserem professionellen Schnorchellehrer." }},
      {time: "15:30", title: { en: "Return Cruise", ar: "رحلة العودة", de: "Rückfahrt" }, desc: { en: "Scenic return to Hurghada Marina. Relax on the sun deck with refreshing soft drinks.", ar: "رحلة عودة خلابة إلى مارينا الغردقة. استرخِ على سطح القارب مع مشروبات غازية منعشة.", de: "Malerische Rückfahrt zur Hurghada Marina. Entspannen Sie auf dem Sonnendeck mit erfrischenden alkoholfreien Getränken." }},
      {time: "17:00", title: { en: "Hotel Drop-off", ar: "العودة للفندق", de: "Rückgabe am Hotel" }, desc: { en: "Safe return to your hotel — tired, happy and full of unforgettable memories!", ar: "عودة آمنة إلى فندقك — متعب، سعيد، ومليء بذكريات لا تُنسى!", de: "Sichere Rückkehr zu Ihrem Hotel – müde, glücklich und voller unvergesslicher Erinnerungen!" }}
    ],
    bring: [{ en: "Swimsuit and towel", ar: "ملابس السباحة ومنشفة", de: "Badeanzug und Handtuch" }, { en: "Sunscreen SPF 50+", ar: "واقي من الشمس", de: "Sonnenschutzmittel" }, { en: "Sunglasses and hat", ar: "نظارات شمسية وقبعة", de: "Sonnenbrille und Hut" }, { en: "Underwater camera", ar: "كاميرا تحت الماء", de: "Unterwasserkamera" }, { en: "Small cash", ar: "مبلغ مالي بسيط", de: "Etwas Bargeld" }],
    know: [{ en: "Non-swimmers welcome", ar: "نرحب بغير السباحين", de: "Nichtschwimmer willkommen" }, { en: "Family-friendly", ar: "مناسب للعائلات", de: "Familienfreundlich" }, { en: "Certified crew", ar: "طاقم معتمد", de: "Zertifizierte Crew" }],
    faq: [{ q: { en: "Can non-swimmers join?", ar: "هل يمكن لغير السباحين الانضمام؟", de: "Können Nichtschwimmer teilnehmen?" }, a: { en: "Absolutely! Life jackets are provided for all guests.", ar: "بالطبع! يتم توفير سترات النجاة لجميع الضيوف.", de: "Absolut! Für alle Gäste werden Schwimmwesten zur Verfügung gestellt." } }, { q: { en: "Is lunch included?", ar: "هل الغداء مشمول؟", de: "Ist das Mittagessen inklusive?" }, a: { en: "Yes! A full buffet lunch is included in the price.", ar: "نعم! بوفيه غداء كامل مشمول في السعر.", de: "Ja! Ein komplettes Mittagsbuffet ist im Preis inbegriffen." } }]
  },
  "hula-hula": {
    extraDesc: "Hula Hula Beach on Giftun Island is a hidden gem of the Red Sea, exclusive and far less crowded than main tourist beaches. The surrounding waters of the Giftun Island Nature Reserve are crystal-clear and reveal some of the most vibrant coral gardens in all of Egypt. This trip is perfect for those who want the complete Red Sea island experience — combining a beautiful beach, world-class snorkeling, and a relaxed boat journey with our friendly professional crew.",
    itinerary: [
      {time:"08:30", title:"Hotel Pickup", desc:"Comfortable pickup from your Hurghada hotel, El Gouna, or surrounding areas."},
      {time:"09:30", title:"Board at Marina", desc:"Meet our crew at Hurghada Marina and set sail for Giftun Island's exclusive beach."},
      {time:"10:00", title:"Arrive Hula Hula Beach", desc:"Step onto pristine white sand and settle into the tropical island atmosphere."},
      {time:"10:30", title:"Free Time and Snorkeling", desc:"Swim, snorkel, play beach volleyball, or simply soak up the sunshine. Life is good."},
      {time:"12:30", title:"Freshly Prepared Lunch", desc:"Enjoy a delicious buffet lunch on the beach, fully included in your trip price."},
      {time:"13:30", title:"Guided Snorkeling Stop", desc:"Second snorkeling session at a stunning coral garden full of tropical fish."},
      {time:"15:00", title:"Return Cruise", desc:"Sail back to Hurghada on a relaxed return cruise with drinks and good vibes."},
      {time:"17:00", title:"Hotel Drop-off", desc:"Safe return to your hotel, already planning your next Red Sea adventure!"}
    ],
    bring: ["Swimwear and towel","Sunscreen and lip balm","Hat and sunglasses","Waterproof camera or phone case","Light snacks if preferred","Small cash for optional soft drinks"],
    know: ["Family-friendly, all ages welcome","Life vests provided for all guests","Small boat for a private feel","No prior snorkeling experience needed","Calm waters ideal for weak swimmers","All snorkeling equipment provided free"],
    faq: [
      {q:"Is Hula Hula suitable for children?", a:"Yes, perfect for families! The beach has calm shallow areas ideal for children, and our crew pays special attention to the safety of younger guests."},
      {q:"Do I need snorkeling experience?", a:"Not at all! Our certified guides give a briefing and stay with you throughout. All equipment is provided at no extra cost."},
      {q:"How is Hula Hula different from Orange Bay?", a:"Both are beautiful but different in character. Orange Bay has iconic parasols and a famous lagoon. Hula Hula has a more relaxed tropical vibe with excellent reef access and fewer crowds."},
      {q:"Can I book private departure?", a:"Yes! Contact us on WhatsApp and we can arrange custom departure times for groups or special occasions."}
    ]
  },
  "dolphin-house": {
    extraDesc: "Sha'ab Abu Ibrahim, known as Dolphin House, is one of the world's most magical ocean experiences. Wild spinner dolphins have made this reef their permanent home, and we visit them on their terms — approaching respectfully and letting the dolphins choose to interact. Our guides are trained in responsible wildlife tourism, ensuring the dolphins experience zero stress. The reef itself is spectacular, with coral walls, schools of glassfish, and frequent visits from sea turtles and reef sharks.",
    itinerary: [
      {time:"06:30", title:"Early Morning Pickup", desc:"Dolphins are most active at sunrise, so we depart early for the best encounter chances."},
      {time:"07:30", title:"Depart Marina", desc:"Leave Hurghada Marina on our eco-certified boat heading toward Dolphin House reef."},
      {time:"08:30", title:"Dolphin Encounter", desc:"Slip into the water alongside wild spinner dolphins in their natural habitat. Pure magic!"},
      {time:"10:00", title:"Reef Snorkeling Stop 1", desc:"Explore the stunning coral walls and vibrant fish life of Sha'ab Abu Ibrahim reef."},
      {time:"11:30", title:"Lunch on Board", desc:"Freshly prepared buffet lunch on deck while the boat finds the perfect second location."},
      {time:"12:30", title:"Reef Snorkeling Stop 2", desc:"Second snorkeling spot, often with more dolphin sightings on the return journey."},
      {time:"14:00", title:"Return to Hurghada", desc:"Relaxed return cruise, soft drinks on deck, reliving the memories with fellow guests."},
      {time:"15:00", title:"Hotel Drop-off", desc:"Return to your hotel with swimming with wild dolphins checked off your bucket list!"}
    ],
    bring: ["Swimsuit and quick-dry towel","Reef-safe sunscreen","Underwater camera or GoPro strongly recommended","Sea sickness tablet if sensitive","Light rash guard for sun protection","Reusable water bottle"],
    know: ["Wild dolphins — very high success rate (90%+) but not 100% guaranteed","Early departure ensures best dolphin activity window","Maximum 20 guests for intimate experience","Eco-certified sustainable wildlife tour","No flash photography near dolphins please","Children from age 5 recommended"],
    faq: [
      {q:"Is it guaranteed I will see dolphins?", a:"We visit Dolphin House nearly every day and encounter dolphins on over 90% of trips. However, these are wild animals. What we guarantee: a spectacular reef experience regardless of dolphin sightings."},
      {q:"Is it safe to swim near wild dolphins?", a:"Yes! Our guides are trained in responsible wildlife interaction. Spinner dolphins are gentle and pose no risk to swimmers. We follow strict no-touching, no-chasing guidelines."},
      {q:"Why depart so early?", a:"Wild spinner dolphins are most active at dawn, playing near the surface before retreating deeper later in the day. Early departure dramatically increases your encounter chances."},
      {q:"Can children join?", a:"Yes, children from age 5 are welcome. We provide child-sized life vests and our crew maintains close watch over younger guests throughout the trip."}
    ]
  },
  "parasailing": {
    extraDesc: "At 60-70 metres above the Red Sea, you see Hurghada from a perspective most visitors never witness. The coral reefs shimmer beneath you, the city curves along the coastline, and for 10-15 glorious minutes the world is completely silent except for the wind. Our parasailing operation is fully certified, using professional-grade spinnaker parachutes operated by instructors with over a decade of experience. You can fly solo or tandem with a partner — making this a perfect romantic adventure or a memorable shared experience.",
    itinerary: [
      {time:"09:00", title:"Hotel Pickup", desc:"Morning or afternoon session available. Specify your preference when booking on WhatsApp."},
      {time:"09:30", title:"Arrive Beach Base", desc:"Meet your instructor, complete the safety waiver and get fitted with your professional harness."},
      {time:"09:45", title:"Safety Briefing", desc:"Thorough 15-minute safety briefing. You will feel completely confident before going up."},
      {time:"10:00", title:"Speedboat Launch", desc:"Board the speedboat and head to the deep-water launch zone in the warm morning breeze."},
      {time:"10:15", title:"FLIGHT TIME!", desc:"Ascend to 60-70 metres above the Red Sea and enjoy 10-15 thrilling minutes of breathtaking views."},
      {time:"10:30", title:"Smooth Landing", desc:"Gentle landing back on the boat. GoPro footage review immediately available if requested."},
      {time:"11:00", title:"Hotel Drop-off", desc:"Return to your hotel, already planning your second flight!"}
    ],
    bring: ["Comfortable sports or swimwear","Sunglasses (with strap to secure them)","Secure footwear","Hair tie for long hair","Small personal camera if desired","Your sense of adventure!"],
    know: ["Zero experience needed — completely beginner friendly","Minimum age: 10 years / minimum weight: 30kg","Maximum weight: 120kg per person","Solo or tandem (2 people together) options","Certified internationally-standard equipment","GoPro video of your flight available for purchase"],
    faq: [
      {q:"Is parasailing safe?", a:"Absolutely. Our equipment is internationally certified and inspected regularly. Our instructors are professionals with over 10 years experience and an outstanding safety record across thousands of flights."},
      {q:"Do I need any experience?", a:"Zero experience required! You simply sit in the harness, the boat accelerates, and you naturally and gently lift off the water. Almost everyone says it feels less scary than they expected."},
      {q:"Can two people fly together?", a:"Yes! Tandem flights with two people in one harness are our most popular option. A perfect romantic or friendship experience shared at 60m above the Red Sea."},
      {q:"What if I am afraid of heights?", a:"Many guests say the same before flying, and almost all say it was not scary in the air. The ascent is smooth and gradual. The sensation is peaceful, not frightening at all."}
    ]
  },
  "super-safari": {
    extraDesc: "The Hurghada desert hides a world of adventure beyond the beach. Our Super Safari plunges you into that world headfirst with quad biking across golden dunes, traditional camel riding at sunset, and a genuine Bedouin camp experience under a carpet of stars. The Bedouin people have called this desert home for centuries, and our evening with them is authentic, warm and deeply memorable. This is the best-value desert experience in all of Hurghada, packed with 6+ hours of non-stop adventure and culture.",
    itinerary: [
      {time:"14:00", title:"Hotel Pickup", desc:"Afternoon pickup gives you time to enjoy the beach in the morning before heading to the desert."},
      {time:"15:00", title:"Quad Biking", desc:"30-minute high-speed quad bike ride through spectacular desert dunes. Helmets and safety gear provided."},
      {time:"15:45", title:"Camel Riding at Sunset", desc:"Traditional camel trek through the golden desert as the sun begins to dip toward the horizon."},
      {time:"16:30", title:"Arrive Bedouin Camp", desc:"Welcome to our authentic Bedouin camp. Traditional tea ceremony and sand boarding opportunity."},
      {time:"17:00", title:"Bedouin Tea Ceremony", desc:"Sip sweet mint tea with our Bedouin hosts and learn about the desert culture and traditions."},
      {time:"19:30", title:"Gourmet Bedouin Dinner", desc:"Authentic dinner under the stars featuring traditional Egyptian and Bedouin dishes cooked fresh."},
      {time:"21:00", title:"Cultural Show", desc:"Live music, traditional dancing and cultural performances around the campfire."},
      {time:"22:30", title:"Return to Hotel", desc:"Return journey to your hotel — carrying memories and stories that will last a lifetime."}
    ],
    bring: ["Closed-toe shoes for quad biking","Light jacket for the cool desert evening","Sunscreen and sunglasses","Camera with extra battery","Cash for optional extra rides","Sense of adventure and open mind!"],
    know: ["Minimum age for quad biking: 16 years (younger children ride as passenger)","Camel riding suitable for all ages","Dinner is fully vegetarian-friendly with Arabic dishes","Alcoholic drinks available at extra cost","Traditional Arabic toilets at the camp","One of our longest and most popular trips"],
    faq: [
      {q:"Is this suitable for families with children?", a:"Yes! Children can ride quad bikes as passengers with an adult driver. The camel ride and Bedouin dinner are perfect for all ages. It is one of our most popular family trips."},
      {q:"What type of food is served at dinner?", a:"The dinner features a generous spread of traditional Egyptian and Bedouin dishes: grilled meats, rice, salads, Egyptian bread, and fresh desserts. Vegetarian options are always available."},
      {q:"Is the quad biking safe?", a:"Absolutely. Helmets and full safety briefings are provided. Our experienced guides accompany all riders throughout the route. No prior quad biking experience is needed."},
      {q:"What should I wear for the desert?", a:"Light clothing for the afternoon heat, closed-toe shoes for quad biking, and bring a light jacket as the desert gets surprisingly cool after sunset."}
    ]
  },
  "horse-riding": {
    extraDesc: "There is something uniquely freeing about riding a horse along the edge of the Red Sea as the sun melts into the horizon. Our beach and desert horseback rides offer a peaceful, majestic alternative to the usual Hurghada activities. Our horses are well-cared-for, gentle and trained to be calm around riders of all skill levels. Whether it is your first time on horseback or you are an experienced rider, our professional handlers ensure a safe, magical experience that connects you to the natural landscape in a truly special way.",
    itinerary: [
      {time:"07:00", title:"Hotel Pickup (AM) or 16:00 (PM)", desc:"Choose morning beach ride or stunning sunset desert ride when booking. We recommend the sunset!"},
      {time:"07:30", title:"Arrive at Stables", desc:"Meet your horse and your professional Bedouin handler. Introduction and gentle familiarization."},
      {time:"07:45", title:"Safety Briefing", desc:"30-minute introduction session covering safe riding technique, commands and posture."},
      {time:"08:15", title:"The Ride Begins", desc:"Set off on your chosen route: along the Red Sea beach or through scenic desert trails."},
      {time:"09:15", title:"Photo Stops", desc:"Multiple photo opportunities in beautiful natural settings — these images will be treasured."},
      {time:"09:30", title:"Return to Stables", desc:"Gentle return ride, with time to bond with your horse and thank your handler."},
      {time:"10:00", title:"Hotel Drop-off", desc:"Return to your hotel having experienced Hurghada from a completely different perspective."}
    ],
    bring: ["Comfortable long trousers (shorts allowed but less comfortable)","Closed-toe shoes or boots","Sunglasses and sunscreen","Camera for incredible photos","Hair tie for long hair","Water bottle"],
    know: ["No experience needed — beginners are very welcome","Suitable for ages 6 and above","Maximum weight: 100kg per rider","Horses are gentle, trained and well cared for","Helmets available on request","Morning and sunset (recommended) sessions available"],
    faq: [
      {q:"Do I need riding experience?", a:"No experience is needed at all. Our horses are gentle and trained for beginners. Your handler walks alongside you throughout the entire ride, keeping you safe and confident."},
      {q:"Is horse riding safe for children?", a:"Yes, children from age 6 can ride with a handler walking alongside. We have smaller, especially gentle horses designated for younger riders and beginners."},
      {q:"Which is better — beach riding or desert riding?", a:"Both are beautiful! Beach riding gives you the sensation of waves and ocean breeze. Desert riding at sunset offers incredible golden light photography and a more adventurous feel. We recommend sunset desert for the most memorable photos."},
      {q:"What is the maximum group size?", a:"We keep riding groups to a maximum of 8 horses for safety and quality. Each rider has their own dedicated handler for a personal experience."}
    ]
  },
  "camel-riding": {
    extraDesc: "Camel riding is one of the most quintessentially Egyptian experiences you can have, and in Hurghada the golden desert dunes provide the perfect backdrop. Our gentle, well-cared-for camels are handled by experienced Bedouin guides who have grown up with these beautiful animals. The experience is peaceful, surprisingly comfortable and absolutely filled with photographic opportunities. It is one of the most popular activities with all ages — from young children on their first camel to grandparents reliving childhood dreams of Arabia.",
    itinerary: [
      {time:"07:00", title:"Hotel Pickup", desc:"Early morning or late afternoon pickup from your hotel (sunset option highly recommended)."},
      {time:"07:30", title:"Meet Your Camel", desc:"Introduction to your camel and Bedouin guide. Learn a little about camel culture and history."},
      {time:"07:45", title:"Safety Briefing", desc:"Quick and easy briefing on how to sit, hold on, and enjoy the rocking camel stride."},
      {time:"08:00", title:"Desert Trek Begins", desc:"Set off through stunning golden dunes with your Bedouin guide leading the way."},
      {time:"08:30", title:"Photo Stops", desc:"Multiple stops at scenic dune viewpoints for unforgettable photographs against the desert sky."},
      {time:"08:45", title:"Traditional Tea at Camp", desc:"Dismount for a sweet mint tea break at a small Bedouin rest stop in the dunes."},
      {time:"09:00", title:"Return and Hotel Drop-off", desc:"Return to the stables and then to your hotel with incredible memories and photos."}
    ],
    bring: ["Comfortable clothing (loose trousers preferred)","Closed-toe shoes","Sunglasses and sunscreen","Camera — you will want this!","Small cash for tips","Sense of wonder"],
    know: ["Suitable for all ages and fitness levels","Camels are gentle and specially trained","Duration: approximately 1 hour total ride time","Morning and sunset options — sunset is magical","Bedouin guides speak basic English, Russian and Arabic","One of the best photo opportunities in Hurghada"],
    faq: [
      {q:"Is camel riding comfortable?", a:"Camel riding has a gentle rocking motion. Most guests find it very comfortable, though it can feel unusual at first. Our handlers ensure you are properly seated and supported at all times."},
      {q:"Is it suitable for elderly guests or those with back problems?", a:"We recommend checking with your doctor first if you have serious back conditions. However, many guests in their 70s and 80s enjoy this experience without any issues. The pace is gentle and slow."},
      {q:"Can very young children ride?", a:"Yes! Young children from age 3 can ride a camel seated in front of an adult, or on a smaller camel with a handler walking alongside. It is one of the safest activities for young children."},
      {q:"Are the camels treated well?", a:"Absolutely. Our camels receive excellent veterinary care, proper nutrition and rest periods. We are proud of our high animal welfare standards and our camels are visibly healthy and calm."}
    ]
  },
  "pyramids": {
    extraDesc: "The Great Pyramids of Giza are more than just monuments; they are a profound testament to human ambition and ancient engineering. Standing before the Pyramid of Khufu—the only remaining Wonder of the Ancient World—is a life-changing experience. Our premium discovery tour is meticulously designed to bypass the usual tourist stress with luxury air-conditioned transport, expert Egyptologist guides who bring the stones to life, and a high-end lunch overlooking the plateau. From the mysterious Sphinx to the treasures of the Cairo Museum, this is the definitive journey into the heart of the Pharaohs' legacy.",
    itinerary: [
      {time:"03:00", title:"Hotel Pickup", desc:"Early start for the long journey. Our comfortable AC coach departs Hurghada before dawn."},
      {time:"09:00", title:"Arrive Giza Plateau", desc:"First stop: the Great Pyramid of Khufu, followed by the Pyramid of Khafre and Menkaure."},
      {time:"10:30", title:"The Great Sphinx", desc:"Visit the iconic Sphinx and hear its fascinating history from your expert Egyptologist guide."},
      {time:"11:30", title:"Egyptian Museum", desc:"Explore the world-famous Egyptian Museum of Antiquities, including Tutankhamun's treasures."},
      {time:"13:30", title:"Luxury Lunch", desc:"Premium lunch at a quality restaurant with wonderful views — a well-earned rest!"},
      {time:"14:30", title:"Optional Khan el-Khalili", desc:"Optional visit to Cairo's famous ancient bazaar for souvenirs and Egyptian coffee. (extra time permitting)"},
      {time:"16:00", title:"Return Journey", desc:"Begin the return drive to Hurghada in our comfortable AC coach with drinks onboard."},
      {time:"22:00", title:"Hotel Arrival", desc:"Return to Hurghada after an extraordinary, history-filled 19-hour Egyptian adventure."}
    ],
    bring: ["Comfortable walking shoes (you walk a lot!)","Light clothing, shoulders and knees covered for museum","Sun hat and sunscreen","Camera with extra battery","Egyptian Pounds for tips and small purchases","Valid passport or ID"],
    know: ["Very long day: approx. 18-19 hours total","AC transport both ways, comfortable journey","Expert licensed Egyptologist guide throughout","Entry fees to all sites included in price","Vegetarian/vegan lunch options always available","Flight option available at extra cost (contact us)"],
    faq: [
      {q:"Is the trip really 18 hours long?", a:"Yes, the drive from Hurghada to Cairo is approximately 6 hours each way. The time at the sites is about 5-6 hours. While it is a long day, the experience is absolutely worth it. Most guests say it was the highlight of their entire trip."},
      {q:"Are entry fees included?", a:"Yes! Entry fees to the Giza Plateau, the Sphinx viewing area, and the Egyptian Museum of Antiquities are all included in your trip price. No hidden costs."},
      {q:"Can children do this trip?", a:"Yes, but we recommend children from age 6 upwards due to the long travel time. The pyramids and museum are absolutely fascinating for children who love history and adventure."},
      {q:"Is there an option to fly instead of driving?", a:"Yes! A flight option from Hurghada to Cairo is available at additional cost. Contact us on WhatsApp for current flight availability and pricing."}
    ]
  },
  "luxor": {
    extraDesc: "Luxor, the ancient city of Thebes, is the largest open-air museum in the world and the crown jewel of Egyptian history. Our premium day trip uncovers the grandeur of the New Kingdom pharaohs, from the massive columns of the Karnak Temple to the sacred silence of the Valley of the Kings. We cross the Nile to visit the mortuary temple of Queen Hatshepsut, Egypt's most powerful female ruler. With a professional licensed Egyptologist as your storyteller and a luxury buffet lunch by the river, we transform a long journey into a seamless, high-end exploration of humanity's greatest archaeological treasures.",
    itinerary: [
      {time:"03:00", title:"Hotel Pickup", desc:"Early departure from Hurghada for the 4.5-hour AC coach journey to ancient Thebes."},
      {time:"07:30", title:"Arrive Luxor", desc:"Arrive refreshed and ready to step 3,000 years back in time."},
      {time:"08:00", title:"Karnak Temple Complex", desc:"The world's largest ancient religious site — towering columns, sacred lakes, and incredible hieroglyphics."},
      {time:"10:00", title:"Valley of the Kings", desc:"Descend into the elaborately decorated tombs of the New Kingdom pharaohs (3 tombs included)."},
      {time:"12:00", title:"Hatshepsut Temple", desc:"Visit the stunning mortuary temple of Egypt's greatest female pharaoh, carved into a cliff face."},
      {time:"13:30", title:"Nile View Buffet Lunch", desc:"Premium buffet lunch at a restaurant overlooking the majestic River Nile."},
      {time:"14:30", title:"Luxor Temple", desc:"The magnificent Luxor Temple, best visited in the early afternoon light."},
      {time:"16:30", title:"Return Journey", desc:"Comfortable AC coach return to Hurghada with drinks, arriving around 22:00."}
    ],
    bring: ["Comfortable walking shoes — essential!","Light breathable clothing (knees and shoulders covered)","Sun hat and sunscreen — very important","Camera with extra battery and storage","Small cash for tips","Water bottle"],
    know: ["Very long but extraordinarily rewarding day: 18-19 hours","Expert licensed Egyptologist guide (English, Russian, German, Arabic)","All entry fees included in your price","Maximum 15 guests per guide for an intimate experience","Vegetarian and vegan lunch options available","Combine with extra Valley of Queens visit on request"],
    faq: [
      {q:"Is Luxor worth the long journey from Hurghada?", a:"Without question, yes. Nine out of ten of our guests say the Luxor day trip was the single most memorable experience of their entire Egypt holiday. The scale and beauty of the ancient monuments is genuinely overwhelming."},
      {q:"How many temples and tombs do we visit?", a:"We visit Karnak Temple, three royal tombs in the Valley of the Kings, Queen Hatshepsut's Temple, and Luxor Temple. That is five major UNESCO heritage sites in one day."},
      {q:"Are entry fees included?", a:"Yes, all entry fees to all sites listed are included in your trip price. There is an optional extra fee to visit the tomb of Tutankhamun specifically, which we can arrange."},
      {q:"What is the best season to visit Luxor?", a:"Luxor is wonderful year-round, but October through April offers the most comfortable temperatures. In summer it can be very hot inland, but our trip includes air-conditioned transport and early morning visits to the sites."}
    ]
  },
  "mini-safari": {
    extraDesc: "The Mini Safari is the perfect desert fix for those who are short on time but big on adrenaline. In just 3 hours, you will experience the raw thrill of quad biking across Hurghada's spectacular golden dunes — no experience required, just enthusiasm! Our professional lead-riders guide every step of the route, maintaining a pace that is exciting yet safe. It is the most popular choice for those who want to tick 'desert adventure' off their list without committing to a full-day trip.",
    itinerary: [
      {time:"Flexible", title:"Hotel Pickup", desc:"Morning, afternoon, and magical sunset sessions available. Tell us your preference!"},
      {time:"+30 min", title:"Arrive at Desert Base", desc:"Brief introduction to the quad bikes and your safety equipment. Helmet fitting and checks."},
      {time:"+45 min", title:"Safety Briefing", desc:"20-minute comprehensive safety briefing and practice course before heading out."},
      {time:"+60 min", title:"Desert Trek Begins", desc:"Follow our expert lead-riders into the stunning golden Hurghada desert landscape."},
      {time:"+90 min", title:"Dune Challenge Route", desc:"More exciting terrain — rolling dunes, open desert tracks, breathtaking views."},
      {time:"+120 min", title:"Photo Stop and Rest", desc:"Pause at a scenic viewpoint for photos and a short water break in the desert."},
      {time:"+180 min", title:"Return and Hotel Drop-off", desc:"Return to base and then to your hotel, buzzing with the thrill of desert quad biking."}
    ],
    bring: ["Closed-toe shoes — mandatory for safety","Long trousers recommended (shorts allowed)","Sunglasses and sunscreen","Secure phone case for photos","Small cash for tips","Sense of speed!"],
    know: ["Minimum age: 16 years to drive solo (younger as passenger)","No prior quad biking experience needed","Helmets and safety gear provided and mandatory","Max speed on guided tracks is controlled for safety","Available morning, afternoon and sunset (most popular)","Duration: approximately 3 hours including pickup"],
    faq: [
      {q:"Do I need to know how to drive a quad bike?", a:"No experience is needed at all! Our instructors give a thorough 20-minute briefing and practice session before you head out. You will feel confident and in control within minutes."},
      {q:"Is it suitable for teenagers?", a:"Yes! From age 16, guests can ride their own quad bike. Younger teenagers can ride as passengers with an adult driver. It is extremely popular with young people."},
      {q:"What is the difference between Mini Safari and Super Safari?", a:"Mini Safari is approximately 3 hours and focused purely on quad biking. Super Safari is a 7-hour full desert adventure adding camel riding, a Bedouin camp, dinner under the stars, and cultural shows."},
      {q:"Can I do the sunset session?", a:"Yes, and it is our most popular option! Quad biking as the sun paints the desert gold is a truly extraordinary experience. Book early as sunset sessions sell out fast."}
    ]
  },
  "diving": {
    extraDesc: "The Red Sea is consistently rated among the top five diving destinations in the entire world, and Hurghada sits at the heart of it. The combination of warm, exceptionally clear water, extraordinary coral formations, and an incredible diversity of marine life — from tiny pygmy seahorses to resident reef sharks — makes every dive a revelation. Our PADI-certified team specialises in making first-time divers feel completely safe and at ease, turning what can feel like a daunting experience into the most exciting adventure of the holiday.",
    itinerary: [
      {time:"07:30", title:"Hotel Pickup", desc:"Early start to make the most of the calmest sea conditions in the morning."},
      {time:"08:30", title:"Reach Dive Site", desc:"Arrive at Abu Ramada, Paradise Reef, or our guide's recommended site based on conditions."},
      {time:"08:45", title:"Full Equipment Briefing", desc:"PADI instructor provides complete equipment fitting and underwater communication briefing."},
      {time:"09:30", title:"First Dive — 35 Minutes", desc:"Descend to 3-6 metres for beginners, deeper for certified divers. Pure underwater magic."},
      {time:"10:15", title:"Surface Interval", desc:"Relax on deck, hot drinks, snacks, review your experience with your instructor."},
      {time:"11:00", title:"Second Dive — 35 Minutes", desc:"Second dive at a different spot, often with more vibrant coral and marine life."},
      {time:"12:00", title:"Celebration and Documents", desc:"Surface, celebrate your first dive, receive your diving certificate and photos."},
      {time:"14:00", title:"Hotel Drop-off", desc:"Return to your hotel as a certified scuba diver — life will never look the same underwater!"}
    ],
    bring: ["Swimwear worn under wetsuit","Towel — a large one!","Reef-safe sunscreen for the boat journey","Underwater camera if you own one (rentals available)","Small cash for optional third dive or purchase photographs","Motion sickness tablet if you are sensitive"],
    know: ["All diving equipment provided and maintained to PADI standards","Experience diver option also available (up to 30m depth)","Minimum age: 10 years","Maximum depth for beginners: 6 metres","PADI diving certificate awarded at end of session","DAN dive insurance included in your trip"],
    faq: [
      {q:"Can I dive if I have never dived before?", a:"Absolutely — it is specifically designed for complete beginners! Our PADI instructors accompany you on a 1-on-1 basis throughout every second of the dive. Over 90% of our diving guests have never dived before."},
      {q:"What if I panic underwater?", a:"Feeling nervous before your first dive is completely normal! Our instructors are trained to handle anxiety and will not let you descend until you feel 100% comfortable. You can abort at any point with no pressure."},
      {q:"Do I get a certificate?", a:"Yes! After completing two dives with us, you receive a PADI Discover Scuba Diving certificate — a recognised international diving credential. Perfect to show off when you get home!"},
      {q:"Can certified divers join this trip?", a:"Yes! Certified divers dive to their qualification depth (typically up to 30m) and can explore more advanced sites. Just mention your certification level when booking."}
    ]
  },
  "spa": {
    extraDesc: "The Ottoman hammam tradition has been refined over five centuries, and experiencing it in Egypt connects you to one of the most ancient wellness cultures in the world. Our spa sanctuary in Hurghada is designed to be a genuine break from the outside world — quiet, warm, fragrant, and deeply restorative. After days of snorkeling, safari, and sightseeing, this is the perfect way to let your body and mind completely unwind before you return home. Many guests tell us it was the most relaxing experience of their entire Egypt trip.",
    itinerary: [
      {time:"Flexible", title:"Your Preferred Time", desc:"Book any time between 10:00 and 20:00. We fit around your holiday schedule."},
      {time:"+10 min", title:"Welcome and Refreshments", desc:"Arrival, welcome herbal tea and tour of the spa facilities. Relax before the experience."},
      {time:"+25 min", title:"Steam Room Session", desc:"15 minutes in the marble steam room, opening your pores and relaxing your muscles."},
      {time:"+45 min", title:"Traditional Black Soap Scrub", desc:"Authentic Moroccan black soap applied and then the kessa glove exfoliation. Skin renews completely."},
      {time:"+60 min", title:"Foam and Relaxation Massage", desc:"Full-body foam massage while lying on the warm marble slab — deeply calming."},
      {time:"+90 min", title:"Aromatic Oil Massage", desc:"30-minute professional full-body oil massage choosing from our aromatic scent menu."},
      {time:"+120 min", title:"Recovery and Tea", desc:"Relaxation area, herbal teas, and time to slowly return to the outside world."}
    ],
    bring: ["Just yourself — everything else is provided!","Small cash for tips if you wish","Flip-flops (provided but you may prefer your own)","Hair tie for long hair","Any specific allergies to mention (oils, scents)","An empty afternoon — you will not want to rush!"],
    know: ["Separate male and female treatment areas","All therapists are professionally certified","Suitable for ages 16 and above","Ideal to book on arrival day or last day of holiday","Can be combined with other half-day activities","Mention any medical conditions or allergies when booking"],
    faq: [
      {q:"What is a Turkish hammam exactly?", a:"A hammam is a traditional steam bath originating from Ottoman Turkey. It involves steam, a full body exfoliation using a kessa mitt, and a massage on a heated marble slab. The result is extraordinarily clean, soft skin and total physical relaxation."},
      {q:"Is it suitable for people who do not like saunas?", a:"The steam room is warm but not as intense as a sauna. Most guests who normally avoid saunas find the hammam perfectly comfortable. You can step out at any time if needed."},
      {q:"Are male and female guests separate?", a:"Yes, completely. We have separate male and female treatment areas staffed by same-gender therapists. Modesty is respected throughout, and disposable clothing is provided."},
      {q:"Can I choose the massage oil scent?", a:"Yes! We offer a selection of aromatic oils including jasmine, rose, oud, eucalyptus, and lavender. Simply choose your preferred scent at arrival."}
    ]
  },
  "nefertari": {
    extraDesc: "The Nefertari is unlike anything else available in Hurghada — a purpose-built luxury semi-submarine that combines the wonder of the underwater world with the comfort of a premium air-conditioned lounge. You sit inside the vessel and watch the coral reef glide past through large panoramic windows at 3-5 metres depth, without getting wet and without needing any swimming ability whatsoever. It is perfect for those who want to experience the Red Sea reef in absolute comfort and style, and the five-star service on board matches the extraordinary views.",
    itinerary: [
      {time:"09:00", title:"Hotel Pickup", desc:"Morning or afternoon session. Both offer extraordinary visibility in the clear Red Sea."},
      {time:"09:30", title:"Board the Nefertari", desc:"At Hurghada Marina, step aboard the magnificent Nefertari vessel and take your lounge seat."},
      {time:"09:45", title:"Welcome Drinks", desc:"Premium refreshments served while the Nefertari positions above the first reef section."},
      {time:"10:00", title:"Underwater Viewing Begins", desc:"The vessel dips gently as the panoramic windows reveal the stunning underwater coral world."},
      {time:"10:45", title:"Second Viewing Zone", desc:"The Nefertari moves to a second reef section, often with larger fish and dramatic coral formations."},
      {time:"11:30", title:"Gourmet Seafood Lunch", desc:"Five-star fresh seafood and Mediterranean dishes served in the elegant on-board dining area."},
      {time:"13:00", title:"Return to Marina", desc:"Return to Hurghada Marina in absolute comfort and style. A uniquely luxurious Red Sea memory."}
    ],
    bring: ["Smart casual or resort wear — this is a luxury experience","Sunglasses for the deck portions","Camera — the underwater views are extraordinary","Nothing else — the Nefertari provides everything"],
    know: ["No swimming ability required — perfect for non-swimmers","Air-conditioned interior throughout the experience","Suitable for all ages including elderly guests","Maximum 30 guests for an intimate luxury atmosphere","Five-star catering included in price","Our most exclusive and premium Red Sea experience"],
    faq: [
      {q:"Do I need to be able to swim?", a:"No swimming ability is required whatsoever! You remain inside the air-conditioned vessel at all times. The Nefertari is specifically designed for guests who want to experience the Red Sea reef without getting in the water."},
      {q:"Is it suitable for elderly guests?", a:"Yes, it is one of our most popular tours with guests of all ages. There are no physical requirements — you simply sit, watch and enjoy. It is also perfectly suited for guests with mobility limitations."},
      {q:"How deep does the Nefertari go underwater?", a:"The viewing windows sit at approximately 3-5 metres underwater. This is the perfect depth to see vibrant coral, tropical fish, and the dramatic structure of the Red Sea reef in crystal clarity."},
      {q:"Is the seafood lunch included?", a:"Yes! A full five-star seafood and Mediterranean lunch is included in the Nefertari experience price, served in the elegant on-board dining area."}
    ]
  },
  "speed-boat": {
    extraDesc: "The Private Speed Boat Charter is the ultimate expression of freedom on the Red Sea. Your boat, your captain, your schedule, your adventure. Whether you want to race across to Orange Bay for a private snorkeling session, discover the hidden beaches of Sharm El Naga, or simply cruise the open Red Sea at full throttle with the wind in your hair — your captain will make it happen. This is the choice of those who refuse to compromise on their holiday experience.",
    itinerary: [
      {time:"Your choice", title:"Custom Departure Time", desc:"You decide when you want to depart. We arrange everything around your perfect schedule."},
      {time:"+15 min", title:"Board Your Private Boat", desc:"Your professionally captained speed boat is waiting at the marina, fuelled and ready."},
      {time:"+30 min", title:"Full Speed Ahead", desc:"Race across the Red Sea to your first chosen destination at exhilarating speed."},
      {time:"Flexible", title:"Your First Destination", desc:"Snorkel a private reef, lounge on an exclusive beach, or explore a secret cove — your call."},
      {time:"Flexible", title:"Second Destination", desc:"Continue to your second chosen location as you design your perfect Red Sea day."},
      {time:"Flexible", title:"Open Red Sea Cruise", desc:"Optional full-speed cruise across open water — pure adrenaline with sea spray and sunshine."},
      {time:"Your choice", title:"Return to Marina", desc:"Return at your agreed time. Your captain will ensure you are back when you need to be."}
    ],
    bring: ["Swimwear and towel","Reef-safe sunscreen — very important on an open boat","Sunglasses and secure hat","Action camera or GoPro — highly recommended","Refreshments preferences (we stock accordingly)","Your group or family — this is best shared!"],
    know: ["Completely private — no other guests on your boat","Professional licensed captain and crew included","Snorkeling equipment provided for all guests","Refreshments and soft drinks included","Custom itinerary — you truly choose where you go","Available in 2-hour, 3-hour or 4-hour durations"],
    faq: [
      {q:"Can I choose exactly where we go?", a:"Yes, completely! Before your trip, you discuss your preferred destinations with your captain. You can choose from Orange Bay, Giftun Island, Hula Hula Beach, Sharm El Naga, Magawish Island, and many more. The captain will advise on conditions."},
      {q:"How many people can fit on the speed boat?", a:"Depending on the boat size reserved, our private boats comfortably accommodate 4-10 guests. Contact us on WhatsApp with your group size and we will match you with the perfect vessel."},
      {q:"Is snorkeling equipment included?", a:"Yes! Premium snorkeling masks, fins and vests are provided for all guests on board, free of charge. Underwater cameras are available for rental if needed."},
      {q:"Can I book this for a special occasion?", a:"Absolutely! We can arrange decorations, special food and drinks, and custom music for birthdays, anniversaries, proposals and any other celebration. Just let us know when booking on WhatsApp."}
    ]
  },
  "medical-care": {
    extraDesc: "Our Medical Care is an exclusive service provided only to Aquaway Tours guests. We understand that health issues can happen anytime, which is why we have established our own private, fully-equipped medical center right here in Hurghada. Our team of professional doctors and nurses are available 24/7 to provide immediate assistance. We handle all the coordination with your international insurance provider so you don't have to pay anything out of pocket for your care.",
    itinerary: [
      {time:"24/7", title:"Instant Assistance", desc:"Contact our dedicated medical hotline any time of day or night for immediate support."},
      {time:"Flexible", title:"Medical Center Visit", desc:"Access to our modern, private facilities with professional staff ready to help."},
      {time:"Direct", title:"Insurance Liaison", desc:"We handle the paperwork and billing with your insurance provider directly."},
      {time:"Direct", title:"Insurance Coverage", desc:"As an Aquaway guest, medical support is covered by your international insurance."}
    ],
    bring: ["Travel insurance documents","Passport or ID","List of current medications","Emergency contact details"],
    know: ["Exclusive to Aquaway Tours clients only","24/7 emergency response team available","Directly covered by your insurance","Professional multi-lingual medical staff","Private medical center in central Hurghada"],
    faq: [
      {q:"Is there any cost for this service?", a:"We coordinate the billing directly with your travel insurance company to ensure full coverage for Aquaway guests."},
      {q:"Do I need to pay a deposit?", a:"No deposit is required. We treat you first and handle the insurance details after you are feeling better."},
      {q:"What kind of medical issues can you help with?", a:"Our team can assist with everything from minor injuries and common travel illnesses to emergency medical coordination."},
      {q:"Is the staff multi-lingual?", a:"Yes, our medical team speaks English, Russian, and Arabic to ensure clear communication during your care."}
    ]
  },
  "city-tour": {
    extraDesc: "Discover the hidden gems of Hurghada beyond the luxury resorts. Our guided city tour takes you on a cultural journey through the historic heart of the city, from the stunning El Mina Mosque with its twin minarets to the serene St. Shenouda Church. Experience the bustling atmosphere of the traditional fish market and the vibrant local souks where the real life of Hurghada unfolds. Combined with a stroll along the elegant New Marina, this tour offers a perfect balance of traditional heritage and modern Egyptian lifestyle.",
    itinerary: [
      {time:"09:00", title:"Hotel Pickup", desc:"Professional pickup from your resort in Hurghada, El Gouna, or Makadi Bay."},
      {time:"09:45", title:"El Mina Mosque", desc:"Guided visit to the largest mosque in Hurghada. A masterpiece of Islamic architecture."},
      {time:"10:30", title:"St. Shenouda Church", desc:"Visit the historic Coptic Orthodox Cathedral, a peaceful sanctuary in the heart of the city."},
      {time:"11:15", title:"Fish Market & Souks", desc:"Experience local life at the vibrant fruit, vegetable, and fish markets of Old Town Dahar."},
      {time:"12:15", title:"New Marina Stroll", desc:"A relaxing walk through the modern yacht port with luxury shops and stunning sea views."},
      {time:"13:00", title:"Traditional Tea Break", desc:"Enjoy a complementary Egyptian mint tea at a local café while watching the world go by."},
      {time:"14:00", title:"Return to Hotel", desc:"Safe return to your resort, carrying a deeper understanding of Egyptian culture."}
    ],
    bring: ["Camera for cultural photography","Comfortable walking shoes","Sun hat and sunglasses","Scarf or wrap for mosque (also provided at entrance)","Small cash for souk shopping and tips","Bottled water"],
    know: ["Professional multi-lingual guide included","Air-conditioned comfortable transport","Mosque and Church visits subject to daily prayer times","Suitable for all ages and mobility levels","Total duration: approximately 5 hours","Free bottled water provided during the tour"],
    faq: [
      {q:"Is there a dress code for the Mosque?", a:"Yes, modest clothing is required (shoulders and knees covered). We provide appropriate traditional coverings at the mosque entrance for all our guests if needed."},
      {q:"Can we buy souvenirs during the tour?", a:"Absolutely! We visit the traditional Dahar markets where you can find authentic Egyptian crafts, spices, and perfumes at local prices."},
      {q:"Is it suitable for children?", a:"Yes, it's a very educational and easy-going tour for children of all ages. The walk is not strenuous and there is plenty to see."},
      {q:"Is lunch included in this tour?", a:"This is a half-day tour (5 hours) and includes refreshments and traditional tea, but not a full meal. We return you to your hotel in time for lunch."}
    ]
  },
  "airport-shuttle": {
    extraDesc: "Arrive in Hurghada with the peace of mind that your luxury transfer is waiting. Our private airport shuttle service is designed for travelers who value time, comfort, and reliability. Forget the stress of negotiating with airport taxis; our professional bilingual drivers meet you at the terminal with a personalized sign and assist with your luggage. Our fleet of modern, air-conditioned premium vehicles ensures a smooth, door-to-door journey to any resort in the Red Sea region. With 24/7 availability and real-time flight tracking, we guarantee we’ll be there exactly when you land.",
    itinerary: [
      {time:"24/7", title:"Flight Tracking", desc:"We monitor your flight status in real-time to ensure your driver is on time, even if you are delayed."},
      {time:"Arrival", title:"Meet & Greet", desc:"Your driver will be waiting outside the arrival hall with a personalized Aquaway Tours sign."},
      {time:"+10 min", title:"Luggage Assistance", desc:"Full help with your bags as you are escorted directly to your private premium vehicle."},
      {time:"+15 min", title:"Direct Transfer", desc:"Non-stop private journey directly to your resort or hotel entrance in absolute comfort."},
      {time:"Finish", title:"Resort Drop-off", desc:"Seamless arrival at your destination. Your vacation starts the moment you step off the plane."}
    ],
    bring: ["Flight number and arrival time","Passport or ID","Mobile phone for easier coordination","Booking confirmation text or email"],
    know: ["Fixed transparent pricing - no hidden costs","Professional bilingual drivers (English, Russian, Arabic)","Child seats and boosters available on request","24/7 availability for all arrival and departure times","Premium air-conditioned luxury vehicles","Direct door-to-door service"],
    faq: [
      {q:"What if my flight is delayed?", a:"We monitor all flights in real-time using live tracking data. Your driver will automatically adjust the pickup time so they are there when you land, at no extra cost to you."},
      {q:"Where exactly do I meet my driver?", a:"After collecting your luggage and clearing customs, look for our driver just outside the arrival hall exit. They will be holding a sign with your name or the 'Aquaway Tours' logo."},
      {q:"Is the price per person or per car?", a:"Our standard private shuttle price of €10 is per car (up to 4 people with luggage) for standard transfers within Hurghada. For larger groups, we provide premium vans."},
      {q:"Do you provide child safety seats?", a:"Yes! We prioritize family safety. Please mention the age of your children when booking so we can prepare the vehicle with appropriate child seats."}
    ]
  },
  "paradise-island": {
    extraDesc: "Paradise Island is a magical oasis in the Red Sea, often called the 'Egyptian Maldives'. The journey begins aboard a comfortable yacht, allowing guests to soak in the sun and the stunning azure vistas of the Red Sea. Two dedicated snorkeling stops reveal vibrant coral reefs teeming with colourful fish and starfish — all equipment including fins, masks and life vests is provided. Guests then relax for several hours on the pristine white sandy beach, swimming in crystal-clear emerald waters. The island is well-equipped with a cosy café, a bar, a volleyball court, a children's play area, and scenic photo spots with swings and picture-perfect backdrops. The atmosphere blends relaxation, marine exploration, and the natural beauty of the Red Sea — a peaceful yet adventurous escape into one of the most beautiful marine environments in the region.",
    itinerary: [
      {time:"08:30", title:"Hotel Pickup", desc:"Morning transfer from your hotel in Hurghada to the marina in a comfortable air-conditioned vehicle."},
      {time:"09:30", title:"Yacht Departure", desc:"Board our comfortable yacht and set sail across the azure Red Sea. Enjoy refreshments as we cruise toward the first snorkeling spot."},
      {time:"10:30", title:"Snorkeling Stop 1", desc:"First guided snorkeling session at a vibrant coral reef. Explore colourful fish, starfish and pristine coral formations. All equipment provided."},
      {time:"11:30", title:"Snorkeling Stop 2", desc:"Second snorkeling session at another stunning reef location, often with even more marine life to discover."},
      {time:"13:00", title:"Arrive Paradise Island", desc:"Step onto the pristine white sand beach of Paradise Island — the 'Egyptian Maldives'. Relax, swim, and enjoy the turquoise lagoon."},
      {time:"14:00", title:"Island Leisure & Facilities", desc:"Enjoy the island's café, bar, volleyball court, children's play area, and dedicated photo spots with scenic swings and backdrops."},
      {time:"16:30", title:"Return Cruise", desc:"A relaxing yacht ride back to the marina as the late afternoon sun paints the Red Sea golden."},
      {time:"17:30", title:"Hotel Drop-off", desc:"Safe return transfer directly to your hotel entrance."}
    ],
    bring: ["Swimwear and towel","Biodegradable sunscreen","Sunglasses and sun hat","Camera or waterproof phone case","Personal snorkeling gear (if preferred, otherwise provided)","Light jacket for the return boat ride"],
    know: ["All snorkeling equipment included (mask, fins, life jacket)","Island facilities: café, bar, volleyball court, children's play area","Professional multi-lingual guides and crew","Dedicated photo spots on the island","Bottled water and soft drinks included all day","Free pickup/drop-off for central Hurghada hotels"],
    faq: [
      {q:"Is snorkeling gear provided?", a:"Yes, we provide high-quality masks, fins, and life jackets for all our guests at no extra cost."},
      {q:"Is PARADISE ISLAND suitable for non-swimmers?", a:"Absolutely! The island has very shallow, calm turquoise lagoons where you can simply sit and relax in the water safely. Life jackets are also provided for everyone."},
      {q:"What are the facilities on the island?", a:"Paradise Island has a cosy café, a bar, a volleyball court, a children's play area, and beautiful photo spots with swings and scenic backdrops for amazing photos."},
      {q:"Are there toilets on the boat and island?", a:"Yes, the boat is equipped with clean restroom facilities, and there are basic facilities available on the island as well."}
    ]
  },
  "hula-hula-sunset": {
    extraDesc: "Hula Hula Beach on Giftun Island transforms into a romantic paradise during the golden hour. This exclusive sunset excursion is perfect for those who want the complete Red Sea island experience — combining a beautiful beach, world-class snorkeling, and a relaxed 8-hour boat journey with our friendly professional crew as you watch the sunset.",
    itinerary: [
      {time:"11:30", title:"Hotel Pickup", desc:"Comfortable afternoon pickup from your Hurghada hotel, El Gouna, or surrounding areas."},
      {time:"12:30", title:"Board at Marina", desc:"Meet our crew at Hurghada Marina and set sail for Giftun Island's exclusive beach."},
      {time:"13:00", title:"Arrive Hula Hula Beach", desc:"Step onto pristine white sand and settle into the tropical island atmosphere."},
      {time:"13:30", title:"Free Time & Snorkeling", desc:"Swim, snorkel, play beach volleyball, or simply soak up the afternoon sunshine."},
      {time:"14:30", title:"Freshly Prepared Lunch", desc:"Enjoy a delicious buffet lunch on the beach, fully included in your trip price."},
      {time:"15:30", title:"Guided Snorkeling Stop", desc:"Second snorkeling session at a stunning coral garden full of tropical fish."},
      {time:"17:30", title:"Sunset Watch", desc:"Watch the breathtaking Red Sea sunset as the sky turns golden on the boat."},
      {time:"18:30", title:"Return Cruise", desc:"Sail back to Hurghada on a relaxed return cruise with drinks and romantic vibes."},
      {time:"19:30", title:"Hotel Drop-off", desc:"Safe return to your hotel, after an unforgettable 8-hour sunset adventure!"}
    ],
    bring: ["Swimwear and towel","Sunscreen and lip balm","Hat and sunglasses","Waterproof camera or phone case","Light jacket for the evening","Small cash for optional soft drinks"],
    know: ["Romantic sunset experience","Life vests provided for all guests","Includes Guided Snorkeling stops","No prior snorkeling experience needed","Calm waters ideal for weak swimmers","All snorkeling equipment provided free"],
    faq: [
      {q:"Is Hula Hula Sunset suitable for couples?", a:"Yes, it's designed to be the most romantic sunset experience in Hurghada!"},
      {q:"Do I need snorkeling experience?", a:"Not at all! Our certified guides give a briefing and stay with you throughout. All equipment is provided at no extra cost."},
      {q:"Are families allowed?", a:"Yes! We welcome guests of all ages, though it is especially popular for romantic getaways."}
    ]
  },
  "island-bianka": {
    extraDesc: "BIANKA ISLAND represents the pinnacle of island luxury in the Red Sea. Located off the coast of Safaga, this exclusive destination is meticulously designed with a Greek-style aesthetic that contrasts beautifully with the turquoise waters. The island offers more than just a beach; it's a lifestyle experience where modern elegance meets untouched nature. Our premium package includes a comfortable yacht journey, professional snorkeling guidance at pristine reefs, and access to all island facilities including the restaurant, beach club, and photogenic swings.",
    itinerary: [
      {time:"08:00", title:"Hotel Pickup", desc:"Pickup from your hotel in Hurghada, Makadi Bay or Sahl Hasheesh in a private air-conditioned vehicle."},
      {time:"09:30", title:"Set Sail", desc:"Depart from the marina on a modern yacht. Enjoy fresh fruit and drinks as we cruise toward the reefs."},
      {time:"10:30", title:"Snorkeling Session", desc:"Guided snorkeling at a protected reef area. Discover vibrant coral gardens and exotic marine life."},
      {time:"12:00", title:"Island Arrival", desc:"Step onto the white sands of BIANKA ISLAND. Welcome drinks and introduction to the facilities."},
      {time:"13:00", title:"BBQ Lunch", desc:"Open buffet lunch with grilled specialties, fresh salads, and local delicacies served on the island."},
      {time:"14:30", title:"Beach & Relaxation", desc:"Free time for swimming, photography at the Greek spots, or relaxing at the beach club."},
      {time:"16:00", title:"Return Cruise", desc:"Relaxing boat ride back to the marina with late afternoon snacks and music."},
      {time:"17:30", title:"Hotel Drop-off", desc:"Comfortable transfer back to your hotel."}
    ],
    bring: ["Swimwear and towel","Sunglasses and sun hat","High SPF sunscreen","Waterproof phone case or camera","Light summer clothing","Small pocket money for extras"],
    know: ["Full snorkeling kit provided (fins, mask, vest)","Island has clean amenities and changing rooms","Vegetarian/Vegan meal options available","Greek-style photo spots everywhere","Crystal clear shallow water safe for children","Professional crew and guides on board"],
    faq: [
      {q:"What makes Bianka Island different from other islands?", a:"Bianka Island features a unique Greek-style architecture and a more exclusive, tranquil atmosphere compared to the larger public beaches. It's designed for premium relaxation and high-end photography."},
      {q:"Can I take kids on this trip?", a:"Yes! The shallow turquoise lagoon is perfect for children, and the island facilities are family-friendly."},
      {q:"What is included in the price?", a:"The price includes hotel transfers, boat trip, snorkeling gear, guided snorkeling, lunch on the island, and soft drinks throughout the day."},
      {q:"How long do we stay on the island?", a:"We typically spend about 4-5 hours on the island, including lunch and leisure time."}
    ]
  },
  "safari-stars": {
    extraDesc: "Embark on an extraordinary adventure with a Hurghada stargazing and Jeep safari tour, where the magic of the desert combines with the wonder of the cosmos. Begin your journey with a convenient hotel pickup, setting the stage for an exhilarating ride through the scenic Red Sea desert. Travel 26 kilometers deep into the heart of the desert, where the golden hues of the sunset paint the dunes in breathtaking colors. Along the way, pause at a sunset observation area to marvel at the serene beauty of the desert landscape. Arriving at a traditional Bedouin camp, you’ll be greeted warmly with refreshing drinks and authentic herbal Bedouin tea. Immerse yourself in the rich Bedouin culture as you explore their unique way of life. The peaceful ambiance of the camp offers a perfect backdrop for your next experience—a sumptuous Bedouin BBQ dinner. Savor a variety of traditional dishes in this serene desert setting, where the stars begin to light up the sky as night falls. As the evening deepens, the real highlight of the tour begins: a guided stargazing experience. Step away from the noise and lights of the city to enjoy an unspoiled view of the night sky. With the help of a professional telescope, observe distant planets, stars, and even the Milky Way in stunning detail. Your experienced astronomy guide will captivate you with fascinating stories and insights about the science of the stars, offering a glimpse into the mysteries of the universe. After an unforgettable evening, the adventure concludes with a return journey to your hotel in the comfort of a Jeep, leaving you with cherished memories of this unique stargazing safari in Hurghada.",
    itinerary: [
      {time:"17:30", title:"Hotel Pickup", desc:"Professional pickup from your resort in Hurghada in an air-conditioned Jeep."},
      {time:"18:15", title:"Desert Drive", desc:"Exhilarating Jeep ride 26km into the Red Sea desert dunes."},
      {time:"18:45", title:"Sunset Observation", desc:"Stop at a panoramic viewpoint to watch the desert sunset paint the landscape in gold."},
      {time:"19:15", title:"Bedouin Welcome", desc:"Arrival at the Bedouin camp with traditional drinks and herbal tea."},
      {time:"19:45", title:"BBQ Dinner", desc:"Lavish Bedouin BBQ dinner featuring grilled chicken, kofta, basmati rice, and seasonal fruits."},
      {time:"20:30", title:"Stargazing Experience", desc:"Guided tour of the cosmos using professional telescopes and expert astronomy insights."},
      {time:"21:30", title:"Traditional Bedouin Evening", desc:"Relaxing Bedouin session under the desert stars with optional shisha and tea."},
      {time:"22:00", title:"Return to Hotel", desc:"Return journey to your hotel, concluding your magical desert night."}
    ],
    bring: ["Comfortable clothing and walking shoes","Light jacket (desert can be cool at night)","Camera with low-light capability","Small cash for optional extras","Power bank for your mobile phone"],
    know: ["Professional astronomy guides","High-quality telescopes included","Jeep 4x4 transport both ways","Suitable for all ages","Full BBQ dinner and drinks included","Pickups from El Gouna or Sahl Hasheesh may have extra fee"],
    faq: [
      {q:"Is this trip safe for children?", a:"Yes, it's a very family-friendly trip. The Jeep ride is exciting but safe, and the stargazing is highly educational for kids."},
      {q:"What kind of telescopes do you use?", a:"We use professional-grade astronomical telescopes that allow you to see planets, star clusters, and the Milky Way clearly."},
      {q:"Is the dinner vegetarian friendly?", a:"Yes, our Bedouin BBQ includes rice, salads, bread, and fruits. We can accommodate most dietary requirements if mentioned during booking."},
      {q:"What happens if it's cloudy?", a:"We track the weather closely. In the rare event of heavy cloud cover, we still enjoy the desert safari and Bedouin dinner, or we can reschedule your stargazing session."}
    ]
  }
};

// Global exports
window.TRIPS = TRIPS;
window.TRIP_DETAIL_DATA = TRIP_DETAIL_DATA;
window.WA_PHONE = "201040296016";

