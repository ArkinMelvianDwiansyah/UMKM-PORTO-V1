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
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1020 480" width="100%" height="480" class="w-full max-w-5xl select-none font-sans">
  <defs>
    <!-- Dark Studio Glow Filters -->
    <filter id="glow-gold" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <filter id="glow-emerald" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <filter id="drop-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#000000" flood-opacity="0.6"/>
    </filter>

    <!-- Cable Gradients -->
    <linearGradient id="grad-wan" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#fbbf24" />
    </linearGradient>
    <linearGradient id="grad-p2p" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0284c7" />
      <stop offset="100%" stop-color="#38bdf8" />
    </linearGradient>
    <linearGradient id="grad-lan-hq" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#34d399" />
    </linearGradient>
    <linearGradient id="grad-lan-br" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6" />
      <stop offset="100%" stop-color="#a78bfa" />
    </linearGradient>
  </defs>

  <!-- Background Base Container -->
  <rect width="1020" height="480" rx="14" fill="#090807" stroke="#262320" stroke-width="1.5" />
  
  <!-- Subtle Grid Pattern -->
  <g opacity="0.08" stroke="#78716c" stroke-width="1">
    <line x1="60" y1="0" x2="60" y2="480" /><line x1="180" y1="0" x2="180" y2="480" />
    <line x1="300" y1="0" x2="300" y2="480" /><line x1="420" y1="0" x2="420" y2="480" />
    <line x1="540" y1="0" x2="540" y2="480" /><line x1="660" y1="0" x2="660" y2="480" />
    <line x1="780" y1="0" x2="780" y2="480" /><line x1="900" y1="0" x2="900" y2="480" />
    <line x1="0" y1="70" x2="1020" y2="70" /><line x1="0" y1="150" x2="1020" y2="150" />
    <line x1="0" y1="230" x2="1020" y2="230" /><line x1="0" y1="310" x2="1020" y2="310" />
    <line x1="0" y1="390" x2="1020" y2="390" />
  </g>

  <!-- Top Lab Header Bar -->
  <rect width="1020" height="40" rx="14" fill="#141210" />
  <rect y="30" width="1020" height="10" fill="#141210" />
  <line x1="0" y1="40" x2="1020" y2="40" stroke="#262320" stroke-width="1" />
  
  <circle cx="24" cy="20" r="4.5" fill="#ef4444" opacity="0.85" />
  <circle cx="40" cy="20" r="4.5" fill="#f59e0b" opacity="0.85" />
  <circle cx="56" cy="20" r="4.5" fill="#10b981" opacity="0.85" />
  <text x="76" y="24" fill="#e7e5e4" font-family="monospace" font-size="11.5" font-weight="bold">TOPOLOGI LAB HARDWARE ASLI — PT ARUNIKA MANDIRI (ROUTING STATIC &amp; DEFAULT)</text>
  <circle cx="875" cy="20" r="3.5" fill="#34d399" />
  <text x="1000" y="24" text-anchor="end" fill="#34d399" font-family="monospace" font-size="10.5" font-weight="bold">SIMULASI CHR / EVE-NG READY</text>

  <!-- ========================================================================= -->
  <!-- PHYSICAL & LOGICAL CABLING (Underneath Devices)                            -->
  <!-- ========================================================================= -->

  <!-- Cable 1: ISP CCR2004 to R-PUSAT RB4011 (WAN Uplink) -->
  <path d="M 185 145 L 375 145" stroke="#f59e0b" stroke-width="4" stroke-linecap="round" filter="url(#drop-shadow)" />
  <path d="M 185 145 L 375 145" stroke="#fef08a" stroke-width="1" stroke-dasharray="4,6" opacity="0.9" />

  <!-- Cable 2: R-PUSAT to R-CABANG (P2P Inter-Branch 10.255.0.0/30) -->
  <path d="M 545 145 L 735 145" stroke="#0284c7" stroke-width="4.5" stroke-linecap="round" filter="url(#drop-shadow)" />
  <path d="M 545 145 L 735 145" stroke="#bae6fd" stroke-width="1.2" stroke-dasharray="6,6" opacity="0.9" />

  <!-- Cable 3: R-PUSAT to LAN PC HQ (10.10.20.0/24) -->
  <path d="M 460 215 L 460 330" stroke="#10b981" stroke-width="3.5" stroke-linecap="round" filter="url(#drop-shadow)" />
  <path d="M 460 215 L 460 330" stroke="#a7f3d0" stroke-width="1" stroke-dasharray="4,4" opacity="0.8" />

  <!-- Cable 4: R-CABANG to LAN PC Branch (10.20.20.0/24) -->
  <path d="M 815 215 L 815 330" stroke="#8b5cf6" stroke-width="3.5" stroke-linecap="round" filter="url(#drop-shadow)" />
  <path d="M 815 215 L 815 330" stroke="#ddd6fe" stroke-width="1" stroke-dasharray="4,4" opacity="0.8" />

  <!-- ========================================================================= -->
  <!-- ROUTE OVERLAY BADGES ON CABLES                                            -->
  <!-- ========================================================================= -->

  <!-- WAN Route Badge -->
  <g transform="translate(280, 105)">
    <rect x="-65" y="-12" width="130" height="24" rx="5" fill="#1c1917" stroke="#f59e0b" stroke-width="1.2" filter="url(#drop-shadow)" />
    <text x="0" y="3" text-anchor="middle" fill="#fbbf24" font-family="monospace" font-size="9.5" font-weight="bold">0.0.0.0/0 (Dist=1)</text>
    <text x="0" y="24" text-anchor="middle" fill="#d97706" font-family="monospace" font-size="8">WAN: 203.0.113.0/30</text>
  </g>

  <!-- P2P Route Badge -->
  <g transform="translate(640, 105)">
    <rect x="-75" y="-12" width="150" height="24" rx="5" fill="#1c1917" stroke="#38bdf8" stroke-width="1.2" filter="url(#drop-shadow)" />
    <text x="0" y="3" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="9.5" font-weight="bold">P2P: 10.255.0.0/30</text>
    <text x="0" y="24" text-anchor="middle" fill="#7dd3fc" font-family="monospace" font-size="8">Static: 10.20.20.0/24 -&gt; .2</text>
  </g>

  <!-- ========================================================================= -->
  <!-- DEVICE 1: ISP 1 UPLINK (MikroTik CCR2004 Core Router)                    -->
  <!-- ========================================================================= -->
  <g transform="translate(40, 75)">
    <!-- Hardware Pedestal Frame -->
    <rect x="0" y="0" width="145" height="140" rx="10" fill="#141210" stroke="#44403c" stroke-width="1.2" filter="url(#drop-shadow)" />
    <rect x="0" y="0" width="145" height="24" rx="10" fill="#292524" />
    <rect y="14" width="145" height="10" fill="#292524" />
    <text x="72" y="16" text-anchor="middle" fill="#e7e5e4" font-size="10" font-weight="bold">ISP 1 (TELKOM)</text>

    <!-- REAL HARDWARE PHOTO: MikroTik CCR2004 -->
    <rect x="12" y="32" width="121" height="52" rx="4" fill="#0c0a09" stroke="#1c1917" />
    <image href="assets/devices/mikrotik/ccr2004.webp" x="14" y="35" width="117" height="46" preserveAspectRatio="xMidYMid meet" />

    <!-- Specs & Details -->
    <text x="72" y="98" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">Gateway ISP 1</text>
    <text x="72" y="112" text-anchor="middle" fill="#fbbf24" font-family="monospace" font-size="9.5" font-weight="bold">203.0.113.1/30</text>
    <text x="72" y="127" text-anchor="middle" fill="#a8a29e" font-family="monospace" font-size="8.5">CCR2004-16G-2S+</text>

    <!-- Interface Badge -->
    <rect x="125" y="60" width="48" height="18" rx="3" fill="#1c1917" stroke="#f59e0b" stroke-width="1.2" />
    <text x="149" y="72" text-anchor="middle" fill="#fef08a" font-family="monospace" font-size="8.5" font-weight="bold">sfp-sfpplus1</text>
  </g>

  <!-- ========================================================================= -->
  <!-- DEVICE 2: R-PUSAT (MikroTik RB4011iGS+RM)                                 -->
  <!-- ========================================================================= -->
  <g transform="translate(375, 65)">
    <!-- Hardware Pedestal Frame with Golden Glow Accent -->
    <rect x="0" y="0" width="170" height="155" rx="12" fill="#161412" stroke="#d97706" stroke-width="1.8" filter="url(#drop-shadow)" />
    <rect x="0" y="0" width="170" height="26" rx="12" fill="#78350f" opacity="0.9" />
    <rect y="16" width="170" height="10" fill="#78350f" opacity="0.9" />
    <text x="85" y="18" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="extrabold" letter-spacing="0.5">R-PUSAT (HQ JAKARTA)</text>

    <!-- Port Badges on Frame -->
    <!-- ether1 (WAN) -->
    <rect x="-35" y="70" width="44" height="18" rx="3" fill="#1c1917" stroke="#f59e0b" stroke-width="1.2" />
    <text x="-13" y="82" text-anchor="middle" fill="#fef08a" font-family="monospace" font-size="8.5" font-weight="bold">ether1</text>
    
    <!-- ether2 (P2P) -->
    <rect x="160" y="70" width="44" height="18" rx="3" fill="#1c1917" stroke="#38bdf8" stroke-width="1.2" />
    <text x="182" y="82" text-anchor="middle" fill="#bae6fd" font-family="monospace" font-size="8.5" font-weight="bold">ether2</text>

    <!-- ether3 (LAN) -->
    <rect x="63" y="145" width="44" height="18" rx="3" fill="#1c1917" stroke="#10b981" stroke-width="1.2" />
    <text x="85" y="157" text-anchor="middle" fill="#a7f3d0" font-family="monospace" font-size="8.5" font-weight="bold">ether3</text>

    <!-- REAL HARDWARE PHOTO: MikroTik RB4011 -->
    <rect x="12" y="34" width="146" height="54" rx="4" fill="#080706" stroke="#292524" />
    <image href="assets/devices/mikrotik/rb4011.webp" x="15" y="37" width="140" height="48" preserveAspectRatio="xMidYMid meet" />

    <!-- Specs & Details -->
    <text x="85" y="103" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="bold">MikroTik RB4011iGS+</text>
    <text x="85" y="118" text-anchor="middle" fill="#fbbf24" font-family="monospace" font-size="9">WAN: 203.0.113.2/30</text>
    <text x="85" y="131" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="9">P2P: 10.255.0.1/30</text>
    <text x="85" y="144" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="8.5">LAN: 10.10.20.1/24 (VLAN20)</text>
  </g>

  <!-- ========================================================================= -->
  <!-- DEVICE 3: R-CABANG (MikroTik hEX S RB760iGS)                              -->
  <!-- ========================================================================= -->
  <g transform="translate(735, 65)">
    <!-- Hardware Pedestal Frame with Cyan Glow Accent -->
    <rect x="0" y="0" width="160" height="155" rx="12" fill="#121618" stroke="#0284c7" stroke-width="1.8" filter="url(#drop-shadow)" />
    <rect x="0" y="0" width="160" height="26" rx="12" fill="#0c4a6e" opacity="0.9" />
    <rect y="16" width="160" height="10" fill="#0c4a6e" opacity="0.9" />
    <text x="80" y="18" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="extrabold" letter-spacing="0.5">R-CABANG (SURABAYA)</text>

    <!-- Port Badges on Frame -->
    <!-- ether1 (P2P to HQ) -->
    <rect x="-35" y="70" width="44" height="18" rx="3" fill="#1c1917" stroke="#38bdf8" stroke-width="1.2" />
    <text x="-13" y="82" text-anchor="middle" fill="#bae6fd" font-family="monospace" font-size="8.5" font-weight="bold">ether1</text>

    <!-- ether2 (LAN Users) -->
    <rect x="58" y="145" width="44" height="18" rx="3" fill="#1c1917" stroke="#8b5cf6" stroke-width="1.2" />
    <text x="80" y="157" text-anchor="middle" fill="#ddd6fe" font-family="monospace" font-size="8.5" font-weight="bold">ether2</text>

    <!-- REAL HARDWARE PHOTO: MikroTik hEX S -->
    <rect x="25" y="34" width="110" height="54" rx="4" fill="#080706" stroke="#292524" />
    <image href="assets/devices/mikrotik/hex_s.webp" x="30" y="36" width="100" height="50" preserveAspectRatio="xMidYMid meet" />

    <!-- Specs & Details -->
    <text x="80" y="103" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="bold">MikroTik hEX S</text>
    <text x="80" y="118" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="9">P2P: 10.255.0.2/30</text>
    <text x="80" y="132" text-anchor="middle" fill="#a78bfa" font-family="monospace" font-size="9">LAN: 10.20.20.1/24 (V120)</text>
    <text x="80" y="144" text-anchor="middle" fill="#9ca3af" font-family="monospace" font-size="8.5">Default GW: 10.255.0.1</text>
  </g>

  <!-- ========================================================================= -->
  <!-- CLIENT DEVICES: WORKSTATIONS & SERVERS (Bottom Layer)                     -->
  <!-- ========================================================================= -->

  <!-- PC-PUSAT (Staff User Kantor Pusat) -->
  <g transform="translate(385, 330)">
    <rect x="0" y="0" width="150" height="110" rx="8" fill="#141210" stroke="#10b981" stroke-width="1.2" filter="url(#drop-shadow)" />
    
    <!-- Monitor & Workstation Illustration -->
    <rect x="35" y="12" width="80" height="46" rx="4" fill="#0c0a09" stroke="#292524" />
    <rect x="40" y="16" width="70" height="36" rx="2" fill="#022c22" stroke="#059669" stroke-width="0.8" />
    <!-- Terminal Text Effect -->
    <line x1="44" y1="23" x2="65" y2="23" stroke="#34d399" stroke-width="1.5" />
    <line x1="44" y1="29" x2="85" y2="29" stroke="#34d399" stroke-width="1.2" opacity="0.7" />
    <line x1="44" y1="35" x2="75" y2="35" stroke="#34d399" stroke-width="1.2" opacity="0.7" />
    <!-- Stand -->
    <rect x="71" y="58" width="8" height="8" fill="#292524" />
    <rect x="63" y="66" width="24" height="3" rx="1.5" fill="#44403c" />

    <text x="75" y="82" text-anchor="middle" fill="#ffffff" font-size="10.5" font-weight="bold">PC-HQ (Staff Jakarta)</text>
    <text x="75" y="94" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="9" font-weight="bold">10.10.20.50/24</text>
    <text x="75" y="105" text-anchor="middle" fill="#78716c" font-family="monospace" font-size="8">GW: 10.10.20.1 (VLAN 20)</text>
  </g>

  <!-- PC-CABANG (Staff User Kantor Cabang Surabaya) -->
  <g transform="translate(740, 330)">
    <rect x="0" y="0" width="150" height="110" rx="8" fill="#141210" stroke="#8b5cf6" stroke-width="1.2" filter="url(#drop-shadow)" />
    
    <!-- Monitor & Workstation Illustration -->
    <rect x="35" y="12" width="80" height="46" rx="4" fill="#0c0a09" stroke="#292524" />
    <rect x="40" y="16" width="70" height="36" rx="2" fill="#2e1065" stroke="#7c3aed" stroke-width="0.8" />
    <!-- Terminal Text Effect -->
    <line x1="44" y1="23" x2="65" y2="23" stroke="#a78bfa" stroke-width="1.5" />
    <line x1="44" y1="29" x2="85" y2="29" stroke="#a78bfa" stroke-width="1.2" opacity="0.7" />
    <line x1="44" y1="35" x2="75" y2="35" stroke="#a78bfa" stroke-width="1.2" opacity="0.7" />
    <!-- Stand -->
    <rect x="71" y="58" width="8" height="8" fill="#292524" />
    <rect x="63" y="66" width="24" height="3" rx="1.5" fill="#44403c" />

    <text x="75" y="82" text-anchor="middle" fill="#ffffff" font-size="10.5" font-weight="bold">PC-Branch (Surabaya)</text>
    <text x="75" y="94" text-anchor="middle" fill="#a78bfa" font-family="monospace" font-size="9" font-weight="bold">10.20.20.50/24</text>
    <text x="75" y="105" text-anchor="middle" fill="#78716c" font-family="monospace" font-size="8">GW: 10.20.20.1 (VLAN 120)</text>
  </g>

  <!-- ========================================================================= -->
  <!-- BOTTOM INFORMATION BAR / PING CHECKPOINTS                                 -->
  <!-- ========================================================================= -->
  <g transform="translate(40, 448)">
    <rect width="940" height="24" rx="4" fill="#141210" stroke="#292524" />
    <text x="15" y="16" fill="#a8a29e" font-family="monospace" font-size="9.5">
      <tspan fill="#34d399" font-weight="bold">[OK] PING UJI LINTAS KANTOR:</tspan> ping 10.20.20.50 from 10.10.20.50 (RTT &lt; 15ms)  |  <tspan fill="#fbbf24" font-weight="bold">INTERNET:</tspan> ping 8.8.8.8 via 203.0.113.1 (NAT Masquerade Active)
    </text>
  </g>
