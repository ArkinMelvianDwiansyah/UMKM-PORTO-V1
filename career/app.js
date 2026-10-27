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
        id: 'cv_network',
        code: 'CV-NET',
        badge: 'UTAMA / FULL-TIME',
        isPrimary: true,
        title: 'Network Engineer & NOC Specialist',
        targetRoles: 'Network Engineer, NOC Engineer, Network Administrator, ISP / Telco Engineer, L2/L3 Network Support',
        description: 'Fokus utama pada monitoring jaringan ISP/Enterprise real-time, incident management & SLA/TTR, konfigurasi routing/switching multi-vendor (Cisco, Mikrotik, Huawei), infrastruktur fiber optic FTTH/FTTx, dan network automation (DevNet).',
        keywords: ['Cisco CCNA', 'Mikrotik RouterOS', 'Cisco DevNet', 'Fiber Optic FTTH / BNSP TIFO', 'NOC Incident SLA/TTR', 'Zabbix / PRTG / Wireshark', 'Google Cyber Security', 'Cisco NetSec']
    },
    {
        id: 'cv_security',
        code: 'CV-SEC',
        badge: 'CYBERSECURITY',
        isPrimary: false,
        title: 'Cyber & Network Security Specialist',
        targetRoles: 'Network Security Engineer, SOC Analyst (L1), Cyber Defense Specialist, IT Security Support',
        description: 'Fokus pada pengamanan infrastruktur jaringan, analisis paket trafik anomali, konfigurasi firewall & ACL policy, mitigasi ancaman siber, dan audit kepatuhan keamanan Google & Cisco.',
        keywords: ['Google Cyber Security Cert', 'Cisco Network Security', 'Firewall / ACL Rules', 'Threat Mitigation', 'Wireshark Packet Analysis', 'Security Incident Handling']
    },
    {
        id: 'cv_support',
        code: 'CV-TECH',
        badge: 'INFRA & HARDWARE',
        isPrimary: false,
        title: 'IT Support & Infrastructure System',
        targetRoles: 'IT Support Specialist, IT Helpdesk L1/L2, Hardware & Network Technician, System Support',
        description: 'Fokus pada penanganan end-user computing, troubleshooting hardware & sistem operasi (Windows/Linux), pemeliharaan LAN/WLAN kantor, manajemen inventaris aset IT, dan resolusi tiket SLA.',
        keywords: ['Coursera IT Support Cert', 'Hardware Troubleshooting', 'Windows & Linux OS', 'LAN/WLAN Maintenance', 'Asset & Inventory IT', 'Helpdesk SLA Management']
    },
    {
        id: 'cv_frontend',
        code: 'CV-DEV',
        badge: 'FREELANCE TRACK',
        isPrimary: false,
        title: 'Frontend Web Developer (Freelance)',
        targetRoles: 'Frontend Developer, UI Slicer, React / Tailwind Web Dev, Web Consultant',
        description: 'Track sekunder / freelance: Pengembangan antarmuka web modern berperforma tinggi (PageSpeed 95+), UI/UX slicing ke kode HTML/CSS/Tailwind responsif, arsitektur JavaScript ES6+, dan 28 portofolio live.',
        keywords: ['Tailwind CSS & Modern UI', 'JavaScript ES6+ / React.js', 'Responsive Web Slicing', '28 Live Projects Porto', 'PageSpeed 95+ No Slop', 'Freelance Client Delivery']
    },
    {
        id: 'cv_scraping',
        code: 'CV-AUTO',
        badge: 'FREELANCE TRACK',
        isPrimary: false,
        title: 'Automation & Web Scraping (Freelance)',
        targetRoles: 'Automation Engineer, Python Bot Developer, Data Extraction Specialist, ETL Engineer',
        description: 'Track sekunder / freelance: Otomasi ekstraksi data terstruktur web, anti-blocking proxy bypass, automated crawling, data pipeline, dan scheduled bots.',
        keywords: ['Python Scrapy & Playwright', 'Data Mining & Extraction', 'ETL Pipeline', 'Cron Automation Bots', 'API Webhooks']
    }
];

