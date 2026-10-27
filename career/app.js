/**
 * AAMON - CAREER COMMAND & PORTFOLIO HUB
 * Warm Monochrome Architecture, Collapsible Sidebar, Multi-CV Vault & Tracker Engine
 */

// --- 1. IndexedDB Helper for Storing Real CV & Document Files ---
const DB_NAME = 'AamonCareerVaultDB';
const DB_VERSION = 1;
const STORE_NAME = 'vaultFiles';

function openVaultDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'key' });
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function saveFileToVault(key, fileObj) {
    try {
        const db = await openVaultDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            const record = {
                key: key,
                name: fileObj.name,
                type: fileObj.type,
                size: fileObj.size,
                lastModified: fileObj.lastModified || Date.now(),
                data: fileObj
            };
            store.put(record);
            tx.oncomplete = () => resolve(true);
            tx.onerror = () => reject(tx.error);
        });
    } catch (err) {
        console.error("IndexedDB Save Error:", err);
        return false;
    }
}

async function getFileFromVault(key) {
    try {
        const db = await openVaultDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readonly');
            const store = tx.objectStore(STORE_NAME);
            const req = store.get(key);
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    } catch (err) {
        console.error("IndexedDB Get Error:", err);
        return null;
    }
}

async function deleteFileFromVault(key) {
    try {
        const db = await openVaultDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            store.delete(key);
            tx.oncomplete = () => resolve(true);
            tx.onerror = () => reject(tx.error);
        });
    } catch (err) {
        console.error("IndexedDB Delete Error:", err);
        return false;
    }
}

// --- 2. Default Configuration & Initial Data ---
const DEFAULT_TARGETS = {
    daily: 5,
    weekly: 25,
    monthly: 100
};

const CV_PROFILES = [
    {
        id: 'cv_frontend',
        code: 'CV-A',
        title: 'Frontend & UI Specialist',
        targetRoles: 'Frontend Developer, UI Developer, React.js / Vue.js Dev, Web Designer',
        description: 'Fokus pada arsitektur komponen modern, responsive layouts, Tailwind CSS, core web vitals, dan interaktivitas JavaScript ES6+.',
        keywords: ['Tailwind CSS', 'React.js', 'JavaScript ES6+', 'Responsive Design', 'PageSpeed 95+', 'Micro-Interactions']
    },
    {
        id: 'cv_fullstack',
        code: 'CV-B',
        title: 'Full-stack & Web App Developer',
        targetRoles: 'Full-stack Developer, Web Application Engineer, Node.js / PHP Dev',
        description: 'Fokus pada pengembangan aplikasi end-to-end, REST API, integrasi database, arsitektur Nginx/Linux, dan logic POS/SaaS.',
        keywords: ['Node.js', 'PHP / Python', 'REST API', 'MySQL / SQLite', 'Nginx & Linux VPS', 'Full Lifecycle App']
    },
    {
        id: 'cv_scraping',
        code: 'CV-C',
        title: 'Web Scraping & Automation Specialist',
        targetRoles: 'Automation Engineer, Data Scraper, Python Bot Developer, ETL Specialist',
        description: 'Fokus pada ekstraksi data terstruktur, anti-blocking proxy bypass, automated crawling, data pipeline, dan scheduled bots.',
        keywords: ['Python Scrapy', 'Selenium / Playwright', 'Data Mining', 'ETL Pipeline', 'Cron Automation', 'API Webhook']
    },
    {
        id: 'cv_general',
        code: 'CV-D',
        title: 'Tech Specialist & WordPress / CMS',
        targetRoles: 'WordPress Developer, IT Web Support, Tech Generalist, Freelance Lead',
        description: 'Fokus pada pembuatan website cepat untuk UMKM/bisnis, integrasi payment gateway, custom theme/plugins, dan client handling.',
        keywords: ['WordPress / Elementor', 'Speed Optimization', 'Domain & DNS', 'WhatsApp Commerce', 'Security & Backup']
    }
];

const INITIAL_APPLICATIONS = [
    {
        id: 'app-001',
        company: 'PT Telkom Digital Solutions',
        position: 'Frontend Web Developer',
        jobType: 'Full-time (Hybrid)',
        location: 'Jakarta Selatan',
        platform: 'LinkedIn',
        salaryRange: 'Rp 9.000.000 - Rp 13.000.000',
        appliedDate: new Date().toISOString().split('T')[0],
        cvVersion: 'cv_frontend',
        status: 'interview',
        interviewDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        notes: 'Wawancara user teknis hari Kamis jam 14:00 WIB. Diminta mempresentasikan demo proyek POS kasir dan sistem booking.',
        jobUrl: 'https://linkedin.com/jobs/view/12345678',
        background: 'Mencari pengembang yang mahir Tailwind CSS, modern responsive UI, dan integrasi API RESTful.'
    },
    {
        id: 'app-002',
        company: 'Bukalapak (Tech Division)',
        position: 'Junior Software Engineer (Web)',
        jobType: 'Full-time (Remote)',
        location: 'Jakarta (Remote)',
        platform: 'Jobstreet',
        salaryRange: 'Rp 8.500.000 - Rp 11.500.000',
        appliedDate: new Date().toISOString().split('T')[0],
        cvVersion: 'cv_fullstack',
        status: 'test',
        interviewDate: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0],
        notes: 'Take-home coding test: Membuat modul cart checkout dengan validasi diskon bertingkat. Deadline hari Sabtu.',
        jobUrl: 'https://jobstreet.co.id/job/9876543',
        background: 'Pengembangan fitur merchant dashboard, pemrosesan transaksi berkecepatan tinggi.'
    },
    {
        id: 'app-003',
        company: 'Sirclo Omni-Commerce',
        position: 'Automation & Scraping Specialist',
        jobType: 'Contract (12 Bulan)',
        location: 'Tangerang / Remote',
        platform: 'Glints',
        salaryRange: 'Rp 10.000.000 - Rp 14.000.000',
        appliedDate: new Date(Date.now() - 86400000 * 1).toISOString().split('T')[0],
        cvVersion: 'cv_scraping',
        status: 'screening',
        interviewDate: '',
        notes: 'CV sudah lolos screening awal HR, menunggu penjadwalan interview dengan Lead Data Engineer.',
        jobUrl: 'https://glints.com/id/opportunities/jobs/456789',
        background: 'Otomasi crawling katalog marketplace dan perbandingan harga komoditas e-commerce.'
    },
    {
        id: 'app-004',
        company: 'Agensi Media Kreatif Indie',
        position: 'WordPress & Web Designer',
        jobType: 'Freelance / Project',
        location: 'Bandung (Remote)',
        platform: 'Direct Email',
        salaryRange: 'Rp 5.000.000 / Proyek',
        appliedDate: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
        cvVersion: 'cv_general',
        status: 'offering',
        interviewDate: '',
        notes: 'Offering diterima! Kontrak pembuatan 3 website brand lokal dengan target rilis bulan depan.',
        jobUrl: '',
        background: 'Desain web company profile estetik dan integrasi WhatsApp katalog produk.'
    },
    {
        id: 'app-005',
        company: 'Fintech Startup KoinNusa',
        position: 'Frontend React Developer',
        jobType: 'Full-time (On-site)',
        location: 'Jakarta Pusat',
        platform: 'Kalibrr',
        salaryRange: 'Rp 10.000.000 - Rp 15.000.000',
        appliedDate: new Date(Date.now() - 86400000 * 3).toISOString().split('T')[0],
        cvVersion: 'cv_frontend',
        status: 'applied',
        interviewDate: '',
        notes: 'Lamaran baru dikirim via Kalibrr lengkap dengan link portfolio jalaninweb.site.',
        jobUrl: 'https://kalibrr.com/c/koinnusa/jobs',
        background: 'Perancangan antarmuka aplikasi kredit mikro dan kalkulator simulasi cicilan.'
    }
];

