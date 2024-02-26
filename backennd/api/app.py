from flask import Flask, request, jsonify
from utils import blastp_search

app = Flask(__name__, static_url_path='/static')

# Ruta raíz
@app.route('/')
def home():
    return '¡Bienvenido a la aplicación Flask!'

@app.route('/api/hello')
def hello():
    return 'Hola a la aplicación Flask!'

# Búsqueda blastp
@app.route('/api/blastp', methods=['POST'])
def run_blastp():
    try:
        data = request.get_json()
        numero_acceso = data.get('numero_acceso')
        result = blastp_search(numero_acceso)
        return jsonify({"resultado": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
