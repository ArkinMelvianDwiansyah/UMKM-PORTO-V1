/**
 * RUMAH TUMBUH — Early Childhood & Learning Center
 * Single Source of Truth & Interactive Controllers
 * STRICT RULE: No calculators or price estimators!
 */

const SCHOOL_DATA = {
  brandName: "Rumah Tumbuh",
  tagline: "Tumbuh Ceria, Belajar Bermakna",
  phoneDisplay: "0812-9190-2222",
  phoneRaw: "6281291902222",
  email: "halo@rumahtumbuh.demo",
  address: "Jl. Merpati Raya No. 45, Sektor 1 Bintaro Jaya, Tangerang Selatan, Banten 15413",
  operationalHours: "Senin – Jumat: 07.30 – 17.00 WIB | Sabtu: 08.00 – 13.00 WIB",
  socials: {
    instagram: "https://instagram.com/rumahtumbuh.demo",
    youtube: "https://youtube.com/@rumahtumbuh.demo",
    tiktok: "https://tiktok.com/@rumahtumbuh.demo",
  }
};

// Routine schedules for the Routine Switcher
const ROUTINE_DATA = {
  daycare: [
    { time: "07.30 – 08.30", title: "Penyambutan & Morning Circle", desc: "Pemeriksaan suhu, cuci tangan, doa pagi, dan gerak lagu ceria bersama fasilitator." },
    { time: "08.30 – 09.45", title: "Sensory Play & Eksplorasi Motorik", desc: "Bermain pasir kinetik, finger painting, atau balok stimulasi sensorik sesuai usia." },
    { time: "09.45 – 10.30", title: "Snack Sehat & Toilet Training", desc: "Edukasi kemandirian makan buah/puding sehat serta pembiasaan toilet training ramah anak." },
    { time: "10.30 – 11.45", title: "Outdoor Play & Taman Bermain", desc: "Aktivitas fisik di playground rumput empuk untuk melatih koordinasi motorik kasar." },
    { time: "11.45 – 14.30", title: "Makan Siang Gizi Seimbang & Tidur Siang", desc: "Makan siang menu nutrisionis, sikat gigi, dan istirahat di ruang tidur ber-AC berperedam suara." },
    { time: "14.30 – 16.30", title: "Mandi Sore, Storytelling & Penjemputan", desc: "Mandi air hangat, mendengarkan dongeng moral bergambar, dan jurnal kepulangan." }
  ],
  paud: [
    { time: "08.00 – 08.30", title: "Circle Time & Pengenalan Tema", desc: "Menyanyi lagu kebangsaan, menyapa kawan, dan pengenalan tema mingguan (alam, flora, profesi)." },
    { time: "08.30 – 09.30", title: "Sentra Eksplorasi & Bahasa Ekspresif", desc: "Mengenal huruf fonik dengan kartu gambar interaktif dan bercerita di depan kelas." },
    { time: "09.30 – 10.15", title: "Istirahat, Cuci Tangan & Kudapan", desc: "Makan bekal bersama, melatih antre, dan merapikan kotak makan secara mandiri." },
    { time: "10.15 – 11.15", title: "Sains Cilik & Keterampilan Seni", desc: "Eksperimen warna, melipat origami, atau menanam kecambah di kebun edukasi." },
    { time: "11.15 – 11.30", title: "Refleksi Harian & Doa Pulang", desc: "Mengulas apa yang disukai hari ini dan salam hangat penutup bersama Bunda guru." }
  ],
  calistung: [
    { time: "13.00 – 13.45", title: "Fonik Interaktif & Membaca Nyaring", desc: "Mengenal suku kata dengan kartu suku kata berwarna tanpa rasa bosan atau tertekan." },
    { time: "13.45 – 14.30", title: "Menulis Rapi & Motorik Halus", desc: "Latihan memegang pensil ergonomis, menyambung titik, dan menyalin kalimat pendek." },
    { time: "14.30 – 15.00", title: "Ice Breaking & Game Logika", desc: "Tebak angka, puzzle berhitung cepat, dan permainan konsentrasi kognitif anak." },
    { time: "15.00 – 15.45", title: "Matematika Konsep Dasar & Cerita Bergambar", desc: "Memahami konsep tambah-kurang dengan kancing dan benda nyata, bukan hafalan rumus kering." },
    { time: "15.45 – 16.00", title: "Stempel Prestasi & Feedback Buku Penghubung", desc: "Apresiasi pencapaian bintang harian dan catatan evaluasi untuk orang tua." }
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  // 1. Dynamic Year in Footer
  const yearEls = document.querySelectorAll(".current-year");
  const currentYear = new Date().getFullYear();
  yearEls.forEach(el => el.textContent = currentYear);

  // 2. Render Single Source of Truth
  const phoneEls = document.querySelectorAll(".school-phone");
  phoneEls.forEach(el => el.textContent = SCHOOL_DATA.phoneDisplay);

  const addressEls = document.querySelectorAll(".school-address");
  addressEls.forEach(el => el.textContent = SCHOOL_DATA.address);

  const hoursEls = document.querySelectorAll(".school-hours");
  hoursEls.forEach(el => el.textContent = SCHOOL_DATA.operationalHours);

  // 3. Navbar scroll effect
  const header = document.querySelector(".site-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // 4. Mobile Menu Drawer Toggle
  const mobileToggle = document.getElementById("mobileToggle");
  const navbarMenu = document.getElementById("navbarMenu");
  if (mobileToggle && navbarMenu) {
    mobileToggle.addEventListener("click", () => {
      navbarMenu.classList.toggle("open");
    });

    navbarMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navbarMenu.classList.remove("open");
      });
    });
  }

  // 5. Scrollspy for Active Nav Link
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let currentId = "";
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 140;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentId}`) {
        link.classList.add("active");
      }
    });
  });

  // 6. Routine Timeline Switcher
  const routineTabs = document.querySelectorAll(".btn-routine-tab");
  const routineContainer = document.getElementById("routineTimelineContainer");

  function renderRoutine(categoryKey) {
    if (!routineContainer) return;
    const items = ROUTINE_DATA[categoryKey] || ROUTINE_DATA.daycare;
    routineContainer.innerHTML = items.map(item => `
      <div class="routine-item">
        <div class="routine-time-badge">${item.time}</div>
        <div class="routine-card-body">
          <h4>${item.title}</h4>
          <p>${item.desc}</p>
        </div>
      </div>
    `).join("");
  }

  if (routineTabs.length > 0) {
    renderRoutine("daycare");
    routineTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        routineTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        const category = tab.getAttribute("data-routine");
        renderRoutine(category);
      });
    });
  }

  // 7. Gallery Filter & Lightbox
  const galleryTabs = document.querySelectorAll(".gallery-tab-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      galleryTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const filter = tab.getAttribute("data-filter");

      galleryItems.forEach(item => {
        if (filter === "all" || item.getAttribute("data-category") === filter) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // Lightbox Modal
  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");

  galleryItems.forEach(item => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      const title = item.querySelector(".gallery-title");
      if (lightboxModal && lightboxImg && img) {
        lightboxImg.src = img.src;
        if (lightboxCaption && title) {
          lightboxCaption.textContent = title.textContent;
        }
        lightboxModal.classList.add("active");
      }
    });
  });

  if (lightboxClose && lightboxModal) {
    lightboxClose.addEventListener("click", () => {
      lightboxModal.classList.remove("active");
    });
    lightboxModal.addEventListener("click", (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove("active");
      }
    });
  }

  // 8. FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const questionBtn = item.querySelector(".faq-question");
    if (questionBtn) {
      questionBtn.addEventListener("click", () => {
        const isActive = item.classList.contains("active");
        faqItems.forEach(other => other.classList.remove("active"));
        if (!isActive) {
          item.classList.add("active");
        }
      });
    }
  });

  // 9. Free Trial Form -> WhatsApp Message Compiler
  const trialForm = document.getElementById("trialForm");
  if (trialForm) {
    trialForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const childName = document.getElementById("childName").value.trim();
      const childAge = document.getElementById("childAge").value.trim();
      const parentName = document.getElementById("parentName").value.trim();
      const parentPhone = document.getElementById("parentPhone").value.trim();
      const programSelect = document.getElementById("programSelect").value;
      const trialDate = document.getElementById("trialDate").value;
      const parentNotes = document.getElementById("parentNotes").value.trim();

      if (!childName || !parentName || !parentPhone || !trialDate) {
        alert("Mohon lengkapi nama anak, nama orang tua, nomor WA, dan rencana tanggal kunjungan.");
        return;
      }

      const message = `Halo Admin ${SCHOOL_DATA.brandName}! 👋
