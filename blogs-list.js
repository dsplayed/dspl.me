

function getFilter() {
    const p = new URLSearchParams(window.location.search);
    return p.get('tag');
}

function fmtDate(d) {
    const o = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(d).toLocaleDateString('en-US', o);
}

function mkCard(b) {
    const th = b.thumbnail ? `<img src="${esc(b.thumbnail)}" alt="Blog thumbnail" class="bth">` : '';
    const tgs = b.tags && b.tags.length > 0
        ? `<div class="btgs">${b.tags.map(t => `<span class="btag-s">${esc(t)}</span>`).join('')}</div>`
        : '';

    return `
        <a href="blog/${encodeURIComponent(b.slug)}/" class="bcard">
            ${th}
            <h3 class="bttl">${esc(b.title)}</h3>
            <p class="bex">${esc(b.excerpt)}</p>
            <div class="bmeta">
                <span><strong>By:</strong> ${esc(b.author)}</span>
                <span>${fmtDate(b.datePublished)}</span>
            </div>
            ${tgs}
        </a>
    `;
}

function esc(t) {
    const d = document.createElement('div');
    d.textContent = t;
    return d.innerHTML;
}

let allBlogs = [];

function getSearch() {
    const p = new URLSearchParams(window.location.search);
    return p.get('q');
}

async function load() {
    const lst = document.getElementById('blst');
    const flt = document.getElementById('bflt');
    const tag = getFilter();
    const query = getSearch();

    try {
        let blogs = blogsData.filter(b => b.published && !b.unlisted);

        allBlogs = blogs;

        if (tag) {
            blogs = blogs.filter(b => b.tags && b.tags.includes(tag));
        }

        if (query) {
            const q = query.toLowerCase();
            blogs = blogs.filter(b => {
                const title = (b.title || '').toLowerCase();
                const excerpt = (b.excerpt || '').toLowerCase();
                const tags = (b.tags || []).join(' ').toLowerCase();
                return title.includes(q) || excerpt.includes(q) || tags.includes(q);
            });
            const searchInput = document.getElementById('bsrc');
            if (searchInput) searchInput.value = query;
        }

        blogs.sort((a, b) => b.datePublished - a.datePublished);

        if (blogs.length === 0) {
            lst.innerHTML = '<div class="npost">No blog posts found</div>';
            return;
        }

        const tgs = new Set();
        blogs.forEach(b => {
            if (b.tags && Array.isArray(b.tags)) {
                b.tags.forEach(t => tgs.add(t));
            }
        });

        if (tgs.size > 0) {
            const qp = query ? `&q=${encodeURIComponent(query)}` : '';
            let html = '<button class="ftag ' + (tag ? '' : 'active') + '" onclick="window.location.href=\'blogs.html' + (query ? `?q=${encodeURIComponent(query)}` : '') + '\'">all</button>';
            tgs.forEach(t => {
                const act = tag === t ? 'active' : '';
                html += `<button class="ftag ${act}" onclick="window.location.href='blogs.html?tag=${encodeURIComponent(t)}${qp}'">${t}</button>`;
            });
            flt.innerHTML = html;
        }

        let html = '';
        blogs.forEach(b => {
            html += mkCard(b);
        });

        lst.innerHTML = html;
    } catch (e) {
        console.error('Error loading blogs:', e);
        lst.innerHTML = '<div class="npost">Error loading blogs</div>';
    }
}

function flt(t) {
    window.location.href = `blogs.html?tag=${encodeURIComponent(t)}`;
}

function clr() {
    window.location.href = 'blogs.html';
}

function searchBlogs() {
    const input = document.getElementById('bsrc');
    if (!input) return;
    const q = input.value.trim();
    if (q) {
        const tag = getFilter();
        if (tag) {
            window.location.href = `blogs.html?tag=${encodeURIComponent(tag)}&q=${encodeURIComponent(q)}`;
        } else {
            window.location.href = `blogs.html?q=${encodeURIComponent(q)}`;
        }
    } else {
        const tag = getFilter();
        if (tag) {
            window.location.href = `blogs.html?tag=${encodeURIComponent(tag)}`;
        } else {
            window.location.href = 'blogs.html';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('bsrc');
    if (input) {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                searchBlogs();
            }
        });
    }
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load);
} else {
    load();
}
