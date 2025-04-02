
document.getElementById('meuFormulario').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        mensagem: document.getElementById('mensagem').value
    };
    
    // Substitua pela URL do seu backend quando hospedar
    fetch('https://seu-backend.com/enviar-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('mensagem-status').textContent = 'Mensagem enviada com sucesso!';
        document.getElementById('meuFormulario').reset();
    })
    .catch(error => {
        document.getElementById('mensagem-status').textContent = 'Erro ao enviar mensagem. Tente novamente.';
        console.error('Error:', error);
    });
});

