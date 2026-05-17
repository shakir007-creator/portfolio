// ======================================
// PORTFOLIO SCRIPT
// ======================================

window.addEventListener("DOMContentLoaded", () => {

  // ======================================
  // AOS
  // ======================================

  AOS.init({
    duration: 800,
    once: true,
    offset: 80
  });

  // ======================================
  // THEME TOGGLE
  // ======================================

  const themeToggle =
    document.getElementById("themeToggle");

  const themeIcon =
    themeToggle.querySelector("i");

  const savedTheme =
    localStorage.getItem("theme");

  if(savedTheme === "light"){

    document.body.classList.add("light");
    document.documentElement.classList.remove("light-mode-preload");

    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");

  }

  themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const isLight =
      document.body.classList.contains("light");

    localStorage.setItem(
      "theme",
      isLight ? "light" : "dark"
    );

    themeIcon.classList.toggle("fa-sun");
    themeIcon.classList.toggle("fa-moon");

  });

  // ======================================
  // MOBILE NAVIGATION
  // ======================================

  const menuBtn =
    document.getElementById("menuBtn");

  const navLinks =
    document.getElementById("navLinks");

  menuBtn.addEventListener("click", e => {

    e.stopPropagation();

    navLinks.classList.toggle("active");

  });

  // CLOSE MENU ON OUTSIDE CLICK

  document.addEventListener("click", e => {

    const clickedInsideMenu =
      navLinks.contains(e.target);

    const clickedMenuButton =
      menuBtn.contains(e.target);

    if(
      !clickedInsideMenu &&
      !clickedMenuButton
    ){

      navLinks.classList.remove("active");

    }

  });

  // CLOSE MENU ON RESIZE

  window.addEventListener("resize", () => {

    if(window.innerWidth > 900){

      navLinks.classList.remove("active");

    }

  });

  // ======================================
  // SMOOTH SCROLL
  // ======================================

  document.querySelectorAll(".nav-links a")
  .forEach(link => {

    link.addEventListener("click", e => {

      e.preventDefault();

      const target =
        document.querySelector(
          link.getAttribute("href")
        );

      if(target){

        const y =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          85;

        window.scrollTo({
          top: y,
          behavior: "smooth"
        });

        navLinks.classList.remove("active");

      }

    });

  });

  // ======================================
  // PROGRESS BAR
  // ======================================

  const progressBar =
    document.getElementById("progressBar");

  function updateProgressBar(){

    const scrollTop =
      document.documentElement.scrollTop;

    const height =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const progress =
      (scrollTop / height) * 100;

    progressBar.style.width =
      progress + "%";

  }

  updateProgressBar();

  window.addEventListener(
    "scroll",
    updateProgressBar
  );

  // ======================================
  // TYPING EFFECT
  // ======================================

  const typingEl =
    document.getElementById("typingName");

  const text =
    "Mohammed Sakir Qureshi";

  let index = 0;

  typingEl.textContent = "";

  typingEl.classList.add("typing-cursor");

  function typeName(){

    if(index < text.length){

      typingEl.textContent +=
        text.charAt(index);

      index++;

      setTimeout(typeName, 85);

    }

    else{

      // REMOVE CURSOR AFTER TYPING

      setTimeout(() => {

        typingEl.classList.remove("typing-cursor");
        typingEl.classList.add("finished");

      }, 500);

    }

  }

  typeName();

  // ======================================
  // INTERACTIVE NETWORK
  // ======================================

  const canvas =
    document.getElementById("network");

  const ctx =
    canvas.getContext("2d");

  // ======================================
  // CANVAS RESIZE
  // ======================================

  function resizeCanvas(){

    canvas.width =
      window.innerWidth;

    canvas.height =
      window.innerHeight;

  }

  resizeCanvas();

  window.addEventListener(
    "resize",
    resizeCanvas
  );

  // ======================================
  // MOUSE + TOUCH
  // ======================================

  const mouse = {

    x: null,
    y: null,

    radius:
      window.innerWidth < 768
      ? 110
      : 150

  };

  // DESKTOP

  window.addEventListener("mousemove", e => {

    mouse.x = e.clientX;
    mouse.y = e.clientY;

  });

  window.addEventListener("mouseout", () => {

    mouse.x = null;
    mouse.y = null;

  });

  // MOBILE TOUCH

  window.addEventListener("touchmove", e => {

    mouse.x =
      e.touches[0].clientX;

    mouse.y =
      e.touches[0].clientY;

  }, { passive:true });

  window.addEventListener("touchend", () => {

    mouse.x = null;
    mouse.y = null;

  });

  // ======================================
  // CREATE NODES
  // ======================================

  const nodes = [];

  const NODE_COUNT =
    window.innerWidth < 768
    ? 25
    : 55;

  for(let i = 0; i < NODE_COUNT; i++){

    nodes.push({

      x:
        Math.random() *
        canvas.width,

      y:
        Math.random() *
        canvas.height,

      vx:
        (Math.random() - 0.5) * 0.55,

      vy:
        (Math.random() - 0.5) * 0.55,

      radius:
        2 + Math.random() * 2.2

    });

  }

  // ======================================
  // CONNECT NODES
  // ======================================

  function connectNodes(){

    for(let a = 0; a < nodes.length; a++){

      for(let b = a; b < nodes.length; b++){

        const dx =
          nodes[a].x - nodes[b].x;

        const dy =
          nodes[a].y - nodes[b].y;

        const distance =
          dx * dx + dy * dy;

        if(distance < 8500){

          ctx.strokeStyle =
            `rgba(59,130,246,${
              1 - distance / 8500
            })`;

          ctx.lineWidth = 1;

          ctx.beginPath();

          ctx.moveTo(
            nodes[a].x,
            nodes[a].y
          );

          ctx.lineTo(
            nodes[b].x,
            nodes[b].y
          );

          ctx.stroke();

        }

      }

    }

  }

  // ======================================
  // ANIMATION
  // ======================================

  function animate(){

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    for(let i = 0; i < nodes.length; i++){

      const n = nodes[i];

      // MOVE

      n.x += n.vx;
      n.y += n.vy;

      // BOUNDARY COLLISION

      if(
        n.x > canvas.width ||
        n.x < 0
      ){

        n.vx *= -1;

      }

      if(
        n.y > canvas.height ||
        n.y < 0
      ){

        n.vy *= -1;

      }

      // ======================================
      // MOUSE INTERACTION
      // ======================================

      if(mouse.x && mouse.y){

        const dx =
          mouse.x - n.x;

        const dy =
          mouse.y - n.y;

        const dist =
          Math.sqrt(dx * dx + dy * dy);

        if(dist < mouse.radius){

          n.x -= dx * 0.010;
          n.y -= dy * 0.010;

          ctx.beginPath();

          ctx.arc(
            n.x,
            n.y,
            n.radius * 2.6,
            0,
            Math.PI * 2
          );

          ctx.fillStyle =
            "rgba(96,165,250,0.95)";

          ctx.fill();

        }

      }

      // ======================================
      // DRAW NODE
      // ======================================

      ctx.beginPath();

      ctx.arc(
        n.x,
        n.y,
        n.radius,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        "rgba(59,130,246,0.88)";

      // BETTER PERFORMANCE ON MOBILE

      if(window.innerWidth > 768){

        ctx.shadowBlur = window.innerWidth > 768 ? 6 : 0;
        ctx.shadowColor = "#3b82f6";

      }else{

        ctx.shadowBlur = 0;

      }

      ctx.fill();

    }

    connectNodes();

    requestAnimationFrame(animate);

  }

  animate();

});