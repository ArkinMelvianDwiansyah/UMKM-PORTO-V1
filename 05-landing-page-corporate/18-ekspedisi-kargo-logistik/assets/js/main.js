/**
 * PT SAMUDERA LOGISTIK NUSANTARA (SLN Cargo)
 * Core Interactive Scripts: Cek Tarif, Lacak Resi AWB, Modal RFQ, Nav Drawer
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initTarifCalculator();
  initTrackingSimulator();
  initRfqModal();
  initFaqAccordion();
});

/* ==========================================================================
   1. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const closeBtn = document.getElementById('mobileNavClose');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('mobileBackdrop');

  if (!toggleBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.remove('translate-x-full');
    if (backdrop) backdrop.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }

  function closeDrawer() {
    drawer.classList.add('translate-x-full');
    if (backdrop) backdrop.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  // Close when clicking nav links inside drawer
  const links = drawer.querySelectorAll('a');
  links.forEach(l => l.addEventListener('click', closeDrawer));
}

/* ==========================================================================
   2. CEK TARIF KARGO ANTAR PULAU CALCULATOR
   ========================================================================== */
const TARIFF_DATABASE = {
  'Surabaya-Makassar': {
    leadTime: '3–4 Hari (Kapal RoRo/Kontainer Cepat)',
    lclRatePerM3: 425000,
    lclMinM3: 2,
    fcl20ft: 8500000,
    fcl40ft: 15500000,
    trukCdd: 6800000,
    trukWingbox: 14500000,
    ruteLabel: 'Pelabuhan Tj. Perak (SUB) → Pelabuhan Soekarno-Hatta (UPG)'
  },
  'Surabaya-Balikpapan': {
    leadTime: '3–4 Hari (Kapal RoRo Terjadwal)',
    lclRatePerM3: 450000,
    lclMinM3: 2,
    fcl20ft: 9200000,
    fcl40ft: 16800000,
    trukCdd: 7500000,
    trukWingbox: 16000000,
    ruteLabel: 'Pelabuhan Tj. Perak (SUB) → Pelabuhan Semayang / Kariangau (BPN)'
  },
  'Surabaya-Banjarmasin': {
    leadTime: '2–3 Hari (Kapal RoRo Harian)',
    lclRatePerM3: 380000,
    lclMinM3: 2,
    fcl20ft: 7900000,
    fcl40ft: 14200000,
    trukCdd: 5800000,
    trukWingbox: 13200000,
    ruteLabel: 'Pelabuhan Tj. Perak (SUB) → Pelabuhan Trisakti (BDJ)'
  },
  'Surabaya-Medan': {
    leadTime: '6–8 Hari (Kargo Laut Reguler)',
    lclRatePerM3: 650000,
    lclMinM3: 2.5,
    fcl20ft: 14500000,
    fcl40ft: 25500000,
    trukCdd: 12500000,
    trukWingbox: 24000000,
    ruteLabel: 'Pelabuhan Tj. Perak (SUB) → Pelabuhan Belawan (MES)'
  },
  'Surabaya-Denpasar': {
    leadTime: '1–2 Hari (Truk Jalur Darat & Feri Ketapang)',
    lclRatePerM3: 280000,
    lclMinM3: 1.5,
    fcl20ft: 5200000,
    fcl40ft: 9800000,
    trukCdd: 3600000,
    trukWingbox: 8200000,
    ruteLabel: 'Depo Surabaya (SUB) → Selat Bali → Depo Benoa / Denpasar (DPS)'
  },
  'Surabaya-Jayapura': {
    leadTime: '10–14 Hari (Tol Laut / Kapal Kontainer Reguler)',
    lclRatePerM3: 980000,
    lclMinM3: 3,
    fcl20ft: 23500000,
    fcl40ft: 42000000,
    trukCdd: 21000000,
    trukWingbox: 38000000,
    ruteLabel: 'Pelabuhan Tj. Perak (SUB) → Pelabuhan Jayapura (DJJ)'
  },
  'Jakarta-Makassar': {
    leadTime: '4–5 Hari (Kapal Kontainer Terjadwal)',
    lclRatePerM3: 520000,
    lclMinM3: 2,
    fcl20ft: 10500000,
    fcl40ft: 18500000,
    trukCdd: 8900000,
    trukWingbox: 17500000,
    ruteLabel: 'Pelabuhan Tj. Priok (JKT) → Pelabuhan Soekarno-Hatta (UPG)'
  },
  'Jakarta-Balikpapan': {
    leadTime: '4–5 Hari (Pelayaran Reguler IKN)',
    lclRatePerM3: 540000,
    lclMinM3: 2,
    fcl20ft: 11200000,
    fcl40ft: 19800000,
    trukCdd: 9400000,
    trukWingbox: 18200000,
    ruteLabel: 'Pelabuhan Tj. Priok (JKT) → Pelabuhan Semayang (BPN)'
  },
  'Jakarta-Banjarmasin': {
    leadTime: '3–4 Hari (Pelayaran Terjadwal)',
    lclRatePerM3: 480000,
    lclMinM3: 2,
    fcl20ft: 9800000,
    fcl40ft: 17500000,
    trukCdd: 8200000,
    trukWingbox: 16500000,
    ruteLabel: 'Pelabuhan Tj. Priok (JKT) → Pelabuhan Trisakti (BDJ)'
  },
  'Jakarta-Medan': {
    leadTime: '4–5 Hari (Pelayaran Express Tj. Priok - Belawan)',
    lclRatePerM3: 580000,
    lclMinM3: 2,
    fcl20ft: 12500000,
    fcl40ft: 22000000,
    trukCdd: 11000000,
    trukWingbox: 21500000,
    ruteLabel: 'Pelabuhan Tj. Priok (JKT) → Pelabuhan Belawan (MES)'
  },
  'Jakarta-Denpasar': {
    leadTime: '2–3 Hari (Lintas Jawa - Bali Terusan)',
    lclRatePerM3: 380000,
    lclMinM3: 1.5,
    fcl20ft: 7800000,
    fcl40ft: 13800000,
    trukCdd: 5500000,
    trukWingbox: 11500000,
    ruteLabel: 'Depo Jakarta (JKT) → Tol Trans Jawa → Depo Denpasar (DPS)'
  },
  'Jakarta-Jayapura': {
    leadTime: '12–16 Hari (Kargo Tol Laut)',
    lclRatePerM3: 1150000,
    lclMinM3: 3,
    fcl20ft: 26500000,
    fcl40ft: 47000000,
    trukCdd: 24000000,
    trukWingbox: 42000000,
    ruteLabel: 'Pelabuhan Tj. Priok (JKT) → Pelabuhan Jayapura (DJJ)'
  },
  'Semarang-Makassar': {
    leadTime: '4–6 Hari (Via Tj. Emas / Feeder)',
    lclRatePerM3: 460000,
    lclMinM3: 2,
    fcl20ft: 9500000,
    fcl40ft: 17000000,
    trukCdd: 7600000,
    trukWingbox: 15500000,
    ruteLabel: 'Pelabuhan Tj. Emas (SRG) → Pelabuhan Soekarno-Hatta (UPG)'
  },
  'Semarang-Balikpapan': {
    leadTime: '4–5 Hari (Kapal RoRo / Kontainer)',
    lclRatePerM3: 480000,
    lclMinM3: 2,
    fcl20ft: 9900000,
    fcl40ft: 17800000,
    trukCdd: 8100000,
    trukWingbox: 16800000,
    ruteLabel: 'Pelabuhan Tj. Emas (SRG) → Pelabuhan Semayang (BPN)'
  },
  'Semarang-Banjarmasin': {
    leadTime: '3–4 Hari (Kapal RoRo Terjadwal)',
    lclRatePerM3: 420000,
    lclMinM3: 2,
    fcl20ft: 8800000,
    fcl40ft: 15600000,
    trukCdd: 6900000,
    trukWingbox: 14800000,
    ruteLabel: 'Pelabuhan Tj. Emas (SRG) → Pelabuhan Trisakti (BDJ)'
  },
  'Semarang-Medan': {
    leadTime: '6–8 Hari',
    lclRatePerM3: 670000,
    lclMinM3: 2.5,
    fcl20ft: 14800000,
    fcl40ft: 26000000,
    trukCdd: 12800000,
    trukWingbox: 24500000,
    ruteLabel: 'Pelabuhan Tj. Emas (SRG) → Pelabuhan Belawan (MES)'
  },
  'Semarang-Denpasar': {
    leadTime: '1–2 Hari (Lintas Pantura & Tol Trans Jawa)',
    lclRatePerM3: 310000,
    lclMinM3: 1.5,
    fcl20ft: 6200000,
    fcl40ft: 11200000,
    trukCdd: 4200000,
    trukWingbox: 9200000,
    ruteLabel: 'Depo Semarang (SRG) → Tol Jawa Timur → Feri Ketapang → Denpasar (DPS)'
  },
  'Semarang-Jayapura': {
    leadTime: '12–16 Hari',
    lclRatePerM3: 1100000,
    lclMinM3: 3,
    fcl20ft: 25000000,
    fcl40ft: 45000000,
    trukCdd: 23000000,
    trukWingbox: 41000000,
    ruteLabel: 'Pelabuhan Tj. Emas (SRG) → Pelabuhan Jayapura (DJJ)'
  }
};

