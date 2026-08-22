function httpsOnly() {
    const { protocol, hostname, host, pathname, search, hash } = window.location;
    const ipv4 = /^(?:\d{1,3}\.){3}\d{1,3}$/.test(hostname);
    const ipv6 = hostname.includes(':') && /^[0-9a-fA-F:]+$/.test(hostname);
    const local = hostname === 'localhost' || hostname.endsWith('.localhost');

    if (protocol === 'http:' && !local && !ipv4 && !ipv6) {
        window.location.replace(`https://${host}${pathname}${search}${hash}`);
    }
}

httpsOnly();

const translations = {
    en: {
        nav_home: 'home',
        nav_passions: 'passions',
        nav_blogs: 'blogs',
        nav_friends: 'friends',
        nav_tastes: 'tastes',
        heading: "👋 wsp, i'm dsplay",
        about_1: "i spend a lot of time just coding random stuff, mostly using <strong>html, css, javascript, and react.</strong> i usually build things for myself to make life a bit easier or just because i feel like it.",
        about_2: "if you ever want to work together, talk about a project, or just say hi, feel free to <a href=\"#cnt\">reach out</a>.",
        projects: 'projects',
        prj_1_title: 'AniMage',
        prj_1_desc: "an anime platform where you can stream, read manga, and hop into watch parties with friends. built on open apis, my biggest build yet.",
        prj_2_title: 'Charlyn',
        prj_2_desc: "an agentic ai discord bot with long-term memory and sandboxed code execution. it learns, remembers, and runs stuff on its own. basically my digital homie.",
        prj_3_title: 'Mage',
        prj_3_desc: "a link-in-bio site where you build a profile that actually stands out. share your links, socials, and identity in one place. make your presence magical.",
        prj_4_title: 'Signbox',
        prj_4_desc: "an ipa signing service. upload an app, pick a cert, and get a signed install link. no ads, no account, no nonsense.",
        contact: 'contact',
        contact_text: 'you can reach me through:',
        skip: '[ SKIP ANIM ]',
        mp_title: 'Now Playing',
        mp_close: 'close',
        mp_listen: 'Listen',
        mp_nothing: 'Playing nothing',
        mp_notrack: 'No track currently playing',
        passion_title: 'passion',
        passion_intro: "i've always been a jack of all trades. i like dipping my toes into everything. but there are a few things i actually <strong>master</strong> (or at least like to think so) and spend most of my time on.",
        passion_sec_1_title: 'pentesting',
        passion_sec_1_desc: "security is where my brain clicks. finding holes, understanding how things break, and figuring out how to fix them before someone else exploits them. it's a game of curiosity and i love it.",
        passion_sec_2_title: 'coding',
        passion_sec_2_desc: "building things is second nature at this point. mostly <strong>html, css, javascript, react</strong>. but i'll pick up whatever i need to get the job done. i don't limit myself to one stack, i just build.",
        passion_sec_3_title: 'writing',
        passion_sec_3_desc: "i write to document, to share, and to think out loud. blog posts about security findings, random thoughts, and even fictional stories. putting words down helps me process things.",
        passion_sec_4_title: 'speaking',
        passion_sec_4_desc: "i know how to express my ideas to large crowds. my dad is a public speaker, same with my sister. i kind of absorbed some of it naturally. it's something i've already mastered parts of without even realizing it.",
        passion_sec_5_title: 'avgeek',
        passion_sec_5_desc: "still interested in aviation, planes, and everything about flying. i haven't been touching it much lately, but it's one of those things that stuck with me.",
        passion_sec_6_title: 'design',
        passion_sec_6_suffix: '(i suck at it)',
        passion_sec_6_desc: "i'm interested in design and i appreciate good design when i see it. but i completely lack the creativity to make something pretty on my own. i know what looks good, i just can't make it myself. still trying though.",
        passion_sec_7_title: "what i'm into",
        passion_sec_7_desc: "mostly recreating and open sourcing things. i love taking existing tools, remaking them in my own way, and putting the code out there for anyone to use, modify, or laugh at. it's how i learn and how i give back.",
        blogs_title: 'blogs',
        blogs_loading: 'Loading blogs...',
        friends_title: 'friends',
        friends_empty: 'No friends yet :(',
        tastes_title: 'tastes',
        tastes_tab_music: 'music',
        tastes_tab_anime: 'anime',
        tastes_tab_games: 'games',
        tastes_thai_songs: 'Thai Songs',
        tastes_eng_songs: 'English Songs',
        tastes_anime_footnote: "i do watch more than this but i don't save them in mal or al",
        amodal_loading: 'Loading...',
        amodal_no_data: 'No data available for this anime.',
        amodal_no_synopsis: 'No synopsis available.',
        amodal_synopsis: 'Synopsis',
        amodal_fav_char: 'my favorite character',
        amodal_fav_arc: 'my favorite arc',
        amodal_why_love: 'why i love this',
        amodal_no_opinion: "dsplay hasn't expressed his opinion on this anime",
        amodal_view_mal: 'View on MyAnimeList',
        anime_still_watching: 'still watching',
        p404_title: 'lost.',
        p404_desc: "the page you were looking for does not exist, moved, or was deleted. try going back home or checking the blogs.",
        p404_home: 'go home',
        p404_blogs: 'browse blogs',
        charlyn_title: 'dspl shared a file with you',
        charlyn_desc: 'a file is ready to download',
        charlyn_size: 'compressed archive',
        charlyn_dl: 'download file',
    },
    th: {
        nav_home: 'หน้าแรก',
        nav_passions: 'ความสนใจ',
        nav_blogs: 'บล็อก',
        nav_friends: 'เพื่อน',
        nav_tastes: 'รสนิยม',
        heading: "👋 สวัสดีครับ ผม dsplay",
        about_1: "ผมใช้เวลาส่วนใหญ่ไปกับการเขียนโค้ดอะไรเรื่อยเปื่อย โดยใช้ <strong>html, css, javascript และ react</strong> เป็นหลัก ผมมักจะสร้างสิ่งต่างๆ เพื่อทำให้ชีวิตง่ายขึ้น หรือแค่เพราะว่าอยากทำ",
        about_2: "ถ้าคุณอยากทำงานร่วมกัน พูดคุยเกี่ยวกับโปรเจค หรือแค่ทักทาย ก็<a href=\"#cnt\">ติดต่อ</a>มาได้เลย",
        projects: 'โปรเจค',
        prj_1_title: 'AniMage',
        prj_1_desc: "แพลตฟอร์มอนิเมะที่สตรีมได้ อ่านมังงะได้ และชวนเพื่อนมาวอทช์ปาร์ตี้ได้ด้วย สร้างจาก open api และเป็นผลงานที่ใหญ่ที่สุดของผม",
        prj_2_title: 'Charlyn',
        prj_2_desc: "AI Discord บอทที่มีความจำระยะยาวและรันโค้ดในแซนด์บ็อกซ์ได้ เรียนรู้ จำได้ และทำงานเองได้ โดยพื้นฐานคือเพื่อนดิจิทัลของผม",
        prj_3_title: 'Mage',
        prj_3_desc: "เว็บลิงก์รวมโปรไฟล์ที่ให้คุณสร้างหน้าเพจที่โดดเด่นจริงๆ แชร์ลิงก์ โซเชียล และตัวตนของคุณในที่เดียว ทำให้ตัวตนของคุณดูมีมนต์ขลัง",
        prj_4_title: 'Signbox',
        prj_4_desc: "บริการเซ็น ipa อัปโหลดแอป เลือกใบเซ็น แล้วรับลิงก์ติดตั้งได้เลย ไม่มีโฆษณา ไม่มีบัญชี ไม่มีอะไรยุ่งยาก",
        contact: 'ติดต่อ',
        contact_text: 'คุณสามารถติดต่อผมผ่าน:',
        skip: '[ ข้าม ]',
        mp_title: 'กำลังเล่น',
        mp_close: 'ปิด',
        mp_listen: 'ฟัง',
        mp_nothing: 'ไม่ได้เล่นอะไร',
        mp_notrack: 'ไม่มีเพลงที่กำลังเล่น',
        passion_title: 'ความสนใจ',
        passion_intro: "ผมเป็นคนที่ทำอะไรได้หลายอย่าง ชอบลองทุกอย่าง แต่มีบางสิ่งที่ผม <strong>เชี่ยวชาญ</strong> (หรืออย่างน้อยก็คิดว่าอย่างนั้น) และใช้เวลาส่วนใหญ่ไปกับมัน",
        passion_sec_1_title: 'การทดสอบเจาะระบบ',
        passion_sec_1_desc: "ความปลอดภัยคือสิ่งที่ทำให้สมองผมแล่น การหาช่องโหว่ การเข้าใจว่าระบบพังได้ยังไง และการหาวิธีแก้ก่อนที่คนอื่นจะใช้มัน มันเป็นเกมแห่งความอยากรู้และผมรักมัน",
        passion_sec_2_title: 'การเขียนโค้ด',
        passion_sec_2_desc: "การสร้างสิ่งต่างๆ กลายเป็นเรื่องธรรมชาติสำหรับผมแล้ว ส่วนใหญ่เป็น <strong>html, css, javascript, react</strong> แต่ผมก็พร้อมเรียนรู้อะไรก็ได้ที่จำเป็น ผมไม่จำกัดตัวเองอยู่แค่สแต็กเดียว ผมแค่ลงมือสร้าง",
        passion_sec_3_title: 'การเขียน',
        passion_sec_3_desc: "ผมเขียนเพื่อบันทึก เพื่อแบ่งปัน และเพื่อคิดออกเสียง บทความเกี่ยวกับความปลอดภัย ความคิดสุ่มๆ และแม้แต่เรื่องสั้น การเขียนช่วยให้ผมจัดระเบียบความคิด",
        passion_sec_4_title: 'การพูด',
        passion_sec_4_desc: "ผมรู้วิธีสื่อสารความคิดกับคนหมู่มาก พ่อของผมเป็นนักพูดในที่สาธารณะ เช่นเดียวกับพี่สาว ผมซึมซับสิ่งนั้นมาตามธรรมชาติ มันเป็นสิ่งที่ผมเชี่ยวชาญโดยไม่รู้ตัว",
        passion_sec_5_title: 'การบิน',
        passion_sec_5_desc: "ยังคงสนใจการบิน เครื่องบิน และทุกอย่างเกี่ยวกับการบิน ช่วงนี้ไม่ได้แตะมันมากนัก แต่มันเป็นหนึ่งในสิ่งที่ยังติดตัวผมอยู่",
        passion_sec_6_title: 'การออกแบบ',
        passion_sec_6_suffix: '(ผมทำไม่เก่ง)',
        passion_sec_6_desc: "ผมสนใจการออกแบบและชื่นชมงานออกแบบที่ดี แต่ผมขาดความคิดสร้างสรรค์ที่จะทำอะไรสวยๆ ด้วยตัวเอง ผมรู้ว่าอะไรดูดี แต่ทำเองไม่ได้ ยังคงพยายามอยู่นะ",
        passion_sec_7_title: 'สิ่งที่ผมสนใจ',
        passion_sec_7_desc: "ส่วนใหญ่เป็นการสร้างซ้ำและเปิดแหล่งซอร์สโค้ด ผมชอบเอาตู้มือที่มีอยู่ มาสร้างใหม่ในแบบของผม และเผยแพร่โค้ดให้ใครก็ได้ใช้ แก้ไข หรือหัวเราะเยาะ มันคือวิธีเรียนรู้และตอบแทนของผม",
        blogs_title: 'บล็อก',
        blogs_loading: 'กำลังโหลดบล็อก...',
        friends_title: 'เพื่อน',
        friends_empty: 'ยังไม่มีเพื่อนเลย :(',
        tastes_title: 'รสนิยม',
        tastes_tab_music: 'เพลง',
        tastes_tab_anime: 'อนิเมะ',
        tastes_tab_games: 'เกม',
        tastes_thai_songs: 'เพลงไทย',
        tastes_eng_songs: 'เพลงสากล',
        tastes_anime_footnote: "ผมดูมากกว่านี้แต่ไม่ได้เซฟไว้ใน MAL หรือ AL",
        amodal_loading: 'กำลังโหลด...',
        amodal_no_data: 'ไม่มีข้อมูลสำหรับอนิเมะนี้',
        amodal_no_synopsis: 'ไม่มีบทสรุป',
        amodal_synopsis: 'บทสรุป',
        amodal_fav_char: 'ตัวละครที่ชอบ',
        amodal_fav_arc: 'อาร์คที่ชอบ',
        amodal_why_love: 'ทำไมถึงชอบ',
        amodal_no_opinion: "dsplay ยังไม่แสดงความคิดเห็นเกี่ยวกับอนิเมะนี้",
        amodal_view_mal: 'ดูบน MyAnimeList',
        anime_still_watching: 'กำลังดูอยู่',
        p404_title: 'หลงทาง',
        p404_desc: "หน้าที่คุณกำลังมองหาไม่มีอยู่ ถูกย้าย หรือถูกลบ ลองกลับไปหน้าแรกหรือดูบล็อก",
        p404_home: 'กลับหน้าแรก',
        p404_blogs: 'ดูบล็อก',
        charlyn_title: 'dspl แชร์ไฟล์ถึงคุณ',
        charlyn_desc: 'ไฟล์พร้อมให้ดาวน์โหลด',
        charlyn_size: 'ไฟล์บีบอัด',
        charlyn_dl: 'ดาวน์โหลด',
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const home = document.getElementById('hm') !== null;

    const params = new URLSearchParams(window.location.search);
    if (params.get('cutscene') === 'false') {
        localStorage.setItem('hasSeenIntro', 'true');
    }

    setTheme();
    langFx();
    loadFx();
    scrollFx();
    modFx();
    lastFx();
    if (home) {
        navFx();
    }
    dm();
    dropFx();
    lbFx();
    bttFx();
    progFx();
    keyboardFx();
});

