// theme.js
// Template Gaya dan Tema Global untuk Ekosistem Sekolah (Menggunakan Tailwind CSS)
// Mendukung warna primary khas per-aplikasi via <meta name="app-primary" content="#HEX">
(function() {
    // 0. Read per-app primary color from meta tag (fallback: admin coral red)
    const metaPrimary = document.querySelector('meta[name="app-primary"]');
    const appPrimary = metaPrimary ? metaPrimary.getAttribute('content') : '#FC6B58';

    // 0.1 Map per-app primary theme to matching sidebar gradient palette & active tab text color
    let sidebarTop = '#A78BFA', sidebarMid = '#8B5CF6', sidebarBot = '#7C3AED', sidebarText = '#7C3AED';
    const hex = appPrimary.toUpperCase();
    if (hex.includes('EF4444') || hex.includes('FC6B58') || hex.includes('DC2626') || hex.includes('F87171')) {
        // Red / Crimson (Admin Portal) - Bright & clean coral-red (not terlalu pekat)
        sidebarTop = '#F87171'; sidebarMid = '#EF4444'; sidebarBot = '#DC2626'; sidebarText = '#DC2626';
    } else if (hex.includes('0D9488') || hex.includes('14B8A6') || hex.includes('0F766E') || hex.includes('10B981')) {
        // Teal / Emerald (Olah Nilai)
        sidebarTop = '#2DD4BF'; sidebarMid = '#14B8A6'; sidebarBot = '#0D9488'; sidebarText = '#0D9488';
    } else if (hex.includes('3B82F6') || hex.includes('2563EB') || hex.includes('60A5FA') || hex.includes('0EA5E9')) {
        // Blue / Sky (Dashboard Siswa)
        sidebarTop = '#60A5FA'; sidebarMid = '#3B82F6'; sidebarBot = '#2563EB'; sidebarText = '#2563EB';
    } else if (hex.includes('8B5CF6') || hex.includes('7C3AED') || hex.includes('6D28D9') || hex.includes('553CEE')) {
        // Purple / Violet (Jurnal Guru)
        sidebarTop = '#A78BFA'; sidebarMid = '#8B5CF6'; sidebarBot = '#7C3AED'; sidebarText = '#7C3AED';
    } else {
        sidebarTop = appPrimary; sidebarMid = appPrimary; sidebarBot = appPrimary; sidebarText = appPrimary;
    }

    const rootStyle = document.createElement('style');
    rootStyle.innerHTML = `
        :root {
            --sidebar-grad-top: ${sidebarTop};
            --sidebar-grad-mid: ${sidebarMid};
            --sidebar-grad-bot: ${sidebarBot};
            --sidebar-active-text: ${sidebarText};
        }
    `;
    document.head.appendChild(rootStyle);

    // 1. Inject Google Fonts (Poppins)
    const fontPreconnect1 = document.createElement('link');
    fontPreconnect1.rel = 'preconnect';
    fontPreconnect1.href = 'https://fonts.googleapis.com';
    
    const fontPreconnect2 = document.createElement('link');
    fontPreconnect2.rel = 'preconnect';
    fontPreconnect2.href = 'https://fonts.gstatic.com';
    fontPreconnect2.crossOrigin = 'anonymous';

    const fontStylesheet = document.createElement('link');
    fontStylesheet.rel = 'stylesheet';
    fontStylesheet.media = 'print';
    fontStylesheet.onload = function() { this.media = 'all'; };
    fontStylesheet.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap';

    document.head.appendChild(fontPreconnect1);
    document.head.appendChild(fontPreconnect2);
    document.head.appendChild(fontStylesheet);

    // 2. Setup Tailwind Configuration with dynamic primary color
    window.tailwind = window.tailwind || {};
    window.tailwind.config = {
        darkMode: 'class',
        safelist: ['nav-btn', 'active'],
        theme: {
            extend: {
                colors: {
                    background: '#EEF2F6',
                    surface: '#FFFFFF',
                    border: '#E2E8F0',
                    textPrimary: '#160E4D',
                    textSecondary: '#64748B',
                    primary: appPrimary,
                    secondary: '#F6BB00',
                    accent: '#57BAAB',
                    success: '#10b981',
                    error: '#ef4444',
                    warning: '#f59e0b',
                    info: '#0ea5e9',
                },
                fontFamily: {
                    inter: ['Poppins', 'sans-serif'],
                    poppins: ['Poppins', 'sans-serif'],
                },
                animation: {
                    blob: 'blob 7s infinite',
                    fadeIn: 'fadeIn 0.4s ease-out',
                    slideDown: 'slideDown 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    popIn: 'popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                },
                keyframes: {
                    blob: {
                        '0%': { transform: 'translate(0px, 0px) scale(1)' },
                        '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                        '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                        '100%': { transform: 'translate(0px, 0px) scale(1)' },
                    },
                },
            }
        }
    };

    // 3. Inject Custom Tailwind CSS Components and Base Styles
    const tailwindStyle = document.createElement('style');
    tailwindStyle.type = 'text/tailwindcss';
    tailwindStyle.innerHTML = `
        @layer components {
            .db-input {
                @apply bg-slate-50 border border-border/50 text-textPrimary text-[11px] rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all font-medium placeholder:text-textSecondary/50;
            }
            .db-btn-primary {
                @apply bg-primary text-white font-bold text-[11px] uppercase tracking-wider rounded-2xl px-4 py-3 hover:opacity-90 transition-transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 shadow-sm;
            }
            .db-btn-secondary {
                @apply bg-slate-100 dark:bg-slate-800 text-textSecondary hover:text-textPrimary dark:text-slate-300 dark:hover:text-white border border-border/60 font-bold text-[11px] uppercase tracking-wider rounded-2xl px-4 py-3 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm;
            }
            .db-btn-danger {
                @apply bg-rose-600 text-white font-bold text-[11px] uppercase tracking-wider rounded-2xl px-4 py-3 hover:bg-rose-700 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm;
            }
            .glass-card {
                @apply bg-surface rounded-[2rem] p-5 md:p-6 shadow-[0_2px_24px_rgba(0,0,0,0.02)];
            }
            /* Ultra-Premium Dribbble/Apple Sidebar & Navigation System - Exactly like preview-sidebar.html */
            .app-sidebar {
                @apply flex flex-col h-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] shrink-0 relative z-[60];
                width: 260px;
                overflow: visible !important;
                -ms-overflow-style: none !important;
                scrollbar-width: none !important;
                background: linear-gradient(180deg, var(--sidebar-grad-top, #A78BFA) 0%, var(--sidebar-grad-mid, #8B5CF6) 50%, var(--sidebar-grad-bot, #7C3AED) 100%) !important;
                border-radius: 0 !important;
                border-right: none !important;
                box-shadow: none !important;
                color: #FFFFFF !important;
            }
            .app-sidebar::-webkit-scrollbar,
            .app-sidebar > div::-webkit-scrollbar,
            .app-sidebar nav::-webkit-scrollbar,
            .app-sidebar *::-webkit-scrollbar {
                display: none !important;
                width: 0 !important;
                height: 0 !important;
            }
            .app-sidebar nav {
                overflow-y: auto !important;
                overflow-x: visible !important;
                -ms-overflow-style: none !important;
                scrollbar-width: none !important;
            }
            .app-sidebar > div {
                overflow: visible !important;
            }
            .app-sidebar * {
                border-color: rgba(255, 255, 255, 0.12) !important;
            }
            .app-sidebar .text-textPrimary,
            .app-sidebar .text-textSecondary,
            .app-sidebar .sidebar-logo-text h2,
            .app-sidebar .sidebar-logo-text h1,
            .app-sidebar h1, .app-sidebar h2, .app-sidebar h3, .app-sidebar h4, .app-sidebar p, .app-sidebar span {
                color: #FFFFFF !important;
            }
            .app-sidebar .rounded-full.mix-blend-multiply {
                mix-blend-mode: normal !important;
            }
            .app-sidebar .rounded-full.bg-primary {
                background-color: #FFFFFF !important;
                box-shadow: 0 2px 8px rgba(0,0,0,0.15) !important;
            }
            .app-sidebar .rounded-full.bg-accent {
                background-color: rgba(255, 255, 255, 0.75) !important;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
            }
            .app-sidebar.collapsed {
                width: 80px !important;
            }

            /* Sidebar Navigation Container */
            .app-sidebar nav {
                padding-right: 0 !important;
                padding-left: 1.25rem !important;
                position: relative !important;
                z-index: 10 !important;
            }
            .app-sidebar.collapsed nav {
                padding-right: 0 !important;
                padding-left: 0 !important;
            }

            /* Navigation Buttons */
            .nav-btn {
                @apply w-full text-left flex items-center justify-start gap-3.5 py-3.5 px-5 text-xs font-semibold relative select-none cursor-pointer;
                text-align: left !important;
                justify-content: flex-start !important;
                color: rgba(255, 255, 255, 0.8) !important;
                background: transparent !important;
                border-radius: 9999px 0 0 9999px !important;
                margin-right: 0 !important;
                z-index: 10 !important;
                transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
            }
            .nav-btn i {
                @apply w-6 h-6 flex items-center justify-center shrink-0 text-base;
                color: rgba(255, 255, 255, 0.8) !important;
                transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease !important;
            }
            .nav-btn .nav-label {
                @apply whitespace-nowrap overflow-hidden tracking-wide font-medium;
                color: rgba(255, 255, 255, 0.8) !important;
                transition: color 0.3s ease !important;
            }
            .nav-btn:hover:not(.active) {
                color: #FFFFFF !important;
                background: rgba(255, 255, 255, 0.12) !important;
                transform: translateX(4px) !important;
            }
            .nav-btn:hover:not(.active) i,
            .nav-btn:hover:not(.active) .nav-label {
                color: #FFFFFF !important;
            }
            .nav-btn:hover:not(.active) i {
                transform: scale(1.15) rotate(4deg) !important;
            }
            .nav-btn:active {
                transform: translateX(1px) scale(0.98) !important;
            }
            .nav-btn.active {
                @apply font-bold;
                background-color: transparent !important;
                color: var(--sidebar-active-text, #DC2626) !important;
                box-shadow: none !important;
                transform: none !important;
                border-radius: 9999px 0 0 9999px !important;
                z-index: 10 !important;
            }
            .nav-btn.active i,
            .nav-btn.active .nav-label,
            .nav-btn.active span {
                color: var(--sidebar-active-text, #DC2626) !important;
                font-weight: 700 !important;
            }
            .nav-btn.active i {
                transform: scale(1.22) !important;
            }
            .nav-btn.active::before,
            .nav-btn.active::after {
                display: none !important;
            }

            /* Ultra-Premium Dribbble Cutout Indicator with Vector Notches (Exact copy of preview-sidebar.html) */
            #sidebar-gliding-indicator {
                position: absolute !important;
                right: 0 !important;
                background-color: #EEF2F6 !important;
                border-top-left-radius: 9999px !important;
                border-bottom-left-radius: 9999px !important;
                border-top-right-radius: 0 !important;
                border-bottom-right-radius: 0 !important;
                pointer-events: none !important;
                transition: top 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1), width 0.3s cubic-bezier(0.16, 1, 0.3, 1), left 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease !important;
                z-index: 1 !important;
            }
            .app-sidebar.collapsed #sidebar-gliding-indicator {
                width: 44px !important;
                left: 18px !important;
                right: auto !important;
                border-radius: 9999px !important;
            }
            .app-sidebar.collapsed #sidebar-gliding-indicator::before,
            .app-sidebar.collapsed #sidebar-gliding-indicator::after {
                display: none !important;
            }
            #sidebar-gliding-indicator::before {
                content: "" !important;
                position: absolute !important;
                top: -24px !important;
                right: 0 !important;
                width: 24px !important;
                height: 24px !important;
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M 0 24 L 24 24 L 24 0 A 24 24 0 0 1 0 24 Z' fill='%23EEF2F6'/%3E%3C/svg%3E") !important;
                background-size: 100% 100% !important;
                background-repeat: no-repeat !important;
                pointer-events: none !important;
            }
            #sidebar-gliding-indicator::after {
                content: "" !important;
                position: absolute !important;
                bottom: -24px !important;
                right: 0 !important;
                width: 24px !important;
                height: 24px !important;
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M 0 0 L 24 0 L 24 24 A 24 24 0 0 0 0 0 Z' fill='%23EEF2F6'/%3E%3C/svg%3E") !important;
                background-size: 100% 100% !important;
                background-repeat: no-repeat !important;
                pointer-events: none !important;
            }
            .dark #sidebar-gliding-indicator {
                background-color: #0F172A !important;
            }
            .dark #sidebar-gliding-indicator::before {
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M 0 24 L 24 24 L 24 0 A 24 24 0 0 1 0 24 Z' fill='%230F172A'/%3E%3C/svg%3E") !important;
            }
            .dark #sidebar-gliding-indicator::after {
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M 0 0 L 24 0 L 24 24 A 24 24 0 0 0 0 0 Z' fill='%230F172A'/%3E%3C/svg%3E") !important;
            }

            /* Fallback active background if gliding indicator is missing */
            .app-sidebar nav:not(.has-gliding-indicator) .nav-btn.active {
                background-color: #EEF2F6 !important;
                color: var(--sidebar-active-text, #DC2626) !important;
                border-radius: 9999px 0 0 9999px !important;
            }

            /* Group Headers */
            .sidebar-group-header {
                @apply text-[10px] font-extrabold mb-2 mt-4 px-5 uppercase tracking-[0.16em] flex items-center justify-between transition-all duration-200;
                color: rgba(255, 255, 255, 0.5) !important;
            }

            /* Footer Items */
            .sidebar-footer-item {
                @apply w-full text-left flex items-center justify-start gap-3.5 py-2.5 px-4 rounded-xl text-xs font-semibold transition-all duration-200 relative overflow-hidden cursor-pointer;
                text-align: left !important;
                justify-content: flex-start !important;
                color: rgba(255, 255, 255, 0.8) !important;
            }
            .sidebar-footer-item i {
                @apply w-6 h-6 flex items-center justify-center shrink-0 text-base transition-transform duration-200;
                color: rgba(255, 255, 255, 0.8) !important;
            }
            .sidebar-footer-item .nav-label {
                @apply transition-all duration-200 whitespace-nowrap overflow-hidden font-medium;
                color: rgba(255, 255, 255, 0.8) !important;
            }
            .sidebar-footer-item:hover {
                color: #FFFFFF !important;
                background: rgba(255, 255, 255, 0.12) !important;
            }
            .sidebar-footer-item:hover i,
            .sidebar-footer-item:hover .nav-label {
                color: #FFFFFF !important;
            }
            .sidebar-footer-item:hover i {
                transform: scale(1.15);
            }
            .sidebar-footer-item.text-red-500 {
                color: #FF8A8A !important;
            }
            .sidebar-footer-item.text-red-500 i,
            .sidebar-footer-item.text-red-500 .nav-label {
                color: #FF8A8A !important;
            }
            .sidebar-footer-item.text-red-500:hover {
                background: rgba(239, 68, 68, 0.25) !important;
                color: #FFFFFF !important;
            }
            .sidebar-footer-item.text-red-500:hover i,
            .sidebar-footer-item.text-red-500:hover .nav-label {
                color: #FFFFFF !important;
            }

            /* Collapse Button Styling (Old & Mini) */
            .sidebar-collapse-btn {
                @apply w-full text-left flex items-center justify-start gap-3 py-2.5 px-4 rounded-xl transition-all duration-200 font-semibold text-xs cursor-pointer shrink-0;
                color: rgba(255, 255, 255, 0.8) !important;
                background: rgba(255, 255, 255, 0.08) !important;
                border: none !important;
            }
            .sidebar-collapse-btn i {
                @apply w-6 h-6 flex items-center justify-center shrink-0 text-base transition-transform duration-300;
                color: rgba(255, 255, 255, 0.8) !important;
            }
            .sidebar-collapse-btn .nav-label {
                color: rgba(255, 255, 255, 0.8) !important;
            }
            .sidebar-collapse-btn:hover {
                color: #FFFFFF !important;
                background: rgba(255, 255, 255, 0.16) !important;
            }

            /* Clean Sidebar Header & Mini Symbol Toggle without distracting background boxes */
            .app-sidebar .h-20 {
                background: transparent !important;
            }
            .app-sidebar .h-20 .bg-white\/15,
            .app-sidebar .h-20 .bg-white\/10,
            .app-sidebar .h-20 [class*="bg-white"] {
                background-color: transparent !important;
                border-color: transparent !important;
                box-shadow: none !important;
                backdrop-filter: none !important;
            }
            .sidebar-collapse-btn-mini {
                @apply hidden md:flex items-center justify-center w-7 h-7 rounded-lg transition-all shrink-0 ml-auto font-extrabold text-base select-none cursor-pointer;
                color: rgba(255, 255, 255, 0.85) !important;
                background: transparent !important;
                border: none !important;
                font-family: monospace, sans-serif !important;
            }
            .sidebar-collapse-btn-mini:hover {
                color: #FFFFFF !important;
                background: rgba(255, 255, 255, 0.12) !important;
                transform: scale(1.08);
            }
            .collapse-icon-symbol::before {
                content: "<";
            }
            .app-sidebar.collapsed .collapse-icon-symbol::before {
                content: ">";
            }
            .app-sidebar.collapsed .h-20 {
                justify-content: center !important;
                padding-left: 0 !important;
                padding-right: 0 !important;
                gap: 6px !important;
            }
            .app-sidebar.collapsed .sidebar-collapse-btn-mini {
                margin-left: 0 !important;
            }

            /* Collapsed State Behaviors */
            .app-sidebar.collapsed .sidebar-profile-card {
                display: none !important;
            }
            .app-sidebar.collapsed .nav-label,
            .app-sidebar.collapsed .sidebar-label,
            .app-sidebar.collapsed .sidebar-title-text,
            .app-sidebar.collapsed .sidebar-logo-text {
                @apply opacity-0 w-0 overflow-hidden m-0 p-0;
                max-width: 0;
            }
            .app-sidebar.collapsed .sidebar-group-header {
                @apply justify-center px-0 mt-2 mb-1;
            }
            .app-sidebar.collapsed .sidebar-group-dot {
                @apply hidden;
            }
            .app-sidebar.collapsed nav {
                padding-right: 0 !important;
                padding-left: 0.75rem !important;
            }
            .app-sidebar.collapsed .nav-btn {
                @apply justify-center px-0 !w-full !m-0;
                border-radius: 9999px 0 0 9999px !important;
            }
            .app-sidebar.collapsed .sidebar-footer-item {
                @apply justify-center px-0 mx-2 rounded-2xl !w-auto !mr-2 !ml-2;
                border-radius: 16px !important;
            }
            .app-sidebar.collapsed .nav-btn i,
            .app-sidebar.collapsed .sidebar-footer-item i {
                @apply mx-auto;
            }
            .app-sidebar.collapsed .sidebar-collapse-btn {
                @apply justify-center px-0 w-9 h-9 mx-auto rounded-xl !ml-auto !mr-auto;
                background: rgba(255, 255, 255, 0.1) !important;
                border: none !important;
            }
            .app-sidebar.collapsed .sidebar-collapse-btn i {
                transform: rotate(180deg);
            }
            .app-sidebar.collapsed .sidebar-collapse-btn .nav-label {
                @apply hidden;
            }

            /* Tooltip for Collapsed Sidebar Items */
            .nav-tooltip {
                @apply absolute left-full ml-3 px-3 py-1.5 bg-slate-900 text-white text-[11px] font-bold rounded-xl opacity-0 pointer-events-none whitespace-nowrap z-[100] shadow-xl border border-slate-700/50 flex items-center gap-1.5;
                transition: opacity 0.2s cubic-bezier(0.4,0,0.2,1), transform 0.2s cubic-bezier(0.4,0,0.2,1);
                transform: translateX(-6px);
            }
            .app-sidebar.collapsed .nav-btn:hover .nav-tooltip,
            .app-sidebar.collapsed .sidebar-footer-item:hover .nav-tooltip {
                @apply opacity-100 pointer-events-auto;
                transform: translateX(0);
            }
        }

        /* Utility animations & overrides */
        .custom-scroll::-webkit-scrollbar,
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scroll::-webkit-scrollbar-thumb,
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slideDown { animation: slideDown 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-popIn { animation: popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
        @keyframes popIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-scale-up { animation: popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .animate-slide-up { animation: slideUp 0.4s ease-out; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.3s ease-out; }

        /* Blob animation delays */
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }

        /* Grid pattern background */
        .bg-grid-pattern {
            background-image: radial-gradient(circle, #e2e8f0 1px, transparent 1px);
            background-size: 32px 32px;
            opacity: 0.3;
        }

        /* Shadow hover effect */
        .shadow-hover {
            transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .shadow-hover:hover {
            box-shadow: 0 8px 40px rgba(0,0,0,0.06);
            transform: translateY(-2px);
        }

        /* Spinner */
        .spinner-modern {
            width: 20px; height: 20px;
            border: 3px solid rgba(255,255,255,0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: spin 0.6s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }


        /* Ultra-Smooth View & Tab Content Transitions */
        @keyframes smoothViewTransition {
            0% {
                opacity: 0;
                transform: translateY(10px) scale(0.99);
            }
            100% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        .tab-content { display: none; }
        .tab-content.active {
            display: block;
            animation: smoothViewTransition 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in,
        .animate-fadeIn,
        .animate-slideDown,
        #view-container > div:not(.hidden),
        #root > div:not(.hidden) {
            animation: smoothViewTransition 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-popIn {
            animation: popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes popIn {
            0% { opacity: 0; transform: scale(0.95); }
            100% { opacity: 1; transform: scale(1); }
        }

        /* Dynamic Header Shrink into Floating Pill Symbol Overlay */
        header.dynamic-header {
            transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        header.dynamic-header.header-shrunk {
            position: absolute !important;
            top: 16px !important;
            right: 24px !important;
            z-index: 50 !important;
            height: 48px !important;
            max-width: fit-content !important;
            margin: 0 !important;
            padding: 0 16px !important;
            pointer-events: auto !important;
            display: flex !important;
            align-items: center !important;
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
        }
        header.dynamic-header.header-shrunk::before {
            content: '';
            position: absolute;
            inset: 0;
            z-index: -1;
            border-radius: 9999px;
            background-color: rgba(255, 255, 255, 0.92);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(226, 232, 240, 0.9);
            box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.15), 0 4px 12px -2px rgba(0, 0, 0, 0.08);
            pointer-events: none;
        }
        .dark header.dynamic-header.header-shrunk::before {
            background-color: rgba(30, 41, 59, 0.92);
            border-color: rgba(51, 65, 85, 0.9);
            box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.4);
        }
        header.dynamic-header.header-shrunk .header-shrink-hide {
            display: none !important;
        }
        header.dynamic-header.header-shrunk .flex.items-center.gap-5 {
            gap: 14px !important;
        }
        header.dynamic-header.header-shrunk #profile-menu-button {
            background: transparent !important;
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
            border: none !important;
        }
        header.dynamic-header.header-shrunk #profile-menu-button > div:first-child {
            width: 32px !important;
            height: 32px !important;
            border: 1.5px solid rgba(37, 99, 235, 0.3) !important;
        }
        header.dynamic-header.header-shrunk button i {
            font-size: 1.15rem !important;
        }

        /* Mirror mode for QR scanner (front camera) */
        .mirror-mode video { transform: scaleX(-1); }

        /* Dark mode overrides */
        .dark {
            --tw-bg-background: #0F172A;
            --tw-bg-surface: #1E293B;
            --tw-border: #334155;
            --tw-text-primary: #F1F5F9;
            --tw-text-secondary: #94A3B8;
        }
        .dark body,
        .dark .bg-background { background-color: #0F172A !important; }
        .dark .bg-surface { background-color: #1E293B !important; }
        .dark .text-textPrimary { color: #F1F5F9 !important; }
        .dark .text-textSecondary { color: #94A3B8 !important; }
        .dark .border-border { border-color: #334155 !important; }
        .dark .glass-card {
            background-color: rgba(30, 41, 59, 0.8) !important;
            border-color: rgba(51, 65, 85, 0.5) !important;
        }
        .dark .db-input {
            background-color: #1E293B !important;
            border-color: #334155 !important;
            color: #F1F5F9 !important;
        }
        .dark .app-sidebar {
            background: linear-gradient(180deg, rgba(30, 41, 59, 0.98) 0%, rgba(15, 23, 42, 0.98) 100%) !important;
            border-color: rgba(51, 65, 85, 0.6) !important;
        }
        .dark .nav-btn:hover,
        .dark .sidebar-footer-item:hover {
            background: linear-gradient(90deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%) !important;
            color: #FFFFFF !important;
        }
        .dark .nav-btn.active {
            background: linear-gradient(90deg, rgba(252, 107, 88, 0.2) 0%, rgba(252, 107, 88, 0.03) 100%) !important;
            color: var(--primary-color, #FC6B58) !important;
            box-shadow: 0 4px 14px -2px rgba(0, 0, 0, 0.4) !important;
        }
        .dark .nav-tooltip {
            background-color: #0F172A !important;
            border: 1px solid #334155 !important;
            box-shadow: 0 10px 25px -5px rgba(0,0,0,0.8) !important;
        }
        .dark .sidebar-collapse-btn:hover {
            background-color: rgba(252, 107, 88, 0.15) !important;
            color: var(--primary-color, #FC6B58) !important;
        }
        .dark .bg-grid-pattern {
            background-image: radial-gradient(circle, #334155 1px, transparent 1px) !important;
        }
    `;
    document.head.appendChild(tailwindStyle);
})();

