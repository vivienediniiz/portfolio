const textos = ["Desenvolvedora Front-End", "Design Gráfica"]; // Textos que serão digitados
const elemento = document.getElementById("typing-effect");
let indexTexto = 0;
let indexLetra = 0;
let estaApagando = false;

function digitar() {
    const textoAtual = textos[indexTexto];

    if (!estaApagando) {
        // Digitação
        elemento.innerHTML = textoAtual.substring(0, indexLetra + 1) + ' <span class="cursor"></span>'; // Adiciona um espaço antes do cursor
        indexLetra++;

        if (indexLetra === textoAtual.length) {
            // Aguarda 2 segundos após terminar de digitar
            estaApagando = true;
            setTimeout(digitar, 2000);
        } else {
            setTimeout(digitar, 80); // Velocidade da digitação (100ms por letra)
        }
    } else {
        // Apagamento
        elemento.innerHTML = textoAtual.substring(0, indexLetra - 1) + ' <span class="cursor"></span>'; // Adiciona um espaço antes do cursor
        indexLetra--;

        if (indexLetra === 0) {
            // Terminou de apagar, passa para o próximo texto
            estaApagando = false;
            indexTexto = (indexTexto + 1) % textos.length; // Alterna entre os textos
            setTimeout(digitar, 500); // Aguarda 500ms antes de começar a digitar o próximo texto
        } else {
            setTimeout(digitar, 50); // Velocidade do apagamento (50ms por letra)
        }
    }
}

// Inicia o efeito de digitação
digitar();



