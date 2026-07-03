/* ============================================================================
 *  SITE CONFIG  —  Edit this file to change your site.
 * ----------------------------------------------------------------------------
 *  This one file controls:
 *    • the site title
 *    • the homepage intro (photo + two blurbs of text)
 *    • the social icons at the bottom
 *    • every page: its name, its URL slug, its homepage tile image,
 *      and whether it shows up on the homepage grid.
 *
 *  To ADD A PAGE:
 *    1. Add an entry to the `pages` array below.
 *    2. Create a matching markdown file at:  content/<slug>.md
 *    3. (Optional) drop a square tile image at: assets/tiles/<slug>.jpg
 *
 *  To LINK A TILE TO AN EXTERNAL SITE instead of an internal page,
 *  give that entry a `url` field, e.g.  url: "https://example.com".
 * ==========================================================================*/

window.SITE = {
  title: "Matthew Jordan",

  // ---- Homepage intro block ---------------------------------------------
  intro: {
    photo: "assets/photos/portrait.jpg",
    // Text to the LEFT of the photo:
    left: "My calling in life is to learn as much as I can, then share those learnings with other people.",
    // Text to the RIGHT of the photo:
    right: "I\u2019ve done this many different ways: starting a walking tour company, creating university courses, recording podcasts, and delivering exuberant public rants.",
  },

  // ---- Social icons (bottom of every page) ------------------------------
  //  Supported `type` values: email, twitter, instagram, youtube, linkedin,
  //  tiktok, github. (Add more in js/icons.js if you like.)
  social: [
    { type: "email",     url: "mailto:you@example.com" },
    { type: "twitter",   url: "https://twitter.com/" },
    { type: "instagram", url: "https://instagram.com/" },
    { type: "youtube",   url: "https://youtube.com/" },
    { type: "linkedin",  url: "https://linkedin.com/in/" },
  ],

  // ---- Pages -------------------------------------------------------------
  //  `slug`       -> the URL (page.html?p=<slug>) and content/<slug>.md
  //  `title`      -> shown in the sidebar, homepage tile, and page heading
  //  `home`       -> set to false to keep it OUT of the homepage grid
  //  `url`        -> (optional) link the tile/nav to an external site instead
  //  `tile`       -> (optional) override the tile image path
  pages: [
    { slug: "university-courses",   title: "University Courses" },
    { slug: "walking-tours",        title: "Walking Tours" },
    { slug: "interact",             title: "Interact" },
    { slug: "history-of-science",   title: "History of Science" },
    { slug: "psychology-research",  title: "Psychology Research" },
    { slug: "math-science-tutoring",title: "Math & Science Tutoring" },
    { slug: "essays-publications",  title: "Essays & Publications" },
    { slug: "book-reviews",         title: "Book Reviews" },
    { slug: "author-interviews",    title: "Author Interviews" },
    { slug: "writing-lessons",      title: "Writing Lessons" },
    { slug: "piano-covers",         title: "Piano Covers & Tutorials" },
    { slug: "biking",               title: "Biking" },
    { slug: "talks-original-songs", title: "Talks & Original Songs" },
    { slug: "improv",               title: "Improv", home: false },
    { slug: "press-coverage-cv",    title: "Press Coverage & CV" },
    { slug: "about-me",             title: "About Me" },
  ],
};

/* ----------------------------------------------------------------------------
 *  Below here is machinery that builds the shared header (hamburger + sidebar)
 *  and footer on every page. You normally won't need to edit it.
 * --------------------------------------------------------------------------*/
(function () {
  const S = window.SITE;

  // Resolve the link for a page entry (external url or internal page).
  function pageHref(p) {
    return p.url ? p.url : "page.html?p=" + encodeURIComponent(p.slug);
  }

  // Resolve a tile image path (with sensible default).
  function tileSrc(p) {
    return p.tile || ("assets/tiles/" + p.slug + ".jpg");
  }

  // Build the hamburger button + slide-in sidebar and attach to <body>.
  function buildChrome(activeSlug) {
    // Hamburger
    const btn = document.createElement("button");
    btn.className = "menu-toggle";
    btn.setAttribute("aria-label", "Open menu");
    btn.innerHTML = "<span></span><span></span><span></span>";

    // Overlay
    const overlay = document.createElement("div");
    overlay.className = "sidebar-overlay";

    // Sidebar
    const nav = document.createElement("nav");
    nav.className = "sidebar";
    const list = document.createElement("ul");

    const homeLi = document.createElement("li");
    const homeA = document.createElement("a");
    homeA.href = "index.html";
    homeA.textContent = "Home";
    if (activeSlug === "home") homeA.className = "active";
    homeLi.appendChild(homeA);
    list.appendChild(homeLi);

    S.pages.forEach(function (p) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = pageHref(p);
      a.textContent = p.title;
      if (p.slug === activeSlug) a.className = "active";
      li.appendChild(a);
      list.appendChild(li);
    });
    nav.appendChild(list);

    function open() {
      document.body.classList.add("sidebar-open");
      btn.classList.add("is-open");
      btn.setAttribute("aria-label", "Close menu");
    }
    function close() {
      document.body.classList.remove("sidebar-open");
      btn.classList.remove("is-open");
      btn.setAttribute("aria-label", "Open menu");
    }
    btn.addEventListener("click", function () {
      document.body.classList.contains("sidebar-open") ? close() : open();
    });
    overlay.addEventListener("click", close);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });

    document.body.appendChild(btn);
    document.body.appendChild(overlay);
    document.body.appendChild(nav);
  }

  // Build the social icon row and attach into the given element.
  function buildSocial(container) {
    if (!container) return;
    const row = document.createElement("div");
    row.className = "social";
    S.social.forEach(function (s) {
      const a = document.createElement("a");
      a.href = s.url;
      a.className = "social-link";
      a.setAttribute("aria-label", s.type);
      if (s.type !== "email") {
        a.target = "_blank";
        a.rel = "noopener";
      }
      a.innerHTML = (window.ICONS && window.ICONS[s.type]) || "";
      row.appendChild(a);
    });
    container.appendChild(row);
  }

  // Expose helpers for the page scripts.
  window.SITE_UTIL = { pageHref, tileSrc, buildChrome, buildSocial };
})();
