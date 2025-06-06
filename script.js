<script defer>
  document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');

    if (!dot || !outline) return;

    // State
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    let hasMoved = false;
    const delay = 8;

    // Animate trailing effect
    function animateCursor() {
      if (hasMoved) {
        currentX += (mouseX - currentX) / delay;
        currentY += (mouseY - currentY) / delay;
        outline.style.transform = `translate(${currentX}px, ${currentY}px)`;
      }
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // First mouse move activates cursor
    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

      if (!hasMoved) {
        hasMoved = true;
        document.body.classList.add('active-cursor');
        outline.style.opacity = '0.5';
        dot.style.opacity = '1';
      }
    });

    // Hide cursor on leave
    document.addEventListener('mouseleave', () => {
      dot.style.opacity = '0';
      outline.style.opacity = '0';
    });

    // Restore cursor on enter
    document.addEventListener('mouseenter', () => {
      if (hasMoved) {
        dot.style.opacity = '1';
        outline.style.opacity = '0.5';
      }
    });

    // Hover scaling
    const hoverTargets = document.querySelectorAll('a, button, .btn-signup, .feature h3, .feature');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        dot.classList.add('cursor-scale');
        outline.classList.add('cursor-scale');
      });
      el.addEventListener('mouseleave', () => {
        dot.classList.remove('cursor-scale');
        outline.classList.remove('cursor-scale');
      });
    });
  });
</script>