const INITIAL_APPLICATIONS = [
    {
        id: 'app-001',
        company: 'PT Telkom Indonesia (Regional Jatim)',
        position: 'NOC Network Engineer (Tier-2 Enterprise)',
        jobType: 'Full-time (On-site)',
        location: 'Surabaya, Jawa Timur',
        platform: 'LinkedIn',
        salaryRange: 'Rp 8.000.000 - Rp 12.000.000',
        appliedDate: new Date().toISOString().split('T')[0],
        cvVersion: 'cv_network',
        status: 'interview',
        interviewDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        notes: 'Wawancara user teknis hari Kamis jam 14:00 WIB. Materi: BGP peering, troubleshooting Metro-E Telkom Corporate, dan incident SLA & TTR Telkom Infrastruktur.',
        jobUrl: 'https://www.linkedin.com/in/arkinmelviansyah/',
        background: 'Mencari Network Engineer yang berpengalaman di NOC ISP Telkom, paham CCNA, topologi FTTx/FTTH, dan koordinasi dengan tim CCAN/DSO/EOS.'
    },
    {
        id: 'app-002',
        company: 'PT Supra Primatama Nusantara (Biznet)',
        position: 'Network Operations Engineer (IP Core)',
        jobType: 'Full-time (On-site)',
        location: 'Surabaya / Sidoarjo',
        platform: 'Jobstreet',
        salaryRange: 'Rp 8.500.000 - Rp 11.500.000',
        appliedDate: new Date().toISOString().split('T')[0],
        cvVersion: 'cv_network',
        status: 'test',
        interviewDate: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0],
        notes: 'Tes konfigurasi lab: Routing OSPF multi-area, VLAN trunking 802.1Q, failover BGP, dan analisis pcap Wireshark.',
        jobUrl: 'https://jobstreet.co.id',
        background: 'Operasional backbone IP Core Biznet, monitoring link fiber optik, dan penanganan insiden degradasi latency antarkota.'
    },
    {
        id: 'app-003',
        company: 'PT Aplikanusa Lintasarta',
        position: 'NOC & Infrastructure Operations Specialist',
        jobType: 'Full-time (Shift)',
        location: 'Surabaya, Jawa Timur',
        platform: 'Glints',
        salaryRange: 'Rp 7.500.000 - Rp 10.500.000',
        appliedDate: new Date(Date.now() - 86400000 * 1).toISOString().split('T')[0],
        cvVersion: 'cv_network',
        status: 'screening',
        interviewDate: '',
        notes: 'CV lolos screening HRD, menunggu jadwal wawancara dengan Network Operations Manager.',
        jobUrl: 'https://glints.com',
        background: 'Monitoring koneksi data corporate VPN/MPLS, VSAT, dan fiber optic pelanggan enterprise perbankan.'
    },
    {
        id: 'app-004',
        company: 'Bank Central Asia (BCA Tech Group)',
        position: 'Network & Security Engineer',
        jobType: 'Full-time (Hybrid)',
        location: 'Surabaya / Jakarta',
        platform: 'LinkedIn',
        salaryRange: 'Rp 11.000.000 - Rp 15.000.000',
        appliedDate: new Date(Date.now() - 86400000 * 5).toISOString().split('T')[0],
        cvVersion: 'cv_security',
        status: 'offering',
        interviewDate: '',
        notes: 'Offering letter diterima! Paket remunerasi mencakup asuransi kesehatan, BPJS, dan bonus kinerja tahunan.',
        jobUrl: 'https://linkedin.com',
        background: 'Pengelolaan firewall enterprise, ACL segmentasi jaringan perbankan, dan kepatuhan audit keamanan siber.'
    },
    {
        id: 'app-005',
        company: 'PT Mora Telematika Indonesia (Moratelindo)',
        position: 'FTTH & ISP Transmission Engineer',
        jobType: 'Full-time (On-site)',
        location: 'Surabaya, Jawa Timur',
        platform: 'Kalibrr',
        salaryRange: 'Rp 7.000.000 - Rp 9.500.000',
        appliedDate: new Date(Date.now() - 86400000 * 3).toISOString().split('T')[0],
        cvVersion: 'cv_network',
        status: 'applied',
        interviewDate: '',
        notes: 'Melampirkan sertifikat BNSP TIFO Madya, CCNA Kominfo, dan riwayat pengalaman lapangan Wahana Era Sejahtera & Telkom.',
        jobUrl: 'https://kalibrr.com',
        background: 'Pengawasan distribusi kabel optik backbone DWDM/FTTx, manajemen ODP/ODC, dan optimalisasi redaman dBm.'
    },
    {
        id: 'app-006',
        company: 'Klien UMKM Retail (Freelance Project)',
        position: 'Frontend Landing Page & Web Slicing',
        jobType: 'Freelance / Remote',
        location: 'Remote (Surabaya)',
        platform: 'Direct Email',
        salaryRange: 'Rp 4.500.000 / Proyek',
        appliedDate: new Date(Date.now() - 86400000 * 4).toISOString().split('T')[0],
        cvVersion: 'cv_frontend',
        status: 'offering',
        interviewDate: '',
        notes: 'Pekerjaan sampingan / freelance: Slicing Figma ke Tailwind CSS dan katalog produk WhatsApp.',
        jobUrl: '',
        background: 'Proyek freelance web UMKM jalaninweb.site di sela waktu luang operasional.'
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
            const hasMigrated = localStorage.getItem('aamon_career_v3_network');
            const raw = localStorage.getItem('aamon_applications') || localStorage.getItem('arkin_applications');
            if (raw && hasMigrated) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed) && parsed.length > 0) return parsed;
            }
        } catch (e) {
            console.error("Failed to load applications:", e);
        }
        localStorage.setItem('aamon_career_v3_network', 'true');
        localStorage.setItem('aamon_applications', JSON.stringify(INITIAL_APPLICATIONS));
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
    if (!found) {
        if (cvId === 'cv_frontend') return `<span class="inline-flex items-center whitespace-nowrap badge-nowrap gap-1 px-2 py-0.5 text-[11px] font-mono font-medium rounded border border-stone-700 bg-stone-800/80 text-stone-300"><strong class="text-white">CV-DEV</strong> <span class="text-stone-500">•</span> Frontend</span>`;
        if (cvId === 'cv_fullstack' || cvId === 'cv_general') return `<span class="inline-flex items-center whitespace-nowrap badge-nowrap gap-1 px-2 py-0.5 text-[11px] font-mono font-medium rounded border border-stone-700 bg-stone-800/80 text-stone-300"><strong class="text-white">CV-TECH</strong> <span class="text-stone-500">•</span> IT Tech</span>`;
        if (cvId === 'cv_scraping') return `<span class="inline-flex items-center whitespace-nowrap badge-nowrap gap-1 px-2 py-0.5 text-[11px] font-mono font-medium rounded border border-stone-700 bg-stone-800/80 text-stone-300"><strong class="text-white">CV-AUTO</strong> <span class="text-stone-500">•</span> Scraping</span>`;
        return `<span class="inline-flex items-center whitespace-nowrap badge-nowrap px-2 py-0.5 text-[11px] rounded bg-stone-800 text-stone-300 font-mono">CV Standar</span>`;
    }

    const shortTitle = found.title.split('&')[0].replace('(Freelance)', '').trim();
    const isPri = found.isPrimary;
    const badgeClass = isPri 
        ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-200' 
        : 'border-stone-700 bg-stone-800/90 text-stone-200';

    return `<span class="inline-flex items-center whitespace-nowrap badge-nowrap gap-1.5 px-2.5 py-0.5 text-[11px] font-mono font-medium rounded border ${badgeClass}" title="${found.title}">
        ${isPri ? '<span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>' : ''}
        <strong class="${isPri ? 'text-emerald-300' : 'text-white'}">${found.code}</strong>
        <span class="text-stone-500">•</span>
        <span>${shortTitle}</span>
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
            <td class="py-4 px-4 sm:px-5 font-mono text-xs text-stone-400 whitespace-nowrap align-top pt-4">
                ${formatDateIndo(app.appliedDate)}
            </td>
            <td class="py-4 px-4 sm:px-5 align-top">
                <div class="flex items-start gap-3">
                    <div class="w-8 h-8 rounded-lg bg-stone-900 border border-stone-800 text-stone-200 font-mono text-xs font-bold flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                        ${(app.company || 'C').replace(/^PT\.?\s+/i, '').charAt(0).toUpperCase()}
                    </div>
                    <div class="min-w-0 flex-1">
                        <div class="flex items-center gap-1.5 flex-wrap">
                            <span class="font-bold text-white text-sm sm:text-base leading-snug tracking-tight">${app.company}</span>
                            ${app.jobUrl ? `<a href="${app.jobUrl}" target="_blank" rel="noopener noreferrer" class="text-stone-500 hover:text-white transition text-xs p-1 rounded hover:bg-stone-800" title="Buka tautan lowongan"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>` : ''}
                        </div>
                        <div class="flex items-center gap-2 mt-1.5 flex-wrap text-xs font-mono">
                            <span class="inline-flex items-center gap-1 text-stone-400 whitespace-nowrap">
                                <i class="fa-solid fa-location-dot text-[10px] text-stone-500"></i>
                                <span>${app.location || 'Indonesia'}</span>
                            </span>
                            <span class="text-stone-700">•</span>
                            <span class="inline-flex items-center px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-300 text-[10px] whitespace-nowrap">
                                ${app.jobType || 'Full-time'}
                            </span>
                        </div>
                    </div>
                </div>
            </td>
            <td class="py-4 px-4 sm:px-5 align-top">
                <div class="font-semibold text-stone-200 text-xs sm:text-sm leading-snug">${app.position}</div>
                ${app.salaryRange ? `
                    <div class="inline-flex items-center gap-1.5 font-mono text-[11px] text-stone-300 mt-1.5 whitespace-nowrap bg-stone-900/80 px-2 py-0.5 rounded border border-stone-800">
                        <span class="text-stone-400">Rp</span>
                        <span>${app.salaryRange.replace(/^Rp\s*/i, '')}</span>
                    </div>
                ` : ''}
            </td>
            <td class="py-4 px-4 sm:px-5 whitespace-nowrap align-top pt-4">
                ${getCvVersionBadge(app.cvVersion)}
            </td>
            <td class="py-4 px-4 sm:px-5 font-mono text-xs text-stone-300 whitespace-nowrap align-top pt-4">
                <span class="px-2.5 py-1 rounded bg-stone-900 text-stone-300 border border-stone-800">${app.platform || 'Direct'}</span>
            </td>
            <td class="py-4 px-4 sm:px-5 whitespace-nowrap align-top">
                <div class="flex items-center gap-2">
                    <select onchange="updateApplicationStatus('${app.id}', this.value)" class="bg-stone-900 border border-stone-700 text-xs rounded-lg px-2.5 py-1.5 text-stone-200 focus:outline-none focus:border-stone-500 cursor-pointer">
                        <option value="applied" ${app.status === 'applied' ? 'selected' : ''}>🟡 Terkirim</option>
                        <option value="screening" ${app.status === 'screening' ? 'selected' : ''}>⚪ Screening CV</option>
                        <option value="test" ${app.status === 'test' ? 'selected' : ''}>🟣 Tes Teknis</option>
                        <option value="interview" ${app.status === 'interview' ? 'selected' : ''}>🟠 Interview</option>
                        <option value="offering" ${app.status === 'offering' ? 'selected' : ''}>🟢 Offering</option>
                        <option value="rejected" ${app.status === 'rejected' ? 'selected' : ''}>🔴 Ditolak</option>
                        <option value="ghosted" ${app.status === 'ghosted' ? 'selected' : ''}>⚪ No Reply</option>
                    </select>
                </div>
                ${app.interviewDate ? `<div class="font-mono text-[11px] text-amber-300 mt-1.5 flex items-center gap-1.5"><i class="fa-regular fa-calendar-check"></i> Agenda: ${formatDateIndo(app.interviewDate)}</div>` : ''}
            </td>
            <td class="py-4 px-4 sm:px-5 text-right whitespace-nowrap align-top pt-3.5">
                <div class="flex items-center justify-end gap-1.5">
                    <button onclick="viewApplicationDetail('${app.id}')" class="p-2 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white transition" title="Lihat Detail & Catatan">
                        <i class="fa-solid fa-eye text-xs"></i>
                    </button>
                    <button onclick="openEditApplicationModal('${app.id}')" class="p-2 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white transition" title="Edit Lamaran">
                        <i class="fa-solid fa-pen text-xs"></i>
                    </button>
                    <button onclick="deleteApplicationPrompt('${app.id}')" class="p-2 rounded-lg hover:bg-stone-800 text-stone-500 hover:text-red-400 transition" title="Hapus">
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
        const isPri = prof.isPrimary;

        return `
            <div class="clean-card p-5 sm:p-6 flex flex-col justify-between ${isPri ? 'border-emerald-500/50 relative bg-gradient-to-b from-stone-900/90 to-stoneCard' : ''}">
                ${isPri ? `
                    <div class="absolute -top-3 right-5 bg-emerald-400 text-stone-950 text-[10px] font-mono font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-md tracking-wider flex items-center gap-1">
                        <i class="fa-solid fa-star text-[9px]"></i> FOKUS UTAMA KARIR
                    </div>
                ` : ''}
                <div>
                    <div class="flex items-start justify-between gap-2">
                        <span class="font-mono text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded ${isPri ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/40' : 'bg-stone-800 text-white border border-stone-700'}">
                            ${prof.code} // ${prof.title}
                        </span>
                        <span class="font-mono text-[11px] text-stone-400 bg-stone-900 border border-stone-800 px-2 py-0.5 rounded whitespace-nowrap">
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

                <div class="mt-5 pt-4 border-t border-stone-800 flex items-center gap-2 flex-wrap sm:flex-nowrap">
                    <button type="button" onclick="openAtsResumeModal('${prof.id}')" class="py-2 px-3 text-xs font-bold rounded ${isPri ? 'bg-white hover:bg-stone-200 text-stone-950' : 'bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700'} transition flex items-center justify-center gap-1.5 whitespace-nowrap shadow-sm" title="Lihat & Cetak Format ATS CV">
                        <i class="fa-solid fa-file-invoice text-xs"></i>
                        <span>Format ATS</span>
                    </button>
                    <input type="file" id="fileInput_${prof.id}" class="hidden" accept=".pdf,.doc,.docx" onchange="handleCvFileUpload('${prof.id}', this)">
                    <button type="button" onclick="document.getElementById('fileInput_${prof.id}').click()" class="flex-1 py-2 px-3 text-xs font-semibold rounded bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 transition flex items-center justify-center gap-1.5 whitespace-nowrap">
                        <i class="fa-solid fa-arrow-up-from-bracket text-[10px]"></i>
                        <span>${hasFile ? 'Ganti File' : 'Unggah File'}</span>
                    </button>
                    ${hasFile ? `
                        <button type="button" onclick="downloadVaultFile('${prof.id}')" class="py-2 px-3 text-xs font-semibold rounded bg-stone-800 text-stone-200 hover:bg-stone-700 border border-stone-700 transition flex items-center justify-center gap-1.5 whitespace-nowrap" title="Unduh File">
                            <i class="fa-solid fa-download text-[10px]"></i>
                            <span>Unduh</span>
                        </button>
                        <button type="button" onclick="deleteVaultFilePrompt('${prof.id}')" class="p-2 text-xs rounded hover:bg-red-500/20 text-stone-400 hover:text-red-400 transition" title="Hapus Berkas">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    }));

    container.innerHTML = cardsHtml.join('');
    renderLearningRoadmap();
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
    const panels = ['tracker', 'targets', 'cvVault', 'calendar', 'portfolio', 'learning'];
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
        portfolio: 'SHOWCASE 28 PORTOFOLIO',
        learning: 'AKADEMI & ROADMAP BELAJAR NETWORK'
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
    if (viewName === 'learning') { renderLearningAcademy(); renderCoursePlayer(); }

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

// --- 6. ATS Resume Generator & Real Credentials Data ---
const ATS_RESUME_DATA = {
    name: "ARKIN MELVIAN DWIANSYAH, A.Md.",
    pronouns: "He/Him",
    title: "Network Engineer | NOC Specialist | IT Infrastructure & Support",
    location: "Surabaya, Jawa Timur, Indonesia",
    email: "Kontak melalui LinkedIn / Portal",
    linkedin: "https://www.linkedin.com/in/arkinmelviansyah/",
    github: "https://github.com/ArkinMelvianDwiansyah",
    portfolio: "https://jalaninweb.site",

    summary: "IT Operations and Network Operations Center (NOC) professional dengan pengalaman lebih dari 4 tahun dalam mendukung operasional jaringan ISP enterprise serta infrastruktur telekomunikasi kritis pada project Telkom Indonesia (PT Infomedia Solusi Humanika). Memiliki keahlian teruji dalam 24/7 real-time network monitoring, incident handling, SLA & TTR performance tracking, analisis topologi jaringan, dan root cause analysis (RCA). Berpengalaman langsung dengan multi-vendor network hardware (Cisco, Mikrotik, Huawei, ZTE) serta jaringan optik FTTH/FTTx (splicing fiber optic, ODP/ODC, OTDR/OPM). Memegang lisensi sertifikasi CCNA Network Engineer, Cisco DevNet Associate, Cisco Network Security, Google Cyber Security, Mikrotik Aguna, dan BNSP TIFO Madya. Berorientasi pada disiplin operasional, pemecahan masalah teknis terstruktur, dan performa SLA tinggi.",

    skills: [
        {
            category: "Routing, Switching & Network Protocols",
            items: "OSPF (Single/Multi-area), BGP Peering, Static Routing, VLAN (802.1Q), Inter-VLAN Routing, STP/RSTP, EtherChannel/LACP, Subnetting IPv4/IPv6 CIDR, NAT/PAT, DHCP, DNS, VPN (IPsec, PPTP/L2TP), QoS, High Availability."
        },
        {
            category: "Multi-Vendor Network Hardware",
            items: "Cisco Catalyst Switches & ISR/ASR Routers (Cisco IOS / IOS-XE), Mikrotik RouterBOARD & Cloud Core Router (CCR, CRS, RB750 series), Huawei Enterprise Switches & OLT, ZTE GPON/EPON Optical Equipment."
        },
        {
            category: "NOC Operations & Incident Management",
            items: "Real-time ISP 24/7 Network Monitoring, Incident Ticket Handling, SLA & TTR Performance Tracking, Root Cause Analysis (RCA), Multi-divisional Coordination (CCAN, DSO, EOS, Field Engineers), SOP Compliance & Ticket Closure."
        },
        {
            category: "Fiber Optic & Telecom Infrastructure",
            items: "FTTH / FTTx Optical Network Topology, Fiber Fusion Splicing, Optical Distribution Point (ODP) & Optical Distribution Cabinet (ODC), Optical Time Domain Reflectometer (OTDR) Trace Analysis, Optical Power Meter (OPM) Loss Measurement, IndiHome Deployment."
        },
        {
            category: "Network Security & Cyber Defense",
            items: "Cisco Network Security Certified, Google Cyber Security Certified, Access Control Lists (ACLs), Firewall Filtering & NAT Rules, Traffic Anomaly Detection, Vulnerability Mitigation, Security Incident Response."
        },
        {
            category: "Network Automation & Diagnostics",
            items: "Cisco DevNet Associate, Python Scripting for Automation (Paramiko, Netmiko, REST APIs), Wireshark Packet Inspection, PRTG Network Monitor, Zabbix, Cisco Packet Tracer, EVE-NG, GNS3."
        },
        {
            category: "Web & Freelance Development (Secondary Track)",
            items: "HTML5, CSS3, Tailwind CSS, JavaScript ES6+, React.js, UI/UX Slicing to Code, Linux VPS & Nginx Server, 28 Live Production Web Systems (jalaninweb.site)."
        }
    ],

    experience: [
        {
            role: "IT NOC Helpdesk & Operations Specialist (Agent – Telkom Infrastruktur Project)",
            company: "PT Infomedia Solusi Humanika (ISH) · Assigned to Telkom Indonesia",
            type: "Contract · On-site",
            period: "Sep 2022 – Sekarang (4+ Tahun)",
            location: "Surabaya, Jawa Timur, Indonesia",
            points: [
                "Melakukan pemantauan operasional jaringan ISP Telkom Indonesia secara real-time 24/7 guna memastikan service availability optimal, kepatuhan SLA korporat, dan kenyamanan pelanggan Telkom Corporate.",
                "Menangani manajemen insiden jaringan harian untuk klien enterprise Telkom, melakukan isolasi gangguan, verifikasi topologi jaringan, dan identifikasi akar masalah (root cause identification).",
                "Berkoordinasi aktif dengan divisi lintas fungsi (CCAN, DSO, EOS) dan teknisi lapangan untuk mempercepat eskalasi serta penyelesaian tiket gangguan (TTR).",
                "Memverifikasi progres perbaikan lapangan, memvalidasi laporan teknis pemulihan kabel optik dan perangkat CPE pelanggan, serta memastikan penutupan tiket (ticket closure) sesuai SOP standar Telkom.",
                "Memastikan seluruh insiden ditangani dalam koridor target SLA & TTR yang ketat pada ratusan laporan pelanggan enterprise per bulan."
            ]
        },
        {
            role: "Frontend Web Developer",
            company: "Conecworld",
            type: "Contract / Hybrid",
            period: "Mar 2022 – Jun 2022 (4 Bulan)",
            location: "Surabaya, Jawa Timur, Indonesia",
            points: [
                "Bertanggung jawab melakukan slicing desain UI/UX ke dalam kode antarmuka web menggunakan HTML, CSS, JavaScript, LESS, jQuery, Gulp, Node.js, dan Twitter Bootstrap.",
                "Membuat design system dan pedoman style modular untuk kebutuhan efisiensi slicing design to code.",
                "Berkoordinasi erat dengan Tech Division, CEO, dan Backend Developer dalam deliveri fitur proyek web aplikasi."
            ]
        },
        {
            role: "Telecommunications Technician",
            company: "PT. Wahana Era Sejahtera",
            type: "Internship",
            period: "Jan 2021 – Feb 2021 (2 Bulan)",
            location: "Malang, Jawa Timur, Indonesia",
            points: [
                "Bertugas melakukan penyambungan kabel fiber optik (fusion splicing) dan pengukuran redaman konektor optik di lapangan.",
                "Mendukung manajemen pengadaan logistik material fiber optic FTTH (Fiber to the Home).",
                "Melakukan instalasi dan aktivasi fisik jaringan baru pelanggan IndiHome Telkom.",
                "Menyusun perencanaan titik sebaran ODP (Optical Distribution Point) baru dan berkoordinasi langsung dengan teknisi dan Supervisor Telkom."
            ]
        }
    ],

    education: [
        {
            institution: "Politeknik Negeri Malang (Polinema)",
            degree: "Diploma III (A.Md - Ahli Madya), Teknik Telekomunikasi",
            period: "Jul 2018 – Okt 2021",
            grade: "IPK: 3.44 / 4.00 (Predikat Sangat Memuaskan)",
            notes: "Fokus akademik: Sistem Komunikasi Data, Jaringan Komputer & Protokol IP, Sistem Transmisi Serat Optik, Rekayasa Gelombang Mikro, dan Telekomunikasi Seluler."
        }
    ],

    certifications: [
        {
            name: "Cyber Security by Google",
            issuer: "Digital Talent Scholarship — BLSDM Komdigi",
            issued: "Okt 2025",
            id: "19511087840-679/FGA/BLSDM.Komdigi/2025",
            badge: "Google Certified"
        },
        {
            name: "CCNA Network Engineer",
            issuer: "Digital Talent Scholarship — Kominfo & Cisco",
            issued: "Jun 2024",
            id: "1987849840-1571",
            badge: "Cisco Certified"
        },
        {
            name: "DevNet Associate (Professional Academy)",
            issuer: "Digital Talent Scholarship — Kominfo & Cisco",
            issued: "Mar 2024",
            id: "1987298840-402",
            badge: "Cisco DevNet"
        },
        {
            name: "Network Security by CISCO",
            issuer: "Digital Talent Scholarship — BLSDM Kominfo",
            issued: "Okt 2024",
            id: "1989404840-771/PROA/BLSDM.Kominfo/2024",
            badge: "Cisco NetSec"
        },
        {
            name: "Mikrotik Certified (Aguna Course)",
            issuer: "Aguna Course — Udemy",
            issued: "Apr 2026 – Des 2030",
            id: "UC-46d086fc-cc6c-41c1-bca3-dc165da94688",
            badge: "Mikrotik RouterOS"
        },
        {
            name: "IT Support Professional",
            issuer: "Coursera",
            issued: "Nov 2023",
            id: "PTXXSVSS8KSR",
            badge: "IT Support"
        },
        {
            name: "Teknik Instalasi Fiber Optic Madya (TIFO MADYA)",
            issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
            issued: "Des 2021",
            id: "61100.3522.00.5.0006907.2021",
            badge: "BNSP Fiber Optic"
        }
    ],

    organizations: [
        {
            role: "Anggota Aktif (1 Periode)",
            org: "Himpunan Mahasiswa Elektro (HME) Politeknik Negeri Malang",
            period: "Mei 2018 – Jun 2019"
        }
    ]
};

// Cover Letter Templates for Multiple Job Profiles
const COVER_LETTER_TEMPLATES = {
    network: `Halo Tim HRD / Recruitment Team,

Perkenalkan, saya Arkin Melvian Dwiansyah, A.Md., seorang profesional di bidang Network Operations Center (NOC) dan IT Infrastructure dengan pengalaman lebih dari 4 tahun dalam pemeliharaan dan pemantauan jaringan ISP enterprise (Project Telkom Infrastruktur).

Saya tertarik untuk mengajukan diri pada posisi [NAMA POSISI: Network Engineer / NOC Specialist] di [NAMA PERUSAHAAN]. Berdasarkan kualifikasi yang dibutuhkan:
• Saya memegang sertifikasi CCNA Network Engineer, Cisco DevNet Associate, Cisco Network Security, serta Google Cyber Security.
• Berpengalaman langsung dalam monitoring jaringan ISP real-time 24/7, penanganan incident ticket berstandar SLA & TTR, investigasi topologi jaringan, serta root cause identification.
• Mahir konfigurasi perangkat multi-vendor (Cisco IOS, Mikrotik RouterOS, Huawei, ZTE) dan tools monitoring/analisis (Wireshark, PRTG, Zabbix).
• Berpengalaman dalam infrastruktur optik FTTH/FTTx (TIFO Madya BNSP), terminasi ODP/ODC, pengukuran redaman OTDR/OPM, dan koordinasi tim teknisi lintas divisi (CCAN/DSO/EOS).

LinkedIn: https://www.linkedin.com/in/arkinmelviansyah/
Portfolio Hub & Tracker: https://jalaninweb.site/career/
GitHub: https://github.com/ArkinMelvianDwiansyah

Terlampir berkas CV saya untuk ditinjau lebih lanjut. Saya sangat antusias untuk berdiskusi lebih mendalam mengenai bagaimana keahlian saya dapat berkontribusi menjaga stabilitas jaringan di perusahaan Anda. Terima kasih!`,

    security: `Halo Tim Rekrutmen / IT Security Division,

Saya Arkin Melvian Dwiansyah, IT Professional bersertifikasi Cyber Security by Google dan Network Security by CISCO, dengan latar belakang kuat di operasional jaringan ISP & Enterprise (4+ tahun di Project Telkom Infrastruktur).

Saya bermaksud mengajukan lamaran untuk posisi [NAMA POSISI: Network / Cyber Security Specialist] di [NAMA PERUSAHAAN]. Keahlian saya mencakup investigasi anomali paket jaringan dengan Wireshark, perancangan ACL & firewall filtering rules, mitigasi serangan siber, serta manajemen insiden berbasis SLA.

LinkedIn: https://www.linkedin.com/in/arkinmelviansyah/
Portfolio Hub: https://jalaninweb.site/career/

Besar harapan saya untuk dapat memaparkan kualifikasi teknis ini lebih lanjut dalam sesi wawancara. Terima kasih atas perhatian Bapak/Ibu.`,

    support: `Halo Tim HRD / IT Management,

Perkenalkan, saya Arkin Melvian Dwiansyah, lulusan D3 Teknik Telekomunikasi Politeknik Negeri Malang (IPK 3.44) dan pemegang sertifikasi IT Support by Coursera serta CISCO Networking.

Saya mengajukan diri untuk posisi [NAMA POSISI: IT Support / Helpdesk Specialist] di [NAMA PERUSAHAAN]. Berbekal pengalaman menangani ratusan trouble ticket jaringan dan operasional komputer harian, saya terbiasa melakukan troubleshooting hardware, instalasi LAN/WLAN kantor, konfigurasi OS Windows/Linux, serta pelayanan pengguna dengan respon cepat dan komunikatif.

LinkedIn: https://www.linkedin.com/in/arkinmelviansyah/
Portfolio Hub: https://jalaninweb.site/career/

Terlampir berkas lamaran lengkap saya. Terima kasih!`,

    web: `Halo Tim Rekrutmen / Client,

Saya Arkin Melvian Dwiansyah, Web Developer yang berpengalaman merancang 28+ aplikasi web dan landing page modern berperforma tinggi (PageSpeed 95+, Tailwind CSS, JavaScript ES6+, zero bloated dependencies).

Saya mengajukan diri untuk kebutuhan proyek / posisi [NAMA POSISI: Frontend Web Developer] di [NAMA PERUSAHAAN / CLIENT]. Portofolio live dan demo sistem nyata saya dapat diakses langsung di:
https://jalaninweb.site (Showcase 28 Proyek Live)
GitHub: https://github.com/ArkinMelvianDwiansyah

Terima kasih atas waktu dan perhatian Anda!`
};

function selectCoverLetterTemplate(type) {
    const el = document.getElementById('coverLetterText');
    if (!el || !COVER_LETTER_TEMPLATES[type]) return;
    el.value = COVER_LETTER_TEMPLATES[type];

    document.querySelectorAll('.cover-letter-tab').forEach(btn => {
        if (btn.getAttribute('data-cl-type') === type) {
            btn.classList.add('bg-white', 'text-stone-950', 'font-bold');
            btn.classList.remove('bg-stone-900', 'text-stone-400');
        } else {
            btn.classList.remove('bg-white', 'text-stone-950', 'font-bold');
            btn.classList.add('bg-stone-900', 'text-stone-400');
        }
    });
}

// Learning Roadmap State & Persistence
const ROADMAP_DEFAULT = [
    { id: 'ccna_done', title: 'Cisco CCNA Network Engineer (200-301)', desc: 'Routing, Switching, IP Services, Network Security, Automation fundamentals.', target: 'Lulus & Bersertifikat (Jun 2024)', done: true },
    { id: 'devnet_done', title: 'Cisco DevNet Associate (200-901)', desc: 'Network automation, REST APIs, Python scripting, Netmiko/Paramiko, Cisco platforms.', target: 'Lulus & Bersertifikat (Mar 2024)', done: true },
    { id: 'cisco_sec_done', title: 'Cisco Network Security', desc: 'Firewall rules, ACLs, secure routing, VPN tunnels, threat mitigation.', target: 'Lulus & Bersertifikat (Okt 2024)', done: true },
    { id: 'google_sec_done', title: 'Cyber Security by Google', desc: 'SIEM, network forensics, packet analysis, incident response, defense in depth.', target: 'Lulus & Bersertifikat (Okt 2025)', done: true },
    { id: 'tifo_done', title: 'BNSP TIFO Madya (Teknik Instalasi Fiber Optic)', desc: 'Fiber splicing, FTTx, ODP/ODC, OTDR loss measurement & restoration.', target: 'Lulus & Bersertifikat (Des 2021)', done: true },
    { id: 'mikrotik_done', title: 'Mikrotik RouterOS (Aguna Course)', desc: 'Bandwidth management, queue tree, firewall nat, mangle, hotspot gateway.', target: 'Lulus & Bersertifikat (2026-2030)', done: true },
    { id: 'ccnp_encor', title: 'CCNP Enterprise Core (ENCOR 350-401)', desc: 'Dual-stack enterprise routing (OSPF, BGP), SD-WAN, QoS, assurance, and network automation.', target: 'Target Q2 2027', done: false },
    { id: 'mtcre_mtcine', title: 'Mikrotik MTCRE & MTCINE', desc: 'Advanced routing, multi-area OSPF, BGP peering, MPLS, VPLS, and traffic engineering.', target: 'Target Q3 2027', done: false },
    { id: 'fortinet_nse', title: 'Fortinet NSE 4 (Network Security Professional)', desc: 'FortiGate firewall policy, SSL/IPsec VPN, SD-WAN rules, IPS, web filtering, and antivirus.', target: 'Target Q4 2027', done: false },
    { id: 'juniper_jncia', title: 'Juniper JNCIA-Junos (JN0-104)', desc: 'Junos OS routing policies, CLI operations, firewall filters, and enterprise switching.', target: 'Target 2028', done: false },
    { id: 'linux_rhcsa', title: 'Linux RHCSA / LPIC-1 (System & Network Admin)', desc: 'Red Hat Enterprise Linux system management, systemd, SSH, iptables/firewalld, network services.', target: 'Target 2028', done: false }
];

function getLearningRoadmap() {
    try {
        const raw = localStorage.getItem('aamon_learning_roadmap');
        if (raw) return JSON.parse(raw);
    } catch (e) {}
    return [...ROADMAP_DEFAULT];
}

function saveLearningRoadmap(items) {
    localStorage.setItem('aamon_learning_roadmap', JSON.stringify(items));
}

function toggleRoadmapItem(id) {
    const items = getLearningRoadmap();
    const item = items.find(i => i.id === id);
    if (item) {
        item.done = !item.done;
        saveLearningRoadmap(items);
        renderLearningRoadmap();
        showToastNotification('Progres Disimpan', `Status target "${item.title}" diperbarui.`);
    }
}

function renderLearningRoadmap() {
    const container = document.getElementById('learningRoadmapContainer');
    if (!container) return;

    const items = getLearningRoadmap();
    const completed = items.filter(i => i.done).length;
    const total = items.length;
    const pct = Math.round((completed / total) * 100);

    const progressEl = document.getElementById('roadmapProgressPercent');
    const progressBar = document.getElementById('roadmapProgressBar');
    if (progressEl) progressEl.textContent = `${completed}/${total} Selesai (${pct}%)`;
    if (progressBar) progressBar.style.width = `${pct}%`;

    container.innerHTML = items.map(item => `
        <div class="p-3.5 rounded-lg border ${item.done ? 'border-emerald-500/40 bg-emerald-950/20' : 'border-stone-800 bg-stone-900/60'} flex items-start gap-3 transition">
            <input type="checkbox" ${item.done ? 'checked' : ''} onchange="toggleRoadmapItem('${item.id}')" class="mt-1 w-4 h-4 rounded border-stone-700 bg-stone-900 text-emerald-400 focus:ring-0 cursor-pointer">
            <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-2 flex-wrap">
                    <span class="font-bold text-xs ${item.done ? 'text-emerald-200 line-through opacity-80' : 'text-stone-200'}">
                        ${item.title}
                    </span>
                    <span class="text-[10px] font-mono px-2 py-0.5 rounded ${item.done ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-stone-800 text-stone-400 border border-stone-700'}">
                        ${item.target}
                    </span>
                </div>
                <p class="text-[11px] text-stone-400 mt-1 leading-relaxed">${item.desc}</p>
            </div>
        </div>
    `).join('');
}

// Reset Preset to Network & NOC Applications
function resetToNetworkPresets() {
    if (confirm('Muat ulang data contoh loker Network Engineer & NOC? Seluruh data lamaran saat ini akan diperbarui ke preset Network Engineer.')) {
        store.applications = [...INITIAL_APPLICATIONS];
        store.saveApplications();
        renderMetricsHeader();
        renderTracker();
        renderCalendar();
        showToastNotification('Preset Dimuat', 'Data contoh loker Network Engineer & NOC berhasil dimuat.');
    }
}

// ATS Resume Modal & View Controller
let currentAtsCvId = 'cv_network';

function openAtsResumeModal(cvId = 'cv_network') {
    currentAtsCvId = cvId;
    const modal = document.getElementById('atsResumeModal');
    if (!modal) return;

    renderAtsResumeContent(cvId);
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeAtsResumeModal() {
    const modal = document.getElementById('atsResumeModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function renderAtsResumeContent(cvId) {
    const container = document.getElementById('atsResumePrintArea');
    if (!container) return;

    const d = ATS_RESUME_DATA;
    const prof = CV_PROFILES.find(p => p.id === cvId) || CV_PROFILES[0];

    container.innerHTML = `
        <div class="ats-resume-sheet font-sans text-stone-900 bg-white p-6 sm:p-10 rounded-xl max-w-3xl mx-auto shadow-sm">
            <!-- Header Section -->
            <div class="border-b-2 border-stone-900 pb-4 text-center">
                <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-950 uppercase">${d.name}</h1>
                <div class="text-sm font-bold text-stone-700 tracking-wide mt-1">${d.title}</div>
                <div class="text-xs text-stone-600 mt-2 flex items-center justify-center gap-3 flex-wrap font-mono">
                    <span>📍 ${d.location}</span>
                    <span>•</span>
                    <a href="${d.linkedin}" target="_blank" class="text-stone-900 underline font-semibold">LinkedIn Profile</a>
                    <span>•</span>
                    <a href="${d.github}" target="_blank" class="text-stone-900 underline font-semibold">GitHub</a>
                    <span>•</span>
                    <a href="${d.portfolio}" target="_blank" class="text-stone-900 underline font-semibold">Portfolio Hub</a>
                </div>
            </div>

            <!-- Professional Summary -->
            <div class="mt-5">
                <h2 class="text-xs font-bold font-mono uppercase tracking-wider text-stone-950 border-b border-stone-300 pb-1">
                    RINGKASAN PROFESIONAL / PROFESSIONAL SUMMARY
                </h2>
                <p class="text-xs text-stone-800 leading-relaxed mt-2 text-justify">
                    ${d.summary}
                </p>
            </div>

            <!-- Core Competencies -->
            <div class="mt-5">
                <h2 class="text-xs font-bold font-mono uppercase tracking-wider text-stone-950 border-b border-stone-300 pb-1">
                    KOMPETENSI INTI & KEAHLIAN TEKNIS (TECHNICAL SKILLS)
                </h2>
                <div class="mt-2 space-y-1.5 text-xs text-stone-800">
                    ${d.skills.map(s => `
                        <div>
                            <strong class="text-stone-950 font-bold">${s.category}:</strong>
                            <span class="text-stone-700"> ${s.items}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Work Experience -->
            <div class="mt-5">
                <h2 class="text-xs font-bold font-mono uppercase tracking-wider text-stone-950 border-b border-stone-300 pb-1">
                    PENGALAMAN KERJA PROFESIONAL (WORK EXPERIENCE)
                </h2>
                <div class="mt-3 space-y-4 text-xs">
                    ${d.experience.map(e => `
                        <div>
                            <div class="flex items-start justify-between gap-2 flex-wrap">
                                <div>
                                    <div class="font-bold text-stone-950 text-sm">${e.role}</div>
                                    <div class="font-semibold text-stone-700">${e.company}</div>
                                </div>
                                <div class="text-right font-mono text-[11px] text-stone-600">
                                    <div>${e.period}</div>
                                    <div class="italic">${e.location}</div>
                                </div>
                            </div>
                            <ul class="list-disc list-inside mt-1.5 space-y-1 text-stone-700 leading-relaxed pl-1">
                                ${e.points.map(pt => `<li>${pt}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Education -->
            <div class="mt-5">
                <h2 class="text-xs font-bold font-mono uppercase tracking-wider text-stone-950 border-b border-stone-300 pb-1">
                    PENDIDIKAN FORMAL (EDUCATION)
                </h2>
                <div class="mt-2.5 space-y-2 text-xs">
                    ${d.education.map(ed => `
                        <div>
                            <div class="flex items-start justify-between gap-2 flex-wrap">
                                <span class="font-bold text-stone-950">${ed.institution}</span>
                                <span class="font-mono text-[11px] text-stone-600">${ed.period}</span>
                            </div>
                            <div class="text-stone-800 font-semibold">${ed.degree} • <span class="font-bold text-stone-950">${ed.grade}</span></div>
                            <div class="text-stone-600 text-[11px] mt-0.5">${ed.notes}</div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Certifications -->
            <div class="mt-5">
                <h2 class="text-xs font-bold font-mono uppercase tracking-wider text-stone-950 border-b border-stone-300 pb-1">
                    LISENSI & SERTIFIKASI PROFESIONAL (LICENSES & CERTIFICATIONS)
                </h2>
                <div class="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    ${d.certifications.map(c => `
                        <div class="p-2 border border-stone-200 rounded bg-stone-50">
                            <div class="font-bold text-stone-950">${c.name}</div>
                            <div class="text-[11px] text-stone-600">${c.issuer} (${c.issued})</div>
                            <div class="font-mono text-[10px] text-stone-500 mt-0.5 truncate">ID: ${c.id}</div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Organizations & Projects -->
            <div class="mt-5">
                <h2 class="text-xs font-bold font-mono uppercase tracking-wider text-stone-950 border-b border-stone-300 pb-1">
                    ORGANISASI & PROYEK TAMBAHAN (ORGANIZATIONS & PROJECTS)
                </h2>
                <div class="mt-2 space-y-1 text-xs text-stone-800">
                    <div>
                        <strong class="text-stone-950">Himpunan Mahasiswa Elektro (HME) Politeknik Negeri Malang:</strong> Anggota Aktif (Mei 2018 – Jun 2019).
                    </div>
                    <div>
                        <strong class="text-stone-950">Web & Automation Portofolio Showcase (jalaninweb.site):</strong> Mengembangkan 28 sistem web fungsional mencakup aplikasi kasir POS, booking system, kalkulator transaksi instan, dan multi-page corporate portals.
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getAtsPlainText() {
    const d = ATS_RESUME_DATA;
    return `===================================================================
${d.name}
${d.title}
Surabaya, Jawa Timur, Indonesia
LinkedIn: ${d.linkedin}
GitHub: ${d.github}
Portfolio: ${d.portfolio}
===================================================================

PROFESSIONAL SUMMARY
-------------------------------------------------------------------
${d.summary}

CORE TECHNICAL COMPETENCIES
-------------------------------------------------------------------
${d.skills.map(s => `• ${s.category}: ${s.items}`).join('\n')}

PROFESSIONAL EXPERIENCE
-------------------------------------------------------------------
${d.experience.map(e => `
${e.role.toUpperCase()}
${e.company} | ${e.location}
${e.period} (${e.type})
${e.points.map(p => `  - ${p}`).join('\n')}
`).join('')}

EDUCATION
-------------------------------------------------------------------
${d.education.map(ed => `
${ed.institution}
${ed.degree} | ${ed.period}
${ed.grade}
${ed.notes}
`).join('')}

LICENSES & PROFESSIONAL CERTIFICATIONS
-------------------------------------------------------------------
${d.certifications.map(c => `• ${c.name} — ${c.issuer} (${c.issued}) [ID: ${c.id}]`).join('\n')}

ORGANIZATIONS & PROJECTS
-------------------------------------------------------------------
• Himpunan Mahasiswa Elektro (HME) Politeknik Negeri Malang — Anggota Aktif (2018–2019)
• 28+ Web Portfolios & Live Systems (jalaninweb.site) — Modern responsive apps with PageSpeed 95+
===================================================================`;
}

function getAtsMarkdownText() {
    const d = ATS_RESUME_DATA;
    return `# ${d.name}
**${d.title}**  
📍 Surabaya, East Java, Indonesia | [LinkedIn](${d.linkedin}) | [GitHub](${d.github}) | [Portfolio](${d.portfolio})

---

## 🎯 Professional Summary
${d.summary}

---

## 🛠️ Core Technical Competencies
${d.skills.map(s => `- **${s.category}:** ${s.items}`).join('\n')}

---

## 💼 Work Experience
${d.experience.map(e => `
### ${e.role}
**${e.company}** | *${e.location}* | \`${e.period}\` (\`${e.type}\`)
${e.points.map(p => `- ${p}`).join('\n')}
`).join('')}

---

## 🎓 Education
${d.education.map(ed => `
### ${ed.institution}
*${ed.degree}* | \`${ed.period}\` | **${ed.grade}**  
${ed.notes}
`).join('')}

---

## 📜 Licenses & Certifications
${d.certifications.map(c => `- **${c.name}** — ${c.issuer} (*${c.issued}*) \`ID: ${c.id}\``).join('\n')}

---

## 👥 Organizations & Projects
- **Himpunan Mahasiswa Elektro (HME) Politeknik Negeri Malang:** Anggota Aktif (2018–2019)
- **Web & Automation Portfolio (jalaninweb.site):** 28 Live web applications, POS systems, and booking engines
`;
}

function copyAtsPlainText() {
    copyTextToClipboard(getAtsPlainText(), 'CV Format ATS Plain Text berhasil disalin!');
}

function copyAtsMarkdown() {
    copyTextToClipboard(getAtsMarkdownText(), 'CV Format Markdown berhasil disalin!');
}

function printAtsResume() {
    window.print();
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
    initAppTheme();
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
    renderLearningAcademy();
    renderCoursePlayer();

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


// ===================================================================
// 8. AKADEMI & ROADMAP BELAJAR NETWORK (DEEP-DIVE MULTI-VENDOR)
// ===================================================================

const ACADEMY_MODULES = [
    // --- MIKROTIK TRACK ---
    {
        id: 'mod_mtcna',
        category: 'mikrotik',
        vendor: 'MikroTik RouterOS',
        code: 'MIKROTIK-01',
        badge: 'MTCNA (Associate)',
        level: 'Dasar / Fondasi',
        title: 'MikroTik MTCNA: Fondasi RouterOS & Network Associate',
        desc: 'Fondasi utama RouterOS: akses Winbox/CLI, pengalamatan IP, DHCP server & client, bridging L2 hardware offload, firewall filter stateful, NAT masquerade, simple queue, dan hotspot gateway.',
        labTool: 'MikroTik CHR (Cloud Hosted Router) v7 di VirtualBox / Proxmox & Winbox 3/4',
        ebookUrl: 'FILE NETWORKING/MTCNA-ebook.pdf',
        ebookLabel: 'E-Book MTCNA Lengkap (PDF)',
        subtopics: [
            {
                id: 'mtcna_01',
                title: 'Akses RouterOS, Winbox MAC-Telnet & Reset Konfigurasi',
                concept: 'Akses awal router melalui layer 2 (MAC Winbox / Neighbor Discovery) sebelum IP diset. Pengelolaan user management, reset configuration tanpa default script (no-default=yes), dan navigasi terminal CLI RouterOS.',
                cliSnippet: `/system identity set name="R1-Gateway-AAMON"\n/user add name=arkin group=full password="StrongPassword123!"\n/user remove admin\n/ip service set telnet disabled=yes ftp disabled=yes www disabled=yes api disabled=yes\n/system package print`
            },
            {
                id: 'mtcna_02',
                title: 'Konfigurasi IP Addressing, Subnetting CIDR & ARP Table',
                concept: 'Menetapkan IP static pada interface fisik, pemahaman notasi CIDR (/24, /29, /30), pengecekan tabel Address Resolution Protocol (ARP), dan pengamanan port dengan mode ARP reply-only.',
                cliSnippet: `/ip address add address=192.168.10.1/24 interface=ether2 comment="LAN Office"\n/ip address print\n/ip arp print\n/interface ethernet set ether2 arp=reply-only`
            },
            {
                id: 'mtcna_03',
                title: 'DHCP Client (WAN), DHCP Server (LAN) & IP Pool',
                concept: 'Menerima IP otomatis dari modem ISP dengan DHCP Client, lalu membagikan IP secara dinamis ke PC client melalui DHCP Server dengan parameter Lease Time, Gateway, dan DNS Server.',
                cliSnippet: `/ip dhcp-client add interface=ether1 disabled=no use-peer-dns=yes use-peer-ntp=yes comment="Uplink ISP"\n/ip pool add name=pool-lan ranges=192.168.10.100-192.168.10.200\n/ip dhcp-server add name=dhcp-lan interface=ether2 address-pool=pool-lan lease-time=1d disabled=no\n/ip dhcp-server network add address=192.168.10.0/24 gateway=192.168.10.1 dns-server=8.8.8.8,1.1.1.1`
            },
            {
                id: 'mtcna_04',
                title: 'Bridging Interface & L2 Hardware Offloading',
                concept: 'Menggabungkan beberapa port fisik (misal ether2 s/d ether5) ke dalam satu broadcast domain Layer 2 dengan fitur Hardware Offload (hw=yes) agar peralihan paket diproses oleh switch-chip tanpa membebani CPU.',
                cliSnippet: `/interface bridge add name=bridge-lan protocol-mode=rstp\n/interface bridge port add bridge=bridge-lan interface=ether2 hw=yes\n/interface bridge port add bridge=bridge-lan interface=ether3 hw=yes\n/interface bridge port add bridge=bridge-lan interface=ether4 hw=yes`
            },
            {
                id: 'mtcna_05',
                title: 'Routing Statik & Failover Link (check-gateway=ping)',
                concept: 'Tabel routing RouterOS (flag Active, Static, Dynamic). Menambahkan default route 0.0.0.0/0 dan mekanisme failover otomatis 2 jalur internet menggunakan distance dan check-gateway=ping.',
                cliSnippet: `/ip route add dst-address=0.0.0.0/0 gateway=10.10.10.1 check-gateway=ping distance=1 comment="Primary ISP Telkom"\n/ip route add dst-address=0.0.0.0/0 gateway=192.168.20.1 distance=2 comment="Backup ISP Biznet"\n/ip route print detail`
            },
            {
                id: 'mtcna_06',
                title: 'Firewall Filter: Chain Input, Forward, Output & Stateful Rules',
                concept: 'Chain Input melindungi router itu sendiri dari serangan luar. Chain Forward mengontrol paket yang melintasi router (LAN ke Internet). Menggunakan stateful inspection (accept established & related, drop invalid).',
                cliSnippet: `/ip firewall filter add chain=input connection-state=established,related action=accept comment="Allow Established/Related"\n/ip firewall filter add chain=input connection-state=invalid action=drop comment="Drop Invalid"\n/ip firewall filter add chain=input protocol=icmp action=accept comment="Allow ICMP"\n/ip firewall filter add chain=input in-interface=ether1 action=drop comment="Drop WAN to Router Input"\n/ip firewall filter add chain=forward connection-state=established,related action=accept`
            },
            {
                id: 'mtcna_07',
                title: 'NAT: Masquerade (Internet Sharing) & Destination NAT (Port Forward)',
                concept: 'Source NAT (Masquerade) mentranslasikan IP privat lokal ke IP publik WAN agar bisa browsing. Destination NAT (Port Forwarding) membuka akses publik ke server internal (misal web, CCTV, SSH).',
                cliSnippet: `/ip firewall nat add chain=srcnat out-interface=ether1 action=masquerade comment="NAT Internet Masquerade"\n/ip firewall nat add chain=dstnat in-interface=ether1 protocol=tcp dst-port=8080 action=dst-nat to-addresses=192.168.10.50 to-ports=80 comment="Forward Web Server"`
            },
            {
                id: 'mtcna_08',
                title: 'Manajemen Bandwidth: Simple Queue & PCQ Dynamic Equalizer',
                concept: 'Membatasi bandwidth per user/subnet. Simple Queue untuk alokasi fix (misal 10 Mbps). Per Connection Queue (PCQ) membagi bandwidth secara adil otomatis ke seluruh user aktif yang sedang download.',
                cliSnippet: `/queue type add name=pcq-download kind=pcq pcq-rate=0 pcq-classifier=dst-address\n/queue type add name=pcq-upload kind=pcq pcq-rate=0 pcq-classifier=src-address\n/queue simple add name="Bandwidth-Office" target=192.168.10.0/24 max-limit=50M/50M queue=pcq-upload/pcq-download`
            }
        ]
    },
    {
        id: 'mod_mtcre',
        category: 'mikrotik',
        vendor: 'MikroTik RouterOS',
        code: 'MIKROTIK-02',
        badge: 'MTCRE (Routing Engineer)',
        level: 'Menengah',
        title: 'MikroTik MTCRE: Routing Engineer, OSPF & Site-to-Site Tunneling',
        desc: 'Routing tingkat lanjut: Equal-Cost Multi-Path (ECMP), Point-to-Point addressing (/30, /31, /32), Dynamic Routing OSPF Single & Multi-Area, Route Filtering, Mangle Routing Marks, EoIP/GRE/IPIP Tunneling, dan Bridge VLAN Filtering v7.',
        labTool: 'EVE-NG / GNS3 dengan 3-4 node MikroTik CHR v7 saling terkoneksi',
        subtopics: [
            {
                id: 'mtcre_01',
                title: 'Multi-Gateway Routing, ECMP & Policy-Based Routing (Mangle)',
                concept: 'Membagi beban koneksi internet (ECMP) dengan memasang beberapa gateway sekaligus pada satu rule route, serta Policy Based Routing (PBR) untuk memisahkan jalur traffic browsing vs streaming menggunakan routing mark.',
                cliSnippet: `/ip route add dst-address=0.0.0.0/0 gateway=10.0.1.1,10.0.2.1 check-gateway=ping comment="ECMP 2 Uplink"\n/ip firewall mangle add chain=prerouting src-address=192.168.10.0/24 dst-address-type=!local action=mark-routing new-routing-mark=to-ISP2 passthrough=no\n/ip route add dst-address=0.0.0.0/0 gateway=10.0.2.1 routing-table=to-ISP2`
            },
            {
                id: 'mtcre_02',
                title: 'OSPFv2 Single Area (Area 0 Backbone) & Adjacency States',
                concept: 'Konfigurasi dynamic routing Link State OSPF di RouterOS v7. Pembentukan Router-ID, instance OSPF, backbone area, interface template point-to-point, cost interface, dan passive interface pada LAN.',
                cliSnippet: `/routing ospf instance add name=ospf-core router-id=10.255.255.1\n/routing ospf area add name=backbone instance=ospf-core area-id=0.0.0.0\n/routing ospf interface-template add area=backbone networks=10.0.0.0/30 type=ptp cost=10\n/routing ospf interface-template add area=backbone networks=192.168.10.0/24 passive=yes\n/routing ospf neighbor print`
            },
            {
                id: 'mtcre_03',
                title: 'OSPF Multi-Area, ABR, LSA Types & Route Summarization',
                concept: 'Membatasi flooding LSA di jaringan luas dengan membagi rute ke beberapa area (misal Area 1 Surabaya, Area 2 Jakarta). Area Border Router (ABR) meringkas rute dengan area-range untuk menghemat memori routing table.',
                cliSnippet: `/routing ospf area add name=area-surabaya instance=ospf-core area-id=0.0.0.1\n/routing ospf area-range add area=area-surabaya prefix=172.16.0.0/16 advertise=yes comment="Summarize Jatim Subnets"\n/routing ospf route print`
            },
            {
                id: 'mtcre_04',
                title: 'Tunneling: EoIP, GRE, IPIP & WireGuard L2/L3 Bridging',
                concept: 'Menghubungkan jaringan antar-cabang via internet publik. Ethernet over IP (EoIP) membungkus frame L2 ke dalam paket IP sehingga kedua kantor seolah berada dalam satu kabel switch yang sama.',
                cliSnippet: `/interface eoip add name=eoip-kantor-pusat remote-address=202.152.1.20 tunnel-id=10\n/interface bridge port add bridge=bridge-lan interface=eoip-kantor-pusat\n/interface wireguard add name=wg0 listen-port=13231 private-key="AutoGeneratedKey"\n/interface wireguard peers add interface=wg0 public-key="PeerPublicKey" endpoint-address=202.152.1.20 endpoint-port=13231 allowed-address=10.100.0.2/32`
            },
            {
                id: 'mtcre_05',
                title: 'Bridge VLAN Filtering (Standar Modern RouterOS v7)',
                concept: 'Pemisahan VLAN trunk dan access di atas satu software bridge. Port ether1 sebagai trunk (tagged) membawa VLAN 10 & 20, ether2 access VLAN 10 (untagged pvid=10), ether3 access VLAN 20 (pvid=20).',
                cliSnippet: `/interface bridge add name=bridge1 vlan-filtering=no\n/interface bridge vlan add bridge=bridge1 vlan-ids=10,20 tagged=bridge1,ether1 untagged=ether2,ether3\n/interface bridge port add bridge=bridge1 interface=ether2 pvid=10\n/interface bridge port add bridge=bridge1 interface=ether3 pvid=20\n/interface bridge set bridge1 vlan-filtering=yes`
            }
        ]
    },
    {
        id: 'mod_mtcine',
        category: 'mikrotik',
        vendor: 'MikroTik RouterOS',
        code: 'MIKROTIK-03',
        badge: 'MTCINE (ISP & Enterprise)',
        level: 'Lanjutan / Enterprise',
        title: 'MikroTik MTCINE: Inter-networking ISP, BGP Peering & MPLS/VPLS',
        desc: 'Kurikulum standar ISP tier-2/tier-3: Autonomous System (ASN), Exterior BGP Peering, Interior BGP & Route Reflector, BGP Path Selection (AS-Path Prepend, Local-Pref), MPLS LDP, VPLS L2VPN, dan VRF Multi-Tenant.',
        labTool: 'EVE-NG dengan 5 node MikroTik CHR v7 membentuk topologi Core, Edge & Customer',
        subtopics: [
            {
                id: 'mtcine_01',
                title: 'BGP Fundamentals, Autonomous System (ASN) & EBGP Peering',
                concept: 'Exterior Gateway Protocol standar perutean internet global. Pembentukan session TCP port 179 dengan upstream ISP / IXP, pertukaran routing table publik, dan penentuan hold-time serta keepalive.',
                cliSnippet: `/routing bgp template add name=tpl-upstream as=65501 router-id=103.10.1.1 hold-time=90s\n/routing bgp connection add name=peer-biznet template=tpl-upstream remote.address=103.10.1.2 remote.as=17451 output.network=bgp-public-ip\n/routing bgp connection print\n/routing route print where bgp`
            },
            {
                id: 'mtcine_02',
                title: 'IBGP Full-Mesh Problem & Route Reflector (RR) Architecture',
                concept: 'IBGP mensyaratkan full-mesh (n*(n-1)/2 koneksi) karena split-horizon rule tidak meneruskan rute yang diterima dari satu peer IBGP ke peer IBGP lain. Solusinya adalah menunjuk router sentral sebagai Route Reflector.',
                cliSnippet: `/routing bgp connection add name=ibgp-client-1 template=tpl-upstream remote.address=10.255.255.2 remote.as=65501 cluster-id=1.1.1.1 route-reflector=yes\n/routing bgp connection add name=ibgp-client-2 template=tpl-upstream remote.address=10.255.255.3 remote.as=65501 cluster-id=1.1.1.1 route-reflector=yes`
            },
            {
                id: 'mtcine_03',
                title: 'BGP Path Selection, AS-Path Prepend & Local-Preference',
                concept: 'Manipulasi jalur lalu lintas. Untuk mengatur rute masuk dari internet (Inbound traffic), lakukan AS-Path Prepending agar jalur alternatif terlihat lebih jauh. Untuk mengatur rute keluar (Outbound), pasang Local-Preference tertinggi.',
                cliSnippet: `/routing filter rule add chain=bgp-out rule="if (dst == 103.100.0.0/22) { set bgp-path-prepend 3; accept; } comment='Make backup ISP longer'"\n/routing filter rule add chain=bgp-in rule="if (net == 0.0.0.0/0) { set bgp-local-pref 200; accept; } comment='Prefer this link for outbound'"`
            },
            {
                id: 'mtcine_04',
                title: 'MPLS LDP (Label Distribution Protocol) & Label Swapping',
                concept: 'Teknologi pergantian label di router Provider (P) dan Provider Edge (PE). Paket diteruskan berdasarkan label 20-bit MPLS shim header, bukan lagi IP destination lookup di core, menghemat latency drastis.',
                cliSnippet: `/mpls ldp add ldp-address=10.255.255.1 transport-address=10.255.255.1 interface=ether1,ether2\n/mpls ldp print\n/mpls ldp neighbor print\n/mpls forwarding-table print`
            },
            {
                id: 'mtcine_05',
                title: 'VPLS (Virtual Private LAN Service) & VRF Customer Segmentation',
                concept: 'Membangun layanan Metro-Ethernet L2 point-to-multipoint untuk pelanggan korporat di atas jaringan backbone MPLS, serta isolasi tabel routing layer 3 antar pelanggan perbankan dengan VRF.',
                cliSnippet: `/interface vpls add name=vpls-bank-jatim remote-peer=10.255.255.9 vpls-id=100 disabled=no\n/interface bridge port add bridge=br-customer-bank interface=vpls-bank-jatim\n/ip vrf add name=vrf-telkom-corp interfaces=vlan100 route-distinguisher=65501:100`
            }
        ]
    },
    {
        id: 'mod_mtctce',
        category: 'mikrotik',
        vendor: 'MikroTik RouterOS',
        code: 'MIKROTIK-04',
        badge: 'MTCTCE (Traffic Control)',
        level: 'Lanjutan',
        title: 'MikroTik MTCTCE: Traffic Control, RAW Table & Hierarchical QoS',
        desc: 'Kontrol trafik dan QoS tingkat mahir: Connection Tracking architecture, Firewall RAW table untuk mitigasi DDoS tanpa membebani CPU, Address-Lists dinamis, Packet Marking Mangle, dan HTB Queue Tree bertingkat.',
        labTool: 'MikroTik CHR v7 dengan traffic generator (iperf3 / Packet Sender)',
        subtopics: [
            {
                id: 'mtctce_01',
                title: 'Arsitektur Packet Flow RouterOS v7 & Connection Tracking',
                concept: 'Alur tahapan paket saat masuk router: Prerouting -> Connection Tracking -> Routing Decision -> Input/Forward -> Postrouting. Pemahaman batas kapasitas tabel conntrack pada router berkecepatan tinggi.',
                cliSnippet: `/ip firewall connection print count-only\n/ip firewall connection tracking set tcp-established-timeout=1h tcp-syn-received-timeout=1m enabled=yes\n/ip firewall connection print where src-address ~ "192.168.10."`
            },
            {
                id: 'mtctce_02',
                title: 'Tabel RAW: Menangkal Serangan SYN Flood & Port Scan Instan',
                concept: 'Tabel RAW memproses paket sebelum Connection Tracking terbentuk. Sangat ampuh men-drop jutaan paket serangan SYN flood atau UDP blaster tanpa membuat CPU router menyentuh 100%.',
                cliSnippet: `/ip firewall raw add chain=prerouting protocol=tcp tcp-flags=syn in-interface=ether1 connection-limit=30,32 action=drop comment="Drop SYN Flood Attack"\n/ip firewall raw add chain=prerouting in-interface=ether1 src-address-list=bad_actors action=drop comment="Drop Blacklisted IPs"`
            },
            {
                id: 'mtctce_03',
                title: 'Address-Lists Dinamis & Port Knocking Secret Door',
                concept: 'Mencatat IP penyerang yang mencoba brute-force Winbox atau SSH ke dalam daftar blacklist selama 24 jam secara otomatis. Membuka port manajemen hanya bagi user yang telah mengetuk urutan port tertentu.',
                cliSnippet: `/ip firewall filter add chain=input protocol=tcp dst-port=22 connection-state=new action=add-src-to-address-list address-list=ssh_scanners address-list-timeout=1d comment="Detect SSH Scanners"\n/ip firewall filter add chain=input src-address-list=ssh_scanners action=drop comment="Block Blacklisted Scanners"`
            },
            {
                id: 'mtctce_04',
                title: 'QoS HTB (Hierarchical Token Bucket) & Queue Tree Mangle',
                concept: 'Membuat pohon antrean bandwidth hierarkis. Mangle menandai paket DNS & Game (Priority 1, limit-at garansi), Web browsing (Priority 4), dan File download/Torrent (Priority 8).',
                cliSnippet: `/ip firewall mangle add chain=forward protocol=udp dst-port=53 action=mark-packet new-packet-mark=pkt-dns passthrough=no\n/ip firewall mangle add chain=forward protocol=tcp dst-port=80,443 action=mark-packet new-packet-mark=pkt-web passthrough=no\n/queue tree add name=root-parent parent=bridge-lan max-limit=100M\n/queue tree add name=q-dns parent=root-parent packet-mark=pkt-dns priority=1 limit-at=5M max-limit=10M\n/queue tree add name=q-web parent=root-parent packet-mark=pkt-web priority=4 limit-at=30M max-limit=90M`
            }
        ]
    },

    // --- CISCO CCNA TRACK ---
    {
        id: 'mod_ccna_1',
        category: 'cisco',
        vendor: 'Cisco IOS',
        code: 'CCNA-01',
        badge: 'CCNA Domain 1',
        level: 'Dasar / Fondasi',
        title: 'Cisco CCNA: Network Fundamentals, OSI & IPv4/IPv6 Addressing',
        desc: 'Fondasi jaringan komputer menurut silabus resmi Cisco 200-301: OSI 7 Layer, TCP/IP stack, Subnetting VLSM langkah demi langkah, IPv6 Global Unicast & SLAAC, media kabel UTP/Fiber, dan navigasi CLI Cisco IOS.',
        labTool: 'Cisco Packet Tracer 8.2+ / GNS3',
        ebookUrl: 'FILE NETWORKING/200-301-CCNA-v1.1.pdf',
        ebookLabel: 'Cisco CCNA Blueprint (PDF)',
        subtopics: [
            {
                id: 'ccna1_01',
                title: 'Model OSI 7 Layer vs TCP/IP & Enkapsulasi Paket (PDU)',
                concept: 'Alur Data (Application) -> Segment (Transport TCP/UDP) -> Packet (Network IP) -> Frame (Data Link MAC) -> Bits (Physical). Pemahaman header IP, TTL, MSS, dan MTU 1500 bytes.',
                cliSnippet: `show interfaces gigabitEthernet 0/0/0\nshow controllers gigabitEthernet 0/0/0\nshow ip interface brief`
            },
            {
                id: 'ccna1_02',
                title: 'IPv4 Subnetting VLSM (Variable Length Subnet Mask)',
                concept: 'Perhitungan cepat subnetting: Network ID, Host Usable (2^h - 2), Broadcast ID, dan Wildcard Mask (255.255.255.255 - Subnet Mask). Penggunaan subnet hemat /30 dan /31 untuk link point-to-point router.',
                cliSnippet: `conf t\ninterface gigabitEthernet 0/0/0\n description Uplink to Core Router\n ip address 10.10.10.1 255.255.255.252\n no shutdown\nexit`
            },
            {
                id: 'ccna1_03',
                title: 'IPv6 Architecture: Global Unicast, Link-Local & EUI-64',
                concept: 'Alamat 128-bit hexadesimal. Link-Local (fe80::/10) untuk komunikasi lokal satu link, Global Unicast (2000::/3) rute internet publik, Multicast (ff02::1 all nodes, ff02::2 all routers), dan auto konversi MAC EUI-64.',
                cliSnippet: `conf t\nipv6 unicast-routing\ninterface gigabitEthernet 0/0/1\n ipv6 address 2001:db8:acad:1::1/64\n ipv6 address fe80::1 link-local\n no shutdown\nexit\nshow ipv6 interface brief`
            },
            {
                id: 'ccna1_04',
                title: 'Navigasi Cisco IOS CLI, Mode Hirarki & Password Recovery',
                concept: 'Navigasi User EXEC (>), Privileged EXEC (#), Global Configuration ((config)#), Interface ((config-if)#), dan Line configuration. Perintah copy running-config startup-config untuk menyimpan ke NVRAM.',
                cliSnippet: `enable\nconf t\nhostname R1-SURABAYA\nservice password-encryption\nenable secret CiscoSecret2026!\nbanner motd # PERINGATAN: HANYA AKSES RESMI #\nline vty 0 4\n transport input ssh\n login local\nexit\nwrite memory`
            }
        ]
    },
    {
        id: 'mod_ccna_2',
        category: 'cisco',
        vendor: 'Cisco IOS',
        code: 'CCNA-02',
        badge: 'CCNA Domain 2',
        level: 'Dasar - Menengah',
        title: 'Cisco CCNA: LAN Switching, VLAN, 802.1Q Trunk & Spanning Tree',
        desc: 'Pengoperasian switch Cisco Catalyst: MAC Address Table, segmentasi VLAN, trunking 802.1Q, Inter-VLAN Routing (Router-on-a-Stick & L3 SVI), Spanning Tree Protocol (STP & Rapid-PVST+), EtherChannel LACP, dan CDP/LLDP.',
        labTool: 'Cisco Packet Tracer dengan 2 Switch Cisco 2960 + 1 Router 2911',
        ebookUrl: 'FILE NETWORKING/CCNA Lab Guide Nixtrain_1st Edition_Full Version.pdf',
        ebookLabel: 'CCNA Full Lab Guide (PDF)',
        subtopics: [
            {
                id: 'ccna2_01',
                title: 'Switch Learning, Aging & MAC Address Table Flooding',
                concept: '3 proses internal switch: 1. Belajar source MAC saat frame masuk, 2. Meneruskan frame jika destination MAC sudah tercatat di tabel, 3. Membanjiri (Flooding) ke seluruh port jika destination MAC belum dikenal.',
                cliSnippet: `show mac address-table\nshow mac address-table dynamic\nclear mac address-table dynamic`
            },
            {
                id: 'ccna2_02',
                title: 'VLAN Segmentation & 802.1Q Trunking Protocol',
                concept: 'Memecah satu broadcast domain menjadi beberapa departemen. Port Access menghubungkan ke PC pengguna, port Trunk membawa banyak tag VLAN 802.1Q ke switch lain dengan pengamanan native VLAN.',
                cliSnippet: `conf t\nvlan 10\n name Staff-Office\nvlan 20\n name Server-Farm\ninterface range fastEthernet 0/1 - 10\n switchport mode access\n switchport access vlan 10\ninterface gigabitEthernet 0/1\n switchport mode trunk\n switchport trunk native vlan 99\n switchport trunk allowed vlan 10,20,99\nexit`
            },
            {
                id: 'ccna2_03',
                title: 'Inter-VLAN Routing: Router-on-a-Stick vs Layer 3 SVI',
                concept: 'Menghubungkan komunikasi antar-VLAN. Router-on-a-Stick menggunakan sub-interface router fisik (encapsulation dot1Q). Switch Layer 3 menggunakan Switch Virtual Interface (SVI) dengan `ip routing` aktif.',
                cliSnippet: `# Router-on-a-Stick:\nconf t\ninterface gigabitEthernet 0/0/0.10\n encapsulation dot1Q 10\n ip address 192.168.10.1 255.255.255.0\ninterface gigabitEthernet 0/0/0.20\n encapsulation dot1Q 20\n ip address 192.168.20.1 255.255.255.0\n\n# Atau pada L3 Switch:\nconf t\nip routing\ninterface vlan 10\n ip address 192.168.10.1 255.255.255.0`
            },
            {
                id: 'ccna2_04',
                title: 'Spanning Tree Protocol (STP 802.1D & Rapid-PVST+ 802.1w)',
                concept: 'Mencegah terjadinya loop Layer 2 dan broadcast storm pada topologi redundant switch. Pemilihan Root Bridge berdasarkan Bridge Priority terendah (default 32768), Root Port, Designated Port, dan Alternate/Blocking Port.',
                cliSnippet: `conf t\nspanning-tree mode rapid-pvst\nspanning-tree vlan 10,20 root primary\n# Atau manual set priority:\nspanning-tree vlan 10 priority 4096\nshow spanning-tree vlan 10\nshow spanning-tree summary`
            },
            {
                id: 'ccna2_05',
                title: 'EtherChannel / Link Aggregation (LACP IEEE 802.3ad & PAgP)',
                concept: 'Menggabungkan 2 hingga 8 port fisik ethernet menjadi 1 link trunk logis berkecepatan tinggi dengan fitur failover otomatis jika salah satu kabel fisik terputus. Mode LACP standar terbuka: active dan passive.',
                cliSnippet: `conf t\ninterface range gigabitEthernet 0/1 - 2\n channel-group 1 mode active\ninterface port-channel 1\n switchport mode trunk\n switchport trunk allowed vlan 10,20,99\nshow etherchannel summary`
            }
        ]
    },
    {
        id: 'mod_ccna_3',
        category: 'cisco',
        vendor: 'Cisco IOS',
        code: 'CCNA-03',
        badge: 'CCNA Domain 3',
        level: 'Menengah',
        title: 'Cisco CCNA: IP Connectivity, Static Routing & OSPFv2 Single Area',
        desc: 'Logika perutean paket IP: Routing Table, Longest Prefix Match, Administrative Distance, Static & Default Route, Floating Static Route, dan Dynamic Routing OSPFv2 (Neighbor adjacency, DR/BDR, Cost metric calculation).',
        labTool: 'Cisco Packet Tracer dengan 3 Router Cisco 2911 saling terkoneksi serial/gigabit',
        subtopics: [
            {
                id: 'ccna3_01',
                title: 'Tabel Routing, Longest Prefix Match & Administrative Distance',
                concept: 'Prinsip pemilihan rute terbaik: Router selalu memilih subnet terpanjang / paling spesifik lebih dulu. Jika ada dua rute dengan prefix sama dari protokol berbeda, router memilih Administrative Distance terendah (Connected=0, Static=1, eBGP=20, OSPF=110, iBGP=200).',
                cliSnippet: `show ip route\nshow ip route summary\nshow ip route ospf`
            },
            {
                id: 'ccna3_02',
                title: 'Static Route, Default Route (0.0.0.0/0) & Floating Backup Route',
                concept: 'Konfigurasi rute statik next-hop IP vs exit-interface. Floating static route dikonfigurasi dengan AD lebih tinggi (misal 150) sehingga berstatus siaga (standby) dan baru aktif saat link utama down.',
                cliSnippet: `conf t\nip route 0.0.0.0 0.0.0.0 203.0.113.1 name Primary-Fiber\nip route 0.0.0.0 0.0.0.0 198.51.100.1 150 name Backup-Cellular\nip route 172.16.50.0 255.255.255.0 10.10.10.2`
            },
            {
                id: 'ccna3_03',
                title: 'OSPFv2 Single Area (Area 0), Router-ID & Adjacency States',
                concept: '7 tahapan neighbor OSPF: Down -> Init -> 2-Way -> ExStart -> Exchange -> Loading -> Full. Menentukan Router ID unik, wildcard mask dalam network statement, dan pemilihan DR/BDR pada jaringan multi-access broadcast.',
                cliSnippet: `conf t\nrouter ospf 1\n router-id 1.1.1.1\n network 192.168.10.0 0.0.0.255 area 0\n network 10.0.0.0 0.0.0.3 area 0\n passive-interface gigabitEthernet 0/0/1\n auto-cost reference-bandwidth 1000\nexit\nshow ip ospf neighbor`
            },
            {
                id: 'ccna3_04',
                title: 'Injeksi Default Route OSPF (default-information originate)',
                concept: 'Meneruskan default route internet router gateway ke seluruh router internal OSPF secara otomatis tanpa perlu setting rute statik di tiap router cabang.',
                cliSnippet: `conf t\nrouter ospf 1\n default-information originate always\nexit\nshow ip ospf database`
            }
        ]
    },
    {
        id: 'mod_ccna_4',
        category: 'cisco',
        vendor: 'Cisco IOS',
        code: 'CCNA-04',
        badge: 'CCNA Domain 4 & 5',
        level: 'Menengah',
        title: 'Cisco CCNA: IP Services, NAT, HSRP & Network Security Basics',
        desc: 'Layanan esensial jaringan: DHCP Server & Relay, NAT/PAT Overload, First Hop Redundancy HSRP, Standard & Extended IPv4 ACLs, Switchport Port-Security, DHCP Snooping, dan Dynamic ARP Inspection (DAI).',
        labTool: 'Cisco Packet Tracer dengan topologi LAN Corporate lengkap',
        subtopics: [
            {
                id: 'ccna4_01',
                title: 'DHCP Server & DHCP Relay Agent (ip helper-address)',
                concept: 'Konfigurasi pool DHCP di router, pengecualian IP statik server/printer, serta konfigurasi ip helper-address pada sub-interface switch/router agar request DHCP broadcast L2 diteruskan secara unicast ke server DHCP terpusat.',
                cliSnippet: `conf t\nip dhcp excluded-address 192.168.10.1 192.168.10.20\nip dhcp pool POOL-OFFICE\n network 192.168.10.0 255.255.255.0\n default-router 192.168.10.1\n dns-server 8.8.8.8 1.1.1.1\ninterface gigabitEthernet 0/0/0.20\n ip helper-address 192.168.100.10`
            },
            {
                id: 'ccna4_02',
                title: 'Network Address Translation: Static NAT & PAT Overload',
                concept: 'Translasi alamat IP. Port Address Translation (PAT / Overload) mentranslasikan ribuan koneksi lokal ke 1 alamat IP publik menggunakan pemetaan port source unik TCP/UDP.',
                cliSnippet: `conf t\naccess-list 1 permit 192.168.0.0 0.0.255.255\ninterface gigabitEthernet 0/0/0\n ip nat outside\ninterface gigabitEthernet 0/0/1\n ip nat inside\nip nat inside source list 1 interface gigabitEthernet 0/0/0 overload\nshow ip nat translations`
            },
            {
                id: 'ccna4_03',
                title: 'First Hop Redundancy Protocol (HSRP Active & Standby)',
                concept: 'Menyediakan default gateway redundan bagi PC client. Dua router berbagi satu IP gateway virtual (VIP). Router dengan priority tertinggi (default 100) menjadi Active, dan preempt memastikan router utama mengambil alih kembali saat pulih.',
                cliSnippet: `conf t\ninterface gigabitEthernet 0/0/1\n ip address 192.168.10.2 255.255.255.0\n standby 1 ip 192.168.10.1\n standby 1 priority 110\n standby 1 preempt\nshow standby brief`
            },
            {
                id: 'ccna4_04',
                title: 'Standard & Extended IPv4 Access Control Lists (ACL)',
                concept: 'Standard ACL (1-99) memfilter hanya berdasarkan IP source (diletakkan sedekat mungkin ke tujuan). Extended ACL (100-199) memfilter berdasarkan source IP, destination IP, protokol TCP/UDP/ICMP, dan nomor port (diletakkan sedekat mungkin ke sumber).',
                cliSnippet: `conf t\nip access-list extended SECURE-SERVERS\n permit tcp 192.168.10.0 0.0.0.255 host 192.168.20.5 eq 443\n permit tcp 192.168.10.0 0.0.0.255 host 192.168.20.5 eq 22\n deny ip any host 192.168.20.5\n permit ip any any\ninterface gigabitEthernet 0/0/1\n ip access-group SECURE-SERVERS in`
            },
            {
                id: 'ccna4_05',
                title: 'Layer 2 Switch Security: Port-Security, DHCP Snooping & DAI',
                concept: 'Port-Security membatasi MAC address per port (sticky MAC) dengan aksi shutdown jika ada laptop ilegal terhubung. DHCP Snooping mencegah rogue DHCP server, dan Dynamic ARP Inspection (DAI) menepis serangan Man-In-The-Middle ARP Poisoning.',
                cliSnippet: `conf t\ninterface fastEthernet 0/5\n switchport mode access\n switchport port-security\n switchport port-security maximum 2\n switchport port-security mac-address sticky\n switchport port-security violation shutdown\nip dhcp snooping\nip dhcp snooping vlan 10,20\nip arp inspection vlan 10,20`
            }
        ]
    },

    // --- CISCO ENTERPRISE CORE & DEVNET AUTOMATION ---
    {
        id: 'mod_devnet',
        category: 'enterprise',
        vendor: 'Cisco NetDevOps',
        code: 'DEVNET-01',
        badge: 'DevNet Associate (200-901)',
        level: 'Menengah - Lanjutan',
        title: 'Cisco DevNet Associate: Network Automation, Python & REST APIs',
        desc: 'Kurikulum NetDevOps modern: Pemrograman Python untuk engineer jaringan, parsing data terstruktur (JSON, YAML, XML), arsitektur REST API & Postman, otomasi SSH multi-device dengan pustaka Netmiko, model data YANG, NETCONF & RESTCONF.',
        labTool: 'Python 3.10+, VS Code, Postman, Cisco DevNet Always-On Sandbox',
        subtopics: [
            {
                id: 'devnet_01',
                title: 'Dasar Python untuk Network Engineer (List, Dict, Loop)',
                concept: 'Mengelola daftar perangkat inventori menggunakan Dictionary dan List Python, iterasi multi router, manipulasi string teks output CLI, dan penanganan exception saat koneksi gagal.',
                cliSnippet: `devices = [\n    {"ip": "10.0.1.1", "role": "Core-R1", "vendor": "cisco"},\n    {"ip": "10.0.1.2", "role": "Dist-SW1", "vendor": "cisco"}\n]\nfor dev in devices:\n    print(f"Connecting to {dev['role']} ({dev['ip']})...")`
            },
            {
                id: 'devnet_02',
                title: 'Parsing Format Data Terstruktur: JSON, YAML & XML',
                concept: 'Data format standar industri dalam automasi. Membaca file konfigurasi YAML, mengonversi respon API JSON menjadi dictionary Python, dan serialisasi data tanpa hardcoded string.',
                cliSnippet: `import json, yaml\n\nwith open('devices.json') as f:\n    data = json.load(f)\n\nprint(yaml.dump(data, default_flow_style=False))`
            },
            {
                id: 'devnet_03',
                title: 'REST API Fundamentals, HTTP Verbs & Token Authentication',
                concept: 'Interaksi API perangkat jaringan: HTTP GET untuk menarik status interface, POST untuk membuat rule baru, PUT/PATCH untuk mengedit rute, dan DELETE. Menggunakan Authorization Bearer token dan header application/json.',
                cliSnippet: `import requests\n\nurl = "https://sandbox-iosxe-latest-1.cisco.com:443/restconf/data/ietf-interfaces:interfaces"\nheaders = {"Accept": "application/yang-data+json"}\nresp = requests.get(url, auth=('admin', 'C1sco12345'), headers=headers, verify=False)\nprint(resp.json())`
            },
            {
                id: 'devnet_04',
                title: 'Otomasi Multi-Device Cisco & MikroTik dengan Netmiko',
                concept: 'Menghubungi puluhan router/switch secara massal via protokol SSH terenkripsi, menjalankan verifikasi show command, dan mem-push konfigurasi baru secara paralel dalam hitungan detik.',
                cliSnippet: `from netmiko import ConnectHandler\n\ncisco_dev = {\n    'device_type': 'cisco_ios',\n    'host': '192.168.1.1',\n    'username': 'arkin',\n    'password': 'Password123'\n}\n\nwith ConnectHandler(**cisco_dev) as conn:\n    output = conn.send_command('show ip int brief')\n    print(output)`
            },
            {
                id: 'devnet_05',
                title: 'Model-Driven Programmability: YANG, NETCONF & RESTCONF',
                concept: 'Menggantikan metode CLI screen-scraping yang mudah error dengan standar model data formal YANG (RFC 6020). Berkomunikasi melalui NETCONF (port 830 berbasis XML) atau RESTCONF (port 443 berbasis JSON).',
                cliSnippet: `conf t\nnetconf-yang\nrestconf\nend\nshow netconf-yang datastores\nshow platform software yang-management process`
            }
        ]
    },
    {
        id: 'mod_ccnp_encor',
        category: 'enterprise',
        vendor: 'Cisco Enterprise',
        code: 'CCNP-01',
        badge: 'CCNP Enterprise (ENCOR 350-401)',
        level: 'Lanjutan / Enterprise',
        title: 'Cisco CCNP Enterprise Core: SD-WAN, BGP Path & Telemetry',
        desc: 'Kurikulum enterprise tier-1: Arsitektur Cisco SD-WAN (vManage, vSmart, vBond, vEdge), Algoritma Path Selection BGP 8 Tingkat, Multi-Area OSPF LSAs (Type 1-5, Stub/NSSA), Route Redistribution dengan Route-Maps, dan Model-Driven Streaming Telemetry.',
        labTool: 'EVE-NG Baremetal dengan Cisco IOL & vManage SD-WAN nodes',
        subtopics: [
            {
                id: 'ccnp_01',
                title: 'Arsitektur Cisco SD-WAN Fabric (Control & Data Plane)',
                concept: 'Pemisahan 4 bidang SD-WAN: Management Plane (vManage untuk dashboard & push template), Control Plane (vSmart menjalankan protokol OMP), Orchestration Plane (vBond untuk zero-touch onboarding & NAT traversal), dan Data Plane (vEdge/cEdge membangun IPsec tunnel mesh).',
                cliSnippet: `show sdwan control connections\nshow sdwan bfd sessions\nshow sdwan omp routes\nshow sdwan ipsec inbound-connections`
            },
            {
                id: 'ccnp_02',
                title: 'Enterprise BGP: 8 Algoritma Path Selection & Route Policies',
                concept: 'Urutan penentuan rute terbaik BGP: 1. Weight tertinggi (lokal Cisco), 2. Local-Preference tertinggi, 3. Locally originated, 4. AS-Path terpendek, 5. Origin code (IGP < EGP < Incomplete), 6. MED terendah, 7. eBGP lebih dipilih dari iBGP, 8. IGP metric ke Next-Hop terendah.',
                cliSnippet: `conf t\nrouter bgp 65000\n neighbor 203.0.113.2 remote-as 65100\n neighbor 203.0.113.2 route-map SET-PREF in\nroute-map SET-PREF permit 10\n set local-preference 200\nexit\nshow ip bgp summary`
            },
            {
                id: 'ccnp_03',
                title: 'Multi-Area OSPF LSAs, Totally Stubby & NSSA (Type 7 LSA)',
                concept: 'Penghematan database routing table. Tipe LSA 1 (Router), 2 (Network), 3 (Summary), 4 (ASBR Summary), 5 (External). Area Totally Stubby memblokir LSA 3, 4, 5 dan hanya menerima default route. NSSA mengizinkan injeksi external via LSA Type 7 yang dikonversi ke Type 5 di ABR.',
                cliSnippet: `conf t\nrouter ospf 1\n area 10 stub no-summary\n area 20 nssa\nshow ip ospf database summary\nshow ip ospf database nssa-external`
            },
            {
                id: 'ccnp_04',
                title: 'Route Redistribution, Route-Maps & Tagging Anti-Looping',
                concept: 'Mendistribusikan rute antar protokol perutean berbeda (misal OSPF ke BGP). Penggunaan route-tagging dengan route-map wajib diterapkan untuk mencegah rute berputar kembali (mutual redistribution routing loop).',
                cliSnippet: `conf t\nroute-map OSPF-TO-BGP permit 10\n match ip address prefix-list PL-CORP\n set tag 999\nrouter bgp 65000\n redistribute ospf 1 route-map OSPF-TO-BGP`
            },
            {
                id: 'ccnp_05',
                title: 'Network Assurance, IP SLA Proaktif & Streaming Telemetry',
                concept: 'Pengukuran performa link jitter, latency, dan packet loss dengan IP SLA probe. Streaming telemetry model-driven menggantikan polling SNMP berkala dengan pengiriman metrik terus-menerus ke collector.',
                cliSnippet: `conf t\nip sla 10\n icmp-echo 8.8.8.8 source-interface gig0/0/0\n frequency 10\nip sla schedule 10 life forever start-time now\ntrack 1 ip sla 10 reachability\nshow ip sla summary`
            }
        ]
    },

    // --- CYBER SECURITY & DEFENSE TRACK ---
    {
        id: 'mod_cybersec',
        category: 'security',
        vendor: 'Google & Cisco Security',
        code: 'SECURITY-01',
        badge: 'Cyber & Network Defense',
        level: 'Menengah',
        title: 'Cyber Security & Network Defense: Forensik Paket, VPN & SIEM',
        desc: 'Kurikulum gabungan Google Cyber Security Professional Certificate & Cisco Network Security: CIA Triad, Zero Trust Architecture, Analisis Forensik Paket Wireshark mendalam, Site-to-Site IPsec VPN (IKEv2), dan Triage Log Insiden Keamanan SIEM.',
        labTool: 'Wireshark, Kali Linux / Security Onion VM, Splunk Free',
        subtopics: [
            {
                id: 'sec_01',
                title: 'Prinsip Keamanan Jaringan: CIA Triad & Zero Trust Model',
                concept: 'Confidentiality (Enkripsi data bergerak & diam), Integrity (Verifikasi hash kriptografis SHA-256), Availability (Toleransi kegagalan dan redundansi). Model Zero Trust: verifikasi identitas secara eksplisit, batasi hak akses paling minim (Least Privilege).',
                cliSnippet: `openssl dgst -sha256 firmware-upgrade.bin\nssh-keygen -t ed25519 -C "arkin-network-noc"\ngpg --verify signature.asc document.pdf`
            },
            {
                id: 'sec_02',
                title: 'Wireshark Deep-Dive: Analisis Flag TCP, Handshake & Anomali',
                concept: 'Membedah frame jaringan: Analisis 3-Way Handshake TCP normal (SYN -> SYN-ACK -> ACK) vs serangan SYN Flood. Deteksi TCP RST tak terduga, retransmisi paket berulang karena packet loss, dan pola DNS tunneling.',
                cliSnippet: `# Wireshark Display Filter Cheatsheet:\ntcp.flags.syn == 1 && tcp.flags.ack == 0\ntcp.analysis.retransmission\narp.duplicate-address-detected\ndns.flags.response == 1 && dns.count.answers > 10\nhttp.request.method == "POST"`
            },
            {
                id: 'sec_03',
                title: 'Site-to-Site IPsec VPN Architecture (IKEv1 & IKEv2)',
                concept: 'Enkripsi terowongan antar kantor pusat dan cabang. Phase 1 (IKE SA: autentikasi identitas, negosiasi cipher AES-GCM-256 dan grup Diffie-Hellman), Phase 2 (IPsec SA: enkripsi payload traffic dengan protokol ESP tunnel mode).',
                cliSnippet: `conf t\ncrypto ikev2 proposal IKE2-PROPOSAL\n encryption aes-gcm-256\n prf sha256\n group 19\ncrypto ikev2 policy IKE2-POLICY\n proposal IKE2-PROPOSAL\nshow crypto ikev2 sa\nshow crypto ipsec sa`
            },
            {
                id: 'sec_04',
                title: 'Triage Log Insiden SIEM & Penanganan Insiden Keamanan',
                concept: 'Siklus Incident Response standar NIST SP 800-61: Persiapan -> Deteksi & Analisis -> Penahanan (Containment) -> Pemulihan -> Evaluasi Pasca-Insiden. Menjalankan query korelasi log di SIEM untuk mengisolasi IP penyerang.',
                cliSnippet: `# Splunk SPL Query Contoh:\nindex=firewall action=blocked src_ip="192.168.*"\n| stats count by dest_port, src_ip\n| sort -count`
            }
        ]
    },

    // --- FIBER OPTIC FTTH TRACK ---
    {
        id: 'mod_fiber',
        category: 'fiber',
        vendor: 'BNSP & Telkom FTTH',
        code: 'FIBER-01',
        badge: 'TIFO Madya (Fiber Optic)',
        level: 'Menengah - Standar Industri',
        title: 'Fiber Optic FTTH & TIFO Madya: Splicing, OPM & Trace OTDR',
        desc: 'Kurikulum standar kompetensi nasional BNSP TIFO Madya & operasional Telkom Indonesia: Fisika transmisi cahaya Single Mode G.652D, arsitektur Optical Distribution Network GPON (OLT, ODC, ODP, Roset, ONT), SOP Fusion Splicing presisi, Power Budgeting OPM, dan Analisis Jejak OTDR.',
        labTool: 'Fusion Splicer Fujikura/Ilsintech, Fiber Cleaver 90°, OPM, VFL Red Laser, OTDR',
        subtopics: [
            {
                id: 'fiber_01',
                title: 'Fisika Serat Optik, Karakteristik Core & Panjang Gelombang',
                concept: 'Prinsip Total Internal Reflection (Hukum Snellius). Single Mode Fiber (SMF core 9 μm, cladding 125 μm, panjang gelombang 1310/1490/1550 nm) untuk jarak jauh. Multi Mode Fiber (MMF core 50/62.5 μm, 850/1300 nm) untuk data center indoor.',
                cliSnippet: `# Standar Spek Kabel Fiber Telkom:\nCore/Cladding: 9/125 um (G.652D)\nRedaman SMF @ 1310 nm: ~0.35 dB/km\nRedaman SMF @ 1550 nm: ~0.20 dB/km\nTipe: Aerial Drop Core 1-2 core kawat penggantung`
            },
            {
                id: 'fiber_02',
                title: 'Topologi ODN GPON: OLT -> Feeder -> ODC -> Distribusi -> ODP -> ONT',
                concept: 'Struktur distribusi jaringan optik pasif: Dari OLT (di sentral Telkom) melewati kabel feeder, masuk ke ODC (Splitter primer 1:4 / 1:8), lalu kabel distribusi menuju ODP di tiang (Splitter sekunder 1:8 / 1:16), ditarik kabel drop core ke Roset dan modem ONT pelanggan.',
                cliSnippet: `# Standar Loss Pasif Splitter:\nSplitter 1:2  -> Redaman ~3.0 dB\nSplitter 1:4  -> Redaman ~7.0 dB\nSplitter 1:8  -> Redaman ~10.5 dB\nSplitter 1:16 -> Redaman ~14.0 dB\nSplitter 1:32 -> Redaman ~17.5 dB`
            },
            {
                id: 'fiber_03',
                title: 'Standar Operasional Prosedur (SOP) Fusion Splicing',
                concept: 'Prosedur penyambungan kabel optik: 1. Kupas jaket kabel dan buffer dengan Fiber Stripper 3-lubang, 2. Bersihkan core telanjang dengan alkohol 95%+ dan fiber wipe, 3. Potong sudut tegak 90° presisi menggunakan Fiber Cleaver, 4. Letakkan di V-groove Fusion Splicer, 5. Proses busur listrik (arc discharge) dengan estimasi loss <= 0.03 dB, 6. Pasang protection sleeve dan panaskan di heater.',
                cliSnippet: `# Parameter Cek Fusion Splicer:\nCleave Angle: < 1.0 derajat (Wajib)\nSplice Loss: < 0.03 dB (Bagus), > 0.08 dB (Ulangi potong)\nHeater Time: 15-20 detik pada sleeve 60mm`
            },
            {
                id: 'fiber_04',
                title: 'Power Budgeting & Pengukuran Redaman OPM (Optical Power Meter)',
                concept: 'Menghitung total redaman jalur optik: Total Loss = (Panjang kabel x 0.35 dB/km) + (Jumlah sambungan x 0.1 dB) + (Jumlah konektor x 0.5 dB) + Loss Splitter. Standar daya terima RX ONT yang prima menurut Telkom adalah antara -14 dBm hingga -23 dBm. Jika redaman lebih buruk dari -27 dBm, modem mengalami Link Loss (LOS).',
                cliSnippet: `# Nilai Standar Daya Terima OPM di Pelanggan:\n-14 dBm s/d -23 dBm : SANGAT BAIK / STANDAR RESMI TELKOM\n-24 dBm s/d -26 dBm : MARGINAL (Rentan putus saat hujan/panas)\n< -27 dBm           : LOS / REDAMAN TINGGI (Kabel tertekuk / kotor)`
            },
            {
                id: 'fiber_05',
                title: 'Interpretasi Jejak OTDR (Optical Time Domain Reflectometer)',
                concept: 'Membaca grafik pantulan cahaya: 1. Event Dead Zone (jarak buta setelah konektor awal), 2. Event Reflektif (lonjakan puncak vertikal tajam menandakan adanya konektor mekanik atau ujung kabel putus), 3. Event Non-Reflektif (penurunan garis tanpa lonjakan menandakan sambungan fusion splice atau macrobend/tekukan kabel patah).',
                cliSnippet: `# Parameter Setting OTDR:\nPanjang Gelombang: 1310 nm & 1550 nm (Uji tekukan macrobend)\nPulse Width: 10 ns (Jarak dekat < 2km) / 100 ns (Jarak jauh > 10km)\nIndeks Bias (IOR): 1.4677 (G.652D)`
            }
        ]
    },

    // --- LINUX SYSADMIN & FORTINET TRACK ---
    {
        id: 'mod_linux',
        category: 'linux',
        vendor: 'Linux RHCSA & LPIC-1',
        code: 'LINUX-01',
        badge: 'Linux SysAdmin',
        level: 'Dasar - Menengah',
        title: 'Linux System & Network Operations: Systemd, Netplan & Iptables',
        desc: 'Kurikulum standar SysAdmin & Network Operations berbasis Ubuntu / Debian / RHEL: Hak akses permission oktal, kontrol daemon systemd, konfigurasi interface Netplan & nmcli, perangkat diagnostik tcpdump/ss/mtr, dan firewall NAT Masquerade.',
        labTool: 'Ubuntu Server 22.04 LTS / Rocky Linux VM di VirtualBox / VPS aaPanel',
        subtopics: [
            {
                id: 'linux_01',
                title: 'Linux CLI, Hak Akses File (chmod/chown) & Systemd Services',
                concept: 'Operasional shell Bash, kepemilikan file (chown user:group), izin akses (chmod 755 / 600), dan kontrol layanan jaringan Linux dengan systemctl serta inspeksi log real-time journalctl.',
                cliSnippet: `sudo chown -R arkin:arkin /var/log/network/\nsudo chmod 600 ~/.ssh/authorized_keys\nsudo systemctl restart systemd-resolved\nsudo systemctl enable --now isc-dhcp-server\nsudo journalctl -u isc-dhcp-server -f`
            },
            {
                id: 'linux_02',
                title: 'Konfigurasi Jaringan Linux Modern: Netplan, ip & nmcli',
                concept: 'Manajemen interface jaringan Linux modern. Perintah `ip addr` dan `ip route`, konfigurasi static IP dan DNS resolver melalui file deklaratif Netplan YAML (/etc/netplan/01-netcfg.yaml).',
                cliSnippet: `ip -br a\nip route show\nsudo ip addr add 192.168.1.10/24 dev eth0\nsudo ip route add default via 192.168.1.1\nsudo netplan apply`
            },
            {
                id: 'linux_03',
                title: 'Diagnostik Jaringan Mendalam: tcpdump, ss, mtr & iperf3',
                concept: 'Toolkit troubleshooting insiden jaringan di server. Mengendus paket data langsung di terminal dengan tcpdump, memeriksa port TCP/UDP yang sedang listening dengan `ss -tulnp`, uji throughput bandwidth dengan iperf3, dan trace rute hop-by-hop dengan mtr.',
                cliSnippet: `sudo tcpdump -i eth0 -nn -c 50 'port 80 or port 443'\nsudo ss -tulnp | grep -E ':(80|443|22)'\nmtr --report --report-cycles=10 8.8.8.8\niperf3 -c 10.10.10.1 -t 10 -P 4`
            },
            {
                id: 'linux_04',
                title: 'Linux Firewall & Gateway: Iptables NAT Masquerade & UFW',
                concept: 'Mengaktifkan Linux IP forwarding (sysctl net.ipv4.ip_forward=1) agar server berfungsi sebagai router internet, aturan MASQUERADE nat iptables, dan manajemen firewall lokal UFW.',
                cliSnippet: `echo 1 | sudo tee /proc/sys/net/ipv4/ip_forward\nsudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE\nsudo iptables -A FORWARD -i eth1 -o eth0 -j ACCEPT\nsudo ufw default deny incoming\nsudo ufw allow OpenSSH\nsudo ufw enable`
            }
        ]
    },
    {
        id: 'mod_fortinet',
        category: 'linux',
        vendor: 'Fortinet FortiOS',
        code: 'FORTINET-01',
        badge: 'Fortinet NSE 4',
        level: 'Menengah - Enterprise',
        title: 'Fortinet FortiOS: Next-Gen Firewall Policy, VIP & Security Profiles',
        desc: 'Kurikulum Network Security Professional: Konsep Virtual Domains (VDOMs), Firewall Policy (Src/Dst Interface, Address Objects, Services, Action Accept/Deny), Virtual IP (VIP) Port Forwarding, Security Profiles (Antivirus, Web Filtering, IPS), dan SSL-VPN Remote Access.',
        labTool: 'FortiGate VM 7.x di EVE-NG / VMware Workstation',
        subtopics: [
            {
                id: 'forti_01',
                title: 'Konfigurasi Interface, Virtual IP (VIP) & Firewall Policy',
                concept: 'Arsitektur Next-Gen Firewall FortiGate. Setiap traffic antar interface (LAN port2 ke WAN port1) wajib melewati Firewall Policy eksplisit dengan opsi NAT Masquerade atau Virtual IP (VIP) untuk server publik.',
                cliSnippet: `config firewall policy\n    edit 1\n        set name "LAN_to_Internet"\n        set srcintf "port2"\n        set dstintf "port1"\n        set srcaddr "all"\n        set dstaddr "all"\n        set action accept\n        set schedule "always"\n        set service "ALL"\n        set nat enable\n    next\nend`
            },
            {
                id: 'forti_02',
                title: 'Security Profiles: Antivirus, Web Filter & IPS Inspection',
                concept: 'Inspeksi keamanan tingkat lanjut layer 7. Mengaktifkan profil inspeksi berbasis Flow atau Proxy untuk memblokir malware, kategori website berbahaya, dan pola exploitasi serangan zero-day.',
                cliSnippet: `config firewall policy\n    edit 1\n        set utm-status enable\n        set ssl-ssh-profile "certificate-inspection"\n        set av-profile "default"\n        set webfilter-profile "default"\n        set ips-sensor "default"\n    next\nend`
            }
        ]
    }
];

