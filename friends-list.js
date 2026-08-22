async function load() {
    const lst = document.getElementById('fgrid');

    try {
        const frds = friendsData.sort((a, b) => a.name.localeCompare(b.name));

        if (frds.length === 0) {
            lst.innerHTML = '<div class="nfrds">the owner of this site is too neglected to add any lol</div>';
            return;
        }

        let h = '';
        frds.forEach(f => {
            const tgs = f.tags && f.tags.length > 0
                ? `<div class="ftgs">${f.tags.map(t => `<span class="ftag">${esc(t)}</span>`).join('')}</div>`
                : '';
            const av = f.avatar ? `<img src="${esc(f.avatar)}" alt="${esc(f.name)}" class="fav">` : '';
            const lnk = f.link
                ? `<a href="${esc(f.link)}" target="_blank" class="flink">Visit</a>`
                : '';

            h += `
                <div class="fcard">
                    ${av}
                    <h3 class="fname">${esc(f.name)}</h3>
                    <p class="fdesc">${esc(f.description)}</p>
                    ${tgs}
                    ${lnk}
                </div>
            `;
        });

        lst.innerHTML = h;
    } catch (e) {
        console.error('Error loading friends:', e);
        lst.innerHTML = '<div class="nfrds">Error loading friends</div>';
    }
}

function esc(t) {
    const d = document.createElement('div');
    d.textContent = t;
    return d.innerHTML;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load);
} else {
    load();
}
