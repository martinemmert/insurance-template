// Services section horizontal scroll effect
document.addEventListener('DOMContentLoaded', () => {
  const content = document.querySelector('.content') as HTMLElement;
  const servicesSection = document.querySelector('.services-section') as HTMLElement;
  const servicesTrack = document.querySelector('.services-track') as HTMLElement;

  if (!content || !servicesSection || !servicesTrack) return;

  let isInServices = false;
  let scrollProgress = 0; // 0 = cards off-screen right, 1 = cards at final position
  let isExiting = false;

  // Calculate max scroll distance for the track
  const getMaxScroll = () => {
    const trackWidth = servicesTrack.scrollWidth;
    const viewportWidth = servicesSection.clientWidth;
    return trackWidth - viewportWidth + 80; // 80px for padding
  };

  const updateTrackPosition = () => {
    const maxScroll = getMaxScroll();
    // Start position: 100% (off-screen right)
    // End position: -maxScroll pixels
    const startX = servicesSection.clientWidth;
    const endX = -maxScroll;
    const currentX = startX + (endX - startX) * scrollProgress;

    servicesTrack.style.setProperty('--track-x', `${currentX}px`);
  };

  // Handle wheel events for scroll hijacking
  content.addEventListener('wheel', (e) => {
    const sectionTop = servicesSection.offsetTop;
    const scrollTop = content.scrollTop;
    const viewportHeight = content.clientHeight;

    // Check if services section is in view
    const sectionInView = scrollTop >= sectionTop - 10 &&
                          scrollTop < sectionTop + viewportHeight;

    if (sectionInView) {
      const delta = e.deltaY;

      // Scrolling down
      if (delta > 0) {
        if (scrollProgress < 1) {
          e.preventDefault();
          scrollProgress = Math.min(1, scrollProgress + delta / 1000);
          servicesSection.classList.remove('exiting');
          servicesSection.classList.add('entering');
          if (scrollProgress >= 1) {
            servicesSection.classList.remove('entering');
            servicesSection.classList.add('at-end');
          }
          updateTrackPosition();
        } else {
          // Cards are at end, allow normal scroll
          servicesSection.classList.remove('entering', 'at-end');
          servicesSection.classList.add('exiting');
          isExiting = true;
        }
      }

      // Scrolling up
      if (delta < 0) {
        if (isExiting && scrollTop > sectionTop) {
          // Coming back from below - let it scroll normally
        } else if (scrollProgress > 0 && scrollTop <= sectionTop + 10) {
          e.preventDefault();
          scrollProgress = Math.max(0, scrollProgress + delta / 1000);
          servicesSection.classList.remove('at-end', 'exiting');
          servicesSection.classList.add('entering');
          isExiting = false;
          updateTrackPosition();
        }
      }
    } else {
      // Reset when section is not in view
      if (scrollTop < sectionTop - viewportHeight / 2) {
        scrollProgress = 0;
        isExiting = false;
        servicesSection.classList.remove('entering', 'at-end', 'exiting');
        updateTrackPosition();
      }
    }
  }, { passive: false });

  // Handle exit animation when scrolling to next section
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting && isExiting) {
        const rect = servicesSection.getBoundingClientRect();
        if (rect.bottom < 0) {
          // Section scrolled up past viewport
          const exitProgress = Math.min(1, Math.abs(rect.bottom) / 200);
          servicesTrack.style.setProperty('--track-y', `${-exitProgress * 50}px`);
          servicesTrack.style.setProperty('--track-opacity', `${1 - exitProgress}`);

          // Also shift left on exit
          const maxScroll = getMaxScroll();
          const exitX = -maxScroll - (exitProgress * 200);
          servicesTrack.style.setProperty('--track-x', `${exitX}px`);
        }
      }

      if (entry.isIntersecting && entry.boundingClientRect.top > 0) {
        // Section coming back into view from below - reset
        servicesTrack.style.setProperty('--track-y', '0px');
        servicesTrack.style.setProperty('--track-opacity', '1');
      }
    });
  }, { threshold: [0, 0.1, 0.5, 0.9, 1] });

  observer.observe(servicesSection);

  // Initial position
  updateTrackPosition();
});
