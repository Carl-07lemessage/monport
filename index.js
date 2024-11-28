const container = document.getElementById("threejs-container");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

const gridSize = 100;
const spacing = 1.5;
const waveFrequency = 0.2;
const waveAmplitude = 1;
const points = [];

for (let x = -gridSize / 2; x < gridSize / 2; x++) {
  for (let z = -gridSize / 2; z < gridSize / 2; z++) {
    const geometry = new THREE.SphereGeometry(0.05, 8, 8);
    const material = new THREE.MeshBasicMaterial({ color: 0x1e3a8a });
    const point = new THREE.Mesh(geometry, material);
    point.position.set(x * spacing, 0, z * spacing);
    scene.add(point);
    points.push({ mesh: point, x: x, z: z });
  }
}

camera.position.y = 10;
camera.position.z = 20;
camera.rotation.x = -0.5;
let time = 0;

function animate() {
  requestAnimationFrame(animate);
  time += 0.05;
  points.forEach((point) => {
    point.mesh.position.y =
      Math.sin(point.x * waveFrequency + time) * waveAmplitude +
      Math.cos(point.z * waveFrequency + time) * waveAmplitude;
  });
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  const width = container.clientWidth;
  const height = container.clientHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  emailjs.init("YOUR_PUBLIC_KEY");

  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const submitButton = form.querySelector(".submit-button");
    const originalText = submitButton.textContent;
    submitButton.textContent = "Envoi en cours...";
    submitButton.disabled = true;

    const templateParams = {
      from_name: document.getElementById("name").value,
      from_email: document.getElementById("email").value,
      message: document.getElementById("message").value,
      to_email: "mikolodarselcarl@gmail.com",
    };

    emailjs
      .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          submitButton.textContent = "Message envoyé!";
          form.reset();
          setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
          }, 3000);
        },
        function (error) {
          console.log("FAILED...", error);
          submitButton.textContent = "Erreur d'envoi";
          setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
          }, 3000);
        }
      );
  });

  const animateElements = document.querySelectorAll(".animate");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  animateElements.forEach((element) => {
    observer.observe(element);
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
  });

  const scrollAnimations = () => {
    const elements = document.querySelectorAll(".animate");

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight;

      if (elementPosition < screenPosition) {
        element.classList.add("visible");
        element.style.animation = "slideInRight 0.5s ease-out forwards";
      }
    });
  };

  window.addEventListener("scroll", scrollAnimations);
  window.addEventListener("load", scrollAnimations);

  const skillBars = document.querySelectorAll(".skill-bar");

  skillBars.forEach((bar) => {
    const progress = bar.querySelector(".skill-progress");
    const percentage = bar.dataset.percentage;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            progress.style.width = percentage + "%";
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(bar);
  });

  const backToTop = document.querySelector(".back-to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  backToTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  const navLinks = document.querySelectorAll("nav a");

  // Update active state on scroll
  window.addEventListener("scroll", () => {
    let current = "";
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 60) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        entry.target.style.transition = "all 0.6s ease-out";
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px",
  }
);

const animateElements = document.querySelectorAll(".animate");
animateElements.forEach((element) => {
  observer.observe(element);
});

const parallaxElements = document.querySelectorAll(
  ".project, .skill-group, .service-card"
);

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;

  parallaxElements.forEach((element) => {
    const speed = 0.1;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});