// 28 Live Portfolio Projects Reference
const PORTFOLIO_PROJECTS = [
    { id: '01', title: 'Kontraktor Renovasi & Bangun Rumah', cat: 'compro', catName: 'Company Profile', path: '01-landing-page-compro/01-kontraktor-renovasi', tag: 'Kalkulator RAB', desc: 'Landing page kontraktor dengan simulasi biaya bangun real-time & galeri proyek interaktif.' },
    { id: '02', title: 'Service AC & Laundry Panggilan', cat: 'compro', catName: 'Company Profile', path: '01-landing-page-compro/02-service-ac-laundry', tag: 'Live Booking Unit', desc: 'Sistem dispatch teknisi cuci AC panggilan 60 menit & kalkulator tarif instan.' },
    { id: '03', title: 'Pabrik Konveksi & Sablon Seragam', cat: 'compro', catName: 'Company Profile', path: '01-landing-page-compro/03-konveksi-percetakan', tag: 'Tiered Pricing Engine', desc: 'Simulasi harga grosir bertingkat, panduan gramasi kain, dan mockup 3D request.' },
    { id: '04', title: 'Katering Nasi Box & Paket Aqiqah', cat: 'ecommerce', catName: 'Toko Online', path: '02-katalog-toko-online/04-katering-kuliner', tag: 'Keranjang Acara 50 Box', desc: 'Katalog hidangan halal, diskon porsi besar otomatis 10%, dan nota invoice WA.' },
    { id: '05', title: 'Brand Fashion Hijab & Skincare', cat: 'ecommerce', catName: 'Toko Online', path: '02-katalog-toko-online/05-toko-fashion-skincare', tag: 'Lookbook & Cart', desc: 'Katalog busana muslim modern dengan swatch varian warna, panduan ukuran, dan keranjang belanja.' },
    { id: '06', title: 'Pusat Booking Lapangan Futsal & Badminton', cat: 'booking', catName: 'Booking System', path: '03-sistem-booking-reservasi/06-booking-lapangan-olahraga', tag: 'Interactive Time Slots', desc: 'Reservasi jadwal jam lapangan olahraga real-time dengan status slot terisi / kosong.' },
    { id: '07', title: 'Salon Kecantikan & Barber VIP', cat: 'booking', catName: 'Booking System', path: '03-sistem-booking-reservasi/07-booking-salon-klinik-studio', tag: 'Stylist Selection', desc: 'Pilih jadwal perawatan rambut/wajah, pilih kapster profesional, dan direct WA voucher.' },
    { id: '08', title: 'Aplikasi Kasir POS Kafe & Resto Modern', cat: 'pos', catName: 'Web App & POS', path: '04-aplikasi-manajemen-pos/08-aplikasi-kasir-pos', tag: 'Realtime POS App', desc: 'Sistem kasir web lengkap dengan meja dining, split bill, cetak struk digital & laporan omzet.' },
    { id: '09', title: 'Sistem Manajemen Laundry Kiloan & Satuan', cat: 'pos', catName: 'Web App & POS', path: '04-aplikasi-manajemen-pos/09-aplikasi-manajemen-laundry', tag: 'Status Tracking Nota', desc: 'Pelacak status cuci pakaian real-time, barcode struk, dan broadcast WA otomatis.' },
    { id: '10', title: 'Manajemen Kos Eksklusif & Bengkel Motor', cat: 'pos', catName: 'Web App & POS', path: '04-aplikasi-manajemen-pos/10-aplikasi-kos-bengkel', tag: 'Dwi-Modul SaaS', desc: 'Dashboard sewa kamar kos & antrean servis motor berkala dengan rekam jejak plat nomor.' },
    { id: '11', title: 'Rental Mobil Lepas Kunci & Paket Wisata', cat: 'compro', catName: 'Company Profile', path: '01-landing-page-compro/11-rental-mobil-wisata', tag: 'Armada & Kalkulator', desc: 'Katalog armada mobil lengkap, tarif per 12/24 jam, dan form verifikasi identitas penyewa.' },
    { id: '12', title: 'Klinik Gigi Spesialis & Estetika Senyum', cat: 'compro', catName: 'Company Profile', path: '01-landing-page-compro/12-klinik-gigi-kecantikan', tag: 'Simulasi Cicilan 0%', desc: 'Kalkulator tindakan medis gigi, jadwal praktik dokter spesialis, dan slider before-after.' },
    { id: '13', title: 'Pabrik Furnitur Jati & Mebel Ukir Jepara', cat: 'ecommerce', catName: 'Toko Online', path: '02-katalog-toko-online/13-mebel-furnitur-jepara', tag: 'Custom Furniture', desc: 'Katalog mebel kayu solid premium, kalkulator ongkir truk ekspedisi, dan garansi 10 tahun.' },
    { id: '14', title: 'Petshop, Rawat Inap & Grooming Anabul', cat: 'ecommerce', catName: 'Toko Online', path: '02-katalog-toko-online/14-petshop-grooming-hewan', tag: 'Pet Care Booking', desc: 'Katalog pakan anabul, reservasi grooming panggilan ke rumah, dan booking hotel kucing.' },
    { id: '15', title: 'Reservasi Villa Eksklusif & Glamping Alam', cat: 'booking', catName: 'Booking System', path: '03-sistem-booking-reservasi/15-booking-villa-glamping', tag: 'Date Range Picker', desc: 'Pengecekan ketersediaan tanggal menginap, add-on fasilitas BBQ/extrabed, dan tour 360.' },
    { id: '16', title: 'Sistem Informasi Klinik, Koperasi & Sekolah', cat: 'pos', catName: 'Web App & POS', path: '04-aplikasi-manajemen-pos/16-aplikasi-klinik-koperasi-sekolah', tag: 'Tri-Sistem Terpadu', desc: 'Rekam medis pasien SOAP, pembukuan simpan pinjam koperasi, dan tagihan SPP digital.' },
    { id: '17', title: 'Kontraktor Sipil, Infrastruktur & Pabrik', cat: 'corporate', catName: 'Corporate', path: '05-landing-page-corporate/17-kontraktor-sipil', tag: 'Multi-Page Corporate', desc: 'Portal perusahaan konstruksi B2B grade tinggi dengan sertifikasi ISO dan profil proyek BUMN.' },
    { id: '18', title: 'Ekspedisi Kargo Logistik Darat & Laut', cat: 'corporate', catName: 'Corporate', path: '05-landing-page-corporate/18-ekspedisi-kargo-logistik', tag: 'Lacak Resi & Tarif', desc: 'Cek ongkir kargo kontainer FCL/LCL, pelacak nomor resi armada, dan jaringan pergudangan.' },
    { id: '19', title: 'Roastery Artisan Kopi Spesialti', cat: 'onepage', catName: 'Onepage', path: '06-landing-page-onepage/19-roastery-kopi', tag: 'Manual Brew Specs', desc: 'E-brosur kurasi biji kopi single origin, profil roasting, dan video edukasi barista.' },
    { id: '20', title: 'Studio Foto & Video Sinematik Kreatif', cat: 'onepage', catName: 'Onepage', path: '06-landing-page-onepage/20-studio-foto-video', tag: 'Paket Photoshoot', desc: 'Kalkulator paket foto wedding/produk, galeri lookbook karya, dan reservasi studio.' },
    { id: '21', title: 'Kafe Dessert & Bakery Freshly Baked', cat: 'onepage', catName: 'Onepage', path: '06-landing-page-onepage/21-kafe-dessert', tag: 'Menu Dine-In / Takeaway', desc: 'Brosur menu pastry artisan harian, reservasi meja kumpul, dan video pembuatan kue.' },
    { id: '22', title: 'Bimbel Calistung, PAUD & Daycare Anak', cat: 'onepage', catName: 'Onepage', path: '06-landing-page-onepage/22-bimbel-paud-anak', tag: 'Simulasi SPP & Trial', desc: 'Kalkulator biaya kelas calistung anak usia dini, pendaftaran free trial class, dan SOP daycare.' },
    { id: '28', title: 'MAHKOTA Rental Tenda & Alat Pesta Pernikahan', cat: 'onepage', catName: 'Onepage', path: '06-landing-page-onepage/28-rental-tenda-event', tag: 'Kalkulator Paket Pesta', desc: 'Kalkulator paket tenda dekorasi pelaminan, genset, sound system, dan kalender ketersediaan.' },
    { id: 'wedding', title: 'Digital Wedding Invitation Dio & Ika', cat: 'wedding', catName: 'Wedding Invitation', path: 'wedding', tag: 'RSVP Google Sheets Sync', desc: 'Undangan pernikahan digital mewah dengan buku tamu cloud, musik chorus, dan template WA.' }
];

