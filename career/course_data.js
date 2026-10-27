/**
 * AAMON Network Academy & Continuous Learning Studio
 * Standardized Curriculum Data Module
 * Compliant with Master Specification (Sections 0 to 8)
 */

const STANDARDIZED_COURSE_DATA = [
    {
        id: "mikrotik-01-routing",
        order: 1,
        title: "Routing: Static & Default Route",
        category: "MikroTik MTCNA",
        vendor: "MikroTik",
        osVersion: "RouterOS v7.14+",
        level: "Dasar",
        estimatedMinutes: 35,
        prerequisites: [],
        topology: {
            svg: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 360" width="100%" height="360" class="w-full max-w-5xl select-none">
    <!-- Background Frame -->
    <rect width="960" height="360" rx="12" fill="#0c0a09" stroke="#292524" stroke-width="1.5" />
    
    <!-- Top Bar -->
    <rect width="960" height="34" rx="12" fill="#181614" />
    <rect y="26" width="960" height="8" fill="#181614" />
    <line x1="0" y1="34" x2="960" y2="34" stroke="#292524" stroke-width="1" />
    <circle cx="22" cy="17" r="4.5" fill="#ef4444" opacity="0.8" />
    <circle cx="36" cy="17" r="4.5" fill="#f59e0b" opacity="0.8" />
    <circle cx="50" cy="17" r="4.5" fill="#10b981" opacity="0.8" />
    <text x="70" y="21" fill="#e7e5e4" font-family="monospace" font-size="11" font-weight="bold">[TOPOLOGY LAB] MikroTik Static &amp; Default Route Inter-Branch Lab</text>
    <text x="940" y="21" text-anchor="end" fill="#34d399" font-family="monospace" font-size="10" font-weight="bold">[OK] STATUS: LINK ACTIVE (1Gbps FDX)</text>

    <!-- Background Grid Dots -->
    <g opacity="0.15">
        <circle cx="100" cy="80" r="1" fill="#78716c"/><circle cx="200" cy="80" r="1" fill="#78716c"/><circle cx="300" cy="80" r="1" fill="#78716c"/><circle cx="400" cy="80" r="1" fill="#78716c"/><circle cx="500" cy="80" r="1" fill="#78716c"/><circle cx="600" cy="80" r="1" fill="#78716c"/><circle cx="700" cy="80" r="1" fill="#78716c"/><circle cx="800" cy="80" r="1" fill="#78716c"/><circle cx="900" cy="80" r="1" fill="#78716c"/>
        <circle cx="100" cy="160" r="1" fill="#78716c"/><circle cx="200" cy="160" r="1" fill="#78716c"/><circle cx="300" cy="160" r="1" fill="#78716c"/><circle cx="400" cy="160" r="1" fill="#78716c"/><circle cx="500" cy="160" r="1" fill="#78716c"/><circle cx="600" cy="160" r="1" fill="#78716c"/><circle cx="700" cy="160" r="1" fill="#78716c"/><circle cx="800" cy="160" r="1" fill="#78716c"/><circle cx="900" cy="160" r="1" fill="#78716c"/>
        <circle cx="100" cy="240" r="1" fill="#78716c"/><circle cx="200" cy="240" r="1" fill="#78716c"/><circle cx="300" cy="240" r="1" fill="#78716c"/><circle cx="400" cy="240" r="1" fill="#78716c"/><circle cx="500" cy="240" r="1" fill="#78716c"/><circle cx="600" cy="240" r="1" fill="#78716c"/><circle cx="700" cy="240" r="1" fill="#78716c"/><circle cx="800" cy="240" r="1" fill="#78716c"/><circle cx="900" cy="240" r="1" fill="#78716c"/>
    </g>

    <!-- LINK 1: ISP Cloud <-> R1-Core (Default Route) -->
    <line x1="160" y1="130" x2="380" y2="130" stroke="#fbbf24" stroke-width="3" stroke-linecap="round" />
    <line x1="160" y1="130" x2="380" y2="130" stroke="#fbbf24" stroke-width="3" stroke-dasharray="6,4">
        <animate attributeName="stroke-dashoffset" from="30" to="0" dur="1.4s" repeatCount="indefinite" />
    </line>

    <!-- LINK 2: R1-Core <-> R2-Branch (Point-to-Point Subnet /30) -->
    <line x1="470" y1="130" x2="710" y2="130" stroke="#38bdf8" stroke-width="3.5" stroke-linecap="round" />
    <line x1="470" y1="130" x2="710" y2="130" stroke="#38bdf8" stroke-width="3.5" stroke-dasharray="8,6">
        <animate attributeName="stroke-dashoffset" from="42" to="0" dur="1.8s" repeatCount="indefinite" />
    </line>

    <!-- LINK 3: R1-Core <-> PC-HQ (LAN Subnet /24) -->
    <line x1="425" y1="160" x2="425" y2="250" stroke="#34d399" stroke-width="2.5" stroke-linecap="round" />

    <!-- LINK 4: R2-Branch <-> PC-Branch (LAN Subnet /24) -->
    <line x1="755" y1="160" x2="755" y2="250" stroke="#34d399" stroke-width="2.5" stroke-linecap="round" />

    <!-- Link Badges & Annotations -->
    <!-- ISP to R1 Badge -->
    <rect x="210" y="104" width="125" height="18" rx="4" fill="#09090b" stroke="#fbbf24" stroke-width="1.2" />
    <text x="272" y="117" text-anchor="middle" fill="#fbbf24" font-family="monospace" font-size="9" font-weight="bold">0.0.0.0/0 (Dist=1)</text>

    <rect x="170" y="138" width="80" height="15" rx="3" fill="#1c1917" stroke="#44403c" />
    <text x="210" y="149" text-anchor="middle" fill="#a8a29e" font-family="monospace" font-size="8.5">GW: 103.28.12.49</text>

    <rect x="300" y="138" width="75" height="15" rx="3" fill="#1c1917" stroke="#44403c" />
    <text x="337" y="149" text-anchor="middle" fill="#a8a29e" font-family="monospace" font-size="8.5">ether1 (.50/29)</text>

    <!-- P2P R1 to R2 Badge -->
    <rect x="525" y="98" width="130" height="20" rx="4" fill="#082f49" stroke="#38bdf8" stroke-width="1.2" />
    <text x="590" y="112" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="9.5" font-weight="bold">P2P: 10.0.0.0/30</text>

    <rect x="520" y="142" width="140" height="18" rx="3" fill="#3b0764" stroke="#c084fc" stroke-width="1" />
    <text x="590" y="154" text-anchor="middle" fill="#e9d5ff" font-family="monospace" font-size="8.5">Static: 192.168.10.0/24 -&gt; .2</text>

    <rect x="475" y="118" width="46" height="16" rx="3" fill="#1c1917" stroke="#44403c" />
    <text x="498" y="130" text-anchor="middle" fill="#7dd3fc" font-family="monospace" font-size="8.5">ether2</text>

    <rect x="660" y="118" width="46" height="16" rx="3" fill="#1c1917" stroke="#44403c" />
    <text x="683" y="130" text-anchor="middle" fill="#7dd3fc" font-family="monospace" font-size="8.5">ether1</text>

    <!-- LAN Interface Badges -->
    <rect x="432" y="180" width="80" height="15" rx="3" fill="#1c1917" stroke="#44403c" />
    <text x="472" y="191" text-anchor="middle" fill="#6ee7b7" font-family="monospace" font-size="8.5">ether3 (.88.1)</text>

    <rect x="762" y="180" width="80" height="15" rx="3" fill="#1c1917" stroke="#44403c" />
    <text x="802" y="191" text-anchor="middle" fill="#6ee7b7" font-family="monospace" font-size="8.5">ether2 (.10.1)</text>

    <!-- NODE 1: ISP Cloud Gateway -->
    <g transform="translate(110, 130)">
        <path d="M -35 15 A 22 22 0 0 1 -28 -18 A 30 30 0 0 1 20 -24 A 26 26 0 0 1 45 -4 A 22 22 0 0 1 38 20 A 24 24 0 0 1 -15 22 Z" fill="#1e1b4b" stroke="#818cf8" stroke-width="2" />
        <text x="0" y="2" text-anchor="middle" fill="#c7d2fe" font-family="sans-serif" font-size="11" font-weight="bold">ISP CLOUD</text>
        <text x="0" y="38" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">Gateway Provider</text>
        <text x="0" y="52" text-anchor="middle" fill="#a5b4fc" font-family="monospace" font-size="9.5">103.28.12.49/29</text>
    </g>

    <!-- NODE 2: R1-Core (RB4011) -->
    <g transform="translate(425, 130)">
        <rect x="-48" y="-30" width="96" height="60" rx="8" fill="#1c1917" stroke="#fbbf24" stroke-width="2" />
        <circle cx="0" cy="-3" r="17" fill="#292524" stroke="#78716c" />
        <path d="M -10 -3 L 10 -3 M 0 -13 L 0 7 M 10 -3 L 6 -7 M 10 -3 L 6 1" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" />
        <circle cx="-32" cy="18" r="3" fill="#34d399" />
        <circle cx="-22" cy="18" r="3" fill="#34d399" />
        <circle cx="-12" cy="18" r="3" fill="#38bdf8" />
        <text x="0" y="44" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="12" font-weight="bold">R1-Core (HQ)</text>
        <text x="0" y="58" text-anchor="middle" fill="#fbbf24" font-family="monospace" font-size="10">RB4011iGS+RM</text>
        <text x="0" y="71" text-anchor="middle" fill="#a8a29e" font-family="monospace" font-size="9">RouterOS v7.14</text>
    </g>

    <!-- NODE 3: R2-Branch (hEX S) -->
    <g transform="translate(755, 130)">
        <rect x="-48" y="-30" width="96" height="60" rx="8" fill="#1c1917" stroke="#38bdf8" stroke-width="2" />
        <circle cx="0" cy="-3" r="17" fill="#292524" stroke="#78716c" />
        <path d="M -10 -3 L 10 -3 M 0 -13 L 0 7 M -10 -3 L -6 -7 M -10 -3 L -6 1" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />
        <circle cx="-32" cy="18" r="3" fill="#34d399" />
        <circle cx="-22" cy="18" r="3" fill="#34d399" />
        <text x="0" y="44" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="12" font-weight="bold">R2-Branch</text>
        <text x="0" y="58" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="10">hEX S (RB760iGS)</text>
        <text x="0" y="71" text-anchor="middle" fill="#a8a29e" font-family="monospace" font-size="9">RouterOS v7.14</text>
    </g>

    <!-- NODE 4: PC-HQ -->
    <g transform="translate(425, 275)">
        <rect x="-30" y="-20" width="60" height="38" rx="5" fill="#1c1917" stroke="#34d399" stroke-width="1.8" />
        <rect x="-25" y="-16" width="50" height="25" rx="2" fill="#064e3b" />
        <path d="M -8 18 L 8 18 L 12 26 L -12 26 Z" fill="#292524" />
        <text x="0" y="42" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="10.5" font-weight="bold">PC-HQ (Staff)</text>
        <text x="0" y="55" text-anchor="middle" fill="#6ee7b7" font-family="monospace" font-size="9.5">192.168.88.50/24</text>
        <text x="0" y="67" text-anchor="middle" fill="#a8a29e" font-family="monospace" font-size="8.5">GW: 192.168.88.1</text>
    </g>

    <!-- NODE 5: PC-Branch -->
    <g transform="translate(755, 275)">
        <rect x="-30" y="-20" width="60" height="38" rx="5" fill="#1c1917" stroke="#34d399" stroke-width="1.8" />
        <rect x="-25" y="-16" width="50" height="25" rx="2" fill="#064e3b" />
        <path d="M -8 18 L 8 18 L 12 26 L -12 26 Z" fill="#292524" />
        <text x="0" y="42" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="10.5" font-weight="bold">PC-Branch (User)</text>
        <text x="0" y="55" text-anchor="middle" fill="#6ee7b7" font-family="monospace" font-size="9.5">192.168.10.50/24</text>
        <text x="0" y="67" text-anchor="middle" fill="#a8a29e" font-family="monospace" font-size="8.5">GW: 192.168.10.1</text>
    </g>
</svg>
            `,
            legend: [
                { color: "#fbbf24", label: "Default Route 0.0.0.0/0 (Internet Uplink)" },
                { color: "#38bdf8", label: "Point-to-Point Inter-Router Subnet (10.0.0.0/30)" },
                { color: "#34d399", label: "Local LAN Subnet (/24)" },
                { color: "#c084fc", label: "Static Route Inter-Branch Subnet" }
            ],
            alt: "Topologi Laboratorium Static & Default Route MikroTik RouterOS v7 antara R1-Core HQ dan R2-Branch"
        },
        objectives: [
            "Memahami prinsip kerja tabel perutean (Routing Table) dan Forwarding Information Base (FIB) di RouterOS v7.",
            "Mengonfigurasi rute default 0.0.0.0/0 pada R1-Core untuk menghubungkan gateway kantor ke Internet ISP.",
            "Mengonfigurasi rute statis dua arah (Inter-Branch Routing) antara R1-Core HQ dan R2-Branch.",
            "Menerapkan parameter verifikasi Distance (Administrative Distance), Scope, Target-Scope, dan validasi status active route."
        ],
        problemSolved: "Dua jaringan lokal (LAN Kantor Pusat 192.168.88.0/24 dan LAN Kantor Cabang 192.168.10.0/24) yang terhubung fisik melalui kabel antar-router tidak dapat saling berkirim paket karena router belum mengetahui rute menuju subnet di seberangnya (unreachable). Selain itu, komputer LAN tidak bisa mengakses internet tanpa adanya Default Gateway 0.0.0.0/0.",
        realWorldUse: "Kasus Nyata ISP & Enterprise: Kantor Pusat (HQ Surabaya) dan Kantor Cabang (Branch Sidoarjo) terhubung via link transmisi wireless/fiber optic point-to-point. R1-Core di HQ memegang link internet utama dari ISP dan mendistribusikan konektivitas ke R2-Branch. Seluruh traffic antar-kantor di-route secara privat tanpa NAT, sedangkan traffic internet cabang diteruskan melalui default route R1-Core untuk sentralisasi filtering keamanan.",
        devices: [
            {
                name: "R1-Core",
                model: "MikroTik RB4011iGS+RM",
                type: "Router Core / Gateway Utama",
                role: "Gateway Utama HQ, ISP BGP/Static Edge, & Router Inter-Branch Master",
                specs: "Quad-Core 1.4GHz Alpine AL21400 CPU, 1GB RAM, 10x Gigabit Ethernet (10/100/1000), 1x SFP+ 10Gbps, RouterOS v7 (Level 5 License)",
                image: "assets/devices/mikrotik/rb4011.webp",
                imageSource: {
                    name: "mikrotik.com official product catalog",
                    url: "https://mikrotik.com/product/rb4011igs_rm"
                },
                alternatives: ["MikroTik RB5009UG+S+IN", "MikroTik CCR2004-16G-2S+", "MikroTik CHR (Cloud Hosted Router) di EVE-NG"]
            },
            {
                name: "R2-Branch",
                model: "MikroTik hEX S (RB760iGS)",
                type: "Branch Router / CPE Edge",
                role: "Gateway Kantor Cabang, Local DHCP Server, & Forwarder ke HQ",
                specs: "Dual-Core 880MHz MT7621A CPU (4 threads), 256MB RAM, 5x Gigabit Ethernet, 1x SFP 1.25G, RouterOS v7 (Level 4 License)",
                image: "assets/devices/mikrotik/hex_s.webp",
                imageSource: {
                    name: "mikrotik.com official product catalog",
                    url: "https://mikrotik.com/product/hex_s"
                },
                alternatives: ["MikroTik hEX (RB750Gr3)", "MikroTik L009UiGS-RM", "MikroTik CHR Lab Instance"]
            },
            {
                name: "ISP-Gateway",
                model: "Provider Edge Carrier Router",
                type: "Carrier Uplink Router",
                role: "Internet Gateway Public ISP (Next-Hop 103.28.12.49/29)",
                specs: "Carrier Grade Core Router (Ilustrasi Cloud Gateway)",
                image: "", // Generic SVG Illustration
                imageSource: {
                    name: "Ilustrasi Standar Jaringan",
                    url: "#"
                },
                alternatives: ["Modem GPON Telkom/Biznet Bridge Mode", "Upstream Mikrotik CCR"]
            }
        ],
        steps: [
            {
                no: 1,
                title: "Konfigurasi Identitas & IP Address di R1-Core",
                goal: "Memberi nama host perangkat dan menetapkan alamat IP pada interface WAN ke ISP, link P2P ke Cabang, dan LAN lokal HQ.",
                targetDevice: "R1-Core (HQ Surabaya)",
                commands: `/system identity set name="R1-Core"\n/ip address add address=103.28.12.50/29 interface=ether1 comment="WAN Uplink ISP"\n/ip address add address=10.0.0.1/30 interface=ether2 comment="P2P Link to R2-Branch"\n/ip address add address=192.168.88.1/24 interface=ether3 comment="LAN Subnet HQ"`,
                explanation: [
                    { line: `/system identity set name="R1-Core"`, why: "Mengubah nama router dari default 'MikroTik' agar mudah dibedakan saat remote SSH/Winbox multi-perangkat." },
                    { line: `address=103.28.12.50/29 interface=ether1`, why: "Menetapkan IP publik yang diberikan ISP. Subnet /29 menyediakan 6 IP usable (.49 s/d .54), di mana .49 adalah IP gateway ISP." },
                    { line: `address=10.0.0.1/30 interface=ether2`, why: "Subnet point-to-point /30 efisien hanya memuat 2 host usable (.1 untuk R1 dan .2 untuk R2), menghemat ruang IP." },
                    { line: `address=192.168.88.1/24 interface=ether3`, why: "Menetapkan default gateway untuk komputer dan server di LAN Kantor Pusat." }
                ],
                checkpoint: {
                    command: "/ip address print",
                    expected: "Muncul 3 baris alamat IP dengan status interface running (R) dan flag D (Dynamic=no)."
                },
                warning: "Pastikan kabel fisik dicolokkan ke port yang sesuai (ether1 ke ISP, ether2 ke R2, ether3 ke Switch LAN)."
            },
            {
                no: 2,
                title: "Konfigurasi Identitas & IP Address di R2-Branch",
                goal: "Memberi nama host router cabang dan menetapkan alamat IP pada interface P2P serta interface LAN lokal cabang.",
                targetDevice: "R2-Branch (Cabang Sidoarjo)",
                commands: `/system identity set name="R2-Branch"\n/ip address add address=10.0.0.2/30 interface=ether1 comment="P2P Link to R1-Core"\n/ip address add address=192.168.10.1/24 interface=ether2 comment="LAN Subnet Branch"`,
                explanation: [
                    { line: `/system identity set name="R2-Branch"`, why: "Mengidentifikasi router sebagai gerbang utama kantor cabang Sidoarjo." },
                    { line: `address=10.0.0.2/30 interface=ether1`, why: "IP pasangan point-to-point yang berada dalam satu subnet /30 dengan 10.0.0.1 di R1." },
                    { line: `address=192.168.10.1/24 interface=ether2`, why: "Subnet LAN cabang (192.168.10.0/24), berbeda dari subnet HQ (192.168.88.0/24) agar tidak terjadi konflik routing." }
                ],
                checkpoint: {
                    command: "/tool ping count=3 10.0.0.1",
                    expected: "3 packets transmitted, 3 received, 0% packet loss, RTT < 1ms (koneksi fisik antar-router sudah tersambung)."
                },
                warning: "Jika ping gagal, periksa indikator LED port ether1 di R2 dan ether2 di R1 apakah menyala hijau."
            },
            {
                no: 3,
                title: "Konfigurasi Default Route di R1-Core Menuju Internet Gateway ISP",
                goal: "Membuka rute keluar ke internet global dengan mengarahkan seluruh lalu lintas yang tidak diketahui (0.0.0.0/0) ke gateway ISP.",
                targetDevice: "R1-Core (HQ Surabaya)",
                commands: `/ip route add dst-address=0.0.0.0/0 gateway=103.28.12.49 distance=1 check-gateway=ping comment="Default Route to ISP"`,
                explanation: [
                    { line: `dst-address=0.0.0.0/0`, why: "Notasi rute default (Route of Last Resort) yang mencakup seluruh alamat IPv4 di dunia." },
                    { line: `gateway=103.28.12.49`, why: "Alamat IP nexthop router ISP yang terhubung langsung pada interface ether1." },
                    { line: `distance=1`, why: "Administrative Distance prioritas utama. Rute statis dengan distance 1 akan aktif di tabel FIB." },
                    { line: `check-gateway=ping`, why: "RouterOS mengirim ICMP ping tiap 10 detik ke gateway. Jika gateway down (2x timeout), rute otomatis dinonaktifkan." }
                ],
                checkpoint: {
                    command: "/ip route print detail where dst-address=0.0.0.0/0",
                    expected: "Status rute bertanda flag 'As' (Active, Static) dan gateway '103.28.12.49 reachable via ether1'."
                },
                warning: "Pada media Ethernet broadcast, WAJIB menggunakan alamat IP gateway (103.28.12.49), JANGAN hanya nama interface (ether1) agar tidak memicu ARP broadcast storm."
            },
            {
                no: 4,
                title: "Konfigurasi Static Route di R1-Core Menuju Subnet Cabang",
                goal: "Memberitahu tabel routing R1-Core bahwa subnet LAN Cabang (192.168.10.0/24) berada di balik router R2-Branch (10.0.0.2).",
                targetDevice: "R1-Core (HQ Surabaya)",
                commands: `/ip route add dst-address=192.168.10.0/24 gateway=10.0.0.2 distance=1 comment="Static Route to Branch LAN"`,
                explanation: [
                    { line: `dst-address=192.168.10.0/24`, why: "Subnet LAN tujuan di kantor cabang yang ingin dijangkau oleh staff di kantor pusat." },
                    { line: `gateway=10.0.0.2`, why: "Alamat IP interface P2P R2-Branch yang bertindak sebagai pintu gerbang (nexthop) menuju subnet cabang." }
                ],
                checkpoint: {
                    command: "/ip route print detail where dst-address=192.168.10.0/24",
                    expected: "Status rute bertanda flag 'As' dan gateway '10.0.0.2 reachable via ether2'."
                },
                warning: "Tanpa rute ini, R1-Core akan membuang paket untuk 192.168.10.0/24 ke gateway ISP (0.0.0.0/0) yang berakibat paket hilang (blackhole)."
            },
            {
                no: 5,
                title: "Konfigurasi Default Route di R2-Branch Menuju R1-Core",
                goal: "Mengarahkan seluruh lalu lintas keluar dari kantor cabang (baik ke HQ maupun ke Internet) menuju R1-Core.",
                targetDevice: "R2-Branch (Cabang Sidoarjo)",
                commands: `/ip route add dst-address=0.0.0.0/0 gateway=10.0.0.1 distance=1 check-gateway=ping comment="Default Route to HQ Core"`,
                explanation: [
                    { line: `dst-address=0.0.0.0/0`, why: "Mencakup semua tujuan ke luar cabang." },
                    { line: `gateway=10.0.0.1`, why: "IP R1-Core. Dengan rute default ini, R2-Branch otomatis dapat menjangkau LAN HQ (192.168.88.0/24) dan sekaligus menjangkau internet luar melalui R1-Core tanpa perlu menambah rute statis terpisah." }
                ],
                checkpoint: {
                    command: "/tool ping count=3 192.168.88.1",
                    expected: "Ping dari R2-Branch ke IP gateway LAN HQ berhasil 100%, 0% packet loss."
                },
                warning: "Pastikan interface P2P ether1 di R2 tidak dipasang firewall drop yang memblokir ICMP."
            },
            {
                no: 6,
                title: "Konfigurasi NAT Masquerade & DNS di R1-Core",
                goal: "Mengaktifkan translasi Network Address Translation (NAT) agar client dari subnet HQ dan Cabang dapat mengakses internet bersama.",
                targetDevice: "R1-Core (HQ Surabaya)",
                commands: `/ip dns set allow-remote-requests=yes servers=1.1.1.1,8.8.8.8\n/ip firewall nat add chain=srcnat out-interface=ether1 action=masquerade comment="NAT Masquerade to Internet"`,
                explanation: [
                    { line: `/ip dns set allow-remote-requests=yes servers=1.1.1.1,8.8.8.8`, why: "Mengaktifkan DNS resolver lokal router dengan upstream Cloudflare dan Google DNS." },
                    { line: `chain=srcnat out-interface=ether1 action=masquerade`, why: "Mentranslasikan IP privat dari 192.168.88.0/24 dan 192.168.10.0/24 menjadi IP publik 103.28.12.50 saat keluar melalui interface ether1 menuju internet." }
                ],
                checkpoint: {
                    command: "/tool ping count=3 1.1.1.1 src-address=192.168.88.1",
                    expected: "3 packets transmitted, 3 received, 0% packet loss (R1-Core dan client LAN berhasil tembus ke internet)."
                },
                warning: "PERINGATAN KEAMANAN: Karena mengaktifkan allow-remote-requests=yes, port 53 UDP/TCP WAJIB ditutup dari interface WAN ether1 di firewall filter input agar tidak dijadikan open DNS resolver."
            }
        ],
        fullConfig: [
            {
                device: "R1-Core",
                commands: `/system identity set name="R1-Core"\n/ip address add address=103.28.12.50/29 interface=ether1 comment="WAN Uplink ISP"\n/ip address add address=10.0.0.1/30 interface=ether2 comment="P2P Link to R2-Branch"\n/ip address add address=192.168.88.1/24 interface=ether3 comment="LAN Subnet HQ"\n/ip route add dst-address=0.0.0.0/0 gateway=103.28.12.49 distance=1 check-gateway=ping comment="Default Route to ISP"\n/ip route add dst-address=192.168.10.0/24 gateway=10.0.0.2 distance=1 comment="Static Route to Branch LAN"\n/ip dns set allow-remote-requests=yes servers=1.1.1.1,8.8.8.8\n/ip firewall nat add chain=srcnat out-interface=ether1 action=masquerade comment="NAT Masquerade to Internet"`
            },
            {
                device: "R2-Branch",
                commands: `/system identity set name="R2-Branch"\n/ip address add address=10.0.0.2/30 interface=ether1 comment="P2P Link to R1-Core"\n/ip address add address=192.168.10.1/24 interface=ether2 comment="LAN Subnet Branch"\n/ip route add dst-address=0.0.0.0/0 gateway=10.0.0.1 distance=1 check-gateway=ping comment="Default Route to HQ Core"`
            }
        ],
        parameters: [
            {
                name: "dst-address",
                function: "Alamat IP atau subnet jaringan tujuan paket yang ingin dicapai.",
                example: "0.0.0.0/0 atau 192.168.10.0/24",
                default: "none (wajib diisi)",
                note: "0.0.0.0/0 berarti semua tujuan (Default Route). Jangan sampai salah mengetik panjang prefix CIDR."
            },
            {
                name: "gateway",
                function: "Alamat IP next-hop perangkat router berikutnya yang bertugas meneruskan paket.",
                example: "10.0.0.2 atau 103.28.12.49",
                default: "none (wajib diisi)",
                note: "Pada media Ethernet broadcast, WAJIB menggunakan alamat IP next-hop, jangan hanya nama interface agar tidak memicu ARP request massal."
            },
            {
                name: "distance",
                function: "Nilai Administrative Distance (metrik penentu prioritas rute jika ada rute ganda).",
                example: "1 (Primary) / 2 (Backup)",
                default: "1 (untuk static route)",
                note: "Rute dengan distance terendah yang akan aktif di routing table. Nilai 255 berarti rute ditolak/unreachable."
            },
            {
                name: "check-gateway",
                function: "Mekanisme pengujian kesehatan link gateway secara periodik.",
                example: "ping",
                default: "none",
                note: "Mengirim probe ICMP Ping tiap 10 detik. Jika 2x gagal berturut-turut, status rute dinonaktifkan otomatis."
            },
            {
                name: "scope",
                function: "Nilai kedalaman resolusi nexthop rute (digunakan pada recursive routing).",
                example: "10",
                default: "30",
                note: "Scope rute default harus bernilai sama atau lebih kecil dari target-scope rute host monitor."
            },
            {
                name: "target-scope",
                function: "Batas maksimum scope rute lain yang dapat dijangkau untuk meresolusi nexthop rekursif.",
                example: "10 (standar) / 11 (rekursif)",
                default: "10",
                note: "Jika target-scope lebih kecil dari scope gateway yang dituju, rute akan berstatus unreachable."
            },
            {
                name: "routing-table",
                function: "Menentukan tabel perutean VRF atau Policy Routing tempat rute ini didaftarkan.",
                example: "main",
                default: "main",
                note: "Pada RouterOS v7, tabel routing selain 'main' harus dibuat terlebih dahulu di menu /routing table."
            }
        ],
        verification: [
            {
                command: "/ip route print detail where active=yes",
                expectedOutput: `Flags: D - DYNAMIC; A - ACTIVE; c - CONNECT, s - STATIC, v - VPN
Columns: DST-ADDRESS, GATEWAY, DISTANCE
#     DST-ADDRESS       GATEWAY            DISTANCE
0  As 0.0.0.0/0         103.28.12.49              1
1  As 192.168.10.0/24   10.0.0.2                  1
2 DAc 10.0.0.0/30       ether2                    0
3 DAc 103.28.12.48/29   ether1                    0
4 DAc 192.168.88.0/24   ether3                    0`
            },
            {
                command: "/tool traceroute 192.168.10.50 src-address=192.168.88.50",
                expectedOutput: `# ADDRESS      LOSS SENT LAST     AVG  BEST WORST STD-DEV STATUS
1 192.168.88.1   0%    3 0.2ms   0.2ms 0.2ms 0.3ms     0.1
2 10.0.0.2       0%    3 0.8ms   0.7ms 0.6ms 0.9ms     0.1
3 192.168.10.50  0%    3 1.1ms   1.0ms 0.9ms 1.2ms     0.1`
            },
            {
                command: "/ip route check 8.8.8.8",
                expectedOutput: `status: ok
interface: ether1
nexthop: 103.28.12.49`
            }
        ],
        troubleshooting: [
            {
                symptom: "Status rute di Winbox berwarna biru miring dengan keterangan 'unreachable' dan tidak ada flag 'A' (Active).",
                cause: "Alamat IP gateway yang dimasukkan salah ketik, interface fisik down/kabel tercabut, atau gateway berada di subnet yang berbeda dengan IP lokal router.",
                check: "Jalankan '/ip address print' untuk memastikan interface router memiliki IP yang satu subnet dengan gateway. Cek status fisik port via '/interface print'.",
                fix: "Perbaiki nilai gateway agar se-subnet dengan IP lokal terhubung, dan pastikan kabel fisik tersambung serta link status 'running'."
            },
            {
                symptom: "Komputer di Cabang bisa ping ke gateway R1 (10.0.0.1) tetapi tidak bisa ping ke PC HQ (192.168.88.50).",
                cause: "Asymmetric routing drop atau rute balik belum dibuat di R1-Core, atau Windows Defender Firewall di PC HQ memblokir ICMP echo request dari luar subnetnya.",
                check: "Lakukan '/tool sniffer quick ip-address=192.168.10.50' di R1-Core. Jika paket request masuk lewat ether2 tapi tidak ada paket reply, periksa tabel rute R1 atau firewall host.",
                fix: "Pastikan static route balik ke 192.168.10.0/24 via 10.0.0.2 sudah terpasang di R1-Core, dan izinkan ICMPv4 Inbound pada firewall PC target."
            },
            {
                symptom: "Muncul pesan error 'TTL Expired in Transit' saat melakukan ping atau traceroute antar subnet.",
                cause: "Terjadi Routing Loop. R1-Core melempar paket ke R2-Branch, namun R2-Branch melempar kembali paket tersebut ke R1-Core secara berulang-ulang hingga TTL=0.",
                check: "Jalankan '/tool traceroute <ip-tujuan>' dan perhatikan nomor hop. Jika hop 1 dan hop 2 berulang antara 10.0.0.1 dan 10.0.0.2, dipastikan terjadi routing loop.",
                fix: "Periksa kembali subnet mask di kedua router. Pastikan rute statis lebih spesifik (misal /24) dibanding rute default (0.0.0.0/0)."
            },
            {
                symptom: "Rute default sering flapping (berubah aktif-mati tiap beberapa puluh detik) padahal link ISP tidak putus.",
                cause: "Fitur 'check-gateway=ping' gagal menerima balasan ICMP karena upstream provider me-rate-limit atau memblokir paket ping yang terlalu sering.",
                check: "Amati log sistem via '/log print where topics~\"route\"'. Cari pesan berulang 'gateway down' dan 'gateway up'.",
                fix: "Ganti parameter menjadi 'check-gateway=arp' atau hilangkan check-gateway jika gateway ISP tidak mengizinkan ICMP probe periodik."
            }
        ],
        rollback: `Cara Rollback Cepat:\n1. Safe Mode: Selalu aktifkan Safe Mode (Ctrl+X di CLI atau klik tombol Safe Mode [F4] di Winbox) SEBELUM mengubah rute. Jika Anda terputus dari router, sistem otomatis membatalkan konfigurasi dalam hitungan detik.\n2. Manual CLI Revert:\n   /ip route remove [find comment="Default Route to ISP"]\n   /ip route remove [find comment="Static Route to Branch LAN"]\n3. System Backup Rollback:\n   /system backup load name="before_routing_change.backup"`,
        conclusion: {
            summary: [
                "Static routing adalah metode perutean manual paling efisien tanpa overhead CPU/RAM untuk topologi jaringan kecil hingga menengah.",
                "Default Route (0.0.0.0/0) adalah kunci agar client jaringan lokal dapat menjangkau internet global melalui gateway ISP.",
                "Pada media broadcast Ethernet, gateway WAJIB berupa alamat IP next-hop, BUKAN nama interface.",
                "Parameter check-gateway=ping memberikan mekanisme failover otomatis tanpa memerlukan scripting kompleks."
            ],
            do: [
                "Selalu gunakan Safe Mode (F4) sebelum mengeksekusi perubahan tabel rute via remote.",
                "Beri label 'comment' pada setiap rute statis untuk memudahkan dokumentasi tim operasional.",
                "Gunakan subnet mask /30 atau /31 untuk link point-to-point antar router guna menghemat alokasi IP."
            ],
            dont: [
                "JANGAN mengarahkan rute default ke interface fisik Ethernet tanpa next-hop IP (misal gateway=ether1).",
                "JANGAN menggunakan subnet yang sama pada dua lokasi cabang yang berbeda (menghindari IP overlap).",
                "JANGAN membiarkan port DNS (UDP 53) terbuka ke publik WAN saat mengaktifkan DNS cache."
            ],
            security: [
                "Terapkan rule firewall filter input untuk membatasi akses Winbox (port 8291) dan SSH (port 22) hanya dari IP manajemen lokal.",
                "Nonaktifkan interface discovery (MNDP/CDP) pada port WAN ether1 yang menghadap langsung ke publik."
            ]
        },
        exercises: [
            {
                task: "Tantangan 1: Konfigurasi Floating Static Route (Backup Link)",
                hint: "Hubungkan kabel kedua antara R1-Core (ether4) dan R2-Branch (ether3) dengan subnet 10.0.1.0/30. Buat rute cadangan di R2 menuju HQ dengan gateway 10.0.1.1 dan distance=2. Uji failover dengan mematikan interface ether1!"
            },
            {
                task: "Tantangan 2: Isolasi Akses Manajemen Inter-Branch",
                hint: "Pasang rule firewall filter di R1-Core (/ip firewall filter) pada chain=input agar komputer dari cabang (192.168.10.0/24) HANYA bisa mengakses server file di 192.168.88.10, dan DILARANG membuka akses Winbox/SSH ke R1-Core."
            }
        ],
        labTools: ["MikroTik CHR (Cloud Hosted Router)", "EVE-NG", "GNS3"],
        next: null
    }
];

// Placeholder upcoming catalog for sidebar navigation
const COURSE_CATALOG_OUTLINE = [
    {
        category: "MikroTik RouterOS",
        badge: "MikroTik",
        materials: [
            { id: "mikrotik-01-routing", order: 1, title: "Routing: Static & Default Route", level: "Dasar", minutes: 35, available: true },
            { id: "mikrotik-02-dhcp", order: 2, title: "DHCP Server, IP Pool & Static Leases", level: "Dasar", minutes: 30, available: false },
            { id: "mikrotik-03-nat-firewall", order: 3, title: "NAT Masquerade & Port Forwarding Dst-NAT", level: "Dasar", minutes: 35, available: false },
            { id: "mikrotik-04-failover-recursive", order: 4, title: "Dual WAN Failover Recursive Routing", level: "Menengah", minutes: 40, available: false },
            { id: "mikrotik-05-vlan-bridge", order: 5, title: "Bridge VLAN Filtering v7 & HW Offload", level: "Menengah", minutes: 45, available: false },
            { id: "mikrotik-06-ospf", order: 6, title: "OSPFv2 Single & Multi-Area Backbone Routing", level: "Lanjut", minutes: 50, available: false }
        ]
    },
    {
        category: "Cisco CCNA 200-301",
        badge: "Cisco CCNA",
        materials: [
            { id: "cisco-01-ios-ssh", order: 7, title: "Cisco IOS CLI, Passwords & SSHv2 Hardening", level: "Dasar", minutes: 30, available: false },
            { id: "cisco-02-vlan-trunk", order: 8, title: "VLAN 802.1Q Trunking & DTP Security", level: "Dasar", minutes: 35, available: false },
            { id: "cisco-03-roas-intervlan", order: 9, title: "Inter-VLAN Routing: Router-on-a-Stick", level: "Dasar", minutes: 35, available: false },
            { id: "cisco-04-stp-pvst", order: 10, title: "Rapid PVST+, PortFast & BPDU Guard", level: "Menengah", minutes: 40, available: false },
            { id: "cisco-05-lacp-etherchannel", order: 11, title: "LACP EtherChannel (802.3ad) Link Aggregation", level: "Menengah", minutes: 40, available: false },
            { id: "cisco-06-ospf-routing", order: 12, title: "Cisco OSPFv2 Single Area 0 & Verification", level: "Menengah", minutes: 45, available: false }
        ]
    },
    {
        category: "Cisco CCNP Enterprise & BGP",
        badge: "Cisco CCNP",
        materials: [
            { id: "cisco-ccnp-01-bgp-peering", order: 13, title: "BGP Fundamentals: eBGP Peering TCP 179", level: "Lanjut", minutes: 50, available: false },
            { id: "cisco-ccnp-02-bgp-path-selection", order: 14, title: "BGP Path Attributes: Weight, Local-Pref & AS-Path", level: "Lanjut", minutes: 55, available: false }
        ]
    },
    {
        category: "Network Automation & NetDevOps",
        badge: "Python NetDevOps",
        materials: [
            { id: "netdevops-01-netmiko", order: 15, title: "Python Netmiko Multi-Device Config Backup", level: "Menengah", minutes: 45, available: false },
            { id: "netdevops-02-restconf-yang", order: 16, title: "RESTCONF API (RFC 8040) & YANG Data Models", level: "Lanjut", minutes: 50, available: false }
        ]
    },
    {
        category: "Cyber Security & Packet Inspection",
        badge: "Cyber Security",
        materials: [
            { id: "sec-01-wireshark-tcp", order: 17, title: "Wireshark Deep Packet: TCP Handshake & RST Anomaly", level: "Menengah", minutes: 40, available: false },
            { id: "sec-02-layer2-defense", order: 18, title: "Layer 2 Hardening: Port Security, DHCP Snooping & DAI", level: "Menengah", minutes: 45, available: false }
        ]
    },
    {
        category: "Fiber Optic FTTH & TIFO Madya",
        badge: "Fiber Optic FTTH",
        materials: [
            { id: "fo-01-odn-design", order: 19, title: "Topologi ODN GPON: OLT, FDT, FAT, Roset, & ONT", level: "Dasar", minutes: 40, available: false },
            { id: "fo-02-link-power-budget", order: 20, title: "Perhitungan Link Power Budget Standar Telkom", level: "Menengah", minutes: 45, available: false },
            { id: "fo-03-splicing-sop", order: 21, title: "SOP Fusion Splicing & Core Alignment", level: "Menengah", minutes: 40, available: false }
        ]
    },
    {
        category: "Linux SysAdmin & Fortinet FortiGate",
        badge: "Linux & Firewall",
        materials: [
            { id: "linux-01-netplan-bastion", order: 22, title: "Linux Network Admin: Netplan YAML & UFW Bastion", level: "Menengah", minutes: 35, available: false },
            { id: "fortigate-01-ngfw-policy", order: 23, title: "FortiGate NGFW: Zones, VIP Port Forwarding & Policy", level: "Lanjut", minutes: 50, available: false }
        ]
    }
];

// Helper to escape HTML in content
function escapeHtml(text) {
    if (!text) return '';
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
