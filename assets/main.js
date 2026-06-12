/* Sports Bridge International Foundation — shared behaviour.
   All motion is enhancement only: without JS the page is fully
   readable and the nav works via the CSS-only toggle. */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
})();
