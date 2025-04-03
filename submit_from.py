from http.server import BaseHTTPRequestHandler
import json
import sqlite3
from urllib.parse import parse_qs

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = parse_qs(post_data.decode('utf-8'))
        
        # Extrair dados do formulário
        nome = data.get('nome', [''])[0]
        email = data.get('email', [''])[0]
        telefone = data.get('telefone', [''])[0]
        mensagem = data.get('mensagem', [''])[0]
        
        try:
            # Conectar ao banco de dados (SQLite neste exemplo)
            conn = sqlite3.connect('contatos.db')
            cursor = conn.cursor()
            
            # Criar tabela se não existir
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS contatos (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nome TEXT NOT NULL,
                    email TEXT NOT NULL,
                    telefone TEXT,
                    mensagem TEXT,
                    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            
            # Inserir dados
            cursor.execute('''
                INSERT INTO contatos (nome, email, telefone, mensagem)
                VALUES (?, ?, ?, ?)
            ''', (nome, email, telefone, mensagem))
            
            conn.commit()
            conn.close()
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            response = {'status': 'success', 'message': 'Dados salvos com sucesso!'}
            self.wfile.write(json.dumps(response).encode())
            
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            response = {'status': 'error', 'message': str(e)}
            self.wfile.write(json.dumps(response).encode())