// Side-by-Side CLI Comparison Data (Cisco IOS vs MikroTik RouterOS)
const CLI_COMPARISON_DATA = [
    {
        task: '1. Konfigurasi IP Address & Deskripsi Interface',
        note: 'Menetapkan IP statik pada port ethernet LAN dan menyalakan interface.',
        cisco: `configure terminal\ninterface gigabitEthernet 0/1\n description LAN-Corporate-Office\n ip address 192.168.10.1 255.255.255.0\n no shutdown\nexit`,
        mikrotik: `/ip address add address=192.168.10.1/24 interface=ether2 comment="LAN-Corporate-Office"\n/interface ethernet enable ether2\n/ip address print`
    },
    {
        task: '2. Default Route & Static Route Failover',
        note: 'Menambahkan rute utama ke ISP (Distance 1) dan rute cadangan (Distance 2).',
        cisco: `configure terminal\nip route 0.0.0.0 0.0.0.0 203.0.113.1 name Primary_Fiber\nip route 0.0.0.0 0.0.0.0 198.51.100.1 150 name Backup_LTE\nshow ip route static`,
        mikrotik: `/ip route add dst-address=0.0.0.0/0 gateway=203.0.113.1 check-gateway=ping distance=1 comment="Primary_Fiber"\n/ip route add dst-address=0.0.0.0/0 gateway=198.51.100.1 distance=2 comment="Backup_LTE"\n/ip route print`
    },
    {
        task: '3. Pembuatan VLAN & 802.1Q Trunking',
        note: 'Membuat VLAN 10 dan mengatur port switch sebagai trunk yang membawa tagged packet.',
        cisco: `configure terminal\nvlan 10\n name Staff-Office\nexit\ninterface gigabitEthernet 0/24\n switchport mode trunk\n switchport trunk allowed vlan 10,20,99\nexit`,
        mikrotik: `/interface vlan add name=vlan10-staff vlan-id=10 interface=bridge-lan\n# RouterOS v7 Bridge VLAN Filtering:\n/interface bridge vlan add bridge=bridge-lan vlan-ids=10 tagged=bridge-lan,ether1 untagged=ether2\n/interface bridge set bridge-lan vlan-filtering=yes`
    },
    {
        task: '4. Konfigurasi DHCP Server & IP Pool',
        note: 'Menyediakan alokasi IP otomatis, gateway, dan DNS server untuk client LAN.',
        cisco: `configure terminal\nip dhcp excluded-address 192.168.10.1 192.168.10.20\nip dhcp pool LAN-USERS\n network 192.168.10.0 255.255.255.0\n default-router 192.168.10.1\n dns-server 8.8.8.8 1.1.1.1\nexit`,
        mikrotik: `/ip pool add name=dhcp-pool-lan ranges=192.168.10.21-192.168.10.250\n/ip dhcp-server add name=dhcp-lan interface=bridge-lan address-pool=dhcp-pool-lan lease-time=1d disabled=no\n/ip dhcp-server network add address=192.168.10.0/24 gateway=192.168.10.1 dns-server=8.8.8.8,1.1.1.1`
    },
    {
        task: '5. Source NAT (Internet Masquerade Sharing)',
        note: 'Mentranslasikan IP privat lokal ke IP publik ISP agar seluruh client bisa browsing internet.',
        cisco: `configure terminal\naccess-list 1 permit 192.168.10.0 0.0.0.255\ninterface gigabitEthernet 0/0\n ip nat outside\ninterface gigabitEthernet 0/1\n ip nat inside\nip nat inside source list 1 interface gigabitEthernet 0/0 overload\nexit`,
        mikrotik: `/ip firewall nat add chain=srcnat out-interface=ether1-wan action=masquerade comment="NAT Internet Masquerade"`
    },
    {
        task: '6. Destination NAT (Port Forwarding ke Web Server)',
        note: 'Mengarahkan traffic port 80/8080 dari publik WAN ke server internal 192.168.10.50.',
        cisco: `configure terminal\nip nat inside source static tcp 192.168.10.50 80 interface gigabitEthernet 0/0 80\nexit`,
        mikrotik: `/ip firewall nat add chain=dstnat in-interface=ether1-wan protocol=tcp dst-port=8080 action=dst-nat to-addresses=192.168.10.50 to-ports=80 comment="Web Server Port Forward"`
    },
    {
        task: '7. Dynamic Routing OSPF Single Area (Area 0)',
        note: 'Menjalankan OSPFv2 dengan Router-ID, mendistribusikan subnet LAN, dan pasif interface.',
        cisco: `configure terminal\nrouter ospf 1\n router-id 1.1.1.1\n network 192.168.10.0 0.0.0.255 area 0\n network 10.0.0.0 0.0.0.3 area 0\n passive-interface gigabitEthernet 0/1\nexit`,
        mikrotik: `/routing ospf instance add name=ospf-core router-id=1.1.1.1\n/routing ospf area add name=backbone instance=ospf-core area-id=0.0.0.0\n/routing ospf interface-template add area=backbone networks=192.168.10.0/24 passive=yes\n/routing ospf interface-template add area=backbone networks=10.0.0.0/30 type=ptp`
    },
    {
        task: '8. Perintah Verifikasi & Diagnostik Harian',
        note: 'Perintah esensial untuk memeriksa interface, rute, tetangga OSPF, dan uji konektivitas.',
        cisco: `show ip interface brief\nshow ip route\nshow ip ospf neighbor\nshow mac address-table\nping 8.8.8.8 source gigabitEthernet 0/1\ntraceroute 8.8.8.8`,
        mikrotik: `/ip address print\n/ip route print\n/routing ospf neighbor print\n/interface bridge host print\n/ping 8.8.8.8 src-address=192.168.10.1 count=4\n/tool traceroute 8.8.8.8`
    }
];