// --- 3. State Management ---
class CareerStore {
    constructor() {
        this.applications = this.loadApplications();
        this.targets = this.loadTargets();
        this.currentView = 'tracker'; // default active view
        this.trackerDisplayMode = 'table'; // 'table' or 'kanban'
        this.calendarDate = new Date(); // current month view in calendar
        this.isSidebarCollapsed = localStorage.getItem('aamon_sidebar_collapsed') === 'true';
        this.filters = {
            search: '',
            status: 'all',
            cvVersion: 'all',
            platform: 'all'
        };
    }

    loadApplications() {
        try {
            const raw = localStorage.getItem('aamon_applications') || localStorage.getItem('arkin_applications');
            if (raw) return JSON.parse(raw);
        } catch (e) {
            console.error("Failed to load applications:", e);
        }
        return [...INITIAL_APPLICATIONS];
    }

    saveApplications() {
        try {
            localStorage.setItem('aamon_applications', JSON.stringify(this.applications));
        } catch (e) {
            console.error("Failed to save applications:", e);
        }
    }

    loadTargets() {
        try {
            const raw = localStorage.getItem('aamon_targets') || localStorage.getItem('arkin_targets');
            if (raw) return JSON.parse(raw);
        } catch (e) {}
        return { ...DEFAULT_TARGETS };
    }

    saveTargets(targets) {
        this.targets = { ...this.targets, ...targets };
        localStorage.setItem('aamon_targets', JSON.stringify(this.targets));
    }

    addApplication(appData) {
        const newApp = {
            id: 'app-' + Date.now(),
            appliedDate: new Date().toISOString().split('T')[0],
            status: 'applied',
            ...appData
        };
        this.applications.unshift(newApp);
        this.saveApplications();
        return newApp;
    }

    updateApplication(id, updateData) {
        const idx = this.applications.findIndex(a => a.id === id);
        if (idx !== -1) {
            this.applications[idx] = { ...this.applications[idx], ...updateData };
            this.saveApplications();
            return this.applications[idx];
        }
        return null;
    }

    deleteApplication(id) {
        this.applications = this.applications.filter(a => a.id !== id);
        this.saveApplications();
    }

    getFilteredApplications() {
        return this.applications.filter(app => {
            const matchSearch = !this.filters.search || 
                app.company.toLowerCase().includes(this.filters.search.toLowerCase()) ||
                app.position.toLowerCase().includes(this.filters.search.toLowerCase()) ||
                (app.location && app.location.toLowerCase().includes(this.filters.search.toLowerCase())) ||
                (app.notes && app.notes.toLowerCase().includes(this.filters.search.toLowerCase()));

            const matchStatus = this.filters.status === 'all' || app.status === this.filters.status;
            const matchCv = this.filters.cvVersion === 'all' || app.cvVersion === this.filters.cvVersion;
            const matchPlatform = this.filters.platform === 'all' || app.platform === this.filters.platform;

            return matchSearch && matchStatus && matchCv && matchPlatform;
        });
    }

    getMetrics() {
        const now = new Date();
        const todayStr = now.toISOString().split('T')[0];

        // Start of current week (Monday)
        const dayOfWeek = now.getDay() || 7;
        const monday = new Date(now);
        monday.setDate(now.getDate() - (dayOfWeek - 1));
        const mondayStr = monday.toISOString().split('T')[0];

        // Start of current month
        const firstDayMonthStr = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];

        let todayCount = 0;
        let weekCount = 0;
        let monthCount = 0;

        let totalApplied = this.applications.length;
        let screeningCount = 0;
        let testCount = 0;
        let interviewCount = 0;
        let offeringCount = 0;
        let rejectedCount = 0;
        let ghostedCount = 0;

        this.applications.forEach(a => {
            if (a.appliedDate === todayStr) todayCount++;
            if (a.appliedDate >= mondayStr) weekCount++;
            if (a.appliedDate >= firstDayMonthStr) monthCount++;

            switch (a.status) {
                case 'screening': screeningCount++; break;
                case 'test': testCount++; break;
                case 'interview': interviewCount++; break;
                case 'offering': offeringCount++; break;
                case 'rejected': rejectedCount++; break;
                case 'ghosted': ghostedCount++; break;
            }
        });

        const activePipeline = totalApplied - (rejectedCount + ghostedCount);
        const positiveResponseCount = screeningCount + testCount + interviewCount + offeringCount;
        const responseRate = totalApplied > 0 ? Math.round((positiveResponseCount / totalApplied) * 100) : 0;
        const interviewRate = totalApplied > 0 ? Math.round(((interviewCount + offeringCount) / totalApplied) * 100) : 0;

        return {
            todayCount,
            weekCount,
            monthCount,
            totalApplied,
            activePipeline,
            screeningCount,
            testCount,
            interviewCount,
            offeringCount,
            rejectedCount,
            ghostedCount,
            responseRate,
            interviewRate,
            dailyTarget: this.targets.daily,
            weeklyTarget: this.targets.weekly,
            monthlyTarget: this.targets.monthly
        };
    }
}

const store = new CareerStore();

// --- 4. UI Helper Functions (Pastel Alerts & Clean Labels) ---
function getStatusBadge(status) {
    const map = {
        applied: { label: 'Terkirim', class: 'badge-pastel-yellow', dot: '#fde047' },
        screening: { label: 'Screening CV', class: 'badge-pastel-slate', dot: '#d6d3d1' },
        test: { label: 'Tes Teknis', class: 'badge-pastel-purple', dot: '#d8b4fe' },
        interview: { label: 'Interview', class: 'badge-pastel-yellow', dot: '#facc15' },
        offering: { label: 'Offering / Lolos', class: 'badge-pastel-green', dot: '#86efac' },
        rejected: { label: 'Ditolak', class: 'badge-pastel-red', dot: '#fca5a5' },
        ghosted: { label: 'No Reply (>14 Hari)', class: 'badge-pastel-slate', dot: '#a8a29e' }
    };
    const s = map[status] || map.applied;
    return `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md ${s.class}">
        <span class="w-1.5 h-1.5 rounded-full" style="background-color: ${s.dot}"></span>
        <span>${s.label}</span>
    </span>`;
}

function getCvVersionBadge(cvId) {
    const found = CV_PROFILES.find(c => c.id === cvId);
    if (!found) return `<span class="px-2 py-0.5 text-[11px] rounded bg-stone-800 text-stone-300 font-mono">CV Standar</span>`;

    return `<span class="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-mono font-medium rounded border border-stone-700 bg-stone-800/80 text-stone-200" title="${found.title}">
        <strong class="text-white">${found.code}</strong> • ${found.title.split('&')[0].trim()}
    </span>`;
}

function formatDateIndo(dateStr) {
    if (!dateStr) return '-';
    try {
        const parts = dateStr.split('-');
        if (parts.length === 3) {
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
            const day = parseInt(parts[2], 10);
            const month = months[parseInt(parts[1], 10) - 1];
            const year = parts[0];
            return `${day} ${month} ${year}`;
        }
    } catch (e) {}
    return dateStr;
}

// --- 5. Renderers for Views ---

