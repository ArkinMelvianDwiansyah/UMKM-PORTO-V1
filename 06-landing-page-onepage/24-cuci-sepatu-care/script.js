/**
 * SHOE LAB — Sneaker & Leather Care (Portfolio #24)
 * Interactive Script: Video Switcher, Before-After Slider, WA Generator, Drawer, Modals
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Drawer Navigation
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    mobileDrawer.classList.add('active');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);
  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

  // 2. Video Spotlight Switcher
  const videoPlayer = document.getElementById('shoeVideoPlayer');
  const videoBtns = document.querySelectorAll('.video-switch-btn');
  const videoWatermark = document.getElementById('videoWatermark');

  videoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      videoBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const newSrc = btn.getAttribute('data-video');
      const watermarkText = btn.getAttribute('data-watermark');

      if (videoPlayer && newSrc) {
        videoPlayer.src = newSrc;
        videoPlayer.play().catch(() => {});
      }
      if (videoWatermark && watermarkText) {
        videoWatermark.textContent = watermarkText;
      }
    });
  });

  // 3. Before & After Slider Interaktif
  const baWrapper = document.getElementById('baWrapper');
  const baAfterWrapper = document.getElementById('baAfterWrapper');
  const baHandle = document.getElementById('baHandle');
  const baAfterImg = document.getElementById('baAfterImg');

  let isDragging = false;

  function updateSliderPosition(x) {
    if (!baWrapper) return;
    const rect = baWrapper.getBoundingClientRect();
    let pos = (x - rect.left) / rect.width;
    if (pos < 0) pos = 0;
    if (pos > 1) pos = 1;

    const percentage = pos * 100;
    baAfterWrapper.style.width = `${percentage}%`;
    baHandle.style.left = `${percentage}%`;
  }

  if (baWrapper && baHandle) {
    // Mouse events
    baWrapper.addEventListener('mousedown', (e) => {
      isDragging = true;
      updateSliderPosition(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      updateSliderPosition(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch events for mobile
    baWrapper.addEventListener('touchstart', (e) => {
      isDragging = true;
      if (e.touches[0]) updateSliderPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      if (e.touches[0]) updateSliderPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    // Match image width on resize
    function syncAfterImgWidth() {
      if (baWrapper && baAfterImg) {
        baAfterImg.style.width = `${baWrapper.offsetWidth}px`;
      }
    }
    syncAfterImgWidth();
    window.addEventListener('resize', syncAfterImgWidth);
  }

  // Quick preset buttons for Before / After
  const btnShowBefore = document.getElementById('btnShowBefore');
  const btnShowMiddle = document.getElementById('btnShowMiddle');
  const btnShowAfter = document.getElementById('btnShowAfter');

  function setSliderPercentage(pct) {
    if (baAfterWrapper && baHandle) {
      baAfterWrapper.style.transition = 'width 0.4s ease';
      baHandle.style.transition = 'left 0.4s ease';
      baAfterWrapper.style.width = `${pct}%`;
      baHandle.style.left = `${pct}%`;
      setTimeout(() => {
        baAfterWrapper.style.transition = '';
        baHandle.style.transition = '';
      }, 400);
    }
  }

  if (btnShowBefore) {
    btnShowBefore.addEventListener('click', () => {
      setSliderPercentage(5);
      document.querySelectorAll('.ba-ctrl-btn').forEach(b => b.classList.remove('active'));
      btnShowBefore.classList.add('active');
    });
  }
  if (btnShowMiddle) {
    btnShowMiddle.addEventListener('click', () => {
      setSliderPercentage(50);
      document.querySelectorAll('.ba-ctrl-btn').forEach(b => b.classList.remove('active'));
      btnShowMiddle.classList.add('active');
    });
  }
  if (btnShowAfter) {
    btnShowAfter.addEventListener('click', () => {
      setSliderPercentage(95);
      document.querySelectorAll('.ba-ctrl-btn').forEach(b => b.classList.remove('active'));
      btnShowAfter.classList.add('active');
    });
  }

  // 4. Formulir Booking Antar-Jemput ke WhatsApp
  const kontakForm = document.getElementById('kontakForm');
  if (kontakForm) {
    kontakForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nama = document.getElementById('formNama')?.value || '';
      const wa = document.getElementById('formKontak')?.value || '';
      const layanan = document.getElementById('formLayanan')?.value || '';
      const jumlah = document.getElementById('formJumlah')?.value || '1';
      const tanggal = document.getElementById('formTanggal')?.value || 'Secepatnya';
      const alamat = document.getElementById('formAlamat')?.value || '';
      const catatan = document.getElementById('formCatatan')?.value || '-';

      const adminWa = '6281291902424'; // Nomor Admin Demo Shoe Lab

      const pesan = `*BOOKING PENJEMPUTAN SEPATU — SHOE LAB*
----------------------------------------
• *Nama Pelanggan*: ${nama}
• *No. WhatsApp*: ${wa}
• *Layanan Treatment*: ${layanan}
• *Jumlah Sepatu*: ${jumlah} Pasang
• *Rencana Tanggal Jemput*: ${tanggal}
• *Alamat Penjemputan*: ${alamat}
• *Catatan Sepatu*: ${catatan}
----------------------------------------
Mohon info ketersediaan kurir & konfirmasi penjemputan. Terima kasih!`;

      const encodedPesan = encodeURIComponent(pesan);
      const waUrl = `https://wa.me/${adminWa}?text=${encodedPesan}`;

      window.open(waUrl, '_blank');
    });
  }

  // 5. Galeri Lightbox Modal
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const galeriItems = document.querySelectorAll('.galeri-item');

  galeriItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const tag = item.querySelector('.galeri-item-tag')?.textContent || '';
      const title = item.querySelector('.galeri-item-title')?.textContent || '';

      if (img && lightboxImg) {
        lightboxImg.src = img.src;
        if (lightboxCaption) lightboxCaption.textContent = `${tag} — ${title}`;
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // 6. Legal Modals (Syarat & Ketentuan / Kebijakan Privasi)
  const modalTerms = document.getElementById('modalTerms');
  const modalPrivacy = document.getElementById('modalPrivacy');

  window.openLegalModal = function(type) {
    if (type === 'terms' && modalTerms) {
      modalTerms.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else if (type === 'privacy' && modalPrivacy) {
      modalPrivacy.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeLegalModal = function(type) {
    if (type === 'terms' && modalTerms) {
      modalTerms.classList.remove('active');
      document.body.style.overflow = '';
    } else if (type === 'privacy' && modalPrivacy) {
      modalPrivacy.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  [modalTerms, modalPrivacy].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }
  });

  // Global ESC Key Listener for All Modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      closeLightbox();
      window.closeLegalModal('terms');
      window.closeLegalModal('privacy');
    }
  });

  // 7. Scroll-Spy Navbar Active Tracking
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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
});