// ============================================================
// GLOBAL UTILITY FUNCTIONS (Shared across all apps)
// ============================================================

/**
 * Toggle Dark/Light Theme
 * Used by: admin.html, dashboard_siswa.html, penilaian.html, jurnal.html
 */
window.toggleTheme = function() {
    const html = document.documentElement;
    const isDark = html.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Update theme icon on all pages
    document.querySelectorAll('.theme-icon').forEach(icon => {
        if (isDark) {
            icon.classList.remove('ph-moon');
            icon.classList.add('ph-sun');
        } else {
            icon.classList.remove('ph-sun');
            icon.classList.add('ph-moon');
        }
    });
};

// Auto-apply saved theme on load (default to dark)
(function() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
        // Defer icon update to after DOM is ready
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('.theme-icon').forEach(icon => {
                icon.classList.remove('ph-moon');
                icon.classList.add('ph-sun');
            });
        });
    }
})();

/**
 * Sidebar Collapse/Expand Toggle
 * Used by: admin.html, olah-nilai.html, jurnal.html, dashboard-siswa.html
 */
window.toggleSidebarCollapse = function(sidebarId) {
    const sidebar = document.getElementById(sidebarId) || document.querySelector('.app-sidebar');
    if (!sidebar) return;
    sidebar.classList.toggle('collapsed');
    const isCollapsed = sidebar.classList.contains('collapsed');
    localStorage.setItem('sidebarCollapsed', isCollapsed ? '1' : '0');
};

