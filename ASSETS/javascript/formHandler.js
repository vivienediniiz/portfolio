// Importe as dependências necessárias
import { database } from './firebase-config.js';
import { ref, push, serverTimestamp } from "firebase/database";

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('meuFormulario');
    const statusMessage = document.getElementById('mensagem-status');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obter valores do formulário
        const contato = {
            nome: form.nome.value,
            email: form.email.value,
            telefone: form.telefone.value,
            mensagem: form.mensagem.value,
            timestamp: serverTimestamp() // Usando a função do SDK modular
        };
        
        // Referência para o nó 'contatos' no Realtime Database
        const contatosRef = ref(database, 'contatos');
        
        // Adicionar novo contato
        push(contatosRef, contato)
            .then(() => {
                statusMessage.textContent = "Mensagem enviada com sucesso!";
                statusMessage.style.color = "green";
                form.reset();
            })
            .catch((error) => {
                statusMessage.textContent = "Erro ao enviar: " + error.message;
                statusMessage.style.color = "red";
                console.error("Erro detalhado:", error);
            });
    });
});