Saya ingin mendaftarkan putra/putri saya untuk sesi Free Trial Class:

*Data Anak & Orang Tua:*
• Nama Anak: ${childName} (${childAge} tahun)
• Nama Orang Tua: ${parentName}
• No. WhatsApp: ${parentPhone}

*Pilihan Program:*
• Program: ${programSelect}
• Rencana Tanggal Kunjungan: ${trialDate}
• Catatan Khusus: ${parentNotes ? parentNotes : "-"}

Mohon konfirmasi ketersediaan slot fasilitator di cabang Bintaro. Terima kasih!`;

      const waUrl = `https://wa.me/${SCHOOL_DATA.phoneRaw}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, "_blank", "noopener,noreferrer");
    });
  }

  // 10. Legal Modals
  const legalModal = document.getElementById("legalModal");
  const legalModalTitle = document.getElementById("legalModalTitle");
  const legalModalContent = document.getElementById("legalModalContent");
  const legalCloseBtn = document.getElementById("legalCloseBtn");

  const termsTrigger = document.getElementById("termsTrigger");
  const privacyTrigger = document.getElementById("privacyTrigger");

  const LEGAL_TEXTS = {
    terms: {
      title: "Syarat & Ketentuan Kunjungan & Belajar",
      content: `
        <p><strong>1. Sesi Free Trial</strong></p>
        <p>Sesi Free Trial berlangsung selama 60–90 menit dengan pendampingan 1 orang tua/wali. Harap hadir 10 menit sebelum jadwal dimulai demi kenyamanan adaptasi anak.</p>
        <br>
        <p><strong>2. Standar Kesehatan Anak</strong></p>
        <p>Demi kesehatan bersama, anak yang sedang mengalami demam (suhu di atas 37.5°C), flu berat, atau penyakit menular lainnya disarankan menjadwalkan ulang sesi trial setelah pulih.</p>
        <br>
        <p><strong>3. Keamanan & Dokumentasi</strong></p>
        <p>Area belajar dilengkapi CCTV 24 jam. Dokumentasi kegiatan anak untuk evaluasi berkala dikirimkan hanya melalui kanal komunikasi pribadi orang tua.</p>
      `
    },
    privacy: {
      title: "Kebijakan Privasi Data Anak & Orang Tua",
      content: `
        <p><strong>1. Perlindungan Informasi Pribadi</strong></p>
        <p>Data nama, tanggal lahir, kontak orang tua, dan catatan kesehatan anak yang Anda berikan bersifat rahasia dan hanya digunakan untuk keperluan administrasi dan keselamatan siswa.</p>
        <br>
        <p><strong>2. Hak Privasi Foto & Video</strong></p>
        <p>Kami tidak mempublikasikan foto close-up wajah anak di media sosial publik tanpa persetujuan tertulis dari orang tua siswa yang bersangkutan.</p>
      `
    }
  };

  function openLegalModal(type) {
    if (!legalModal || !legalModalTitle || !legalModalContent) return;
    const data = LEGAL_TEXTS[type];
    if (data) {
      legalModalTitle.textContent = data.title;
      legalModalContent.innerHTML = data.content;
      legalModal.classList.add("active");
    }
  }

  if (termsTrigger) {
    termsTrigger.addEventListener("click", (e) => {
      e.preventDefault();
      openLegalModal("terms");
    });
  }

  if (privacyTrigger) {
    privacyTrigger.addEventListener("click", (e) => {
      e.preventDefault();
      openLegalModal("privacy");
    });
  }

  if (legalCloseBtn && legalModal) {
    legalCloseBtn.addEventListener("click", () => {
      legalModal.classList.remove("active");
    });
    legalModal.addEventListener("click", (e) => {
      if (e.target === legalModal) {
        legalModal.classList.remove("active");
      }
    });
  }

  // --- 11. KIDS VIDEO SWITCHER (#video-belajar) ---
  const kidsVideoBtns = document.querySelectorAll('.kids-video-btn');
  const kidsVideoPlayer = document.getElementById('kidsVideoPlayer');
  const kidsVideoCaption = document.getElementById('kidsVideoCaption');

  kidsVideoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      kidsVideoBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const videoSrc = btn.getAttribute('data-video');
      const caption = btn.getAttribute('data-caption');

      if (kidsVideoPlayer && videoSrc) {
        kidsVideoPlayer.src = videoSrc;
        kidsVideoPlayer.play().catch(() => {});
      }
      if (kidsVideoCaption && caption) {
        kidsVideoCaption.textContent = caption;
      }
    });
  });

  // --- 12. INTERACTIVE TUITION FEE CALCULATOR (#kalkulator-biaya) ---
  const calcProgram = document.getElementById('calcProgram');
  const calcAddons = document.querySelectorAll('.calc-addon-check');
  const calcPeriodRadios = document.querySelectorAll('input[name="calcPeriod"]');
  const calcSummaryProgramName = document.getElementById('calcSummaryProgramName');
  const calcSummaryBasePrice = document.getElementById('calcSummaryBasePrice');
  const calcSummaryAddonsCount = document.getElementById('calcSummaryAddonsCount');
  const calcSummaryDiscount = document.getElementById('calcSummaryDiscount');
  const calcTotalPriceDisplay = document.getElementById('calcTotalPriceDisplay');
  const btnSendTuitionWa = document.getElementById('btnSendTuitionWa');

  function formatRupiah(num) {
    return 'Rp ' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  function updateTuitionCalculator() {
    if (!calcProgram) return;
    const selectedOption = calcProgram.options[calcProgram.selectedIndex];
    const basePrice = parseInt(selectedOption.value, 10) || 0;
    const programName = selectedOption.getAttribute('data-name') || selectedOption.text;

    let addonsTotal = 0;
    let selectedAddonNames = [];

    calcAddons.forEach(cb => {
      if (cb.checked) {
        addonsTotal += parseInt(cb.value, 10) || 0;
        selectedAddonNames.push(cb.getAttribute('data-name'));
      }
    });

    let months = 1;
    let discountPct = 0;
    calcPeriodRadios.forEach(radio => {
      if (radio.checked) {
        months = parseInt(radio.value, 10) || 1;
        discountPct = parseInt(radio.getAttribute('data-discount'), 10) || 0;
      }
    });

    const monthlyCombined = basePrice + addonsTotal;
    const rawTotal = monthlyCombined * months;
    let discountAmount = 0;
    if (discountPct > 0) {
      discountAmount = Math.round(rawTotal * (discountPct / 100));
    }
    const grandTotal = rawTotal - discountAmount;

    if (calcSummaryProgramName) calcSummaryProgramName.textContent = programName;
    if (calcSummaryBasePrice) calcSummaryBasePrice.textContent = formatRupiah(basePrice);
    if (calcSummaryAddonsCount) {
      calcSummaryAddonsCount.textContent = selectedAddonNames.length > 0 
        ? `${selectedAddonNames.length} Fasilitas (${formatRupiah(addonsTotal)}/bln)`
        : '0 Fasilitas';
    }
    if (calcSummaryDiscount) {
      if (discountPct > 0) {
        calcSummaryDiscount.textContent = `${months} Bulan (-${formatRupiah(discountAmount)} / ${discountPct}%)`;
      } else {
        calcSummaryDiscount.textContent = 'Bulanan Reguler (Rp 0)';
      }
    }
    if (calcTotalPriceDisplay) {
      calcTotalPriceDisplay.textContent = formatRupiah(grandTotal);
    }
  }

  if (calcProgram) {
    calcProgram.addEventListener('change', updateTuitionCalculator);
    calcAddons.forEach(cb => cb.addEventListener('change', updateTuitionCalculator));
    calcPeriodRadios.forEach(r => r.addEventListener('change', updateTuitionCalculator));
    updateTuitionCalculator();
  }

  if (btnSendTuitionWa) {
    btnSendTuitionWa.addEventListener('click', () => {
      const selectedOption = calcProgram.options[calcProgram.selectedIndex];
      const programName = selectedOption.getAttribute('data-name') || selectedOption.text;
      const basePrice = parseInt(selectedOption.value, 10) || 0;
      let addonList = [];
      calcAddons.forEach(cb => {
        if (cb.checked) addonList.push(`  + ${cb.getAttribute('data-name')} (${formatRupiah(parseInt(cb.value, 10))})`);
      });

      let months = 1;
      let discountPct = 0;
      calcPeriodRadios.forEach(radio => {
        if (radio.checked) {
          months = parseInt(radio.value, 10) || 1;
          discountPct = parseInt(radio.getAttribute('data-discount'), 10) || 0;
        }
      });

      const totalText = calcTotalPriceDisplay ? calcTotalPriceDisplay.textContent : formatRupiah(basePrice);

      let msg = `Halo Admin Rumah Tumbuh, saya ingin konsultasi pendaftaran & free trial berdasarkan simulasi di website:%0A%0A` +
        `• *Program*: ${programName} (${formatRupiah(basePrice)}/bln)%0A` +
        (addonList.length > 0 ? `• *Fasilitas Ekstra*:%0A${addonList.join('%0A')}%0A` : `• *Fasilitas Ekstra*: Tidak ada%0A`) +
        `• *Periode*: ${months} Bulan ${discountPct > 0 ? `(Diskon ${discountPct}%)` : '(Bulanan)'}%0A` +
        `• *Total Estimasi*: *${totalText}*%0A` +
        `• *Free Trial*: Mau jadwalkan 1 Sesi Free Trial%0A%0A` +
        `Mohon info ketersediaan slot kelas & jadwal observasi di cabang Bintaro. Terima kasih Ayah/Bunda!`;

      window.open(`https://wa.me/${SCHOOL_DATA.phoneRaw}?text=${msg}`, '_blank', 'noopener,noreferrer');
    });
  }

  // --- 13. VERIFIED PHOTO REVIEWS FILTER & PAGINATION (#testimoni) ---
  let currentPaudReviewCategory = 'all';
  let currentPaudReviewPage = 1;

  function filterPaudReviews(cat) {
    currentPaudReviewCategory = cat;
    currentPaudReviewPage = 1;

    const tabs = document.querySelectorAll('#paudReviewFilterTabs .testimoni-filter-btn');
    tabs.forEach(tab => {
      const isSelected = tab.getAttribute('onclick')?.includes(`'${cat}'`);
      if (isSelected) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    applyPaudReviewDisplay();
  }

  function changePaudReviewPage(delta) {
    const cards = Array.from(document.querySelectorAll('.paud-review-card'));
    const matchedCards = cards.filter(card => {
      if (currentPaudReviewCategory === 'all') return true;
      return card.getAttribute('data-category') === currentPaudReviewCategory;
    });
    const totalPages = Math.max(1, Math.ceil(matchedCards.length / 4));
    const newPage = currentPaudReviewPage + delta;
    if (newPage >= 1 && newPage <= totalPages) {
      currentPaudReviewPage = newPage;
      applyPaudReviewDisplay();
    }
  }

  function applyPaudReviewDisplay() {
    const cards = Array.from(document.querySelectorAll('.paud-review-card'));
    const matchedCards = cards.filter(card => {
      if (currentPaudReviewCategory === 'all') return true;
      return card.getAttribute('data-category') === currentPaudReviewCategory;
    });

    const totalPages = Math.max(1, Math.ceil(matchedCards.length / 4));
    if (currentPaudReviewPage > totalPages) currentPaudReviewPage = totalPages;

    const startIndex = (currentPaudReviewPage - 1) * 4;
    const endIndex = startIndex + 4;

    cards.forEach(card => card.classList.add('hidden'));
    matchedCards.forEach((card, idx) => {
      if (idx >= startIndex && idx < endIndex) {
        card.classList.remove('hidden');
      }
    });

    const indicator = document.getElementById('paudReviewPageIndicator');
    if (indicator) {
      indicator.textContent = `${currentPaudReviewPage} / ${totalPages}`;
    }
  }

  window.filterPaudReviews = filterPaudReviews;
  window.changePaudReviewPage = changePaudReviewPage;
  applyPaudReviewDisplay();
});