function formatRupiah(num) {
  return 'Rp ' + Math.round(num).toLocaleString('id-ID');
}

function initTarifCalculator() {
  const originSelect = document.getElementById('calcOrigin');
  const destSelect = document.getElementById('calcDestination');
  const serviceSelect = document.getElementById('calcService');
  const volumeInput = document.getElementById('calcVolume');
  const weightInput = document.getElementById('calcWeight');
  
  // Dimension inputs
  const dimP = document.getElementById('dimPanjang');
  const dimL = document.getElementById('dimLebar');
  const dimT = document.getElementById('dimTinggi');

  const btnCalc = document.getElementById('btnHitungTarif');
  const resultCard = document.getElementById('calcResult');
  const waBtn = document.getElementById('calcWaBtn');

  if (!originSelect || !destSelect || !serviceSelect) return;

  // Auto calculate volume when dimensions change
  function updateVolumeFromDims() {
    if (dimP && dimL && dimT && volumeInput) {
      const p = parseFloat(dimP.value) || 0;
      const l = parseFloat(dimL.value) || 0;
      const t = parseFloat(dimT.value) || 0;
      if (p > 0 && l > 0 && t > 0) {
        // (P x L x T) in cm / 1,000,000 = m3
        const m3 = (p * l * t) / 1000000;
        volumeInput.value = m3.toFixed(2);
        calculateTarif();
      }
    }
  }

  if (dimP && dimL && dimT) {
    dimP.addEventListener('input', updateVolumeFromDims);
    dimL.addEventListener('input', updateVolumeFromDims);
    dimT.addEventListener('input', updateVolumeFromDims);
  }

  function calculateTarif() {
    const origin = originSelect.value;
    const dest = destSelect.value;
    const service = serviceSelect.value;
    let volume = parseFloat(volumeInput ? volumeInput.value : 1) || 1;
    let weight = parseFloat(weightInput ? weightInput.value : 100) || 100;

    const routeKey = `${origin}-${dest}`;
    const routeData = TARIFF_DATABASE[routeKey];

    if (!routeData) {
      alert('Rute yang dipilih belum tersedia dalam kalkulator cepat. Silakan hubungi CS kami.');
      return;
    }

    let totalEstimasi = 0;
    let rincianTarif = '';
    let minChargeNote = '';

    if (service === 'lcl') {
      const chargeableM3 = Math.max(volume, routeData.lclMinM3);
      totalEstimasi = chargeableM3 * routeData.lclRatePerM3;
      rincianTarif = `${chargeableM3.toFixed(1)} m³ × ${formatRupiah(routeData.lclRatePerM3)}/m³`;
      if (volume < routeData.lclMinM3) {
        minChargeNote = `(Berlaku Minimum Charge ${routeData.lclMinM3} m³ untuk rute ini)`;
      }
    } else if (service === 'fcl20') {
      totalEstimasi = routeData.fcl20ft;
      rincianTarif = `1 Kontainer 20ft GP (Kapasitas maks ~21 Ton / 33 m³) flat per box`;
    } else if (service === 'fcl40') {
      totalEstimasi = routeData.fcl40ft;
      rincianTarif = `1 Kontainer 40ft HC (Kapasitas maks ~26 Ton / 67 m³) flat per box`;
    } else if (service === 'cdd') {
      totalEstimasi = routeData.trukCdd;
      rincianTarif = `1 Unit Truk CDD Carter Eksklusif (Muatan s/d 4.5 Ton / 14 m³)`;
    } else if (service === 'wingbox') {
      totalEstimasi = routeData.trukWingbox;
      rincianTarif = `1 Unit Truk Tronton Wingbox Carter (Muatan s/d 18 Ton / 45 m³)`;
    }

    // Populate Results
    const elLeadTime = document.getElementById('resLeadTime');
    const elRute = document.getElementById('resRute');
    const elRincian = document.getElementById('resRincian');
    const elTotal = document.getElementById('resTotal');
    const elMinNote = document.getElementById('resMinNote');

    if (elLeadTime) elLeadTime.textContent = routeData.leadTime;
    if (elRute) elRute.textContent = routeData.ruteLabel;
    if (elRincian) elRincian.textContent = rincianTarif;
    if (elTotal) elTotal.textContent = formatRupiah(totalEstimasi);
    if (elMinNote) elMinNote.textContent = minChargeNote;

    if (resultCard) {
      resultCard.classList.remove('hidden');
      resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // WhatsApp Booking Button Link
    if (waBtn) {
      const serviceNameMap = {
        'lcl': 'Kargo Laut LCL (Kubikasi)',
        'fcl20': 'FCL Kontainer 20ft',
        'fcl40': 'FCL Kontainer 40ft',
        'cdd': 'Sewa Truk Carter CDD Box',
        'wingbox': 'Sewa Truk Tronton Wingbox'
      };

      const waMsg = `Halo Tim SLN Cargo, saya ingin booking slot pengiriman:%0A%0A` +
        `• *Rute*: ${origin} ke ${dest}%0A` +
        `• *Layanan*: ${serviceNameMap[service]}%0A` +
        `• *Estimasi Volume/Berat*: ${volume} m³ / ${weight} kg%0A` +
        `• *Estimasi Kalkulator*: ${formatRupiah(totalEstimasi)} (${routeData.leadTime})%0A%0A` +
        `Mohon konfirmasi jadwal kapal / armada terdekat dan penawaran resminya. Terima kasih.`;

      waBtn.href = `https://wa.me/6289680551957?text=${waMsg}`;
    }
  }

  if (btnCalc) {
    btnCalc.addEventListener('click', (e) => {
      e.preventDefault();
      calculateTarif();
    });
  }

  // Trigger once on change of selects
  originSelect.addEventListener('change', calculateTarif);
  destSelect.addEventListener('change', calculateTarif);
  serviceSelect.addEventListener('change', calculateTarif);
}

/* ==========================================================================
   3. LIVE SIMULATOR LACAK RESI / AWB
   ========================================================================== */
const AWB_SAMPLES = {
  'SLN-SUB-8821': {
    resi: 'SLN-SUB-8821',
    shipper: 'PT Semen Inti Perkasa (Gresik/Surabaya)',
    consignee: 'CV Mega Konstruksi Nusantara (Makassar)',
    layanan: 'FCL 1x 20ft Container (Mesin & Material Bangunan)',
    vessel: 'KM Dharma Rucitra VII (Voy. 28/V)',
    currentStep: 3, // 1: Origin, 2: Loading Kapal, 3: In Transit Pelayaran, 4: Sandar & Stripping, 5: Terkirim
    statusBadge: 'DALAM PELAYARAN LAUT (IN TRANSIT)',
    statusColor: 'bg-amber-500 text-slate-950',
    milestones: [
      {
        title: 'Kargo Diterima di Depo Perak Surabaya',
        date: '12 Okt 2026, 09:15 WIB',
        desc: 'Penerimaan kontainer di Depo Perak Timur No. 88, inspeksi segil ISO, timbang muatan 19.820 kg.',
        completed: true
      },
      {
        title: 'Stuffing & Loading ke Kapal di Pelabuhan Tj. Perak',
        date: '13 Okt 2026, 03:40 WIB',
        desc: 'Proses muat crane terminal Teluk Lamong ke KM Dharma Rucitra VII Bay 14 Row 02.',
        completed: true
      },
      {
        title: 'Kapal Bertolak Menuju Pelabuhan Makassar',
        date: '13 Okt 2026, 07:00 WIB',
        desc: 'ATD Tanjung Perak. Posisi navigasi Selat Madura menuju Laut Jawa - Selat Makassar. Kecepatan 16 knots.',
        completed: true,
        active: true
      },
      {
        title: 'Estimasi Sandar di Pelabuhan Soekarno-Hatta Makassar',
        date: '15 Okt 2026, 14:00 WITA (Estimasi)',
        desc: 'Rencana sandar dermaga kargo UPG. Disusul proses un-loading dan penarikan trailer ke Depo SLN Makassar.',
        completed: false
      },
      {
        title: 'Dooring Delivery ke Lokasi Proyek Konsinyi',
        date: '16 Okt 2026 (Estimasi)',
        desc: 'Pengantaran via armada Trailer SLN Makassar dengan pengawalan serah terima BAST & Surat Jalan Asli.',
        completed: false
      }
    ]
  },
  'SLN-JKT-9904': {
    resi: 'SLN-JKT-9904',
    shipper: 'PT Tri Dharma Manunggal (Marunda Jakarta)',
    consignee: 'PT Borneo Mandiri Logistik (Balikpapan - IKN)',
    layanan: 'Kargo LCL 18.5 m³ (Pipa HDPE & Sambungan Sanitasi)',
    vessel: 'KM Meratus Kariangau (Voy. 102/B)',
    currentStep: 4,
    statusBadge: 'PROSES STRIPPING & DELIVERY TRUK',
    statusColor: 'bg-blue-600 text-white',
    milestones: [
      {
        title: 'Diterima di Gudang Konsolidasi Marunda',
        date: '09 Okt 2026, 14:20 WIB',
        desc: 'Konsolidasi kargo LCL volume 18.5 m³, paletisasi strapping dan tagging barcode SLN.',
        completed: true
      },
      {
        title: 'Pemuatan ke Kontainer Bersama & Loading Kapal',
        date: '10 Okt 2026, 21:00 WIB',
        desc: 'Pemberangkatan dari Pelabuhan Tanjung Priok menuju Balikpapan.',
        completed: true
      },
      {
        title: 'Kapal Tiba di Pelabuhan Semayang Balikpapan',
        date: '13 Okt 2026, 11:30 WITA',
        desc: 'Kapal sandar tepat waktu. Pemeriksaan dokumen manifest kargo oleh Syahbandar.',
        completed: true
      },
      {
        title: 'Stripping di Depo SLN Kariangau & Muat ke CDD Box',
        date: '14 Okt 2026, 08:45 WITA',
        desc: 'Kargo dikeluarkan dari kontainer laut, diperiksa kesesuaian koli, dan dimuat ke truk CDD No. Pol KT 8412 BPN.',
        completed: true,
        active: true
      },
      {
        title: 'Pengantaran Akhir ke Proyek Wilayah IKN Sepaku',
        date: '14 Okt 2026, Sore Hari (Dalam Perjalanan)',
        desc: 'Sopir CDD sedang dalam rute antar menuju titik unloading proyek IKN.',
        completed: false
      }
    ]
  },
  'SLN-SMR-3120': {
    resi: 'SLN-SMR-3120',
    shipper: 'PT Sari Boga Lestari (Semarang)',
    consignee: 'UD Bali Makmur Distribusi (Denpasar)',
    layanan: 'Sewa Truk Carter Tronton Wingbox 45 m³ (FMCG)',
    vessel: 'Armada Darat Truk Hino 500 (No. Pol H 8920 OQ)',
    currentStep: 5,
    statusBadge: 'TERKIRIM LENGKAP / POD CLOSED',
    statusColor: 'bg-emerald-600 text-white',
    milestones: [
      {
        title: 'Pemuatan di Pabrik Pengirim Semarang',
        date: '11 Okt 2026, 10:00 WIB',
        desc: 'Loading 1.450 karton makanan kemasan, penguncian segil pintu wingbox oleh QC pabrik.',
        completed: true
      },
      {
        title: 'Perjalanan Tol Trans Jawa Menuju Pelabuhan Ketapang',
        date: '11 Okt 2026, 23:45 WIB',
        desc: 'Armada melintasi Tol Paspro - Probolinggo Timur dengan aman terpantau GPS SLN Fleet.',
        completed: true
      },
      {
        title: 'Penyeberangan Feri Selat Bali (Ketapang - Gilimanuk)',
        date: '12 Okt 2026, 04:30 WIB / 05:30 WITA',
        desc: 'Masuk KMP Dharma Rucitra, penyeberangan lancar tanpa antrean dermaga LCM.',
        completed: true
      },
      {
        title: 'Tiba di Gudang Konsinyi Denpasar & Bongkar Muatan',
        date: '12 Okt 2026, 11:15 WITA',
        desc: 'Pembukaan segil bersama, pemeriksaan koli 100% utuh tanpa kerusakan.',
        completed: true
      },
      {
        title: 'Serah Terima Selesai & Dokumen POD Divalidasi',
        date: '12 Okt 2026, 13:00 WITA',
        desc: 'Surat Jalan telah ditandatangani dan dicap basah oleh Bpk. I Wayan Suardana. Scan digital POD terunggah.',
        completed: true,
        active: false
      }
    ]
  }
};

function initTrackingSimulator() {
  const inputAwb = document.getElementById('inputAwb');
  const btnTrack = document.getElementById('btnTrack');
  const sampleBtns = document.querySelectorAll('.sample-awb-btn');
  const trackingResult = document.getElementById('trackingResult');

  if (!inputAwb || !trackingResult) return;

  function renderTracking(code) {
    const cleanCode = code.trim().toUpperCase();
    let data = AWB_SAMPLES[cleanCode];

    // Fallback simulation if user inputs any random resi
    if (!data) {
      data = {
        resi: cleanCode,
        shipper: 'PT Logistik Mitra Kargo (Klien Terdaftar)',
        consignee: 'Gudang Konsinyi Distribusi Cabang',
        layanan: 'Kargo Laut Terpadu Door-to-Door',
        vessel: 'KM Samudera Express VIII',
        currentStep: 2,
        statusBadge: 'DALAM PROSES OPERASIONAL',
        statusColor: 'bg-sky-600 text-white',
        milestones: [
          {
            title: 'Kargo Masuk Manifest Operasional SLN',
            date: 'Hari ini, 08:30 WIB',
            desc: `Resi ${cleanCode} tercatat di sistem sentral SLN Cargo Tanjung Perak.`,
            completed: true
          },
          {
            title: 'Pemeriksaan Fisik & Penimbangan Dimensi',
            date: 'Hari ini, 11:00 WIB',
            desc: 'Verifikasi berat dan kubikasi kargo sesuai standar SOLAS VGM maritim.',
            completed: true,
            active: true
          },
          {
            title: 'Penataan Storing di Depo Transit',
            date: 'Dalam Antrean Kapal',
            desc: 'Menunggu alokasi slot pelayaran kapal kargo jadwal keberangkatan berikutnya.',
            completed: false
          },
          {
            title: 'Pelayaran Menuju Pelabuhan Tujuan',
            date: 'Menunggu Keberangkatan',
            desc: 'Akan diupdate begitu Surat Persetujuan Berlayar (SPB) diterbitkan Syahbandar.',
            completed: false
          },
          {
            title: 'Pengantaran Akhir & Konfirmasi POD',
            date: 'Jadwal Mengikuti Sandar',
            desc: 'Handover kargo dan serah terima dokumen surat jalan fisik.',
            completed: false
          }
        ]
      };
    }

    // Populate data
    document.getElementById('trackResiCode').textContent = data.resi;
    document.getElementById('trackShipper').textContent = data.shipper;
    document.getElementById('trackConsignee').textContent = data.consignee;
    document.getElementById('trackService').textContent = data.layanan;
    document.getElementById('trackVessel').textContent = data.vessel;

    const badge = document.getElementById('trackStatusBadge');
    if (badge) {
      badge.className = `px-3 py-1 text-xs font-mono font-bold uppercase rounded ${data.statusColor}`;
      badge.textContent = data.statusBadge;
    }

    // Render Timeline Milestones
    const stepperContainer = document.getElementById('trackStepper');
    if (stepperContainer) {
      stepperContainer.innerHTML = '';
      data.milestones.forEach((m, idx) => {
        const stepNum = idx + 1;
        const isDone = m.completed;
        const isActive = m.active;

        let iconClass = 'fa-solid fa-check text-white';
        let bgClass = 'bg-emerald-600 border-emerald-600';
        let lineClass = 'bg-emerald-600';

        if (isActive) {
          iconClass = 'fa-solid fa-circle-dot text-slate-950 animate-pulse';
          bgClass = 'bg-amber-400 border-amber-500 shadow-md shadow-amber-500/30';
        } else if (!isDone) {
          iconClass = 'fa-solid fa-circle text-slate-600 text-[8px]';
          bgClass = 'bg-slate-800 border-slate-700';
          lineClass = 'bg-slate-800';
        }

        const isLast = idx === data.milestones.length - 1;

        const itemHtml = `
          <div class="relative flex items-start gap-4 pb-8 ${isLast ? 'pb-2' : ''}">
            ${!isLast ? `<div class="absolute top-6 left-4 -ml-[1px] w-0.5 h-full ${lineClass}"></div>` : ''}
            <div class="relative z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 ${bgClass}">
              <i class="${iconClass}"></i>
            </div>
            <div class="flex-1 pt-0.5">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <h4 class="font-bold text-sm ${isActive ? 'text-amber-400 font-extrabold' : (isDone ? 'text-slate-100' : 'text-slate-500')}">
                  ${m.title}
                </h4>
                <span class="text-xs font-mono ${isActive ? 'text-amber-300 font-semibold' : 'text-slate-400'}">
                  ${m.date}
                </span>
              </div>
              <p class="text-xs text-slate-400 mt-1 leading-relaxed">
                ${m.desc}
              </p>
            </div>
          </div>
        `;
        stepperContainer.insertAdjacentHTML('beforeend', itemHtml);
      });
    }

    trackingResult.classList.remove('hidden');
    trackingResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  if (btnTrack) {
    btnTrack.addEventListener('click', (e) => {
      e.preventDefault();
      if (inputAwb.value.trim()) {
        renderTracking(inputAwb.value.trim());
      } else {
        alert('Silakan masukkan nomor resi AWB (contoh: SLN-SUB-8821)');
      }
    });
  }

  sampleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.getAttribute('data-sample');
      if (code) {
        inputAwb.value = code;
        renderTracking(code);
      }
    });
  });
}

