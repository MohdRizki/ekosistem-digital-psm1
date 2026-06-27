// theme.js
// Template Gaya dan Tema Global untuk Ekosistem Sekolah (Menggunakan Tailwind CSS)
// Mendukung warna primary khas per-aplikasi via <meta name="app-primary" content="#HEX">
(function() {
    // 0. Read per-app primary color from meta tag (fallback: admin coral red)
    const metaPrimary = document.querySelector('meta[name="app-primary"]');
    const appPrimary = metaPrimary ? metaPrimary.getAttribute('content') : '#FC6B58';

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
                    background: '#FAFAFA',
                    surface: '#FFFFFF',
                    border: '#E2E8F0',
                    textPrimary: '#160E4D',
                    textSecondary: '#64748B',
                    primary: appPrimary,
                    secondary: '#F6BB00',
                    accent: '#57BAAB',
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
            .glass-card {
                @apply bg-surface rounded-[2rem] p-5 md:p-6 shadow-[0_2px_24px_rgba(0,0,0,0.02)];
            }
            .nav-btn {
                @apply w-full text-left flex items-center gap-3 py-2.5 px-4 rounded-xl text-xs font-bold text-textSecondary transition-all relative;
            }
            .nav-btn:hover {
                @apply text-textPrimary bg-slate-50;
            }
            .nav-btn.active {
                @apply bg-primary/10 text-primary;
            }
            .nav-btn.active i {
                @apply text-primary;
            }
            .nav-btn.active::before {
                content: '';
                @apply absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-primary rounded-full;
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


        /* Tab content management */
        .tab-content { display: none; }
        .tab-content.active { display: block; }

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
        .dark .nav-btn:hover {
            background-color: rgba(51, 65, 85, 0.5) !important;
        }
        .dark .nav-btn.active {
            background-color: rgba(252, 107, 88, 0.15) !important;
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

// Auto-apply saved theme on load
(function() {
    const savedTheme = localStorage.getItem('theme');
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
 * Kotak Pesan (Message Box) Modal
 * Provides a simple messaging UI for admin, teachers, and students.
 * Used by: admin.html, dashboard_siswa.html, penilaian.html
 */
window.bukaKotakPesan = function() {
    // Check if the modal already exists
    let modal = document.getElementById('modal-kotak-pesan');
    if (modal) {
        modal.classList.remove('hidden');
        return;
    }

    // Create a simple message box modal
    modal = document.createElement('div');
    modal.id = 'modal-kotak-pesan';
    modal.className = 'fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm';
    modal.innerHTML = `
        <div class="bg-white dark:bg-slate-800 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]" style="animation: popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);">
            <div class="px-6 py-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                <div class="flex items-center gap-3">
                    <i class="ph-bold ph-envelope-simple text-xl" style="color: var(--primary-color, #FC6B58)"></i>
                    <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">Kotak Pesan</h3>
                </div>
                <button onclick="document.getElementById('modal-kotak-pesan').classList.add('hidden')" class="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors">
                    <i class="ph-bold ph-x text-lg text-slate-500"></i>
                </button>
            </div>
            <div class="p-6 flex-1 overflow-y-auto flex items-center justify-center">
                <div class="text-center py-8">
                    <div class="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mx-auto mb-4">
                        <i class="ph-bold ph-chat-dots text-2xl text-slate-400"></i>
                    </div>
                    <p class="text-slate-500 dark:text-slate-400 font-bold text-sm">Belum ada pesan baru.</p>
                    <p class="text-slate-400 dark:text-slate-500 text-xs mt-1 font-medium">Pesan dari sistem akan muncul di sini.</p>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Close on backdrop click
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
