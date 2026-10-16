/**
 * SANGRAI & SEDUH — Artisan Coffee Roastery (Portfolio #19)
 * Modern Vanilla JavaScript (Single Source of Truth, Zero AI Slop, Zero Framework)
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. SINGLE SOURCE OF TRUTH (DATA PUSAT) ---
  const ROASTERY_DATA = {
    brandName: "Sangrai & Seduh Artisan Roastery",
    tagline: "Kurasi Biji Kopi Indonesia, Disangrai dengan Presisi & Rasa",
    phoneDisplay: "0812-9190-1926",
    phoneRaw: "6281291901926",
    email: "halo@sangraiseduh.demo",
    address: "Jl. Panglima Polim V No. 28, Melawai, Kebayoran Baru, Jakarta Selatan 12160",
    mapsUrl: "https://maps.google.com/?q=Panglima+Polim+Jakarta+Selatan",
    hoursWeekdays: "Senin – Jumat: 08.00 – 21.00 WIB",
    hoursWeekends: "Sabtu – Minggu: 07.00 – 22.00 WIB",
    socials: {
      instagram: "https://instagram.com/sangraiseduh.demo",
      tiktok: "https://tiktok.com/@sangraiseduh.demo",
      youtube: "https://youtube.com/@sangraiseduh.demo"
    },
    currentYear: new Date().getFullYear()
  };

  // Render dynamic values to ensure zero data discrepancy
  const yearEls = document.querySelectorAll('.dynamic-year');
  yearEls.forEach(el => el.textContent = ROASTERY_DATA.currentYear);

  const phoneEls = document.querySelectorAll('.data-phone');
  phoneEls.forEach(el => el.textContent = ROASTERY_DATA.phoneDisplay);

  const addressEls = document.querySelectorAll('.data-address');
  addressEls.forEach(el => el.textContent = ROASTERY_DATA.address);

  const hoursWeekdayEls = document.querySelectorAll('.data-hours-weekdays');
  hoursWeekdayEls.forEach(el => el.textContent = ROASTERY_DATA.hoursWeekdays);

  const hoursWeekendEls = document.querySelectorAll('.data-hours-weekends');
  hoursWeekendEls.forEach(el => el.textContent = ROASTERY_DATA.hoursWeekends);

  const emailEls = document.querySelectorAll('.data-email');
  emailEls.forEach(el => {
    el.textContent = ROASTERY_DATA.email;
    if (el.tagName === 'A') el.href = `mailto:${ROASTERY_DATA.email}`;
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

    // Scroll-Spy logic
    let currentId = '';
    const scrollPosition = window.scrollY + 160;

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

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // --- 4. BREW TABS SWITCHER (#menu-seduh) ---
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanes.forEach(p => {
        p.classList.remove('active');
        const video = p.querySelector('video');
        if (video) {
          video.pause();
        }
      });

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const activePane = document.getElementById(targetTab);
      if (activePane) {
        activePane.classList.add('active');
        const activeVideo = activePane.querySelector('video');
        if (activeVideo) {
          activeVideo.currentTime = 0;
          activeVideo.play().catch(() => {});
        }
      }
    });
  });

  // --- 5. GALERI FILTER & LIGHTBOX MODAL (#galeri) ---
  const filterBtns = document.querySelectorAll('.galeri-filter-btn');
  const galeriItems = document.querySelectorAll('.galeri-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');
      galeriItems.forEach(item => {
        const itemCat = item.getAttribute('data-cat');
        if (filterVal === 'all' || itemCat === filterVal) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  galeriItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.galeri-item-title')?.textContent || '';
      const cat = item.querySelector('.galeri-item-cat')?.textContent || '';

      if (lightboxImg && img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
      }
      if (lightboxCaption) {
        lightboxCaption.innerHTML = `<strong>${title}</strong> — ${cat}`;
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

  // --- 6. TESTIMONI CAROUSEL SLIDER (#testimoni) ---
  const carouselTrack = document.getElementById('reviewsCarouselTrack');
  const prevBtn = document.getElementById('carouselPrevBtn');
  const nextBtn = document.getElementById('carouselNextBtn');
  const dots = document.querySelectorAll('.carousel-dot');
  const counterCurrent = document.getElementById('carouselCurrent');
  const counterTotal = document.getElementById('carouselTotal');
  const reviewCards = document.querySelectorAll('.review-carousel-item');

  if (carouselTrack && reviewCards.length > 0) {
    if (counterTotal) {
      counterTotal.textContent = String(reviewCards.length).padStart(2, '0');
    }

    function getCardWidth() {
      const firstCard = reviewCards[0];
      const gap = 24;
      return firstCard ? firstCard.offsetWidth + gap : 360;
    }

    function updateCarouselState() {
      const scrollLeft = carouselTrack.scrollLeft;
      const cardWidth = getCardWidth();
      const activeIndex = Math.min(
        reviewCards.length - 1,
        Math.max(0, Math.round(scrollLeft / cardWidth))
      );

      if (counterCurrent) {
        counterCurrent.textContent = String(activeIndex + 1).padStart(2, '0');
      }

      dots.forEach((dot, idx) => {
        if (idx === activeIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });

      if (prevBtn) {
        prevBtn.disabled = scrollLeft <= 10;
      }
      if (nextBtn) {
        const maxScroll = carouselTrack.scrollWidth - carouselTrack.clientWidth - 10;
        nextBtn.disabled = scrollLeft >= maxScroll;
      }
    }

    prevBtn?.addEventListener('click', () => {
      carouselTrack.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
    });

    nextBtn?.addEventListener('click', () => {
      carouselTrack.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
    });

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index') || '0', 10);
        const targetCard = reviewCards[index];
        if (targetCard) {
          carouselTrack.scrollTo({
            left: targetCard.offsetLeft - carouselTrack.offsetLeft,
            behavior: 'smooth'
          });
        }
      });
    });

    carouselTrack.addEventListener('scroll', updateCarouselState, { passive: true });
    window.addEventListener('resize', updateCarouselState, { passive: true });

    updateCarouselState();
  }

  // --- 7. FAQ ACCORDION (#faq) ---
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    questionBtn?.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close other accordion items for clean single expansion
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

  // --- 7. KONTAK FORM -> WHATSAPP COMPILER (#kontak) ---
  const kontakForm = document.getElementById('kontakForm');

  kontakForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const nama = document.getElementById('formNama')?.value.trim();
    const kontak = document.getElementById('formKontak')?.value.trim();
    const topik = document.getElementById('formTopik')?.value;
    const pesan = document.getElementById('formPesan')?.value.trim();

    if (!nama || !pesan) {
      alert('Mohon isi nama dan pesan Anda sebelum mengirim.');
      return;
    }

    const textLines = [
      `Halo Sangrai & Seduh, saya ingin menghubungi tim roastery:`,
      `• Nama: ${nama}`,
      `• Kontak (WA/Email): ${kontak || '-'}`,
      `• Keperluan / Topik: ${topik}`,
      `• Pesan: ${pesan}`,
      ``,
      `[Dikirim melalui form kontak website sangraiseduh.demo]`
    ];

    const waUrl = `https://wa.me/${ROASTERY_DATA.phoneRaw}?text=${encodeURIComponent(textLines.join('\n'))}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  });

  // --- 8. LEGAL MODALS (Syarat & Privasi) ---
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

  termsBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(termsModal);
  });

  privacyBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(privacyModal);
  });

  closeTermsBtn?.addEventListener('click', () => closeModal(termsModal));
  closeTermsFooterBtn?.addEventListener('click', () => closeModal(termsModal));
  closePrivacyBtn?.addEventListener('click', () => closeModal(privacyModal));
  closePrivacyFooterBtn?.addEventListener('click', () => closeModal(privacyModal));

  [termsModal, privacyModal].forEach(modal => {
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeModal(termsModal);
      closeModal(privacyModal);
      closeDrawer();
    }
  });
});
