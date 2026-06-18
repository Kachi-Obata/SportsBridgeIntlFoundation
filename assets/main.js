/* Sports Bridge International Foundation — shared behaviour.
   All motion is enhancement only: without JS the page is fully
   readable and the nav works via the CSS-only toggle. */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Hero video: honour reduced-motion (poster only, no autoplay) ---- */
  var heroVideo = document.querySelector(".hero-bg");
  if (heroVideo && reducedMotion) {
    heroVideo.removeAttribute("autoplay");
    heroVideo.addEventListener("loadedmetadata", function () { heroVideo.pause(); });
    try { heroVideo.pause(); } catch (e) {}
  }

  /* ---- Mobile nav: a11y enhancement over the CSS checkbox toggle ---- */
  var toggle = document.getElementById("navToggle");
  var burger = document.querySelector(".nav-burger");
  if (toggle && burger) {
    burger.setAttribute("role", "button");
    burger.setAttribute("tabindex", "0");
    burger.setAttribute("aria-label", "Menu");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-controls", "siteNav");
    toggle.addEventListener("change", function () {
      burger.setAttribute("aria-expanded", String(toggle.checked));
    });
    burger.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle.checked = !toggle.checked;
        toggle.dispatchEvent(new Event("change"));
      }
    });
  }

  /* ---- Line-draw on scroll (dividers, bridge, arcs) ---- */
  var drawables = document.querySelectorAll("[data-draw]");
  if ("IntersectionObserver" in window && drawables.length) {
    var drawObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("drawn");
          drawObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    drawables.forEach(function (el) { drawObserver.observe(el); });
  } else {
    drawables.forEach(function (el) { el.classList.add("drawn"); });
  }

  /* ---- Stat roll-up: numerals count to their final (already rendered)
         value on first reveal. ≤900ms, athletic ease. ---- */
  function animateCount(el) {
    var raw = el.getAttribute("data-count");
    var target = parseInt(raw, 10);
    if (isNaN(target)) return;
    var useGrouping = el.textContent.indexOf(",") !== -1;
    var duration = 900;
    var start = null;
    function format(n) {
      return useGrouping ? n.toLocaleString("en-NG") : String(n);
    }
    function frame(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 4); /* ease-out-quart */
      el.textContent = format(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = format(target);
    }
    requestAnimationFrame(frame);
  }

  var counters = document.querySelectorAll("[data-count]");
  if (!reducedMotion && "IntersectionObserver" in window && counters.length) {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { countObserver.observe(el); });
  }

  /* ---- Sparing scroll reveals (only elements explicitly marked) ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---- Gallery lightbox ---- */
  var lbDialog  = document.getElementById("galleryLightbox");
  if (lbDialog && lbDialog.showModal) {
    var lbImg     = document.getElementById("lbImg");
    var lbCaption = document.getElementById("lbCaption");
    var lbClose   = document.getElementById("lbClose");
    var lbPrev    = document.getElementById("lbPrev");
    var lbNext    = document.getElementById("lbNext");

    var lbGroup = [];   /* current gallery-group links */
    var lbIdx   = 0;

    function lbCollectGroup(galleryName) {
      return Array.from(
        document.querySelectorAll('.gallery-link[data-gallery="' + galleryName + '"]')
      );
    }

    function lbShow(index) {
      lbIdx = ((index % lbGroup.length) + lbGroup.length) % lbGroup.length;
      var link = lbGroup[lbIdx];
      var thumbImg = link.querySelector("img");
      lbImg.src = link.href;
      lbImg.alt = thumbImg ? thumbImg.alt : "";
      var groupName = link.dataset.galleryLabel || "";
      lbCaption.textContent = (lbIdx + 1) + " / " + lbGroup.length +
                              (groupName ? " · " + groupName : "");
    }

    function lbOpen(group, index) {
      lbGroup = group;
      lbShow(index);
      lbDialog.showModal();
      document.body.style.overflow = "hidden";
      lbClose.focus();
    }

    function lbCloseFn() {
      lbDialog.close();
      document.body.style.overflow = "";
      if (lbGroup[lbIdx]) { lbGroup[lbIdx].focus(); }
    }

    /* Intercept clicks on all gallery thumbs */
    document.querySelectorAll(".gallery-link").forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        var group = lbCollectGroup(link.dataset.gallery);
        lbOpen(group, parseInt(link.dataset.index, 10) || 0);
      });
    });

    lbClose.addEventListener("click", lbCloseFn);
    lbPrev.addEventListener("click",  function () { lbShow(lbIdx - 1); });
    lbNext.addEventListener("click",  function () { lbShow(lbIdx + 1); });

    /* Click outside image closes */
    lbDialog.addEventListener("click", function (e) {
      if (e.target === lbDialog) { lbCloseFn(); }
    });

    /* Keyboard navigation */
    lbDialog.addEventListener("keydown", function (e) {
      if (e.key === "Escape")      { lbCloseFn(); }
      if (e.key === "ArrowLeft")   { lbShow(lbIdx - 1); }
      if (e.key === "ArrowRight")  { lbShow(lbIdx + 1); }
    });

    /* Gallery year-tab active-state on scroll */
    var yearSections = document.querySelectorAll(".gallery-year-section");
    var yearTabs     = document.querySelectorAll(".gallery-year-tab");
    if (yearSections.length && yearTabs.length && "IntersectionObserver" in window) {
      var tabObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.id;
            yearTabs.forEach(function (tab) {
              tab.setAttribute("aria-current", tab.getAttribute("href") === "#" + id ? "true" : "false");
            });
          }
        });
      }, { threshold: 0.3 });
      yearSections.forEach(function (s) { tabObserver.observe(s); });
    }
  }
})();
