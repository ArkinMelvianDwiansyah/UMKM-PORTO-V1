/**
 * LENSA HENING — Studio Foto & Video Sinematik (Portfolio #20)
 * Modern Vanilla JavaScript (Single Source of Truth, Zero Framework)
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. SINGLE SOURCE OF TRUTH (DATA PUSAT) ---
  const STUDIO_DATA = {
    brandName: "Lensa Hening Studio",
    tagline: "Fotografi & Sinematografi Visual Berjiwa di Jakarta",
    phoneDisplay: "0812-9190-2020",
    phoneRaw: "6281291902020",
    email: "halo@lensahening.demo",
    address: "Jl. Benda Raya No. 14A, Kemang, Cilandak Timur, Jakarta Selatan 12560",
    mapsUrl: "https://maps.google.com/?q=Benda+Raya+Kemang+Jakarta+Selatan",
    hoursWeekdays: "Senin – Jumat: 09.00 – 20.00 WIB",
    hoursWeekends: "Sabtu – Minggu: 08.00 – 21.00 WIB (Sesuai Reservasi)",
    socials: {
      instagram: "https://instagram.com/lensahening.demo",
      vimeo: "https://vimeo.com/lensahening.demo",
      youtube: "https://youtube.com/@lensahening.demo"
    },
    currentYear: new Date().getFullYear()
  };

  // Render dynamic values to ensure zero data discrepancy
  document.querySelectorAll('.dynamic-year').forEach(el => el.textContent = STUDIO_DATA.currentYear);
  document.querySelectorAll('.data-phone').forEach(el => el.textContent = STUDIO_DATA.phoneDisplay);
  document.querySelectorAll('.data-address').forEach(el => el.textContent = STUDIO_DATA.address);
  document.querySelectorAll('.data-hours-weekdays').forEach(el => el.textContent = STUDIO_DATA.hoursWeekdays);
  document.querySelectorAll('.data-hours-weekends').forEach(el => el.textContent = STUDIO_DATA.hoursWeekends);
  document.querySelectorAll('.data-email').forEach(el => {
    el.textContent = STUDIO_DATA.email;
    if (el.tagName === 'A') el.href = `mailto:${STUDIO_DATA.email}`;
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
  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

  // --- 4. GALERI FILTER & LIGHTBOX MODAL (#galeri) ---
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
        lightboxCaption.innerHTML = `<strong>${title}</strong> &bull; ${cat}`;
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

  // --- 5. FAQ ACCORDION (#faq) ---
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

  // --- 6. FORM KONTAK -> WHATSAPP COMPILER (#kontak) ---
  const kontakForm = document.getElementById('kontakForm');
  kontakForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const nama = document.getElementById('formNama')?.value.trim();
    const kontak = document.getElementById('formKontak')?.value.trim();
    const paket = document.getElementById('formPaket')?.value;
    const tanggal = document.getElementById('formTanggal')?.value || 'Menyesuaikan';
    const catatan = document.getElementById('formCatatan')?.value.trim();

    if (!nama || !kontak) {
      alert('Mohon isi nama dan kontak Anda.');
      return;
    }

    const textLines = [
      `Halo Lensa Hening Studio, saya ingin konsultasi booking sesi foto/video:`,
      `• Nama: ${nama}`,
      `• Kontak (WA/Email): ${kontak}`,
      `• Pilihan Paket: ${paket}`,
      `• Estimasi Tanggal: ${tanggal}`,
      `• Detail Konsep/Kebutuhan: ${catatan || '-'}`,
      ``,
      `[Dikirim via formulir resmi website lensahening.demo]`
    ];

    const waUrl = `https://wa.me/${STUDIO_DATA.phoneRaw}?text=${encodeURIComponent(textLines.join('\n'))}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  });

  // --- 7. LEGAL MODALS (Syarat & Privasi) ---
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
