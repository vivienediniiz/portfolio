import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import json
import os

def send_email(data):
    # Configurações do e-mail
    EMAIL_HOST = "smtp.gmail.com"
    EMAIL_PORT = 587
    EMAIL_USER = "viviennydiniz@gmail.com"  # Substitua pelo seu e-mail
    EMAIL_PASSWORD = "tudoposso"  # Substitua pela senha gerada

    # Criar mensagem de e-mail
    msg = MIMEMultipart()
    msg["From"] = EMAIL_USER
    msg["To"] = "viviennydiniz@gmail.com"  # Pode ser o mesmo ou outro e-mail para receber
    msg["Subject"] = "Novo Contato do Formulário"

    # Corpo do e-mail
    body = f"""
    Nome: {data['nome']}
    E-mail: {data['email']}
    Telefone: {data['telefone']}
    Mensagem: {data['mensagem']}
    """
    msg.attach(MIMEText(body, "plain"))

    try:
        # Conectar ao servidor SMTP do Gmail
        server = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT)
        server.starttls()
        server.login(EMAIL_USER, EMAIL_PASSWORD)
        server.sendmail(EMAIL_USER, msg["To"], msg.as_string())
        server.quit()
        return {"status": "success", "message": "E-mail enviado com sucesso!"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

# Teste local
if __name__ == "__main__":
    fake_data = {
        "nome": "Teste",
        "email": "teste@email.com",
        "telefone": "123456789",
        "mensagem": "Isso é um teste!"
    }
    print(send_email(fake_data))