</svg>
            `,
            legend: [
                { color: "#fbbf24", label: "Default Route 0.0.0.0/0", desc: "Internet Uplink ISP (Next-Hop 103.28.12.49)" },
                { color: "#38bdf8", label: "Point-to-Point Link", desc: "Inter-Router Subnet (10.0.0.0/30)" },
                { color: "#34d399", label: "Local LAN Subnet", desc: "LAN HQ (192.168.88.0/24)" },
                { color: "#c084fc", label: "Static Route Inter-Branch", desc: "Subnet Cabang (192.168.10.0/24)" }
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
                specs: {
                    ports: "10x Gigabit RJ45 + 1x SFP+ 10Gbps",
                    cpu: "Quad-Core 1.4GHz Alpine AL21400",
                    throughput: "9.7 Gbps Switching / 5 Gbps Routing",
                    ram: "1GB RAM / 512MB NAND Storage",
                    os: "RouterOS v7 (Level 5 License)"
                },
                credit: "mikrotik.com official product catalog",
                sourceUrl: "https://mikrotik.com/product/rb4011igs_rm",
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
                specs: {
                    ports: "5x Gigabit RJ45 + 1x SFP 1.25G",
                    cpu: "Dual-Core 880MHz MT7621A (4 Threads)",
                    throughput: "1.9 Gbps Fastpath / 470 Mbps Routing",
                    ram: "256MB RAM / 16MB Flash + microSD",
                    os: "RouterOS v7 (Level 4 License)"
                },
                credit: "mikrotik.com official product catalog",
                sourceUrl: "https://mikrotik.com/product/hex_s",
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
                specs: {
                    ports: "Multi-Port 10G/100G Carrier Interface",
                    cpu: "Carrier-Grade Multicore NPU",
                    throughput: "40 Gbps+ Carrier Backbone",
                    ram: "16GB ECC RAM Redundant",
                    os: "Carrier Core OS / BGP Engine"
                },
                credit: "Ilustrasi Standar Jaringan ISP",
                sourceUrl: "https://mikrotik.com",
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
