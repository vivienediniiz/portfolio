from flask import Flask, request, jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

app = Flask(__name__)

# Função para enviar e-mail
def send_email(data):
    EMAIL_HOST = "smtp.gmail.com"
    EMAIL_PORT = 587
    EMAIL_USER = "viviennydiniz@gmail.com"  # Substitua pelo seu e-mail
    EMAIL_PASSWORD = "hzzr lxfj dxwh mvf"  # Substitua pela senha gerada

    msg = MIMEMultipart()
    msg["From"] = EMAIL_USER
    msg["To"] = "viviennydiniz@gmail.com"  # Pode ser o mesmo ou outro e-mail para receber
    msg["Subject"] = "Novo Contato do Formulário"

    body = f"""
    Nome: {data['nome']}
    E-mail: {data['email']}
    Telefone: {data['telefone']}
    Mensagem: {data['mensagem']}
    """
    msg.attach(MIMEText(body, "plain"))

    try:
        server = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT)
        server.starttls()
        server.login(EMAIL_USER, EMAIL_PASSWORD)
        server.sendmail(EMAIL_USER, msg["To"], msg.as_string())
        server.quit()
        return {"status": "success", "message": "E-mail enviado com sucesso!"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

# Rota para receber o formulário
@app.route("/api/email.py", methods=["POST"])
def email():
    data = request.json
    response = send_email(data)
    return jsonify(response)

# Configuração para rodar na Vercel
def handler(event, context):
    return app(event, context)