// Render Top Metrics Bar
function renderMetricsHeader() {
    const m = store.getMetrics();
    
    // Sidebar Widget Mini Status
    const sidebarPill = document.getElementById('sidebarTodayPill');
    const sidebarBar = document.getElementById('sidebarTodayBar');
    if (sidebarPill) {
        const pct = Math.min(100, Math.round((m.todayCount / m.dailyTarget) * 100));
        sidebarPill.innerHTML = `
            <span>Hari ini: <strong class="text-white">${m.todayCount}</strong> / ${m.dailyTarget} Loker</span>
            <span class="text-stone-400 font-mono">${pct}%</span>
        `;
        if (sidebarBar) sidebarBar.style.width = `${pct}%`;
    }

    // Tracker page quick counters
    const countTotal = document.getElementById('metricTotal');
    const countScreening = document.getElementById('metricScreening');
    const countInterview = document.getElementById('metricInterview');
    const countOffering = document.getElementById('metricOffering');
    const countRejected = document.getElementById('metricRejected');

    if (countTotal) countTotal.textContent = m.totalApplied;
    if (countScreening) countScreening.textContent = m.screeningCount + m.testCount;
    if (countInterview) countInterview.textContent = m.interviewCount;
    if (countOffering) countOffering.textContent = m.offeringCount;
    if (countRejected) countRejected.textContent = m.rejectedCount;

    renderTargetsDashboard(m);
}

// Render Target & Goals Tab
function renderTargetsDashboard(m) {
    if (!m) m = store.getMetrics();

    // Daily
    const dailyBar = document.getElementById('targetDailyBar');
    const dailyText = document.getElementById('targetDailyText');
    const dailyHint = document.getElementById('targetDailyHint');
    const dailyPct = Math.min(100, Math.round((m.todayCount / m.dailyTarget) * 100));
    if (dailyBar) dailyBar.style.width = `${dailyPct}%`;
    if (dailyText) dailyText.textContent = `${m.todayCount} / ${m.dailyTarget} Lamaran`;
    if (dailyHint) {
        const rem = m.dailyTarget - m.todayCount;
        dailyHint.textContent = rem > 0 
            ? `Kurang ${rem} lamaran lagi untuk mencapai target harian Anda.`
            : `Target harian telah terpenuhi dengan baik!`;
    }

    // Weekly
    const weeklyBar = document.getElementById('targetWeeklyBar');
    const weeklyText = document.getElementById('targetWeeklyText');
    const weeklyHint = document.getElementById('targetWeeklyHint');
    const weeklyPct = Math.min(100, Math.round((m.weekCount / m.weeklyTarget) * 100));
    if (weeklyBar) weeklyBar.style.width = `${weeklyPct}%`;
    if (weeklyText) weeklyText.textContent = `${m.weekCount} / ${m.weeklyTarget} Lamaran`;
    if (weeklyHint) {
        const rem = m.weeklyTarget - m.weekCount;
        weeklyHint.textContent = rem > 0
            ? `Tersisa ${rem} lamaran untuk kuota minggu ini.`
            : `Target mingguan sudah tercapai.`;
    }

    // Monthly
    const monthlyBar = document.getElementById('targetMonthlyBar');
    const monthlyText = document.getElementById('targetMonthlyText');
    const monthlyHint = document.getElementById('targetMonthlyHint');
    const monthlyPct = Math.min(100, Math.round((m.monthCount / m.monthlyTarget) * 100));
    if (monthlyBar) monthlyBar.style.width = `${monthlyPct}%`;
    if (monthlyText) monthlyText.textContent = `${m.monthCount} / ${m.monthlyTarget} Lamaran`;
    if (monthlyHint) {
        monthlyHint.textContent = `Pencapaian bulan ini: ${monthlyPct}% dari total target 100 loker.`;
    }

    // Conversion Rates
    const respRateEl = document.getElementById('statResponseRate');
    const interviewRateEl = document.getElementById('statInterviewRate');
    const activePipelineEl = document.getElementById('statActivePipeline');
    if (respRateEl) respRateEl.textContent = `${m.responseRate}%`;
    if (interviewRateEl) interviewRateEl.textContent = `${m.interviewRate}%`;
    if (activePipelineEl) activePipelineEl.textContent = `${m.activePipeline} Berjalan`;
}