function lastFx() {
    const art = document.getElementById('cov');
    const artPl = document.getElementById('cfb');
    const ttl = document.getElementById('ttl');
    const artst = document.getElementById('art');
    const src = document.getElementById('src');

    if (!art || !artPl || !ttl || !artst || !src) {
        return;
    }

    const user = 'dsplay';
    const key = 'c24bcb4fdf6d88bf81f06afaf044210a';
    const interval = 30000;

    async function loadNow() {
        ttl.textContent = 'Loading...';
        artst.textContent = 'Checking Last.fm now playing';
        src.href = 'https://music.youtube.com';
        src.innerHTML = '<span class="material-symbols-outlined" aria-hidden="true">headphones</span><span>Listen</span>';
        putCover('');

        try {
            const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(user)}&api_key=${key}&format=json&limit=2`;
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            const json = await res.json();
            const list = Array.isArray(json?.recenttracks?.track) ? json.recenttracks.track : [];

            if (list.length === 0) {
                setNothingPlaying();
                return;
            }

            const now = list.find(track => track?.['@attr']?.nowplaying === 'true') || null;
            if (!now) {
                setNothingPlaying();
                return;
            }

            const title = now?.name || 'Unknown track';
            const artist = now?.artist?.['#text'] || 'Unknown artist';
            const artUrl = getArt(now);

            ttl.textContent = title;
            artst.textContent = artist;
            src.href = `https://music.youtube.com/search?q=${encodeURIComponent(`${title} ${artist}`)}`;
            src.innerHTML = '<span class="material-symbols-outlined" aria-hidden="true">headphones</span><span>Listen</span>';
            putCover(artUrl);
        } catch (error) {
            setNothingPlaying();
            console.error('Last.fm widget error:', error);
        }
    }

    function setNothingPlaying() {
        ttl.textContent = 'Playing nothing';
        artst.textContent = 'No track currently playing';
        src.href = 'https://music.youtube.com';
        src.innerHTML = '<span class="material-symbols-outlined" aria-hidden="true">headphones</span><span>Listen</span>';
        putCover('');
    }

    function putCover(url) {
        if (url) {
            art.src = url;
            art.classList.remove('is-empty');
            artPl.classList.remove('is-visible');
            art.onerror = () => {
                art.removeAttribute('src');
                art.classList.add('is-empty');
                artPl.classList.add('is-visible');
            };
        } else {
            art.removeAttribute('src');
            art.classList.add('is-empty');
            artPl.classList.add('is-visible');
            art.onerror = null;
        }
    }

    function getArt(track) {
        const imgs = Array.isArray(track?.image) ? track.image : [];
        for (let i = imgs.length - 1; i >= 0; i -= 1) {
            const url = imgs[i]?.['#text'];
            if (url) {
                return url;
            }
        }
        return '';
    }

    function esc(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    loadNow();
    setInterval(loadNow, interval);
}

