// Função principal que cria o efeito de digitação
function efeitoDigitacao(config) {
    // Desestrutura o objeto de configuração recebido como parâmetro
    // Define valores padrão caso algum não seja passado
    const { elementoId, textos, velocidadeDigitacao = 40, velocidadeApagamento = 50, pausa = 2000 } = config;

    // Seleciona o elemento do DOM onde o texto será digitado
    const elemento = document.getElementById(elementoId);

    // Índice do texto atual da lista de textos
    let indexTexto = 0;

    // Índice da letra atual dentro do texto sendo exibido
    let indexLetra = 0;

    // Indica se o efeito está apagando o texto ou digitando
    let estaApagando = false;

    // Função interna responsável por digitar e apagar os textos
    function digitar() {
        const textoAtual = textos[indexTexto]; // Texto atual a ser exibido

        if (!estaApagando) {
            // Efeito de digitação: adiciona uma letra a cada chamada
            elemento.innerHTML = textoAtual.substring(0, indexLetra + 1) + ' <span class="cursor"></span>';
            indexLetra++;

            if (indexLetra === textoAtual.length) {
                // Quando a digitação do texto atual termina, aguarda a pausa antes de apagar
                estaApagando = true;
                setTimeout(digitar, pausa);
            } else {
                // Continua digitando letra por letra com a velocidade definida
                setTimeout(digitar, velocidadeDigitacao);
            }
        } else {
            // Efeito de apagamento: remove uma letra a cada chamada
            elemento.innerHTML = textoAtual.substring(0, indexLetra - 1) + ' <span class="cursor"></span>';
            indexLetra--;

            if (indexLetra === 0) {
                // Quando termina de apagar, muda para o próximo texto
                estaApagando = false;
                indexTexto = (indexTexto + 1) % textos.length; // Reinicia a lista quando chega ao fim
                setTimeout(digitar, 500); // Pequena pausa antes de digitar o próximo texto
            } else {
                // Continua apagando com a velocidade definida
                setTimeout(digitar, velocidadeApagamento);
            }
        }
    }

    digitar(); // Inicia o efeito de digitação
}

// Aplica o efeito no elemento com id "typing-effect"
efeitoDigitacao({
    elementoId: "typing-effect", // ID do elemento HTML
    textos: ["Desenvolvedora Front-End", "Design Gráfica"] // Textos a serem digitados e apagados
});

// Aplica o efeito no elemento com id "typing-quem-sou"
efeitoDigitacao({
    elementoId: "typing-quem-sou", // Outro elemento HTML
    textos: ["Olá, meu nome é Viviene Diniz! 💜"] // Apenas um texto
});

efeitoDigitacao({
    elementoId: "sites", // Outro elemento HTML
    textos: ["Projetos Web(Sites, Landing Pages e Biolinks)"] // Apenas um texto
});

efeitoDigitacao({
    elementoId: "design", // Outro elemento HTML
    textos: ["Design para Social Media"] // Apenas um texto
});


