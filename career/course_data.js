/**
 * AAMON Career Learning Studio - Curriculum & Vector Engine
 * Contains 45 Comprehensive Network Engineering Materials & Dynamic SVG Vector Renderer
 * Format per Material:
 * 1. Gambar (Custom Rendered Vector Topology / Simulation)
 * 2. Config (Terminal CLI / Script)
 * 3. Penjelasan (Technical Concept & Deep-Dive Logic)
 * 4. Conclusion (Key Takeaways, Gotchas & Operational Best Practices)
 * 5. Next Step Navigation
 */

function escapeSvg(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

function generateCourseSvg(materi) {
    if (!materi) return '<svg width="100%" height="240"><text x="50%" y="50%" fill="#78716c" text-anchor="middle">Data materi tidak tersedia</text></svg>';
    
    const type = materi.diagramType || 'universal_topology';
    const title = materi.title.split(':')[1] || materi.title;
    const badge = materi.badge || 'Jaringan Komputer';

    let content = '';

    if (type === 'winbox_access') {
        content = `
            <!-- Links -->
            <line x1="140" y1="130" x2="430" y2="130" stroke="#38bdf8" stroke-width="2.5" opacity="0.4" />
            <line x1="140" y1="130" x2="430" y2="130" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="6,6">
                <animate attributeName="stroke-dashoffset" from="36" to="0" dur="1.5s" repeatCount="indefinite" />
            </line>
            <line x1="450" y1="130" x2="740" y2="130" stroke="#34d399" stroke-width="2.5" opacity="0.4" />
            <line x1="450" y1="130" x2="740" y2="130" stroke="#34d399" stroke-width="2.5" stroke-dasharray="6,6">
                <animate attributeName="stroke-dashoffset" from="36" to="0" dur="1.5s" repeatCount="indefinite" />
            </line>

            <!-- Port Badges & Protocol Info -->
            <rect x="180" y="105" width="85" height="18" rx="4" fill="#09090b" stroke="#38bdf8" />
            <text x="222" y="117" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="9" font-weight="bold">MAC-Telnet L2</text>
            <rect x="290" y="105" width="80" height="18" rx="4" fill="#09090b" stroke="#0284c7" />
            <text x="330" y="117" text-anchor="middle" fill="#7dd3fc" font-family="monospace" font-size="9">Winbox 8291</text>
            
            <rect x="495" y="105" width="70" height="18" rx="4" fill="#09090b" stroke="#44403c" />
            <text x="530" y="117" text-anchor="middle" fill="#a8a29e" font-family="monospace" font-size="9">ether1 (WAN)</text>
            <rect x="620" y="105" width="80" height="18" rx="4" fill="#09090b" stroke="#10b981" />
            <text x="660" y="117" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="9">NAT to Internet</text>

            <!-- Node 1: Admin PC -->
            <rect x="75" y="100" width="60" height="42" rx="5" fill="#1c1917" stroke="#38bdf8" stroke-width="2" />
            <rect x="81" y="105" width="48" height="26" rx="2" fill="#082f49" />
            <path d="M 98 142 L 112 142 L 118 152 L 92 152 Z" fill="#292524" />
            <text x="105" y="172" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">PC Administrator</text>
            <text x="105" y="186" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="10">192.168.88.254</text>
            <text x="105" y="198" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="9">MAC: 48:2A:E3:89:12</text>

            <!-- Node 2: MikroTik Router -->
            <rect x="405" y="90" width="80" height="60" rx="8" fill="#1c1917" stroke="#fbbf24" stroke-width="2" />
            <circle cx="445" cy="116" r="16" fill="#292524" stroke="#78716c" />
            <path d="M 435 116 L 455 116 M 445 106 L 445 126 M 455 116 L 451 112 M 455 116 L 451 120" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" />
            <circle cx="417" cy="140" r="3" fill="#34d399" />
            <circle cx="427" cy="140" r="3" fill="#34d399" />
            <circle cx="437" cy="140" r="3" fill="#ef4444" />
            <text x="445" y="172" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">MikroTik RouterOS v7</text>
            <text x="445" y="186" text-anchor="middle" fill="#fbbf24" font-family="monospace" font-size="10">RB5009 / CHR Core</text>
            <text x="445" y="198" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="9">Safe Mode: ACTIVE [F4]</text>

            <!-- Node 3: Internet Gateway -->
            <path d="M 720 135 A 18 18 0 0 1 726 108 A 25 25 0 0 1 765 105 A 22 22 0 0 1 785 122 A 18 18 0 0 1 778 142 A 20 20 0 0 1 735 142 Z" fill="#1e1b4b" stroke="#818cf8" stroke-width="2" />
            <text x="752" y="128" text-anchor="middle" fill="#c7d2fe" font-family="sans-serif" font-size="10" font-weight="bold">Internet Gateway</text>
            <text x="752" y="172" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">ISP Public Cloud</text>
            <text x="752" y="186" text-anchor="middle" fill="#818cf8" font-family="monospace" font-size="10">103.28.12.1/29</text>
            <text x="752" y="198" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="9">DNS: 1.1.1.1, 8.8.8.8</text>
        `;
    } else if (type === 'dhcp_service') {
        content = `
            <!-- Handshake Flow Lines -->
            <path d="M 170 95 L 430 95" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4,4" />
            <path d="M 430 115 L 170 115" stroke="#34d399" stroke-width="2" stroke-dasharray="4,4" />
            <path d="M 170 135 L 430 135" stroke="#fbbf24" stroke-width="2" stroke-dasharray="4,4" />
            <path d="M 430 155 L 170 155" stroke="#c084fc" stroke-width="2" stroke-dasharray="4,4" />

            <!-- DORA Step Badges -->
            <rect x="230" y="86" width="130" height="16" rx="3" fill="#082f49" stroke="#38bdf8" />
            <text x="295" y="97" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="9">1. DHCP DISCOVER (Broadcast)</text>
            <rect x="230" y="106" width="130" height="16" rx="3" fill="#064e3b" stroke="#34d399" />
            <text x="295" y="117" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="9">2. DHCP OFFER (Unicast)</text>
            <rect x="230" y="126" width="130" height="16" rx="3" fill="#451a03" stroke="#fbbf24" />
            <text x="295" y="137" text-anchor="middle" fill="#fbbf24" font-family="monospace" font-size="9">3. DHCP REQUEST (Broadcast)</text>
            <rect x="230" y="146" width="130" height="16" rx="3" fill="#3b0764" stroke="#c084fc" />
            <text x="295" y="157" text-anchor="middle" fill="#c084fc" font-family="monospace" font-size="9">4. DHCP ACK (Unicast)</text>

            <!-- Node 1: Client Host -->
            <rect x="80" y="105" width="60" height="42" rx="5" fill="#1c1917" stroke="#38bdf8" stroke-width="2" />
            <rect x="86" y="110" width="48" height="26" rx="2" fill="#082f49" />
            <path d="M 103 147 L 117 147 L 123 157 L 97 157 Z" fill="#292524" />
            <text x="110" y="177" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">DHCP Client (PC)</text>
            <text x="110" y="191" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="10">192.168.88.150</text>
            <text x="110" y="203" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="9">Lease: 12 Hours</text>

            <!-- Node 2: DHCP Server (Router) -->
            <rect x="440" y="95" width="80" height="60" rx="8" fill="#1c1917" stroke="#34d399" stroke-width="2" />
            <circle cx="480" cy="121" r="16" fill="#292524" stroke="#78716c" />
            <path d="M 470 121 L 490 121 M 480 111 L 480 131" stroke="#34d399" stroke-width="2" />
            <text x="480" y="177" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">DHCP Server Router</text>
            <text x="480" y="191" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="10">192.168.88.1/24</text>
            <text x="480" y="203" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="9">Pool: .100 - .200</text>

            <!-- Info Box: Static Leases -->
            <rect x="630" y="90" width="190" height="90" rx="6" fill="#09090b" stroke="#292524" />
            <text x="725" y="110" text-anchor="middle" fill="#fbbf24" font-family="sans-serif" font-size="10" font-weight="bold">Tabel Static DHCP Lease</text>
            <line x1="640" y1="116" x2="810" y2="116" stroke="#292524" stroke-width="1" />
            <text x="645" y="132" fill="#a8a29e" font-family="monospace" font-size="9">Server: 192.168.88.10</text>
            <text x="645" y="147" fill="#a8a29e" font-family="monospace" font-size="9">Printer: 192.168.88.50</text>
            <text x="645" y="162" fill="#34d399" font-family="monospace" font-size="9">Rogue DHCP Alert: ON</text>
        `;
    } else if (type === 'nat_masq') {
        content = `
            <!-- Packet Flow Lines -->
            <line x1="150" y1="125" x2="370" y2="125" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="6,4">
                <animate attributeName="stroke-dashoffset" from="30" to="0" dur="1.2s" repeatCount="indefinite" />
            </line>
            <line x1="510" y1="125" x2="730" y2="125" stroke="#fbbf24" stroke-width="2.5" stroke-dasharray="6,4">
                <animate attributeName="stroke-dashoffset" from="30" to="0" dur="1.2s" repeatCount="indefinite" />
            </line>

            <!-- Source Packet Label -->
            <rect x="180" y="95" width="140" height="22" rx="4" fill="#082f49" stroke="#38bdf8" />
            <text x="250" y="110" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="9" font-weight="bold">Src: 192.168.88.50:52110</text>

            <!-- Translated Packet Label -->
            <rect x="540" y="95" width="140" height="22" rx="4" fill="#451a03" stroke="#fbbf24" />
            <text x="610" y="110" text-anchor="middle" fill="#fbbf24" font-family="monospace" font-size="9" font-weight="bold">Src: 103.28.12.50:41920</text>

            <!-- Node 1: Private LAN Client -->
            <rect x="70" y="100" width="70" height="48" rx="6" fill="#1c1917" stroke="#38bdf8" stroke-width="2" />
            <text x="105" y="128" text-anchor="middle" fill="#38bdf8" font-family="sans-serif" font-size="18">ðŸ’»</text>
            <text x="105" y="170" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">Private LAN Client</text>
            <text x="105" y="184" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="10">192.168.88.50</text>

            <!-- Node 2: NAT Translation Engine (Router) -->
            <rect x="370" y="80" width="140" height="90" rx="8" fill="#1c1917" stroke="#fbbf24" stroke-width="2" />
            <text x="440" y="102" text-anchor="middle" fill="#fbbf24" font-family="sans-serif" font-size="10" font-weight="bold">NAT MASQUERADE / PAT</text>
            <line x1="380" y1="108" x2="500" y2="108" stroke="#44403c" stroke-width="1" />
            <text x="385" y="124" fill="#a8a29e" font-family="monospace" font-size="9">Private IP âž” Port Hash</text>
            <text x="385" y="138" fill="#34d399" font-family="monospace" font-size="9">Table: 1:N Mapping</text>
            <text x="385" y="152" fill="#fbbf24" font-family="monospace" font-size="9">Dst-NAT Port Forward</text>
            <text x="440" y="190" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">Router Gateway (RB5009)</text>

            <!-- Node 3: Public Web / Internet Server -->
            <rect x="730" y="100" width="70" height="48" rx="6" fill="#1c1917" stroke="#10b981" stroke-width="2" />
            <text x="765" y="128" text-anchor="middle" fill="#34d399" font-family="sans-serif" font-size="18">ðŸŒ</text>
            <text x="765" y="170" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">Web Server Public</text>
            <text x="765" y="184" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="10">1.1.1.1 / Port 443</text>
        `;
    } else if (type === 'failover_dual_wan') {
        content = `
            <!-- Primary WAN Path (Green) -->
            <path d="M 230 115 L 440 65 L 650 115" fill="none" stroke="#34d399" stroke-width="3" stroke-dasharray="6,4">
                <animate attributeName="stroke-dashoffset" from="30" to="0" dur="1s" repeatCount="indefinite" />
            </path>
            <!-- Backup WAN Path (Amber Standby) -->
            <path d="M 230 145 L 440 195 L 650 145" fill="none" stroke="#fbbf24" stroke-width="2" stroke-dasharray="4,4" opacity="0.6" />

            <!-- Primary Label -->
            <rect x="360" y="45" width="160" height="22" rx="4" fill="#064e3b" stroke="#34d399" />
            <text x="440" y="60" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="9" font-weight="bold">ISP-1 FIBER (Distance=1) â€¢ ACTIVE</text>

            <!-- Backup Label -->
            <rect x="360" y="185" width="160" height="22" rx="4" fill="#451a03" stroke="#fbbf24" />
            <text x="440" y="200" text-anchor="middle" fill="#fbbf24" font-family="monospace" font-size="9" font-weight="bold">ISP-2 4G/LTE (Distance=2) â€¢ STANDBY</text>

            <!-- Node 1: Core Router -->
            <rect x="150" y="100" width="80" height="60" rx="8" fill="#1c1917" stroke="#fbbf24" stroke-width="2" />
            <circle cx="190" cy="126" r="16" fill="#292524" stroke="#78716c" />
            <path d="M 180 126 L 200 126 M 190 116 L 190 136" stroke="#fbbf24" stroke-width="2" />
            <text x="190" y="180" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">Core Router Dual WAN</text>
            <text x="190" y="194" text-anchor="middle" fill="#fbbf24" font-family="monospace" font-size="10">Check-GW=Ping (8.8.8.8)</text>

            <!-- Node 2: Internet Cloud -->
            <rect x="650" y="100" width="80" height="60" rx="8" fill="#1e1b4b" stroke="#818cf8" stroke-width="2" />
            <text x="690" y="135" text-anchor="middle" fill="#818cf8" font-family="sans-serif" font-size="22">â˜ï¸</text>
            <text x="690" y="180" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">Target Cloud Internet</text>
            <text x="690" y="194" text-anchor="middle" fill="#818cf8" font-family="monospace" font-size="10">Failover Time: &lt; 10s</text>
        `;
    } else if (type === 'qos_queues') {
        content = `
            <!-- Bandwidth Flow Pipeline -->
            <rect x="180" y="85" width="520" height="12" rx="6" fill="#1c1917" stroke="#292524" />
            <rect x="180" y="85" width="280" height="12" rx="6" fill="#10b981" />
            <rect x="460" y="85" width="140" height="12" rx="0" fill="#f59e0b" />
            <rect x="600" y="85" width="100" height="12" rx="6" fill="#ef4444" />

            <!-- Queue Priority 1: VoIP -->
            <rect x="180" y="120" width="240" height="75" rx="6" fill="#064e3b" stroke="#34d399" stroke-width="1.5" />
            <text x="300" y="140" text-anchor="middle" fill="#34d399" font-family="sans-serif" font-size="11" font-weight="bold">Priority 1: VoIP &amp; Zoom RTP</text>
            <text x="195" y="158" fill="#a7f3d0" font-family="monospace" font-size="9">Limit-at (CIR): 20 Mbps</text>
            <text x="195" y="172" fill="#a7f3d0" font-family="monospace" font-size="9">Max-limit (PIR): 100 Mbps</text>
            <text x="195" y="186" fill="#34d399" font-family="monospace" font-size="9">Status: ZERO PACKET DROP</text>

            <!-- Queue Priority 8: General Browsing -->
            <rect x="460" y="120" width="240" height="75" rx="6" fill="#451a03" stroke="#f59e0b" stroke-width="1.5" />
            <text x="580" y="140" text-anchor="middle" fill="#fbbf24" font-family="sans-serif" font-size="11" font-weight="bold">Priority 8: Browsing &amp; Torrent (PCQ)</text>
            <text x="475" y="158" fill="#fde68a" font-family="monospace" font-size="9">PCQ Rate: Dynamic Fair Share</text>
            <text x="475" y="172" fill="#fde68a" font-family="monospace" font-size="9">Burst Time: 16s â€¢ Drop Red Zone</text>
            <text x="475" y="186" fill="#fbbf24" font-family="monospace" font-size="9">Status: RATE LIMITED</text>

            <!-- Pipe Header Info -->
            <text x="180" y="74" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">Total Pipa Bandwidth ISP: 100 Mbps Symmetric</text>
            <text x="700" y="74" text-anchor="end" fill="#34d399" font-family="monospace" font-size="10">HTB Hierarchical Token Bucket</text>
        `;
    } else if (type === 'firewall_filter') {
        content = `
            <!-- Chain Diagram Boxes -->
            <!-- Input Chain -->
            <rect x="80" y="80" width="220" height="110" rx="8" fill="#1c1917" stroke="#38bdf8" stroke-width="2" />
            <rect x="80" y="80" width="220" height="26" rx="8" fill="#082f49" />
            <text x="190" y="97" text-anchor="middle" fill="#38bdf8" font-family="sans-serif" font-size="11" font-weight="bold">INPUT CHAIN (To Router)</text>
            <text x="95" y="125" fill="#34d399" font-family="monospace" font-size="9">âœ” Accept Established/Related</text>
            <text x="95" y="142" fill="#38bdf8" font-family="monospace" font-size="9">âœ” Accept Winbox 8291 from LAN</text>
            <text x="95" y="159" fill="#ef4444" font-family="monospace" font-size="9">âœ˜ Drop Invalid &amp; WAN Input</text>
            <text x="190" y="182" text-anchor="middle" fill="#a8a29e" font-family="monospace" font-size="8">Proteksi CPU RouterOS</text>

            <!-- Forward Chain -->
            <rect x="330" y="80" width="220" height="110" rx="8" fill="#1c1917" stroke="#34d399" stroke-width="2" />
            <rect x="330" y="80" width="220" height="26" rx="8" fill="#064e3b" />
            <text x="440" y="97" text-anchor="middle" fill="#34d399" font-family="sans-serif" font-size="11" font-weight="bold">FORWARD CHAIN (Through)</text>
            <text x="345" y="125" fill="#34d399" font-family="monospace" font-size="9">âœ” FastTrack Established</text>
            <text x="345" y="142" fill="#38bdf8" font-family="monospace" font-size="9">âœ” Accept Port Forward Dst-NAT</text>
            <text x="345" y="159" fill="#ef4444" font-family="monospace" font-size="9">âœ˜ Drop Bogon &amp; SYN Flood</text>
            <text x="440" y="182" text-anchor="middle" fill="#a8a29e" font-family="monospace" font-size="8">Transit LAN â‡„ Internet</text>

            <!-- Output Chain -->
            <rect x="580" y="80" width="220" height="110" rx="8" fill="#1c1917" stroke="#c084fc" stroke-width="2" />
            <rect x="580" y="80" width="220" height="26" rx="8" fill="#3b0764" />
            <text x="690" y="97" text-anchor="middle" fill="#c084fc" font-family="sans-serif" font-size="11" font-weight="bold">OUTPUT CHAIN (From Router)</text>
            <text x="595" y="125" fill="#34d399" font-family="monospace" font-size="9">âœ” NTP Time Sync Requests</text>
            <text x="595" y="142" fill="#38bdf8" font-family="monospace" font-size="9">âœ” DNS Queries to 1.1.1.1</text>
            <text x="595" y="159" fill="#c084fc" font-family="monospace" font-size="9">âœ” Syslog &amp; NetFlow Exports</text>
            <text x="690" y="182" text-anchor="middle" fill="#a8a29e" font-family="monospace" font-size="8">Traffic Internal Router</text>
        `;
    } else if (type === 'vlan_trunk') {
        content = `
            <!-- Trunk Link (Tagged 802.1Q) -->
            <line x1="220" y1="125" x2="440" y2="125" stroke="#fbbf24" stroke-width="4" stroke-dasharray="8,4">
                <animate attributeName="stroke-dashoffset" from="36" to="0" dur="1.5s" repeatCount="indefinite" />
            </line>
            <rect x="270" y="100" width="130" height="20" rx="4" fill="#09090b" stroke="#fbbf24" />
            <text x="335" y="114" text-anchor="middle" fill="#fbbf24" font-family="monospace" font-size="9" font-weight="bold">802.1Q Trunk (Tagged 10,20)</text>

            <!-- Access Links -->
            <line x1="520" y1="110" x2="680" y2="80" stroke="#38bdf8" stroke-width="2.5" />
            <line x1="520" y1="140" x2="680" y2="170" stroke="#34d399" stroke-width="2.5" />

            <!-- Node 1: Router-on-a-Stick (L3 Gateway) -->
            <rect x="140" y="95" width="80" height="60" rx="8" fill="#1c1917" stroke="#fbbf24" stroke-width="2" />
            <circle cx="180" cy="121" r="16" fill="#292524" stroke="#78716c" />
            <path d="M 170 121 L 190 121 M 180 111 L 180 131" stroke="#fbbf24" stroke-width="2" />
            <text x="180" y="175" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">Router-on-a-Stick</text>
            <text x="180" y="189" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="9">Gi0/0.10: 192.168.10.1</text>
            <text x="180" y="201" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="9">Gi0/0.20: 192.168.20.1</text>

            <!-- Node 2: Layer 2 Switch -->
            <rect x="440" y="105" width="80" height="40" rx="6" fill="#1c1917" stroke="#3b82f6" stroke-width="2" />
            <text x="480" y="130" text-anchor="middle" fill="#60a5fa" font-family="sans-serif" font-size="14">â‡„ â‡…</text>
            <text x="480" y="165" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">Switch Catalyst / CRS</text>
            <text x="480" y="179" text-anchor="middle" fill="#93c5fd" font-family="monospace" font-size="9">Bridge VLAN Filtering</text>

            <!-- Node 3: Host VLAN 10 (Sales) -->
            <rect x="680" y="60" width="60" height="40" rx="5" fill="#1c1917" stroke="#38bdf8" stroke-width="2" />
            <text x="710" y="85" text-anchor="middle" fill="#38bdf8" font-family="sans-serif" font-size="16">ðŸ’»</text>
            <text x="780" y="78" fill="#ffffff" font-family="sans-serif" font-size="10" font-weight="bold">PC Sales (VLAN 10)</text>
            <text x="780" y="92" fill="#38bdf8" font-family="monospace" font-size="9">192.168.10.50/24</text>

            <!-- Node 4: Host VLAN 20 (Engineering) -->
            <rect x="680" y="150" width="60" height="40" rx="5" fill="#1c1917" stroke="#34d399" stroke-width="2" />
            <text x="710" y="175" text-anchor="middle" fill="#34d399" font-family="sans-serif" font-size="16">ðŸ’»</text>
            <text x="780" y="168" fill="#ffffff" font-family="sans-serif" font-size="10" font-weight="bold">PC Eng (VLAN 20)</text>
            <text x="780" y="182" fill="#34d399" font-family="monospace" font-size="9">192.168.20.50/24</text>
        `;
    } else if (type === 'ospf_topology') {
        content = `
            <!-- OSPF Backbone Link -->
            <line x1="220" y1="130" x2="660" y2="130" stroke="#34d399" stroke-width="3" stroke-dasharray="6,4">
                <animate attributeName="stroke-dashoffset" from="30" to="0" dur="1.5s" repeatCount="indefinite" />
            </line>
            
            <!-- Link Specs -->
            <rect x="360" y="105" width="160" height="22" rx="4" fill="#064e3b" stroke="#34d399" />
            <text x="440" y="120" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="9" font-weight="bold">Subnet: 10.0.12.0/30 â€¢ Cost=10</text>
            
            <rect x="375" y="145" width="130" height="18" rx="4" fill="#09090b" stroke="#22c55e" />
            <text x="440" y="157" text-anchor="middle" fill="#86efac" font-family="monospace" font-size="8">Neighbor State: FULL (DR/BDR)</text>

            <!-- Node 1: Router 1 -->
            <rect x="140" y="100" width="80" height="60" rx="8" fill="#1c1917" stroke="#34d399" stroke-width="2" />
            <circle cx="180" cy="126" r="16" fill="#292524" stroke="#78716c" />
            <path d="M 170 126 L 190 126 M 180 116 L 180 136" stroke="#34d399" stroke-width="2" />
            <text x="180" y="180" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">R1-HQ-CORE</text>
            <text x="180" y="194" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="10">RID: 10.255.255.1</text>
            <text x="180" y="206" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="9">Area 0.0.0.0 (Backbone)</text>

            <!-- Node 2: Router 2 -->
            <rect x="660" y="100" width="80" height="60" rx="8" fill="#1c1917" stroke="#38bdf8" stroke-width="2" />
            <circle cx="700" cy="126" r="16" fill="#292524" stroke="#78716c" />
            <path d="M 690 126 L 710 126 M 700 116 L 700 136" stroke="#38bdf8" stroke-width="2" />
            <text x="700" y="180" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">R2-BRANCH-CORE</text>
            <text x="700" y="194" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="10">RID: 10.255.255.2</text>
            <text x="700" y="206" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="9">Area 0.0.0.0 (Backbone)</text>
        `;
    } else if (type === 'bgp_topology') {
        content = `
            <!-- BGP Peering Session TCP 179 -->
            <line x1="240" y1="130" x2="640" y2="130" stroke="#f59e0b" stroke-width="3" stroke-dasharray="8,4">
                <animate attributeName="stroke-dashoffset" from="36" to="0" dur="2s" repeatCount="indefinite" />
            </line>
            
            <rect x="360" y="100" width="160" height="24" rx="4" fill="#451a03" stroke="#f59e0b" />
            <text x="440" y="116" text-anchor="middle" fill="#fbbf24" font-family="monospace" font-size="9" font-weight="bold">eBGP Peering â€¢ TCP Port 179</text>

            <rect x="370" y="145" width="140" height="20" rx="4" fill="#09090b" stroke="#d97706" />
            <text x="440" y="159" text-anchor="middle" fill="#fde68a" font-family="monospace" font-size="9">State: ESTABLISHED</text>

            <!-- AS 65001 -->
            <rect x="130" y="90" width="110" height="80" rx="8" fill="#1c1917" stroke="#38bdf8" stroke-width="2" />
            <text x="185" y="115" text-anchor="middle" fill="#38bdf8" font-family="sans-serif" font-size="11" font-weight="bold">AS 65001 (ISP Alpha)</text>
            <text x="185" y="132" text-anchor="middle" fill="#93c5fd" font-family="monospace" font-size="9">RID: 198.51.100.1</text>
            <text x="185" y="148" text-anchor="middle" fill="#a8a29e" font-family="monospace" font-size="8">Pref: 198.51.100.0/24</text>
            <text x="185" y="195" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">Upstream Tier-1</text>

            <!-- AS 65002 -->
            <rect x="640" y="90" width="110" height="80" rx="8" fill="#1c1917" stroke="#10b981" stroke-width="2" />
            <text x="695" y="115" text-anchor="middle" fill="#34d399" font-family="sans-serif" font-size="11" font-weight="bold">AS 65002 (Enterprise)</text>
            <text x="695" y="132" text-anchor="middle" fill="#6ee7b7" font-family="monospace" font-size="9">RID: 203.0.113.1</text>
            <text x="695" y="148" text-anchor="middle" fill="#a8a29e" font-family="monospace" font-size="8">Pref: 203.0.113.0/24</text>
            <text x="695" y="195" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">Autonomous System</text>
        `;
    } else if (type === 'ftth_odn') {
        content = `
            <!-- Optical Fiber Path -->
            <line x1="140" y1="125" x2="310" y2="125" stroke="#ef4444" stroke-width="3" />
            <line x1="370" y1="125" x2="520" y2="125" stroke="#ef4444" stroke-width="2.5" />
            <line x1="580" y1="125" x2="730" y2="125" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,2" />

            <!-- Redaman Values along the Path -->
            <rect x="180" y="95" width="85" height="18" rx="3" fill="#09090b" stroke="#ef4444" />
            <text x="222" y="107" text-anchor="middle" fill="#fca5a5" font-family="monospace" font-size="8">Feeder: 0.35dB/km</text>

            <rect x="410" y="95" width="75" height="18" rx="3" fill="#09090b" stroke="#f87171" />
            <text x="447" y="107" text-anchor="middle" fill="#fca5a5" font-family="monospace" font-size="8">Distribusi 1.5km</text>

            <rect x="620" y="95" width="80" height="18" rx="3" fill="#09090b" stroke="#34d399" />
            <text x="660" y="107" text-anchor="middle" fill="#86efac" font-family="monospace" font-size="8">Drop 150m G.657A</text>

            <!-- Node 1: OLT -->
            <rect x="70" y="95" width="70" height="60" rx="6" fill="#1c1917" stroke="#3b82f6" stroke-width="2" />
            <text x="105" y="125" text-anchor="middle" fill="#60a5fa" font-family="sans-serif" font-size="10" font-weight="bold">OLT GPON</text>
            <text x="105" y="140" text-anchor="middle" fill="#93c5fd" font-family="monospace" font-size="9">Class B+</text>
            <text x="105" y="175" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">Central Office</text>
            <text x="105" y="190" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="9">Tx: +3.0 dBm</text>

            <!-- Node 2: FDT / ODC 1:4 -->
            <polygon points="340,95 370,125 340,155 310,125" fill="#1c1917" stroke="#f59e0b" stroke-width="2" />
            <text x="340" y="129" text-anchor="middle" fill="#fbbf24" font-family="sans-serif" font-size="10" font-weight="bold">1:4</text>
            <text x="340" y="175" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">FDT / ODC</text>
            <text x="340" y="190" text-anchor="middle" fill="#fbbf24" font-family="monospace" font-size="9">Loss: -7.2 dB</text>

            <!-- Node 3: FAT / ODP 1:8 -->
            <polygon points="550,95 580,125 550,155 520,125" fill="#1c1917" stroke="#f59e0b" stroke-width="2" />
            <text x="550" y="129" text-anchor="middle" fill="#fbbf24" font-family="sans-serif" font-size="10" font-weight="bold">1:8</text>
            <text x="550" y="175" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">FAT / ODP</text>
            <text x="550" y="190" text-anchor="middle" fill="#fbbf24" font-family="monospace" font-size="9">Loss: -10.5 dB</text>

            <!-- Node 4: ONT GPON -->
            <rect x="730" y="100" width="70" height="50" rx="6" fill="#1c1917" stroke="#10b981" stroke-width="2" />
            <text x="765" y="125" text-anchor="middle" fill="#34d399" font-family="sans-serif" font-size="10" font-weight="bold">ONT GPON</text>
            <text x="765" y="140" text-anchor="middle" fill="#86efac" font-family="monospace" font-size="8">SC/APC Green</text>
            <text x="765" y="175" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">Customer Home</text>
            <text x="765" y="190" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="10">Rx: -19.2 dBm âœ”</text>
        `;
    } else if (type === 'netmiko_auto') {
        content = `
            <!-- Automation SSH Control Stream -->
            <line x1="220" y1="125" x2="430" y2="85" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="6,4">
                <animate attributeName="stroke-dashoffset" from="30" to="0" dur="1.2s" repeatCount="indefinite" />
            </line>
            <line x1="220" y1="125" x2="430" y2="165" stroke="#34d399" stroke-width="2.5" stroke-dasharray="6,4">
                <animate attributeName="stroke-dashoffset" from="30" to="0" dur="1.2s" repeatCount="indefinite" />
            </line>

            <!-- Node 1: Python Workstation -->
            <rect x="90" y="95" width="130" height="65" rx="8" fill="#1c1917" stroke="#38bdf8" stroke-width="2" />
            <text x="155" y="120" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="12" font-weight="bold">ðŸ Python 3.11</text>
            <text x="155" y="138" text-anchor="middle" fill="#93c5fd" font-family="monospace" font-size="9">Netmiko / RESTCONF</text>
            <text x="155" y="152" text-anchor="middle" fill="#a8a29e" font-family="monospace" font-size="8">asyncio multi-thread</text>
            <text x="155" y="185" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">NOC Automation Host</text>

            <!-- Node 2: Cisco Router -->
            <rect x="430" y="60" width="80" height="50" rx="6" fill="#1c1917" stroke="#0284c7" stroke-width="2" />
            <text x="470" y="90" text-anchor="middle" fill="#38bdf8" font-family="sans-serif" font-size="11" font-weight="bold">Cisco IOS-XE</text>
            <text x="570" y="80" fill="#ffffff" font-family="sans-serif" font-size="10" font-weight="bold">R1-Catalyst 9300</text>
            <text x="570" y="95" fill="#38bdf8" font-family="monospace" font-size="9">Auto Backup: SUCCESS (2.1s)</text>

            <!-- Node 3: MikroTik Router -->
            <rect x="430" y="140" width="80" height="50" rx="6" fill="#1c1917" stroke="#fbbf24" stroke-width="2" />
            <text x="470" y="170" text-anchor="middle" fill="#fbbf24" font-family="sans-serif" font-size="11" font-weight="bold">MikroTik v7</text>
            <text x="570" y="160" fill="#ffffff" font-family="sans-serif" font-size="10" font-weight="bold">R2-RB5009 Core</text>
            <text x="570" y="175" fill="#34d399" font-family="monospace" font-size="9">Config Push: OK (1.4s)</text>
        `;
    } else if (type === 'wireshark_pcap') {
        content = `
            <!-- Wireshark Packet Streams -->
            <line x1="170" y1="85" x2="680" y2="85" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4,4" />
            <line x1="680" y1="110" x2="170" y2="110" stroke="#34d399" stroke-width="2" stroke-dasharray="4,4" />
            <line x1="170" y1="135" x2="680" y2="135" stroke="#fbbf24" stroke-width="2" stroke-dasharray="4,4" />
            <line x1="170" y1="160" x2="680" y2="160" stroke="#c084fc" stroke-width="2" stroke-dasharray="4,4" />
            <line x1="680" y1="185" x2="170" y2="185" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,4" />

            <!-- Packet Annotations -->
            <rect x="330" y="75" width="220" height="18" rx="3" fill="#082f49" stroke="#38bdf8" />
            <text x="440" y="87" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="9">Packet 1: [SYN] Seq=0 Win=64240 MSS=1460</text>

            <rect x="330" y="100" width="220" height="18" rx="3" fill="#064e3b" stroke="#34d399" />
            <text x="440" y="112" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="9">Packet 2: [SYN, ACK] Seq=0 Ack=1</text>

            <rect x="330" y="125" width="220" height="18" rx="3" fill="#451a03" stroke="#fbbf24" />
            <text x="440" y="137" text-anchor="middle" fill="#fbbf24" font-family="monospace" font-size="9">Packet 3: [ACK] Seq=1 Ack=1 (ESTABLISHED)</text>

            <rect x="330" y="150" width="220" height="18" rx="3" fill="#3b0764" stroke="#c084fc" />
            <text x="440" y="162" text-anchor="middle" fill="#c084fc" font-family="monospace" font-size="9">Packet 4: TLS 1.3 Client Hello (SNI)</text>

            <rect x="330" y="175" width="220" height="18" rx="3" fill="#450a0a" stroke="#ef4444" />
            <text x="440" y="187" text-anchor="middle" fill="#fca5a5" font-family="monospace" font-size="9">Packet 5: [RST, ACK] Security Defense Block</text>

            <!-- Endpoints -->
            <rect x="80" y="100" width="80" height="50" rx="6" fill="#1c1917" stroke="#38bdf8" stroke-width="2" />
            <text x="120" y="130" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="10">Client Host</text>
            <text x="120" y="170" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="10" font-weight="bold">192.168.1.50</text>

            <rect x="680" y="100" width="80" height="50" rx="6" fill="#1c1917" stroke="#34d399" stroke-width="2" />
            <text x="720" y="130" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="10">Web Server</text>
            <text x="720" y="170" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="10" font-weight="bold">203.0.113.10:443</text>
        `;
    } else if (type === 'fortigate_ngfw') {
        content = `
            <!-- Flows -->
            <line x1="140" y1="125" x2="380" y2="125" stroke="#ef4444" stroke-width="2.5" />
            <line x1="480" y1="110" x2="700" y2="85" stroke="#34d399" stroke-width="2.5" />
            <line x1="480" y1="140" x2="700" y2="165" stroke="#fbbf24" stroke-width="2.5" />

            <!-- Node 1: Untrusted WAN -->
            <rect x="60" y="100" width="80" height="50" rx="6" fill="#1c1917" stroke="#ef4444" stroke-width="2" />
            <text x="100" y="125" text-anchor="middle" fill="#f87171" font-family="sans-serif" font-size="10" font-weight="bold">WAN Zone</text>
            <text x="100" y="140" text-anchor="middle" fill="#fca5a5" font-family="monospace" font-size="8">port1 (Internet)</text>

            <!-- Node 2: FortiGate Core -->
            <rect x="380" y="80" width="100" height="90" rx="8" fill="#1c1917" stroke="#f59e0b" stroke-width="2" />
            <text x="430" y="105" text-anchor="middle" fill="#fbbf24" font-family="sans-serif" font-size="11" font-weight="bold">FortiGate NGFW</text>
            <text x="430" y="125" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="8">âœ” IPS Active</text>
            <text x="430" y="139" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="8">âœ” AntiVirus/DPI</text>
            <text x="430" y="153" text-anchor="middle" fill="#fbbf24" font-family="monospace" font-size="8">âœ” VIP Port Fwd</text>
            <text x="430" y="190" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">Security Gateway</text>

            <!-- Node 3: Trusted LAN -->
            <rect x="700" y="60" width="80" height="50" rx="6" fill="#1c1917" stroke="#34d399" stroke-width="2" />
            <text x="740" y="85" text-anchor="middle" fill="#34d399" font-family="sans-serif" font-size="10" font-weight="bold">LAN Zone</text>
            <text x="740" y="100" text-anchor="middle" fill="#86efac" font-family="monospace" font-size="8">10.10.10.0/24</text>

            <!-- Node 4: DMZ Web Server -->
            <rect x="700" y="140" width="80" height="50" rx="6" fill="#1c1917" stroke="#fbbf24" stroke-width="2" />
            <text x="740" y="165" text-anchor="middle" fill="#fbbf24" font-family="sans-serif" font-size="10" font-weight="bold">DMZ Zone</text>
            <text x="740" y="180" text-anchor="middle" fill="#fde68a" font-family="monospace" font-size="8">VIP 10.10.99.10</text>
        `;
    } else {
        // Universal Topology Fallback
        const d = materi.diagramData || {};
        const node1 = d.node1 || { label: 'Node A', ip: '10.0.0.1' };
        const node2 = d.node2 || { label: 'Core Gateway', ip: '10.0.0.254' };
        const node3 = d.node3 || { label: 'Target / WAN', ip: '103.28.12.1' };
        
        content = `
            <!-- Universal 3-Node Connected Topology -->
            <line x1="180" y1="125" x2="430" y2="125" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="6,4">
                <animate attributeName="stroke-dashoffset" from="30" to="0" dur="1.5s" repeatCount="indefinite" />
            </line>
            <line x1="450" y1="125" x2="700" y2="125" stroke="#34d399" stroke-width="2.5" stroke-dasharray="6,4">
                <animate attributeName="stroke-dashoffset" from="30" to="0" dur="1.5s" repeatCount="indefinite" />
            </line>

            <!-- Center Subnet Badges -->
            <rect x="250" y="102" width="110" height="20" rx="4" fill="#09090b" stroke="#38bdf8" />
            <text x="305" y="116" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="9">${escapeSvg(d.link1 || 'Inter-Link A')}</text>

            <rect x="520" y="102" width="110" height="20" rx="4" fill="#09090b" stroke="#34d399" />
            <text x="575" y="116" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="9">${escapeSvg(d.link2 || 'Inter-Link B')}</text>

            <!-- Node 1 -->
            <rect x="100" y="95" width="80" height="60" rx="6" fill="#1c1917" stroke="#38bdf8" stroke-width="2" />
            <text x="140" y="125" text-anchor="middle" fill="#38bdf8" font-family="sans-serif" font-size="16">ðŸ’»</text>
            <text x="140" y="175" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">${escapeSvg(node1.label)}</text>
            <text x="140" y="190" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="10">${escapeSvg(node1.ip)}</text>

            <!-- Node 2 (Core Router/Switch) -->
            <rect x="400" y="95" width="80" height="60" rx="8" fill="#1c1917" stroke="#fbbf24" stroke-width="2" />
            <circle cx="440" cy="121" r="16" fill="#292524" stroke="#78716c" />
            <path d="M 430 121 L 450 121 M 440 111 L 440 131" stroke="#fbbf24" stroke-width="2" />
            <text x="440" y="175" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">${escapeSvg(node2.label)}</text>
            <text x="440" y="190" text-anchor="middle" fill="#fbbf24" font-family="monospace" font-size="10">${escapeSvg(node2.ip)}</text>

            <!-- Node 3 -->
            <rect x="700" y="95" width="80" height="60" rx="6" fill="#1c1917" stroke="#34d399" stroke-width="2" />
            <text x="740" y="125" text-anchor="middle" fill="#34d399" font-family="sans-serif" font-size="16">ðŸŒ</text>
            <text x="740" y="175" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">${escapeSvg(node3.label)}</text>
            <text x="740" y="190" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="10">${escapeSvg(node3.ip)}</text>
        `;
    }

    return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 880 230" width="100%" height="230" class="w-full max-w-4xl select-none">
            <!-- Background Container -->
            <rect width="880" height="230" rx="10" fill="#0c0a09" stroke="#292524" stroke-width="1.5" />
            
            <!-- Window Title Bar -->
            <rect width="880" height="32" rx="10" fill="#181614" />
            <rect y="24" width="880" height="8" fill="#181614" />
            <line x1="0" y1="32" x2="880" y2="32" stroke="#292524" stroke-width="1" />
            
            <circle cx="20" cy="16" r="4.5" fill="#ef4444" opacity="0.8" />
            <circle cx="34" cy="16" r="4.5" fill="#f59e0b" opacity="0.8" />
            <circle cx="48" cy="16" r="4.5" fill="#10b981" opacity="0.8" />
            
            <text x="68" y="20" fill="#d6d3d1" font-family="monospace" font-size="10" font-weight="bold">
                [${escapeSvg(badge)}] ${escapeSvg(title)}
            </text>
            <text x="860" y="20" text-anchor="end" fill="#34d399" font-family="monospace" font-size="9" font-weight="bold">
                â— SIMULATION ACTIVE â€¢ 1 Gbps FULL-DUPLEX
            </text>

            <!-- Rendered Dynamic Diagram Body -->
            ${content}
        </svg>
    `;
}

// Master Array for 45 Lessons
const COURSE_MATERI_DATA = [];

// ==============================================================
// TRACK 1: MIKROTIK ROUTEROS (MATERI 1 - 15)
// ==============================================================
COURSE_MATERI_DATA.push(
    {
        num: 1,
        track: 'MikroTik RouterOS',
        badge: 'MikroTik â€¢ MTCNA',
        title: 'Materi 1: Akses Awal RouterOS, Winbox MAC-Telnet & Safe Mode',
        diagramType: 'winbox_access',
        diagramData: {
            node1: { label: 'PC Admin', ip: '192.168.88.254' },
            node2: { label: 'RB5009 Core', ip: '192.168.88.1' },
            node3: { label: 'ISP Gateway', ip: '103.28.12.1' },
            link1: 'MAC-Telnet L2',
            link2: 'WAN Uplink'
        },
        cli: `/system identity set name="AAMON-CORE-ROUTER"\n/user add name=arkin group=full password="SecurePass2026!"\n/user remove admin\n/tool mac-server set allowed-interface-list=LAN\n/tool mac-server mac-winbox set allowed-interface-list=LAN\n/ip service set telnet disabled=yes ftp disabled=yes api disabled=yes\n/system routerboard print`,
        penjelasan: `<p>Saat router MikroTik baru keluar dari pabrik atau selesai di-reset (no default configuration), perangkat belum memiliki alamat IP Layer 3. Administrator dapat mengakses router menggunakan <strong>Winbox MAC-Telnet</strong> (Layer 2) melalui protokol MNDP (MikroTik Neighbor Discovery Protocol) pada port UDP 20561.</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>Safe Mode (F4):</strong> Fitur penyelamat paling krusial bagi network engineer. Jika konfigurasi yang baru dimasukkan memutus koneksi remote TCP antara Winbox dan router, RouterOS akan otomatis membatalkan (rollback) seluruh perubahan dalam hitungan detik.</li>
            <li><strong>Hardening User:</strong> Selalu buat user baru dengan grup <code class="text-amber-400">full</code> dan hapus atau nonaktifkan user bawaan <code class="text-amber-400">admin</code>.</li>
            <li><strong>Nonaktifkan Service Tidak Terpakai:</strong> Matikan port FTP (21), Telnet (23), dan API (8728) untuk menutup celah eksploitasi brute-force scanner.</li>
        </ul>`,
        conclusion: `<p><strong>Best Practice Operasional:</strong> Selalu biasakan menekan tombol <strong class="text-emerald-400">Safe Mode</strong> sebelum mengeksekusi perintah filter firewall, routing policy, atau IP addressing jarak jauh. Batasi MAC-Winbox hanya dapat diakses melalui antarmuka LAN lokal, bukan dari antarmuka publik WAN.</p>`
    },
    {
        num: 2,
        track: 'MikroTik RouterOS',
        badge: 'MikroTik â€¢ MTCNA',
        title: 'Materi 2: IP Addressing, Subnetting, Bridge Interface & Host Isolation',
        diagramType: 'ip_bridge',
        diagramData: {
            node1: { label: 'Host ether2', ip: '192.168.88.10' },
            node2: { label: 'bridge-lan', ip: '192.168.88.1/24' },
            node3: { label: 'Host ether3', ip: '192.168.88.20' },
            link1: 'Port ether2',
            link2: 'Port ether3'
        },
        cli: `/interface bridge add name=bridge-lan comment="LAN Local Bridge" auto-mac=no admin-mac=D4:01:C3:00:00:01\n/interface bridge port add bridge=bridge-lan interface=ether2 hw=yes\n/interface bridge port add bridge=bridge-lan interface=ether3 hw=yes\n/interface bridge port add bridge=bridge-lan interface=ether4 hw=yes\n/ip address add address=192.168.88.1/24 interface=bridge-lan comment="Default LAN Subnet"\n/ip address add address=103.28.12.50/29 interface=ether1 comment="WAN Uplink ISP"`,
        penjelasan: `<p>Secara default pada router modular, setiap port ethernet adalah interface routed Layer 3 terpisah. Untuk menggabungkan port ether2 hingga ether5 menjadi satu switch Layer 2 dalam broadcast domain yang sama, kita membuat <strong>Bridge Interface</strong>.</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>Hardware Offloading (hw=yes):</strong> Meneruskan frame switching langsung ke switch chip internal router tanpa membebani CPU utama.</li>
            <li><strong>auto-mac=no & admin-mac:</strong> Menetapkan MAC address bridge secara statis dari port pertama agar tidak terjadi link flapping saat kabel LAN dicabut-pasang.</li>
            <li><strong>Subnet CIDR /24 vs /29:</strong> Subnet /24 (254 host) untuk LAN internal, dan /29 (6 host usable) untuk koneksi point-to-point publik ISP.</li>
        </ul>`,
        conclusion: `<p><strong>Best Practice Operasional:</strong> Selalu pasang alamat IP LAN pada interface <strong class="text-amber-400">bridge-lan</strong>, BUKAN pada fisik ether2 atau ether3. Menempelkan IP ke fisik port bridge port akan menyebabkan paket routing terpecah dan unreachability.</p>`
    },
    {
        num: 3,
        track: 'MikroTik RouterOS',
        badge: 'MikroTik â€¢ MTCNA',
        title: 'Materi 3: DHCP Server, IP Pool, Static Lease & DHCP Alert',
        diagramType: 'dhcp_service',
        diagramData: {
            node1: { label: 'DHCP Client PC', ip: '192.168.88.150' },
            node2: { label: 'DHCP Server Router', ip: '192.168.88.1' },
            node3: { label: 'Printer Server', ip: '192.168.88.10' },
            link1: 'DORA Handshake',
            link2: 'Static Binding'
        },
        cli: `/ip pool add name=pool-lan ranges=192.168.88.100-192.168.88.200\n/ip dhcp-server add name=dhcp-lan interface=bridge-lan address-pool=pool-lan lease-time=12h disabled=no\n/ip dhcp-server network add address=192.168.88.0/24 gateway=192.168.88.1 dns-server=192.168.88.1,8.8.8.8 comment="LAN DHCP Options"\n/ip dhcp-server lease add mac-address=D4:01:C3:44:55:66 address=192.168.88.10 comment="Static Lease Server"\n/ip dhcp-server alert add interface=bridge-lan valid-server=dhcp-lan on-alert=":log error 'ROGUE DHCP DETECTED!'" disabled=no`,
        penjelasan: `<p>Dynamic Host Configuration Protocol (DHCP) mendistribusikan konfigurasi IP secara otomatis kepada client melalui 4 tahap <strong>D.O.R.A</strong> (Discover, Offer, Request, Acknowledge).</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>Pemisahan IP Pool:</strong> Membatasi alokasi dinamis pada rentang .100 s/d .200, menyisakan rentang .2 s/d .99 untuk alokasi perangkat infrastruktur statis (Switch, AP, Server, NVR).</li>
            <li><strong>Static Lease Binding:</strong> Mengunci IP tertentu ke MAC address unik agar printer, server, dan scanner tidak berganti-ganti IP.</li>
            <li><strong>Rogue DHCP Alert:</strong> Fitur pemantauan untuk mendeteksi router liar atau access point salah colok yang membagikan IP salah di jaringan kantor.</li>
        </ul>`,
        conclusion: `<p><strong>Best Practice Operasional:</strong> Gunakan lease-time 12 jam s/d 24 jam untuk jaringan perkantoran, dan lease-time pendek (1 s/d 2 jam) untuk jaringan kafe/hotspot tamu agar persediaan IP pool tidak cepat habis terkuras.</p>`
    },
    {
        num: 4,
        track: 'MikroTik RouterOS',
        badge: 'MikroTik â€¢ MTCNA',
        title: 'Materi 4: DNS Resolver, Caching & Anti-DNS Hijack',
        diagramType: 'universal_topology',
        diagramData: {
            node1: { label: 'Client PC', ip: '192.168.88.100' },
            node2: { label: 'DNS Cache Router', ip: '192.168.88.1' },
            node3: { label: 'Public DNS 1.1.1.1', ip: '1.1.1.1' },
            link1: 'UDP 53 Redirect',
            link2: 'Recursive Query'
        },
        cli: `/ip dns set allow-remote-requests=yes servers=1.1.1.1,8.8.8.8 cache-size=4096KiB max-concurrent-queries=200\n/ip dns static add name=router.lan address=192.168.88.1\n/ip dns static add name=portal.kantor.id address=192.168.88.10\n/ip firewall nat add chain=dstnat protocol=udp dst-port=53 in-interface=bridge-lan action=redirect to-ports=53 comment="Force all DNS queries to router"\n/ip firewall nat add chain=dstnat protocol=tcp dst-port=53 in-interface=bridge-lan action=redirect to-ports=53 comment="Force TCP DNS to router"`,
        penjelasan: `<p>RouterOS dapat berfungsi sebagai server <strong>DNS Caching Resolver</strong> lokal. Saat ratusan komputer membuka situs yang sama, query DNS kedua dan seterusnya diambil seketika dari memori RAM router tanpa perlu bertanya lagi ke internet.</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>Static DNS Record:</strong> Memetakan nama domain lokal (misal <code class="text-amber-400">router.lan</code> atau <code class="text-amber-400">portal.kantor.id</code>) langsung ke server internal tanpa internet.</li>
            <li><strong>Anti-DNS Hijack (NAT Redirect):</strong> Mengalihkan paksa semua query UDP/TCP port 53 dari client ke router. Ini mencegah user bandel mengganti DNS manual di laptop untuk membobol filtering internet kantor.</li>
        </ul>`,
        conclusion: `<p><strong>PERINGATAN KRUSIAL:</strong> Saat mengaktifkan <code class="text-rose-400">allow-remote-requests=yes</code>, Anda <strong>WAJIB</strong> menutup port 53 UDP/TCP dari antarmuka WAN di Firewall Filter Input. Jika dibiarkan terbuka, router Anda akan dijadikan zombie Open DNS Resolver untuk serangan DDoS ke situs lain!</p>`
    },
    {
        num: 5,
        track: 'MikroTik RouterOS',
        badge: 'MikroTik â€¢ MTCNA',
        title: 'Materi 5: NAT Masquerade (PAT) & Port Forwarding (Dst-NAT)',
        diagramType: 'nat_masq',
        diagramData: {
            node1: { label: 'Internal Client', ip: '192.168.88.50' },
            node2: { label: 'NAT PAT Engine', ip: '103.28.12.50' },
            node3: { label: 'Web Server Public', ip: '1.1.1.1:443' },
            link1: 'Private Subnet',
            link2: 'Public WAN'
        },
        cli: `/ip firewall nat add chain=srcnat out-interface=ether1 action=masquerade comment="Masquerade Private LAN to WAN Public"\n/ip firewall nat add chain=dstnat in-interface=ether1 protocol=tcp dst-port=8443 action=dst-nat to-addresses=192.168.88.10 to-ports=443 comment="Forward Port 8443 WAN to Web Server HTTPS"\n/ip firewall nat add chain=dstnat in-interface=ether1 protocol=tcp dst-port=33890 action=dst-nat to-addresses=192.168.88.20 to-ports=3389 comment="Forward Custom RDP Port"`,
        penjelasan: `<p>Network Address Translation (NAT) menjembatani perbedaan antara rentang IP Private RFC 1918 internal dan IP Public internet global.</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>Source NAT (Masquerade / PAT):</strong> Mengubah alamat IP asal paket keluar menjadi IP antarmuka WAN router secara dinamis sehingga ribuan client dapat browsing bersamaan.</li>
            <li><strong>Destination NAT (Port Forwarding):</strong> Membuka akses dari internet luar ke server lokal di balik router. Contoh di atas meneruskan request ke port publik 8443 menuju port HTTPS 443 web server internal.</li>
        </ul>`,
        conclusion: `<p><strong>Best Practice Operasional:</strong> Jangan gunakan port default standar (seperti port 3389 RDP atau port 22 SSH) pada sisi port publik internet WAN. Gunakan port acak non-standar (misal port 33890) untuk meminimalkan paparan otomatis bot brute-force scanner.</p>`
    },
    {
        num: 6,
        track: 'MikroTik RouterOS',
        badge: 'MikroTik â€¢ MTCNA',
        title: 'Materi 6: Static Routing, Default Gateway & Metric Distance',
        diagramType: 'universal_topology',
        diagramData: {
            node1: { label: 'LAN Subnet', ip: '192.168.88.0/24' },
            node2: { label: 'MikroTik Core', ip: '103.28.12.50' },
            node3: { label: 'ISP Gateway', ip: '103.28.12.49' },
            link1: 'FIB Table',
            link2: 'Default Route'
        },
        cli: `/ip route add dst-address=0.0.0.0/0 gateway=103.28.12.49 distance=1 comment="Default Gateway ISP 1"\n/ip route add dst-address=10.10.0.0/16 gateway=192.168.88.254 distance=1 comment="Static Route to Office Branch"\n/ip route print\n/ip route check 8.8.8.8`,
        penjelasan: `<p>Tabel routing (FIB) menentukan rute perjalanan paket. Rute default dinyatakan dengan notasi <code class="text-amber-400">0.0.0.0/0</code> (Route of Last Resort), yaitu ke mana paket harus dikirim jika subnet tujuan tidak ditemukan di tabel rute internal.</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>Administrative Distance (Distance Metric):</strong> Parameter penentu prioritas rute jika ada rute ganda. Rute dengan distance terkecil (1) akan dipasang ke FIB sebagai rute aktif (<code class="text-emerald-400">A - Active</code>).</li>
            <li><strong>Flag Status Rute:</strong> <code class="text-emerald-400">DA</code> (Dynamic Active), <code class="text-sky-400">AS</code> (Active Static), <code class="text-purple-400">DAC</code> (Dynamic Active Connected).</li>
        </ul>`,
        conclusion: `<p><strong>Best Practice Operasional:</strong> Pastikan status rute di menu <code class="text-stone-200">/ip route</code> berstatus <strong>reachable</strong>. Jika gateway berstatus unreachable, periksa kabel fisik, setting IP antarmuka, dan tabel ARP.</p>`
    },
    {
        num: 7,
        track: 'MikroTik RouterOS',
        badge: 'MikroTik â€¢ MTCRE',
        title: 'Materi 7: Dual WAN Failover: Recursive Routing & Check Gateway Ping',
        diagramType: 'failover_dual_wan',
        diagramData: {
            node1: { label: 'Core Router', ip: 'Dual WAN' },
            node2: { label: 'ISP 1 (Fiber)', ip: 'Active Dist=1' },
            node3: { label: 'ISP 2 (4G/LTE)', ip: 'Standby Dist=2' },
            link1: 'Recursive Ping',
            link2: 'Floating Static'
        },
        cli: `# 1. Host Monitor Virtual untuk ISP 1 dan ISP 2\n/ip route add dst-address=8.8.8.8/32 gateway=103.28.12.49 scope=10 comment="Host Monitor ISP 1 Fiber"\n/ip route add dst-address=8.8.4.4/32 gateway=192.168.100.1 scope=10 comment="Host Monitor ISP 2 LTE"\n\n# 2. Rute Default Rekursif dengan Ping Check Gateway\n/ip route add dst-address=0.0.0.0/0 gateway=8.8.8.8 check-gateway=ping distance=1 target-scope=11 comment="Default GW Recursive ISP 1"\n/ip route add dst-address=0.0.0.0/0 gateway=8.8.4.4 check-gateway=ping distance=2 target-scope=11 comment="Default GW Recursive ISP 2"`,
        penjelasan: `<p>Bila kabel fiber optik ISP putus di jalan raya, port ethernet router MikroTik lokal biasanya tetap menyala (UP) karena modem ONT tidak mati listrik. Akibatnya failover standar tidak akan berjalan karena router mengira link masih hidup!</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>Recursive Routing:</strong> Teknik cerdas di mana router memantau langsung IP internet publik (misal DNS Google 8.8.8.8) melalui gateway ISP 1.</li>
            <li><strong>Check-Gateway=Ping:</strong> Router mengirim ICMP Ping tiap 10 detik. Jika 2x ping gagal berturut-turut, gateway 8.8.8.8 dinyatakan down, dan router seketika mengalihkan seluruh traffic ke ISP 2 (Distance 2) secara mulus!</li>
        </ul>`,
        conclusion: `<p><strong>Best Practice Operasional:</strong> Ini adalah standar emas konfigurasi failover dual-WAN perusahaan tanpa script external yang rumit. Pastikan nilai <code class="text-amber-400">target-scope</code> pada rute default bernilai 11 atau lebih besar dari nilai <code class="text-amber-400">scope</code> rute host monitor (10).</p>`
    },
    {
        num: 8,
        track: 'MikroTik RouterOS',
        badge: 'MikroTik â€¢ MTCTCE',
        title: 'Materi 8: Firewall Filter 3-Chains (Input, Forward, Output) & Stateful Drop',
        diagramType: 'firewall_filter',
        diagramData: {
            node1: { label: 'Input Chain', ip: 'Proteksi Router' },
            node2: { label: 'Forward Chain', ip: 'Transit Traffic' },
            node3: { label: 'Output Chain', ip: 'Local Traffic' },
            link1: 'Connection State',
            link2: 'Default Deny'
        },
        cli: `# 1. FastTrack & Stateful Inspection pada Forward Chain\n/ip firewall filter add chain=forward action=fasttrack-connection connection-state=established,related comment="FastTrack Established"\n/ip firewall filter add chain=forward action=accept connection-state=established,related comment="Accept Established/Related"\n/ip firewall filter add chain=forward action=drop connection-state=invalid comment="Drop Invalid Packets"\n/ip firewall filter add chain=forward action=drop connection-nat-state=!dstnat in-interface-list=WAN comment="Drop Unsolicited WAN Incoming"\n\n# 2. Hardening Input Chain (Proteksi Router)\n/ip firewall filter add chain=input action=accept connection-state=established,related comment="Accept Established Input"\n/ip firewall filter add chain=input action=drop connection-state=invalid comment="Drop Invalid Input"\n/ip firewall filter add chain=input action=accept in-interface-list=LAN comment="Allow All Input from Trusted LAN"\n/ip firewall filter add chain=input action=drop in-interface-list=WAN comment="Drop All Other Input from WAN"`,
        penjelasan: `<p>Firewall RouterOS bekerja berdasarkan arsitektur <strong>Stateful Packet Inspection</strong> dengan 3 rantai utama:</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>Input Chain:</strong> Memeriksa paket yang ditujukan langsung ke router itu sendiri (akses Winbox, SSH, DNS resolver, ICMP ping).</li>
            <li><strong>Forward Chain:</strong> Memeriksa paket yang hanya melintasi router antara client lokal dan server internet luar.</li>
            <li><strong>FastTrack Connection:</strong> Melompati kernel firewall filter untuk paket yang sudah terkonfirmasi valid (established), memangkas penggunaan CPU router hingga 80%!</li>
        </ul>`,
        conclusion: `<p><strong>Best Practice Operasional:</strong> Tempatkan rule <code class="text-emerald-400">established,related</code> pada baris pertama di setiap chain. Selalu akhiri chain dengan rule drop untuk trafik asing dari interface publik (Prinsip Zero-Trust / Default Deny).</p>`
    },
    {
        num: 9,
        track: 'MikroTik RouterOS',
        badge: 'MikroTik â€¢ MTCTCE',
        title: 'Materi 9: Simple Queue & PCQ Dynamic Bandwidth Sharing',
        diagramType: 'qos_queues',
        diagramData: {
            node1: { label: 'User Subnet', ip: '192.168.88.0/24' },
            node2: { label: 'PCQ Algorithm', ip: 'Fair Bandwidth' },
            node3: { label: 'ISP Pipe', ip: '50M / 50M' },
            link1: 'Classifier IP',
            link2: 'Queue Limiter'
        },
        cli: `# 1. Buat Queue Type PCQ untuk Download dan Upload\n/queue type add name=pcq-download kind=pcq pcq-rate=0 pcq-classifier=dst-address pcq-limit=50KiB pcq-total-limit=2000KiB\n/queue type add name=pcq-upload kind=pcq pcq-rate=0 pcq-classifier=src-address pcq-limit=50KiB pcq-total-limit=2000KiB\n\n# 2. Pasang pada Simple Queue Seluruh Subnet LAN\n/queue simple add name="PCQ-FairShare-LAN" target=192.168.88.0/24 max-limit=50M/50M queue=pcq-upload/pcq-download comment="Dynamic Fair Bandwidth Sharing"`,
        penjelasan: `<p>Dalam jaringan kantor atau kos-kosan, membatasi IP satu per satu secara manual sangat merepotkan. Algoritma <strong>Per Connection Queue (PCQ)</strong> membagi bandwidth secara otomatis dan dinamis berdasarkan jumlah user yang aktif secara real-time.</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>pcq-rate=0:</strong> Bandwidth 50 Mbps dibagi rata. Jika ada 2 user mendownload, masing-masing otomatis mendapat 25 Mbps. Jika ada 10 user mendownload, masing-masing otomatis mendapat 5 Mbps.</li>
            <li><strong>pcq-classifier:</strong> <code class="text-sky-400">dst-address</code> untuk lalu lintas download (ke arah komputer user), dan <code class="text-sky-400">src-address</code> untuk upload (dari arah komputer user).</li>
        </ul>`,
        conclusion: `<p><strong>Best Practice Operasional:</strong> Gunakan PCQ untuk meniadakan keluhan "internet lemot karena satu user mendownload IDM atau Torrent". Semua pengguna dijamin mendapatkan jatah bandwidth yang adil tanpa monopoli.</p>`
    },
    {
        num: 10,
        track: 'MikroTik RouterOS',
        badge: 'MikroTik â€¢ MTCTCE',
        title: 'Materi 10: Queue Tree & Mangle Packet Marking (TOS/DSCP Prioritization)',
        diagramType: 'qos_queues',
        diagramData: {
            node1: { label: 'VoIP Traffic', ip: 'Priority 1 (High)' },
            node2: { label: 'Queue Tree HTB', ip: 'Limit-at CIR' },
            node3: { label: 'Browsing Data', ip: 'Priority 8 (Low)' },
            link1: 'DSCP Marking',
            link2: 'Bandwidth Pipe'
        },
        cli: `# 1. Mangle Packet Marking pada Prerouting Chain\n/ip firewall mangle add chain=prerouting protocol=udp dst-port=5060,10000-20000 action=mark-packet new-packet-mark=pkt_voip passthrough=no comment="Mark VoIP/SIP Packets"\n/ip firewall mangle add chain=prerouting action=mark-packet new-packet-mark=pkt_general passthrough=no comment="Mark General Browsing"\n\n# 2. Bangun Hierarchical Token Bucket (HTB) Queue Tree\n/queue tree add name="Total-Download" parent=bridge-lan max-limit=100M\n/queue tree add name="Q-VoIP" parent="Total-Download" packet-mark=pkt_voip priority=1 limit-at=20M max-limit=100M comment="Guaranteed CIR Priority 1"\n/queue tree add name="Q-Browsing" parent="Total-Download" packet-mark=pkt_general priority=8 limit-at=10M max-limit=80M comment="Best Effort Priority 8"`,
        penjelasan: `<p>Tidak semua paket memiliki urgensi yang sama. Paket panggilan suara real-time (VoIP/Zoom/Meet) sangat rentan terhadap delay (jitter) dan packet loss. <strong>Queue Tree</strong> mengimplementasikan hierarki Quality of Service (QoS).</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>Mangle Packet Mark:</strong> Menandai paket data berdasarkan protocol dan port tanpa mengubah isi data.</li>
            <li><strong>Priority (1 s/d 8):</strong> Priority 1 (tertinggi) akan dilayani oleh buffer router terlebih dahulu sebelum paket priority 8 diproses.</li>
            <li><strong>Limit-at (CIR) vs Max-Limit (PIR):</strong> CIR adalah bandwidth minimum yang digaransi router meskipun pipa sedang penuh sesak.</li>
        </ul>`,
        conclusion: `<p><strong>Best Practice Operasional:</strong> Jangan gunakan Simple Queue dan Queue Tree secara bersamaan untuk interface yang sama jika tidak memahami urutan eksekusi packet flow, karena akan menimbulkan double shaping yang membingungkan.</p>`
    },
    {
        num: 11,
        track: 'MikroTik RouterOS',
        badge: 'MikroTik â€¢ MTCRE',
        title: 'Materi 11: Bridge VLAN Filtering RouterOS v7 dengan Hardware Offloading',
        diagramType: 'vlan_trunk',
        diagramData: {
            node1: { label: 'Access VLAN 10', ip: 'ether2' },
            node2: { label: 'Bridge VLAN v7', ip: 'HW-Offload' },
            node3: { label: 'Trunk Port', ip: 'ether1 Tagged' },
            link1: 'PVID 10',
            link2: '802.1Q Trunk'
        },
        cli: `/interface bridge add name=bridge-lan vlan-filtering=no\n/interface bridge port add bridge=bridge-lan interface=ether2 pvid=10 comment="Access Port VLAN 10 Sales"\n/interface bridge port add bridge=bridge-lan interface=ether3 pvid=20 comment="Access Port VLAN 20 HR"\n/interface bridge port add bridge=bridge-lan interface=ether1 comment="Trunk Port to Switch"\n/interface bridge vlan add bridge=bridge-lan vlan-ids=10 tagged=bridge-lan,ether1 untagged=ether2\n/interface bridge vlan add bridge=bridge-lan vlan-ids=20 tagged=bridge-lan,ether1 untagged=ether3\n/interface vlan add name=vlan10-mgmt vlan-id=10 interface=bridge-lan\n/ip address add address=192.168.10.1/24 interface=vlan10-mgmt\n/interface bridge set bridge-lan vlan-filtering=yes`,
        penjelasan: `<p>Sejak RouterOS v6.41 dan disempurnakan di RouterOS v7, standar resmi penanganan VLAN di MikroTik adalah menggunakan <strong>satu bridge tunggal</strong> dengan fitur <code class="text-amber-400">vlan-filtering=yes</code>.</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>L2 Hardware Offloading:</strong> Pada perangkat CRS3xx atau router RB5009, perutean frame switching VLAN diproses langsung di chipset switch hardware (wire-speed).</li>
            <li><strong>PVID (Port VLAN ID):</strong> Memberi tag VLAN otomatis pada paket untagged yang masuk melalui port access client.</li>
            <li><strong>Tagged vs Untagged:</strong> Tagged pada port trunk (ether1) dan bridge CPU, untagged pada port access PC end-user.</li>
        </ul>`,
        conclusion: `<p><strong>PERINGATAN KRUSIAL:</strong> Pastikan Anda memasukkan antarmuka <code class="text-amber-400">bridge-lan</code> sebagai port tagged dan mengaktifkan IP manajemen SEBELUM menjalankan perintah <code class="text-rose-400">vlan-filtering=yes</code>, agar tidak terputus (lockout) dari router.</p>`
    },
    {
        num: 12,
        track: 'MikroTik RouterOS',
        badge: 'MikroTik â€¢ MTCRE',
        title: 'Materi 12: OSPFv2 Single Area Backbone Routing (MikroTik v7)',
        diagramType: 'ospf_topology',
        diagramData: {
            node1: { label: 'R1-HQ-CORE', ip: 'RID: 10.255.255.1' },
            node2: { label: 'OSPF Area 0', ip: 'Subnet /30' },
            node3: { label: 'R2-BRANCH', ip: 'RID: 10.255.255.2' },
            link1: 'Link PtP Cost=10',
            link2: 'Adjacency FULL'
        },
        cli: `# 1. Konfigurasi Loopback Router ID yang Stabil\n/interface dummy add name=loopback0\n/ip address add address=10.255.255.1/32 interface=loopback0\n\n# 2. Konfigurasi OSPF v7 Instance & Area 0\n/routing ospf instance add name=ospf-core router-id=10.255.255.1\n/routing ospf area add name=backbone-area instance=ospf-core area-id=0.0.0.0\n\n# 3. Konfigurasi Interface Template\n/routing ospf interface-template add area=backbone-area networks=10.0.12.0/30 type=ptp cost=10 comment="Inter-Router Core Link"\n/routing ospf interface-template add area=backbone-area networks=192.168.88.0/24 passive=yes comment="Passive LAN Subnet"`,
        penjelasan: `<p>Open Shortest Path First (OSPF) adalah protokol routing dinamis Link-State berbasis algoritma Dijkstra SPF. RouterOS v7 memperkenalkan arsitektur OSPF baru berbasis <strong>Interface Templates</strong>.</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>Router ID (RID):</strong> Ditetapkan secara statis menggunakan alamat IP antarmuka loopback agar tidak berubah-ubah jika port fisik router down.</li>
            <li><strong>Network Type Point-to-Point (ptp):</strong> Meniadakan pemilihan DR (Designated Router) dan BDR pada link antar 2 router, mempercepat pembentukan adjacency dalam 3 detik.</li>
            <li><strong>Passive Interface:</strong> Mencegah broadcast paket OSPF Hello ke arah komputer client di LAN untuk alasan keamanan dan bandwidth.</li>
        </ul>`,
        conclusion: `<p><strong>Best Practice Operasional:</strong> Gunakan perintah <code class="text-stone-200">/routing ospf neighbor print</code> untuk memverifikasi status tetangga. Status adjacency yang benar dan stabil wajib berstatus <strong>Full</strong>.</p>`
    },
    {
        num: 13,
        track: 'MikroTik RouterOS',
        badge: 'MikroTik â€¢ MTCRE',
        title: 'Materi 13: OSPF Multi-Area, ABR & Virtual-Link Redundancy',
        diagramType: 'ospf_topology',
        diagramData: {
            node1: { label: 'Area 1 (HQ)', ip: 'Subnet 10.1.0.0/16' },
            node2: { label: 'ABR Router', ip: 'Area 0 & 1' },
            node3: { label: 'Area 0 (Backbone)', ip: 'Core Network' },
            link1: 'Area Range Summary',
            link2: 'LSA Type 3'
        },
        cli: `/routing ospf area add name=area-hq instance=ospf-core area-id=0.0.0.1\n/routing ospf interface-template add area=area-hq networks=10.1.0.0/16 type=broadcast\n/routing ospf area range add area=area-hq prefix=10.1.0.0/16 advertise=yes comment="Summarize Subnets to Area 0"\n/routing ospf area virtual-link add name=vlink-to-area0 neighbor-id=10.255.255.10 transit-area=area-hq`,
        penjelasan: `<p>Pada jaringan skala enterprise dengan puluhan router, membagi topologi menjadi beberapa area OSPF sangat penting untuk mencegah pemborosan memori CPU akibat banjir LSA (Link State Advertisement).</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>Area Border Router (ABR):</strong> Router yang memiliki satu atau lebih antarmuka di Area 0 dan antarmuka lain di Area 1.</li>
            <li><strong>Route Summarization:</strong> ABR merangkum ratusan subnet kecil di Area 1 menjadi satu prefix besar (<code class="text-amber-400">10.1.0.0/16</code>) ke arah Backbone, memangkas ukuran tabel routing dan menjaga stabilitas rute.</li>
            <li><strong>Virtual Link:</strong> Jalur terowongan logis darurat jika ada area yang tidak bisa terhubung langsung secara fisik ke Area 0 Backbone.</li>
        </ul>`,
        conclusion: `<p><strong>Best Practice Operasional:</strong> Semua area non-backbone (Area 1, 2, dst) wajib menyentuh Area 0 Backbone secara langsung. Gunakan Virtual Link hanya sebagai solusi sementara saat migrasi topologi darurat.</p>`
    },
    {
        num: 14,
        track: 'MikroTik RouterOS',
        badge: 'MikroTik â€¢ MTCNA',
        title: 'Materi 14: WireGuard VPN Site-to-Site & Remote Access Peer',
        diagramType: 'universal_topology',
        diagramData: {
            node1: { label: 'Kantor Cabang', ip: '192.168.20.0/24' },
            node2: { label: 'WireGuard Tunnel', ip: 'UDP 13231' },
            node3: { label: 'Kantor Pusat (HQ)', ip: '192.168.10.0/24' },
            link1: 'Public Key Auth',
            link2: 'ChaCha20 Crypto'
        },
        cli: `# 1. Di Router Kantor Pusat (HQ)\n/interface wireguard add name=wg-s2s listen-port=13231 private-key="<HQ-PRIVATE-KEY>"\n/ip address add address=10.200.0.1/30 interface=wg-s2s\n/interface wireguard peers add interface=wg-s2s public-key="<CABANG-PUBLIC-KEY>" allowed-address=10.200.0.2/32,192.168.20.0/24\n\n# 2. Di Router Kantor Cabang\n/interface wireguard add name=wg-s2s listen-port=13231 private-key="<CABANG-PRIVATE-KEY>"\n/ip address add address=10.200.0.2/32 interface=wg-s2s\n/interface wireguard peers add interface=wg-s2s public-key="<HQ-PUBLIC-KEY>" endpoint-address="203.0.113.1" endpoint-port=13231 allowed-address=10.200.0.1/32,192.168.10.0/24 persistent-keepalive=25s\n/ip route add dst-address=192.168.10.0/24 gateway=10.200.0.1`,
        penjelasan: `<p><strong>WireGuard</strong> adalah protokol VPN generasi baru di kernel Linux dan MikroTik RouterOS v7 yang menggantikan protokol lawas seperti PPTP, L2TP/IPsec, dan OpenVPN.</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>Kriptografi Modern:</strong> Memanfaatkan Curve25519, ChaCha20-Poly1305, dan BLAKE2s dengan overhead CPU yang sangat rendah sehingga menghasilkan throughput gigabit.</li>
            <li><strong>Allowed Address:</strong> Berfungsi ganda sebagai Access Control List dan Crypto-Key Routing. Paket hanya akan dienkripsi jika subnet tujuan cocok dengan daftar allowed-address.</li>
            <li><strong>Persistent Keepalive:</strong> Mengirim paket probe kecil tiap 25 detik agar koneksi di balik modem NAT provider tidak terputus (NAT hole punching).</li>
        </ul>`,
        conclusion: `<p><strong>Best Practice Operasional:</strong> WireGuard tidak menggunakan konsep client-server, melainkan arsitektur peer-to-peer simetris. Simpan private key dengan aman dan jangan pernah dibagikan kepada siapa pun.</p>`
    },
    {
        num: 15,
        track: 'MikroTik RouterOS',
        badge: 'MikroTik â€¢ MTCWE',
        title: 'Materi 15: Hotspot Gateway, User Manager RADIUS & Walled Garden',
        diagramType: 'universal_topology',
        diagramData: {
            node1: { label: 'Guest Smartphone', ip: '10.5.50.150' },
            node2: { label: 'Hotspot Captive Portal', ip: '10.5.50.1' },
            node3: { label: 'RADIUS User Manager', ip: '127.0.0.1' },
            link1: 'HTTP 80 Redirect',
            link2: 'Voucher Auth'
        },
        cli: `/ip hotspot setup\n# Pilih interface=bridge-guest, local-address=10.5.50.1/24, pool=hs-pool, dns=wifi.kantor.id\n/ip hotspot user profile add name="Voucher-1-Hari" rate-limit="5M/5M" shared-users=1 status-autorefresh=1m\n/ip hotspot walled-garden add dst-host="*.bca.co.id" action=allow comment="Payment Gateway Bypass"\n/ip hotspot walled-garden ip add dst-address=103.28.12.10 action=accept comment="Local Portal Bypass"\n/radius add service=hotspot address=127.0.0.1 secret="radius-secret-2026" comment="Local User Manager"`,
        penjelasan: `<p>Fitur <strong>Hotspot Gateway</strong> MikroTik menyediakan autentikasi pengguna publik melalui halaman browser interaktif (Captive Portal), ideal untuk kafe, hotel, dan kantor publik.</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>Mekanisme Captive Portal:</strong> Mengintersepsi paket HTTP port 80 dari perangkat yang belum login dan me-redirect browser mereka ke halaman autentikasi internal.</li>
            <li><strong>Walled Garden:</strong> Mengizinkan akses ke situs web atau server tertentu (misal portal kampus, payment gateway Midtrans/BCA) tanpa mengharuskan pengguna login terlebih dahulu.</li>
            <li><strong>User Manager RADIUS:</strong> Sistem backend terintegrasi untuk mencetak ribuan kode voucher unik dengan batasan kuota data (GB) dan batas durasi waktu (Jam/Hari).</li>
        </ul>`,
        conclusion: `<p><strong>Best Practice Operasional:</strong> Gunakan SSL Certificate valid (Let's Encrypt) pada DNS name hotspot (misal <code class="text-stone-200">wifi.kantor.id</code>) agar smartphone modern (Android/iOS) tidak menampilkan peringatan "Koneksi Tidak Aman" saat halaman login muncul.</p>`
    }
);

