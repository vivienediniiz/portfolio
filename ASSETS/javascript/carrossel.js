// Função genérica que cria um carrossel para um container específico
function criarCarrossel(containerSelector, slideSelector) {
    const container = document.querySelector(containerSelector);
    const slides = container.querySelector(slideSelector);
    const prevButton = container.querySelector(".arrow.left");
    const nextButton = container.querySelector(".arrow.right");
    const slideCount = slides.children.length;

    let currentSlide = 0;

    function showSlide(index) {
        if (index >= slideCount) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slideCount - 1;
        } else {
            currentSlide = index;
        }
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;
        slides.style.transition = "transform 0.5s ease-in-out";
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    prevButton.addEventListener("click", prevSlide);
    nextButton.addEventListener("click", nextSlide);

    showSlide(currentSlide); // inicializa
}

// Cria carrosséis para cada projeto
criarCarrossel("#projetos-portfolio-1", ".slides");
criarCarrossel("#projetos-portfolio-2", ".slides-2");
