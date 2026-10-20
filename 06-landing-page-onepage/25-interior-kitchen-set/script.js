/**
 * GRAHA KREASI — Kitchen Set & Interior Minimalis (Portfolio #25)
 * Interactive Script: Video Switcher, Cost Estimator m1, WA Generator, Drawer, Modals
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
  const videoPlayer = document.getElementById('kitchenVideoPlayer');
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

  // 3. Kalkulator Estimasi Biaya Kitchen Set (per Meter Lari m1)
  const calcSlider = document.getElementById('calcSlider');
  const calcPanjangVal = document.getElementById('calcPanjangVal');
  const calcFinishing = document.getElementById('calcFinishing');
  const chkGranit = document.getElementById('chkGranit');
  const chkBacksplash = document.getElementById('chkBacksplash');
  const chkLed = document.getElementById('chkLed');
  const chkRak = document.getElementById('chkRak');

  const calcTotalPrice = document.getElementById('calcTotalPrice');
  const calcBreakdown = document.getElementById('calcBreakdown');
  const btnKirimEstimasiWA = document.getElementById('btnKirimEstimasiWA');

  function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
  }

  function calculateKitchenCost() {
    if (!calcSlider || !calcFinishing) return;

    const panjang = parseFloat(calcSlider.value) || 4;
    if (calcPanjangVal) calcPanjangVal.textContent = `${panjang.toFixed(1)} Meter Lari`;

    const finishingPrice = parseInt(calcFinishing.value, 10) || 2450000;
    const finishingName = calcFinishing.options[calcFinishing.selectedIndex].text.split('(')[0].trim();

    let cabinetCost = panjang * finishingPrice;
    let addOnsCost = 0;
    let addOnsList = [];

    // Granit Top Table (+ Rp 1.100.000 / m1)
    if (chkGranit && chkGranit.checked) {
      const gCost = panjang * 1100000;
      addOnsCost += gCost;
      addOnsList.push(`Top Table Granit Hitam (${formatRupiah(gCost)})`);
    }

    // Backsplash Keramik (+ Rp 450.000 / m1)
    if (chkBacksplash && chkBacksplash.checked) {
      const bCost = panjang * 450000;
      addOnsCost += bCost;
      addOnsList.push(`Backsplash Dinding (${formatRupiah(bCost)})`);
    }

    // LED Sensor Strip (+ Rp 650.000 paket)
    if (chkLed && chkLed.checked) {
      addOnsCost += 650000;
      addOnsList.push(`Hidden LED Sensor (${formatRupiah(650000)})`);
    }

    // Rak Piring Stainless (+ Rp 850.000 paket)
    if (chkRak && chkRak.checked) {
      addOnsCost += 850000;
      addOnsList.push(`Rak Piring Stainless (${formatRupiah(850000)})`);
    }

    const total = cabinetCost + addOnsCost;

    if (calcTotalPrice) calcTotalPrice.textContent = formatRupiah(total);

    if (calcBreakdown) {
      let html = `&bull; Kabinet ${panjang} m&sup1; &times; ${finishingName}: <strong>${formatRupiah(cabinetCost)}</strong><br>`;
      if (addOnsList.length > 0) {
        html += `&bull; Fitur Tambahan: ${addOnsList.join(', ')}`;
      } else {
        html += `&bull; Belum termasuk top table granit / aksesoris tambahan.`;
      }
      calcBreakdown.innerHTML = html;
    }

    // Update WhatsApp link for direct share
    if (btnKirimEstimasiWA) {
      const waText = `*KONSULTASI ESTIMASI KITCHEN SET — GRAHA KREASI*
----------------------------------------
• *Panjang Ruangan*: ${panjang.toFixed(1)} Meter Lari
• *Pilihan Finishing*: ${finishingName}
• *Estimasi Kabinet*: ${formatRupiah(cabinetCost)}
• *Aksesoris Tambahan*: ${addOnsList.length > 0 ? addOnsList.join(', ') : 'Standar'}
• *Estimasi Total*: ${formatRupiah(total)}
----------------------------------------
Halo Graha Kreasi, saya ingin jadwalkan survei lokasi gratis dan konsultasi desain 3D berdasarkan estimasi di atas.`;

      btnKirimEstimasiWA.href = `https://wa.me/6281291902525?text=${encodeURIComponent(waText)}`;
    }
  }

  [calcSlider, calcFinishing, chkGranit, chkBacksplash, chkLed, chkRak].forEach(el => {
    if (el) el.addEventListener('input', calculateKitchenCost);
  });
  calculateKitchenCost(); // Initial calculation

  // 4. Formulir Reservasi Survei 3D Gratis ke WhatsApp
  const kontakForm = document.getElementById('kontakForm');
  if (kontakForm) {
    kontakForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nama = document.getElementById('formNama')?.value || '';
      const wa = document.getElementById('formKontak')?.value || '';
      const tipe = document.getElementById('formTipe')?.value || 'Rumah';
      const estimasi = document.getElementById('formEstimasi')?.value || '4 Meter';
      const finishing = document.getElementById('formFinishing')?.value || 'HPL Taco';
      const tanggal = document.getElementById('formTanggal')?.value || 'Fleksibel';
      const alamat = document.getElementById('formAlamat')?.value || '';
      const catatan = document.getElementById('formCatatan')?.value || '-';

      const adminWa = '6281291902525'; // Nomor Admin Demo Graha Kreasi

      const pesan = `*BOOKING SURVEI & DESAIN 3D GRATIS — GRAHA KREASI*
----------------------------------------
• *Nama Pemilik*: ${nama}
• *No. WhatsApp*: ${wa}
• *Tipe Hunian*: ${tipe}
• *Estimasi Ukuran*: ${estimasi}
• *Pilihan Finishing*: ${finishing}
• *Rencana Tanggal Survei*: ${tanggal}
• *Alamat Lengkap*: ${alamat}
• *Catatan Tambahan*: ${catatan}
----------------------------------------
Mohon konfirmasi jadwal kunjungan survei & pengukuran ke lokasi. Terima kasih!`;

      const waUrl = `https://wa.me/${adminWa}?text=${encodeURIComponent(pesan)}`;
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

  // 6. Legal Modals
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

  // ESC Listener
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
