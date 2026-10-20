/* ==========================================================================
   ANGKUTIN — Jasa Pindahan Rumah, Kos & Kantor + Sewa Armada (Portfolio #26)
   Interactive Scripts: Nav, Fleet Estimator, Video Switcher, Modals, Lightbox, WA Form
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

  // --- 4. INTERACTIVE FLEET SELECTOR & ESTIMATOR ---
  const fleetData = {
    pickup: {
      name: 'Grand Max Pick-Up Bak',
      capacity: '1.000 kg',
      volume: '4.5 m³',
      dim: '2.3 x 1.5 x 1.3 m',
      basePrice: 250000,
      image: 'assets/images/fleet-pickup.jpg',
      ideal: 'Kosan, kasur no.1, lemari 2 pintu, kulkas 1 pintu & 5-8 kardus.'
    },
    blindvan: {
      name: 'Daihatsu Blind Van Tertutup',
      capacity: '1.200 kg',
      volume: '5.2 m³',
      dim: '2.4 x 1.4 x 1.4 m',
      basePrice: 320000,
      image: 'assets/images/fleet-blindvan.jpg',
      ideal: 'Aman 100% hujan/panas: pakaian distro, alat elektronik, katering & event.'
    },
    engkel: {
      name: 'Truk Engkel Box CDE (4 Roda)',
      capacity: '2.500 kg',
      volume: '10.0 m³',
      dim: '3.1 x 1.6 x 1.7 m',
      basePrice: 750000,
      image: 'assets/images/truck-cdd.jpg',
      ideal: 'Pindahan rumah 1-2 kamar, springbed king, sofa set 3-2-1 & kulkas 2 pintu.'
    },
    double: {
      name: 'Truk Double Box CDD (6 Roda)',
      capacity: '5.000 kg',
      volume: '20.0 m³',
      dim: '4.3 x 2.0 x 2.0 m',
      basePrice: 1450000,
      image: 'assets/images/truck-fuso.jpg',
      ideal: 'Rumah 2 lantai, kantor 15 staf, ruko & pengiriman muatan berat antar kota.'
    }
  };

  const fleetTabs = document.querySelectorAll('.fleet-tab-btn');
  const fleetPreviewImg = document.getElementById('fleetPreviewImg');
  const specCapacity = document.getElementById('specCapacity');
  const specVolume = document.getElementById('specVolume');
  const specDim = document.getElementById('specDim');
  const calcRoute = document.getElementById('calcRoute');
  const calcHelper = document.getElementById('calcHelper');
  const summaryFleetName = document.getElementById('summaryFleetName');
  const summaryRouteName = document.getElementById('summaryRouteName');
  const summaryHelperName = document.getElementById('summaryHelperName');
  const totalEstimateDisplay = document.getElementById('totalEstimateDisplay');
  const btnBookFleet = document.getElementById('btnBookFleet');

  let currentFleetKey = 'pickup';

  function formatIDR(num) {
    return 'Rp ' + num.toLocaleString('id-ID');
  }

  function updateFleetCalculator() {
    const fleet = fleetData[currentFleetKey];
    if (!fleet) return;

    // Update visuals & specs
    if (fleetPreviewImg) fleetPreviewImg.src = fleet.image;
    if (specCapacity) specCapacity.textContent = fleet.capacity;
    if (specVolume) specVolume.textContent = fleet.volume;
    if (specDim) specDim.textContent = fleet.dim;

    // Route multiplier / addition
    const routeVal = calcRoute ? calcRoute.value : 'dalam-kota';
    let routeAdd = 0;
    let routeText = 'Dalam Kota (s/d 20 km)';

    if (routeVal === 'jabodetabek') {
      routeAdd = currentFleetKey === 'double' ? 450000 : (currentFleetKey === 'engkel' ? 300000 : 150000);
      routeText = 'Antar Kota Jabodetabek';
    } else if (routeVal === 'luar-kota') {
      routeAdd = currentFleetKey === 'double' ? 1400000 : (currentFleetKey === 'engkel' ? 950000 : 650000);
      routeText = 'Luar Kota / Antar Provinsi';
    }

    // Helper addition
    const helperVal = calcHelper ? parseInt(calcHelper.value, 10) : 1;
    let helperAdd = 0;
    let helperText = 'Tanpa Helper (Driver Saja)';

    if (helperVal === 1) {
      helperAdd = 100000;
      helperText = '+1 Helper Bongkar Muat';
    } else if (helperVal === 2) {
      helperAdd = 200000;
      helperText = '+2 Helper Bongkar Muat';
    }

    const total = fleet.basePrice + routeAdd + helperAdd;

    // Update summary text
    if (summaryFleetName) summaryFleetName.textContent = fleet.name;
    if (summaryRouteName) summaryRouteName.textContent = routeText;
    if (summaryHelperName) summaryHelperName.textContent = helperText;
    if (totalEstimateDisplay) totalEstimateDisplay.textContent = formatIDR(total);

    // Update CTA link
    if (btnBookFleet) {
      const waMsg = `Halo Admin ANGKUTIN, saya ingin booking armada dari website:\n\n• Armada: ${fleet.name}\n• Rute: ${routeText}\n• Tenaga Helper: ${helperText}\n• Estimasi Biaya: ${formatIDR(total)}\n\nMohon info ketersediaan armada dan jadwalnya. Terima kasih!`;
      btnBookFleet.href = `https://wa.me/6281234567890?text=${encodeURIComponent(waMsg)}`;
    }
  }

  fleetTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      fleetTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFleetKey = tab.getAttribute('data-fleet') || 'pickup';
      updateFleetCalculator();
    });
  });

  calcRoute?.addEventListener('change', updateFleetCalculator);
  calcHelper?.addEventListener('change', updateFleetCalculator);
  updateFleetCalculator();

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

  // --- 7. BOOKING & CONTACT FORM (WA INTEGRATION) ---
  const bookingForm = document.getElementById('bookingForm');
  bookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('bookName')?.value.trim();
    const phone = document.getElementById('bookPhone')?.value.trim();
    const serviceType = document.getElementById('bookServiceType')?.value;
    const fleetChoice = document.getElementById('bookFleet')?.value;
    const origin = document.getElementById('bookOrigin')?.value.trim();
    const destination = document.getElementById('bookDestination')?.value.trim();
    const moveDate = document.getElementById('bookDate')?.value;
    const notes = document.getElementById('bookNotes')?.value.trim();

    if (!name || !phone || !origin || !destination) {
      alert('Mohon lengkapi Nama, WhatsApp, Alamat Asal, dan Alamat Tujuan.');
      return;
    }

    const message = `Halo ANGKUTIN, saya ingin memesan jasa pindahan / armada:\n\n` +
      `• Nama: ${name}\n` +
      `• No. WhatsApp: ${phone}\n` +
      `• Jenis Pindahan: ${serviceType}\n` +
      `• Pilihan Armada: ${fleetChoice}\n` +
      `• Alamat Asal: ${origin}\n` +
      `• Alamat Tujuan: ${destination}\n` +
      `• Rencana Tanggal: ${moveDate || 'Menyusul'}\n` +
      `• Catatan Barang / Kebutuhan: ${notes || '-'}\n\n` +
      `Mohon info ketersediaan slot armada dan konfirmasi penawarannya. Terima kasih!`;

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

  // ESC key to close any active modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeLegalModals();
      closeDrawer();
    }
  });
});
