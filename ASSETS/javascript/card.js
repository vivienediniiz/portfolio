const techDescriptions = {
    'HTML5': 'Linguagem de marcação para estruturar conteúdo web.',
    'CSS3': 'Linguagem de estilização para design web moderno.',
    'JavaScript': 'Linguagem de programação para interatividade web.',
    'Figma': 'Ferramenta de design de interface e prototipagem.',
    'Photoshop': 'Software profissional de edição de imagens.',
    'Canva': 'Plataforma de design gráfico online.',
    'React': 'Biblioteca JavaScript para construção de interfaces.',
    'Bootstrap': 'Framework CSS para desenvolvimento responsivo.'
};

document.querySelectorAll('.tec-img').forEach(tech => {
    tech.addEventListener('click', (e) => {
        const techName = tech.getAttribute('data-tech');
        const card = document.getElementById('techCard');
        card.querySelector('.card-title').textContent = techName;
        card.querySelector('.card-description').textContent = techDescriptions[techName];
        card.classList.add('active');
        e.stopPropagation();
    });
});

document.querySelector('.close-button').addEventListener('click', (e) => {
    document.getElementById('techCard').classList.remove('active');
    e.stopPropagation();
});

// Fechar o card ao clicar fora dele
document.addEventListener('click', (e) => {
    const card = document.getElementById('techCard');
    if (card.classList.contains('active') && !e.target.closest('.tech-card')) {
        card.classList.remove('active');
    }
});

let scrollTimer;
window.addEventListener('scroll', () => {
    const card = document.getElementById('techCard');
    if (card.classList.contains('active')) {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            card.classList.remove('active');
        }, 5); // 200ms de delay
    }
});