function setTheme() {
    const mode = localStorage.getItem('darkMode');
    if (mode === null) {
        localStorage.setItem('darkMode', 'enabled');
        document.body.classList.add('dark-mode');
        document.body.classList.add('ui-ready');
    } else if (mode === 'enabled') {
        document.body.classList.add('dark-mode');
        document.body.classList.add('ui-ready');
    } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('ui-ready');
    }
}

function loadFx() {
    const wrap = document.querySelector('.wrap');
    if (!wrap) return;

    wrap.querySelectorAll('section, .hd, footer').forEach(s => s.classList.add('init-hidden'));

    if (localStorage.getItem('hasSeenIntro')) {
        wrap.querySelectorAll('.init-hidden').forEach(s => s.classList.remove('init-hidden'));
        return;
    }

    localStorage.setItem('hasSeenIntro', 'true');
    postIntro();
}

function navFx() {
    const bar = document.querySelector('.navbar');
    let float = false;
    let raf = false;

    function upd() {
        const y = window.scrollY;
        const show = y > 100;

        if (show && !float) {
            bar.classList.add('floating');
            bar.classList.add('visible');
            float = true;
        } else if (!show && float) {
            bar.classList.remove('visible');
            bar.classList.remove('floating');
            float = false;
        }
        raf = false;
    }

    window.addEventListener('scroll', () => {
        if (!raf) {
            requestAnimationFrame(upd);
            raf = true;
        }
    }, { passive: true });
}

