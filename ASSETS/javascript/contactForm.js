document.getElementById("meuFormulario").addEventListener("submit", function(event) {
    event.preventDefault();

    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let telefone = document.getElementById("telefone").value;
    let mensagem = document.getElementById("mensagem").value;

    fetch("/api/send_email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, telefone, mensagem })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.mensagem);
        document.getElementById("mensagem-status").innerHTML = "<p style='color: green;'>E-mail enviado com sucesso!</p>";
        document.getElementById("meuFormulario").reset();
    })
    .catch(error => {
        console.error("Erro ao enviar o e-mail:", error);
        document.getElementById("mensagem-status").innerHTML = "<p style='color: red;'>Erro ao enviar o e-mail.</p>";
    });
});
