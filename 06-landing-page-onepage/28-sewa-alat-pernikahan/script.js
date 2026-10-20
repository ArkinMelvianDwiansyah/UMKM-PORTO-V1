/* ==========================================================================
   MAHKOTA WEDDING & EVENT RENTAL (Portfolio #28)
   Interactive Scripts: Nav, Availability Calendar, Rental Calculator, Tabs, Lightbox, WA Integration
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. STICKY HEADER & ACTIVE NAV (SCROLL-SPY) ---
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

  // --- 3. KATALOG FILTER TABS ---
  const tabBtns = document.querySelectorAll('.katalog-tab-btn');
  const katalogCards = document.querySelectorAll('.katalog-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter') || 'all';
      katalogCards.forEach(card => {
        const cat = card.getAttribute('data-cat');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 4. KALENDER KETERSEDIAAN TANGGAL INTERAKTIF ---
  let calCurrentYear = 2026;
  let calCurrentMonth = 10; // 0-indexed: 10 = November
  let selectedFullDate = '2026-11-21';

  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const calMonthTitle = document.getElementById('calMonthTitle');
  const calGrid = document.getElementById('calGrid');
  const calPrevMonth = document.getElementById('calPrevMonth');
  const calNextMonth = document.getElementById('calNextMonth');
  const selectedDateDisplay = document.getElementById('selectedDateDisplay');
  const calcEventDate = document.getElementById('calcEventDate');
  const resDate = document.getElementById('resDate');
  const btnUseSelectedDate = document.getElementById('btnUseSelectedDate');

  // Hardcoded booked dates pattern for authentic realistic experience
  function getDateStatus(year, month, day) {
    const dayOfWeek = new Date(year, month, day).getDay(); // 0 is Sunday, 6 is Saturday
    // Specific dates booked out
    if ((month === 10 && [7, 8, 14, 28].includes(day)) ||
        (month === 11 && [5, 12, 19, 26, 31].includes(day))) {
      return 'booked';
    }
    // Specific dates limited (1 crew left)
    if ((month === 10 && [1, 15, 22, 29].includes(day)) ||
        (month === 11 && [6, 13, 20, 27].includes(day)) ||
        (dayOfWeek === 6 || dayOfWeek === 0)) {
      return 'limited';
    }
    return 'available';
  }

  function renderCalendar(year, month) {
    if (!calMonthTitle || !calGrid) return;

    calMonthTitle.textContent = `${monthNames[month]} ${year}`;
    calGrid.innerHTML = '';

    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Fill leading empty cells
    for (let i = 0; i < firstDayIndex; i++) {
      const emptyDiv = document.createElement('div');
      emptyDiv.className = 'cal-day empty';
      calGrid.appendChild(emptyDiv);
    }

    // Fill days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const status = getDateStatus(year, month, day);
      const dayDiv = document.createElement('div');
      dayDiv.className = `cal-day status-${status}`;
      
      const padM = String(month + 1).padStart(2, '0');
      const padD = String(day).padStart(2, '0');
      const dateStr = `${year}-${padM}-${padD}`;
      dayDiv.setAttribute('data-date', dateStr);

      if (dateStr === selectedFullDate) {
        dayDiv.classList.add('selected');
      }

      let statusLabel = 'Tersedia';
      if (status === 'limited') statusLabel = 'Sisa 1 Slot';
      if (status === 'booked') statusLabel = 'Penuh';

      dayDiv.innerHTML = `
        <span class="cal-day-num">${day}</span>
        <span class="cal-day-status">${statusLabel}</span>
      `;

      if (status !== 'booked') {
        dayDiv.addEventListener('click', () => {
          document.querySelectorAll('.cal-day').forEach(d => d.classList.remove('selected'));
          dayDiv.classList.add('selected');
          selectedFullDate = dateStr;
          onDateSelected(year, month, day, status);
        });
      }

      calGrid.appendChild(dayDiv);
    }
  }

  function onDateSelected(year, month, day, status) {
    const dObj = new Date(year, month, day);
    const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const dayName = dayNames[dObj.getDay()];
    const padM = String(month + 1).padStart(2, '0');
    const padD = String(day).padStart(2, '0');
    const ymd = `${year}-${padM}-${padD}`;

    const statusBadge = status === 'available' ? 'Tersedia (Bebas Booking)' : 'Slot Terbatas (Sisa 1 Kru)';
    if (selectedDateDisplay) {
      selectedDateDisplay.innerHTML = `<span style="color: #B45309;">${dayName}, ${day} ${monthNames[month]} ${year}</span> &bull; <strong style="color: ${status === 'available' ? '#059669' : '#D97706'};">${statusBadge}</strong>`;
    }

    // Sync to calculator and form inputs
    if (calcEventDate) {
      calcEventDate.value = ymd;
      updateCalculator();
    }
    if (resDate) {
      resDate.value = ymd;
    }
  }

  calPrevMonth?.addEventListener('click', () => {
    calCurrentMonth--;
    if (calCurrentMonth < 0) {
      calCurrentMonth = 11;
      calCurrentYear--;
    }
    renderCalendar(calCurrentYear, calCurrentMonth);
  });

  calNextMonth?.addEventListener('click', () => {
    calCurrentMonth++;
    if (calCurrentMonth > 11) {
      calCurrentMonth = 0;
      calCurrentYear++;
    }
    renderCalendar(calCurrentYear, calCurrentMonth);
  });

  btnUseSelectedDate?.addEventListener('click', () => {
    const el = document.getElementById('kalkulator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });

  // --- 5. KALKULATOR SEWA & ADD-ON INTERAKTIF ---
  const calcPackageType = document.getElementById('calcPackageType');
  const calcBackdropStyle = document.getElementById('calcBackdropStyle');
  const chairButtons = document.querySelectorAll('.chair-count-btn');
  const chairRadios = document.querySelectorAll('input[name="chairModel"]');
  const addonCheckboxes = document.querySelectorAll('.addon-checkbox-list input[type="checkbox"]');
  const calcBreakdownList = document.getElementById('calcBreakdownList');
  const calcTotalAmount = document.getElementById('calcTotalAmount');
  const btnSendCalcWa = document.getElementById('btnSendCalcWa');

  let currentChairCount = 50;

  function formatIDR(num) {
    return 'Rp ' + Number(num).toLocaleString('id-ID');
  }

  function updateCalculator() {
    // 1. Package price & text
    const selectedPkg = calcPackageType ? calcPackageType.options[calcPackageType.selectedIndex] : null;
    const pkgPrice = selectedPkg ? parseInt(selectedPkg.getAttribute('data-price') || '0', 10) : 1800000;
    const pkgName = selectedPkg ? selectedPkg.text.split('—')[0].trim() : 'Paket Lamaran';

    // 2. Backdrop price & text
    const selectedBackdrop = calcBackdropStyle ? calcBackdropStyle.options[calcBackdropStyle.selectedIndex] : null;
    const backdropPrice = selectedBackdrop ? parseInt(selectedBackdrop.getAttribute('data-price') || '0', 10) : 0;
    const backdropName = selectedBackdrop ? selectedBackdrop.text.split('(')[0].trim() : 'Rustic Wood';

    // 3. Chairs calculation
    let chairModelPrice = 10000;
    let chairModelName = 'Futura Cover';
    chairRadios.forEach(radio => {
      if (radio.checked) {
        chairModelPrice = parseInt(radio.getAttribute('data-price') || '10000', 10);
        chairModelName = radio.value === 'tiffany' ? 'Tiffany Gold/Putih' : 'Futura Cover';
      }
    });

    const chairsSubtotal = currentChairCount * chairModelPrice;

    // 4. Add-ons calculation
    let addonsTotal = 0;
    const selectedAddons = [];
    addonCheckboxes.forEach(cb => {
      if (cb.checked) {
        const price = parseInt(cb.value, 10);
        addonsTotal += price;
        const label = cb.closest('label').querySelector('span strong').textContent;
        selectedAddons.push({ label, price });
      }
    });

    // 5. Total and Diskon
    let grossTotal = pkgPrice + backdropPrice + chairsSubtotal + addonsTotal;
    let discRate = 0;
    if (currentChairCount === 200) discRate = 0.05;
    if (currentChairCount === 300) discRate = 0.08;
    if (currentChairCount >= 500) discRate = 0.12;

    const discAmount = Math.round(grossTotal * discRate);
    const netTotal = grossTotal - discAmount;

    // Render Breakdown rows
    if (calcBreakdownList) {
      let html = '';
      
      const dateVal = calcEventDate?.value || selectedFullDate;
      html += `
        <div class="calc-breakdown-row" style="color:#FBBF24; font-weight:700;">
          <span>Rencana Tanggal:</span>
          <span>${dateVal || 'Belum dipilih'}</span>
        </div>
        <div class="calc-breakdown-row">
          <span>${pkgName}:</span>
          <strong>${formatIDR(pkgPrice)}</strong>
        </div>
      `;

      if (backdropPrice > 0) {
        html += `
          <div class="calc-breakdown-row">
            <span>Backdrop (${backdropName}):</span>
            <strong>+${formatIDR(backdropPrice)}</strong>
          </div>
        `;
      }

      html += `
        <div class="calc-breakdown-row">
          <span>${currentChairCount} Kursi (${chairModelName}):</span>
          <strong>+${formatIDR(chairsSubtotal)}</strong>
        </div>
      `;

      selectedAddons.forEach(item => {
        html += `
          <div class="calc-breakdown-row">
            <span>Add-On: ${item.label}:</span>
            <strong>+${formatIDR(item.price)}</strong>
          </div>
        `;
      });

      if (discAmount > 0) {
        html += `
          <div class="calc-breakdown-row discount">
            <span>Diskon Bundling (${Math.round(discRate * 100)}%):</span>
            <strong>-${formatIDR(discAmount)}</strong>
          </div>
        `;
      }

      calcBreakdownList.innerHTML = html;
    }

    if (calcTotalAmount) {
      calcTotalAmount.textContent = formatIDR(netTotal);
    }

    // Build WhatsApp Message Link
    if (btnSendCalcWa) {
      const dateVal = calcEventDate?.value || selectedFullDate;
      let waMsg = `Halo Admin MAHKOTA WEDDING RENTAL,\n` +
        `Saya ingin menanyakan ketersediaan tanggal dan booking sewa alat pesta:\n\n` +
        `• Tanggal Acara: ${dateVal || '-'}\n` +
        `• Pilihan Paket: ${pkgName}\n` +
        `• Backdrop / Pelaminan: ${backdropName} (${formatIDR(backdropPrice)})\n` +
        `• Kebutuhan Kursi: ${currentChairCount} unit ${chairModelName} (${formatIDR(chairsSubtotal)})\n`;

      if (selectedAddons.length > 0) {
        waMsg += `• Add-On Terpilih:\n`;
        selectedAddons.forEach(a => {
          waMsg += `   - ${a.label} (${formatIDR(a.price)})\n`;
        });
      }

      if (discAmount > 0) {
        waMsg += `• Potongan Diskon: -${formatIDR(discAmount)}\n`;
      }

      waMsg += `• Estimasi Total Biaya: ${formatIDR(netTotal)}\n\n` +
        `Mohon konfirmasi ketersediaan armada dan jadwal survei lokasinya ya min. Terima kasih!`;

      btnSendCalcWa.href = `https://wa.me/6281234567890?text=${encodeURIComponent(waMsg)}`;
    }
  }

  // Chair count buttons handler
  chairButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      chairButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentChairCount = parseInt(btn.getAttribute('data-count') || '50', 10);
      updateCalculator();
    });
  });

  // Event listeners for calculator
  calcPackageType?.addEventListener('change', updateCalculator);
  calcBackdropStyle?.addEventListener('change', updateCalculator);
  calcEventDate?.addEventListener('change', updateCalculator);
  chairRadios.forEach(r => r.addEventListener('change', updateCalculator));
  addonCheckboxes.forEach(cb => cb.addEventListener('change', updateCalculator));

  updateCalculator();

  // Initialize Calendar & select default date
  renderCalendar(calCurrentYear, calCurrentMonth);
  onDateSelected(2026, 10, 21, 'limited');

  // --- 6. GALLERY LIGHTBOX ---
  const galleryItems = document.querySelectorAll('.galeri-item');
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

  // --- 7. FAQ ACCORDION ---
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

  // --- 8. RESERVATION FORM (DIRECT WHATSAPP) ---
  const bookingForm = document.getElementById('bookingWeddingForm');
  bookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('resName')?.value.trim();
    const phone = document.getElementById('resPhone')?.value.trim();
    const eventType = document.getElementById('resEventType')?.value;
    const date = document.getElementById('resDate')?.value;
    const location = document.getElementById('resLocation')?.value.trim();
    const guestCount = document.getElementById('resGuestCount')?.value;
    const notes = document.getElementById('resNotes')?.value.trim();

    if (!name || !phone || !date || !location) {
      alert('Mohon lengkapi Nama, Nomor WhatsApp, Tanggal Acara, dan Alamat Lokasi.');
      return;
    }

    const message = `Halo Admin MAHKOTA WEDDING RENTAL,\n` +
      `Saya ingin memesan jadwal sewa alat pernikahan / event:\n\n` +
      `• Nama Pemesan: ${name}\n` +
      `• No. WhatsApp: ${phone}\n` +
      `• Jenis Acara: ${eventType}\n` +
      `• Tanggal Acara: ${date}\n` +
      `• Alamat Lokasi Venue: ${location}\n` +
      `• Estimasi Undangan: ${guestCount}\n` +
      `• Catatan Kebutuhan: ${notes || '-'}\n\n` +
      `Mohon info ketersediaan slot armada dan jadwal survei gratis ke lokasi. Terima kasih!`;

    const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  });

  // --- 9. LEGAL MODALS ---
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

  // Global ESC key to close any active modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeLegalModals();
      closeDrawer();
    }
  });

});
