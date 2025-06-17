// Seleciona elementos do DOM: o botão hamburguer, o menu lateral, o fundo escurecido (backdrop) e todos os links com a classe 'menu-link'.
const hamburgerBtn = document.getElementById('hamburgerBtn');
const sidebarMenu = document.getElementById('sidebarMenu');
const backdrop = document.getElementById('backdrop');
const menuLinks = document.querySelectorAll('.menu-link');

// Cria uma variável para controlar o estado do menu (aberto ou fechado).
let isMenuOpen = false;

// Define a função openMenu() para abrir o menu lateral.
function openMenu() {
    isMenuOpen = true; // Marca o menu como aberto.
    hamburgerBtn.classList.add('active'); // Adiciona classe "active" ao botão hambúrguer (geralmente para animar).
    sidebarMenu.classList.add('active'); // Exibe o menu lateral.
    backdrop.classList.add('active'); // Ativa o fundo escurecido atrás do menu.
    document.body.style.overflow = 'hidden'; // Impede que o corpo da página role enquanto o menu estiver aberto.

    // Anima os itens do menu um por um.
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        item.style.animation = 'none'; // Reseta a animação anterior.
        item.offsetHeight; // Força o reflow (reinício da animação).
        item.style.animation = `slideIn 0.6s ease forwards`; // Aplica a animação de entrada.
        item.style.animationDelay = `${(index + 1) * 0.1}s`; // Adiciona delay incremental a cada item.
    });
}

// Define a função closeMenu() para fechar o menu lateral.
function closeMenu() {
    isMenuOpen = false; // Marca o menu como fechado.
    hamburgerBtn.classList.remove('active'); // Remove a classe ativa do botão.
    sidebarMenu.classList.remove('active'); // Oculta o menu lateral.
    backdrop.classList.remove('active'); // Remove o fundo escurecido.
    document.body.style.overflow = ''; // Restaura o scroll da página.
}

// Define a função toggleMenu() para alternar entre abrir e fechar o menu.
function toggleMenu() {
    if (isMenuOpen) {
        closeMenu(); // Se já estiver aberto, fecha.
    } else {
        openMenu(); // Se estiver fechado, abre.
    }
}

// Adiciona evento de clique ao botão hambúrguer para alternar o menu.
hamburgerBtn.addEventListener('click', toggleMenu);

// Adiciona evento de clique ao fundo escuro (backdrop) para fechar o menu ao clicar fora.
backdrop.addEventListener('click', closeMenu);

// Para cada link do menu, adiciona um evento de clique:
menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        closeMenu(); // Fecha o menu ao clicar no link.

        // Faz scroll suave até a seção correspondente do link.
        const targetId = link.getAttribute('href');
        if (targetId.startsWith('#')) { // Verifica se é um link âncora interno.
            e.preventDefault(); // Impede comportamento padrão do link.
            const targetSection = document.querySelector(targetId); // Seleciona a seção correspondente.
            if (targetSection) {
                setTimeout(() => { // Aguarda 300ms para o menu fechar antes de rolar.
                    targetSection.scrollIntoView({
                        behavior: 'smooth', // Faz rolagem suave.
                        block: 'start' // Alinha o topo da seção.
                    });
                }, 300);
            }
        }
    });
});

// Adiciona evento global de tecla para detectar se a tecla ESC foi pressionada.
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) { // Fecha o menu se estiver aberto.
        closeMenu();
    }
});

// Previne que o usuário role a tela com o dedo em celulares enquanto o menu estiver aberto.
document.addEventListener('touchmove', (e) => {
    if (isMenuOpen && !sidebarMenu.contains(e.target)) { // Se o toque for fora do menu.
        e.preventDefault(); // Bloqueia o scroll.
    }
}, { passive: false }); // Define como não-passivo para permitir preventDefault.

// Seleciona todos os itens do menu lateral.
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
    const link = item.querySelector('.menu-link'); // Pega o link dentro do item.

    // Aplica efeito de deslocamento para a direita ao passar o mouse (hover).
    link.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(8px)';
    });

    // Remove o efeito de deslocamento ao sair com o mouse.
    link.addEventListener('mouseleave', () => {
        item.style.transform = 'translateX(0)';
    });
});

// Atualiza a seção ativa (highlight do menu) com base na rolagem da página.
function updateActiveSection() {
    const sections = document.querySelectorAll('.section'); // Seleciona todas as seções do site.
    const menuLinks = document.querySelectorAll('.menu-link'); // Seleciona os links do menu.
    let currentSection = ''; // Armazena a seção atualmente visível.

    sections.forEach(section => {
        const sectionTop = section.offsetTop; // Distância da seção ao topo.
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 200) { // Se o scroll já passou pelo topo da seção.
            currentSection = section.getAttribute('id'); // Salva o ID da seção atual.
        }
    });

    // Atualiza visualmente qual link do menu está ativo.
    menuLinks.forEach(link => {
        link.classList.remove('active'); // Remove classe ativa de todos.
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active'); // Ativa apenas o link da seção visível.
        }
    });
}

// Executa a função acima toda vez que o usuário rolar a página.
window.addEventListener('scroll', updateActiveSection);

// Quando a página carregar totalmente, já marca a seção ativa correta.
document.addEventListener('DOMContentLoaded', () => {
    updateActiveSection();
});