// ==============================================================
// TRACK 2: CISCO CCNA 200-301 (MATERI 16 - 30)
// ==============================================================
COURSE_MATERI_DATA.push(
    {
        num: 16,
        track: 'Cisco CCNA 200-301',
        badge: 'Cisco â€¢ CCNA Fund',
        title: 'Materi 16: Cisco IOS CLI Modes, Hostname, Passwords & SSH v2',
        diagramType: 'universal_topology',
        diagramData: {
            node1: { label: 'Admin Laptop', ip: '192.168.1.100' },
            node2: { label: 'Cisco Catalyst 2960', ip: '192.168.1.254' },
            node3: { label: 'Management VLAN 1', ip: 'SSH Port 22' },
            link1: 'Console / SSHv2',
            link2: 'Out-of-Band'
        },
        cli: `enable\nconfigure terminal\nhostname SW-CORE-01\nenable secret Cisco@Secret2026!\nservice password-encryption\nip domain-name enterprise.local\ncrypto key generate rsa modulus 2048\nip ssh version 2\nusername admin privilege 15 secret Admin@SSH99!\nline con 0\n logging synchronous\n login local\nline vty 0 4\n transport input ssh\n login local\n exit\nbanner motd # AUTHORIZED ACCESS ONLY - ALL ACTIVITY IS LOGGED #\nend\nwrite memory`,
        penjelasan: `<p>Cisco Internetwork Operating System (IOS) memiliki 3 hierarki mode akses:</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>User EXEC Mode (>):</strong> Mode pengamatan dasar dengan hak akses terbatas.</li>
            <li><strong>Privileged EXEC Mode (#):</strong> Diakses dengan perintah <code class="text-amber-400">enable</code> untuk menjalankan perintah verifikasi mendalam (<code class="text-stone-200">show</code> dan <code class="text-stone-200">debug</code>).</li>
            <li><strong>Global Configuration Mode ((config)#):</strong> Mode untuk mengubah konfigurasi perangkat switch/router.</li>
            <li><strong>Pengamanan SSHv2 2048-bit:</strong> Menggantikan Telnet yang tidak terenkripsi. Perintah <code class="text-amber-400">transport input ssh</code> mengunci port VTY agar hanya menerima koneksi kriptografi SSH.</li>
        </ul>`,
        conclusion: `<p><strong>Best Practice Operasional:</strong> Jangan gunakan perintah <code class="text-rose-400">enable password</code> karena hanya menggunakan enkripsi XOR yang sangat mudah di-crack. Selalu gunakan <code class="text-emerald-400">enable secret</code> yang diamankan dengan algoritma hashing SHA-256 / MD5.</p>`
    },
    {
        num: 17,
        track: 'Cisco CCNA 200-301',
        badge: 'Cisco â€¢ CCNA Fund',
        title: 'Materi 17: IPv4 VLSM Subnetting & CIDR Addressing Hierarchy',
        diagramType: 'universal_topology',
        diagramData: {
            node1: { label: 'Subnet P2P /30', ip: '10.0.0.0/30' },
            node2: { label: 'Core Router', ip: 'VLSM Hierarchy' },
            node3: { label: 'User LAN /26', ip: '192.168.10.0/26' },
            link1: 'P2P Link (2 Host)',
            link2: 'LAN (62 Host)'
        },
        cli: `configure terminal\ninterface GigabitEthernet0/0/0\n description Uplink Point-to-Point ke Router ISP\n ip address 10.0.0.1 255.255.255.252\n no shutdown\ninterface GigabitEthernet0/0/1\n description Subnet LAN Kantor /26 (Maks 62 Host)\n ip address 192.168.10.1 255.255.255.192\n no shutdown\nend\nshow ip interface brief`,
        penjelasan: `<p>Variable Length Subnet Masking (VLSM) adalah teknik membagi blok IP address menjadi subnet-subnet berukuran bervariasi sesuai kebutuhan riil perangkat, mencegah pemborosan IP publik/privat.</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>Subnet /30 (255.255.255.252):</strong> Menyediakan 2 IP usable, sempurna untuk link point-to-point antar 2 router.</li>
            <li><strong>Subnet /26 (255.255.255.192):</strong> Menyediakan 62 IP usable untuk departemen dengan kebutuhan menengah.</li>
            <li><strong>Perhitungan Cepat:</strong> Blok subnet /26 memiliki interval kelipatan 64 (0, 64, 128, 192). Broadcast IP adalah angka terakhir sebelum blok berikutnya (misal 63).</li>
        </ul>`,
        conclusion: `<p><strong>Best Practice Operasional:</strong> Rancang skema pengalamatan IP hierarkis dari awal. Susun alokasi subnet yang bersebelahan (contiguous) agar di kemudian hari mudah dirangkum (summarized) dalam satu baris tabel rute.</p>`
    },
    {
        num: 18,
        track: 'Cisco CCNA 200-301',
        badge: 'Cisco â€¢ CCNA Switch',
        title: 'Materi 18: VLAN Setup & Access Port Assignment (Cisco Catalyst)',
        diagramType: 'universal_topology',
        diagramData: {
            node1: { label: 'PC-Sales (VLAN 10)', ip: 'Fa0/1' },
            node2: { label: 'Catalyst 2960', ip: 'VLAN Database' },
            node3: { label: 'PC-Eng (VLAN 20)', ip: 'Fa0/2' },
            link1: 'Access VLAN 10',
            link2: 'Access VLAN 20'
        },
        cli: `configure terminal\nvlan 10\n name SALES_DEPT\nvlan 20\n name ENGINEERING\ninterface FastEthernet0/1\n description PC Sales 01\n switchport mode access\n switchport access vlan 10\n spanning-tree portfast\ninterface FastEthernet0/2\n description PC Engineering 01\n switchport mode access\n switchport access vlan 20\n spanning-tree portfast\nend\nshow vlan brief`,
        penjelasan: `<p>Virtual Local Area Network (VLAN) memecah satu switch fisik menjadi beberapa broadcast domain logis terisolasi pada Layer 2 OSI.</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>Isolasi Keamanan:</strong> Komputer di VLAN 10 (Sales) tidak dapat menyadap atau membroadcast frame ke komputer di VLAN 20 (Engineering) tanpa perantara router Layer 3.</li>
            <li><strong>Switchport Mode Access:</strong> Mengonfigurasi port fisik switch agar hanya meneruskan frame standar tanpa tag VLAN (untagged) ke komputer client.</li>
            <li><strong>Spanning-Tree PortFast:</strong> Mempercepat port host langsung aktif ke status Forwarding tanpa menunggu 30-50 detik delay STP listening/learning.</li>
        </ul>`,
        conclusion: `<p><strong>Best Practice Operasional:</strong> Selalu beri nama yang deskriptif pada setiap VLAN (<code class="text-amber-400">name SALES_DEPT</code>). Verifikasi keanggotaan port dengan perintah <code class="text-stone-200">show vlan brief</code>.</p>`
    },
    {
        num: 19,
        track: 'Cisco CCNA 200-301',
        badge: 'Cisco â€¢ CCNA Switch',
        title: 'Materi 19: 802.1Q Trunking & Native VLAN Security Hardening',
        diagramType: 'vlan_trunk',
        diagramData: {
            node1: { label: 'Switch Distribusi', ip: 'Gi0/1 Trunk' },
            node2: { label: '802.1Q Trunk', ip: 'VLAN 10,20,99' },
            node3: { label: 'Switch Core', ip: 'Gi0/1 Trunk' },
            link1: 'Tagged Frames',
            link2: 'Native VLAN 99'
        },
        cli: `configure terminal\ninterface GigabitEthernet0/1\n description Trunk Uplink ke Switch Core\n switchport trunk encapsulation dot1q\n switchport mode trunk\n switchport trunk allowed vlan 10,20,99\n switchport trunk native vlan 99\n switchport nonegotiate\nend\nshow interfaces trunk`,
        penjelasan: `<p>Link <strong>Trunk</strong> digunakan untuk membawa traffic dari banyak VLAN sekaligus melintasi satu kabel fisik antar switch menggunakan standard enkapsulasi <strong>IEEE 802.1Q</strong>.</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>Tag 802.1Q:</strong> Menyisipkan header 4-byte tambahan ke dalam frame ethernet yang memuat informasi 12-bit VLAN ID (1 s/d 4094).</li>
            <li><strong>Native VLAN Hardening:</strong> Secara default Native VLAN adalah VLAN 1. Mengubahnya ke VLAN 99 yang tidak digunakan memitigasi serangan cyber <em>Double-Tagging VLAN Hopping</em>.</li>
            <li><strong>switchport nonegotiate:</strong> Mematikan protokol DTP (Dynamic Trunking Protocol) agar penyerang tidak bisa memanipulasi port menjadi trunk liar.</li>
        </ul>`,
        conclusion: `<p><strong>Best Practice Operasional:</strong> Batasi selalu VLAN yang diizinkan melintasi trunk dengan perintah <code class="text-amber-400">switchport trunk allowed vlan &lt;list&gt;</code> untuk menghemat bandwidth trunk link.</p>`
    },
    {
        num: 20,
        track: 'Cisco CCNA 200-301',
        badge: 'Cisco â€¢ CCNA Route',
        title: 'Materi 20: Inter-VLAN Routing: Router-on-a-Stick (802.1Q Sub-interfaces)',
        diagramType: 'vlan_trunk',
        diagramData: {
            node1: { label: 'Sub-int Gi0/0.10', ip: '192.168.10.1' },
            node2: { label: 'Cisco Router Core', ip: 'Inter-VLAN ROAS' },
            node3: { label: 'Sub-int Gi0/0.20', ip: '192.168.20.1' },
            link1: 'Encaps dot1Q 10',
            link2: 'Encaps dot1Q 20'
        },
        cli: `configure terminal\ninterface GigabitEthernet0/0/0\n no ip address\n no shutdown\ninterface GigabitEthernet0/0/0.10\n description Gateway Default VLAN 10 Sales\n encapsulation dot1Q 10\n ip address 192.168.10.1 255.255.255.0\ninterface GigabitEthernet0/0/0.20\n description Gateway Default VLAN 20 Engineering\n encapsulation dot1Q 20\n ip address 192.168.20.1 255.255.255.0\nend\nshow ip route`,
        penjelasan: `<p>Metode <strong>Router-on-a-Stick (ROAS)</strong> memungkinkan router me-route paket antar VLAN yang berbeda hanya dengan satu interface fisik router yang dihubungkan ke port trunk switch.</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>Logical Sub-interface:</strong> Interface fisik Gi0/0/0 dibagi menjadi beberapa sub-interface logis (.10 dan .20).</li>
            <li><strong>encapsulation dot1Q &lt;id&gt;:</strong> Menentukan tag VLAN mana yang akan diterima dan dilepaskan oleh sub-interface tersebut saat memproses paket routing.</li>
            <li><strong>Default Gateway:</strong> Alamat IP sub-interface (192.168.10.1) dijadikan default gateway pada komputer client VLAN 10.</li>
        </ul>`,
        conclusion: `<p><strong>ATURAN PENTING:</strong> Perintah <code class="text-amber-400">encapsulation dot1Q &lt;vlan-id&gt;</code> <strong>WAJIB</strong> diketik SEBELUM mengetik perintah <code class="text-amber-400">ip address</code>, jika tidak Cisco IOS akan menolak perintah penetapan IP.</p>`
    },
    {
        num: 21,
        track: 'Cisco CCNA 200-301',
        badge: 'Cisco â€¢ CCNA Switch',
        title: 'Materi 21: Inter-VLAN Routing: Layer 3 Switch SVI & IP Routing',
        diagramType: 'universal_topology',
        diagramData: {
            node1: { label: 'VLAN 10 Access', ip: 'Port Fa0/1' },
            node2: { label: 'Catalyst 3560/3850', ip: 'L3 Hardware ASIC' },
            node3: { label: 'VLAN 20 Access', ip: 'Port Fa0/2' },
            link1: 'SVI Vlan10',
            link2: 'SVI Vlan20'
        },
        cli: `configure terminal\nip routing\ninterface Vlan10\n description SVI Gateway VLAN 10 Sales\n ip address 192.168.10.1 255.255.255.0\n no shutdown\ninterface Vlan20\n description SVI Gateway VLAN 20 Engineering\n ip address 192.168.20.1 255.255.255.0\n no shutdown\nend\nshow ip route`,
        penjelasan: `<p>Pada jaringan kampus atau gedung bertingkat, metode Router-on-a-Stick memiliki keterbatasan bottleneck throughput karena semua traffic inter-VLAN harus bolak-balik melewati kabel router eksternal. Solusinya adalah <strong>Layer 3 Switch</strong>.</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>ip routing:</strong> Mengaktifkan mesin perutean paket Layer 3 di switch multilayer Cisco.</li>
            <li><strong>Switched Virtual Interface (SVI):</strong> Antarmuka logis virtual (interface Vlan10) yang berfungsi sebagai default gateway bagi perangkat di VLAN tersebut.</li>
            <li><strong>Wire-Speed Routing:</strong> Perutean diproses langsung di chipset hardware ASIC switch pada kecepatan kawat (Gigabit/10G) dengan latency sub-mikrodetik.</li>
        </ul>`,
        conclusion: `<p><strong>Best Practice Operasional:</strong> Pastikan minimal satu port fisik dalam VLAN tersebut berada dalam status UP/UP agar interface SVI tidak mengalami status <em>down/down</em> (SVI Autostate feature).</p>`
    },
    {
        num: 22,
        track: 'Cisco CCNA 200-301',
        badge: 'Cisco â€¢ CCNA Switch',
        title: 'Materi 22: Spanning Tree Protocol (STP) & Rapid PVST+ with PortFast & BPDU Guard',
        diagramType: 'universal_topology',
        diagramData: {
            node1: { label: 'Access Switch', ip: 'Blocking Alternate' },
            node2: { label: 'Root Bridge', ip: 'Priority 4096' },
            node3: { label: 'Distribution SW', ip: 'Forwarding' },
            link1: 'Rapid PVST+',
            link2: 'BPDU Guard'
        },
        cli: `configure terminal\nspanning-tree mode rapid-pvst\nspanning-tree vlan 10,20 priority 4096\ninterface range FastEthernet0/1 - 24\n switchport mode access\n spanning-tree portfast\n spanning-tree bpduguard enable\nend\nshow spanning-tree summary\nshow spanning-tree root`,
        penjelasan: `<p>Koneksi redundan antar switch fisik Layer 2 sangat penting untuk high availability, namun dapat menimbulkan bencana fatal: <strong>Switching Loop</strong> dan <strong>Broadcast Storm</strong> yang dapat melumpuhkan seluruh jaringan dalam hitungan detik.</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>Rapid PVST+ (IEEE 802.1w):</strong> Mengurangi waktu pemulihan link putus dari 50 detik menjadi kurang dari 2 detik.</li>
            <li><strong>Root Bridge Election:</strong> Switch dengan nilai Bridge Priority terendah (4096) akan terpilih menjadi pusat topologi (Root Bridge).</li>
            <li><strong>BPDU Guard:</strong> Fitur proteksi vital pada port komputer. Jika ada orang iseng mencolokkan switch ilegal ke stopkontak dinding, port switch otomatis mati (err-disabled) untuk melindungi jaringan kantor!</li>
        </ul>`,
        conclusion: `<p><strong>Best Practice Operasional:</strong> Jangan biarkan pemilihan Root Bridge terjadi secara kebetulan (default priority 32768). Selalu tetapkan switch core utama Anda secara eksplisit menjadi priority 4096 atau <code class="text-stone-200">spanning-tree vlan X root primary</code>.</p>`
    },
    {
        num: 23,
        track: 'Cisco CCNA 200-301',
        badge: 'Cisco â€¢ CCNA Switch',
        title: 'Materi 23: Link Aggregation: LACP (802.3ad) EtherChannel & PAgP',
        diagramType: 'universal_topology',
        diagramData: {
            node1: { label: 'Switch A', ip: 'Gi0/1 + Gi0/2' },
            node2: { label: 'Port-Channel 1', ip: '2 Gbps Bundled' },
            node3: { label: 'Switch B', ip: 'Gi0/1 + Gi0/2' },
            link1: 'LACP Active',
            link2: 'LACP Active'
        },
        cli: `configure terminal\ninterface range GigabitEthernet0/1 - 2\n description Uplink Bundle ke Switch Core\n channel-group 1 mode active\ninterface Port-channel 1\n switchport mode trunk\n switchport trunk allowed vlan 10,20,99\nend\nshow etherchannel summary`,
        penjelasan: `<p>Spanning Tree Protocol secara normal akan memblokir kabel kedua yang dipasang antar 2 switch. <strong>EtherChannel</strong> menggabungkan 2 hingga 8 kabel fisik menjadi satu link virtual tunggal berkecepatan ganda (Link Aggregation).</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>Kombinasi Kecepatan & Redundansi:</strong> Dua kabel 1 Gbps digabung menjadi pipa 2 Gbps. Jika salah satu kabel putus, traffic otomatis mengalir lewat kabel yang tersisa tanpa pemutusan sesi TCP!</li>
            <li><strong>LACP Mode Active:</strong> Menggunakan protokol standar industri IEEE 802.3ad (Link Aggregation Control Protocol) yang kompatibel dengan multi-vendor (Cisco, MikroTik, Linux Bond).</li>
        </ul>`,
        conclusion: `<p><strong>Best Practice Operasional:</strong> Semua port fisik dalam bundle wajib memiliki parameter yang identik: speed, duplex, access/trunk mode, allowed vlan, dan native vlan. Verifikasi status dengan <code class="text-stone-200">show etherchannel summary</code> (status harus bertanda <strong>SU</strong>: Switched / In-Use).</p>`
    },
    {
        num: 24,
        track: 'Cisco CCNA 200-301',
        badge: 'Cisco â€¢ CCNA Service',
        title: 'Materi 24: Cisco IOS DHCP Server & DHCP Relay (ip helper-address)',
        diagramType: 'dhcp_service',
        diagramData: {
            node1: { label: 'Client VLAN 20', ip: '192.168.20.50' },
            node2: { label: 'Cisco Router / SVI', ip: 'ip helper-address' },
            node3: { label: 'Central DHCP Server', ip: '192.168.10.250' },
            link1: 'Broadcast L2',
            link2: 'Unicast L3 Relay'
        },
        cli: `configure terminal\nip dhcp excluded-address 192.168.10.1 192.168.10.20\nip dhcp pool POOL_SALES\n network 192.168.10.0 255.255.255.0\n default-router 192.168.10.1\n dns-server 8.8.8.8 1.1.1.1\n domain-name enterprise.local\n lease 7\ninterface Vlan20\n description SVI Engineering (Relay ke Server DHCP Pusat)\n ip address 192.168.20.1 255.255.255.0\n ip helper-address 192.168.10.250\nend\nshow ip dhcp binding`,
        penjelasan: `<p>Perangkat Cisco IOS dapat bertindak sebagai <strong>DHCP Server</strong> mandiri atau sebagai <strong>DHCP Relay Agent</strong>.</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>ip dhcp excluded-address:</strong> Wajib dikonfigurasi pertama kali untuk mengecualikan alamat IP default gateway, switch, printer, dan server dari pembagian acak.</li>
            <li><strong>ip helper-address:</strong> Paket broadcast DHCP Discover dari client tidak dapat menembus router Layer 3. Perintah helper-address mengubah broadcast Layer 2 menjadi paket unicast Layer 3 yang diarahkan langsung ke server DHCP pusat di VLAN/gedung lain.</li>
        </ul>`,
        conclusion: `<p><strong>Best Practice Operasional:</strong> Gunakan perintah <code class="text-stone-200">show ip dhcp conflict</code> untuk melihat jika ada client yang menggunakan IP statis ilegal yang bertabrakan dengan pool DHCP.</p>`
    },
    {
        num: 25,
        track: 'Cisco CCNA 200-301',
        badge: 'Cisco â€¢ CCNA Sec',
        title: 'Materi 25: Standard & Extended IPv4 Access Control Lists (ACL)',
        diagramType: 'firewall_filter',
        diagramData: {
            node1: { label: 'HR Dept Subnet', ip: '192.168.20.0/24' },
            node2: { label: 'Extended ACL Filter', ip: 'Inspect IP/Port' },
            node3: { label: 'Data Server Farm', ip: '192.168.10.50:443' },
            link1: 'Permit HTTPS',
            link2: 'Deny Telnet/SSH'
        },
        cli: `configure terminal\nip access-list extended ACL_PROTECT_SERVERS\n remark Izinkan Departemen HR akses HTTPS ke Web Server\n permit tcp 192.168.20.0 0.0.0.255 host 192.168.10.50 eq 443\n remark Izinkan Administrator SSH ke Server\n permit tcp host 192.168.99.10 host 192.168.10.50 eq 22\n remark Blokir seluruh akses lain ke subnet server\n deny ip any 192.168.10.0 0.0.0.255\n remark Izinkan sisa trafik lain melintas\n permit ip any any\ninterface GigabitEthernet0/0/1\n ip access-group ACL_PROTECT_SERVERS in\nend\nshow access-lists`,
        penjelasan: `<p>Access Control Lists (ACL) adalah instrumen penyaring paket data pada router/switch Layer 3 Cisco.</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>ACL Standard (1-99):</strong> Hanya memeriksa IP address sumber (Source IP). Ditempatkan sedekat mungkin ke tujuan (Destination).</li>
            <li><strong>ACL Extended (100-199 / Named):</strong> Memeriksa Source IP, Destination IP, Protocol (TCP/UDP/ICMP), dan Nomor Port spesifik (eq 443, eq 22). Ditempatkan sedekat mungkin ke sumber (Source) untuk menghemat bandwidth.</li>
            <li><strong>Implicit Deny Any:</strong> Setiap baris akhir ACL Cisco memiliki aturan rahasia <code class="text-rose-400">deny ip any any</code> yang membuang paket jika tidak ada rule yang cocok.</li>
        </ul>`,
        conclusion: `<p><strong>Best Practice Operasional:</strong> Gunakan Named ACL (<code class="text-stone-200">ip access-list extended &lt;name&gt;</code>) dibanding Numbered ACL karena memudahkan penghapusan dan penyisipan baris aturan baru tanpa perlu menghapus seluruh ACL.</p>`
    },
    {
        num: 26,
        track: 'Cisco CCNA 200-301',
        badge: 'Cisco â€¢ CCNA Service',
        title: 'Materi 26: Cisco Dynamic NAT & Overload (PAT)',
        diagramType: 'nat_masq',
        diagramData: {
            node1: { label: 'Inside LAN Subnet', ip: '192.168.1.0/24' },
            node2: { label: 'NAT Overload (PAT)', ip: 'Public Gi0/0/0' },
            node3: { label: 'Internet Global', ip: 'Public Cloud' },
            link1: 'ip nat inside',
            link2: 'ip nat outside'
        },
        cli: `configure terminal\naccess-list 1 permit 192.168.1.0 0.0.0.255\ninterface GigabitEthernet0/0/0\n description Interface Publik Menghadap ISP\n ip nat outside\ninterface GigabitEthernet0/0/1\n description Interface Privat Menghadap LAN Internal\n ip nat inside\nip nat inside source list 1 interface GigabitEthernet0/0/0 overload\nend\nshow ip nat translations\nshow ip nat statistics`,
        penjelasan: `<p>Port Address Translation (PAT) di perangkat Cisco diaktifkan menggunakan parameter kata kunci <code class="text-amber-400">overload</code>.</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>ip nat inside vs outside:</strong> Menentukan domain batas jaringan lokal privat (inside) dan internet publik (outside).</li>
            <li><strong>Kombinasi Standard ACL:</strong> Access-list 1 menentukan subnet host mana saja yang diizinkan untuk ditranslasikan ke luar.</li>
            <li><strong>show ip nat translations:</strong> Menampilkan tabel sesi aktif yang memuat pemetaan Inside Local (IP privat) ke Inside Global (IP publik dan port unik).</li>
        </ul>`,
        conclusion: `<p><strong>Best Practice Operasional:</strong> Jika koneksi internet mati mendadak padahal link fisik menyala, selalu periksa apakah perintah <code class="text-amber-400">ip nat inside</code> atau <code class="text-amber-400">ip nat outside</code> terhapus secara tidak sengaja di interface.</p>`
    },
    {
        num: 27,
        track: 'Cisco CCNA 200-301',
        badge: 'Cisco â€¢ CCNA Route',
        title: 'Materi 27: Cisco OSPFv2 Single Area 0 Configuration & Verification',
        diagramType: 'ospf_topology',
        diagramData: {
            node1: { label: 'R1-HQ-CORE', ip: '1.1.1.1' },
            node2: { label: 'OSPF Area 0', ip: '10.0.12.0/30' },
            node3: { label: 'R2-BRANCH', ip: '2.2.2.2' },
            link1: 'Cost=10',
            link2: 'Adjacency FULL'
        },
        cli: `configure terminal\ninterface Loopback0\n ip address 1.1.1.1 255.255.255.255\nrouter ospf 1\n router-id 1.1.1.1\n network 10.0.12.0 0.0.0.3 area 0\n network 192.168.10.0 0.0.0.255 area 0\n passive-interface GigabitEthernet0/0/1\ninterface GigabitEthernet0/0/0\n ip ospf cost 10\n ip ospf hello-interval 10\n ip ospf dead-interval 40\nend\nshow ip ospf neighbor\nshow ip route ospf`,
        penjelasan: `<p>OSPFv2 di Cisco IOS menggunakan konsep <strong>Wildcard Mask</strong> (inversi dari subnet mask normal) untuk mendefinisikan rentang IP interface yang diikutsertakan dalam proses routing dinamis.</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>Wildcard Mask 0.0.0.3:</strong> Inversi dari mask /30 (255.255.255.252) untuk mencocokkan interface point-to-point.</li>
            <li><strong>Hello & Dead Interval:</strong> Parameter ini WAJIB identik pada kedua router bertetangga (default 10 detik Hello, 40 detik Dead). Jika tidak cocok, status OSPF Adjacency tidak akan pernah terbentuk!</li>
            <li><strong>show ip ospf neighbor:</strong> Status tetangga harus berstatus <strong>FULL/DR</strong>, <strong>FULL/BDR</strong>, atau <strong>FULL/DROTHER</strong>.</li>
        </ul>`,
        conclusion: `<p><strong>Best Practice Operasional:</strong> Gunakan perintah <code class="text-stone-200">passive-interface</code> pada semua interface yang terhubung ke komputer client untuk mencegah eksploitasi penyuntikan rute OSPF ilegal dari sisi pengguna.</p>`
    },
    {
        num: 28,
        track: 'Cisco CCNA 200-301',
        badge: 'Cisco â€¢ CCNA Route',
        title: 'Materi 28: Cisco OSPFv2 Multi-Area Routing, ABR & Summarization',
        diagramType: 'ospf_topology',
        diagramData: {
            node1: { label: 'Area 1 Branch', ip: '10.1.0.0/16' },
            node2: { label: 'Cisco ABR Router', ip: 'Area 0 & Area 1' },
            node3: { label: 'Area 0 Backbone', ip: 'Core Network' },
            link1: 'LSA Type 3 Summary',
            link2: 'Inter-Area O IA'
        },
        cli: `configure terminal\nrouter ospf 1\n router-id 2.2.2.2\n network 10.0.0.0 0.0.0.3 area 0\n network 10.1.1.0 0.0.0.255 area 1\n network 10.1.2.0 0.0.0.255 area 1\n area 1 range 10.1.0.0 255.255.0.0\nend\nshow ip ospf\nshow ip route ospf`,
        penjelasan: `<p>Pada topologi OSPF Multi-Area, router yang menghubungkan Area 0 (Backbone) dan Area Non-Backbone disebut <strong>Area Border Router (ABR)</strong>.</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>area range &lt;prefix&gt; &lt;mask&gt;:</strong> Dijalankan di router ABR untuk merangkum rute internal Area 1 menjadi satu rute ringkasan ke Area 0.</li>
            <li><strong>LSA Type 3 (Summary LSA):</strong> Dibuat oleh ABR untuk mengumumkan rute dari satu area ke area lainnya. Di tabel routing router lain, rute ini muncul dengan kode <code class="text-amber-400">O IA</code> (OSPF Inter-Area).</li>
        </ul>`,
        conclusion: `<p><strong>Best Practice Operasional:</strong> Route summarization mencegah terjadinya fluktuasi rute (route flapping). Jika salah satu subnet /24 di Area 1 putus-nyambung, router di Area 0 tidak perlu menghitung ulang algoritma SPF.</p>`
    },
    {
        num: 29,
        track: 'Cisco CCNA 200-301',
        badge: 'Cisco â€¢ CCNA Fund',
        title: 'Materi 29: First Hop Redundancy Protocol: HSRP (Hot Standby Router Protocol)',
        diagramType: 'failover_dual_wan',
        diagramData: {
            node1: { label: 'Active Router A', ip: 'Pri 110 (Active)' },
            node2: { label: 'Virtual Gateway IP', ip: '192.168.10.1' },
            node3: { label: 'Standby Router B', ip: 'Pri 100 (Standby)' },
            link1: 'HSRP Preempt',
            link2: 'Interface Tracking'
        },
        cli: `configure terminal\ninterface GigabitEthernet0/0/1\n description Gateway LAN Subnet Sales\n ip address 192.168.10.2 255.255.255.0\n standby version 2\n standby 10 ip 192.168.10.1\n standby 10 priority 110\n standby 10 preempt\n standby 10 authentication md5 key-string HsrpPass2026\n standby 10 track GigabitEthernet0/0/0 20\nend\nshow standby brief`,
        penjelasan: `<p>Jika satu default gateway router fisik mati, seluruh client di LAN akan kehilangan akses internet. <strong>Hot Standby Router Protocol (HSRP)</strong> menyediakan redundansi gateway otomatis.</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>Virtual IP (192.168.10.1):</strong> Alamat IP virtual bersama yang dijadikan konfigurasi default gateway di komputer pengguna.</li>
            <li><strong>Active vs Standby:</strong> Router dengan priority tertinggi (110) menjadi Active Router yang menangani lalu lintas data. Router cadangan (priority default 100) berada dalam status Standby.</li>
            <li><strong>Preempt Feature:</strong> Memastikan router utama otomatis mengambil alih kembali peran Active setelah selesai reboot/maintenance.</li>
            <li><strong>Interface Tracking:</strong> Jika jalur internet publik WAN (Gi0/0/0) putus, priority otomatis dikurangi 20 (menjadi 90), seketika memicu failover instan ke Router B!</li>
        </ul>`,
        conclusion: `<p><strong>Best Practice Operasional:</strong> Gunakan HSRP Version 2 (<code class="text-stone-200">standby version 2</code>) karena mendukung IPv6, ID grup hingga 4095, dan menggunakan alamat multicast standar 224.0.0.102.</p>`
    },
    {
        num: 30,
        track: 'Cisco CCNA 200-301',
        badge: 'Cisco â€¢ CCNA Mgmt',
        title: 'Materi 30: CDP, LLDP, NTP & SNMPv3 Monitoring Configuration',
        diagramType: 'universal_topology',
        diagramData: {
            node1: { label: 'Catalyst Switch', ip: 'CDP / LLDP Run' },
            node2: { label: 'NMS Zabbix/PRTG', ip: 'SNMPv3 SHA/AES' },
            node3: { label: 'NTP Time Server', ip: 'id.pool.ntp.org' },
            link1: 'Telemetry Data',
            link2: 'Time Sync UDP 123'
        },
        cli: `configure terminal\ncdp run\nlldp run\nntp server 202.158.40.1 prefer\nsnmp-server group SECURE_NMS v3 priv read VIEW_ALL\nsnmp-server view VIEW_ALL iso included\nsnmp-server user nms_admin SECURE_NMS v3 auth sha AuthPass999! priv aes 128 PrivPass999!\nend\nshow cdp neighbors detail\nshow lldp neighbors\nshow ntp status`,
        penjelasan: `<p>Manajemen dan pemantauan perangkat jaringan modern membutuhkan 4 pilar penting:</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>CDP & LLDP:</strong> Protokol discovery Layer 2 untuk melihat detail perangkat tetangga yang tersambung kabel (tipe perangkat, port lokal, port remote, dan versi IOS).</li>
            <li><strong>NTP (Network Time Protocol):</strong> Menyamakan jam seluruh router dan switch ke milidetik yang presisi. Sangat krusial untuk sinkronisasi log forensik audit keamanan saat terjadi insiden hacking.</li>
            <li><strong>SNMPv3:</strong> Protokol pemantauan grafis CPU/RAM dan bandwidth interface ke server monitoring (Zabbix/PRTG) yang dilengkapi otentikasi SHA dan enkripsi AES 128-bit.</li>
        </ul>`,
        conclusion: `<p><strong>Best Practice Operasional:</strong> Nonaktifkan CDP/LLDP pada port-port yang menghadap langsung ke komputer client publik (<code class="text-stone-200">no cdp enable</code> / <code class="text-stone-200">no lldp transmit</code>) untuk mencegah attacker memetakan arsitektur switch Anda.</p>`
    }
);

