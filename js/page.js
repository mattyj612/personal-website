/* Loads and renders a single markdown page.
   URL form: page.html?p=<slug>  ->  fetches content/<slug>.md
   You shouldn't need to edit this file; just edit the .md files in content/. */
(function () {
  const S = window.SITE;
  const U = window.SITE_UTIL;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("p") || "";
  const entry = S.pages.find(function (p) { return p.slug === slug; });

  // Build hamburger + sidebar (highlight current page) and the social footer.
  U.buildChrome(slug);
  U.buildSocial(document.getElementById("footer"));

  const titleEl = document.getElementById("page-title");
  const contentEl = document.getElementById("content");

  if (!slug || !entry) {
    document.title = "Not found — " + S.title;
    titleEl.textContent = "Page not found";
    contentEl.innerHTML =
      '<p class="status">That page doesn\u2019t exist. <a href="index.html">Return home</a>.</p>';
    return;
  }

  // Provisional title from config (used until markdown front matter overrides).
  titleEl.textContent = entry.title;
  document.title = entry.title + " — " + S.title;

  fetch("content/" + slug + ".md", { cache: "no-cache" })
    .then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.text();
    })
    .then(function (raw) {
      const parsed = stripFrontMatter(raw);
      if (parsed.meta.title) {
        titleEl.textContent = parsed.meta.title;
        document.title = parsed.meta.title + " — " + S.title;
      }
      contentEl.innerHTML = marked.parse(parsed.body);
      wrapImages(contentEl);
      addImageFallbacks(contentEl);
      openExternalLinksInNewTab(contentEl);
    })
    .catch(function () {
      contentEl.innerHTML =
        '<p class="status">Couldn\u2019t load this page yet. If you\u2019re opening the ' +
        "file directly, run a local server (see the README).</p>";
    });

  // --- Minimal YAML-ish front matter: optional block between --- ... --- ---
  function stripFrontMatter(text) {
    const meta = {};
    const m = /^---\s*\n([\s\S]*?)\n---\s*\n?/.exec(text);
    if (m) {
      m[1].split("\n").forEach(function (line) {
        const idx = line.indexOf(":");
        if (idx > -1) {
          const key = line.slice(0, idx).trim();
          let val = line.slice(idx + 1).trim();
          val = val.replace(/^["']|["']$/g, "");
          if (key) meta[key] = val;
        }
      });
      return { meta: meta, body: text.slice(m[0].length) };
    }
    return { meta: meta, body: text };
  }

  // Turn images that have alt text into <figure> with a caption.
  function wrapImages(root) {
    root.querySelectorAll("img").forEach(function (img) {
      const alt = img.getAttribute("alt");
      if (!alt) return;
      const inParagraphAlone =
        img.parentElement &&
        img.parentElement.tagName === "P" &&
        img.parentElement.textContent.trim() === "";
      const fig = document.createElement("figure");
      const cap = document.createElement("figcaption");
      cap.textContent = alt;
      const target = inParagraphAlone ? img.parentElement : img;
      target.replaceWith(fig);
      fig.appendChild(img);
      fig.appendChild(cap);
    });
  }

  // Show a tasteful placeholder instead of a broken-image icon when a photo
  // referenced in markdown hasn't been added to assets/ yet.
  function addImageFallbacks(root) {
    root.querySelectorAll("img").forEach(function (img) {
      img.addEventListener("error", function () {
        const label = img.getAttribute("alt") || "Image";
        const w = 800, h = 500;
        const svg =
          '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '">' +
          '<rect width="100%" height="100%" fill="#dfe4ec"/>' +
          '<text x="50%" y="50%" dy=".35em" text-anchor="middle" font-family="Georgia, serif" font-size="26" fill="#98a2b3">' +
          escapeXml(label) + "</text></svg>";
        img.src = "data:image/svg+xml;utf8," + encodeURIComponent(svg);
      });
    });
  }

  function escapeXml(s) {
    return s.replace(/[<>&]/g, function (c) {
      return c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&amp;";
    });
  }

  function openExternalLinksInNewTab(root) {
    root.querySelectorAll('a[href^="http"]').forEach(function (a) {
      a.target = "_blank";
      a.rel = "noopener";
    });
  }
})();
