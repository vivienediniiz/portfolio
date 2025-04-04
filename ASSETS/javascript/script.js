document.getElementById("meuFormulario").addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch("/.netlify/functions/form-handler", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            document.getElementById("mensagem-status").textContent = "Formulário enviado com sucesso!";
            event.target.reset();
        } else {
            document.getElementById("mensagem-status").textContent = "Erro ao enviar. Tente novamente!";
        }
    } catch (error) {
        console.error("Erro:", error);
        document.getElementById("mensagem-status").textContent = "Erro no envio!";
    }
});
