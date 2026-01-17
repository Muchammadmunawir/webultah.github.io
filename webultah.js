document.addEventListener('DOMContentLoaded', () => {
    
    // --- AMBIL ELEMEN ---
    const introScreen = document.getElementById('intro-screen');
    const mainCard = document.getElementById('main-card');
    const btnOpen = document.getElementById('btn-open');
    const bgMusic = document.getElementById('bg-music');
    const musicIcon = document.getElementById('icon-music-toggle'); 
    const tabs = document.querySelectorAll('.btn');
    const contents = document.querySelectorAll('.tab-content');
    const btnSurprise = document.getElementById('btn-surprise');
    const confettiPlayer = document.getElementById('lottie-confetti');

    // Pesan Ucapan
    const message = "Halo adik kecil! 🎉 Happy Sweet Seventeen🥳🥳 Selamat ulang tahun yaaa. Semoga panjang umur dan sehat selalu.";
    const speed = 50; 
    let i = 0;
    let hasTyped = false;

    // --- 1. INTRO SCREEN ---
    if (btnOpen) {
        btnOpen.addEventListener('click', () => {
            if(introScreen) introScreen.style.opacity = '0';
            playMusic();
            setTimeout(() => {
                if(introScreen) introScreen.style.display = 'none';
                if(mainCard) mainCard.classList.add('show');
                if (!hasTyped) { typeWriter(); hasTyped = true; }
                playLottieConfetti(); 
            }, 800);
        });
    }

    // --- 2. CONFETTI ---
    function playLottieConfetti() {
        if (!confettiPlayer) return;
        confettiPlayer.style.display = 'block';
        try { confettiPlayer.stop(); confettiPlayer.play(); } catch (e) {}
        setTimeout(() => { confettiPlayer.style.display = 'none'; }, 5000); 
    }
    if (btnSurprise) btnSurprise.addEventListener('click', playLottieConfetti);

    // --- 3. TAB SYSTEM ---
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => {
                c.classList.remove('active-tab');
                c.style.display = 'none';
            });

            tab.classList.add('active');
            const targetId = tab.getAttribute('data-tab');
            const targetContent = document.getElementById(targetId);
            
            if (targetContent) {
                targetContent.classList.add('active-tab');
                targetContent.style.display = (targetId === 'home') ? 'grid' : 'block';
            }
        });
    });

    // --- 4. TYPEWRITER ---
    function typeWriter() {
        const textElement = document.getElementById("typing-text");
        if (textElement && i < message.length) {
            textElement.innerHTML += message.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    // --- 5. MUSIK ---
    window.toggleMusic = function() {
        if (!bgMusic) return;
        if (bgMusic.paused) {
            bgMusic.play(); updateMusicIcon(true);
        } else {
            bgMusic.pause(); updateMusicIcon(false);
        }
    };
    function playMusic() {
        if (!bgMusic) return;
        bgMusic.volume = 0.5;
        bgMusic.play().then(() => { updateMusicIcon(true); }).catch(() => { updateMusicIcon(false); });
    }
    function updateMusicIcon(isPlaying) {
        if (!musicIcon) return;
        musicIcon.innerHTML = isPlaying ? "❚❚" : "►";
    }

    // --- 6. TEMA WARNA & SPAM LOVE ---
    const themes = [
        { // Pink
            '--bg-color': '#ffeef2', '--card-bg': 'rgba(255, 251, 253, 0.75)', 
            '--main-border': '#ff9eb5', '--accent-color': '#ff9eb5', '--text-color': '#965d68', 
            '--shadow-color': 'rgba(232, 138, 160, 0.4)', '--btn-border': '#ffc2d1', 
            '--social-bg': 'rgba(255, 240, 245, 0.6)'
        },
        { // Blue
            '--bg-color': '#e0f7fa', '--card-bg': 'rgba(241, 253, 255, 0.75)', 
            '--main-border': '#4dd0e1', '--accent-color': '#4dd0e1', '--text-color': '#006064', 
            '--shadow-color': 'rgba(0, 172, 193, 0.4)', '--btn-border': '#b2ebf2', 
            '--social-bg': 'rgba(224, 247, 250, 0.6)'
        },
        { // Purple
            '--bg-color': '#f3e5f5', '--card-bg': 'rgba(251, 247, 253, 0.75)', 
            '--main-border': '#ce93d8', '--accent-color': '#ce93d8', '--text-color': '#4a148c', 
            '--shadow-color': 'rgba(186, 104, 200, 0.4)', '--btn-border': '#e1bee7', 
            '--social-bg': 'rgba(243, 229, 245, 0.6)'
        },
        { // Green
            '--bg-color': '#f1f8e9', '--card-bg': 'rgba(251, 255, 249, 0.75)', 
            '--main-border': '#aed581', '--accent-color': '#8bc34a', '--text-color': '#33691e', 
            '--shadow-color': 'rgba(124, 179, 66, 0.4)', '--btn-border': '#dcedc8', 
            '--social-bg': 'rgba(241, 248, 233, 0.6)'
        }
    ];
    let currentThemeIndex = 0;

    window.changeTheme = function() {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        const newTheme = themes[currentThemeIndex];
        for (const [key, value] of Object.entries(newTheme)) {
            document.documentElement.style.setProperty(key, value);
        }
    };

    window.spamHeart = function(event) {
        const emojis = ["❤", "💖", "🧡", "💛", "💚", "💙", "💜", "🤍", "🤎"];
        const el = document.createElement('div');
        el.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        el.className = 'floating-emoji';
        
        // POSISI HATI DIPERBAIKI (Tengah Tombol + Scroll)
        const rect = event.target.getBoundingClientRect();
        const scrollY = window.scrollY || window.pageYOffset;
        
        const centerX = rect.left + (rect.width / 2) - 12; 
        const topY = rect.top + scrollY - 20;

        el.style.left = centerX + 'px';
        el.style.top = topY + 'px';
        
        document.body.appendChild(el);
        setTimeout(() => { el.remove(); }, 800);
    };

// ... kode window.spamHeart yang lama di atas sini ...

    // =========================================
    // --- FITUR BARU: HUJAN EMOJI BACKGROUND ---
    // =========================================
    
    const emojiContainer = document.getElementById('emoji-rain');
    // Daftar emoji yang akan dijatuhkan (Bisa ditambah/dikurang)
    const rainEmojis = ['🎂', '🎁', '🎈', '✨', '🍰', '🍭', '🌸', '💖', '🎀', '🥳'];

    function createRainEmoji() {
        if (!emojiContainer) return; // Cek keamanan

        const emoji = document.createElement('div');
        emoji.classList.add('falling-emoji-item');
        emoji.innerText = rainEmojis[Math.floor(Math.random() * rainEmojis.length)];

        // 1. Posisi Horizontal Acak (0% - 100% lebar layar)
        emoji.style.left = Math.random() * 100 + 'vw';

        // 2. Ukuran Acak (antara 20px sampai 40px)
        const size = Math.random() * 20 + 20; 
        emoji.style.fontSize = size + 'px';

        // 3. Durasi Jatuh Acak (antara 5 detik sampai 12 detik) agar tidak barengan
        const duration = Math.random() * 7 + 5;
        emoji.style.animationDuration = duration + 's, 3s'; // Durasi jatuh, durasi goyang

        // 4. Delay Acak (biar munculnya gak serentak di awal)
        emoji.style.animationDelay = Math.random() * 5 + 's, 0s';

        emojiContainer.appendChild(emoji);

        // PENTING: Hapus elemen setelah animasi selesai agar memori tidak penuh
        // Ditambah sedikit waktu buffer
        setTimeout(() => {
            emoji.remove();
        }, (duration + 5) * 1000);
    }

    // Jalankan fungsi pembuat emoji setiap 400 milidetik (semakin kecil angka, semakin deras hujannya)
    setInterval(createRainEmoji, 400);

// --- Batas Akhir Kode JS ---
});