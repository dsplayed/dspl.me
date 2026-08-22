

function copyCode(id) {
    const el = document.getElementById(id);
    if (!el) return;
    navigator.clipboard.writeText(el.textContent).then(() => {
        const btn = el.parentElement.querySelector('.code-copy');
        if (!btn) return;
        const prev = btn.textContent;
        btn.textContent = 'copied!';
        setTimeout(() => btn.textContent = prev, 1500);
    });
}

const txtEnc = new TextEncoder();
const txtDec = new TextDecoder();

let _headingCounts = {};

function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function buildToc(content) {
    const items = [];
    const counts = {};
    for (const block of content) {
        if (block.type === 'heading' && block.level >= 2) {
            let id = slugify(block.content);
            if (!id) id = 'h';
            counts[id] = (counts[id] || 0) + 1;
            if (counts[id] > 1) id += '-' + (counts[id] - 1);
            items.push({ id, level: block.level, text: block.content });
        }
    }
    return items;
}

function renderToc(items) {
    if (items.length < 2) return '';
    const minLvl = Math.min(...items.map(i => i.level));
    let html = `<details class="toc" open>
        <summary class="toc-summary">
            <span class="toc-label">contents</span>
            <span class="toc-count">${items.length}</span>
        </summary>
        <nav class="toc-nav">`;
    for (const item of items) {
        const indent = item.level - minLvl;
        html += `<a href="#${item.id}" class="toc-link toc-l${Math.min(indent, 3)}">${esc(item.text)}</a>`;
    }
    html += `</nav></details>`;
    return html;
}

function tocScrollFx() {
    const headings = document.querySelectorAll('.bpc h2, .bpc h3, .bpc h4');
    const links = document.querySelectorAll('.toc-link');
    if (!headings.length || !links.length) return;

    const linkMap = {};
    links.forEach(l => {
        const href = l.getAttribute('href');
        if (href) linkMap[href.slice(1)] = l;
    });

    let activeId = '';

    const obs = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                activeId = entry.target.id;
                links.forEach(l => l.classList.remove('toc-active'));
                const link = linkMap[activeId];
                if (link) {
                    link.classList.add('toc-active');
                    const nav = link.closest('.toc-nav');
                    if (nav) {
                        const navRect = nav.getBoundingClientRect();
                        const linkRect = link.getBoundingClientRect();
                        if (linkRect.bottom > navRect.bottom || linkRect.top < navRect.top) {
                            link.scrollIntoView({ block: 'center', behavior: 'smooth' });
                        }
                    }
                }
            }
        }
    }, { rootMargin: '-80px 0px -60% 0px', threshold: 0 });

    headings.forEach(h => obs.observe(h));

    document.querySelectorAll('.toc-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (!href) return;
            const target = document.getElementById(href.slice(1));
            if (target) {
                const top = target.getBoundingClientRect().top + window.scrollY - 90;
                window.scrollTo({ top, behavior: 'smooth' });
                target.classList.remove('toc-highlight');
                void target.offsetWidth;
                target.classList.add('toc-highlight');
                setTimeout(() => target.classList.remove('toc-highlight'), 1500);
            }
        });
    });
}

function getSlug() {
    const p = new URLSearchParams(window.location.search);
    const fromQuery = p.get('slug');
    if (fromQuery) {
        return fromQuery;
    }

    const metaSlug = document.querySelector('meta[name="x-blog-slug"]');
    return metaSlug ? metaSlug.getAttribute('content') : null;
}

function getUrlKey() {
    const p = new URLSearchParams(window.location.search);
    return p.get('key');
}

function toBytes(v) {
    const bin = atob(v);
    const out = new Uint8Array(bin.length);

    for (let i = 0; i < bin.length; i++) {
        out[i] = bin.charCodeAt(i);
    }

    return out;
}

async function deriveCryptoKey(pass, salt) {
    const base = await crypto.subtle.importKey(
        'raw',
        txtEnc.encode(pass),
        'PBKDF2',
        false,
        ['deriveKey']
    );

    return crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt,
            iterations: 100000,
            hash: 'SHA-256'
        },
        base,
        {
            name: 'AES-GCM',
            length: 256
        },
        false,
        ['decrypt']
    );
}

async function decryptLockedBlog(blog, pass) {
    const salt = toBytes(blog.encrypted.salt);
    const iv = toBytes(blog.encrypted.iv);
    const data = toBytes(blog.encrypted.data);
    const key = await deriveCryptoKey(pass, salt);
    const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data);
    const json = txtDec.decode(plain);
    return JSON.parse(json);
}

function fmtDate(d) {
    const o = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(d).toLocaleDateString('en-US', o);
}

