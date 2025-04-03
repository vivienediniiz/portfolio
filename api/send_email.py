from flask import Flask, request, jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

app = Flask(__name__)

@app.route("/api/send_email", methods=["POST"])
def send_email():
    data = request.json
    nome = data.get("nome")
    email = data.get("email")
    telefone = data.get("telefone")
    mensagem = data.get("mensagem")

    # Configuração do e-mail
    EMAIL_USER = os.getenv("EMAIL_USER")
    EMAIL_PASS = os.getenv("EMAIL_PASS")
    DESTINATARIO = os.getenv("EMAIL_DEST")

    msg = MIMEMultipart()
    msg["From"] = EMAIL_USER
    msg["To"] = DESTINATARIO
    msg["Subject"] = "Novo Contato do Site"

    corpo_email = f"""
    <h2>Novo Contato Recebido</h2>
    <p><strong>Nome:</strong> {nome}</p>
    <p><strong>Email:</strong> {email}</p>
    <p><strong>Telefone:</strong> {telefone}</p>
    <p><strong>Mensagem:</strong> {mensagem}</p>
    """

    msg.attach(MIMEText(corpo_email, "html"))

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(EMAIL_USER, EMAIL_PASS)
            server.sendmail(EMAIL_USER, DESTINATARIO, msg.as_string())

        return jsonify({"mensagem": "E-mail enviado com sucesso!"}), 200
    except Exception as e:
        return jsonify({"erro": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
