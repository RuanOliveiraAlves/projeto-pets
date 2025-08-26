let slides = document.querySelectorAll('.slide');
let currentIndex = 0;
let prevBtn = document.querySelector('.prev');
let nextBtn = document.querySelector('.next');
let dotsContainer = document.querySelector('.dots');

// Criar bolinhas
slides.forEach((_, i) => {
  let dot = document.createElement("button");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => {
    currentIndex = i;
    showSlide(currentIndex);
  });
  dotsContainer.appendChild(dot);
});
let dots = document.querySelectorAll('.dots button');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    dots[i].classList.remove('active');
    slide.style.left = "100%";
  });

  slides[index].classList.add('active');
  dots[index].classList.add('active');
  slides[index].style.left = "0";
}

// Botões
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
});

// Autoplay
setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}, 8000); // troca a cada 8s

// Slide inicial
showSlide(currentIndex);
