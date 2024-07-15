document.addEventListener("DOMContentLoaded", function() {

  function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  function isMobileOrTablet() {
    return /Mobi|Tablet|iPad|iPhone|Android/i.test(navigator.userAgent);
  }

  function behaviorWinemap() {
    const regions = document.querySelectorAll("g[id^='region']");
    const hideTimeouts = {};
    regions.forEach(region => {
      const regionId = region.id.replace('region', '');
      const glDiv = document.getElementById(`gl${regionId}`);
      const closeBtn = glDiv.querySelector('.wmap-grapeslegend__close');
      region.addEventListener("mouseenter", function () {
        clearTimeout(hideTimeouts[regionId]);
        document.querySelectorAll(".wmap-grapeslegend").forEach(glDiv => {
          glDiv.classList.remove("active");
        });
        glDiv.classList.add("active");
      });
      region.addEventListener("mouseleave", function () {
        hideTimeouts[regionId] = setTimeout(function () {
          glDiv.classList.remove("active");
        }, 1000);
      });
      closeBtn.addEventListener("click", function () {
        clearTimeout(hideTimeouts[regionId]);
        glDiv.classList.remove("active");
      });
      glDiv.addEventListener("mouseenter", function () {
        clearTimeout(hideTimeouts[regionId]);
      });
      glDiv.addEventListener("mouseleave", function () {
        hideTimeouts[regionId] = setTimeout(function () {
          glDiv.classList.remove("active");
        }, 1000);
      });
    });
  }

  if (!isTouchDevice() && !isMobileOrTablet() && window.innerWidth >= 768) {
    behaviorWinemap();
  }

  window.addEventListener('resize', function() {
    if (!isTouchDevice() && !isMobileOrTablet() && window.innerWidth > 768) {
      behaviorWinemap();
    }
  });

});