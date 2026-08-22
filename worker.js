let postsCache = null;

function pad(n) { return String(n).padStart(2, "0"); }
function ymd(ms) {
  const d = new Date(ms);
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
}
const clean = (s) => s.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)\*/g, "$1").replace(/\u2014/g, "-");

function wrap(s, w = 78) {
  const out = [];
  for (const line of s.split("\n")) {
    if (line.length <= w) { out.push(line); continue; }
    let buf = "", cur = "";
    for (const word of line.split(" ")) {
      if ((cur + " " + word).trim().length > w) { if (buf) out.push(buf.trim()); buf = cur + " " + word; cur = ""; }
      else cur = (cur + " " + word).trim();
    }
    if (buf) out.push(buf.trim());
    if (cur) out.push(cur.trim());
  }
  return out.join("\n");
}

async function loadPosts(env) {
  if (postsCache) return postsCache;
  const res = await env.ASSETS.fetch(new Request("https://assets.local/blogs-data.js"));
  if (!res.ok) return [];
  const js = await res.text();
  const json = js.replace(/^const\s+blogsData\s*=\s*/, "").replace(/;\s*$/, "");
  postsCache = JSON.parse(json);
  return postsCache;
}

function renderBlocks(blocks) {
  const out = [];
  for (const b of blocks) {
    switch (b.type) {
      case "heading":
        out.push("", b.level === 1 ? clean(b.content).toUpperCase() : "## " + clean(b.content), "");
        break;
      case "paragraph":
        out.push(wrap(clean(b.content)), "");
        break;
      case "code":
        out.push("", b.label ? `[${b.label}]` : "```", b.content, "```", "");
        break;
      case "quote":
        out.push("> " + clean(b.content), "");
        break;
      case "list":
        out.push("", ...b.items.map((i) => "  - " + clean(i)), "");
        break;
      case "divider":
        out.push("", "---", "");
        break;
    }
  }
  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

async function listed(env) {
  const posts = await loadPosts(env);
  return posts
    .filter((p) => p.published && !p.unlisted && !p.key)
    .sort((a, b) => b.datePublished - a.datePublished);
}

async function home(env) {
  const posts = await listed(env);

  const L = [];
  L.push("dsplay.cc", "==========", "");
  L.push("dsplay - writer, full stack dev, public speaker");
  L.push("yo, i'm dsplay. i make shit, i hack shit, i write shit, over all i'm shit", "");
  L.push("ABOUT");
  L.push(wrap("i spend a lot of time coding random stuff, mostly html, css, javascript, and react. i build things for myself to make life easier or just because i feel like it.", 74).replace(/^/gm, "  "), "");
  L.push(`WRITING (${posts.length})`);
  for (const p of posts) {
    L.push(`${ymd(p.datePublished)}  ${clean(p.title)}`);
    L.push(`            https://dsplay.cc/blog/${p.slug}/`);
  }
  L.push("", "PROJECTS");
  L.push("  animage    an anime platform with streaming, manga, and watch parties");
  L.push("  charlyn    an ai agent with memory, browser control, and sandboxed code execution");
  L.push("  mage       a link-in-bio app where you build a profile that stands out");
  L.push("  signbox    an ipa signing service, upload an app, pick a cert, get an install link", "");
  L.push("CONTACT");
  L.push("  email    dspl@yoru.lat");
  L.push("  github   https://github.com/dsplayed");
  L.push("  discord  https://discord.com/users/896423091998162994", "");
  L.push("LINKS");
  L.push("  html      https://dsplay.cc/?format=html");
  L.push("  writing   curl https://dsplay.cc/blogs.html");
  L.push("  friends   curl https://dsplay.cc/friends.html");
  L.push("  rss       https://dsplay.cc/feed.xml");
  L.push("  security  https://dsplay.cc/security.txt");
  return L.join("\n");
}

async function writing(env) {
  const posts = await listed(env);
  const L = [`WRITING (${posts.length})`];
  for (const p of posts) {
    L.push(`${ymd(p.datePublished)}  ${clean(p.title)}`);
    L.push(`            https://dsplay.cc/blog/${p.slug}/`);
  }
  return L.join("\n");
}

async function friends(env) {
  const res = await env.ASSETS.fetch(new Request("https://assets.local/friends-data.js"));
  let frds = [];
  if (res.ok) {
    const js = await res.text();
    frds = JSON.parse(js.replace(/^const\s+friendsData\s*=\s*/, "").replace(/;\s*$/, ""));
  }
  const L = [`FRIENDS (${frds.length})`, ""];
  if (frds.length === 0) {
    L.push("the owner of this site is too neglected to add any lol");
  } else {
    for (const f of frds.sort((a, b) => a.name.localeCompare(b.name))) {
      L.push(f.name + (f.link ? `  ${f.link}` : ""));
      if (f.description) L.push(`  ${f.description}`);
      L.push("");
    }
  }
  return L.join("\n");
}

async function post(env, slug) {
  const posts = await loadPosts(env);
  const p = posts.find((x) => x.slug === slug && x.published && !x.unlisted && !x.key);
  if (!p) return "404: not found";
  const L = [];
  L.push(slug, "=".repeat(slug.length), "");
  L.push(clean(p.title), `published ${ymd(p.datePublished)}`, "");
  L.push(renderBlocks(p.content), "");
  L.push("---", `https://dsplay.cc/blog/${slug}/`);
  return L.join("\n");
}

const txt = (s) => new Response(s, {
  headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-cache" },
});

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const ua = (req.headers.get("user-agent") || "").toLowerCase();
    const fmt = url.searchParams.get("format");
    const wantText = fmt === "text" || (fmt !== "html" && !ua.includes("mozilla"));

    if (wantText) {
      const slug = url.pathname.match(/^\/blog\/([^/]+)\/?$/)?.[1];
      if (url.pathname === "/") return txt(await home(env));
      if (url.pathname === "/blogs.html" || url.pathname === "/blogs") return txt(await writing(env));
      if (url.pathname === "/friends.html" || url.pathname === "/friends") return txt(await friends(env));
      if (slug) return txt(await post(env, slug));
    }
    return env.ASSETS.fetch(req);
  },
};