function fmtText(txt) {
    let html = esc(txt);
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    return html;
}

function rndBlock(b) {
    switch (b.type) {
        case 'heading':
            let hId = slugify(b.content);
            if (!hId) hId = 'h';
            _headingCounts[hId] = (_headingCounts[hId] || 0) + 1;
            if (_headingCounts[hId] > 1) hId += '-' + (_headingCounts[hId] - 1);
            return `<h${b.level} id="${hId}">${fmtText(b.content)}</h${b.level}>`;
        case 'paragraph':
            return `<p>${fmtText(b.content)}</p>`;
        case 'bold':
            return `<strong>${fmtText(b.content)}</strong>`;
        case 'italic':
            return `<em>${fmtText(b.content)}</em>`;
        case 'code':
            const codeId = 'code-' + Math.random().toString(36).slice(2, 9);
            const labelHtml = b.label ? `<span class="code-label-text">${esc(b.label)}</span>` : '';
            const header = `<div class="code-header">${labelHtml}<span class="material-symbols-outlined code-copy" onclick="copyCode('${codeId}')">content_copy</span></div>`;
            let highlighted;
            try {
                highlighted = hljs.highlight(b.content, { language: b.language || 'plaintext' }).value;
            } catch {
                highlighted = esc(b.content);
            }
            return `<code-block>${header}<code id="${codeId}" class="hljs language-${b.language}">${highlighted}</code></code-block>`;
        case 'quote':
            const auth = b.author ? `<span class="quote-author">— ${esc(b.author)}</span>` : '';
            return `<blockquote>${fmtText(b.content)}<br>${auth}</blockquote>`;
        case 'image':
            const cap = b.caption ? `<p class="image-caption">${esc(b.caption)}</p>` : '';
            return `<figure><img src="${esc(b.url)}" alt="${esc(b.alt)}" />${cap}</figure>`;
        case 'video':
            return `<div class="video-container"><iframe width="100%" height="400" src="${esc(b.url)}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
        case 'audio':
            return `<audio controls class="audio-player"><source src="${esc(b.url)}" type="audio/mpeg">Your browser does not support the audio element.</audio>`;
        case 'list':
            const tag = b.ordered ? 'ol' : 'ul';
            const itms = b.items.map(i => `<li>${fmtText(i)}</li>`).join('');
            return `<${tag}>${itms}</${tag}>`;
        case 'divider':
            return '<hr>';
        default:
            return '';
    }
}

function esc(t) {
    const d = document.createElement('div');
    d.textContent = t;
    return d.innerHTML;
}

function updMeta(b, s) {
    const base = window.location.origin;
    const url = `${base}/blog/${encodeURIComponent(s)}/`;
    const xpt = b.excerpt || 'Read this blog post on my website';
    const th = b.thumbnail || `${base}/og/${encodeURIComponent(s)}.png`;
    
    document.getElementById('ogUrl').content = url;
    document.getElementById('ogTitle').content = b.title;
    document.getElementById('ogDescription').content = xpt;
    document.getElementById('ogImage').content = th;
    document.getElementById('ogAuthor').content = b.author;
    
    document.getElementById('twitterTitle').content = b.title;
    document.getElementById('twitterDescription').content = xpt;
    document.getElementById('twitterImage').content = th;
}

function renderTextBody(text) {
    return text
        .split(/\n\s*\n/g)
        .map(part => `<p>${esc(part).replace(/\n/g, '<br>')}</p>`)
        .join('');
}

async function showKeyModal() {
    return new Promise((res) => {
        const modal = document.getElementById('kmod');
        const input = document.getElementById('kinput');
        const submit = document.getElementById('ksubmit');
        const cancel = document.getElementById('kcancel');
        
        modal.style.display = 'flex';
        input.focus();
        
        function close() {
            modal.style.display = 'none';
            input.value = '';
        }
        
        submit.onclick = () => {
            const key = input.value;
            close();
            res(key);
        };
        
        cancel.onclick = () => {
            close();
            res(null);
        };
        
        input.onkeydown = (e) => {
            if (e.key === 'Enter') {
                submit.click();
            } else if (e.key === 'Escape') {
                cancel.click();
            }
        };
    });
}

async function showKeyErrorModal(msg) {
    return new Promise((res) => {
        const modal = document.getElementById('kemod');
        const text = document.getElementById('ketxt');
        const btn = document.getElementById('keok');

        if (!modal || !text || !btn) {
            res();
            return;
        }

        text.textContent = msg;
        modal.style.display = 'flex';
        btn.focus();

        function close() {
            modal.style.display = 'none';
            btn.onclick = null;
            modal.onkeydown = null;
            res();
        }

        btn.onclick = close;
        modal.onkeydown = (e) => {
            if (e.key === 'Enter' || e.key === 'Escape') {
                e.preventDefault();
                close();
            }
        };
    });
}

async function unlockBlog(blog) {
    if (!blog.key) {
        return blog;
    }

    const urlKey = getUrlKey();

    if (urlKey) {
        try {
            const open = await decryptLockedBlog(blog, urlKey);
            return { ...blog, ...open };
        } catch (e) {
            console.error('Error decrypting blog from URL key:', e);
            await showKeyErrorModal('That key is incorrect. Please try again.');
        }
    }

    while (true) {
        const pass = await showKeyModal();

        if (!pass) {
            return null;
        }

        try {
            const open = await decryptLockedBlog(blog, pass);
            return { ...blog, ...open };
        } catch (e) {
            console.error('Error decrypting blog from modal key:', e);
            await showKeyErrorModal('That key is incorrect. Please try again.');
        }
    }
}

function calcReadTime(text) {
    const wc = text.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(wc / 200));
}

function fmtTime(s) {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
}

function renderAudioPlayer(slug) {
    const audioUrl = `/blog/${encodeURIComponent(slug)}/audio.wav`;
    const bar = document.getElementById('ttsBar');
    if (!bar) return;

    bar.innerHTML = `
        <span class="ap-time" id="apReadTime"></span>
        <div class="ap-main">
            <button class="ap-btn" id="apPlay">▶</button>
            <div class="ap-track" id="apTrack">
                <div class="ap-progress" id="apProgress"></div>
                <div class="ap-thumb" id="apThumb"></div>
            </div>
            <span class="ap-time" id="apCurrent">0:00</span>
            <span class="ap-time ap-sep">/</span>
            <span class="ap-time" id="apDuration">0:00</span>
        </div>
        <a href="https://kokorottsai.com/" class="ap-pwrd" target="_blank" rel="noopener">Kokoro TTS</a>
    `;

    fetch(audioUrl, { method: 'HEAD' }).then(resp => {
        if (!resp.ok) {
            bar.innerHTML = `<span class="ap-time" id="apReadTime"></span><span class="ap-time">audio not available</span><a href="https://kokorottsai.com/" class="ap-pwrd" target="_blank" rel="noopener">Kokoro TTS</a>`;
            return;
        }

        const audio = new Audio(audioUrl);
        audio.preload = 'metadata';

        const playBtn = document.getElementById('apPlay');
        const track = document.getElementById('apTrack');
        const progress = document.getElementById('apProgress');
        const thumb = document.getElementById('apThumb');
        const currentEl = document.getElementById('apCurrent');
        const durEl = document.getElementById('apDuration');

        audio.addEventListener('loadedmetadata', () => {
            durEl.textContent = fmtTime(audio.duration);
        });

        audio.addEventListener('timeupdate', () => {
            if (!audio.duration) return;
            const pct = (audio.currentTime / audio.duration) * 100;
            progress.style.width = pct + '%';
            thumb.style.left = pct + '%';
            currentEl.textContent = fmtTime(audio.currentTime);
        });

        function toggle() {
            if (audio.paused) {
                audio.play();
                playBtn.textContent = '⏸';
                playBtn.classList.add('playing');
            } else {
                audio.pause();
                playBtn.textContent = '▶';
                playBtn.classList.remove('playing');
            }
        }

        playBtn.addEventListener('click', toggle);

        let scrubbing = false;
        function scrub(e) {
            const rect = track.getBoundingClientRect();
            const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            if (audio.duration) {
                audio.currentTime = pct * audio.duration;
            }
        }

        track.addEventListener('mousedown', (e) => { scrubbing = true; scrub(e); });
        document.addEventListener('mousemove', (e) => { if (scrubbing) scrub(e); });
        document.addEventListener('mouseup', () => { scrubbing = false; });

        audio.addEventListener('ended', () => {
            playBtn.textContent = '▶';
            playBtn.classList.remove('playing');
            progress.style.width = '0%';
            thumb.style.left = '0%';
            currentEl.textContent = '0:00';
        });
    });
}

async function load() {
    const s = getSlug();
    const ctn = document.getElementById('blogPost');
    
    if (!s) {
        ctn.innerHTML = '<p>Blog post not found</p>';
        return;
    }

    try {
        const b = blogsData.find(blog => blog.slug === s && blog.published);
        
        if (!b) {
            ctn.innerHTML = '<p>Blog post not found</p>';
            return;
        }

        const open = await unlockBlog(b);

        if (!open) {
            ctn.innerHTML = '<p>This post is locked. Add ?key=... to the URL or enter the key to continue.</p>';
            return;
        }
        
        updMeta(open, s);
        document.title = `${open.title} - dsplay`;
        
        const th = open.thumbnail ? `<img src="${esc(open.thumbnail)}" alt="Blog thumbnail" class="bpth">` : '';
        const col = open.collaborators && open.collaborators.length > 0 
            ? `<span>Collaborators: ${open.collaborators.map(c => esc(c)).join(', ')}</span>` 
            : '';
        const note = open.key ? '<div class="knote">This post was unlocked successfully.</div>' : '';

        const fullText = open.content && Array.isArray(open.content)
            ? (() => { const p=[]; for(const b of open.content){const t=b.type;if(t==='heading'||t==='paragraph'||t==='bold'||t==='italic')p.push(b.content);else if(t==='quote'){p.push(b.content);if(b.author)p.push(`— ${b.author}`);}else if(t==='list'&&b.items)p.push(b.items.join('. '));} return p.join(' ').replace(/<[^>]+>/g,'').trim(); })()
            : typeof open.text === 'string'
                ? open.text.replace(/<[^>]+>/g, '').trim()
                : '';
        const readMin = fullText ? calcReadTime(fullText) : 0;

        _headingCounts = {};
        const tocItems = open.content && Array.isArray(open.content) ? buildToc(open.content) : [];
        const tocHtml = renderToc(tocItems);
        
        let h = `
            <a href="/blogs.html" class="blnk">← back</a>
            ${note}
            <div class="bph">
                <h1 class="bpt">${esc(open.title)}</h1>
                <div class="bpmeta">
                    <span><strong>By:</strong> ${esc(open.author)}</span>
                    <span><strong>Published:</strong> ${fmtDate(open.datePublished)}</span>
                    ${col}
                </div>
            </div>
            <div class="ap-bar" id="ttsBar">
                <span class="ap-time">~${readMin} min read</span>
                <span class="ap-time">checking audio...</span>
                <a href="https://kokorottsai.com/" class="ap-pwrd" target="_blank" rel="noopener">Kokoro TTS</a>
            </div>
            ${tocHtml}
            ${th}
            <div class="bpc">
        `;
        
        if (open.content && Array.isArray(open.content)) {
            open.content.forEach(x => h += rndBlock(x));
        } else if (typeof open.text === 'string') {
            h += renderTextBody(open.text);
        }
        
        h += '</div>';
        
        if (open.tags && open.tags.length > 0) {
            h += '<div class="bptgs">';
            open.tags.forEach(tg => {
                h += `<a href="/blogs.html?tag=${encodeURIComponent(tg)}" class="bptag">${esc(tg)}</a>`;
            });
            h += '</div>';
        }
        
        ctn.innerHTML = h;
        
        tocScrollFx();
        
        if (fullText && s) renderAudioPlayer(s);
        
        if (open.tags && open.tags.some(t => t.toLowerCase() === 'security')) {
            sudoEasterEgg();
        }
        
    } catch (e) {
        console.error('Error loading blog post:', e);
        ctn.innerHTML = `<p>${esc(e.message || 'Error loading blog post')}</p>`;
    }
}

function sudoEasterEgg() {
    let buf = '';

    document.addEventListener('keydown', (ev) => {
        if (ev.key.length === 1) {
            buf += ev.key.toLowerCase();
            if (buf.length > 4) buf = buf.slice(-4);
            if (buf === 'sudo') {
                buf = '';
                const back = document.createElement('div');
                back.style.cssText = 'position:fixed;inset:0;display:flex;align-items:center;justify-content:center;z-index:99999;background:rgba(0,0,0,0.4);backdrop-filter:blur(4px);animation:fadeInText 0.2s ease-out;';
                const mod = document.createElement('div');
                mod.style.cssText = 'background:rgba(24,24,24,0.95);border:1px solid rgba(255,255,255,0.16);border-radius:14px;padding:2rem;max-width:380px;width:90%;box-shadow:0 18px 40px rgba(0,0,0,0.32);text-align:center;';
                mod.innerHTML = '<p style="font-size:1.3rem;font-weight:700;margin:0 0 0.5rem 0;color:#ffffff;">don\'t worry</p><p style="font-size:0.95rem;color:#999999;margin:0 0 1.2rem 0;line-height:1.5;">there is no privilege escalation in this post, don\'t need to try it</p><button style="background:rgba(255,255,255,0.08);border:none;color:#dcdcdc;border-radius:8px;padding:0.5rem 1rem;cursor:pointer;font-size:0.85rem;font-family:inherit;">ok</button>';
                mod.querySelector('button').onclick = () => back.remove();
                back.appendChild(mod);
                back.onclick = (e) => { if (e.target === back) back.remove(); };
                document.body.appendChild(back);
            }
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load);
} else {
    load();
}
