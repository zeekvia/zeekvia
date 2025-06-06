document.addEventListener("DOMContentLoaded", () => {
  // --- Dynamic Services Loading ---
  const container = document.getElementById("services-container");

  if (container) {
    fetch("services.json")
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(services => {
        // Append dynamic services without removing existing static content
        const dynamicHTML = services.map(service => `
          <div class="feature">
            <h3>${service.title}</h3>
            <p>${service.description}</p>
          </div>
        `).join("");
        container.insertAdjacentHTML('beforeend', dynamicHTML);
      })
      .catch(err => {
        const errorMsg = document.createElement('p');
        errorMsg.textContent = "Unable to load services at the moment.";
        container.appendChild(errorMsg);
        console.error("Failed to fetch services:", err);
      });
  }

  // --- Custom Cursor Setup ---
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');
  const body = document.body;

  if (cursorDot && cursorOutline) {
    body.classList.add("active-cursor");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outlineX = mouseX;
    let outlineY = mouseY;
    const delay = 8;

    // Instantly move dot to mouse coords
    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    // Animate outline trailing effect smoothly
    function animateOutline() {
      outlineX += (mouseX - outlineX) / delay;
      outlineY += (mouseY - outlineY) / delay;
      cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
      requestAnimationFrame(animateOutline);
    }
    animateOutline();

    // Interactive elements: scale cursor on hover
    const interactiveElements = document.querySelectorAll('a, button, .btn, .feature h3');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorDot.style.transform += ' scale(1.5)';
        cursorOutline.style.transform += ' scale(2)';
        cursorOutline.style.opacity = '0.8';
      });
      el.addEventListener('mouseleave', () => {
        cursorDot.style.transform = cursorDot.style.transform.replace(/ scale\(1\.5\)/, '');
        cursorOutline.style.transform = cursorOutline.style.transform.replace(/ scale\(2\)/, '');
        cursorOutline.style.opacity = '0.5';
      });
    });

    // Show/hide cursor on window enter/leave for smooth experience
    document.addEventListener('mouseleave', () => {
      cursorDot.style.opacity = '0';
      cursorOutline.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursorDot.style.opacity = '1';
      cursorOutline.style.opacity = '0.5';
    });
  }

  // --- Parallax effect on hero background ---
  const heroSection = document.getElementById('hero-section');
  if (heroSection) {
    heroSection.style.backgroundPosition = 'center center';

    heroSection.addEventListener('mousemove', e => {
      const { width, height, left, top } = heroSection.getBoundingClientRect();
      const x = e.clientX - left - width / 2;
      const y = e.clientY - top - height / 2;
      const maxTranslate = 15; // max px to move

      const posX = 50 + (x / width) * maxTranslate;
      const posY = 50 + (y / height) * maxTranslate;

      heroSection.style.backgroundPosition = `${posX}% ${posY}%`;
    });

    heroSection.addEventListener('mouseleave', () => {
      heroSection.style.backgroundPosition = 'center center';
    });
  }
});
