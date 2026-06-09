from flask import Flask, request, jsonify, render_template
from pymongo import MongoClient
from dotenv import load_dotenv
from pathlib import Path
import os

# ==========================
# CARGAR .ENV
# ==========================
env_path = Path(__file__).parent / ".env"

print(f"Buscando .env en: {env_path}")
print(f"¿Existe?: {env_path.exists()}")

load_dotenv(dotenv_path=env_path, override=True)

MONGO_URI = os.getenv("MONGO_URI")

print("MONGO_URI:", repr(MONGO_URI))

if not MONGO_URI:
    raise Exception(
        f"❌ MONGO_URI no se cargó.\n"
        f"Ruta buscada: {env_path}\n"
        f"Existe archivo: {env_path.exists()}"
    )

# ==========================
# CONEXIÓN MONGO
# ==========================
try:
    client = MongoClient(MONGO_URI)
    client.admin.command("ping")
    print("✅ Conexión exitosa a MongoDB")
except Exception as e:
    print("❌ Error conectando a MongoDB:")
    print(e)
    raise

db = client["vertex"]
emprendimientos = db["emprendimientos"]

# ==========================
# FLASK APP
# ==========================
app = Flask(
    __name__,
    template_folder="../templates",
    static_folder="../static"
)

# ==========================
# RUTAS
# ==========================
@app.route("/")
def index():
    return render_template("index.html")


@app.route("/perfil")
def perfil():
    return render_template("perfil.html")


@app.route("/api/emprendimientos", methods=["POST"])
def crear_emprendimiento():
    data = request.get_json()

    resultado = emprendimientos.insert_one({
        "nombre": data.get("nombre"),
        "descripcion": data.get("descripcion"),
        "telefono": data.get("telefono"),
        "website": data.get("website"),
        "instagram": data.get("instagram"),
        "facebook": data.get("facebook"),
        "whatsapp": data.get("whatsapp")
    })

    return jsonify({
        "success": True,
        "id": str(resultado.inserted_id)
    }), 201


@app.route("/api/emprendimientos", methods=["GET"])
def obtener_emprendimientos():
    datos = []

    for emp in emprendimientos.find():
        datos.append({
            "nombre": emp.get("nombre"),
            "descripcion": emp.get("descripcion"),
            "telefono": emp.get("telefono"),
            "website": emp.get("website"),
            "instagram": emp.get("instagram"),
            "facebook": emp.get("facebook"),
            "whatsapp": emp.get("whatsapp")
        })

    return jsonify(datos)


if __name__ == "__main__":
    app.run(debug=True)