/* ==========================================================================
   4. 3-STEP ENTERPRISE RFQ (REQUEST FOR QUOTATION) MODAL
   ========================================================================== */
function initRfqModal() {
  const modal = document.getElementById('rfqModal');
  const openBtns = document.querySelectorAll('.btn-open-rfq');
  const closeBtns = document.querySelectorAll('.btn-close-rfq');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    });
  });

  // Step wizard logic
  let currentStep = 1;
  const stepPanels = [
    document.getElementById('rfqStep1'),
    document.getElementById('rfqStep2'),
    document.getElementById('rfqStep3')
  ];
  const stepIndicators = [
    document.getElementById('rfqInd1'),
    document.getElementById('rfqInd2'),
    document.getElementById('rfqInd3')
  ];

  function showStep(step) {
    currentStep = step;
    stepPanels.forEach((p, idx) => {
      if (p) {
        if (idx + 1 === step) {
          p.classList.remove('hidden');
        } else {
          p.classList.add('hidden');
        }
      }
    });

    stepIndicators.forEach((ind, idx) => {
      if (ind) {
        if (idx + 1 <= step) {
          ind.classList.remove('bg-slate-700', 'text-slate-400');
          ind.classList.add('bg-amber-500', 'text-slate-950', 'font-bold');
        } else {
          ind.classList.remove('bg-amber-500', 'text-slate-950', 'font-bold');
          ind.classList.add('bg-slate-700', 'text-slate-400');
        }
      }
    });
  }

  const nextBtn1 = document.getElementById('rfqNext1');
  const nextBtn2 = document.getElementById('rfqNext2');
  const prevBtn2 = document.getElementById('rfqPrev2');
  const prevBtn3 = document.getElementById('rfqPrev3');
  const submitBtn = document.getElementById('rfqSubmit');

  if (nextBtn1) nextBtn1.addEventListener('click', () => showStep(2));
  if (nextBtn2) nextBtn2.addEventListener('click', () => showStep(3));
  if (prevBtn2) prevBtn2.addEventListener('click', () => showStep(1));
  if (prevBtn3) prevBtn3.addEventListener('click', () => showStep(2));

  if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const nama = document.getElementById('rfqNama')?.value || 'PIC Logistik';
      const pt = document.getElementById('rfqPerusahaan')?.value || 'Perusahaan Mitra';
      const wa = document.getElementById('rfqTelp')?.value || '-';
      const rute = document.getElementById('rfqRute')?.value || 'Antar Pulau';
      const kargo = document.getElementById('rfqJenisKargo')?.value || 'Umum';
      const tonase = document.getElementById('rfqTonase')?.value || 'Kontrak Rutin';

      const msg = `Halo Tim Komersial SLN Cargo, kami mengajukan *Request for Quotation (RFQ)* resmi:%0A%0A` +
        `• *Perusahaan*: ${pt}%0A` +
        `• *Nama PIC*: ${nama} (${wa})%0A` +
        `• *Rute Pengiriman*: ${rute}%0A` +
        `• *Komoditas*: ${kargo}%0A` +
        `• *Volume/Frekuensi*: ${tonase}%0A%0A` +
        `Mohon dikirimkan proposal penawaran tarif B2B & SLA resmi ke email/kontak kami. Terima kasih.`;

      window.open(`https://wa.me/6289680551957?text=${msg}`, '_blank');
      modal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
      alert('Terima kasih. Permintaan Penawaran Tender (RFQ) Anda berhasil diarahkan ke WhatsApp Enterprise SLN Cargo. Tim Komersial kami akan segera menindaklanjuti.');
    });
  }
}

/* ==========================================================================
   5. ACCORDION FAQ LOGISTIK
   ========================================================================== */
function initFaqAccordion() {
  const faqButtons = document.querySelectorAll('.faq-btn');
  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-icon');
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      // Toggle state
      btn.setAttribute('aria-expanded', !isExpanded);
      if (content) {
        content.classList.toggle('hidden');
      }
      if (icon) {
        icon.classList.toggle('rotate-180');
      }
    });
  });
}
