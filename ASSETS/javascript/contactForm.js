document.getElementById("meuFormulario").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio tradicional do formulário

    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let telefone = document.getElementById("telefone").value;
    let mensagem = document.getElementById("mensagem").value;

    let numeroWhatsApp = "5531999749614"; // Exemplo: 5511999999999 (código do país + DDD + número)

    let texto = `Olá! Meu nome é *${nome}*.%0A
📧 E-mail: ${email}%0A
📞 Telefone: ${telefone}%0A
💬 Mensagem: ${mensagem}`;

    let url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${texto}`;

    window.open(url, "_blank"); // Abre o WhatsApp em uma nova aba

    // Mensagem de feedback opcional
    document.getElementById("mensagem-status").innerHTML = "<p style='color: green;'>Mensagem enviada com sucesso!</p>";

    // Limpar formulário após o envio
    document.getElementById("meuFormulario").reset();
});
