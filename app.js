/* ============================================================
   Apogee Stores / Shared site script
   v3.0 / multi-page architecture
   Selectors that don't exist on a given page are no-ops.
   ============================================================ */

(function () {
  // Nav scroll state
  var nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  // Mobile menu toggle
  var toggle = document.getElementById('navToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  if (toggle && mobileMenu) {
    var menuOpen = false;
    var spans = toggle.querySelectorAll('span');

    toggle.addEventListener('click', function () {
      menuOpen = !menuOpen;
      if (menuOpen) {
        mobileMenu.classList.add('open');
        document.body.classList.add('menu-open');
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        mobileMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close mobile menu when a link is tapped (link navigation will fire after)
    mobileMenu.querySelectorAll('.mobile-menu-link').forEach(function (link) {
      link.addEventListener('click', function () {
        menuOpen = false;
        mobileMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // Scroll-triggered reveals
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal, .portfolio-card').forEach(function (el) {
      observer.observe(el);
    });

    var thesisLine = document.getElementById('thesisLine');
    if (thesisLine) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) thesisLine.classList.add('drawn');
        });
      }, { threshold: 0.1 }).observe(thesisLine.parentElement);
    }
  } else {
    // Older browsers: just show everything
    document.querySelectorAll('.reveal, .portfolio-card').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // Custom cursor dot on portfolio cards (desktop only, no touch)
  var cursorDot = document.getElementById('cursorDot');
  if (cursorDot && !('ontouchstart' in window)) {
    document.addEventListener('mousemove', function (e) {
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top = e.clientY + 'px';
    });
    document.querySelectorAll('.portfolio-card').forEach(function (card) {
      card.addEventListener('mouseenter', function () { cursorDot.classList.add('active'); });
      card.addEventListener('mouseleave', function () { cursorDot.classList.remove('active'); });
    });
  }

  // Smooth scroll for any remaining in-page anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var hash = this.getAttribute('href');
      if (hash === '#' || hash.length < 2) return;
      var target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
