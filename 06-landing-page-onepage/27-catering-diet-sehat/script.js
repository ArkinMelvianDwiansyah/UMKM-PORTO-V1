/* ==========================================================================
   VITAL MEALS — Healthy Diet & Meal Prep Catering (Portfolio #27)
   Interactive Scripts: Nav, Daily Menu Rotation, Video Switcher, Modals, Lightbox, WA Form
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. STICKY HEADER & ACTIVE NAV ---
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    let current = '';
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // --- 2. MOBILE DRAWER ---
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerCloseBtn = document.querySelector('.drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-links a');

  function openDrawer() {
    mobileDrawer?.classList.add('open');
    drawerBackdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer?.classList.remove('open');
    drawerBackdrop?.classList.remove('active');
    document.body.style.overflow = '';
  }

  mobileMenuBtn?.addEventListener('click', openDrawer);
  drawerCloseBtn?.addEventListener('click', closeDrawer);
  drawerBackdrop?.addEventListener('click', closeDrawer);
  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

  // --- 3. VIDEO SWITCHER SPOTLIGHT ---
  const videoPlayer = document.getElementById('mainVideoPlayer');
  const videoTabs = document.querySelectorAll('.video-tab-btn');

  videoTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      videoTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const videoSrc = tab.getAttribute('data-video');
      if (videoPlayer && videoSrc) {
        videoPlayer.src = videoSrc;
        videoPlayer.play().catch(e => console.log('Autoplay prevented:', e));
      }
    });
  });

  // --- 4. DAILY MENU ROTATION & MACROS ---
  const weeklyMenu = {
    senin: {
      day: 'Senin',
      title: 'Grilled Norwegian Salmon & Herb Quinoa',
      desc: 'Fillet salmon Norwegia panggang disajikan dengan saus lemon dill segar, quinoa organik tinggi serat, dan tumis asparagus wortel baby.',
      calories: '420',
      protein: '38g',
      carbs: '32g',
      fat: '14g',
      image: 'assets/images/diet-salmon.jpg'
    },
    selasa: {
      day: 'Selasa',
      title: 'Roast Beef Sirloin & Mashed Sweet Potato',
      desc: 'Daging sapi sirloin Australia lembut dimarinasi rempah rosemary, dipadu pure ubi ungu alami tanpa mentega, dan buncis kukus garing.',
      calories: '460',
      protein: '42g',
      carbs: '35g',
      fat: '16g',
      image: 'assets/images/diet-beef.jpg'
    },
    rabu: {
      day: 'Rabu',
      title: 'Ayam Panggang Madu Lemon & Nasi Shirataki',
      desc: 'Dada ayam fillet panggang madu lemon mustard, dipadu nasi shirataki zero calorie, brokoli kukus bawang putih, dan tomat ceri.',
      calories: '390',
      protein: '36g',
      carbs: '28g',
      fat: '12g',
      image: 'assets/images/diet-chicken.jpg'
    },
    kamis: {
      day: 'Kamis',
      title: 'Fillet Kakap Bakar Sambal Dabu & Nasi Merah',
      desc: 'Fillet kakap putih bakar bumbu rempah kunyit, siraman dabu-dabu segar dengan extra virgin olive oil, dan nasi merah organik pulen.',
      calories: '410',
      protein: '40g',
      carbs: '34g',
      fat: '11g',
      image: 'assets/images/diet-fish.jpg'
    },
    jumat: {
      day: 'Jumat',
      title: 'Healthy Chicken Teriyaki Bowl & Edamame',
      desc: 'Dada ayam tumis teriyaki alami zero gula pasir, disajikan dengan mangkok edamame Jepang, salad kubis ungu, dan saus wafu sesame.',
      calories: '430',
      protein: '39g',
      carbs: '36g',
      fat: '13g',
      image: 'assets/images/diet-bowl.jpg'
    }
  };

  const dayTabs = document.querySelectorAll('.day-tab-btn');
  const dishTitle = document.getElementById('dishTitle');
  const dishDesc = document.getElementById('dishDesc');
  const dishImg = document.getElementById('dishImg');
  const calVal = document.getElementById('calVal');
  const macroProtein = document.getElementById('macroProtein');
  const macroCarbs = document.getElementById('macroCarbs');
  const macroFat = document.getElementById('macroFat');
  const btnOrderDayMenu = document.getElementById('btnOrderDayMenu');

  function updateMenuDisplay(dayKey) {
    const item = weeklyMenu[dayKey];
    if (!item) return;

    if (dishTitle) dishTitle.textContent = item.title;
    if (dishDesc) dishDesc.textContent = item.desc;
    if (dishImg) dishImg.src = item.image;
    if (calVal) calVal.textContent = item.calories;
    if (macroProtein) macroProtein.textContent = item.protein;
    if (macroCarbs) macroCarbs.textContent = item.carbs;
    if (macroFat) macroFat.textContent = item.fat;

    if (btnOrderDayMenu) {
      const waMsg = `Halo Nutritionist VITAL MEALS, saya ingin langganan paket katering sehat dengan contoh menu ${item.day}: ${item.title} (${item.calories} kkal). Mohon konsultasi jadwal pengantaran. Terima kasih!`;
      btnOrderDayMenu.href = `https://wa.me/6281234567890?text=${encodeURIComponent(waMsg)}`;
    }
  }

  dayTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      dayTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const dayKey = tab.getAttribute('data-day') || 'senin';
      updateMenuDisplay(dayKey);
    });
  });

  updateMenuDisplay('senin');

  // --- 5. GALLERY LIGHTBOX ---
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.querySelector('.lightbox-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img && lightboxImg && lightboxModal) {
        lightboxImg.src = img.src;
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    lightboxModal?.classList.remove('active');
    document.body.style.overflow = '';
  }

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxModal?.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });

  // --- 6. FAQ ACCORDION ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question?.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });

  // --- 7. SUBSCRIPTION FORM (WA INTEGRATION) ---
  const subscribeForm = document.getElementById('subscribeForm');
  subscribeForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('subName')?.value.trim();
    const phone = document.getElementById('subPhone')?.value.trim();
    const program = document.getElementById('subProgram')?.value;
    const duration = document.getElementById('subDuration')?.value;
    const address = document.getElementById('subAddress')?.value.trim();
    const startDate = document.getElementById('subStartDate')?.value;
    const mealTime = document.getElementById('subMealTime')?.value;
    const notes = document.getElementById('subNotes')?.value.trim();

    if (!name || !phone || !address) {
      alert('Mohon lengkapi Nama, WhatsApp, dan Alamat Pengantaran.');
      return;
    }

    const message = `Halo VITAL MEALS, saya ingin berlangganan katering sehat:\n\n` +
      `• Nama Lengkap: ${name}\n` +
      `• No. WhatsApp: ${phone}\n` +
      `• Program Diet: ${program}\n` +
      `• Durasi Paket: ${duration}\n` +
      `• Waktu Pengantaran: ${mealTime}\n` +
      `• Mulai Pengantaran: ${startDate || 'Secepatnya'}\n` +
      `• Alamat Kirim: ${address}\n` +
      `• Catatan Alergi / Pantangan: ${notes || 'Tidak ada'}\n\n` +
      `Mohon info total invoice dan jadwal pengantaran. Terima kasih!`;

    const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  });

  // --- 8. LEGAL MODALS (TERMS & PRIVACY) ---
  const termsModal = document.getElementById('modalTerms');
  const privacyModal = document.getElementById('modalPrivacy');
  const openTermsBtn = document.getElementById('openTermsModal');
  const openPrivacyBtn = document.getElementById('openPrivacyModal');
  const modalCloseBtns = document.querySelectorAll('.legal-modal-close');

  function openLegalModal(modal) {
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeLegalModals() {
    termsModal?.classList.remove('active');
    privacyModal?.classList.remove('active');
    document.body.style.overflow = '';
  }

  openTermsBtn?.addEventListener('click', () => openLegalModal(termsModal));
  openPrivacyBtn?.addEventListener('click', () => openLegalModal(privacyModal));
  modalCloseBtns.forEach(btn => btn.addEventListener('click', closeLegalModals));

  [termsModal, privacyModal].forEach(modal => {
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) closeLegalModals();
    });
  });

  // ESC key to close active modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeLegalModals();
      closeDrawer();
    }
  });
});
