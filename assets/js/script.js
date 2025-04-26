$(document).ready(function () {
    // Menu toggle for mobile navigation
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    // Handle scroll events and navigation highlighting
    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        // Show/hide scroll-to-top button
        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // Highlight current section in navigation
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // Smooth scrolling for anchor links
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // Email form handling
    $("#contact-form").submit(function (event) {
        emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");

        emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Form Submission Failed! Try Again");
            });
        event.preventDefault();
    });
});

// Document title change when tab is not active
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Portfolio | Gopichand";
        $("#favicon").attr("href", "assets/images/favicon.png");
    } else {
        document.title = "Come Back To Portfolio";
        $("#favicon").attr("href", "assets/images/favhand.png");
    }
});

// Typed.js text animation
var typed = new Typed(".typing-text", {
    strings: ["Data Science", "Machine Learning", "Data Engineering"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});

// Fetch data from JSON files
async function fetchData(type = "skills") {
    let response = (type === "skills") 
        ? await fetch("skills.json")
        : await fetch("./projects.json");
    const data = await response.json();
    return data;
}

// Display skills in the skills section
function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
            <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
            </div>
        </div>`;
    });
    skillsContainer.innerHTML = skillHTML;
}

// Display projects in the work section
function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    projects.slice(0, 10).filter(project => project.category != "android").forEach(project => {
        projectHTML += `
        <div class="box tilt">
            <img draggable="false" src="./assets/images/projects/${project.image}.png" alt="project" />
            <div class="content">
                <div class="tag">
                    <h3>${project.name}</h3>
                </div>
                <div class="desc">
                    <p>${project.desc}</p>
                    <div class="btns">
                        <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
                        <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
                    </div>
                </div>
            </div>
        </div>`;
    });
    projectsContainer.innerHTML = projectHTML;
    
    // Initialize tilt effect
    initializeTilt();
    
    // Initialize scroll reveal animation for projects
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });
    
    srtop.reveal('.work .box', { interval: 200 });
}

// Initialize tilt effect
function initializeTilt() {
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });
}

// Generate random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Apply dynamic colors to container elements
function applyDynamicColorsToContainer(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const elements = container.querySelectorAll('.title, .tag');
    
    elements.forEach(element => {
        const text = element.innerText;
        const wordGroups = [
            "I'm",
            "Gopichand",
            "Machine Learning",
            "&",
            "Data Engineer"
        ];

        element.innerHTML = '';

        wordGroups.forEach(group => {
            if (text.includes(group)) {
                const span = document.createElement('span');
                span.style.color = getRandomColor();
                span.textContent = group + ' ';
                element.appendChild(span);
            }
        });
    });
}

// Preloader animation
function loader() {
    document.querySelector('.loader-container').classList.add('fade-out');
}

function fadeOut() {
    setInterval(loader, 500);
}

// Performance optimization
function optimizePerformance() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });
}

// Layout adjustment
function adjustLayout() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.marginBottom = '2rem';
    });
}

// Initialize scroll reveal animation
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

// Window load event handlers
window.onload = function() {
    // Fade out preloader
    fadeOut();
    
    // Apply dynamic colors
    applyDynamicColorsToContainer('dynamic-color-container');
    
    // Optimize performance
    optimizePerformance();
    
    // Adjust layout
    adjustLayout();
    
    // Fetch and display skills and projects
    fetchData().then(data => {
        showSkills(data);
    });

    fetchData("projects").then(data => {
        showProjects(data);
    });
    
    // Initialize tilt effect
    initializeTilt();
    
    // Initialize scroll reveal animations
    initializeScrollReveal();
};

// Initialize all scroll reveal animations
function initializeScrollReveal() {
    // Home section
    srtop.reveal('.home .content h3', { delay: 200 });
    srtop.reveal('.home .content p', { delay: 200 });
    srtop.reveal('.home .content .btn', { delay: 200 });
    srtop.reveal('.home .image', { delay: 400 });
    srtop.reveal('.home .linkedin', { interval: 600 });
    srtop.reveal('.home .github', { interval: 800 });
    srtop.reveal('.home .twitter', { interval: 1000 });
    srtop.reveal('.home .telegram', { interval: 600 });
    srtop.reveal('.home .instagram', { interval: 600 });
    srtop.reveal('.home .dev', { interval: 600 });

    // About section
    srtop.reveal('.about .content h3', { delay: 200 });
    srtop.reveal('.about .content .tag', { delay: 200 });
    srtop.reveal('.about .content p', { delay: 200 });
    srtop.reveal('.about .content .box-container', { delay: 200 });
    srtop.reveal('.about .content .resumebtn', { delay: 200 });

    // Skills section
    srtop.reveal('.skills .container', { interval: 200 });
    srtop.reveal('.skills .container .bar', { delay: 400 });

    // Education section
    srtop.reveal('.education .box', { interval: 200 });

    // Projects section
    srtop.reveal('.work .box', { interval: 200 });

    // Experience section
    srtop.reveal('.experience .timeline', { delay: 400 });
    srtop.reveal('.experience .timeline .container', { interval: 400 });

    // Achievements section
    srtop.reveal('.achievements .content h3', { delay: 200 });
    srtop.reveal('.achievements .content .tag', { delay: 200 });
    srtop.reveal('.achievements .content p', { delay: 200 });
    srtop.reveal('.achievements .content .box-container', { delay: 200 });

    // Contact section
    srtop.reveal('.contact .container', { delay: 400 });
    srtop.reveal('.contact .container .form-group', { delay: 400 });
}

// Handle window resize event
window.addEventListener('resize', adjustLayout);

// Initialize AOS animation library
AOS.init({
  duration: 1000,
  easing: 'ease-in-out',
  once: true,
  mirror: false
});

// PRELOADER ANIMATION
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    document.querySelector('.loader-container').classList.add('fade-out');
    
    // Remove the preloader after the animation
    setTimeout(function() {
      document.querySelector('.loader-container').style.display = 'none';
    }, 1000);
  }, 2000);
});

// NEURAL NETWORK ANIMATION
document.addEventListener("DOMContentLoaded", function() {
  const nodes = document.querySelectorAll('.node');
  const network = document.querySelector('.neural-network');
  if (!network) return;

  // Create neural connections
  const inputNodes = document.querySelectorAll('.input-node');
  const hiddenNodes = document.querySelectorAll('.hidden-node');
  const outputNodes = document.querySelectorAll('.output-node');

  // Draw connections between nodes using SVG
  function createConnection(startNode, endNode, color) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.style.position = "absolute";
    svg.style.top = "0";
    svg.style.left = "0";
    svg.style.width = "100%";
    svg.style.height = "100%";
    svg.style.pointerEvents = "none";
    svg.style.zIndex = "-1";

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    const startRect = startNode.getBoundingClientRect();
    const endRect = endNode.getBoundingClientRect();
    const networkRect = network.getBoundingClientRect();

    const startX = (startRect.left + startRect.width/2) - networkRect.left;
    const startY = (startRect.top + startRect.height/2) - networkRect.top;
    const endX = (endRect.left + endRect.width/2) - networkRect.left;
    const endY = (endRect.top + endRect.height/2) - networkRect.top;

    line.setAttribute("x1", startX);
    line.setAttribute("y1", startY);
    line.setAttribute("x2", endX);
    line.setAttribute("y2", endY);
    line.setAttribute("stroke", color);
    line.setAttribute("stroke-width", "2");
    line.setAttribute("opacity", "0.7");
    svg.appendChild(line);

    return svg;
  }

  // Wait for DOM to fully render
  setTimeout(() => {
    // Connect input to hidden nodes
    inputNodes.forEach(inputNode => {
      hiddenNodes.forEach(hiddenNode => {
        const connection = createConnection(
          inputNode, 
          hiddenNode, 
          "linear-gradient(135deg, #6e3cff, #c56cd6)"
        );
        network.appendChild(connection);
      });
    });

    // Connect hidden to output nodes
    hiddenNodes.forEach(hiddenNode => {
      outputNodes.forEach(outputNode => {
        const connection = createConnection(
          hiddenNode, 
          outputNode, 
          "linear-gradient(135deg, #6e3cff, #c56cd6)"
        );
        network.appendChild(connection);
      });
    });
  }, 500);
});

// MATRIX ANIMATION
document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  
  // Make canvas full screen
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Characters to display
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%"\'#&_(),.;:?!\\|{}<>[]^~';
  
  // Converting the string into an array of single characters
  const charactersArray = characters.split('');
  
  const fontSize = 10;
  const columns = canvas.width / fontSize; // Number of columns for the rain
  
  // Array to track the y position of each drop
  const drops = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = Math.floor(Math.random() * canvas.height / fontSize); // Random starting point
  }
  
  // Drawing the characters
  function draw() {
    // Set translucent background to create the trailing effect
    ctx.fillStyle = 'rgba(15, 27, 56, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#6e3cff'; // Green text
    ctx.font = fontSize + 'px monospace';
    
    // Looping over drops
    for (let i = 0; i < drops.length; i++) {
      // Get a random character
      const text = charactersArray[Math.floor(Math.random() * charactersArray.length)];
      
      // x = i * fontSize, y = value of drops[i] * fontSize
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      
      // Randomly resetting drop position to create a staggered effect
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      
      // Move drops down
      drops[i]++;
    }
  }
  
  // Animation loop
  setInterval(draw, 40);
  
  // Resize canvas when window is resized
  window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Recalculate columns
    const columns = canvas.width / fontSize;
    
    // Reset drops array
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
    }
  });
});

// DYNAMIC COLOR GRADIENTS FOR ABOUT SECTION
document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('dynamic-color-container');
  if (!container) return;
  
  // Subtly change the color gradients on hover
  container.addEventListener('mousemove', function(e) {
    const x = e.clientX - container.getBoundingClientRect().left;
    const y = e.clientY - container.getBoundingClientRect().top;
    
    const percentX = x / container.offsetWidth;
    const percentY = y / container.offsetHeight;
    
    // Update gradient based on mouse position
    container.style.background = `radial-gradient(
      circle at ${percentX * 100}% ${percentY * 100}%, 
      rgba(110, 60, 255, 0.05), 
      rgba(197, 108, 214, 0.02),
      transparent 70%
    )`;
  });
});

// Initialize vanilla-tilt for 3D tilt effects
document.addEventListener('DOMContentLoaded', function() {
  const tiltElements = document.querySelectorAll('[data-tilt]');
  if (tiltElements.length > 0) {
    VanillaTilt.init(tiltElements, {
      max: 10,
      speed: 400,
      glare: true,
      "max-glare": 0.3
    });
  }
});

// GLITCH TEXT EFFECT
document.addEventListener('DOMContentLoaded', function() {
  const glitchText = document.querySelector('.glitch-text');
  if (!glitchText) return;
  
  // Create random glitch effect occasionally
  setInterval(function() {
    if (Math.random() > 0.95) {
      glitchText.classList.add('active-glitch');
      setTimeout(function() {
        glitchText.classList.remove('active-glitch');
      }, 200);
    }
  }, 3000);
});