// State & Persistence for Learning Academy
const academyFilterState = {
    category: 'all',
    search: ''
};

const DEFAULT_ACADEMY_COMPLETED = [
    // Pre-completed based on user verified certificates (CCNA, DevNet, Cisco NetSec, Google CyberSec, TIFO Madya, Mikrotik Aguna)
    'mtcna_01', 'mtcna_02', 'mtcna_03', 'mtcna_04', 'mtcna_05', 'mtcna_06', 'mtcna_07', 'mtcna_08',
    'ccna1_01', 'ccna1_02', 'ccna1_03', 'ccna1_04',
    'ccna2_01', 'ccna2_02', 'ccna2_03', 'ccna2_04', 'ccna2_05',
    'ccna3_01', 'ccna3_02', 'ccna3_03', 'ccna3_04',
    'ccna4_01', 'ccna4_02', 'ccna4_03', 'ccna4_04', 'ccna4_05',
    'devnet_01', 'devnet_02', 'devnet_03', 'devnet_04', 'devnet_05',
    'sec_01', 'sec_02', 'sec_03', 'sec_04',
    'fiber_01', 'fiber_02', 'fiber_03', 'fiber_04', 'fiber_05'
];

function getAcademyCompletedSubtopics() {
    try {
        const raw = localStorage.getItem('aamon_academy_completed_subtopics');
        if (raw) return JSON.parse(raw);
    } catch (e) {}
    return [...DEFAULT_ACADEMY_COMPLETED];
}

