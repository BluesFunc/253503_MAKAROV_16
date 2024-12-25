class Slider {
    constructor({
      container,
      slides,
      loop = true,
      navs = true,
      pags = true,
      auto = false,
      delay = 5,
      stopMouseHover = true,
    }) {
      this.container = document.querySelector(container);
      this.slides = slides;
      this.loop = loop;
      this.navs = navs;
      this.pags = pags;
      this.auto = auto;
      this.delay = delay * 1000;
      this.stopMouseHover = stopMouseHover;
      this.currentIndex = 0;
      this.timer = null;
  
      this.init();
    }
  
    init() {
      this.createSlider();
      this.updateUI();
      if (this.auto) this.startAutoRotate();
    }
  
    createSlider() {
      this.sliderWrapper = document.createElement("div");
      this.sliderWrapper.classList.add("slider-wrapper");
  
      this.slides.forEach((slide, index) => {
        const slideElement = document.createElement("div");
        slideElement.classList.add("slide");
        slideElement.innerHTML = `
          <a href="${slide.link}" target="_blank">
            <img src="${slide.image}" alt="Slide ${index + 1}">
          </a>
          <div class="slide-caption">${slide.caption}</div>
        `;
        this.sliderWrapper.appendChild(slideElement);
      });
  
      this.container.appendChild(this.sliderWrapper);
  
      if (this.navs) this.createNavButtons();
      if (this.pags) this.createPagination();
    }
  
    createNavButtons() {
      const prevBtn = document.createElement("button");
      prevBtn.classList.add("slider-prev");
      prevBtn.textContent = "❮";
  
      const nextBtn = document.createElement("button");
      nextBtn.classList.add("slider-next");
      nextBtn.textContent = "❯";
  
      this.container.appendChild(prevBtn);
      this.container.appendChild(nextBtn);
  
      prevBtn.addEventListener("click", () => this.prevSlide());
      nextBtn.addEventListener("click", () => this.nextSlide());
    }
  
    createPagination() {
      this.pagination = document.createElement("div");
      this.pagination.classList.add("slider-pagination");
  
      this.slides.forEach((_, index) => {
        const pagBtn = document.createElement("button");
        pagBtn.classList.add("pagination-btn");
        pagBtn.dataset.index = index;
        pagBtn.textContent = index + 1;
        pagBtn.addEventListener("click", (e) => this.goToSlide(parseInt(e.target.dataset.index)));
        this.pagination.appendChild(pagBtn);
      });
  
      this.container.appendChild(this.pagination);
    }
  
    updateUI() {
      const allSlides = this.sliderWrapper.querySelectorAll(".slide");
      allSlides.forEach((slide, index) => {
        slide.style.display = index === this.currentIndex ? "block" : "none";
      });
  
      if (this.pags) {
        const allBtns = this.pagination.querySelectorAll(".pagination-btn");
        allBtns.forEach((btn, index) => {
          btn.classList.toggle("active", index === this.currentIndex);
        });
      }
  
      this.updateCounter();
    }
  
    updateCounter() {
      if (!this.counter) {
        this.counter = document.createElement("div");
        this.counter.classList.add("slider-counter");
        this.container.appendChild(this.counter);
      }
      this.counter.textContent = `${this.currentIndex + 1} / ${this.slides.length}`;
    }
  
    nextSlide() {
      this.currentIndex = this.loop
        ? (this.currentIndex + 1) % this.slides.length
        : Math.min(this.currentIndex + 1, this.slides.length - 1);
      this.updateUI();
    }
  
    prevSlide() {
      this.currentIndex = this.loop
        ? (this.currentIndex - 1 + this.slides.length) % this.slides.length
        : Math.max(this.currentIndex - 1, 0);
      this.updateUI();
    }
  
    goToSlide(index) {
      this.currentIndex = index;
      this.updateUI();
    }
  
    startAutoRotate() {
      this.stopAutoRotate();
      this.timer = setInterval(() => this.nextSlide(), this.delay);
  
      if (this.stopMouseHover) {
        this.container.addEventListener("mouseenter", () => this.stopAutoRotate());
        this.container.addEventListener("mouseleave", () => this.startAutoRotate());
      }
    }
  
    stopAutoRotate() {
      clearInterval(this.timer);
    }
  }
  
  // Example usage:
  const slider = new Slider({
    container: "#slider",
    slides: [
      { image: "static/PAPA.jpg", link: "#1", caption: "Slide 1" },
      { image: "static/Logo.png", link: "#2", caption: "Slide 2" },
      { image: "static/Logo2.png", link: "#3", caption: "Slide 3" },
    ],
    loop: true,
    navs: true,
    pags: true,
    auto: true,
    delay: 3,
    stopMouseHover: true,
  });
  