function dm() {
    const btn = document.getElementById('tbtn');

    if (!btn) {
        return;
    }

    btn.addEventListener('click', () => {
        const dark = document.body.classList.contains('dark-mode');
        const nextDark = !dark;

        document.body.classList.toggle('dark-mode', nextDark);
        localStorage.setItem('darkMode', nextDark ? 'enabled' : 'disabled');
        setIcon(nextDark);
    });

    function setIcon(dark) {
        const icn = btn.querySelector('.tico');
        if (!icn) {
            return;
        }
        icn.textContent = dark ? 'light_mode' : 'dark_mode';
    }
    
    const dark = document.body.classList.contains('dark-mode');
    setIcon(dark);
}

function modFx() {
    const btn = document.getElementById('mbtn');
    const mod = document.getElementById('mmod');
    const closeBtn = document.getElementById('mclose');

    if (!btn || !mod || !closeBtn) {
        return;
    }

    function openMod() {
        mod.classList.add('active');
        mod.setAttribute('aria-hidden', 'false');
    }

    function closeMod() {
        mod.classList.remove('active');
        mod.setAttribute('aria-hidden', 'true');
    }

    btn.addEventListener('click', openMod);
    closeBtn.addEventListener('click', closeMod);
    mod.addEventListener('click', (ev) => {
        if (ev.target === mod) {
            closeMod();
        }
    });

    document.addEventListener('keydown', (ev) => {
        if (ev.key === 'Escape' && mod.classList.contains('active')) {
            closeMod();
        }
    });
}