function saveAcademyCompletedSubtopics(subtopics) {
    try {
        localStorage.setItem('aamon_academy_completed_subtopics', JSON.stringify(subtopics));
    } catch (e) {}
}

function toggleAcademySubtopic(subtopicId) {
    const list = getAcademyCompletedSubtopics();
    const idx = list.indexOf(subtopicId);
    let isNowDone = false;
    if (idx >= 0) {
        list.splice(idx, 1);
        isNowDone = false;
    } else {
        list.push(subtopicId);
        isNowDone = true;
    }
    saveAcademyCompletedSubtopics(list);
    renderLearningAcademy();
    showToastNotification('Progres Disimpan', isNowDone ? 'Topik materi ditandai telah dipelajari.' : 'Topik materi dikembalikan ke status belum selesai.');
}

function filterAcademyCategory(cat) {
    academyFilterState.category = cat;
    renderLearningAcademy();
}

function handleAcademySearch(val) {
    academyFilterState.search = (val || '').trim().toLowerCase();
    renderLearningAcademy();
}

function copyAcademyCliSnippet(moduleId, subtopicId) {
    const mod = ACADEMY_MODULES.find(m => m.id === moduleId);
    if (!mod) return;
    const sub = mod.subtopics.find(s => s.id === subtopicId);
    if (!sub || !sub.cliSnippet) return;
    copyTextToClipboard(sub.cliSnippet, `CLI untuk "${sub.title}" berhasil disalin!`);
}

function copyCliComparisonSnippet(idx, vendor) {
    const item = CLI_COMPARISON_DATA[idx];
    if (!item) return;
    const text = vendor === 'cisco' ? item.cisco : item.mikrotik;
    copyTextToClipboard(text, `Sintaks ${vendor.toUpperCase()} disalin!`);
}