// Render Job Tracker List (Table & Kanban)
function renderTracker() {
    const list = store.getFilteredApplications();
    const tableBody = document.getElementById('applicationTableBody');
    const emptyState = document.getElementById('trackerEmptyState');
    const tableWrapper = document.getElementById('trackerTableWrapper');
    const kanbanWrapper = document.getElementById('trackerKanbanWrapper');

    if (store.trackerDisplayMode === 'kanban') {
        if (tableWrapper) tableWrapper.classList.add('hidden');
        if (kanbanWrapper) kanbanWrapper.classList.remove('hidden');
        renderKanban(list);
    } else {
        if (kanbanWrapper) kanbanWrapper.classList.add('hidden');
        if (tableWrapper) tableWrapper.classList.remove('hidden');
    }

    if (!tableBody) return;

    if (list.length === 0) {
        tableBody.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        return;
    }

    if (emptyState) emptyState.classList.add('hidden');

    tableBody.innerHTML = list.map((app) => `
        <tr class="border-b border-stone-800/80 hover:bg-stone-900/40 transition">
            <td class="py-3.5 px-4 font-mono text-xs text-stone-400 whitespace-nowrap">
                ${formatDateIndo(app.appliedDate)}
            </td>
            <td class="py-3.5 px-4">
                <div class="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                    <span>${app.company}</span>
                    ${app.jobUrl ? `<a href="${app.jobUrl}" target="_blank" rel="noopener noreferrer" class="text-stone-400 hover:text-white text-xs" title="Buka tautan lowongan"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>` : ''}
                </div>
                <div class="text-xs text-stone-400 flex items-center gap-2 mt-0.5">
                    <span><i class="fa-solid fa-location-dot text-[10px] text-stone-500 mr-1"></i>${app.location || 'Indonesia'}</span>
                    <span>•</span>
                    <span class="text-stone-300">${app.jobType || 'Full-time'}</span>
                </div>
            </td>
            <td class="py-3.5 px-4">
                <div class="font-semibold text-stone-200 text-xs sm:text-sm">${app.position}</div>
                ${app.salaryRange ? `<div class="font-mono text-[11px] text-stone-400 mt-0.5">${app.salaryRange}</div>` : ''}
            </td>
            <td class="py-3.5 px-4">
                ${getCvVersionBadge(app.cvVersion)}
            </td>
            <td class="py-3.5 px-4 font-mono text-xs text-stone-300">
                <span class="px-2 py-0.5 rounded bg-stone-900 text-stone-300 border border-stone-800">${app.platform || 'Direct'}</span>
            </td>
            <td class="py-3.5 px-4">
                <div class="flex items-center gap-2">
                    <select onchange="updateApplicationStatus('${app.id}', this.value)" class="bg-stone-900 border border-stone-700 text-xs rounded px-2.5 py-1 text-stone-200 focus:outline-none focus:border-stone-500 cursor-pointer">
                        <option value="applied" ${app.status === 'applied' ? 'selected' : ''}>🟡 Terkirim</option>
                        <option value="screening" ${app.status === 'screening' ? 'selected' : ''}>⚪ Screening CV</option>
                        <option value="test" ${app.status === 'test' ? 'selected' : ''}>🟣 Tes Teknis</option>
                        <option value="interview" ${app.status === 'interview' ? 'selected' : ''}>🟠 Interview</option>
                        <option value="offering" ${app.status === 'offering' ? 'selected' : ''}>🟢 Offering</option>
                        <option value="rejected" ${app.status === 'rejected' ? 'selected' : ''}>🔴 Ditolak</option>
                        <option value="ghosted" ${app.status === 'ghosted' ? 'selected' : ''}>⚪ No Reply</option>
                    </select>
                </div>
                ${app.interviewDate ? `<div class="font-mono text-[10px] text-amber-300 mt-1 flex items-center gap-1"><i class="fa-regular fa-calendar-check"></i> Agenda: ${formatDateIndo(app.interviewDate)}</div>` : ''}
            </td>
            <td class="py-3.5 px-4 text-right">
                <div class="flex items-center justify-end gap-1.5">
                    <button onclick="viewApplicationDetail('${app.id}')" class="p-1.5 rounded hover:bg-stone-800 text-stone-400 hover:text-white transition" title="Lihat Detail & Catatan">
                        <i class="fa-solid fa-eye text-xs"></i>
                    </button>
                    <button onclick="openEditApplicationModal('${app.id}')" class="p-1.5 rounded hover:bg-stone-800 text-stone-400 hover:text-white transition" title="Edit Lamaran">
                        <i class="fa-solid fa-pen text-xs"></i>
                    </button>
                    <button onclick="deleteApplicationPrompt('${app.id}')" class="p-1.5 rounded hover:bg-stone-800 text-stone-500 hover:text-red-400 transition" title="Hapus">
                        <i class="fa-solid fa-trash-can text-xs"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Render Kanban View
function renderKanban(list) {
    const columns = {
        applied: document.getElementById('kanbanColApplied'),
        screening: document.getElementById('kanbanColScreening'),
        test: document.getElementById('kanbanColTest'),
        interview: document.getElementById('kanbanColInterview'),
        offering: document.getElementById('kanbanColOffering'),
        rejected: document.getElementById('kanbanColRejected')
    };

    Object.values(columns).forEach(col => { if (col) col.innerHTML = ''; });

    const counts = { applied: 0, screening: 0, test: 0, interview: 0, offering: 0, rejected: 0 };

    list.forEach(app => {
        let colKey = app.status;
        if (colKey === 'ghosted') colKey = 'rejected';
        
        if (columns[colKey]) {
            counts[colKey]++;
            const card = document.createElement('div');
            card.className = 'bg-stone-900 border border-stone-800 p-3.5 rounded-lg mb-3 hover:border-stone-700 transition cursor-pointer shadow-sm';
            card.onclick = () => viewApplicationDetail(app.id);
            card.innerHTML = `
                <div class="flex items-start justify-between gap-2">
                    <span class="font-bold text-white text-sm line-clamp-1">${app.company}</span>
                    <span class="text-[10px] font-mono text-stone-500">${formatDateIndo(app.appliedDate)}</span>
                </div>
                <div class="text-xs text-stone-300 font-medium mt-0.5 line-clamp-1">${app.position}</div>
                <div class="mt-2.5 flex items-center justify-between gap-2">
                    <div>${getCvVersionBadge(app.cvVersion)}</div>
                    <span class="text-[10px] font-mono text-stone-400 bg-stone-800 px-1.5 py-0.5 rounded">${app.platform || 'Direct'}</span>
                </div>
                ${app.interviewDate ? `<div class="mt-2 pt-2 border-t border-stone-800/80 text-[11px] font-mono text-amber-300 flex items-center gap-1.5"><i class="fa-regular fa-clock"></i> ${formatDateIndo(app.interviewDate)}</div>` : ''}
            `;
            columns[colKey].appendChild(card);
        }
    });

    Object.keys(counts).forEach(k => {
        const badge = document.getElementById(`kanbanCount_${k}`);
        if (badge) badge.textContent = counts[k];
    });
}

// Render CV Vault Section
async function renderCvVault() {
    const container = document.getElementById('cvProfilesGrid');
    if (!container) return;

    const cardsHtml = await Promise.all(CV_PROFILES.map(async (prof) => {
        const storedFile = await getFileFromVault(prof.id);
        const hasFile = !!storedFile;
        const fileSizeText = hasFile ? (storedFile.size / 1024).toFixed(1) + ' KB' : 'Belum diunggah';
        const fileDateText = hasFile ? formatDateIndo(new Date(storedFile.lastModified).toISOString().split('T')[0]) : '-';
        const usageCount = store.applications.filter(a => a.cvVersion === prof.id).length;

        return `
            <div class="clean-card p-5 sm:p-6 flex flex-col justify-between">
                <div>
                    <div class="flex items-start justify-between gap-2">
                        <span class="font-mono text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-stone-800 text-white border border-stone-700">
                            ${prof.code} // ${prof.title}
                        </span>
                        <span class="font-mono text-[11px] text-stone-400 bg-stone-900 border border-stone-800 px-2 py-0.5 rounded">
                            Digunakan: <strong class="text-white">${usageCount}x</strong>
                        </span>
                    </div>

                    <h3 class="text-base sm:text-lg font-bold text-white mt-3">${prof.targetRoles}</h3>
                    <p class="text-xs text-stone-400 mt-2 leading-relaxed">${prof.description}</p>

                    <div class="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-stone-800">
                        ${prof.keywords.map(k => `<span class="text-[10px] font-mono bg-stone-900 text-stone-300 border border-stone-800 px-2 py-0.5 rounded">${k}</span>`).join('')}
                    </div>

                    <div class="mt-4 p-3 rounded-lg border ${hasFile ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-dashed border-stone-700 bg-stone-900/40'}">
                        <div class="flex items-center gap-3">
                            <div class="w-9 h-9 rounded flex items-center justify-center shrink-0 ${hasFile ? 'bg-emerald-500/10 text-emerald-300' : 'bg-stone-800 text-stone-500'}">
                                <i class="fa-solid ${hasFile ? 'fa-file-pdf' : 'fa-cloud-arrow-up'} text-lg"></i>
                            </div>
                            <div class="min-w-0 flex-1">
                                <div class="text-xs font-bold ${hasFile ? 'text-white' : 'text-stone-400'} truncate">
                                    ${hasFile ? storedFile.name : 'Belum ada file terunggah'}
                                </div>
                                <div class="font-mono text-[10px] text-stone-500 mt-0.5">
                                    ${hasFile ? `${fileSizeText} • Update: ${fileDateText}` : 'Mendukung PDF, DOCX (Maks 15MB)'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-5 pt-4 border-t border-stone-800 flex items-center gap-2">
                    <input type="file" id="fileInput_${prof.id}" class="hidden" accept=".pdf,.doc,.docx" onchange="handleCvFileUpload('${prof.id}', this)">
                    <button onclick="document.getElementById('fileInput_${prof.id}').click()" class="flex-1 py-2 px-3 text-xs font-semibold rounded bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition flex items-center justify-center gap-1.5">
                        <i class="fa-solid fa-arrow-up-from-bracket text-[10px]"></i>
                        <span>${hasFile ? 'Ganti File' : 'Unggah CV'}</span>
                    </button>
                    ${hasFile ? `
                        <button onclick="downloadVaultFile('${prof.id}')" class="py-2 px-3 text-xs font-semibold rounded bg-white text-stone-950 hover:bg-stone-200 transition flex items-center justify-center gap-1.5" title="Unduh File">
                            <i class="fa-solid fa-download text-[10px]"></i>
                            <span>Unduh</span>
                        </button>
                        <button onclick="deleteVaultFilePrompt('${prof.id}')" class="p-2 text-xs rounded hover:bg-red-500/20 text-stone-400 hover:text-red-400 transition" title="Hapus Berkas">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    }));

    container.innerHTML = cardsHtml.join('');
}

// Render Calendar View
function renderCalendar() {
    const calendarGrid = document.getElementById('calendarDaysGrid');
    const monthYearTitle = document.getElementById('calendarMonthYear');
    if (!calendarGrid || !monthYearTitle) return;

    const currentYear = store.calendarDate.getFullYear();
    const currentMonth = store.calendarDate.getMonth();

    const monthNames = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    monthYearTitle.textContent = `${monthNames[currentMonth]} ${currentYear}`;

    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    const startOffset = (firstDayIndex + 6) % 7; 

    const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    const appsByDate = {};
    const interviewsByDate = {};

    store.applications.forEach(app => {
        if (app.appliedDate) {
            appsByDate[app.appliedDate] = appsByDate[app.appliedDate] || [];
            appsByDate[app.appliedDate].push(app);
        }
        if (app.interviewDate) {
            interviewsByDate[app.interviewDate] = interviewsByDate[app.interviewDate] || [];
            interviewsByDate[app.interviewDate].push(app);
        }
    });

    let cellsHtml = '';

    for (let i = startOffset - 1; i >= 0; i--) {
        const dayNum = prevMonthDays - i;
        cellsHtml += `
            <div class="calendar-day-cell other-month p-2 border border-stone-800/40 bg-stone-950/40 text-stone-600 rounded">
                <span class="text-xs font-mono font-medium">${dayNum}</span>
            </div>
        `;
    }

    for (let day = 1; day <= totalDaysInMonth; day++) {
        const mStr = String(currentMonth + 1).padStart(2, '0');
        const dStr = String(day).padStart(2, '0');
        const dateKey = `${currentYear}-${mStr}-${dStr}`;

        const isToday = dateKey === todayStr;
        const dayApps = appsByDate[dateKey] || [];
        const dayInterviews = interviewsByDate[dateKey] || [];

        cellsHtml += `
            <div onclick="openDateDetailsModal('${dateKey}')" class="calendar-day-cell p-2 border border-stone-800 bg-stone-900/60 rounded cursor-pointer ${isToday ? 'today' : ''} flex flex-col justify-between">
                <div class="flex items-center justify-between">
                    <span class="text-xs font-mono font-bold ${isToday ? 'text-white' : 'text-stone-300'}">${day}</span>
                    ${isToday ? `<span class="text-[9px] font-mono px-1 rounded bg-stone-800 text-stone-200">Hari ini</span>` : ''}
                </div>

                <div class="space-y-1 mt-1.5">
                    ${dayApps.length > 0 ? `
                        <div class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-800 text-stone-200 font-semibold truncate flex items-center gap-1">
                            <span class="w-1.5 h-1.5 rounded-full bg-stone-400"></span>
                            <span>${dayApps.length} Apply</span>
                        </div>
                    ` : ''}
                    ${dayInterviews.map(item => `
                        <div class="text-[10px] font-mono px-1.5 py-0.5 rounded badge-pastel-yellow font-bold truncate flex items-center gap-1" title="Interview: ${item.company}">
                            <i class="fa-solid fa-video text-[8px]"></i>
                            <span>${item.company}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    const totalRendered = startOffset + totalDaysInMonth;
    const remaining = (7 - (totalRendered % 7)) % 7;
    for (let day = 1; day <= remaining; day++) {
        cellsHtml += `
            <div class="calendar-day-cell other-month p-2 border border-stone-800/40 bg-stone-950/40 text-stone-600 rounded">
                <span class="text-xs font-mono font-medium">${day}</span>
            </div>
        `;
    }

    calendarGrid.innerHTML = cellsHtml;
    renderUpcomingAgendas();
}

function renderUpcomingAgendas() {
    const container = document.getElementById('upcomingAgendasList');
    if (!container) return;

    const todayStr = new Date().toISOString().split('T')[0];
    const upcoming = store.applications
        .filter(a => a.interviewDate && a.interviewDate >= todayStr)
        .sort((a, b) => a.interviewDate.localeCompare(b.interviewDate));

    if (upcoming.length === 0) {
        container.innerHTML = `
            <div class="text-center py-6 text-stone-500 text-xs font-mono">
                Tidak ada agenda interview terdekat.
            </div>
        `;
        return;
    }

    container.innerHTML = upcoming.map(app => `
        <div onclick="viewApplicationDetail('${app.id}')" class="p-3 rounded-lg bg-stone-900 border border-stone-800 hover:border-stone-700 transition cursor-pointer">
            <div class="flex items-center justify-between text-xs">
                <span class="font-bold text-white truncate">${app.company}</span>
                <span class="font-mono text-[11px] text-amber-300 font-semibold">${formatDateIndo(app.interviewDate)}</span>
            </div>
            <div class="text-xs text-stone-400 mt-1">${app.position}</div>
            ${app.notes ? `<div class="text-[11px] text-stone-500 italic mt-1.5 line-clamp-2">${app.notes}</div>` : ''}
        </div>
    `).join('');
}

// Render Portfolio Gallery in Public Tab
function renderPortfolioGallery() {
    const grid = document.getElementById('portfolioProjectsGrid');
    if (!grid) return;

    grid.innerHTML = PORTFOLIO_PROJECTS.map(p => `
        <article class="clean-card overflow-hidden flex flex-col justify-between">
            <div class="p-5">
                <div class="flex items-center justify-between gap-2">
                    <span class="font-mono text-[10px] font-bold text-stone-400 uppercase tracking-widest">PROYEK #${p.id}</span>
                    <span class="font-mono text-[10px] px-2 py-0.5 rounded bg-stone-800 text-stone-300 border border-stone-700">${p.catName}</span>
                </div>
                <h4 class="font-bold text-white text-base mt-2 hover:text-stone-300 transition">
                    <a href="../${p.path}/index.html" target="_blank">${p.title}</a>
                </h4>
                <p class="text-xs text-stone-400 mt-1.5 leading-relaxed">${p.desc}</p>
                <div class="mt-3">
                    <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-stone-800 text-stone-300 border border-stone-700">
                        <i class="fa-solid fa-sparkles text-[9px] text-amber-300"></i>
                        <span>${p.tag}</span>
                    </span>
                </div>
            </div>
            <div class="p-5 pt-0">
                <a href="../${p.path}/index.html" target="_blank" class="w-full py-2.5 px-3 rounded bg-stone-800 hover:bg-white hover:text-stone-950 text-stone-200 text-xs font-semibold transition flex items-center justify-center gap-1.5">
                    <span>Buka Live Demo</span>
                    <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                </a>
            </div>
        </article>
    `).join('');
}

// --- 6. Event Handlers, Sidebar Toggle & Modals ---

// Toggle Sidebar Collapse on Desktop
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    store.isSidebarCollapsed = !store.isSidebarCollapsed;
    sidebar.classList.toggle('collapsed', store.isSidebarCollapsed);
    localStorage.setItem('aamon_sidebar_collapsed', store.isSidebarCollapsed);
}

// Mobile Sidebar Drawer Toggle
function toggleMobileSidebar(open) {
    const mobileDrawer = document.getElementById('mobileSidebarDrawer');
    const backdrop = document.getElementById('mobileSidebarBackdrop');
    if (!mobileDrawer || !backdrop) return;

    if (open) {
        mobileDrawer.classList.remove('-translate-x-full');
        backdrop.classList.remove('hidden');
    } else {
        mobileDrawer.classList.add('-translate-x-full');
        backdrop.classList.add('hidden');
    }
}

// Switch Active View
function switchView(viewName) {
    store.currentView = viewName;

    // Toggle Active Class on Nav Items (Desktop & Mobile)
    document.querySelectorAll('.sidebar-nav-item').forEach(btn => {
        if (btn.dataset.view === viewName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Toggle View Panels
    const panels = ['tracker', 'targets', 'cvVault', 'calendar', 'portfolio'];
    panels.forEach(p => {
        const el = document.getElementById(`${p}ViewPanel`);
        if (el) {
            if (p === viewName) {
                el.classList.remove('hidden');
            } else {
                el.classList.add('hidden');
            }
        }
    });

    // Update Header Breadcrumb Title
    const headerTitle = document.getElementById('topHeaderTitle');
    const titleMap = {
        tracker: 'PELACAK LAMARAN KERJA',
        targets: 'TARGET & GOALS DASHBOARD',
        cvVault: 'VAULT CV MULTI-VERSI & DOKUMEN',
        calendar: 'KALENDER AGENDA & JADWAL',
        portfolio: 'SHOWCASE 28 PORTOFOLIO'
    };
    if (headerTitle) headerTitle.textContent = titleMap[viewName] || 'DASHBOARD';

    // Close Mobile Drawer if open
    toggleMobileSidebar(false);

    // Refresh contents
    if (viewName === 'tracker') renderTracker();
    if (viewName === 'targets') renderTargetsDashboard();
    if (viewName === 'cvVault') renderCvVault();
    if (viewName === 'calendar') renderCalendar();
    if (viewName === 'portfolio') renderPortfolioGallery();

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Toggle Table vs Kanban
function setTrackerDisplayMode(mode) {
    store.trackerDisplayMode = mode;
    const btnTable = document.getElementById('btnViewTable');
    const btnKanban = document.getElementById('btnViewKanban');
    if (btnTable && btnKanban) {
        if (mode === 'table') {
            btnTable.className = 'px-3 py-1.5 text-xs font-semibold rounded bg-white text-stone-950 shadow-sm';
            btnKanban.className = 'px-3 py-1.5 text-xs font-semibold rounded bg-stone-800 text-stone-300 hover:bg-stone-700';
        } else {
            btnTable.className = 'px-3 py-1.5 text-xs font-semibold rounded bg-stone-800 text-stone-300 hover:bg-stone-700';
            btnKanban.className = 'px-3 py-1.5 text-xs font-semibold rounded bg-white text-stone-950 shadow-sm';
        }
    }
    renderTracker();
}

function updateApplicationStatus(id, newStatus) {
    store.updateApplication(id, { status: newStatus });
    renderMetricsHeader();
    renderTracker();
    showToastNotification('Status Diperbarui', `Lamaran berhasil diubah ke: ${newStatus.toUpperCase()}`);
}

// Open Add Application Modal
function openAddApplicationModal(presetDate = '') {
    const modal = document.getElementById('appFormModal');
    const form = document.getElementById('applicationForm');
    if (!modal || !form) return;

    form.reset();
    document.getElementById('formAppId').value = '';
    document.getElementById('formModalTitle').textContent = 'Catat Lamaran Kerja Baru';
    document.getElementById('formAppliedDate').value = presetDate || new Date().toISOString().split('T')[0];

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

// Open Edit Application Modal
function openEditApplicationModal(id) {
    const app = store.applications.find(a => a.id === id);
    if (!app) return;

    const modal = document.getElementById('appFormModal');
    document.getElementById('formAppId').value = app.id;
    document.getElementById('formModalTitle').textContent = `Edit Lamaran: ${app.company}`;

    document.getElementById('formCompany').value = app.company || '';
    document.getElementById('formPosition').value = app.position || '';
    document.getElementById('formJobType').value = app.jobType || 'Full-time (Remote)';
    document.getElementById('formLocation').value = app.location || '';
    document.getElementById('formPlatform').value = app.platform || 'LinkedIn';
    document.getElementById('formSalaryRange').value = app.salaryRange || '';
    document.getElementById('formAppliedDate').value = app.appliedDate || '';
    document.getElementById('formCvVersion').value = app.cvVersion || 'cv_frontend';
    document.getElementById('formStatus').value = app.status || 'applied';
    document.getElementById('formInterviewDate').value = app.interviewDate || '';
    document.getElementById('formJobUrl').value = app.jobUrl || '';
    document.getElementById('formNotes').value = app.notes || '';
    document.getElementById('formBackground').value = app.background || '';

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeAppFormModal() {
    const modal = document.getElementById('appFormModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function handleSaveApplication(e) {
    e.preventDefault();
    const id = document.getElementById('formAppId').value;
    
    const formData = {
        company: document.getElementById('formCompany').value.trim(),
        position: document.getElementById('formPosition').value.trim(),
        jobType: document.getElementById('formJobType').value,
        location: document.getElementById('formLocation').value.trim(),
        platform: document.getElementById('formPlatform').value,
        salaryRange: document.getElementById('formSalaryRange').value.trim(),
        appliedDate: document.getElementById('formAppliedDate').value,
        cvVersion: document.getElementById('formCvVersion').value,
        status: document.getElementById('formStatus').value,
        interviewDate: document.getElementById('formInterviewDate').value,
        jobUrl: document.getElementById('formJobUrl').value.trim(),
        notes: document.getElementById('formNotes').value.trim(),
        background: document.getElementById('formBackground').value.trim()
    };

    if (!formData.company || !formData.position) {
        alert('Mohon isi nama perusahaan dan posisi pekerjaan.');
        return;
    }

    if (id) {
        store.updateApplication(id, formData);
        showToastNotification('Tersimpan', `Data ${formData.company} berhasil diperbarui.`);
    } else {
        store.addApplication(formData);
        showToastNotification('Lamaran Tercatat!', `Berhasil menambahkan ${formData.company} ke pelacak kerja.`);
    }

    closeAppFormModal();
    renderMetricsHeader();
    renderTracker();
    if (store.currentView === 'calendar') renderCalendar();
}

function deleteApplicationPrompt(id) {
    const app = store.applications.find(a => a.id === id);
    if (!app) return;
    if (confirm(`Apakah Anda yakin ingin menghapus catatan lamaran di "${app.company}"?`)) {
        store.deleteApplication(id);
        renderMetricsHeader();
        renderTracker();
        if (store.currentView === 'calendar') renderCalendar();
        showToastNotification('Dihapus', `Data lamaran ${app.company} telah dihapus.`);
    }
}

function viewApplicationDetail(id) {
    const app = store.applications.find(a => a.id === id);
    if (!app) return;

    const modal = document.getElementById('appDetailModal');
    if (!modal) return;

    document.getElementById('detailCompany').textContent = app.company;
    document.getElementById('detailPosition').textContent = app.position;
    document.getElementById('detailStatusBadge').innerHTML = getStatusBadge(app.status);
    document.getElementById('detailAppliedDate').textContent = formatDateIndo(app.appliedDate);
    document.getElementById('detailLocation').textContent = app.location || 'Tidak dicantumkan';
    document.getElementById('detailJobType').textContent = app.jobType || '-';
    document.getElementById('detailPlatform').textContent = app.platform || 'Direct';
    document.getElementById('detailSalary').textContent = app.salaryRange || 'Belum dibahas';
    document.getElementById('detailCvBadge').innerHTML = getCvVersionBadge(app.cvVersion);
    document.getElementById('detailInterviewDate').textContent = app.interviewDate ? formatDateIndo(app.interviewDate) : 'Belum ada agenda';
    document.getElementById('detailNotes').textContent = app.notes || 'Belum ada catatan khusus.';
    document.getElementById('detailBackground').textContent = app.background || 'Tidak ada deskripsi pekerjaan.';

    const jobLinkBtn = document.getElementById('detailJobLink');
    if (app.jobUrl) {
        jobLinkBtn.href = app.jobUrl;
        jobLinkBtn.classList.remove('hidden');
    } else {
        jobLinkBtn.classList.add('hidden');
    }

    document.getElementById('detailEditBtn').onclick = () => {
        closeAppDetailModal();
        openEditApplicationModal(app.id);
    };

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeAppDetailModal() {
    const modal = document.getElementById('appDetailModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function openDateDetailsModal(dateKey) {
    const modal = document.getElementById('dateDetailsModal');
    if (!modal) return;

    document.getElementById('dateDetailsTitle').textContent = `Agenda & Lamaran: ${formatDateIndo(dateKey)}`;
    document.getElementById('dateDetailsNewAppBtn').onclick = () => {
        closeDateDetailsModal();
        openAddApplicationModal(dateKey);
    };

    const appsOnDate = store.applications.filter(a => a.appliedDate === dateKey);
    const interviewsOnDate = store.applications.filter(a => a.interviewDate === dateKey);

    const container = document.getElementById('dateDetailsList');
    let html = '';

    if (interviewsOnDate.length > 0) {
        html += `<h5 class="text-xs font-mono uppercase text-amber-300 font-bold mb-2">Agenda Interview / Tes:</h5>`;
        html += interviewsOnDate.map(i => `
            <div class="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg mb-2">
                <div class="font-bold text-white text-sm">${i.company}</div>
                <div class="text-xs text-amber-200 font-semibold">${i.position}</div>
                ${i.notes ? `<div class="text-xs text-stone-300 mt-1">${i.notes}</div>` : ''}
            </div>
        `).join('');
    }

    if (appsOnDate.length > 0) {
        html += `<h5 class="text-xs font-mono uppercase text-stone-400 font-bold mt-4 mb-2">Lamaran Dikirim (${appsOnDate.length}):</h5>`;
        html += appsOnDate.map(a => `
            <div class="p-3 bg-stone-900 border border-stone-800 rounded-lg mb-2 flex items-center justify-between">
                <div>
                    <div class="font-bold text-white text-sm">${a.company}</div>
                    <div class="text-xs text-stone-400">${a.position} • ${a.platform}</div>
                </div>
                <div>${getStatusBadge(a.status)}</div>
            </div>
        `).join('');
    }

    if (interviewsOnDate.length === 0 && appsOnDate.length === 0) {
        html = `<div class="text-center py-6 text-stone-500 text-xs font-mono">Belum ada lamaran atau agenda tercatat di tanggal ini.</div>`;
    }

    container.innerHTML = html;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeDateDetailsModal() {
    const modal = document.getElementById('dateDetailsModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

async function handleCvFileUpload(cvId, inputEl) {
    if (!inputEl.files || inputEl.files.length === 0) return;
    const file = inputEl.files[0];

    if (file.size > 15 * 1024 * 1024) {
        alert('Ukuran file maksimal 15MB.');
        return;
    }

    const success = await saveFileToVault(cvId, file);
    if (success) {
        showToastNotification('CV Tersimpan!', `Berkas "${file.name}" berhasil diunggah.`);
        renderCvVault();
    } else {
        alert('Gagal menyimpan file.');
    }
}

async function downloadVaultFile(cvId) {
    const record = await getFileFromVault(cvId);
    if (!record || !record.data) {
        alert('File tidak ditemukan di database.');
        return;
    }
    const url = URL.createObjectURL(record.data);
    const a = document.createElement('a');
    a.href = url;
    a.download = record.name || `CV-${cvId}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function deleteVaultFilePrompt(cvId) {
    if (confirm('Apakah Anda yakin ingin menghapus file CV ini dari penyimpanan lokal?')) {
        await deleteFileFromVault(cvId);
        showToastNotification('File Dihapus', 'File CV telah dibersihkan.');
        renderCvVault();
    }
}

function openTargetsSettingModal() {
    const modal = document.getElementById('targetSettingsModal');
    if (!modal) return;
    document.getElementById('inputTargetDaily').value = store.targets.daily;
    document.getElementById('inputTargetWeekly').value = store.targets.weekly;
    document.getElementById('inputTargetMonthly').value = store.targets.monthly;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeTargetsSettingModal() {
    const modal = document.getElementById('targetSettingsModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function handleSaveTargets(e) {
    e.preventDefault();
    const daily = parseInt(document.getElementById('inputTargetDaily').value, 10) || 5;
    const weekly = parseInt(document.getElementById('inputTargetWeekly').value, 10) || 25;
    const monthly = parseInt(document.getElementById('inputTargetMonthly').value, 10) || 100;

    store.saveTargets({ daily, weekly, monthly });
    closeTargetsSettingModal();
    renderMetricsHeader();
    showToastNotification('Target Diperbarui', `Target harian: ${daily}, mingguan: ${weekly}, bulanan: ${monthly}`);
}

function exportDataJSON() {
    const data = {
        version: '2.0',
        brand: 'AAMON',
        exportedAt: new Date().toISOString(),
        targets: store.targets,
        applications: store.applications
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aamon-career-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToastNotification('Backup Diunduh', 'File backup JSON berhasil disimpan.');
}

function exportDataCSV() {
    if (store.applications.length === 0) {
        alert('Belum ada data lamaran untuk diekspor.');
        return;
    }

    const headers = ['ID', 'Tanggal Apply', 'Perusahaan', 'Posisi', 'Tipe Kerja', 'Lokasi', 'Platform', 'Gaji', 'Versi CV', 'Status', 'Jadwal Agenda', 'Catatan', 'Link Loker'];
    const rows = store.applications.map(a => [
        `"${a.id}"`,
        `"${a.appliedDate}"`,
        `"${(a.company || '').replace(/"/g, '""')}"`,
        `"${(a.position || '').replace(/"/g, '""')}"`,
        `"${(a.jobType || '').replace(/"/g, '""')}"`,
        `"${(a.location || '').replace(/"/g, '""')}"`,
        `"${(a.platform || '').replace(/"/g, '""')}"`,
        `"${(a.salaryRange || '').replace(/"/g, '""')}"`,
        `"${a.cvVersion}"`,
        `"${a.status}"`,
        `"${a.interviewDate || ''}"`,
        `"${(a.notes || '').replace(/"/g, '""')}"`,
        `"${a.jobUrl || ''}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aamon-laporan-lamaran-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function handleImportJSON(inputEl) {
    if (!inputEl.files || inputEl.files.length === 0) return;
    const file = inputEl.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            if (data.applications && Array.isArray(data.applications)) {
                store.applications = data.applications;
                store.saveApplications();
            }
            if (data.targets) {
                store.saveTargets(data.targets);
            }
            renderMetricsHeader();
            renderTracker();
            renderCalendar();
            showToastNotification('Import Berhasil!', 'Data lamaran dan target berhasil dipulihkan.');
        } catch (err) {
            alert('File JSON tidak valid.');
        }
    };
    reader.readAsText(file);
}

function copyTextToClipboard(text, successMsg = 'Teks berhasil disalin!') {
    navigator.clipboard.writeText(text).then(() => {
        showToastNotification('Tersalin!', successMsg);
    }).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToastNotification('Tersalin!', successMsg);
    });
}

let toastTimer = null;
function showToastNotification(title, msg) {
    const toast = document.getElementById('appToastNotification');
    const toastTitle = document.getElementById('appToastTitle');
    const toastMsg = document.getElementById('appToastMsg');
    if (!toast) return;

    if (toastTitle) toastTitle.textContent = title;
    if (toastMsg) toastMsg.textContent = msg;

    toast.classList.remove('hidden');
    toast.classList.add('flex');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.add('hidden');
        toast.classList.remove('flex');
    }, 3500);
}

// --- 7. Initialization on DOM Loaded ---
document.addEventListener('DOMContentLoaded', () => {
    // Restore sidebar state
    if (store.isSidebarCollapsed) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.classList.add('collapsed');
    }

    renderMetricsHeader();
    renderTracker();
    renderPortfolioGallery();
    renderCvVault();
    renderCalendar();

    const searchInput = document.getElementById('filterSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            store.filters.search = e.target.value;
            renderTracker();
        });
    }

    const statusFilter = document.getElementById('filterStatus');
    if (statusFilter) {
        statusFilter.addEventListener('change', (e) => {
            store.filters.status = e.target.value;
            renderTracker();
        });
    }

    const cvFilter = document.getElementById('filterCvVersion');
    if (cvFilter) {
        cvFilter.addEventListener('change', (e) => {
            store.filters.cvVersion = e.target.value;
            renderTracker();
        });
    }

    const platformFilter = document.getElementById('filterPlatform');
    if (platformFilter) {
        platformFilter.addEventListener('change', (e) => {
            store.filters.platform = e.target.value;
            renderTracker();
        });
    }

    const btnPrevMonth = document.getElementById('btnPrevMonth');
    const btnNextMonth = document.getElementById('btnNextMonth');
    const btnTodayMonth = document.getElementById('btnTodayMonth');

    if (btnPrevMonth) {
        btnPrevMonth.addEventListener('click', () => {
            store.calendarDate.setMonth(store.calendarDate.getMonth() - 1);
            renderCalendar();
        });
    }
    if (btnNextMonth) {
        btnNextMonth.addEventListener('click', () => {
            store.calendarDate.setMonth(store.calendarDate.getMonth() + 1);
            renderCalendar();
        });
    }
    if (btnTodayMonth) {
        btnTodayMonth.addEventListener('click', () => {
            store.calendarDate = new Date();
            renderCalendar();
        });
    }

    const appForm = document.getElementById('applicationForm');
    if (appForm) {
        appForm.addEventListener('submit', handleSaveApplication);
    }

    const targetForm = document.getElementById('targetsForm');
    if (targetForm) {
        targetForm.addEventListener('submit', handleSaveTargets);
    }
});
