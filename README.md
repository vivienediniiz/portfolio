<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $telefone = $_POST['telefone'];
    $mensagem = $_POST['mensagem'];

    // Configurações do e-mail
    $to = "seuemail@dominio.com"; // E-mail do destinatário
    $subject = "Novo contato do site"; // Assunto do e-mail
    $body = "Nome: $nome\nE-mail: $email\nTelefone: $telefone\nMensagem: $mensagem";

    // Envia o e-mail
    if (mail($to, $subject, $body)) {
        echo "Mensagem enviada com sucesso!";
    } else {
        echo "Erro ao enviar a mensagem.";
    }
}
?>

<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = trim($_POST['nome']);
    $email = trim($_POST['email']);
    $telefone = trim($_POST['telefone']);
    $mensagem = trim($_POST['mensagem']);

    // Validações
    if (empty($nome) || empty($email) || empty($mensagem)) {
        die("Por favor, preencha todos os campos obrigatórios.");
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("E-mail inválido.");
    }

    // Restante do código para inserir no banco de dados...
}
?>
