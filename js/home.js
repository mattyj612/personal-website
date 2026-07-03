/* Builds the homepage: title, intro block, tile grid, socials.
   All content comes from js/site.js — you shouldn't need to edit this file. */
(function () {
  const S = window.SITE;
  const U = window.SITE_UTIL;

  // Hamburger + slide-in sidebar (Home highlighted), same as the sub-pages.
  U.buildChrome("home");

  document.getElementById("site-title").textContent = S.title;
  document.title = S.title;

  // ---- Intro block -------------------------------------------------------
  const intro = document.getElementById("intro");
  const left = document.createElement("p");
  left.textContent = S.intro.left;

  const img = document.createElement("img");
  img.className = "portrait";
  img.alt = S.title;
  img.src = S.intro.photo;
  img.addEventListener("error", function () {
    const ph = placeholder(240, 240, "Photo");
    ph.className = "portrait";
    img.replaceWith(ph);
  });

  const right = document.createElement("p");
  right.textContent = S.intro.right;

  intro.append(left, img, right);

  // ---- Tile grid ---------------------------------------------------------
  const grid = document.getElementById("tiles");
  S.pages
    .filter(function (p) { return p.home !== false; })
    .forEach(function (p) {
      const a = document.createElement("a");
      a.className = "tile";
      a.href = U.pageHref(p);
      if (p.url) { a.target = "_blank"; a.rel = "noopener"; }

      const tImg = document.createElement("img");
      tImg.className = "tile-img";
      tImg.loading = "lazy";
      tImg.alt = p.title;
      tImg.src = U.tileSrc(p);
      tImg.addEventListener("error", function () {
        const ph = placeholder(240, 240, p.title);
        ph.className = "tile-img";
        tImg.replaceWith(ph);
      });

      const cap = document.createElement("span");
      cap.className = "tile-caption";
      cap.textContent = p.title;

      a.append(tImg, cap);
      grid.appendChild(a);
    });

  // ---- Footer (social icons) --------------------------------------------
  U.buildSocial(document.getElementById("footer"));

  // ---- Placeholder image generator (used until you add real images) ------
  function placeholder(w, h, label) {
    const initials = label
      .split(/[\s&]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(function (s) { return s[0]; })
      .join("")
      .toUpperCase();
    const svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '">' +
      '<rect width="100%" height="100%" fill="#dfe4ec"/>' +
      '<text x="50%" y="50%" dy=".35em" text-anchor="middle" ' +
      'font-family="Georgia, serif" font-size="' + Math.round(w * 0.28) + '" fill="#98a2b3">' +
      initials + "</text></svg>";
    const el = new Image(w, h);
    el.src = "data:image/svg+xml;utf8," + encodeURIComponent(svg);
    el.alt = label;
    return el;
  }
})();
