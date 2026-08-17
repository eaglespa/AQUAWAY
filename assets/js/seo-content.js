'use strict';

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
  },
  "paradise-island": {
    en: "Escape to Paradise Island, a pristine slice of the Egyptian Maldives. Known for its crystal-clear waters and powdery white sand beaches, this excursion offers the ultimate Red Sea relaxation. We'll take you on a luxurious boat ride to the island, stopping at premium snorkeling sites along the way. Once on Paradise Island, you can unwind under palm-frond umbrellas, enjoy the vibrant beach atmosphere, and indulge in a delicious buffet lunch. It's the perfect getaway for sun-seekers and snorkeling enthusiasts alike.",
    ar: "اهرب إلى جزيرة بارادايس، قطعة من جزر المالديف المصرية. تشتهر هذه الرحلة بمياهها الصافية وشواطئها ذات الرمال البيضاء الناعمة، وتوفر أقصى درجات الاسترخاء في البحر الأحمر. استمتع برحلة بحرية فاخرة إلى الجزيرة مع التوقف للغطس في مواقع مميزة."
  },
  "island-bianka": {
    en: "Discover Bianka Island, Hurghada's most exclusive boho-chic escape. Designed for the elite traveler, Bianka Island offers a premium beach club experience right in the middle of the Red Sea. Relax on plush sunbeds, sip refreshing mocktails, and listen to chill-out lounge music while soaking in the panoramic sea views. Our package includes luxury boat transfers, guided snorkeling at untouched coral reefs, and a gourmet dining experience on the island.",
    ar: "اكتشف جزيرة بيانكا، الملاذ البوهيمي الأكثر حصرية في الغردقة. تم تصميم جزيرة بيانكا للمسافرين النخبة، وتقدم تجربة نادي شاطئي ممتاز في وسط البحر الأحمر. استرخِ على كراسي الاستلقاء للتشمس الفخمة واستمتع بالموسيقى الهادئة."
  },
  "diving": {
    en: "Dive into the vibrant underwater world of the Red Sea, recognized globally as one of the best scuba diving destinations. Whether you are a complete beginner or a seasoned diver, our PADI-certified instructors provide a safe, exhilarating experience. We take you to two distinct dive sites famous for their pristine coral gardens, exotic marine life, and excellent visibility. All premium diving equipment is included, alongside a freshly prepared lunch on the boat.",
    ar: "اغص في العالم النابض بالحياة تحت الماء في البحر الأحمر، المعترف به عالميًا كواحد من أفضل وجهات الغوص. سواء كنت مبتدئًا تمامًا أو غواصًا متمرسًا، يوفر مدربونا المعتمدون من PADI تجربة آمنة ومثيرة."
  },
  "luxor": {
    en: "Journey back in time with a full-day excursion from Hurghada to Luxor, the world's greatest open-air museum. Accompanied by an expert Egyptologist guide, you will explore the awe-inspiring Karnak Temple complex, marvel at the colossal statues of Memnon, and descend into the ancient tombs of the Valley of the Kings. We also visit the breathtaking Temple of Hatshepsut. Enjoy a relaxing felucca ride across the Nile River and a traditional Egyptian lunch.",
    ar: "سافر عبر الزمن في رحلة ليوم كامل من الغردقة إلى الأقصر، أعظم متحف مفتوح في العالم. برفقة مرشد سياحي خبير في علم المصريات، ستستكشف مجمع معابد الكرنك المذهل، وتتعجب من تماثيل ممنون الضخمة، وتنزل إلى المقابر القديمة في وادي الملوك."
  },
  "pyramids": {
    en: "Embark on an unforgettable day trip from Hurghada to Cairo to witness the last remaining Wonder of the Ancient World. Stand in the shadow of the Great Pyramids of Giza and come face-to-face with the enigmatic Sphinx. Our comprehensive tour also includes a visit to the Egyptian Museum in Tahrir Square, home to thousands of priceless artifacts including the treasures of King Tutankhamun. Travel comfortably in a climate-controlled vehicle with an expert historical guide.",
    ar: "انطلق في رحلة نهارية لا تُنسى من الغردقة إلى القاهرة لمشاهدة العجيبة الأخيرة المتبقية من العالم القديم. قف في ظل أهرامات الجيزة الكبرى وتعرّف على أبو الهول الغامض. تشمل جولتنا الشاملة أيضًا زيارة المتحف المصري."
  },
  "safari-stars": {
    en: "Experience the magic of the Sahara at night with our Safari Under the Stars. This unique adventure takes you deep into the Eastern Desert in a 4x4 Jeep. Away from the city lights, you'll be treated to a mesmerizing stargazing session led by a professional astronomy guide using high-powered telescopes. The evening includes an authentic Bedouin dinner, traditional tea, and the serene silence of the nocturnal desert.",
    ar: "جرب سحر الصحراء ليلاً مع سفاري تحت النجوم. تأخذك هذه المغامرة الفريدة في عمق الصحراء الشرقية في سيارة جيب دفع رباعي. بعيدًا عن أضواء المدينة، ستستمتع بجلسة مراقبة النجوم الرائعة بقيادة مرشد فلكي محترف."
  },
  "hula-hula": {
    en: "Hula Hula Beach Island is your go-to destination for tropical fun and energetic vibes in the Red Sea. Located on Giftun Island, it features lively music, vibrant decor, and iconic water swings perfect for your social media feed. Our tour includes an exciting boat cruise, top-tier snorkeling stops to admire the colorful marine life, and a vibrant island party atmosphere. A buffet lunch and unlimited soft drinks are provided.",
    ar: "جزيرة هولا هولا بيتش هي وجهتك المفضلة للمتعة الاستوائية والأجواء المليئة بالطاقة في البحر الأحمر. تقع في جزيرة الجفتون، وتتميز بالموسيقى الحية والديكور النابض بالحياة وأراجيح المياه المذهلة."
  },
  "nefertari": {
    en: "Explore the Red Sea's majestic coral reefs without getting wet aboard the Nefertari Luxury Submarine. Styled like an ancient Egyptian vessel, this semi-submarine features an underwater observation deck with large panoramic windows. It's the perfect family-friendly excursion, allowing guests of all ages to marvel at the colorful fish and stunning corals. The trip also includes a dedicated snorkeling stop for those who want to jump into the warm waters.",
    ar: "استكشف الشعاب المرجانية المهيبة في البحر الأحمر دون أن تبتل على متن غواصة نفرتاري الفاخرة. تتميز هذه الغواصة شبه الغاطسة والمصممة على شكل سفينة مصرية قديمة، بمنصة مراقبة تحت الماء بنوافذ بانورامية كبيرة."
  },
  "parasailing": {
    en: "Soar high above the Red Sea and experience the ultimate adrenaline rush with our Parasailing Adventure. Fly solo or tandem up to 60 meters in the air, enjoying breathtaking bird's-eye views of Hurghada's coastline, the marina, and the endless turquoise waters. Our certified instructors ensure the highest safety standards, providing a smooth take-off and landing directly from the custom-built speedboat. No previous experience is required for this unforgettable flight.",
    ar: "حلق عالياً فوق البحر الأحمر واختبر أقصى درجات الإثارة مع مغامرة الباراسيلينج. طر بمفردك أو بشكل مزدوج على ارتفاع يصل إلى 60 مترًا، واستمتع بمناظر بانورامية خلابة لساحل الغردقة."
  },
  "mini-safari": {
    en: "Short on time but craving adventure? Our Mini Desert Quad Trek is a fast-paced, 3-hour thrill ride through the rugged Hurghada dunes. Master the controls of a powerful quad bike and race across the sandy terrain, feeling the wind and the adrenaline. This excursion includes a brief stop at a Bedouin tent for traditional tea and a chance to take stunning desert photographs, making it a perfect quick escape.",
    ar: "هل وقتك ضيق ولكنك تتوق إلى المغامرة؟ رحلة ميني سفاري بالدراجات الرباعية هي رحلة مثيرة وسريعة الوتيرة لمدة 3 ساعات عبر الكثبان الرملية الوعرة في الغردقة. انطلق عبر التضاريس الرملية واستمتع بشاي البدو التقليدي."
  },
  "city-tour": {
    en: "Discover the vibrant culture and history of Hurghada with our comprehensive City Sightseeing Tour. Accompanied by a knowledgeable local guide, you will visit the majestic El Mina Mosque, explore the bustling traditional fish market, and wander through the modern Hurghada New Marina. The tour also includes time for souvenir shopping in the old town (Dahar), giving you a genuine taste of everyday Egyptian life along the Red Sea.",
    ar: "اكتشف الثقافة النابضة بالحياة وتاريخ الغردقة من خلال جولتنا الشاملة لمشاهدة معالم المدينة. برفقة مرشد محلي مطلع، ستزور مسجد الميناء المهيب، وتستكشف سوق الأسماك التقليدي الصاخب، وتتجول في مارينا الغردقة الجديدة."
  },
  "camel-riding": {
    en: "Connect with Egypt's ancient heritage on a traditional Camel Trek through the Eastern Desert. Experience the gentle sway of the 'Ship of the Desert' as you traverse the golden sands near Hurghada. This peaceful excursion is perfect for families and couples, offering unique photo opportunities, especially during the golden hour of sunset. You'll also learn about the bedouin culture and how they have trained and relied on camels for centuries.",
    ar: "تواصل مع التراث المصري القديم في رحلة تقليدية على الجمال عبر الصحراء الشرقية. استمتع بتجربة 'سفينة الصحراء' وأنت تعبر الرمال الذهبية بالقرب من الغردقة. هذه الرحلة الهادئة مثالية للعائلات وتوفر فرصًا فريدة لالتقاط الصور."
  },
  "horse-riding": {
    en: "Experience the thrill of horseback riding in one of the world's most scenic locations. Choose between a ride along the pristine Red Sea beach or an exploratory trek through the dramatic desert landscape. We match riders with beautiful, well-trained Arabian horses suited to their experience level, from absolute beginners to advanced equestrians. Riding along the shore at sunset is a truly magical and romantic experience you won't forget.",
    ar: "جرب إثارة ركوب الخيل في واحدة من أكثر المواقع الخلابة في العالم. اختر بين ركوب الخيل على طول شاطئ البحر الأحمر البكر أو رحلة استكشافية عبر المناظر الطبيعية الصحراوية الدرامية. نوفر خيولاً عربية أصيلة ومدربة تدريباً جيداً."
  },
  "spa": {
    en: "Rejuvenate your body and soul at our luxurious Ottoman Spa Sanctuary. Escape the sun and sand for a few hours of pure pampering. Our traditional Turkish Hammam experience includes a deep-cleansing full-body scrub, a soothing foam massage, and a relaxing session in the steam room and sauna. Followed by a professional hot oil massage, this wellness package will leave your skin glowing and your muscles completely relaxed.",
    ar: "جدد نشاط جسمك وروحك في ملاذ السبا العثماني الفاخر لدينا. اهرب من الشمس والرمال لبضع ساعات من الدلال الخالص. تشمل تجربة الحمام التركي التقليدي لدينا تقشيرًا عميقًا للجسم بالكامل، وتدليكًا مهدئًا بالرغوة."
  },
  "speed-boat": {
    en: "Take total control of your Red Sea itinerary with a Private Speed Boat Charter. This exclusive VIP experience allows you to skip the crowds and customize your own sea adventure. Visit secluded coral reefs, search for wild dolphins, or speed over to Giftun Island at your own pace. With a professional captain at your service, you'll enjoy ultimate privacy, luxury, and the freedom to explore the most beautiful hidden spots of Hurghada.",
    ar: "تحكم بشكل كامل في مسار رحلتك في البحر الأحمر من خلال استئجار قارب سريع خاص. تتيح لك هذه التجربة الحصرية لكبار الشخصيات تخطي الحشود وتخصيص مغامرتك البحرية الخاصة. قم بزيارة الشعاب المرجانية المنعزلة أو ابحث عن الدلافين البرية."
  },
  "airport-shuttle": {
    en: "Start and end your holiday with zero stress using our Premium Airport Shuttle service. We offer reliable, door-to-door private transfers between Hurghada International Airport and any hotel in Hurghada, El Gouna, Makadi Bay, or Sahl Hasheesh. Our modern, air-conditioned vehicles are driven by professional, English-speaking chauffeurs who track your flight status to ensure timely pickups, providing a seamless and comfortable travel experience.",
    ar: "ابدأ وانهِ عطلتك بدون أي ضغوط باستخدام خدمة نقل المطار الممتازة لدينا. نقدم انتقالات خاصة موثوقة من الباب إلى الباب بين مطار الغردقة الدولي وأي فندق في الغردقة، الجونة، مكادي باي، أو سهل حشيش."
  }
};

function renderSEOContent() {
  if (!document.querySelector('.trip-detail-page')) return;
  if (document.querySelector('.seo-expansion-v0')) return;
  const slug = location.pathname.split('/').pop().replace('.html','');
  const seo = SEO_TRIP_CONTENT[slug];
  if (!seo) return;

  const content = getLang(seo);
  if (!content) return;

  const target = document.querySelector('.trip-main-v0');
  if (!target) return;

  const seoSection = document.createElement('section');
  seoSection.className = 'content-box-v0 seo-expansion-v0';
  seoSection.innerHTML = `
    <h2 class="section-title-small-v0">${t('trip_overview')}</h2>
    <div class="seo-text-v0">${content}</div>
    <div class="seo-keywords-v0" style="display:none; visibility:hidden;">
      Hurghada tours, Red Sea excursions, best snorkeling Egypt, ${slug} trip price, Aquaway Tours booking
    </div>
  `;
  
  // Insert at the beginning of the main content
  target.prepend(seoSection);
}

// Hook into ComponentManager
if (typeof ComponentManager !== 'undefined') {
  const originalInit = ComponentManager.init;
  ComponentManager.init = function() {
    originalInit.apply(this, arguments);
    renderSEOContent();
  };
}