function scrollFx() {
    document.querySelectorAll('a[href^="#"]').forEach(lnk => {
        lnk.addEventListener('click', function (ev) {
            const url = this.getAttribute('href');
            if (url === '#') return;
            ev.preventDefault();
            
            if (url === '#abt') {
                const el = document.querySelector('#abt');
                const top = window.scrollY < 100;
                
                if (top) {
                    el.classList.remove('highlight');
                    void el.offsetWidth;
                    el.classList.add('highlight');
                    setTimeout(() => el.classList.remove('highlight'), 600);
                } else {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setTimeout(() => {
                        el.classList.remove('highlight');
                        void el.offsetWidth;
                        el.classList.add('highlight');
                        setTimeout(() => el.classList.remove('highlight'), 600);
                    }, 600);
                }
            } else {
                const el = document.querySelector(url);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

document.querySelectorAll('a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.opacity = '0.6';
    });
    link.addEventListener('mouseleave', function() {
        this.style.opacity = '1';
    });
});

function dropFx() {
    const btn = document.getElementById('dbtn');
    const menu = document.getElementById('dmenu');
    
    if (btn && menu) {
        btn.addEventListener('click', (ev) => {
            ev.stopPropagation();
            menu.classList.toggle('active');
        });
        
        menu.querySelectorAll('a').forEach(lnk => {
            lnk.addEventListener('click', () => menu.classList.remove('active'));
        });
        
        document.addEventListener('click', () => menu.classList.remove('active'));
    }
}

function langFx() {
    const btn = document.getElementById('lbtn');

    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    if (urlLang === 'th' || urlLang === 'en') {
        localStorage.setItem('lang', urlLang);
    }

    if (!btn) return;

    const saved = localStorage.getItem('lang') || 'en';
    applyLanguage(saved);
    btn.textContent = saved === 'en' ? '🇹🇭' : '🇬🇧';
    btn.setAttribute('aria-label', saved === 'en' ? 'Switch to Thai' : 'Switch to English');

    btn.addEventListener('click', () => {
        const current = localStorage.getItem('lang') || 'en';
        const next = current === 'en' ? 'th' : 'en';
        applyLanguage(next);
        localStorage.setItem('lang', next);
        btn.textContent = next === 'en' ? '🇹🇭' : '🇬🇧';
        btn.setAttribute('aria-label', next === 'en' ? 'Switch to Thai' : 'Switch to English');
    });
}

function applyLanguage(lang) {
    document.documentElement.lang = lang;

    if (lang === 'th') {
        if (!document.getElementById('mitr-font')) {
            const link = document.createElement('link');
            link.id = 'mitr-font';
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css2?family=Mitr:wght@200;300;400;500;600;700&display=swap';
            document.head.appendChild(link);
        }
        document.body.classList.add('th');
    } else {
        const link = document.getElementById('mitr-font');
        if (link) link.remove();
        document.body.classList.remove('th');
    }

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key] !== undefined) {
            el.textContent = translations[lang][key];
        }
    });

    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        if (translations[lang] && translations[lang][key] !== undefined) {
            el.innerHTML = translations[lang][key];
        }
    });

    const listenSpan = document.querySelector('.src span:last-child');
    if (listenSpan && translations[lang].mp_listen) {
        listenSpan.textContent = translations[lang].mp_listen;
    }

    const path = window.location.pathname;
    const titleMap = {
        '/passion.html': 'passion_title',
        '/blogs.html': 'blogs_title',
        '/friends.html': 'friends_title',
        '/tastes.html': 'tastes_title',
        '/404.html': 'p404_title',
    };
    const key = titleMap[path];
    if (key && translations[lang][key]) {
        document.title = translations[lang][key] + ' - dsplay';
    }
    if (path === '/' || path === '') {
        document.title = "dsplay's website";
    }
}

