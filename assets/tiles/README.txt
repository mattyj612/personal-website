HOMEPAGE TILE IMAGES
====================

Drop one square image per tile in this folder, named after the page it links
to (matching the filename used on the homepage grid in index.html):

    university-courses.jpg
    walking-tours.jpg
    interact.jpg
    history-of-science.jpg
    ... etc.

- Each tile on index.html is a box whose background image points here, e.g.
      <span class="tile-img" style="background-image:url('assets/tiles/biking.jpg')"></span>
- Square images look best (they're cropped to a square automatically).
- Until you add a real image, the tile shows a neutral grey box, so the
  layout always looks intentional (no broken-image icons).
- To use a different filename or format (.png/.webp), just update the
  url(...) in index.html for that tile.
