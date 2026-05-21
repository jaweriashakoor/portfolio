/* ════════════════════════════════════════════
   Jaweria Shakoor — Portfolio JS
   Starfield · Typewriter · Scroll Reveals
   Counter · Nav Dots
════════════════════════════════════════════ */

/* ── Starfield Canvas ── */
(function () {
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');

    let W, H, stars = [], meteors = [];

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    function initStars() {
        stars = [];
        const count = Math.floor((W * H) / 5000);
        for (let i = 0; i < count; i++) {
            stars.push({
                x: Math.random() * W,
                y: Math.random() * H,
                r: Math.random() * 1.2 + 0.2,
                alpha: Math.random(),
                speed: Math.random() * 0.004 + 0.001,
                phase: Math.random() * Math.PI * 2
            });
        }
    }

    function spawnMeteor() {
        meteors.push({
            x: Math.random() * W,
            y: Math.random() * H * 0.4,
            vx: 2 + Math.random() * 3,
            vy: 1 + Math.random() * 2,
            len: 80 + Math.random() * 100,
            alpha: 1,
            life: 1
        });
    }

    setInterval(spawnMeteor, 4000);

    let t = 0;
    function draw() {
        ctx.clearRect(0, 0, W, H);
        t += 0.016;

        // stars
        stars.forEach(s => {
            const a = 0.3 + 0.5 * (0.5 + 0.5 * Math.sin(t * s.speed * 60 + s.phase));
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(200,235,230,${a})`;
            ctx.fill();
        });

        // meteors
        meteors = meteors.filter(m => m.alpha > 0);
        meteors.forEach(m => {
            const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.len * m.vx / 3.6, m.y - m.len * m.vy / 3.6);
            grad.addColorStop(0, `rgba(20,210,170,${m.alpha})`);
            grad.addColorStop(1, 'rgba(20,210,170,0)');
            ctx.beginPath();
            ctx.moveTo(m.x, m.y);
            ctx.lineTo(m.x - m.len * (m.vx / 3.6), m.y - m.len * (m.vy / 3.6));
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.5;
            ctx.stroke();
            m.x += m.vx;
            m.y += m.vy;
            m.alpha -= 0.012;
        });

        requestAnimationFrame(draw);
    }

    resize();
    initStars();
    draw();
    window.addEventListener('resize', () => { resize(); initStars(); });
})();


/* ── Typewriter ── */
(function () {
    const el = document.getElementById('typewriter');
    if (!el) return;

    const phrases = [
        'Software Engineering Graduate',
        'Python & AI/ML Developer',
        'Machine Learning Engineer',
        'Backend Developer',
        'Data Science Enthusiast'
    ];

    let phraseIdx = 0, charIdx = 0, deleting = false;

    function tick() {
        const phrase = phrases[phraseIdx];

        if (!deleting) {
            el.textContent = phrase.substring(0, charIdx + 1);
            charIdx++;
            if (charIdx === phrase.length) {
                deleting = true;
                setTimeout(tick, 1800);
                return;
            }
        } else {
            el.textContent = phrase.substring(0, charIdx - 1);
            charIdx--;
            if (charIdx === 0) {
                deleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
            }
        }
        setTimeout(tick, deleting ? 45 : 70);
    }

    setTimeout(tick, 600);
})();


/* ── Scroll Reveal ── */
(function () {
    const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const delay = el.style.getPropertyValue('--delay') || '0s';
            el.style.transitionDelay = delay;
            el.classList.add('visible');
            observer.unobserve(el);
        });
    }, { threshold: 0.12 });

    revealEls.forEach(el => observer.observe(el));
})();


/* ── Counter Animation ── */
(function () {
    const counters = document.querySelectorAll('.stat-num[data-count]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.dataset.count, 10);
            let current = 0;
            const step = Math.ceil(target / 40);
            const timer = setInterval(() => {
                current = Math.min(current + step, target);
                el.textContent = current;
                if (current >= target) clearInterval(timer);
            }, 40);
            observer.unobserve(el);
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
})();


/* ── Side Nav Active Dot ── */
(function () {
    const dots = document.querySelectorAll('.nav-dot');
    const sections = document.querySelectorAll('header[id], section[id]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                dots.forEach(d => {
                    d.classList.toggle('active', d.getAttribute('href') === '#' + id);
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => observer.observe(s));
})();


/* ── Smooth chip entrance on load ── */
(function () {
    const chips = document.querySelectorAll('.chip');
    chips.forEach((chip, i) => {
        chip.style.animationDelay = `${0.3 + i * 0.12}s`;
    });
})();