function postIntro() {
    const hd = document.querySelector('.hd');
    const h1 = hd ? hd.querySelector('h1') : null;
    if (h1) {
        const text = h1.getAttribute('data-i18n')
            ? translations[localStorage.getItem('lang') || 'en'].heading
            : h1.textContent;
        h1.textContent = '';
        hd.classList.remove('init-hidden');
        hd.classList.add('pop-in');
        setTimeout(() => {
            typeFx(h1, text, 50, () => {
                setTimeout(() => popInFx(), 200);
            });
        }, 500);
    } else {
        popInFx();
    }
}

function typeFx(el, text, speed, callback) {
    el.classList.add('typing');
    let i = 0;
    function type() {
        if (i < text.length) {
            el.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            el.classList.remove('typing');
            if (callback) callback();
        }
    }
    type();
}

function popInFx() {
    const wrap = document.querySelector('.wrap');
    if (!wrap) return;
    const els = wrap.querySelectorAll('.init-hidden');
    els.forEach((el, i) => {
        setTimeout(() => {
            el.classList.remove('init-hidden');
            el.classList.add('pop-in');
        }, i * 150);
    });
}

function lbFx() {
    const pj = document.querySelector('.pj');
    if (!pj) return;
    const ov = document.createElement('div');
    ov.className = 'lb';
    ov.innerHTML = '<img alt="">';
    document.body.appendChild(ov);
    const img = ov.querySelector('img');
    function open(src, alt) {
        img.src = src;
        img.alt = alt || '';
        ov.classList.add('open');
    }
    function close() {
        ov.classList.remove('open');
        img.src = '';
    }
    pj.querySelectorAll('img').forEach(el => {
        el.style.cursor = 'zoom-in';
        el.addEventListener('click', e => {
            e.preventDefault();
            open(el.currentSrc || el.src, el.alt);
        });
    });
    ov.addEventListener('click', close);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') close();
    });
}