// Auto-restore sidebar collapse state on load
(function() {
    document.addEventListener('DOMContentLoaded', () => {
        const saved = localStorage.getItem('sidebarCollapsed');
        if (saved === '1') {
            document.querySelectorAll('.app-sidebar').forEach(s => s.classList.add('collapsed'));
        }
    });
})();

/**
 * Kotak Pesan (Message Box) Modal
 * Provides a simple messaging UI for admin, teachers, and students.
 * Used by: admin.html, dashboard_siswa.html, penilaian.html
 */
window.bukaKotakPesan = function() {
    let modal = document.getElementById('modal-kotak-pesan');
    if (modal) {
        modal.classList.remove('hidden');
        return;
    }
    modal = document.createElement('div');
    modal.id = 'modal-kotak-pesan';
    modal.className = 'fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm';
    modal.innerHTML = `
        <div class="bg-white dark:bg-slate-800 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] border border-slate-100 dark:border-slate-700" style="animation: popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);">
            <div class="px-6 py-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                        <i class="ph-bold ph-envelope-simple text-xl" style="color: var(--primary-color, #FC6B58)"></i>
                    </div>
                    <div>
                        <h3 class="text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight">Kotak Pesan</h3>
                        <p class="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Pesan sistem & pengumuman</p>
                    </div>
                </div>
                <button onclick="document.getElementById('modal-kotak-pesan').classList.add('hidden')" class="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors">
                    <i class="ph-bold ph-x text-lg text-slate-500"></i>
                </button>
            </div>
            <div class="p-4 flex-1 overflow-y-auto space-y-3 custom-scrollbar text-left">
                <div class="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl border border-slate-100 dark:border-slate-700/60 hover:shadow-sm transition-all text-left">
                    <div class="flex justify-between items-center mb-1">
                        <span class="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                            <i class="ph-fill ph-megaphone text-amber-500 text-sm"></i> Pengumuman Sekolah
                        </span>
                        <span class="text-[10px] text-slate-400 font-medium">Hari ini</span>
                    </div>
                    <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">Selamat datang di Sistem Digital SDN Pasirmae 1. Silakan periksa pembaharuan kalender akademik dan administrasi secara berkala.</p>
                </div>
                <div class="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl border border-slate-100 dark:border-slate-700/60 hover:shadow-sm transition-all text-left">
                    <div class="flex justify-between items-center mb-1">
                        <span class="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                            <i class="ph-fill ph-info text-blue-500 text-sm"></i> Tips Pengolahan Data
                        </span>
                        <span class="text-[10px] text-slate-400 font-medium">Sistem</span>
                    </div>
                    <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">Gunakan fitur ekspor Excel dan PDF pada masing-masing modul untuk mencetak laporan resmi atau menyimpan arsip dokumen.</p>
                </div>
            </div>
            <div class="p-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-center">
                <button onclick="document.getElementById('modal-kotak-pesan').classList.add('hidden')" class="w-full py-2.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl font-bold text-xs transition-colors">
                    Tutup Kotak Pesan
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
    });
};

window.toggleNotifications = function() {
    const dd = document.getElementById('notifications-dropdown');
    const profileDd = document.getElementById('profile-dropdown');
    if (profileDd) profileDd.classList.add('hidden');
    if (dd) {
        dd.classList.toggle('hidden');
        return;
    }
    let modal = document.getElementById('modal-notifikasi-global');
    if (modal) {
        modal.classList.remove('hidden');
        return;
    }
    modal = document.createElement('div');
    modal.id = 'modal-notifikasi-global';
    modal.className = 'fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm';
    modal.innerHTML = `
        <div class="bg-white dark:bg-slate-800 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] border border-slate-100 dark:border-slate-700" style="animation: popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);">
            <div class="px-6 py-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                        <i class="ph-bold ph-bell text-xl" style="color: var(--primary-color, #FC6B58)"></i>
                    </div>
                    <div>
                        <h3 class="text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight">Pusat Notifikasi</h3>
                        <p class="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Informasi & aktivitas terbaru</p>
                    </div>
                </div>
                <button onclick="document.getElementById('modal-notifikasi-global').classList.add('hidden')" class="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors">
                    <i class="ph-bold ph-x text-lg text-slate-500"></i>
                </button>
            </div>
            <div class="p-4 flex-1 overflow-y-auto space-y-2.5 custom-scrollbar text-left">
                <div class="p-3.5 bg-slate-50 dark:bg-slate-700/50 rounded-2xl border border-slate-100 dark:border-slate-700/60 flex items-start gap-3 hover:shadow-sm transition-all text-left">
                    <div class="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1.5 shrink-0 shadow-sm shadow-emerald-500/50"></div>
                    <div class="flex-1 min-w-0">
                        <div class="flex justify-between items-center mb-0.5">
                            <h4 class="text-xs font-bold text-slate-800 dark:text-slate-200">Presensi & Jurnal Harian</h4>
                            <span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">Aktif</span>
                        </div>
                        <p class="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">Sistem siap mencatat kehadiran siswa dan jurnal pengajaran hari ini.</p>
                        <span class="text-[10px] text-slate-400 dark:text-slate-500 font-semibold block mt-1.5">Baru saja</span>
                    </div>
                </div>
                <div class="p-3.5 bg-slate-50 dark:bg-slate-700/50 rounded-2xl border border-slate-100 dark:border-slate-700/60 flex items-start gap-3 hover:shadow-sm transition-all text-left">
                    <div class="w-2.5 h-2.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                    <div class="flex-1 min-w-0">
                        <div class="flex justify-between items-center mb-0.5">
                            <h4 class="text-xs font-bold text-slate-800 dark:text-slate-200">Integrasi Ekosistem Sekolah</h4>
                            <span class="text-[10px] text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">Sistem</span>
                        </div>
                        <p class="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">Portal Admin, Siswa, Jurnal, dan Olah Nilai telah diselaraskan dengan standar warna baru.</p>
                        <span class="text-[10px] text-slate-400 dark:text-slate-500 font-semibold block mt-1.5">1 jam lalu</span>
                    </div>
                </div>
                <div class="p-3.5 bg-slate-50 dark:bg-slate-700/50 rounded-2xl border border-slate-100 dark:border-slate-700/60 flex items-start gap-3 hover:shadow-sm transition-all text-left">
                    <div class="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
                    <div class="flex-1 min-w-0">
                        <div class="flex justify-between items-center mb-0.5">
                            <h4 class="text-xs font-bold text-slate-800 dark:text-slate-200">Backup Cloud Spreadsheet</h4>
                            <span class="text-[10px] text-amber-600 dark:text-amber-400 font-bold bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded-full">Tips</span>
                        </div>
                        <p class="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">Pastikan URL Webhook Google Apps Script terkonfigurasi di menu Pengaturan.</p>
                        <span class="text-[10px] text-slate-400 dark:text-slate-500 font-semibold block mt-1.5">Hari ini</span>
                    </div>
                </div>
            </div>
            <div class="p-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-center">
                <button onclick="document.getElementById('modal-notifikasi-global').classList.add('hidden')" class="w-full py-2.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl font-bold text-xs transition-colors">
                    Tutup Notifikasi
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
    });
};