// ==============================================================
// TRACK 3 TO 7: CCNP, DEVNET, SECURITY, FIBER OPTIC, LINUX & FORTINET (MATERI 31 - 45)
// ==============================================================
COURSE_MATERI_DATA.push(
    {
        num: 31,
        track: 'Cisco CCNP Enterprise',
        badge: 'Cisco â€¢ CCNP ENCOR',
        title: 'Materi 31: BGP Fundamentals: eBGP Peering & Prefix Advertisement',
        diagramType: 'bgp_topology',
        diagramData: {
            node1: { label: 'AS 65001 (ISP Alpha)', ip: '198.51.100.1' },
            node2: { label: 'eBGP TCP 179', ip: 'Direct Subnet /30' },
            node3: { label: 'AS 65002 (Enterprise)', ip: '203.0.113.1' },
            link1: 'eBGP Session',
            link2: 'Prefix Advertise'
        },
        cli: `configure terminal\nrouter bgp 65002\n bgp router-id 203.0.113.1\n bgp log-neighbor-changes\n neighbor 198.51.100.1 remote-as 65001\n neighbor 198.51.100.1 description PEERING_TO_ISP_ALPHA\n address-family ipv4 unicast\n  neighbor 198.51.100.1 activate\n  network 203.0.113.0 mask 255.255.255.0\n exit-address-family\nend\nshow ip bgp summary\nshow ip bgp neighbors 198.51.100.1 advertised-routes`,
        penjelasan: `<p>Border Gateway Protocol (BGP) adalah protokol routing eksterior (EGP) yang menjadi tulang punggung perutean internet global antarsistem otonom (Autonomous System).</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>eBGP Peering:</strong> Membentuk sesi komunikasi point-to-point di atas sesi TCP Port 179 dengan router upstream ISP yang berbeda nomor AS.</li>
            <li><strong>Syarat Prefix Masuk ke BGP:</strong> Subnet dan netmask pada perintah <code class="text-amber-400">network</code> harus ada dan cocok persis di dalam tabel routing IGP/connected router.</li>
            <li><strong>show ip bgp summary:</strong> Status tetangga BGP yang normal dan stabil wajib menampilkan angka jumlah prefix yang diterima (misal <code class="text-emerald-400">PfxRcd: 15</code>), BUKAN berstatus <em>Active</em> atau <em>Idle</em>.</li>
        </ul>`,
        conclusion: `<p><strong>Best Practice Operasional:</strong> Selalu terapkan Route-Map atau Prefix-List filter pada sisi outbound saat peering BGP untuk mencegah terjadinya <em>BGP Route Leak</em> yang dapat membelokkan trafik internet publik dunia ke jaringan kantor Anda.</p>`
    },
    {
        num: 32,
        track: 'Cisco CCNP Enterprise',
        badge: 'Cisco â€¢ CCNP ENCOR',
        title: 'Materi 32: BGP Path Selection: Weight, Local-Pref & AS-Path Prepend',
        diagramType: 'bgp_topology',
        diagramData: {
            node1: { label: 'Primary ISP (Local-Pref 200)', ip: 'Outbound Best' },
            node2: { label: 'Enterprise Core BGP', ip: 'AS-Path Engine' },
            node3: { label: 'Backup ISP (AS-Prepend x3)', ip: 'Inbound Backup' },
            link1: 'Weight / Local-Pref',
            link2: 'AS Prepend'
        },
        cli: `configure terminal\nroute-map SET_PRIMARY_OUTBOUND permit 10\n set local-preference 200\nroute-map PREPEND_BACKUP_INBOUND permit 10\n set as-path prepend 65002 65002 65002\nrouter bgp 65002\n address-family ipv4 unicast\n  neighbor 198.51.100.1 route-map SET_PRIMARY_OUTBOUND in\n  neighbor 198.51.100.5 route-map PREPEND_BACKUP_INBOUND out\n exit-address-family\nend\nclear ip bgp * soft`,
        penjelasan: `<p>BGP tidak menggunakan metrik cost sederhana seperti OSPF, melainkan serangkaian atribut jalur (Path Attributes) dalam <strong>BGP Best Path Selection Algorithm</strong>.</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>Local Preference:</strong> Menentukan jalur keluar (Outbound) terbaik bagi seluruh router dalam satu AS. Nilai tertinggi (200) lebih diprioritaskan dibanding default (100).</li>
            <li><strong>AS-Path Prepending:</strong> Teknik mempengaruhi jalur masuk (Inbound) dari internet ke server internal dengan cara memalsukan penambahan nomor AS sendiri berulang kali (65002 65002 65002) sehingga router ISP global menganggap jalur tersebut jauh lebih panjang.</li>
            <li><strong>clear ip bgp * soft:</strong> Me-refresh kebijakan rute BGP secara halus tanpa memutus sesi TCP koneksi peering.</li>
        </ul>`,
        conclusion: `<p><strong>Best Practice Operasional:</strong> Gunakan Local Preference untuk mengontrol jalur download/outbound kantor, dan gunakan AS-Path Prepending untuk mengontrol jalur upload/inbound dari internet.</p>`
    },
    {
        num: 33,
        track: 'Cisco CCNP Enterprise',
        badge: 'Cisco â€¢ CCNP ENCOR',
        title: 'Materi 33: OSPF Tuning: Link Costs, Passive Interfaces & Redistribution',
        diagramType: 'ospf_topology',
        diagramData: {
            node1: { label: 'Gigabit Link', ip: 'Cost=10' },
            node2: { label: 'Reference BW 10G', ip: 'auto-cost 10000' },
            node3: { label: 'BGP to OSPF Redist', ip: 'Route Tagging' },
            link1: 'Cost Tuning',
            link2: 'Mutual Redist'
        },
        cli: `configure terminal\nrouter ospf 1\n auto-cost reference-bandwidth 10000\n passive-interface default\n no passive-interface GigabitEthernet0/0/0\n no passive-interface GigabitEthernet0/0/1\n redistribute bgp 65002 subnets metric 20 metric-type 1 route-map BGP_TO_OSPF\nroute-map BGP_TO_OSPF permit 10\n set tag 9999\nend\nshow ip ospf interface brief`,
        penjelasan: `<p>Secara default, rumus metrik OSPF Cisco adalah 100 Mbps dibagi interface bandwidth. Akibatnya interface 100 Mbps, 1 Gbps, dan 10 Gbps semuanya memiliki nilai cost yang sama persis (1)!</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>auto-cost reference-bandwidth 10000:</strong> Menaikkan basis kalkulasi ke 10 Gbps agar OSPF dapat membedakan kecepatan kabel optik 10G (cost 1), 1G (cost 10), dan 100M (cost 100).</li>
            <li><strong>passive-interface default:</strong> Strategi keamanan terbaik dengan mematikan paket OSPF Hello pada seluruh antarmuka secara default, kemudian membuka satu per satu hanya port inter-router yang sah.</li>
            <li><strong>Route Tagging:</strong> Menandai prefix hasil redistribusi dengan tag numerik (9999) untuk mencegah terjadinya perputaran rute bolak-balik (Routing Loop) antar protokol.</li>
        </ul>`,
        conclusion: `<p><strong>Best Practice Operasional:</strong> Nilai <code class="text-amber-400">reference-bandwidth</code> wajib disamakan pada SELURUH router di dalam domain OSPF yang sama agar kalkulasi metrik jalur tidak mengalami anomali asimetris.</p>`
    },
    {
        num: 34,
        track: 'Cisco DevNet Automation',
        badge: 'DevNet â€¢ Python Netmiko',
        title: 'Materi 34: Python Network Automation dengan Netmiko (Multi-Device Backup)',
        diagramType: 'netmiko_auto',
        diagramData: {
            node1: { label: 'Python Script', ip: 'netmiko / SSH' },
            node2: { label: 'Cisco Fleet', ip: 'IOS-XE 192.168.1.1' },
            node3: { label: 'MikroTik Fleet', ip: 'RouterOS 192.168.1.2' },
            link1: 'Auto Backup (2s)',
            link2: 'Config Push'
        },
        cli: `# File: network_backup_runner.py\nfrom netmiko import ConnectHandler\nimport datetime\n\ndevices = [\n    {'device_type': 'cisco_ios', 'host': '192.168.1.1', 'username': 'admin', 'password': 'SecPassword123!', 'secret': 'Secret99'},\n    {'device_type': 'mikrotik_routeros', 'host': '192.168.1.2', 'username': 'admin', 'password': 'SecPassword123!'}\n]\n\ntimestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M")\nfor dev in devices:\n    print(f"[*] Connecting to {dev['host']}...")\n    net_connect = ConnectHandler(**dev)\n    if dev['device_type'] == 'cisco_ios':\n        net_connect.enable()\n        output = net_connect.send_command('show running-config')\n    else:\n        output = net_connect.send_command('/export')\n    with open(f"backup_{dev['host']}_{timestamp}.rsc", "w") as f:\n        f.write(output)\n    net_connect.disconnect()\n    print(f"[+] Backup complete for {dev['host']}")`,
        penjelasan: `<p>Mengonfigurasi dan mem-backup puluhan perangkat router/switch secara manual satu per satu via terminal adalah proses yang lambat dan rawan human-error. Pustaka <strong>Netmiko</strong> (Python) mengotomatisasi koneksi SSH multi-vendor.</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>Abstraksi Multi-Vendor:</strong> Netmiko menangani perbedaan prompt CLI antara Cisco (<code class="text-stone-200">show running-config</code>) dan MikroTik (<code class="text-stone-200">/export</code>) secara elegan.</li>
            <li><strong>Automated Backup:</strong> Script dapat dijadwalkan via Cron Linux atau Task Scheduler Windows tiap tengah malam untuk mengarsipkan backup konfigurasi seluruh kantor secara otomatis.</li>
        </ul>`,
        conclusion: `<p><strong>Best Practice Operasional:</strong> Gunakan variabel environment (<code class="text-amber-400">os.getenv()</code>) atau vault terenkripsi untuk menyimpan password perangkat, jangan pernah menyimpan credential plaintext di dalam source code repository Git.</p>`
    },
    {
        num: 35,
        track: 'Cisco DevNet Automation',
        badge: 'DevNet â€¢ RESTCONF YANG',
        title: 'Materi 35: RESTCONF API, YANG Data Models & Python Requests (RFC 8040)',
        diagramType: 'netmiko_auto',
        diagramData: {
            node1: { label: 'REST Client', ip: 'Python Requests' },
            node2: { label: 'RESTCONF HTTPS:443', ip: 'RFC 8040 YANG' },
            node3: { label: 'Cisco Catalyst 9000', ip: 'IOS-XE Programmable' },
            link1: 'application/yang-data+json',
            link2: 'HTTP GET / POST'
        },
        cli: `# File: restconf_interface_reader.py\nimport requests, json\nimport urllib3\nurllib3.disable_warnings()\n\nurl = "https://192.168.1.1/restconf/data/ietf-interfaces:interfaces"\nheaders = {\n    "Accept": "application/yang-data+json",\n    "Content-Type": "application/yang-data+json"\n}\nauth = ("admin", "SecPassword123!")\n\nresponse = requests.get(url, headers=headers, auth=auth, verify=False)\nif response.status_code == 200:\n    data = response.json()\n    print(json.dumps(data, indent=2))\nelse:\n    print(f"Error {response.status_code}: {response.text}")`,
        penjelasan: `<p><strong>Model-Driven Programmability</strong> menggantikan scraping teks CLI mentah dengan API terstruktur. Protokol <strong>RESTCONF (RFC 8040)</strong> menyediakan antarmuka REST API berbasis HTTP di atas model data <strong>YANG</strong>.</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>HTTP Verbs:</strong> <code class="text-emerald-400">GET</code> untuk membaca data status/running-config, <code class="text-amber-400">POST</code> untuk menambah entitas baru, dan <code class="text-purple-400">PATCH</code> untuk mengubah parameter interface.</li>
            <li><strong>Payload JSON Standar:</strong> Respons perangkat dikembalikan dalam struktur JSON bersih yang langsung dapat diproses oleh aplikasi web portofolio atau pipeline CI/CD.</li>
        </ul>`,
        conclusion: `<p><strong>Best Practice Operasional:</strong> RESTCONF jauh lebih tahan terhadap pembaruan versi firmware dibandingkan parsing regex CLI, karena struktur model YANG bersifat standar dan tidak terpengaruh perubahan format output terminal.</p>`
    },
    {
        num: 36,
        track: 'Cyber Security & Packet Defense',
        badge: 'Security â€¢ Wireshark Forensik',
        title: 'Materi 36: Deep Packet Inspection Wireshark: TCP Handshake & RST Anomaly',
        diagramType: 'wireshark_pcap',
        diagramData: {
            node1: { label: 'Client Laptop', ip: '192.168.1.50' },
            node2: { label: 'Wireshark Sniffer', ip: 'Pcap Filter' },
            node3: { label: 'Target Server', ip: '203.0.113.10:443' },
            link1: 'SYN -> SYN/ACK -> ACK',
            link2: 'RST Anomaly'
        },
        cli: `# Wireshark Display Filter Syntax untuk Investigasi Jaringan:\n# 1. Filter Hanya Paket TCP SYN (Inisiasi Koneksi)\ntcp.flags.syn == 1 && tcp.flags.ack == 0\n\n# 2. Filter Koneksi yang Diputus Paksa (RST Anomaly / Serangan)\ntcp.flags.reset == 1\n\n# 3. Filter Domain Web HTTPS yang Diakses User (SNI TLS)\ntls.handshake.type == 1\n\n# 4. Filter Anomali Latensi Tinggi & Retransmisi Paket\ntcp.analysis.retransmission || tcp.analysis.lost_segment`,
        penjelasan: `<p>Analisis paket (Packet Analysis) menggunakan <strong>Wireshark</strong> adalah keahlian mendasar seorang Network Operations Center (NOC) Engineer dan Security Analyst.</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>TCP 3-Way Handshake:</strong> <code class="text-sky-400">SYN</code> (Client meminta koneksi) âž” <code class="text-emerald-400">SYN-ACK</code> (Server menyetujui) âž” <code class="text-amber-400">ACK</code> (Koneksi terbentuk - ESTABLISHED).</li>
            <li><strong>Flag TCP RST (Reset):</strong> Paket RST yang muncul tanpa penutupan 4-Way FIN normal menandakan port firewall tertutup, layanan aplikasi mati, atau terjadi serangan Port Scan Reconnaissance.</li>
            <li><strong>Deteksi SNI TLS:</strong> Melihat domain HTTPS yang diakses client secara transparan pada paket TLS Client Hello tanpa perlu membongkar enkripsi payload.</li>
        </ul>`,
        conclusion: `<p><strong>Best Practice Operasional:</strong> Gunakan capture filter (<code class="text-stone-200">host 192.168.1.50</code>) sebelum memulai recording untuk membatasi ukuran file pcap agar memory RAM komputer tidak mengalami freeze.</p>`
    },
    {
        num: 37,
        track: 'Cyber Security & Packet Defense',
        badge: 'Security â€¢ Layer 2 Hardening',
        title: 'Materi 37: Layer 2 Security Hardening: Port Security, DHCP Snooping & DAI',
        diagramType: 'universal_topology',
        diagramData: {
            node1: { label: 'Host Port Fa0/1', ip: 'Sticky MAC Lock' },
            node2: { label: 'Catalyst Switch L2', ip: 'DHCP Snooping + DAI' },
            node3: { label: 'Trusted DHCP Server', ip: 'Uplink Gi0/1 (Trust)' },
            link1: 'Port Security',
            link2: 'Binding Table'
        },
        cli: `configure terminal\n# 1. DHCP Snooping & DAI Global\nip dhcp snooping\nip dhcp snooping vlan 10,20\nip arp inspection vlan 10,20\n\n# 2. Port Uplink ke Router/Server (TRUSTED)\ninterface GigabitEthernet0/1\n ip dhcp snooping trust\n ip arp inspection trust\n\n# 3. Port Akses Komputer User (UNTRUSTED)\ninterface range FastEthernet0/1 - 24\n switchport mode access\n switchport port-security\n switchport port-security maximum 2\n switchport port-security violation shutdown\n switchport port-security mac-address sticky\nend\nshow ip dhcp snooping binding\nshow port-security interface fa0/1`,
        penjelasan: `<p>Lapisan data link (Layer 2) adalah lapisan yang paling rapuh dari serangan lokal internal kantor.</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>DHCP Snooping:</strong> Memblokir access point liar atau router yang membagikan IP salah (Rogue DHCP Server) dengan hanya memperbolehkan jawaban DHCP Offer keluar dari port <em>Trusted</em>.</li>
            <li><strong>Dynamic ARP Inspection (DAI):</strong> Mencegah serangan Man-in-the-Middle (MitM) ARP Poisoning dengan memvalidasi keaslian IP-to-MAC dari tabel binding DHCP Snooping.</li>
            <li><strong>Port Security Sticky MAC:</strong> Mengunci port switch hanya pada MAC address komputer pertama yang dicolokkan. Jika ada yang melepas kabel dan mencolokkan laptop pribadi, port seketika mati (<code class="text-rose-400">err-disabled</code>)!</li>
        </ul>`,
        conclusion: `<p><strong>Best Practice Operasional:</strong> Selalu set perintah <code class="text-amber-400">ip dhcp snooping trust</code> pada port uplink, jika lupa maka seluruh komputer di kantor tidak akan bisa memperoleh alamat IP!</p>`
    },
    {
        num: 38,
        track: 'Cyber Security & Packet Defense',
        badge: 'Security â€¢ DDoS Defense',
        title: 'Materi 38: Stateful Firewall Inspection, SYN Flood Defense & TCP SYN Cookies',
        diagramType: 'firewall_filter',
        diagramData: {
            node1: { label: 'Attacker SYN Flood', ip: 'Spoofed IPs' },
            node2: { label: 'Firewall Rate Limiter', ip: 'TCP SYN Cookies' },
            node3: { label: 'Protected Server', ip: 'Port 80/443' },
            link1: 'Limit 50/s Burst 100',
            link2: 'Cryptographic ACK'
        },
        cli: `# Konfigurasi Linux Kernel & Iptables Firewall Defense\n# 1. Aktifkan TCP SYN Cookies di Kernel Linux\nsudo sysctl -w net.ipv4.tcp_syncookies=1\nsudo sysctl -w net.ipv4.tcp_max_syn_backlog=4096\n\n# 2. Rate Limiting Paket SYN di Firewall Iptables\nsudo iptables -N SYN_FLOOD\nsudo iptables -A INPUT -p tcp --syn -j SYN_FLOOD\nsudo iptables -A SYN_FLOOD -m limit --limit 50/s --limit-burst 100 -j RETURN\nsudo iptables -A SYN_FLOOD -j LOG --log-prefix "[SYN-FLOOD-DROP]: "\nsudo iptables -A SYN_FLOOD -j DROP\n\n# 3. Simpan Konfigurasi Permanen di sysctl.conf\necho "net.ipv4.tcp_syncookies = 1" | sudo tee -a /etc/sysctl.conf`,
        penjelasan: `<p>Serangan <strong>TCP SYN Flood</strong> membanjiri antrean memori server dengan ribuan paket SYN tanpa pernah mengirim balasan ACK akhir, membuat server kehabisan memori RAM dan menolak client yang sah.</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>TCP SYN Cookies:</strong> Mekanisme kriptografi cerdas di mana kernel server tidak mengalokasikan memori saat menerima paket SYN. Server mengodekan status koneksi ke dalam nomor urut Initial Sequence Number (ISN).</li>
            <li><strong>Verifikasi Matematis:</strong> Memori baru dialokasikan hanya setelah client membalas paket ACK yang memuat cookie kriptografi yang valid.</li>
            <li><strong>Rate Limiting (50/s):</strong> Membatasi laju koneksi baru per detik sehingga scanner penyerang otomatis diblokir di pintu perimeter.</li>
        </ul>`,
        conclusion: `<p><strong>Best Practice Operasional:</strong> Pastikan parameter <code class="text-emerald-400">tcp_syncookies = 1</code> selalu aktif di seluruh server web, DNS, dan gateway edge jaringan Anda.</p>`
    },
    {
        num: 39,
        track: 'Fiber Optic FTTH & TIFO',
        badge: 'Fiber â€¢ FTTH ODN Design',
        title: 'Materi 39: Topologi ODN (Optical Distribution Network): OLT -> FDT -> FAT -> Roset -> ONT',
        diagramType: 'ftth_odn',
        diagramData: {
            node1: { label: 'OLT Central Office', ip: '+3 dBm Tx' },
            node2: { label: 'FDT / ODC 1:4', ip: 'Loss -7.2 dB' },
            node3: { label: 'FAT / ODP 1:8', ip: 'Loss -10.5 dB' },
            link1: 'Feeder Cable',
            link2: 'Drop Core 150m'
        },
        cli: `# Parameter Standar Optical Distribution Network (ODN) Telkom Indonesia:\nOLT Optical Transceiver: Class B+ (+1.5 dBm s/d +5.0 dBm @ 1490nm Downstream)\nFeeder Cable: Single Mode ITU-T G.652D (0.35 dB/km @ 1310nm, 0.22 dB/km @ 1550nm)\nFDT / ODC (Optical Distribution Cabinet): Passive Splitter PLC 1:4 (Loss -7.2 dB)\nFAT / ODP (Optical Distribution Point): Passive Splitter PLC 1:8 (Loss -10.5 dB)\nDrop Cable: ITU-T G.657A Bending Insensitive (2-Core Drop Wire)\nRoset & Patchcord: SC/APC Green Connector (Angle Physical Contact)\nStandar Redaman Rx ONT Telkom: -14.0 dBm s/d -23.0 dBm (Prima / Zero Loss)`,
        penjelasan: `<p>Jaringan akses pita lebar berbasis <strong>Gigabit Passive Optical Network (GPON)</strong> menggunakan arsitektur point-to-multipoint tanpa ada perangkat aktif bertenaga listrik di sepanjang jalur outdoor.</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>Optical Line Terminal (OLT):</strong> Perangkat induk pemancar laser di Central Office / STO Telkom.</li>
            <li><strong>Kombinasi Splitter 1:32:</strong> Menggabungkan splitter 1:4 di rumah kabel FDT/ODC dan splitter 1:8 di tiang FAT/ODP. Satu port PON OLT dapat melayani 32 rumah pelanggan!</li>
            <li><strong>Konektor SC/APC (Hijau):</strong> Memiliki ujung potongan miring 8 derajat untuk meminimalkan pantulan balik laser (Optical Return Loss > 60 dB).</li>
        </ul>`,
        conclusion: `<p><strong>Best Practice Operasional:</strong> Jangan gunakan konektor biru SC/UPC pada jaringan GPON fiber optic karena pantulan baliknya dapat merusak modul pemancar laser SFP OLT dalam jangka panjang.</p>`
    },
    {
        num: 40,
        track: 'Fiber Optic FTTH & TIFO',
        badge: 'Fiber â€¢ Power Budgeting',
        title: 'Materi 40: Perhitungan Link Power Budget & Optical Redaman (dBm/dB) Standar Telkom',
        diagramType: 'ftth_odn',
        diagramData: {
            node1: { label: 'OLT Tx SFP B+', ip: '+3.0 dBm' },
            node2: { label: 'Total Loss ODN', ip: '22.27 dB' },
            node3: { label: 'ONT Rx Sensitivity', ip: '-19.27 dBm (PRIMA)' },
            link1: 'Alpha Fiber 0.35',
            link2: 'Splitter 1:32'
        },
        cli: `# RUMUS PERHITUNGAN POWER BUDGET GPON:\n# Total Loss = (L_kabel * Alpha) + Splitter_1 + Splitter_2 + (N_splice * 0.1) + (N_conn * 0.5) + Margin\n\n# CONTOH KASUS REAL LAPANGAN:\n# Panjang Feeder = 6.0 km  -> 6.0 * 0.35 dB = 2.10 dB\n# Panjang Distribusi = 1.5 km -> 1.5 * 0.35 dB = 0.52 dB\n# Panjang Drop Core = 150 m -> 0.15 * 0.35 dB = 0.05 dB\n# Splitter 1 (ODC 1:4) = 7.20 dB\n# Splitter 2 (ODP 1:8) = 10.50 dB\n# 4 Titik Fusion Splicing = 4 * 0.1 dB = 0.40 dB\n# 3 Konektor SC/APC = 3 * 0.5 dB = 1.50 dB\n# TOTAL LOSS = 2.10 + 0.52 + 0.05 + 7.20 + 10.50 + 0.40 + 1.50 = 22.27 dB\n\n# DAYA TERIMA PADA ONT PELANGGAN:\n# Rx Power = Tx (+3.00 dBm) - 22.27 dB = -19.27 dBm\n# KESIMPULAN: KATEGORI PRIMA STANDAR TELKOM (-14 s/d -23 dBm)`,
        penjelasan: `<p><strong>Link Power Budget</strong> memastikan bahwa daya transmisi optik dari modul laser OLT mencukupi untuk mengatasi seluruh redaman kabel, splitter, sambungan las, dan konektor hingga tiba di photodiode ONT pelanggan.</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>dBm vs dB:</strong> <code class="text-sky-400">dBm</code> adalah satuan daya mutlak terhadap 1 miliwatt, sedangkan <code class="text-amber-400">dB</code> adalah satuan rasio penurunan/kehilangan daya relatif.</li>
            <li><strong>Standar Redaman Telkom:</strong> 
                <span class="text-emerald-400 font-bold">-14 s/d -23 dBm (Prima)</span>, 
                <span class="text-amber-400 font-bold">-23 s/d -27 dBm (Marginal / Rentan Gangguan)</span>, 
                <span class="text-rose-400 font-bold">> -27 dBm (Loss of Signal / LOS)</span>.
            </li>
        </ul>`,
        conclusion: `<p><strong>Best Practice Operasional:</strong> Selalu sisakan Safety Margin minimal 3 dB dalam desain perhitungan awal untuk mengantisipasi penuaan kabel optik dan kemungkinan penyambungan darurat saat kabel putus di kemudian hari.</p>`
    },
    {
        num: 41,
        track: 'Fiber Optic FTTH & TIFO',
        badge: 'Fiber â€¢ Splicing SOP',
        title: 'Materi 41: Teknik Splicing Fiber Optic (Fusion Splicer & Core Alignment)',
        diagramType: 'ftth_odn',
        diagramData: {
            node1: { label: 'Fiber Core A', ip: 'Stripped 250um' },
            node2: { label: 'Fusion Arc Discharge', ip: 'Loss < 0.02 dB' },
            node3: { label: 'Fiber Core B', ip: 'Cleaved 90 deg' },
            link1: 'IPA 99% Clean',
            link2: 'Sleeve Oven'
        },
        cli: `# STANDAR OPERASIONAL PROSEDUR (SOP) SPLICING FIBER OPTIC:\n1. Masukkan Protection Sleeve (selongsong pelindung) ke salah satu helai serat.\n2. Kupas kulit luar (jacket) dan buffer 250um sepanjang 40mm menggunakan Miller Stripper.\n3. Bersihkan core kaca telanjang menggunakan Alkohol Isopropil (IPA 99%) dan tissue Kimwipes.\n4. Potong tegak lurus serat kaca menggunakan Precision Fiber Cleaver (sudut potong < 0.8 derajat).\n5. Letakkan serat pada V-groove mesin Fusion Splicer (ujung serat tidak boleh menyentuh elektroda).\n6. Tutup wind protector dan tekan tombol "Auto Splice" (Core Alignment Arc Discharge).\n7. Verifikasi estimasi sambungan di layar: WAJIB < 0.03 dB.\n8. Geser protection sleeve ke titik sambungan dan panaskan di heater oven selama 25 detik.`,
        penjelasan: `<p>Penyambungan serat optik (Fusion Splicing) meleburkan dua inti kaca kuarsa berdiameter 9 mikron menggunakan percikan busur listrik mikro bersuhu ribuan derajat Celsius.</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>Core Alignment:</strong> Kamera mikroskopik mesin splicer mendeteksi inti tengah kaca (core) secara 3-dimensi (sumbu X dan Y) untuk meminimalkan offset eksentrisitas.</li>
            <li><strong>Presisi Cleaver:</strong> Pisau cleaver tidak memotong serat, melainkan menggores sedikit permukaannya lalu mematahkannya secara presisi pada sudut sempurna 90 derajat.</li>
        </ul>`,
        conclusion: `<p><strong>PANTANGAN BESAR:</strong> Jangan pernah mengelap serat kaca dengan tissue alkohol SETELAH serat dipotong cleaver! Hal itu akan menempelkan debu mikro pada permukaan kaca yang sudah bersih sempurna dan merusak kualitas sambungan.</p>`
    },
    {
        num: 42,
        track: 'Fiber Optic FTTH & TIFO',
        badge: 'Fiber â€¢ OTDR Testing',
        title: 'Materi 42: Pengukuran Jaringan Fiber Optic dengan OTDR (Event Loss & Curve Trace)',
        diagramType: 'ftth_odn',
        diagramData: {
            node1: { label: 'OTDR 1310/1550nm', ip: 'Dummy Fiber 1km' },
            node2: { label: 'Splice Event', ip: 'Non-Reflective' },
            node3: { label: 'Connector / Break', ip: 'Reflective Spike' },
            link1: 'Rayleigh Backscatter',
            link2: 'Fresnel Reflection'
        },
        cli: `# PARAMETER SETUP ALAT OTDR:\nPanjang Gelombang (Wavelength): 1310 nm & 1550 nm (Dual Mode Testing)\nLebar Pulsa (Pulse Width): 10 ns (Jarak pendek < 1km) | 30-100 ns (Jarak 1-10km)\nRentang Jarak (Range): 1.5x - 2x dari perkiraan panjang bentangan kabel fisik\nIndeks Bias Kaca (IOR): 1.4677 (Corning SMF-28e standard)\nLaunch Cable (Dummy Fiber): 1000 meter di depan port OTDR\nAveraging Time: 30 detik (Mode High Resolution)`,
        penjelasan: `<p><strong>Optical Time Domain Reflectometer (OTDR)</strong> mengirimkan pulsa cahaya laser berkecepatan tinggi ke dalam serat kaca dan menganalisis hamburan balik (Rayleigh Backscatter) serta pantulan ujung (Fresnel Reflection) untuk memetakan kondisi fisik kabel sepanjang puluhan kilometer.</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>Non-Reflective Event:</strong> Penurunan garis miring mendadak tanpa pantulan ke atas, menandakan adanya redaman titik sambungan las (splice loss) atau tekukan kabel (macro-bending).</li>
            <li><strong>Reflective Event:</strong> Lonjakan puncak spike vertikal yang menandakan konektor mekanik atau ujung serat yang putus total (fiber end cut).</li>
            <li><strong>Launch Cable (Dummy Fiber):</strong> Mengatasi <em>Dead Zone</em> (area buta pengukuran) pada meter-meter awal tepat di depan konektor alat OTDR.</li>
        </ul>`,
        conclusion: `<p><strong>Trik Engineer Lapangan:</strong> Jika redaman pada panjang gelombang 1550nm jauh lebih besar dibanding 1310nm pada titik meter yang sama, masalah tersebut pasti akibat <strong>tekukan fisik kabel (bending loss)</strong>, bukan sambungan las kotor.</p>`
    },
    {
        num: 43,
        track: 'Fiber Optic FTTH & TIFO',
        badge: 'Fiber â€¢ Troubleshooting',
        title: 'Materi 43: Troubleshooting Gangguan FTTH: Bending Loss & Fast Connector Repair',
        diagramType: 'ftth_odn',
        diagramData: {
            node1: { label: 'Visual Fault Locator', ip: 'Laser Merah 10mW' },
            node2: { label: 'Bending Point', ip: 'Radius < 30mm' },
            node3: { label: 'Roset Fast Connector', ip: 'SC/APC Repair' },
            link1: 'Kebocoran Cahaya',
            link2: 'Terminasi Ulang'
        },
        cli: `# PROSEDUR DIAGNOSA GANGGUAN DI RUMAH PELANGGAN:\n# Gejala: Lampu indikator LOS menyala merah pada modem ONT.\n\n# Langkah 1: Ukur Redaman dengan Optical Power Meter (OPM)\n# Pasang OPM pada patchcord roset. Ukur daya pada panjang gelombang 1490nm.\n# Jika OPM menunjukkan nilai -32 dBm atau "LOW", terjadi redaman tinggi / putus.\n\n# Langkah 2: Tembak Jalur Kabel Drop dengan Senter Laser VFL\n# Hubungkan VFL (10mW) dari roset. Telusuri kabel drop core dari rumah ke tiang ODP.\n# Cari titik kebocoran sinar laser merah yang tampak terang pada kabel yang terjepit pintu atau tertekuk tajam.\n\n# Langkah 3: Terminasi Ulang Fast Connector SC/APC Baru\n# Potong kabel 5cm di belakang konektor lama, kupas dengan drop cable stripper,\n# bersihkan alkohol, potong dengan cleaver guide, masukkan ke Fast Connector, dan kunci klip housing.`,
        penjelasan: `<p>Lebih dari 80% gangguan jaringan internet rumah tangga FTTH terjadi pada segmen terakhir (Last Mile): kabel drop wire pelanggan dan terminasi roset.</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>Bending Loss:</strong> Kabel drop wire memiliki batas radius kelengkungan minimal (30mm). Jika kabel ditekuk patah 90 derajat saat dipaku di tembok plafon, cahaya laser akan bocor keluar dari core silika.</li>
            <li><strong>Konektor Cacat / Kotor:</strong> Ujung keramik ferrule Fast Connector yang terkena minyak sidik jari atau partikel debu mikro dapat menyumbat transmisi laser dan menaikkan redaman hingga 10 dB.</li>
        </ul>`,
        conclusion: `<p><strong>Best Practice Operasional:</strong> Selalu bersihkan ujung konektor SC/APC dengan pen pembersih optik (One-Click Cleaner) sebelum dicolokkan ke port PON modem ONT pelanggan.</p>`
    },
    {
        num: 44,
        track: 'Linux SysAdmin & FortiGate',
        badge: 'Linux â€¢ Netplan SysAdmin',
        title: 'Materi 44: Linux Network Administration: Netplan, IProute2, Systemd-Resolved & Bastion',
        diagramType: 'universal_topology',
        diagramData: {
            node1: { label: 'Bastion SSH Client', ip: 'Port 2222' },
            node2: { label: 'Ubuntu Server Core', ip: 'Netplan YAML' },
            node3: { label: 'Internal DB Cluster', ip: 'UFW Firewall Locked' },
            link1: 'Ed25519 Key',
            link2: 'Static Route'
        },
        cli: `# 1. Konfigurasi Netplan Modern (/etc/netplan/01-netcfg.yaml)\nnetwork:\n  version: 2\n  renderer: networkd\n  ethernets:\n    eth0:\n      addresses: [192.168.10.50/24]\n      routes:\n        - to: default\n          via: 192.168.10.1\n      nameservers:\n        addresses: [1.1.1.1, 8.8.8.8]\n\n# 2. Perintah CLI IProute2 & UFW Firewall\nsudo netplan apply\nip addr show eth0\nip route show\nss -tulpn\nsudo ufw default deny incoming\nsudo ufw default allow outgoing\nsudo ufw allow from 192.168.10.0/24 to any port 22 proto tcp\nsudo ufw allow 80,443/tcp\nsudo ufw enable`,
        penjelasan: `<p>Administrasi jaringan Linux modern (Ubuntu 22.04/24.04 LTS) dikendalikan melalui abstraksi <strong>Netplan YAML</strong> yang berinteraksi dengan backend <strong>systemd-networkd</strong>.</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>Netplan Apply & Try:</strong> Menjalankan konfigurasi IP statis dan routing gateway. Selalu gunakan perintah <code class="text-amber-400">sudo netplan try</code> saat konfigurasi remote via SSH agar konfigurasi otomatis rollback dalam 120 detik jika terjadi salah ketik IP.</li>
            <li><strong>IProute2 (ip addr / ip route):</strong> Perangkat alat modern Linux yang menggantikan perintah usang <code class="text-stone-400">ifconfig</code> dan <code class="text-stone-400">route -n</code>.</li>
            <li><strong>ss -tulpn:</strong> Menampilkan socket listening TCP/UDP aktif beserta Process ID (PID) program yang menjalankannya (pengganti netstat).</li>
        </ul>`,
        conclusion: `<p><strong>Best Practice Operasional:</strong> Amankan server Linux dengan mengunci firewall UFW ke prinsip <em>Least Privilege</em>: blokir seluruh koneksi masuk kecuali port HTTP/HTTPS dan port SSH yang dibatasi hanya dari subnet manajemen administrator.</p>`
    },
    {
        num: 45,
        track: 'Linux SysAdmin & FortiGate',
        badge: 'Security â€¢ FortiGate NGFW',
        title: 'Materi 45: Fortinet FortiGate NGFW: Interface Zone, Virtual IP (VIP) & Firewall Policy',
        diagramType: 'fortigate_ngfw',
        diagramData: {
            node1: { label: 'Untrusted WAN', ip: 'port1 Public' },
            node2: { label: 'FortiGate 60F Core', ip: 'UTM Inspection' },
            node3: { label: 'DMZ Server Web', ip: 'VIP 10.10.99.10' },
            link1: 'IPS / Antivirus',
            link2: 'Firewall Policy'
        },
        cli: `# Konfigurasi FortiOS CLI (Next-Generation Firewall)\n# 1. Konfigurasi Virtual IP (VIP Port Forwarding ke Web Server DMZ)\nconfig firewall vip\n    edit "VIP_WEB_SERVER_HTTPS"\n        set extip 103.28.12.55\n        set mappedip "10.10.99.10"\n        set extintf "port1"\n        set portforward enable\n        set protocol tcp\n        set extport 443\n        set mappedport 443\n    next\nend\n\n# 2. Konfigurasi Firewall Policy dengan Deep Inspection & IPS\nconfig firewall policy\n    edit 1\n        set name "WAN_TO_DMZ_HTTPS"\n        set srcintf "port1"\n        set dstintf "port3"\n        set srcaddr "all"\n        set dstaddr "VIP_WEB_SERVER_HTTPS"\n        set action accept\n        set schedule "always"\n        set service "HTTPS"\n        set utm-status enable\n        set ips-sensor "default"\n        set av-profile "default"\n        set logtraffic all\n    next\nend`,
        penjelasan: `<p><strong>Fortinet FortiGate</strong> adalah salah satu Next-Generation Firewall (NGFW) yang paling banyak digunakan di industri perbankan, telekomunikasi ISP, dan enterprise data center dunia.</p>
        <ul class="list-disc pl-5 space-y-1 text-stone-300">
            <li><strong>Virtual IP (VIP):</strong> Memetakan alamat IP publik WAN dan port 443 ke alamat IP privat server di zona DMZ internal secara aman.</li>
            <li><strong>Unified Threat Management (UTM):</strong> Memeriksa muatan paket data hingga Layer 7 aplikasi secara real-time menggunakan mesin Intrusion Prevention System (IPS) dan Antivirus scanning sebelum paket diizinkan menyentuh server web.</li>
            <li><strong>Logtraffic All:</strong> Merekam seluruh jejak koneksi TCP ke sistem FortiAnalyzer untuk kebutuhan kepatuhan audit keamanan ISO 27001.</li>
        </ul>`,
        conclusion: `<p><strong>Best Practice Operasional:</strong> Firewall Policy pada FortiOS dievaluasi dari urutan atas ke bawah (Top-to-Bottom First Match). Selalu letakkan rule VIP spesifik di urutan teratas sebelum rule umum untuk menghindari celah keamanan (security bypass).</p>`
    }
);
