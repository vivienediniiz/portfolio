
  // Configuração do Firebase (substitua pelos seus dados)
 const firebaseConfig = {
    apiKey: "AIzaSyBxK5FXsWs9wRlsDeSXvCuKcx71Cc7cYjM",
    authDomain: "formulariocontato-31247.firebaseapp.com",
    projectId: "formulariocontato-31247",
    storageBucket: "formulariocontato-31247.firebasestorage.app",
    messagingSenderId: "156533202836",
    appId: "1:156533202836:web:9d8742bc0ea0f2b2493981",
    measurementId: "G-EKCC9Y41YL"
  };

  // Inicializar Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  // Capturar o formulário
  document.getElementById("meuFormulario").addEventListener("submit", function(e) {
    e.preventDefault();

    // Capturar os valores dos campos
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let telefone = document.getElementById("telefone").value;
    let mensagem = document.getElementById("mensagem").value;

    // Enviar os dados para o Firestore
    db.collection("contatos").add({
      nome: nome,
      email: email,
      telefone: telefone,
      mensagem: mensagem,
      timestamp: firebase.firestore.FieldValue.serverTimestamp() // Adiciona a data de envio
    })
    .then(() => {
      document.getElementById("mensagem-status").innerText = "Mensagem enviada com sucesso!";
      document.getElementById("meuFormulario").reset();
    })
    .catch((error) => {
      document.getElementById("mensagem-status").innerText = "Erro ao enviar mensagem: " + error;
    });
  });