function bttFx() {
    const btn = document.createElement('button');
    btn.className = 'btt';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = '<span class="material-symbols-outlined" style="font-size:1.2rem;">arrow_upward</span>';
    document.body.appendChild(btn);

    let raf = false;
    function upd() {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
        raf = false;
    }

    window.addEventListener('scroll', () => {
        if (!raf) {
            requestAnimationFrame(upd);
            raf = true;
        }
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function progFx() {
    const wrap = document.createElement('div');
    wrap.className = 'prog-wrap';
    wrap.innerHTML = '<div class="prog-bar" id="progBar"></div>';
    document.body.prepend(wrap);

    const bar = document.getElementById('progBar');
    if (!bar) return;

    let raf = false;
    function upd() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
            bar.style.width = Math.min(100, (scrollTop / docHeight) * 100) + '%';
        } else {
            bar.style.width = '0%';
        }
        raf = false;
    }

    window.addEventListener('scroll', () => {
        if (!raf) {
            requestAnimationFrame(upd);
            raf = true;
        }
    }, { passive: true });

    window.addEventListener('resize', upd, { passive: true });
    upd();
}

function keyboardFx() {
    const shortcuts = [
        { key: 't', desc: 'toggle theme' },
        { key: '/', desc: 'search blogs' },
        { key: 'j', desc: 'next blog' },
        { key: 'k', desc: 'previous blog' },
        { key: '?', desc: 'show shortcuts' },
        { key: 'Esc', desc: 'close modals / menu' },
    ];

    let ksModal = null;

    function showShortcuts() {
        if (ksModal) {
            ksModal.classList.add('open');
            return;
        }

        ksModal = document.createElement('div');
        ksModal.className = 'ks-modal';
        ksModal.innerHTML = `
            <div class="ks-content">
                <h3 class="ks-title">keyboard shortcuts</h3>
                <div class="ks-grid">
                    ${shortcuts.map(s => `
                        <div class="ks-row">
                            <span class="ks-key">${s.key}</span>
                            <span class="ks-desc">${s.desc}</span>
                        </div>
                    `).join('')}
                </div>
                <button class="ks-close">close</button>
            </div>
        `;

        document.body.appendChild(ksModal);

        ksModal.querySelector('.ks-close').addEventListener('click', () => {
            ksModal.classList.remove('open');
        });

        ksModal.addEventListener('click', (e) => {
            if (e.target === ksModal) {
                ksModal.classList.remove('open');
            }
        });

        requestAnimationFrame(() => ksModal.classList.add('open'));
    }

    function isInputFocused() {
        const tag = document.activeElement ? document.activeElement.tagName : '';
        const role = document.activeElement ? document.activeElement.getAttribute('role') : '';
        return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || role === 'textbox';
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (ksModal && ksModal.classList.contains('open')) {
                ksModal.classList.remove('open');
                return;
            }
            const dropMenu = document.getElementById('dmenu');
            if (dropMenu && dropMenu.classList.contains('active')) {
                dropMenu.classList.remove('active');
            }
            return;
        }

        if (e.key === '?' && !e.shiftKey) return;
        if (e.key === '?' && e.shiftKey) {
            e.preventDefault();
            showShortcuts();
            return;
        }

        if (isInputFocused()) return;

        if (e.key === 't') {
            e.preventDefault();
            const btn = document.getElementById('tbtn');
            if (btn) btn.click();
            return;
        }

        if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            const searchInput = document.getElementById('bsrc');
            if (searchInput) {
                searchInput.focus();
                searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        if (e.key === 'j' || e.key === 'k') {
            const cards = document.querySelectorAll('.bcard');
            if (cards.length === 0) return;

            const focused = document.activeElement;
            let idx = -1;
            cards.forEach((c, i) => {
                if (c === focused || c.contains(focused)) idx = i;
            });

            if (e.key === 'j') {
                idx = Math.min(idx + 1, cards.length - 1);
            } else {
                idx = Math.max(idx - 1, 0);
            }

            cards[idx].focus();
            cards[idx].scrollIntoView({ behavior: 'smooth', block: 'center' });
            e.preventDefault();
        }
    });
}

// chat made this console log ahh since i dont know lmao
console.log('%c👋 wsp, i\'m dsplay', 'color: #ffffff; font-size: 32px; font-weight: bold;');
console.log('%cdont worry there is nothing here (because all of this website is static lol)', 'color: #999999; font-size: 12px; font-style: italic;');
