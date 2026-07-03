WILLIAMS CASLON TEXT
====================

The site currently renders in "Libre Caslon Text" (a free Google Font that
closely resembles Williams Caslon Text). To switch to the real typeface:

1. Put your Williams Caslon Text font files in THIS folder. Ideally the four
   styles, in .woff2 for best web performance:

       WilliamsCaslonText-Regular.woff2
       WilliamsCaslonText-Italic.woff2
       WilliamsCaslonText-Bold.woff2
       WilliamsCaslonText-BoldItalic.woff2

   (If you only have .otf/.ttf, that's fine — update the file names in the
   @font-face rules to match. Converting to .woff2 with an online converter
   will make the site load faster.)

2. Open /css/style.css and UNCOMMENT the four @font-face blocks near the top.

That's it — the CSS already lists "Williams Caslon Text" as the first choice,
so it will take over as soon as the files load.