function openCliCheatSheetModal() {
    const modal = document.getElementById('cliCheatSheetModal');
    const container = document.getElementById('cliCheatSheetBody');
    if (!modal || !container) return;

    container.innerHTML = CLI_COMPARISON_DATA.map((item, idx) => `
        <div class="p-5 rounded-xl bg-stone-900/60 border border-stone-800 space-y-3">
            <div class="flex items-center justify-between flex-wrap gap-2">
                <div>
                    <h4 class="text-sm font-bold text-white">${item.task}</h4>
                    <p class="text-xs text-stone-400 mt-0.5">${item.note}</p>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-1">
                <!-- Cisco Column -->
                <div class="p-4 rounded-lg bg-stone-950 border border-stone-800 space-y-2 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between text-xs font-mono pb-2 border-b border-stone-800">
                            <span class="text-sky-400 font-bold flex items-center gap-1.5">
                                <i class="fa-solid fa-terminal text-[10px]"></i>
                                <span>Cisco IOS CLI</span>
                            </span>
                            <span class="text-stone-500 text-[10px]">IOS-XE / Catalyst</span>
                        </div>
                        <pre class="font-mono text-xs text-stone-200 mt-2 whitespace-pre-wrap leading-relaxed select-all overflow-x-auto">${item.cisco}</pre>
                    </div>
                    <div class="pt-2 text-right">
                        <button type="button" onclick="copyCliComparisonSnippet(${idx}, 'cisco')" class="text-[11px] font-mono text-stone-400 hover:text-white bg-stone-900 hover:bg-stone-800 border border-stone-800 px-2.5 py-1 rounded transition flex items-center gap-1 ml-auto">
                            <i class="fa-regular fa-copy text-[10px]"></i>
                            <span>Salin Cisco</span>
                        </button>
                    </div>
                </div>

                <!-- MikroTik Column -->
                <div class="p-4 rounded-lg bg-stone-950 border border-stone-800 space-y-2 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between text-xs font-mono pb-2 border-b border-stone-800">
                            <span class="text-emerald-400 font-bold flex items-center gap-1.5">
                                <i class="fa-solid fa-microchip text-[10px]"></i>
                                <span>MikroTik RouterOS CLI</span>
                            </span>
                            <span class="text-stone-500 text-[10px]">RouterOS v7</span>
                        </div>
                        <pre class="font-mono text-xs text-stone-200 mt-2 whitespace-pre-wrap leading-relaxed select-all overflow-x-auto">${item.mikrotik}</pre>
                    </div>
                    <div class="pt-2 text-right">
                        <button type="button" onclick="copyCliComparisonSnippet(${idx}, 'mikrotik')" class="text-[11px] font-mono text-stone-400 hover:text-white bg-stone-900 hover:bg-stone-800 border border-stone-800 px-2.5 py-1 rounded transition flex items-center gap-1 ml-auto">
                            <i class="fa-regular fa-copy text-[10px]"></i>
                            <span>Salin MikroTik</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeCliCheatSheetModal() {
    const modal = document.getElementById('cliCheatSheetModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

// Render Main Learning Academy View
function renderLearningAcademy() {
    const gridContainer = document.getElementById('academyModulesGrid');
    if (!gridContainer) return;

    const completedSubtopics = getAcademyCompletedSubtopics();

    // Unified Global Progress Bar Update (Single Source of Truth)
    updateGlobalLearningProgress();

    // Update Category Filter Buttons
    document.querySelectorAll('.academy-cat-btn').forEach(btn => {
        if (btn.dataset.category === academyFilterState.category) {
            btn.className = 'academy-cat-btn active px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-stone-950 transition shadow-sm';
        } else {
            btn.className = 'academy-cat-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-900 text-stone-400 hover:text-white hover:bg-stone-800 transition';
        }
    });

    // Filter Modules
    const currentCategory = academyFilterState.category;
    const searchQuery = academyFilterState.search;

    const filteredModules = ACADEMY_MODULES.filter(mod => {
        // Category check
        if (currentCategory !== 'all' && mod.category !== currentCategory) return false;

        // Search query check
        if (searchQuery) {
            const matchesMod = mod.title.toLowerCase().includes(searchQuery) ||
                               mod.desc.toLowerCase().includes(searchQuery) ||
                               mod.vendor.toLowerCase().includes(searchQuery) ||
                               mod.badge.toLowerCase().includes(searchQuery);

            const matchesSub = mod.subtopics.some(s =>
                s.title.toLowerCase().includes(searchQuery) ||
                s.concept.toLowerCase().includes(searchQuery) ||
                (s.cliSnippet && s.cliSnippet.toLowerCase().includes(searchQuery))
            );

            if (!matchesMod && !matchesSub) return false;
        }

        return true;
    });

    if (filteredModules.length === 0) {
        gridContainer.innerHTML = `
            <div class="clean-card p-12 text-center space-y-3">
                <i class="fa-solid fa-magnifying-glass text-stone-600 text-3xl"></i>
                <h4 class="text-base font-bold text-white">Tidak ada materi yang sesuai pencarian</h4>
                <p class="text-xs text-stone-400 max-w-md mx-auto">Coba gunakan kata kunci lain (misal: "OSPF", "BGP", "VLAN", "OTDR", "NAT", "iptables") atau klik tab kategori "Semua".</p>
                <button type="button" onclick="filterAcademyCategory('all'); document.getElementById('academySearchInput').value='';" class="mt-2 py-2 px-4 rounded bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold transition">
                    Reset Filter Pencarian
                </button>
            </div>
        `;
        return;
    }

    const simMapping = {
        mod_mtcna: { tab: 'winbox-v7', label: 'Buka Pratinjau GUI Winbox v7', icon: 'fa-window-maximize text-blue-400' },
        mod_mtcre: { tab: 'gns3-diamond', label: 'Buka Topologi GNS3 Diamond OSPF', icon: 'fa-circle-nodes text-emerald-400' },
        mod_mtcine: { tab: 'gns3-userman', label: 'Buka Topologi Core Campus MUM', icon: 'fa-sitemap text-amber-400' },
        mod_mtctce: { tab: 'winbox-v7', label: 'Buka Pratinjau Winbox v7 GUI', icon: 'fa-window-maximize text-blue-400' },
        mod_ccna_1: { tab: 'cisco-lan', label: 'Buka Skema Subnetting & Cisco LAN', icon: 'fa-network-wired text-sky-400' },
        mod_ccna_2: { tab: 'cisco-lan', label: 'Buka Topologi Cisco 3-Tier & VLAN', icon: 'fa-network-wired text-sky-400' },
        mod_ccna_3: { tab: 'gns3-diamond', label: 'Buka Topologi Lab OSPF Ring', icon: 'fa-circle-nodes text-emerald-400' },
        mod_ccna_4: { tab: 'cisco-lan', label: 'Buka Topologi Cisco Services LAN', icon: 'fa-network-wired text-sky-400' },
        mod_devnet: { tab: 'gns3-diamond', label: 'Buka Topologi Otomasi Multi-Device', icon: 'fa-circle-nodes text-emerald-400' },
        mod_ccnp_encor: { tab: 'gns3-diamond', label: 'Buka Topologi Lab Enterprise OSPF/BGP', icon: 'fa-circle-nodes text-emerald-400' },
        mod_cybersec: { tab: 'wireshark', label: 'Buka Simulasi Wireshark Packet', icon: 'fa-magnifying-glass-chart text-purple-400' },
        mod_fiber: { tab: 'ftth-gpon', label: 'Buka Skema ODN FTTH & Kalkulator dBm', icon: 'fa-plug text-red-400' },
        mod_linux: { tab: 'cisco-lan', label: 'Buka Skema Jaringan Server Linux', icon: 'fa-server text-stone-300' },
        mod_fortinet: { tab: 'cisco-lan', label: 'Buka Skema Firewall Gateway', icon: 'fa-shield-halved text-amber-400' }
    };

    gridContainer.innerHTML = filteredModules.map(mod => {
        const modTotal = mod.subtopics.length;
        const modDone = mod.subtopics.filter(s => completedSubtopics.includes(s.id)).length;
        const modPct = Math.round((modDone / modTotal) * 100);
        const simBtn = simMapping[mod.id];

        // Highlight matching subtopics if searching
        const subtopicsToDisplay = mod.subtopics.filter(s => {
            if (!searchQuery) return true;
            return s.title.toLowerCase().includes(searchQuery) ||
                   s.concept.toLowerCase().includes(searchQuery) ||
                   (s.cliSnippet && s.cliSnippet.toLowerCase().includes(searchQuery)) ||
                   mod.title.toLowerCase().includes(searchQuery);
        });

        return `
            <div class="clean-card p-6 sm:p-7 space-y-5 transition border border-stoneBorder hover:border-stone-700">
                <!-- Module Header -->
                <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-stone-800 pb-4">
                    <div class="space-y-1.5 flex-1">
                        <div class="flex items-center gap-2 flex-wrap">
                            <span class="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-amber-400">
                                [${mod.code}]
                            </span>
                            <span class="font-mono text-[11px] font-semibold px-2 py-0.5 rounded bg-stone-900 text-stone-300 border border-stone-800">
                                ${mod.vendor}
                            </span>
                            <span class="font-mono text-[10px] uppercase px-2 py-0.5 rounded ${mod.level.includes('Lanjutan') ? 'bg-purple-950/40 text-purple-300 border border-purple-800/40' : mod.level.includes('Menengah') ? 'bg-blue-950/40 text-blue-300 border border-blue-800/40' : 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/40'}">
                                ${mod.level}
                            </span>
                            <span class="font-mono text-[11px] font-semibold text-stone-400 ml-auto sm:ml-0">
                                ${mod.badge}
                            </span>
                        </div>

                        <h3 class="text-lg sm:text-xl font-bold text-white pt-1">${mod.title}</h3>
                        <p class="text-xs text-stone-300 leading-relaxed">${mod.desc}</p>

                        <div class="flex items-center gap-2 pt-1 text-[11px] text-stone-400 font-mono">
                            <i class="fa-solid fa-microchip text-amber-500"></i>
                            <span>${mod.labTool}</span>
                        </div>

                        <!-- Banner Golden Reference jika MTCNA -->
                        ${mod.id === 'mod_mtcna' ? `
                            <div class="p-3 rounded-lg bg-gradient-to-r from-amber-400/15 via-amber-400/5 to-transparent border border-amber-500/40 flex items-center justify-between flex-wrap gap-3">
                                <div class="space-y-0.5">
                                    <div class="text-xs font-bold text-amber-300 flex items-center gap-1.5 font-mono">
                                        <i class="fa-solid fa-star text-amber-400"></i>
                                        <span>STUDIO BELAJAR BAKU: MATERI 1 TELAH AKTIF</span>
                                    </div>
                                    <p class="text-[11px] text-stone-300">
                                        Routing: Static & Default Route (MikroTik v7.14+) dengan Topologi SVG Interaktif, Stepper CLI, Detail Parameter, Troubleshooting & Latihan Mandiri.
                                    </p>
                                </div>
                                <button type="button" onclick="selectStudioMateri('mikrotik-01-routing'); document.getElementById('courseStudioApp').scrollIntoView({ behavior: 'smooth' });" class="py-1.5 px-3.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs transition flex items-center gap-2 shadow-sm shrink-0">
                                    <i class="fa-solid fa-play"></i>
                                    <span>Buka Materi 1 di Studio</span>
                                    <i class="fa-solid fa-arrow-up text-[10px]"></i>
                                </button>
                            </div>
                        ` : ''}

                        <div class="flex flex-wrap items-center gap-2 pt-2">
                            ${mod.id === 'mod_mtcna' ? `
                                <button type="button" onclick="selectStudioMateri('mikrotik-01-routing'); document.getElementById('courseStudioApp').scrollIntoView({ behavior: 'smooth' });" class="inline-flex items-center gap-1.5 py-1 px-3 rounded-md bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-mono font-bold transition shadow-sm">
                                    <i class="fa-solid fa-play"></i>
                                    <span>Buka di Studio Interaktif</span>
                                    <i class="fa-solid fa-arrow-up text-[9px]"></i>
                                </button>
                            ` : (simBtn ? `
                                <button type="button" onclick="document.getElementById('courseStudioApp').scrollIntoView({ behavior: 'smooth' });" class="inline-flex items-center gap-1.5 py-1 px-3 rounded-md bg-stone-900 hover:bg-stone-800 text-stone-200 text-xs font-mono border border-stone-800 hover:border-stone-700 transition shadow-sm">
                                    <i class="fa-solid ${simBtn.icon}"></i>
                                    <span>${simBtn.label}</span>
                                    <i class="fa-solid fa-arrow-up text-[9px] text-stone-400"></i>
                                </button>
                            ` : '')}
                            ${mod.ebookUrl ? `
                                <a href="${encodeURI(mod.ebookUrl)}" target="_blank" class="inline-flex items-center gap-1.5 py-1 px-3 rounded-md bg-stone-900 hover:bg-stone-800 text-stone-200 text-xs font-mono border border-stone-800 hover:border-stone-700 transition shadow-sm">
                                    <i class="fa-solid fa-file-pdf text-rose-400"></i>
                                    <span>${mod.ebookLabel || 'Buka Modul PDF'}</span>
                                    <i class="fa-solid fa-arrow-up-right-from-square text-[9px] text-stone-400"></i>
                                </a>
                            ` : ''}
                        </div>
                    </div>

                    <!-- Module Completion Badge & Mini Bar -->
                    <div class="sm:text-right shrink-0 min-w-[140px] p-3 rounded-lg bg-stone-900/60 border border-stone-800">
                        <div class="flex sm:justify-end items-center gap-1.5">
                            <span class="text-xs font-mono font-bold ${modDone === modTotal ? 'text-emerald-400' : 'text-stone-300'}">
                                ${modDone}/${modTotal} Selesai
                            </span>
                            <span class="text-[11px] font-mono text-stone-500">(${modPct}%)</span>
                        </div>
                        <div class="w-full bg-stone-950 rounded-full h-1.5 mt-2 overflow-hidden border border-stone-800">
                            <div class="${modDone === modTotal ? 'bg-emerald-400' : 'bg-amber-400'} h-full rounded-full transition-all duration-300" style="width: ${modPct}%"></div>
                        </div>
                    </div>
                </div>

                <!-- Subtopics Detailed Accordion / Checklist -->
                <div class="space-y-3 pt-1">
                    <div class="text-xs font-mono uppercase text-stone-400 font-bold flex items-center justify-between">
                        <span>Daftar Topik & Praktik Hands-On (${subtopicsToDisplay.length} Topik):</span>
                        <span class="text-[10px] text-stone-500 lowercase">centang jika materi sudah dipahami / dilatih</span>
                    </div>

                    <div class="space-y-3">
                        ${subtopicsToDisplay.map(sub => {
                            const isDone = completedSubtopics.includes(sub.id);
                            return `
                                <div class="p-4 rounded-xl border ${isDone ? 'border-emerald-500/30 bg-emerald-950/10' : 'border-stone-800 bg-stone-900/40'} transition space-y-2.5">
                                    <div class="flex items-start gap-3">
                                        <input type="checkbox" ${isDone ? 'checked' : ''} onchange="toggleAcademySubtopic('${sub.id}')" class="mt-1 w-4 h-4 rounded border-stone-700 bg-stone-900 text-emerald-400 focus:ring-0 cursor-pointer shrink-0">
                                        <div class="flex-1 min-w-0">
                                            <div class="flex items-center justify-between gap-2 flex-wrap">
                                                <h4 class="text-xs font-bold ${isDone ? 'text-emerald-200' : 'text-white'}">
                                                    ${sub.title}
                                                </h4>
                                                <span class="text-[10px] font-mono px-2 py-0.5 rounded ${isDone ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/40' : 'bg-stone-800 text-stone-400 border border-stone-700'}">
                                                    ${isDone ? 'Sudah Dipahami' : 'Perlu Dipelajari'}
                                                </span>
                                            </div>

                                            <p class="text-xs text-stone-400 mt-1.5 leading-relaxed">
                                                ${sub.concept}
                                            </p>

                                            ${sub.cliSnippet ? `
                                                <div class="mt-3 rounded-lg bg-stone-950 border border-stone-800/90 p-3 relative group">
                                                    <div class="flex items-center justify-between pb-1.5 mb-1.5 border-b border-stone-900 text-[10px] font-mono text-stone-500">
                                                        <span class="text-amber-400/90 flex items-center gap-1 font-semibold">
                                                            <i class="fa-solid fa-terminal text-[9px]"></i>
                                                            <span>CLI Command / Script Snippet</span>
                                                        </span>
                                                        <button type="button" onclick="copyAcademyCliSnippet('${mod.id}', '${sub.id}')" class="text-stone-400 hover:text-white bg-stone-900 hover:bg-stone-800 px-2 py-0.5 rounded border border-stone-800 transition flex items-center gap-1">
                                                            <i class="fa-regular fa-copy text-[9px]"></i>
                                                            <span>Salin CLI</span>
                                                        </button>
                                                    </div>
                                                    <pre class="font-mono text-xs text-stone-300 whitespace-pre-wrap leading-relaxed select-all overflow-x-auto">${sub.cliSnippet}</pre>
                                                </div>
                                            ` : ''}

                                            ${(sub.id === 'mtcna_05' || sub.title.includes('Routing Statik')) ? `
                                                <div class="mt-2.5 p-2.5 rounded-lg bg-amber-400/10 border border-amber-500/30 flex items-center justify-between flex-wrap gap-2">
                                                    <div class="flex items-center gap-2 text-xs text-amber-200">
                                                        <i class="fa-solid fa-graduation-cap text-amber-400"></i>
                                                        <span>Materi ini telah tersedia lengkap dalam <strong>Format Studio Standar Baku (8 Section)</strong></span>
                                                    </div>
                                                    <button type="button" onclick="selectStudioMateri('mikrotik-01-routing'); document.getElementById('courseStudioApp').scrollIntoView({ behavior: 'smooth' });" class="py-1 px-3 rounded bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs transition flex items-center gap-1.5 shadow-sm">
                                                        <i class="fa-solid fa-play text-stone-950"></i>
                                                        <span>Buka di Studio Interaktif</span>
                                                        <i class="fa-solid fa-arrow-up text-[9px]"></i>
                                                    </button>
                                                </div>
                                            ` : ''}
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;
    }).join('');

    renderCoursePlayer();
}


// ===================================================================
// 9. STUDIO SIMULATOR & VISUALISASI TOPOLOGI PERANGKAT LAB
// ===================================================================

let activeSimulatorTab = 'gns3-diamond';

function selectSimulatorTab(tabKey) {
    activeSimulatorTab = tabKey;

    document.querySelectorAll('.sim-tab-btn').forEach(btn => {
        if (btn.dataset.sim === tabKey) {
            btn.className = 'sim-tab-btn active py-2 px-3.5 rounded-lg text-xs font-bold bg-white text-stone-950 transition shadow-sm flex items-center gap-2';
        } else {
            btn.className = 'sim-tab-btn py-2 px-3.5 rounded-lg text-xs font-bold bg-stone-900 text-stone-400 hover:text-white hover:bg-stone-800 transition flex items-center gap-2';
        }
    });

    renderCoursePlayer();
}

function openImageModal(src, title) {
    const modal = document.getElementById('imageZoomModal');
    const img = document.getElementById('imageZoomSrc');
    const titleEl = document.getElementById('imageZoomTitle');
    const openBtn = document.getElementById('imageZoomOpenBtn');

    if (!modal || !img) return;

    img.src = src;
    if (titleEl) titleEl.textContent = title || 'Pratinjau Diagram Topologi';
    if (openBtn) openBtn.href = src;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeImageModal() {
    const modal = document.getElementById('imageZoomModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

// Live Optical Power Budget Calculator for FTTH
function calculateFtthLoss() {
    const feederKm = parseFloat(document.getElementById('calcFeederKm')?.value || 5);
    const distKm = parseFloat(document.getElementById('calcDistKm')?.value || 1.5);
    const dropM = parseFloat(document.getElementById('calcDropM')?.value || 150);
    const odcRatio = document.getElementById('calcOdcRatio')?.value || '1:4';
    const odpRatio = document.getElementById('calcOdpRatio')?.value || '1:8';

    const txPower = 3.0; // dBm at OLT SFP B+
    const fiberLossPerKm = 0.35; // dB/km @ 1310/1490nm
    const spliceLoss = 0.1 * 4; // 4 fusion splices
    const connectorLoss = 0.5 * 3; // 3 mechanical connectors (ODC, ODP, Roset)

    const splitterLossMap = {
        '1:2': 3.5,
        '1:4': 7.2,
        '1:8': 10.5,
        '1:16': 14.0,
        '1:32': 17.5
    };

    const lossFeeder = feederKm * fiberLossPerKm;
    const lossDist = distKm * fiberLossPerKm;
    const lossDrop = (dropM / 1000) * fiberLossPerKm;
    const lossOdc = splitterLossMap[odcRatio] || 7.2;
    const lossOdp = splitterLossMap[odpRatio] || 10.5;

    const totalLoss = lossFeeder + lossDist + lossDrop + lossOdc + lossOdp + spliceLoss + connectorLoss;
    const rxPower = txPower - totalLoss;

    const resRx = document.getElementById('calcResultRx');
    const resLoss = document.getElementById('calcResultLoss');
    const resStatus = document.getElementById('calcResultStatus');

    if (resRx) resRx.textContent = `${rxPower.toFixed(2)} dBm`;
    if (resLoss) resLoss.textContent = `${totalLoss.toFixed(2)} dB`;

    if (resStatus) {
        if (rxPower >= -23.0 && rxPower <= -14.0) {
            resStatus.className = 'font-mono text-xs font-bold px-2.5 py-1 rounded bg-emerald-950/50 text-emerald-400 border border-emerald-800/50';
            resStatus.textContent = 'STANDAR PRIMA TELKOM (-14 s/d -23 dBm)';
        } else if (rxPower < -23.0 && rxPower >= -27.0) {
            resStatus.className = 'font-mono text-xs font-bold px-2.5 py-1 rounded bg-amber-950/50 text-amber-300 border border-amber-800/50';
            resStatus.textContent = 'MARGINAL (Rentan Putus Saat Hujan)';
        } else {
            resStatus.className = 'font-mono text-xs font-bold px-2.5 py-1 rounded bg-rose-950/50 text-rose-300 border border-rose-800/50';
            resStatus.textContent = 'LOS / REDAMAN TINGGI (> -27 dBm)';
        }
    }
}

// ===================================================================
// 9. STANDARDIZED INTERACTIVE NETWORK LEARNING STUDIO
// Master Template Specification (Sections 0 to 8)
// Single Source of Truth Progress Tracking & JSON Export/Import
// ===================================================================

let currentStudioMateriId = localStorage.getItem('aamon_active_materi_id') || 'mikrotik-01-routing';
let studioSearchFilter = '';
let collapsedSectionsMap = {};

// Unified Progress Tracking (Single Source of Truth)
function getStandardizedCourseProgress() {
    try {
        const stored = localStorage.getItem('aamon_course_progress');
        if (stored) {
            return JSON.parse(stored);
        }
        // Migration fallback from legacy keys
        const legacyStored = localStorage.getItem('aamon_completed_course_materi');
        if (legacyStored) {
            const list = JSON.parse(legacyStored);
            if (Array.isArray(list) && list.includes(1)) {
                return ['mikrotik-01-routing'];
            }
        }
        return [];
    } catch (e) {
        return [];
    }
}

function saveStandardizedCourseProgress(list) {
    try {
        localStorage.setItem('aamon_course_progress', JSON.stringify(list));
    } catch (e) {}
    updateGlobalLearningProgress();
}

function updateGlobalLearningProgress() {
    const completedList = getStandardizedCourseProgress();
    // Total outlined curriculum lessons across all 7 tracks is 45
    const totalLessons = 45;
    const completedCount = completedList.length;
    const percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
    const progressLabel = `${completedCount} / ${totalLessons} (${percentage}%)`;

    // 1. Academy Hero Header Progress
    const academyBadge = document.getElementById('academyOverallProgressBadge');
    const academyBar = document.getElementById('academyOverallProgressBar');
    if (academyBadge) academyBadge.textContent = progressLabel;
    if (academyBar) academyBar.style.width = `${percentage}%`;

    // 2. Studio Internal Progress Badges
    const studioBadge = document.getElementById('studioProgressBadge');
    const studioBar = document.getElementById('studioProgressBar');
    if (studioBadge) studioBadge.textContent = progressLabel;
    if (studioBar) studioBar.style.width = `${percentage}%`;

    // 3. Roadmap / Dashboard Stats Sync (if present)
    const roadmapBadge = document.getElementById('roadmapProgressPercent');
    const roadmapBar = document.getElementById('roadmapProgressBar');
    if (roadmapBadge) roadmapBadge.textContent = `${percentage}%`;
    if (roadmapBar) roadmapBar.style.width = `${percentage}%`;
}

// Progress Export / Import JSON
function exportCourseProgress() {
    const completedList = getStandardizedCourseProgress();
    const payload = {
        app: "AAMON Network Academy & Continuous Learning Studio",
        version: "2.5",
        exportedAt: new Date().toISOString(),
        student: {
            name: "Arkin Melvian Dwiansyah",
            role: "Network Operations Center (NOC) & Network Engineer"
        },
        progress: {
            totalCurriculumLessons: 45,
            completedCount: completedList.length,
            percentage: Math.round((completedList.length / 45) * 100),
            completedMaterialIds: completedList
        }
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aamon_learning_progress_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToastNotification('Ekspor Berhasil', 'Data progres belajar berhasil diunduh dalam format JSON.');
}

function importCourseProgress(fileInput) {
    if (!fileInput.files || fileInput.files.length === 0) return;
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (data && data.progress && Array.isArray(data.progress.completedMaterialIds)) {
                saveStandardizedCourseProgress(data.progress.completedMaterialIds);
                renderStandardizedCourseStudio(currentStudioMateriId);
                showToastNotification('Impor Berhasil', `Memulihkan progres: ${data.progress.completedMaterialIds.length} materi telah selesai.`);
            } else if (Array.isArray(data)) {
                saveStandardizedCourseProgress(data);
                renderStandardizedCourseStudio(currentStudioMateriId);
                showToastNotification('Impor Berhasil', `Memulihkan ${data.length} materi selesai.`);
            } else {
                alert('Format file JSON tidak valid. Pastikan mengekspor dari AAMON Studio.');
            }
        } catch (err) {
            alert('Gagal membaca file JSON: ' + err.message);
        }
    };

    reader.readAsText(file);
    fileInput.value = ''; // Reset input
}

function toggleMateriCompleted(materiId) {
    const list = getStandardizedCourseProgress();
    const idx = list.indexOf(materiId);
    let isNowDone = false;

    if (idx > -1) {
        list.splice(idx, 1);
        isNowDone = false;
    } else {
        list.push(materiId);
        isNowDone = true;
    }

    saveStandardizedCourseProgress(list);
    renderStandardizedCourseStudio(materiId);
    showToastNotification(
        'Progres Materi Diperbarui',
        isNowDone ? 'Materi ditandai SELESAI!' : 'Materi dikembalikan ke status BELUM SELESAI.'
    );
}

function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function copyStepCli(buttonEl) {
    if (!buttonEl) return;
    const container = buttonEl.closest('.group') || buttonEl.closest('.rounded-xl') || buttonEl.parentElement.parentElement;
    if (!container) return;
    const preEl = container.querySelector('pre');
    if (!preEl) return;
    copyCliSnippet(buttonEl, preEl.innerText.trim());
}

// --- Theme Management (Dark / Light Mode) ---
function getAppTheme() {
    try {
        return localStorage.getItem('aamon_theme') || 'dark';
    } catch (e) {
        return 'dark';
    }
}

function applyAppTheme(theme) {
    const isDark = theme === 'dark';
    const htmlEl = document.documentElement;
    const bodyEl = document.body;

    if (isDark) {
        htmlEl.classList.remove('light');
        htmlEl.classList.add('dark');
        if (bodyEl) bodyEl.classList.remove('light-theme');
    } else {
        htmlEl.classList.remove('dark');
        htmlEl.classList.add('light');
        if (bodyEl) bodyEl.classList.add('light-theme');
    }

    try {
        localStorage.setItem('aamon_theme', theme);
    } catch (e) {}

    // Update all theme toggle buttons across app
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach(btn => {
        const icon = btn.querySelector('.theme-toggle-icon') || btn.querySelector('i');
        const text = btn.querySelector('.theme-toggle-text');
        if (icon) {
            if (isDark) {
                icon.className = 'theme-toggle-icon fa-regular fa-sun text-amber-400 text-xs';
            } else {
                icon.className = 'theme-toggle-icon fa-solid fa-moon text-indigo-600 text-xs';
            }
        }
        if (text) {
            text.textContent = isDark ? 'Mode Terang' : 'Mode Gelap';
        }
        btn.setAttribute('title', isDark ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap');
        btn.setAttribute('aria-label', isDark ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap');
    });
}

function toggleAppTheme() {
    const current = getAppTheme();
    const nextTheme = current === 'dark' ? 'light' : 'dark';
    applyAppTheme(nextTheme);
    showToastNotification(
        nextTheme === 'dark' ? 'Mode Gelap Aktif' : 'Mode Terang Aktif',
        nextTheme === 'dark' ? 'Tema kontras tinggi malam hari diaktifkan.' : 'Tema bersih modern siang hari diaktifkan.'
    );
}

function initAppTheme() {
    applyAppTheme(getAppTheme());
}

function copyCliSnippet(buttonEl, textToCopy) {
    if (!buttonEl || !textToCopy) return;

    const performCopy = () => {
        const originalHtml = buttonEl.innerHTML;
        buttonEl.innerHTML = `<i class="fa-solid fa-check text-emerald-400"></i><span class="text-emerald-400">Tersalin!</span>`;
        buttonEl.classList.add('border-emerald-600', 'bg-emerald-950/40');

        setTimeout(() => {
            buttonEl.innerHTML = originalHtml;
            buttonEl.classList.remove('border-emerald-600', 'bg-emerald-950/40');
        }, 2000);
    };

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(performCopy).catch(() => {
            fallbackCopyText(textToCopy);
            performCopy();
        });
    } else {
        fallbackCopyText(textToCopy);
        performCopy();
    }
}

function fallbackCopyText(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
    } catch (err) {}
    document.body.removeChild(textArea);
}

function toggleSectionCollapse(sectionId) {
    const content = document.getElementById(`sec-content-${sectionId}`);
    const icon = document.getElementById(`sec-chevron-${sectionId}`);
    if (!content) return;

    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        if (icon) icon.className = 'fa-solid fa-chevron-up text-stone-400 text-xs transition-transform';
        collapsedSectionsMap[sectionId] = false;
    } else {
        content.classList.add('hidden');
        if (icon) icon.className = 'fa-solid fa-chevron-down text-stone-400 text-xs transition-transform';
        collapsedSectionsMap[sectionId] = true;
    }
}

function openTopologyZoomModal(materiId) {
    if (typeof STANDARDIZED_COURSE_DATA === 'undefined') return;
    const materi = STANDARDIZED_COURSE_DATA.find(m => m.id === materiId) || STANDARDIZED_COURSE_DATA[0];
    if (!materi || !materi.topology || !materi.topology.svg) return;

    const modal = document.getElementById('imageZoomModal');
    const svgBox = document.getElementById('imageZoomSvgContainer');
    const imgBox = document.getElementById('imageZoomSrc');
    const titleEl = document.getElementById('imageZoomTitle');
    const openBtn = document.getElementById('imageZoomOpenBtn');

    if (!modal) return;

    if (titleEl) titleEl.textContent = `Topologi: ${materi.title} (${materi.vendor} ${materi.osVersion})`;
    if (openBtn) {
        openBtn.style.display = 'none'; // SVG inline
    }

    if (imgBox) imgBox.classList.add('hidden');
    if (svgBox) {
        svgBox.classList.remove('hidden');
        svgBox.innerHTML = materi.topology.svg;
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function selectStudioMateri(materiId) {
    currentStudioMateriId = materiId;
    localStorage.setItem('aamon_active_materi_id', materiId);
    renderStandardizedCourseStudio(materiId);
    const studioEl = document.getElementById('courseStudioApp');
    if (studioEl) studioEl.scrollIntoView({ behavior: 'smooth' });
}

function handleStudioSearch(query) {
    studioSearchFilter = (query || '').toLowerCase().trim();
    renderStandardizedCourseStudio(currentStudioMateriId);
}

// Master Render Function
function renderStandardizedCourseStudio(targetId) {
    const studioContainer = document.getElementById('courseStudioApp');
    if (!studioContainer) return;

    if (typeof STANDARDIZED_COURSE_DATA === 'undefined' || STANDARDIZED_COURSE_DATA.length === 0) {
        studioContainer.innerHTML = `<div class="p-8 text-center text-stone-400 font-mono text-sm bg-stoneCard rounded-2xl border border-stoneBorder">Modul data kurikulum sedang dipersiapkan...</div>`;
        return;
    }

    const activeId = targetId || currentStudioMateriId || STANDARDIZED_COURSE_DATA[0].id;
    const currentMateri = STANDARDIZED_COURSE_DATA.find(m => m.id === activeId) || STANDARDIZED_COURSE_DATA[0];
    currentStudioMateriId = currentMateri.id;

    const completedList = getStandardizedCourseProgress();
    const isCompleted = completedList.includes(currentMateri.id);
    const totalLessons = 45;
    const completedCount = completedList.length;
    const progressPct = Math.round((completedCount / totalLessons) * 100);

    // Filter categories outline by search
    const outline = typeof COURSE_CATALOG_OUTLINE !== 'undefined' ? COURSE_CATALOG_OUTLINE : [];

    let filteredOutline = outline;
    if (studioSearchFilter) {
        filteredOutline = outline.map(cat => {
            const matList = cat.materials || [];
            const matchedItems = matList.filter(item => 
                (item.title && item.title.toLowerCase().includes(studioSearchFilter)) ||
                (cat.category && cat.category.toLowerCase().includes(studioSearchFilter)) ||
                (cat.badge && cat.badge.toLowerCase().includes(studioSearchFilter))
            );
            return { ...cat, materials: matchedItems };
        }).filter(cat => cat.materials && cat.materials.length > 0);
    }

    studioContainer.innerHTML = `
        <!-- STUDIO TOP BAR: Branding, Vendor OS, Export/Import -->
        <div class="clean-card p-5 sm:p-6 rounded-2xl border border-stoneBorder bg-stoneCard">
            <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div class="space-y-1">
                    <div class="flex items-center gap-2 flex-wrap">
                        <span class="font-mono text-[11px] uppercase tracking-wider text-amber-400 font-bold bg-amber-950/40 border border-amber-800/40 px-2.5 py-0.5 rounded flex items-center gap-1.5">
                            <i class="fa-solid fa-graduation-cap"></i>
                            STUDIO BELAJAR INTERAKTIF
                        </span>
                        <span class="font-mono text-[11px] text-stone-300 bg-stone-900 border border-stone-800 px-2.5 py-0.5 rounded">
                            Template Baku Arsitektur Multi-Vendor
                        </span>
                        <span class="font-mono text-[11px] text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-0.5 rounded">
                            ${currentMateri.vendor} ${currentMateri.osVersion}
                        </span>
                    </div>
                    <h2 class="text-xl sm:text-2xl font-black text-white tracking-tight">
                        ${currentMateri.order}. ${currentMateri.title}
                    </h2>
                    <p class="text-xs text-stone-400">
                        Sistem pembelajaran terstruktur 8-Section: Topologi ➔ Tujuan ➔ Hardware ➔ Step CLI ➔ Parameter ➔ Troubleshooting ➔ Best Practice ➔ Lab Mandiri.
                    </p>
                </div>

                <!-- Export & Import Controls -->
                <div class="flex items-center gap-2 shrink-0 flex-wrap">
                    <button type="button" onclick="exportCourseProgress()" class="py-2 px-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 text-xs font-mono font-semibold transition flex items-center gap-1.5" title="Unduh file progres belajar JSON">
                        <i class="fa-solid fa-file-export text-amber-400"></i>
                        <span>Ekspor JSON</span>
                    </button>
                    <label class="py-2 px-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 text-xs font-mono font-semibold transition flex items-center gap-1.5 cursor-pointer" title="Pulihkan progres dari file JSON">
                        <i class="fa-solid fa-file-import text-sky-400"></i>
                        <span>Impor JSON</span>
                        <input type="file" accept=".json" onchange="importCourseProgress(this)" class="hidden">
                    </label>
                    <button type="button" onclick="toggleMateriCompleted('${currentMateri.id}')" class="py-2 px-4 rounded-lg ${isCompleted ? 'bg-emerald-950/70 border border-emerald-700/80 text-emerald-300 hover:bg-emerald-900/80' : 'bg-white hover:bg-stone-200 text-stone-950'} font-bold text-xs transition flex items-center gap-2 shadow-sm">
                        <i class="fa-solid ${isCompleted ? 'fa-circle-check text-emerald-400' : 'fa-check text-stone-950'}"></i>
                        <span>${isCompleted ? 'Materi Selesai (Klik Batal)' : 'Tandai Selesai'}</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- MAIN 3-COLUMN STUDIO LAYOUT -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            <!-- ============================================================ -->
            <!-- LEFT COLUMN (col-span-3): CURRICULUM NAVIGATOR & OUTLINE     -->
            <!-- ============================================================ -->
            <div class="lg:col-span-4 xl:col-span-3 space-y-4">
                
                <!-- Progress Summary Card -->
                <div class="clean-card p-4 rounded-xl border border-stoneBorder bg-stoneCard space-y-3">
                    <div class="flex items-center justify-between text-xs font-mono">
                        <span class="text-stone-400 font-bold uppercase">Progres Kurikulum</span>
                        <span id="studioProgressBadge" class="text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
                            ${completedCount} / ${totalLessons} (${progressPct}%)
                        </span>
                    </div>
                    <div class="w-full bg-stone-900 rounded-full h-2 overflow-hidden border border-stone-800">
                        <div id="studioProgressBar" class="bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-300 h-full rounded-full transition-all duration-300" style="width: ${progressPct}%"></div>
                    </div>
                    <div class="text-[11px] text-stone-400 flex items-center justify-between">
                        <span>Golden Reference:</span>
                        <span class="text-amber-400 font-mono font-bold">Materi 1 (Aktif)</span>
                    </div>
                </div>

                <!-- Curriculum Search -->
                <div class="clean-card p-3 rounded-xl border border-stoneBorder bg-stoneCard">
                    <div class="relative">
                        <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 text-xs"></i>
                        <input type="text" oninput="handleStudioSearch(this.value)" value="${studioSearchFilter}" placeholder="Cari materi, vendor, topik..." class="w-full pl-8 pr-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-200 text-xs focus:outline-none focus:border-stone-600 transition font-sans">
                    </div>
                </div>

                <!-- Categories & Materials Accordion -->
                <div class="clean-card p-3 rounded-xl border border-stoneBorder bg-stoneCard space-y-3 max-h-[85vh] overflow-y-auto pr-1">
                    <div class="flex items-center justify-between px-1 text-[11px] font-mono uppercase text-stone-400 font-bold">
                        <span>Daftar Modul & Materi</span>
                        <span>45 Silabus</span>
                    </div>

                    ${filteredOutline.map(cat => {
                        const matList = cat.materials || [];
                        return `
                        <div class="rounded-lg bg-stone-900/50 border border-stone-800 overflow-hidden">
                            <div class="p-2.5 bg-stone-900/90 flex items-center justify-between border-b border-stone-800/60">
                                <div class="flex items-center gap-2">
                                    <i class="fa-solid fa-network-wired text-xs text-amber-400"></i>
                                    <span class="text-xs font-bold text-white tracking-wide">${cat.category}</span>
                                </div>
                                <span class="font-mono text-[10px] text-stone-400 bg-stone-800 px-1.5 py-0.5 rounded">
                                    ${matList.length} materi
                                </span>
                            </div>
                            <div class="p-1.5 space-y-1">
                                ${matList.map(item => {
                                    const isThisActive = item.id === currentMateri.id;
                                    const isThisDone = completedList.includes(item.id);
                                    const isAvailable = item.id === 'mikrotik-01-routing' || item.available === true;

                                    if (isAvailable) {
                                        return `
                                            <button type="button" onclick="selectStudioMateri('${item.id}')" class="w-full text-left p-2 rounded-md transition text-xs flex items-center justify-between gap-2 ${isThisActive ? 'bg-amber-400/10 border border-amber-500/40 text-amber-200 font-bold' : 'hover:bg-stone-800 text-stone-300'}">
                                                <div class="flex items-center gap-2 truncate">
                                                    <i class="fa-solid ${isThisDone ? 'fa-circle-check text-emerald-400' : (isThisActive ? 'fa-play text-amber-400' : 'fa-circle text-stone-600')} text-[10px] shrink-0"></i>
                                                    <span class="truncate">[${item.order}] ${item.title}</span>
                                                </div>
                                                <span class="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded shrink-0 ${isThisDone ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'}">
                                                    ${isThisDone ? 'SELESAI' : 'AKTIF'}
                                                </span>
                                            </button>
                                        `;
                                    } else {
                                        return `
                                            <div class="w-full p-2 rounded-md text-xs text-stone-500 flex items-center justify-between gap-2 bg-stone-950/30 opacity-75 cursor-not-allowed">
                                                <div class="flex items-center gap-2 truncate">
                                                    <i class="fa-solid fa-lock text-[10px] text-stone-600 shrink-0"></i>
                                                    <span class="truncate">[${item.order}] ${item.title}</span>
                                                </div>
                                                <span class="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-stone-900 text-stone-500 border border-stone-800 shrink-0">
                                                    Locked
                                                </span>
                                            </div>
                                        `;
                                    }
                                }).join('')}
                            </div>
                        </div>
                    `}).join('')}
                </div>
            </div>

            <!-- ============================================================ -->
            <!-- CENTER COLUMN (col-span-7): STANDARDIZED SECTIONS 0 TO 8     -->
            <!-- ============================================================ -->
            <div class="lg:col-span-8 xl:col-span-7 space-y-6">

                <!-- -------------------------------------------------------- -->
                <!-- SECTION 0: HEADER MATERI                                 -->
                <!-- -------------------------------------------------------- -->
                <div id="sec-0-header" class="clean-card p-6 rounded-2xl border border-stoneBorder bg-stoneCard space-y-4 scroll-mt-24">
                    <div class="flex flex-wrap items-center gap-2">
                        <span class="font-mono text-xs uppercase px-2.5 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-400 font-bold">
                            Section 0 • Header
                        </span>
                        <span class="font-mono text-xs px-2.5 py-0.5 rounded bg-amber-950/50 border border-amber-800/50 text-amber-300 font-bold">
                            ${currentMateri.category}
                        </span>
                        <span class="font-mono text-xs px-2.5 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-300">
                            Vendor: <strong class="text-white">${currentMateri.vendor}</strong> (${currentMateri.osVersion})
                        </span>
                        <span class="font-mono text-xs px-2.5 py-0.5 rounded bg-blue-950/50 border border-blue-800/50 text-blue-300">
                            Level: ${currentMateri.level}
                        </span>
                        <span class="font-mono text-xs px-2.5 py-0.5 rounded bg-purple-950/50 border border-purple-800/50 text-purple-300 flex items-center gap-1">
                            <i class="fa-regular fa-clock"></i>
                            ${currentMateri.estimatedMinutes} Menit
                        </span>
                    </div>

                    <div class="space-y-1">
                        <h1 class="text-2xl sm:text-3xl font-black text-white tracking-tight">
                            ${currentMateri.title}
                        </h1>
                        <p class="text-xs text-stone-400 font-sans">
                            Prasyarat Materi: ${currentMateri.prerequisites.length > 0 ? currentMateri.prerequisites.join(', ') : '<span class="text-emerald-400 font-medium">None (Siap dimulai dari router factory reset)</span>'}
                        </p>
                    </div>

                    <div class="pt-3 border-t border-stone-800/80 flex items-center justify-between flex-wrap gap-3">
                        <div class="flex items-center gap-2 text-xs font-mono text-stone-400">
                            <i class="fa-solid fa-code-branch text-amber-400"></i>
                            <span>Single Source Progress: <strong>${isCompleted ? '<span class="text-emerald-400">Tersimpan di Storage (Selesai)</span>' : '<span class="text-amber-400">Belum Selesai</span>'}</strong></span>
                        </div>
                        <button type="button" onclick="toggleMateriCompleted('${currentMateri.id}')" class="py-2 px-4 rounded-lg ${isCompleted ? 'bg-emerald-950/80 border border-emerald-700 text-emerald-300' : 'bg-white hover:bg-stone-200 text-stone-950'} font-bold text-xs transition flex items-center gap-2">
                            <i class="fa-solid ${isCompleted ? 'fa-circle-check text-emerald-400' : 'fa-circle-dot'}"></i>
                            <span>${isCompleted ? 'Selesai âœ” (Klik Batal)' : 'Tandai Selesai'}</span>
                        </button>
                    </div>
                </div>

                <!-- -------------------------------------------------------- -->
                <!-- SECTION 1: GAMBAR TOPOLOGI                               -->
                <!-- -------------------------------------------------------- -->
                <div id="sec-1-topology" class="clean-card rounded-2xl border border-stoneBorder bg-stoneCard overflow-hidden scroll-mt-24">
                    <div class="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between bg-stoneCardSubtle">
                        <div class="flex items-center gap-2.5">
                            <div class="w-7 h-7 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 font-mono font-bold text-xs">
                                1
                            </div>
                            <div>
                                <h3 class="text-sm font-bold text-white tracking-wide">GAMBAR TOPOLOGI JARINGAN</h3>
                                <p class="text-[11px] text-stone-400 font-mono">Diagram SVG Inline Interaktif & Beresolusi Tinggi</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <button type="button" onclick="openTopologyZoomModal('${currentMateri.id}')" class="py-1.5 px-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 text-xs font-mono transition flex items-center gap-1.5">
                                <i class="fa-solid fa-maximize text-amber-400"></i>
                                <span>Perbesar Topologi</span>
                            </button>
                            <button type="button" onclick="toggleSectionCollapse('sec1')" class="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition">
                                <i id="sec-chevron-sec1" class="fa-solid fa-chevron-up text-xs"></i>
                            </button>
                        </div>
                    </div>

                    <div id="sec-content-sec1" class="p-4 sm:p-6 space-y-4">
                        <!-- SVG Container -->
                        <div class="w-full bg-[#0c0a09] border border-stone-800 rounded-xl overflow-x-auto p-2 sm:p-4 flex items-center justify-center shadow-inner">
                            ${currentMateri.topology.svg}
                        </div>

                        <!-- Topology Color Legend -->
                        <div class="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800 space-y-2">
                            <div class="text-[11px] font-mono text-stone-400 font-bold uppercase flex items-center gap-2">
                                <i class="fa-solid fa-palette text-amber-400"></i>
                                <span>Legenda Warna Garis & Protokol Link Topologi</span>
                            </div>
                            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 text-[11px] font-mono">
                                ${currentMateri.topology.legend.map(item => `
                                    <div class="flex items-center gap-2 p-1.5 rounded bg-stone-950/50 border border-stone-800/80">
                                        <span class="w-3 h-3 rounded-sm shrink-0" style="background-color: ${item.color};"></span>
                                        <div class="truncate">
                                            <span class="text-white font-bold block truncate">${item.label}</span>
                                            <span class="text-[9px] text-stone-400 block truncate">${item.desc}</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- -------------------------------------------------------- -->
                <!-- SECTION 2: TUJUAN                                        -->
                <!-- -------------------------------------------------------- -->
                <div id="sec-2-objectives" class="clean-card rounded-2xl border border-stoneBorder bg-stoneCard overflow-hidden scroll-mt-24">
                    <div class="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between bg-stoneCardSubtle">
                        <div class="flex items-center gap-2.5">
                            <div class="w-7 h-7 rounded-lg bg-sky-400/10 border border-sky-400/30 flex items-center justify-center text-sky-400 font-mono font-bold text-xs">
                                2
                            </div>
                            <div>
                                <h3 class="text-sm font-bold text-white tracking-wide">TUJUAN PEMBELAJARAN & SKENARIO NYATA</h3>
                                <p class="text-[11px] text-stone-400 font-mono">Capai Kompetensi, Solusi Masalah, & Implementasi Lapangan</p>
                            </div>
                        </div>
                        <button type="button" onclick="toggleSectionCollapse('sec2')" class="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition">
                            <i id="sec-chevron-sec2" class="fa-solid fa-chevron-up text-xs"></i>
                        </button>
                    </div>

                    <div id="sec-content-sec2" class="p-4 sm:p-6 space-y-4">
                        <!-- Apa yang dicapai -->
                        <div class="space-y-2">
                            <h4 class="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                                <i class="fa-solid fa-bullseye"></i>
                                <span>Apa yang Dicapai (Target Kompetensi)</span>
                            </h4>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                ${currentMateri.objectives.map(obj => `
                                    <div class="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-stone-200 text-xs flex items-start gap-2.5">
                                        <i class="fa-solid fa-circle-check text-emerald-400 text-xs mt-0.5 shrink-0"></i>
                                        <span>${obj}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Masalah yang diselesaikan -->
                        <div class="p-4 rounded-xl bg-stone-900/70 border border-stone-800 space-y-2">
                            <h4 class="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2">
                                <i class="fa-solid fa-triangle-exclamation"></i>
                                <span>Masalah yang Diselesaikan</span>
                            </h4>
                            <p class="text-stone-300 text-xs sm:text-sm leading-relaxed">
                                ${currentMateri.problemSolved}
                            </p>
                        </div>

                        <!-- Kapan dipakai di dunia nyata -->
                        <div class="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 space-y-2">
                            <div class="flex items-center justify-between">
                                <h4 class="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                                    <i class="fa-solid fa-building-columns"></i>
                                    <span>Kapan Dipakai di Dunia Nyata (Kasus Lapangan ISP / Enterprise)</span>
                                </h4>
                                <span class="font-mono text-[10px] text-amber-300 bg-amber-900/40 px-2 py-0.5 rounded border border-amber-700/40">Real Case Study</span>
                            </div>
                            <p class="text-stone-300 text-xs sm:text-sm leading-relaxed">
                                ${currentMateri.realWorldUse}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- -------------------------------------------------------- -->
                <!-- SECTION 3: PERANGKAT YANG DIGUNAKAN                      -->
                <!-- -------------------------------------------------------- -->
                <div id="sec-3-devices" class="clean-card rounded-2xl border border-stoneBorder bg-stoneCard overflow-hidden scroll-mt-24">
                    <div class="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between bg-stoneCardSubtle">
                        <div class="flex items-center gap-2.5">
                            <div class="w-7 h-7 rounded-lg bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-xs">
                                3
                            </div>
                            <div>
                                <h3 class="text-sm font-bold text-white tracking-wide">PERANGKAT YANG DIGUNAKAN</h3>
                                <p class="text-[11px] text-stone-400 font-mono">Foto Resmi Vendor MikroTik, Spesifikasi Asli & Alternatif</p>
                            </div>
                        </div>
                        <button type="button" onclick="toggleSectionCollapse('sec3')" class="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition">
                            <i id="sec-chevron-sec3" class="fa-solid fa-chevron-up text-xs"></i>
                        </button>
                    </div>

                    <div id="sec-content-sec3" class="p-4 sm:p-6 space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${currentMateri.devices.map(dev => `
                                <div class="rounded-xl bg-stone-900/60 border border-stone-800 overflow-hidden flex flex-col justify-between">
                                    <div class="p-4 space-y-3">
                                        <!-- Photo & Badges -->
                                        <div class="relative bg-stone-950 rounded-lg p-3 border border-stone-800/80 flex items-center justify-center min-h-[140px] group">
                                            <img src="${dev.image}" alt="${dev.model}" class="max-h-28 object-contain transition-transform duration-300 group-hover:scale-105" onerror="this.onerror=null; this.src='assets/devices/generic-router.svg';">
                                            <div class="absolute top-2 left-2 flex items-center gap-1.5">
                                                <span class="font-mono text-[10px] text-amber-300 bg-amber-950/80 border border-amber-800/80 px-2 py-0.5 rounded font-bold">${dev.role}</span>
                                            </div>
                                            <div class="absolute bottom-2 right-2">
                                                <span class="font-mono text-[9px] text-stone-400 bg-stone-900/90 border border-stone-800 px-1.5 py-0.5 rounded">${dev.type}</span>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 class="text-sm font-bold text-white">${dev.model}</h4>
                                            <p class="text-[11px] text-stone-400 mt-0.5">${dev.specs.ports} • ${dev.specs.cpu}</p>
                                        </div>

                                        <!-- Specifications Table -->
                                        <div class="p-2.5 rounded-lg bg-stone-950/50 border border-stone-800/60 space-y-1 font-mono text-[11px]">
                                            <div class="flex justify-between text-stone-400">
                                                <span>Throughput:</span>
                                                <span class="text-stone-200">${dev.specs.throughput}</span>
                                            </div>
                                            <div class="flex justify-between text-stone-400">
                                                <span>RAM / Storage:</span>
                                                <span class="text-stone-200">${dev.specs.ram}</span>
                                            </div>
                                            <div class="flex justify-between text-stone-400">
                                                <span>OS Compatibility:</span>
                                                <span class="text-emerald-400 font-bold">${dev.specs.os}</span>
                                            </div>
                                        </div>

                                        <!-- Alternatives -->
                                        <div class="text-[11px] text-stone-400">
                                            <span class="font-mono text-stone-500">Alternatif Praktik:</span>
                                            <span class="text-stone-300 ml-1 font-medium">${dev.alternatives.join(', ')}</span>
                                        </div>
                                    </div>

                                    <!-- Credit & Official Link -->
                                    <div class="px-4 py-2.5 bg-stone-950/80 border-t border-stone-800 flex items-center justify-between text-[10px] font-mono">
                                        <span class="text-stone-500">Sumber: ${dev.credit}</span>
                                        <a href="${dev.sourceUrl}" target="_blank" rel="noopener noreferrer" class="text-sky-400 hover:text-sky-300 flex items-center gap-1 transition">
                                            <span>Situs Resmi</span>
                                            <i class="fa-solid fa-arrow-up-right-from-square text-[8px]"></i>
                                        </a>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- -------------------------------------------------------- -->
                <!-- SECTION 4: LANGKAH KONFIGURASI (STEP BY STEP)            -->
                <!-- -------------------------------------------------------- -->
                <div id="sec-4-steps" class="clean-card rounded-2xl border border-stoneBorder bg-stoneCard overflow-hidden scroll-mt-24">
                    <div class="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between bg-stoneCardSubtle">
                        <div class="flex items-center gap-2.5">
                            <div class="w-7 h-7 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 font-mono font-bold text-xs">
                                4
                            </div>
                            <div>
                                <h3 class="text-sm font-bold text-white tracking-wide">LANGKAH KONFIGURASI (STEP BY STEP)</h3>
                                <p class="text-[11px] text-stone-400 font-mono">Format Stepper Bernomor, Target Perangkat, CLI & Checkpoint</p>
                            </div>
                        </div>
                        <button type="button" onclick="toggleSectionCollapse('sec4')" class="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition">
                            <i id="sec-chevron-sec4" class="fa-solid fa-chevron-up text-xs"></i>
                        </button>
                    </div>

                    <div id="sec-content-sec4" class="p-4 sm:p-6 space-y-6">
                        
                        <!-- Stepper Items -->
                        <div class="space-y-6">
                            ${(currentMateri.steps || []).map((step, idx) => {
                                const stepNum = step.no || step.step || (idx + 1);
                                const formattedStepNum = String(stepNum).padStart(2, '0');
                                const cliCode = step.commands || step.cli || '';
                                const warningText = step.warning || step.riskNote || '';
                                const explanations = Array.isArray(step.explanation) ? step.explanation : (step.explanation ? [step.explanation] : []);
                                
                                return `
                                <div class="rounded-xl bg-stone-900/50 border border-stone-800 p-4 sm:p-5 space-y-3.5 transition hover:border-stone-700 shadow-sm">
                                    <!-- Step Header -->
                                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800/60 pb-3">
                                        <div class="flex items-center gap-2.5">
                                            <span class="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-950/70 border border-amber-800/70 text-amber-300 shadow-sm">
                                                STEP ${formattedStepNum}
                                            </span>
                                            <span class="font-mono text-xs px-2.5 py-0.5 rounded bg-stone-800 border border-stone-700 text-stone-200 font-bold flex items-center gap-1.5 shadow-sm">
                                                <i class="fa-solid fa-server text-stone-400 text-[10px]"></i>
                                                ${step.targetDevice || 'Target Perangkat'}
                                            </span>
                                        </div>
                                        <h4 class="text-xs sm:text-sm font-bold text-white">${step.title || 'Langkah Konfigurasi'}</h4>
                                    </div>

                                    <!-- Goal -->
                                    <div class="text-xs text-stone-300 font-sans leading-relaxed flex items-start gap-2 bg-stone-950/40 p-2.5 rounded-lg border border-stone-800/40">
                                        <span class="font-mono font-bold text-amber-400 shrink-0 text-[10px] uppercase bg-amber-950/50 px-1.5 py-0.5 rounded border border-amber-900/60">Tujuan:</span>
                                        <span class="text-stone-300">${step.goal || '-'}</span>
                                    </div>

                                    <!-- CLI Block -->
                                    <div class="rounded-xl bg-stone-950 border border-stone-800 overflow-hidden relative group shadow-inner">
                                        <div class="px-3.5 py-2 bg-stone-900/90 border-b border-stone-800/80 flex items-center justify-between text-[11px] font-mono text-stone-400">
                                            <span class="flex items-center gap-2 text-stone-200 font-semibold">
                                                <i class="fa-solid fa-terminal text-amber-400 text-xs"></i>
                                                <span>RouterOS Terminal CLI</span>
                                            </span>
                                            <button type="button" onclick="copyStepCli(this)" class="py-1 px-3 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 text-[11px] font-mono transition flex items-center gap-1.5 border border-stone-700 cursor-pointer shadow-sm active:scale-95">
                                                <i class="fa-regular fa-copy"></i>
                                                <span>Salin Perintah</span>
                                            </button>
                                        </div>
                                        <pre class="p-3.5 font-mono text-xs text-amber-300/95 whitespace-pre-wrap leading-relaxed select-all overflow-x-auto">${escapeHtml(cliCode)}</pre>
                                    </div>

                                    <!-- Line by Line Explanation -->
                                    <div class="p-3.5 rounded-lg bg-stone-950/40 border border-stone-800/60 space-y-2">
                                        <div class="text-[11px] font-mono text-stone-400 font-bold uppercase flex items-center gap-1.5">
                                            <i class="fa-solid fa-circle-info text-sky-400"></i>
                                            <span>Penjelasan Parameter & Logika Teknis:</span>
                                        </div>
                                        <ul class="space-y-2 text-xs text-stone-300">
                                            ${explanations.map(exp => {
                                                if (typeof exp === 'object' && exp !== null) {
                                                    return `
                                                        <li class="leading-relaxed flex items-start gap-2.5">
                                                            <i class="fa-solid fa-angle-right text-amber-400 text-[10px] mt-1 shrink-0"></i>
                                                            <div class="space-y-0.5 flex-1 min-w-0">
                                                                ${exp.line ? `<code class="font-mono text-[11px] text-amber-300 bg-stone-900/90 px-1.5 py-0.5 rounded border border-stone-800 break-all inline-block">${escapeHtml(exp.line)}</code>` : ''}
                                                                <p class="text-xs text-stone-300 mt-0.5 leading-relaxed">${exp.why || ''}</p>
                                                            </div>
                                                        </li>
                                                    `;
                                                } else {
                                                    return `
                                                        <li class="leading-relaxed flex items-start gap-2.5">
                                                            <i class="fa-solid fa-angle-right text-amber-400 text-[10px] mt-1 shrink-0"></i>
                                                            <span class="text-xs text-stone-300 leading-relaxed">${exp}</span>
                                                        </li>
                                                    `;
                                                }
                                            }).join('')}
                                        </ul>
                                    </div>

                                    <!-- Checkpoint Verification -->
                                    ${step.checkpoint ? `
                                        <div class="p-3.5 rounded-lg bg-blue-950/20 border border-blue-900/40 space-y-1.5 font-mono text-xs">
                                            <div class="flex items-center justify-between text-blue-400 font-bold text-[11px] flex-wrap gap-2">
                                                <span class="flex items-center gap-1.5">
                                                    <i class="fa-solid fa-clipboard-check"></i>
                                                    CHECKPOINT VERIFIKASI:
                                                </span>
                                                <code class="text-stone-200 bg-stone-900 px-2 py-0.5 rounded border border-blue-900/50">${escapeHtml(step.checkpoint.command || step.checkpoint.cmd || '')}</code>
                                            </div>
                                            <div class="text-stone-300 text-[11px] pt-1.5 border-t border-blue-900/30">
                                                <span class="text-blue-300 font-semibold">Output Diharapkan:</span> ${escapeHtml(step.checkpoint.expected || step.checkpoint.output || '')}
                                            </div>
                                        </div>
                                    ` : ''}

                                    <!-- Warning Alert if any -->
                                    ${warningText ? `
                                        <div class="p-3 rounded-lg bg-rose-950/25 border border-rose-900/40 text-xs text-rose-300 flex items-start gap-2.5">
                                            <i class="fa-solid fa-triangle-exclamation text-rose-400 mt-0.5 shrink-0"></i>
                                            <div class="leading-relaxed">
                                                <strong class="font-mono uppercase text-[11px] text-rose-400">Peringatan Risiko:</strong> ${warningText}
                                            </div>
                                        </div>
                                    ` : ''}
                                </div>
                                `;
                            }).join('')}
                        </div>

                        <!-- Konfigurasi Lengkap Per Perangkat (All-in-One 1-Click Copy) -->
                        <div class="space-y-3 pt-4 border-t border-stone-800">
                            <div class="flex items-center justify-between flex-wrap gap-2">
                                <h4 class="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                    <i class="fa-solid fa-file-code text-amber-400"></i>
                                    <span>Script Konfigurasi Lengkap (Sekali Salin Per Perangkat)</span>
                                </h4>
                                <span class="font-mono text-[10px] text-stone-400 bg-stone-900 px-2 py-0.5 rounded border border-stone-800">Zero-to-Hero Factory Reset Config</span>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                ${(Array.isArray(currentMateri.fullConfig) ? currentMateri.fullConfig : []).map(cfg => `
                                    <div class="rounded-xl bg-stone-950 border border-stone-800 overflow-hidden shadow-inner group">
                                        <div class="p-2.5 bg-stone-900 border-b border-stone-800 flex items-center justify-between text-xs">
                                            <span class="font-bold text-white flex items-center gap-1.5 font-mono">
                                                <i class="fa-solid fa-server text-amber-400"></i>
                                                ${cfg.device}
                                            </span>
                                            <button type="button" onclick="copyStepCli(this)" class="py-1 px-2.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 text-[11px] font-mono transition flex items-center gap-1 border border-stone-700 cursor-pointer shadow-sm active:scale-95">
                                                <i class="fa-regular fa-copy"></i>
                                                <span>Salin Semua ${cfg.device}</span>
                                            </button>
                                        </div>
                                        <pre class="p-3 font-mono text-[11px] text-amber-300/95 whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto select-all">${escapeHtml(cfg.commands || cfg.script || '')}</pre>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                    </div>
                </div>

                <!-- -------------------------------------------------------- -->
                <!-- SECTION 5: DETAIL PARAMETER                              -->
                <!-- -------------------------------------------------------- -->
                <div id="sec-5-parameters" class="clean-card rounded-2xl border border-stoneBorder bg-stoneCard overflow-hidden scroll-mt-24">
                    <div class="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between bg-stoneCardSubtle">
                        <div class="flex items-center gap-2.5">
                            <div class="w-7 h-7 rounded-lg bg-purple-400/10 border border-purple-400/30 flex items-center justify-center text-purple-400 font-mono font-bold text-xs">
                                5
                            </div>
                            <div>
                                <h3 class="text-sm font-bold text-white tracking-wide">DETAIL PARAMETER & SINTAKS ROUTEROS V7</h3>
                                <p class="text-[11px] text-stone-400 font-mono">Parameter Kunci, Nilai Default, dan Analisis Kesalahan Pemula</p>
                            </div>
                        </div>
                        <button type="button" onclick="toggleSectionCollapse('sec5')" class="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition">
                            <i id="sec-chevron-sec5" class="fa-solid fa-chevron-up text-xs"></i>
                        </button>
                    </div>

                    <div id="sec-content-sec5" class="p-4 sm:p-6 overflow-x-auto">
                        <table class="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr class="border-b border-stone-800 font-mono text-[11px] text-stone-400 uppercase bg-stone-900/60">
                                    <th class="p-3 font-bold">Parameter</th>
                                    <th class="p-3 font-bold">Fungsi Teknis</th>
                                    <th class="p-3 font-bold">Nilai Contoh</th>
                                    <th class="p-3 font-bold">Rentang / Default</th>
                                    <th class="p-3 font-bold">Catatan & Peringatan</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-stone-800/60 font-sans">
                                ${(currentMateri.parameters || []).map(p => `
                                    <tr class="hover:bg-stone-900/30 transition">
                                        <td class="p-3 font-mono font-bold text-amber-300 whitespace-nowrap">${p.name}</td>
                                        <td class="p-3 text-stone-300 leading-relaxed">${p.function || p.func || ''}</td>
                                        <td class="p-3 font-mono text-stone-200 whitespace-nowrap">${p.example || ''}</td>
                                        <td class="p-3 font-mono text-stone-400 whitespace-nowrap">${p.default || p.range || ''}</td>
                                        <td class="p-3 text-stone-400 leading-relaxed text-[11px]">${p.note || p.notes || ''}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- -------------------------------------------------------- -->
                <!-- SECTION 6: VERIFIKASI & TROUBLESHOOTING                  -->
                <!-- -------------------------------------------------------- -->
                <div id="sec-6-troubleshooting" class="clean-card rounded-2xl border border-stoneBorder bg-stoneCard overflow-hidden scroll-mt-24">
                    <div class="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between bg-stoneCardSubtle">
                        <div class="flex items-center gap-2.5">
                            <div class="w-7 h-7 rounded-lg bg-rose-400/10 border border-rose-400/30 flex items-center justify-center text-rose-400 font-mono font-bold text-xs">
                                6
                            </div>
                            <div>
                                <h3 class="text-sm font-bold text-white tracking-wide">VERIFIKASI & TROUBLESHOOTING</h3>
                                <p class="text-[11px] text-stone-400 font-mono">Terminal Output Sukses, 4 Gejala Masalah & Rollback Safe Mode</p>
                            </div>
                        </div>
                        <button type="button" onclick="toggleSectionCollapse('sec6')" class="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition">
                            <i id="sec-chevron-sec6" class="fa-solid fa-chevron-up text-xs"></i>
                        </button>
                    </div>

                    <div id="sec-content-sec6" class="p-4 sm:p-6 space-y-6">
                        
                        <!-- Terminal Verifications -->
                        <div class="space-y-3">
                            <h4 class="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                                <i class="fa-solid fa-terminal"></i>
                                <span>Perintah Verifikasi & Contoh Output Sukses</span>
                            </h4>

                            <div class="grid grid-cols-1 gap-4">
                                ${(currentMateri.verification || []).map(v => `
                                    <div class="rounded-xl bg-stone-950 border border-stone-800 overflow-hidden">
                                        <div class="p-2.5 bg-stone-900 border-b border-stone-800 flex items-center justify-between text-xs font-mono">
                                            <span class="text-emerald-400 font-bold flex items-center gap-2">
                                                <i class="fa-solid fa-circle-check text-[10px]"></i>
                                                ${v.desc || v.command}
                                            </span>
                                            <span class="text-stone-400 bg-stone-950 px-2 py-0.5 rounded border border-stone-800">${v.command || v.cmd || ''}</span>
                                        </div>
                                        <pre class="p-3.5 font-mono text-xs text-stone-200 whitespace-pre-wrap leading-relaxed select-all overflow-x-auto">${v.expectedOutput || v.output || ''}</pre>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- 4 Common Issues Matrix -->
                        <div class="space-y-3">
                            <h4 class="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                                <i class="fa-solid fa-bug"></i>
                                <span>Matriks Troubleshooting: 4 Masalah Umum Routing MikroTik</span>
                            </h4>

                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                ${(currentMateri.troubleshooting || []).map((t, idx) => `
                                    <div class="rounded-xl bg-stone-900/60 border border-stone-800 p-4 space-y-2.5">
                                        <div class="flex items-center gap-2 border-b border-stone-800 pb-2">
                                            <span class="font-mono text-[10px] text-rose-400 bg-rose-950/60 border border-rose-800/60 px-2 py-0.5 rounded font-bold">
                                                KASUS 0${idx + 1}
                                            </span>
                                            <h5 class="text-xs font-bold text-white truncate">${t.issue || t.symptom}</h5>
                                        </div>

                                        <div class="space-y-1.5 text-[11px]">
                                            <div>
                                                <span class="text-stone-400 font-mono">Gejala:</span>
                                                <span class="text-rose-300 font-medium ml-1">${t.symptom}</span>
                                            </div>
                                            <div>
                                                <span class="text-stone-400 font-mono">Penyebab:</span>
                                                <span class="text-stone-300 ml-1">${t.cause}</span>
                                            </div>
                                            <div class="p-2 rounded bg-stone-950/60 border border-stone-800 font-mono text-[10px]">
                                                <span class="text-sky-400 block font-bold mb-0.5">Cara Cek:</span>
                                                <code class="text-stone-300">${t.check}</code>
                                            </div>
                                            <div class="p-2 rounded bg-emerald-950/30 border border-emerald-900/40 text-emerald-200">
                                                <strong class="font-mono text-[10px] uppercase block text-emerald-400 mb-0.5">Solusi:</strong>
                                                <span>${t.solution || t.fix}</span>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Rollback Procedure -->
                        <div class="p-4 rounded-xl bg-stone-900/70 border border-stone-800 space-y-3">
                            <div class="flex items-center justify-between border-b border-stone-800 pb-2">
                                <h4 class="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                                    <i class="fa-solid fa-rotate-left"></i>
                                    <span>Prosedur Rollback & Safe Mode (Pencegahan Lockout)</span>
                                </h4>
                                <span class="font-mono text-[10px] text-stone-400 bg-stone-950 px-2 py-0.5 rounded border border-stone-800">Operational Safety</span>
                            </div>

                            <pre class="font-mono text-xs text-stone-200 whitespace-pre-wrap leading-relaxed select-all bg-stone-950 p-3.5 rounded-lg border border-stone-800">${typeof currentMateri.rollback === 'string' ? currentMateri.rollback : ((currentMateri.rollback && currentMateri.rollback.safeMode) || '')}</pre>
                        </div>

                    </div>
                </div>

                <!-- -------------------------------------------------------- -->
                <!-- SECTION 7: KESIMPULAN & BEST PRACTICE                    -->
                <!-- -------------------------------------------------------- -->
                <div id="sec-7-conclusion" class="clean-card rounded-2xl border border-stoneBorder bg-stoneCard overflow-hidden scroll-mt-24">
                    <div class="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between bg-stoneCardSubtle">
                        <div class="flex items-center gap-2.5">
                            <div class="w-7 h-7 rounded-lg bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-xs">
                                7
                            </div>
                            <div>
                                <h3 class="text-sm font-bold text-white tracking-wide">KESIMPULAN & BEST PRACTICE</h3>
                                <p class="text-[11px] text-stone-400 font-mono">Pedoman Wajib, Larangan Operasional, & Pengerasan Keamanan</p>
                            </div>
                        </div>
                        <button type="button" onclick="toggleSectionCollapse('sec7')" class="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition">
                            <i id="sec-chevron-sec7" class="fa-solid fa-chevron-up text-xs"></i>
                        </button>
                    </div>

                    <div id="sec-content-sec7" class="p-4 sm:p-6 space-y-4">
                        
                        <!-- Core Takeaways -->
                        <div class="space-y-2">
                            <h4 class="text-xs font-mono font-bold text-white uppercase tracking-wider">
                                Ringkasan Inti Materi
                            </h4>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                ${currentMateri.conclusion.summary.map(s => `
                                    <div class="p-3 rounded-lg bg-stone-900/60 border border-stone-800 text-stone-200 flex items-start gap-2">
                                        <i class="fa-solid fa-check text-amber-400 text-xs mt-0.5 shrink-0"></i>
                                        <span>${s}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Do and Don't Grid -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            <!-- Wajib Dilakukan -->
                            <div class="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-2">
                                <h5 class="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                                    <i class="fa-solid fa-thumbs-up"></i>
                                    <span>Wajib Dilakukan (Best Practice)</span>
                                </h5>
                                <ul class="space-y-1.5 text-xs text-stone-300">
                                    ${currentMateri.conclusion.do.map(d => `
                                        <li class="flex items-start gap-2">
                                            <i class="fa-solid fa-circle-check text-emerald-400 text-[11px] mt-0.5 shrink-0"></i>
                                            <span>${d}</span>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>

                            <!-- Jangan Dilakukan -->
                            <div class="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-2">
                                <h5 class="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                                    <i class="fa-solid fa-ban"></i>
                                    <span>Jangan Dilakukan (Anti-Pattern)</span>
                                </h5>
                                <ul class="space-y-1.5 text-xs text-stone-300">
                                    ${currentMateri.conclusion.dont.map(d => `
                                        <li class="flex items-start gap-2">
                                            <i class="fa-solid fa-circle-xmark text-rose-400 text-[11px] mt-0.5 shrink-0"></i>
                                            <span>${d}</span>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        </div>

                        <!-- Security Notes -->
                        <div class="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 space-y-1.5">
                            <h5 class="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                                <i class="fa-solid fa-shield-halved"></i>
                                <span>Catatan Keamanan & Hardening Jaringan</span>
                            </h5>
                            <div class="text-xs text-stone-300 leading-relaxed font-sans">
                                ${Array.isArray(currentMateri.conclusion.security) ? `
                                    <ul class="space-y-1.5 list-disc list-inside">
                                        ${currentMateri.conclusion.security.map(sec => `<li>${sec}</li>`).join('')}
                                    </ul>
                                ` : `<p>${currentMateri.conclusion.security || ''}</p>`}
                            </div>
                        </div>

                        <!-- Navigation Next Button -->
                        <div class="pt-4 border-t border-stone-800 flex items-center justify-between flex-wrap gap-3">
                            <div class="text-xs font-mono text-stone-400">
                                Selesai membaca? Lanjutkan ke tantangan latihan di bawah.
                            </div>
                            <button type="button" onclick="document.getElementById('sec-8-exercises').scrollIntoView({ behavior: 'smooth' })" class="py-2.5 px-5 rounded-lg bg-white hover:bg-stone-200 text-stone-950 font-bold text-xs transition flex items-center gap-2 shadow-sm">
                                <span>Menuju Latihan Mandiri</span>
                                <i class="fa-solid fa-arrow-down"></i>
                            </button>
                        </div>

                    </div>
                </div>

                <!-- -------------------------------------------------------- -->
                <!-- SECTION 8: LATIHAN MANDIRI                               -->
                <!-- -------------------------------------------------------- -->
                <div id="sec-8-exercises" class="clean-card rounded-2xl border border-stoneBorder bg-stoneCard overflow-hidden scroll-mt-24">
                    <div class="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between bg-stoneCardSubtle">
                        <div class="flex items-center gap-2.5">
                            <div class="w-7 h-7 rounded-lg bg-teal-400/10 border border-teal-400/30 flex items-center justify-center text-teal-400 font-mono font-bold text-xs">
                                8
                            </div>
                            <div>
                                <h3 class="text-sm font-bold text-white tracking-wide">LATIHAN MANDIRI & TANTANGAN LAB</h3>
                                <p class="text-[11px] text-stone-400 font-mono">Tantangan Studi Kasus Mandiri & Rekomendasi Simulator</p>
                            </div>
                        </div>
                        <button type="button" onclick="toggleSectionCollapse('sec8')" class="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition">
                            <i id="sec-chevron-sec8" class="fa-solid fa-chevron-up text-xs"></i>
                        </button>
                    </div>

                    <div id="sec-content-sec8" class="p-4 sm:p-6 space-y-6">
                        
                        <!-- Challenges -->
                        <div class="space-y-4">
                            <h4 class="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider flex items-center gap-2">
                                <i class="fa-solid fa-flask-vial"></i>
                                <span>2 Soal Tantangan Praktik Mandiri</span>
                            </h4>

                            <div class="space-y-4">
                                ${(currentMateri.exercises || []).map((ex, idx) => `
                                    <div class="rounded-xl bg-stone-900/60 border border-stone-800 p-4 sm:p-5 space-y-2.5">
                                        <div class="flex items-center justify-between">
                                            <span class="font-mono text-xs font-bold px-2 py-0.5 rounded bg-teal-950 border border-teal-800 text-teal-300">
                                                TANTANGAN #${idx + 1}
                                            </span>
                                            <span class="font-mono text-[10px] text-stone-400">Tingkat Kesulitan: Sedang</span>
                                        </div>
                                        <h5 class="text-sm font-bold text-white">${ex.task}</h5>
                                        ${ex.desc ? `<p class="text-xs text-stone-300 leading-relaxed font-sans">${ex.desc}</p>` : ''}
                                        <div class="p-3 rounded-lg bg-stone-950/60 border border-stone-800/80 font-mono text-[11px] text-stone-400 flex items-start gap-2">
                                            <i class="fa-regular fa-lightbulb text-amber-400 mt-0.5 shrink-0"></i>
                                            <div>
                                                <strong class="text-stone-300">Petunjuk Pengerjaan:</strong> ${ex.hint}
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Simulator Recommendations -->
                        <div class="p-4 rounded-xl bg-stone-900/60 border border-stone-800 space-y-2">
                            <h4 class="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                                <i class="fa-solid fa-laptop-code"></i>
                                <span>Rekomendasi Lingkungan Simulator Lab</span>
                            </h4>
                            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
                                ${currentMateri.labTools.map(tool => `
                                    <div class="p-2.5 rounded bg-stone-950 border border-stone-800 text-stone-300 flex items-center gap-2">
                                        <i class="fa-solid fa-server text-stone-500 text-[10px]"></i>
                                        <span>${tool}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Completion Card -->
                        <div class="p-5 rounded-xl bg-gradient-to-r from-stone-900 via-stone-900 to-stone-950 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div class="space-y-1 text-center sm:text-left">
                                <h4 class="text-sm font-bold text-white">Selesai Menuntaskan Materi 1?</h4>
                                <p class="text-xs text-stone-400 font-sans">
                                    Simpan progres ke penyimpanan lokal dan beri masukan untuk materi berikutnya.
                                </p>
                            </div>
                            <button type="button" onclick="toggleMateriCompleted('${currentMateri.id}')" class="py-2.5 px-6 rounded-lg ${isCompleted ? 'bg-emerald-950/80 border border-emerald-700 text-emerald-300' : 'bg-white hover:bg-stone-200 text-stone-950'} font-bold text-xs transition flex items-center gap-2 shadow-sm shrink-0">
                                <i class="fa-solid ${isCompleted ? 'fa-circle-check text-emerald-400' : 'fa-check'}"></i>
                                <span>${isCompleted ? 'Materi 1 Ditandai Selesai' : 'Centang Selesai Materi 1'}</span>
                            </button>
                        </div>

                    </div>
                </div>

            </div>

            <!-- ============================================================ -->
            <!-- RIGHT COLUMN (col-span-2): STICKY ON-PAGE TABLE OF CONTENTS  -->
            <!-- ============================================================ -->
            <div class="hidden xl:block xl:col-span-2 space-y-4 sticky top-20">
                <div class="clean-card p-4 rounded-xl border border-stoneBorder bg-stoneCard space-y-3">
                    <div class="flex items-center gap-2 text-xs font-mono font-bold uppercase text-stone-400 border-b border-stone-800 pb-2">
                        <i class="fa-solid fa-list-ol text-amber-400"></i>
                        <span>Daftar Isi Section</span>
                    </div>

                    <nav class="space-y-1 font-mono text-[11px]" id="studioOnPageToc">
                        <a href="#sec-0-header" class="toc-link block px-2.5 py-1.5 rounded text-stone-400 hover:text-white hover:bg-stone-900 transition flex items-center gap-2" data-target="sec-0-header">
                            <span class="w-4 text-stone-600 font-bold">0</span>
                            <span class="truncate">Header Materi</span>
                        </a>
                        <a href="#sec-1-topology" class="toc-link block px-2.5 py-1.5 rounded text-stone-400 hover:text-white hover:bg-stone-900 transition flex items-center gap-2" data-target="sec-1-topology">
                            <span class="w-4 text-amber-500 font-bold">1</span>
                            <span class="truncate">Gambar Topologi</span>
                        </a>
                        <a href="#sec-2-objectives" class="toc-link block px-2.5 py-1.5 rounded text-stone-400 hover:text-white hover:bg-stone-900 transition flex items-center gap-2" data-target="sec-2-objectives">
                            <span class="w-4 text-sky-500 font-bold">2</span>
                            <span class="truncate">Tujuan & Skenario</span>
                        </a>
                        <a href="#sec-3-devices" class="toc-link block px-2.5 py-1.5 rounded text-stone-400 hover:text-white hover:bg-stone-900 transition flex items-center gap-2" data-target="sec-3-devices">
                            <span class="w-4 text-emerald-500 font-bold">3</span>
                            <span class="truncate">Perangkat Digunakan</span>
                        </a>
                        <a href="#sec-4-steps" class="toc-link block px-2.5 py-1.5 rounded text-stone-400 hover:text-white hover:bg-stone-900 transition flex items-center gap-2" data-target="sec-4-steps">
                            <span class="w-4 text-amber-500 font-bold">4</span>
                            <span class="truncate">Langkah Konfigurasi</span>
                        </a>
                        <a href="#sec-5-parameters" class="toc-link block px-2.5 py-1.5 rounded text-stone-400 hover:text-white hover:bg-stone-900 transition flex items-center gap-2" data-target="sec-5-parameters">
                            <span class="w-4 text-purple-500 font-bold">5</span>
                            <span class="truncate">Detail Parameter</span>
                        </a>
                        <a href="#sec-6-troubleshooting" class="toc-link block px-2.5 py-1.5 rounded text-stone-400 hover:text-white hover:bg-stone-900 transition flex items-center gap-2" data-target="sec-6-troubleshooting">
                            <span class="w-4 text-rose-500 font-bold">6</span>
                            <span class="truncate">Troubleshooting</span>
                        </a>
                        <a href="#sec-7-conclusion" class="toc-link block px-2.5 py-1.5 rounded text-stone-400 hover:text-white hover:bg-stone-900 transition flex items-center gap-2" data-target="sec-7-conclusion">
                            <span class="w-4 text-emerald-500 font-bold">7</span>
                            <span class="truncate">Kesimpulan & Best Practice</span>
                        </a>
                        <a href="#sec-8-exercises" class="toc-link block px-2.5 py-1.5 rounded text-stone-400 hover:text-white hover:bg-stone-900 transition flex items-center gap-2" data-target="sec-8-exercises">
                            <span class="w-4 text-teal-500 font-bold">8</span>
                            <span class="truncate">Latihan Mandiri</span>
                        </a>
                    </nav>
                </div>

                <!-- Fast Quick Action Widget -->
                <div class="clean-card p-4 rounded-xl border border-stoneBorder bg-stoneCard space-y-2.5 text-xs font-mono">
                    <span class="text-stone-400 font-bold uppercase text-[10px] block">Aksi Cepat</span>
                    <button type="button" onclick="window.scrollTo({ top: 0, behavior: 'smooth' })" class="w-full py-2 px-3 rounded bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 transition flex items-center justify-center gap-1.5 text-[11px]">
                        <i class="fa-solid fa-arrow-up"></i>
                        <span>Kembali ke Atas</span>
                    </button>
                    <button type="button" onclick="openTopologyZoomModal('${currentMateri.id}')" class="w-full py-2 px-3 rounded bg-stone-900 hover:bg-stone-800 text-amber-400 border border-stone-800 transition flex items-center justify-center gap-1.5 text-[11px]">
                        <i class="fa-solid fa-maximize"></i>
                        <span>Zoom Topologi</span>
                    </button>
                </div>
            </div>

        </div>
    `;

    // Initialize ScrollSpy for TOC
    initStudioScrollSpy();

    // Reapply collapsed state if any
    Object.keys(collapsedSectionsMap).forEach(secId => {
        if (collapsedSectionsMap[secId]) {
            const content = document.getElementById(`sec-content-${secId}`);
            const icon = document.getElementById(`sec-chevron-${secId}`);
            if (content) content.classList.add('hidden');
            if (icon) icon.className = 'fa-solid fa-chevron-down text-stone-400 text-xs transition-transform';
        }
    });

    // Sync all global progress bars
    updateGlobalLearningProgress();
}

function initStudioScrollSpy() {
    const links = document.querySelectorAll('#studioOnPageToc .toc-link');
    if (!links || links.length === 0) return;

    const onScroll = () => {
        const scrollPos = window.scrollY + 120;
        let activeFound = false;

        links.forEach(link => {
            const targetId = link.getAttribute('data-target');
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                const top = targetEl.offsetTop;
                const height = targetEl.offsetHeight;

                if (scrollPos >= top && scrollPos < top + height) {
                    links.forEach(l => {
                        l.classList.remove('bg-amber-400/10', 'text-amber-300', 'font-bold', 'border', 'border-amber-500/30');
                        l.classList.add('text-stone-400');
                    });
                    link.classList.add('bg-amber-400/10', 'text-amber-300', 'font-bold', 'border', 'border-amber-500/30');
                    link.classList.remove('text-stone-400');
                    activeFound = true;
                }
            }
        });
    };

    window.removeEventListener('scroll', window.__studioScrollSpyHandler);
    window.__studioScrollSpyHandler = onScroll;
    window.addEventListener('scroll', onScroll, { passive: true });
}

// Backward Compatibility Aliases for Legacy Calls
function renderCoursePlayer() {
    renderStandardizedCourseStudio(currentStudioMateriId);
}

function jumpToCourseMateri(num) {
    if (num === 1) {
        selectStudioMateri('mikrotik-01-routing');
    }
}

function togglePlayerMateriStatus() {
    toggleMateriCompleted('mikrotik-01-routing');
}

function nextCourseMateri(markDone) {
    if (markDone) {
        const list = getStandardizedCourseProgress();
        if (!list.includes('mikrotik-01-routing')) {
            list.push('mikrotik-01-routing');
            saveStandardizedCourseProgress(list);
        }
    }
    renderStandardizedCourseStudio('mikrotik-01-routing');
    showToastNotification('Pemberitahuan Kurikulum', 'Materi 1 adalah golden reference. Silakan review dan approve sebelum materi berikutnya diaktifkan.');
}

function prevCourseMateri() {
    renderStandardizedCourseStudio('mikrotik-01-routing');
}

function copyCurrentCourseCli() {
    if (typeof STANDARDIZED_COURSE_DATA !== 'undefined' && STANDARDIZED_COURSE_DATA[0]) {
        copyTextToClipboard(STANDARDIZED_COURSE_DATA[0].fullConfig.r1.script, 'Konfigurasi R1-Core MikroTik berhasil disalin!');
    }
}

function renderSimulatorViewer() {
    renderStandardizedCourseStudio(currentStudioMateriId);
}
