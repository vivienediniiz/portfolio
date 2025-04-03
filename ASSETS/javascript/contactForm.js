document.getElementById("meuFormulario").addEventListener("submit", async function(event) {
    event.preventDefault();

    let formData = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        mensagem: document.getElementById("mensagem").value
    };

    try {
        let response = await fetch("/api/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        let result = await response.json();
        alert(result.message);
    } catch (error) {
        alert("Erro ao enviar e-mail. Tente novamente.");
    }
});