window.toggleProfileMenu = function() {
    const profileDd = document.getElementById('profile-dropdown');
    const notifDd = document.getElementById('notifications-dropdown');
    if (notifDd) notifDd.classList.add('hidden');
    if (profileDd) {
        profileDd.classList.toggle('hidden');
        return;
    }
    let modal = document.getElementById('modal-profil-global');
    if (modal) {
        modal.classList.remove('hidden');
        return;
    }
    let userName = 'Guru / Pengajar';
    let userRole = 'Wali Kelas';
    let userSchool = 'SDN Pasirmae 1';
    if (window.appState && window.appState.settings) {
        if (window.appState.settings.nama_guru) userName = window.appState.settings.nama_guru;
        if (window.appState.settings.nama_sekolah) userSchool = window.appState.settings.nama_sekolah;
    } else if (window.state && window.state.settings) {
        if (window.state.settings.wali_kelas) userName = window.state.settings.wali_kelas;
        if (window.state.settings.nama_sekolah) userSchool = window.state.settings.nama_sekolah;
    }
    modal = document.createElement('div');
    modal.id = 'modal-profil-global';
    modal.className = 'fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm';
    modal.innerHTML = `
        <div class="bg-white dark:bg-slate-800 w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-100 dark:border-slate-700 text-center p-6" style="animation: popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);">
            <div class="flex justify-end mb-2">
                <button onclick="document.getElementById('modal-profil-global').classList.add('hidden')" class="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors">
                    <i class="ph-bold ph-x text-lg text-slate-500"></i>
                </button>
            </div>
            <div class="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mx-auto mb-4 border-2 border-primary/20 shadow-inner">
                <i class="ph-bold ph-user text-3xl" style="color: var(--primary-color, #FC6B58)"></i>
            </div>
            <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">${userName}</h3>
            <p class="text-xs text-primary font-bold uppercase tracking-wider mt-0.5">${userRole}</p>
            <div class="my-5 p-3.5 bg-slate-50 dark:bg-slate-700/50 rounded-2xl border border-slate-100 dark:border-slate-700/60 text-left space-y-2">
                <div class="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                    <i class="ph-fill ph-buildings text-slate-400 text-base"></i>
                    <span class="font-semibold truncate">${userSchool}</span>
                </div>
                <div class="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                    <i class="ph-fill ph-calendar-check text-slate-400 text-base"></i>
                    <span class="font-semibold">Tahun Ajaran 2024/2025</span>
                </div>
            </div>
            <div class="flex flex-col gap-2.5">
                <button onclick="document.getElementById('modal-profil-global').classList.add('hidden'); if(window.setView) window.setView('settings'); else if(window.openModal) window.openModal('settings'); else if(window.switchTab) window.switchTab('admin');" class="w-full py-3.5 bg-primary/10 hover:bg-primary/20 text-primary font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2">
                    <i class="ph-bold ph-gear text-base"></i> Pengaturan Akun & Profil
                </button>
                <button onclick="document.getElementById('modal-profil-global').classList.add('hidden'); if(window.handleLogout) window.handleLogout(); else if(window.keluarSesi) window.keluarSesi(); else window.location.href='index.html';" class="w-full py-3.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2">
                    <i class="ph-bold ph-sign-out text-base"></i> Keluar Sesi
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
    });
};

/**
 * Placeholder for chat listener initialization
 * Used by: penilaian.html
 */
window.mulaiMendengarChat = window.mulaiMendengarChat || function() {
    // This is a placeholder — the actual implementation will be set
    // by the specific app module that handles real-time chat
};

/**
 * Global Gliding Sidebar & Interactive Vector Notches for All Web Apps
 */
window.setupGlidingSidebar = function() {
    const sidebars = document.querySelectorAll('.app-sidebar');
    sidebars.forEach(sidebar => {
        const nav = sidebar.querySelector('nav');
        if (!nav) return;
        
        let indicator = nav.querySelector('#sidebar-gliding-indicator');
        if (nav.classList.contains('has-gliding-indicator')) {
            if (indicator) {
                const activeBtn = nav.querySelector('.nav-btn.active');
                if (activeBtn && activeBtn.offsetTop > 0) {
                    indicator.style.opacity = '1';
                    indicator.style.top = activeBtn.offsetTop + 'px';
                    indicator.style.height = activeBtn.offsetHeight + 'px';
                }
            }
            return;
        }
        nav.classList.add('relative', 'has-gliding-indicator');
        
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.id = 'sidebar-gliding-indicator';
            sidebar.insertBefore(indicator, nav);
        }
        
        const updateIndicator = () => {
            if (sidebar.classList.contains('collapsed')) {
                indicator.style.width = '44px';
                indicator.style.left = '18px';
            } else {
                indicator.style.width = 'calc(100% - 20px)';
                indicator.style.left = '';
            }
            const activeBtn = nav.querySelector('.nav-btn.active');
            if (activeBtn) {
                indicator.style.opacity = '1';
                const sidebarRect = sidebar.getBoundingClientRect();
                const btnRect = activeBtn.getBoundingClientRect();
                indicator.style.top = (btnRect.top - sidebarRect.top) + 'px';
                indicator.style.height = btnRect.height + 'px';
            } else {
                indicator.style.opacity = '0';
            }
        };
        
        updateIndicator();
        requestAnimationFrame(updateIndicator);
        window.addEventListener('resize', updateIndicator);
        nav.addEventListener('scroll', () => {
            requestAnimationFrame(updateIndicator);
        });
        
        // Cukup gunakan 1 event listener delegasi yang bersihkan timer berlebih
        nav.addEventListener('click', (e) => {
            const btn = e.target.closest('.nav-btn');
            if (btn) {
                requestAnimationFrame(() => {
                    updateIndicator();
                    setTimeout(updateIndicator, 50);
                });
            }
        });
        
        // Observer memantau jika class pada sidebar/nav atau anak tombolnya berubah (.active, expand/collapse)
        const observer = new MutationObserver(() => {
            requestAnimationFrame(updateIndicator);
        });
        observer.observe(sidebar, { attributes: true, subtree: true, attributeFilter: ['class'] });
    });
};

window.setupDynamicHeaders = () => {
    const headers = document.querySelectorAll('header.dynamic-header');
    headers.forEach(header => {
        const mainContent = header.closest('.flex-1.flex.flex-col')?.querySelector('.overflow-y-auto') ||
                            header.parentElement?.querySelector('main') ||
                            header.nextElementSibling ||
                            document.querySelector('main') ||
                            window;
                            
        const handleScroll = (target) => {
            const scrollTop = target === window ? window.scrollY : target.scrollTop;
            if (scrollTop > 50) {
                header.classList.add('header-shrunk');
            } else {
                header.classList.remove('header-shrunk');
            }
        };

        if (mainContent && mainContent !== window) {
            mainContent.removeEventListener('scroll', mainContent._headerScrollHandler);
            mainContent._headerScrollHandler = () => handleScroll(mainContent);
            mainContent.addEventListener('scroll', mainContent._headerScrollHandler);
        } else {
            window.removeEventListener('scroll', window._headerScrollHandler);
            window._headerScrollHandler = () => handleScroll(window);
            window.addEventListener('scroll', window._headerScrollHandler);
        }
    });
};

const initAppThemeBehaviors = () => {
    window.setupGlidingSidebar();
    window.setupDynamicHeaders();
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAppThemeBehaviors);
} else {
    initAppThemeBehaviors();
}
