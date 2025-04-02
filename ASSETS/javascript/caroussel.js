let indice = 0;
const projects = document.querySelector(".projects");
const totalSections = document.querySelectorAll(".projects section").length;

function mudarSection(direcao) {
    indice += direcao;

    if (indice < 0) {
        indice = totalSections - 1; // Volta para o último
    } else if (indice >= totalSections) {
        indice = 0; // Volta para o primeiro
    }

    projects.style.transform = `translateX(${-indice * 100}%)`;
}


// CARROSSEL SOBRE MIM //

let currentIndex = 0;
const images = document.querySelectorAll('.imagem');
const totalImages = images.length;

function proximaImagem() {
    // Remove a classe "ativa" da imagem atual
    images[currentIndex].classList.remove('ativa');

    // Avança para a próxima imagem
    currentIndex = (currentIndex + 1) % totalImages;

    // Adiciona a classe "ativa" à nova imagem
    images[currentIndex].classList.add('ativa');

    // Reorganiza as imagens para o efeito circular
    images.forEach((img, index) => {
        if (index === currentIndex) {
            img.style.left = '50%';
            img.style.transform = 'translate(-50%, -50%)';
        } else if (index === (currentIndex + 1) % totalImages) {
            img.style.left = '75%';
            img.style.transform = 'translate(0%, -50%)';
        } else {
            img.style.left = '25%';
            img.style.transform = 'translate(-100%, -50%)';
        }
    });
}

// Inicia o carrossel automático
setInterval(proximaImagem, 3000); // Muda a imagem a cada 3 segundos


/*TRANSIÇÃO DE PROJETOS*/

document.addEventListener("DOMContentLoaded", function() {
    const scrollContainer = document.querySelector('.scroll_container');
    const scrollItems = document.querySelectorAll('.scroll_item');
    const scrollWidth = scrollContainer.scrollWidth;

    // Duplica os itens para criar o efeito de rolagem infinita
    scrollItems.forEach(item => {
        const clone = item.cloneNode(true);
        scrollContainer.appendChild(clone);
    });

    // Ajusta a duração da animação com base na largura total dos itens
    const totalWidth = scrollContainer.scrollWidth;
    const duration = totalWidth / 50; // Ajuste a velocidade da rolagem aqui

    scrollContainer.style.animationDuration = `${duration}s`;
});