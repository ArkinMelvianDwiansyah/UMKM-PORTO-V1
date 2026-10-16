/**
 * MANIS LAGI — Kafe Dessert, Pastry & Brunch (Portfolio #21)
 * Modern Vanilla JavaScript (Single Source of Truth, Zero Framework)
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. SINGLE SOURCE OF TRUTH (DATA PUSAT) ---
  const CAFE_DATA = {
    brandName: "Manis Lagi Dessert & Brunch",
    tagline: "Pastry Hangat, Dessert Manis & Sudut Foto Cantik di Senopati",
    phoneDisplay: "0812-9190-2121",
    phoneRaw: "6281291902121",
    email: "halo@manislagi.demo",
    address: "Jl. Senopati No. 42, Selong, Kebayoran Baru, Jakarta Selatan 12110",
    mapsUrl: "https://maps.google.com/?q=Senopati+Kebayoran+Baru+Jakarta+Selatan",
    hoursWeekdays: "Senin – Jumat: 08.00 – 21.00 WIB",
    hoursWeekends: "Sabtu – Minggu: 07.30 – 22.00 WIB",
    socials: {
      instagram: "https://instagram.com/manislagi.demo",
      tiktok: "https://tiktok.com/@manislagi.demo",
      youtube: "https://youtube.com/@manislagi.demo"
    },
    currentYear: new Date().getFullYear()
  };

  // Render dynamic values
  document.querySelectorAll('.dynamic-year').forEach(el => el.textContent = CAFE_DATA.currentYear);
  document.querySelectorAll('.data-phone').forEach(el => el.textContent = CAFE_DATA.phoneDisplay);
  document.querySelectorAll('.data-address').forEach(el => el.textContent = CAFE_DATA.address);
  document.querySelectorAll('.data-hours-weekdays').forEach(el => el.textContent = CAFE_DATA.hoursWeekdays);
  document.querySelectorAll('.data-hours-weekends').forEach(el => el.textContent = CAFE_DATA.hoursWeekends);
  document.querySelectorAll('.data-email').forEach(el => {
    el.textContent = CAFE_DATA.email;
    if (el.tagName === 'A') el.href = `mailto:${CAFE_DATA.email}`;
  });

  // --- 2. STICKY NAVBAR & SCROLL-SPY ---
  const navbar = document.querySelector('.navbar-sticky');
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    let currentId = '';
    const scrollPosition = window.scrollY + 180;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }, { passive: true });

  // --- 3. MOBILE DRAWER NAVIGATION ---
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const drawerLinks = document.querySelectorAll('.drawer-link, .drawer-footer a');

  function openDrawer() {
    mobileDrawer?.classList.add('open');
    drawerOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer?.classList.remove('open');
    drawerOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburgerBtn?.addEventListener('click', openDrawer);
  closeDrawerBtn?.addEventListener('click', closeDrawer);
  drawerOverlay?.addEventListener('click', closeDrawer);
  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

  // --- 4. HERO SECTION INTERACTIVE MULTI-SLIDE SLIDER ---
  const heroSlider = document.getElementById('heroSlider');
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.slider-dot');
  const heroCurrentNum = document.getElementById('heroSlideCurrent');
  const heroPrevBtn = document.getElementById('heroSlidePrev');
  const heroNextBtn = document.getElementById('heroSlideNext');
  let currentHeroSlide = 0;
  let heroInterval = null;

  function showHeroSlide(index) {
    if (!heroSlides.length) return;
    if (index >= heroSlides.length) index = 0;
    if (index < 0) index = heroSlides.length - 1;

    currentHeroSlide = index;
    heroSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentHeroSlide);
    });

    heroDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentHeroSlide);
    });

    if (heroCurrentNum) {
      heroCurrentNum.textContent = String(currentHeroSlide + 1).padStart(2, '0');
    }
  }

  function nextHeroSlide() {
    showHeroSlide(currentHeroSlide + 1);
  }

  function prevHeroSlide() {
    showHeroSlide(currentHeroSlide - 1);
  }

  function startHeroAutoplay() {
    stopHeroAutoplay();
    heroInterval = setInterval(nextHeroSlide, 4500);
  }

  function stopHeroAutoplay() {
    if (heroInterval) {
      clearInterval(heroInterval);
      heroInterval = null;
    }
  }

  heroPrevBtn?.addEventListener('click', () => {
    prevHeroSlide();
    startHeroAutoplay();
  });

  heroNextBtn?.addEventListener('click', () => {
    nextHeroSlide();
    startHeroAutoplay();
  });

  heroDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetIndex = parseInt(dot.getAttribute('data-slide') || '0', 10);
      showHeroSlide(targetIndex);
      startHeroAutoplay();
    });
  });

  heroSlider?.addEventListener('mouseenter', stopHeroAutoplay);
  heroSlider?.addEventListener('mouseleave', startHeroAutoplay);

  // Touch Swipe for Hero Slider
  let heroTouchStartX = 0;
  let heroTouchEndX = 0;

  heroSlider?.addEventListener('touchstart', (e) => {
    stopHeroAutoplay();
    heroTouchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  heroSlider?.addEventListener('touchend', (e) => {
    heroTouchEndX = e.changedTouches[0].screenX;
    if (heroTouchEndX < heroTouchStartX - 40) {
      nextHeroSlide();
    } else if (heroTouchEndX > heroTouchStartX + 40) {
      prevHeroSlide();
    }
    startHeroAutoplay();
  }, { passive: true });

  startHeroAutoplay();

  // --- 5. VIDEO SPOTLIGHT SWITCHER (#tentang) ---
  const videoElement = document.getElementById('bakingVideo');
  const videoSwitchBtns = document.querySelectorAll('.video-switch-btn');

  videoSwitchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetSrc = btn.getAttribute('data-video');
      if (!targetSrc || !videoElement) return;

      videoSwitchBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (videoElement.src !== targetSrc) {
        videoElement.src = targetSrc;
        videoElement.play().catch(() => {});
      }
    });
  });

  // --- 6. SPOT FOTO FILTER TABS (#galeri) ---
  const filterBtns = document.querySelectorAll('.galeri-filter-btn');
  const galeriItems = document.querySelectorAll('.galeri-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter') || 'all';

      galeriItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filterVal === 'all' || cat === filterVal) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // --- 7. SPOT FOTO LIGHTBOX MODAL (#galeri) ---
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');

  galeriItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.galeri-item-title')?.textContent || '';
      const sub = item.querySelector('.galeri-item-sub')?.textContent || '';

      if (lightboxImg && img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
      }
      if (lightboxCaption) {
        lightboxCaption.innerHTML = `<strong>${title}</strong><br><span style="font-size:0.875rem; color:#FFD6A5;">${sub}</span>`;
      }
      lightboxModal?.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightboxModal?.classList.remove('active');
    document.body.style.overflow = '';
  }

  lightboxCloseBtn?.addEventListener('click', closeLightbox);
  lightboxModal?.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });

  // --- 8. TESTIMONI CAROUSEL SLIDER (8 ULASAN BERKELAS) ---
  const testiTrack = document.getElementById('testiTrack');
  const testiCards = document.querySelectorAll('.testimoni-card');
  const testiPrevBtn = document.getElementById('testiPrevBtn');
  const testiNextBtn = document.getElementById('testiNextBtn');
  const testiDotsRow = document.getElementById('testiDotsRow');
  const testiWrap = document.getElementById('testiCarouselWrap');

  let currentTestiIndex = 0;
  let testiInterval = null;

  function getCardsPerView() {
    const w = window.innerWidth;
    if (w <= 820) return 1;
    if (w <= 1080) return 2;
    return 3;
  }

  function getMaxTestiIndex() {
    const cardsPerView = getCardsPerView();
    return Math.max(0, testiCards.length - cardsPerView);
  }

  function renderTestiDots() {
    if (!testiDotsRow) return;
    testiDotsRow.innerHTML = '';
    const maxIndex = getMaxTestiIndex();
    const totalDots = maxIndex + 1;

    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = `testi-dot ${i === currentTestiIndex ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Ke ulasan ${i + 1}`);
      dot.addEventListener('click', () => {
        currentTestiIndex = i;
        updateTestiSlider();
        startTestiAutoplay();
      });
      testiDotsRow.appendChild(dot);
    }
  }

  function updateTestiSlider() {
    if (!testiTrack || !testiCards.length) return;
    const maxIndex = getMaxTestiIndex();
    if (currentTestiIndex > maxIndex) currentTestiIndex = maxIndex;
    if (currentTestiIndex < 0) currentTestiIndex = 0;

    const firstCard = testiCards[0];
    const cardRect = firstCard.getBoundingClientRect();
    const gap = 24;
    const moveAmount = (cardRect.width + gap) * currentTestiIndex;

    testiTrack.style.transform = `translateX(-${moveAmount}px)`;

    const dots = testiDotsRow?.querySelectorAll('.testi-dot');
    dots?.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentTestiIndex);
    });
  }

  function nextTesti() {
    const maxIndex = getMaxTestiIndex();
    if (currentTestiIndex >= maxIndex) {
      currentTestiIndex = 0;
    } else {
      currentTestiIndex++;
    }
    updateTestiSlider();
  }

  function prevTesti() {
    const maxIndex = getMaxTestiIndex();
    if (currentTestiIndex <= 0) {
      currentTestiIndex = maxIndex;
    } else {
      currentTestiIndex--;
    }
    updateTestiSlider();
  }

  function startTestiAutoplay() {
    stopTestiAutoplay();
    testiInterval = setInterval(nextTesti, 5000);
  }

  function stopTestiAutoplay() {
    if (testiInterval) {
      clearInterval(testiInterval);
      testiInterval = null;
    }
  }

  testiPrevBtn?.addEventListener('click', () => {
    prevTesti();
    startTestiAutoplay();
  });

  testiNextBtn?.addEventListener('click', () => {
    nextTesti();
    startTestiAutoplay();
  });

  testiWrap?.addEventListener('mouseenter', stopTestiAutoplay);
  testiWrap?.addEventListener('mouseleave', startTestiAutoplay);

  // Touch Swipe for Testimonials
  let testiTouchStartX = 0;
  let testiTouchEndX = 0;

  testiWrap?.addEventListener('touchstart', (e) => {
    stopTestiAutoplay();
    testiTouchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  testiWrap?.addEventListener('touchend', (e) => {
    testiTouchEndX = e.changedTouches[0].screenX;
    if (testiTouchEndX < testiTouchStartX - 40) {
      nextTesti();
    } else if (testiTouchEndX > testiTouchStartX + 40) {
      prevTesti();
    }
    startTestiAutoplay();
  }, { passive: true });

  window.addEventListener('resize', () => {
    renderTestiDots();
    updateTestiSlider();
  });

  renderTestiDots();
  updateTestiSlider();
  startTestiAutoplay();

  // --- 9. FAQ ACCORDION (#faq) ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    questionBtn?.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          other.querySelector('.faq-question-btn')?.setAttribute('aria-expanded', 'false');
        }
      });
      if (isOpen) {
        item.classList.remove('active');
        questionBtn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // --- 10. FORM RESERVASI MEJA -> WHATSAPP COMPILER (#kontak) ---
  const kontakForm = document.getElementById('kontakForm');
  kontakForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const nama = document.getElementById('formNama')?.value.trim();
    const kontak = document.getElementById('formKontak')?.value.trim();
    const tamu = document.getElementById('formTamu')?.value;
    const tanggal = document.getElementById('formTanggal')?.value || 'Hari Ini';
    const jam = document.getElementById('formJam')?.value || '14:00';
    const acara = document.getElementById('formAcara')?.value;
    const catatan = document.getElementById('formCatatan')?.value.trim();

    if (!nama || !kontak) {
      alert('Mohon isi nama dan nomor WhatsApp Anda.');
      return;
    }

    const textLines = [
      `Halo Manis Lagi Senopati, saya mau reservasi meja kafe:`,
      `• Nama Tamu: ${nama}`,
      `• No. WhatsApp: ${kontak}`,
      `• Jumlah Orang: ${tamu}`,
      `• Rencana Kedatangan: ${tanggal} pk ${jam} WIB`,
      `• Keperluan: ${acara}`,
      `• Catatan Khusus: ${catatan || 'Tidak ada'}`,
      ``,
      `[Dikirim via form website manislagi.demo]`
    ];

    const waUrl = `https://wa.me/${CAFE_DATA.phoneRaw}?text=${encodeURIComponent(textLines.join('\n'))}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  });

  // --- 11. LEGAL MODALS (Syarat & Privasi) ---
  const termsBtn = document.getElementById('termsModalBtn');
  const privacyBtn = document.getElementById('privacyModalBtn');
  const termsModal = document.getElementById('termsModal');
  const privacyModal = document.getElementById('privacyModal');
  const closeTermsBtn = document.getElementById('closeTermsBtn');
  const closePrivacyBtn = document.getElementById('closePrivacyBtn');
  const closeTermsFooterBtn = document.getElementById('closeTermsFooterBtn');
  const closePrivacyFooterBtn = document.getElementById('closePrivacyFooterBtn');

  function openModal(modal) {
    modal?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    modal?.classList.remove('active');
    document.body.style.overflow = '';
  }

  termsBtn?.addEventListener('click', (e) => { e.preventDefault(); openModal(termsModal); });
  privacyBtn?.addEventListener('click', (e) => { e.preventDefault(); openModal(privacyModal); });
  closeTermsBtn?.addEventListener('click', () => closeModal(termsModal));
  closeTermsFooterBtn?.addEventListener('click', () => closeModal(termsModal));
  closePrivacyBtn?.addEventListener('click', () => closeModal(privacyModal));
  closePrivacyFooterBtn?.addEventListener('click', () => closeModal(privacyModal));

  [termsModal, privacyModal].forEach(modal => {
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeModal(termsModal);
      closeModal(privacyModal);
      closeDrawer();
    }
  });
});
