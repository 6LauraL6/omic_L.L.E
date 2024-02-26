import requests
import os

def download_pdbaa():
    pdbaa_url="https://dunbrack.fccc.edu/pisces/download/pdbaa.gz"
    
    outpud_file = "pdbaa.ent.gz"

    print("Descargando la base de datos pdbaa...")

    try:
        response = requests.get(pdbaa_url)
        with open(outpud_file,'wb') as f:
            f.write(response.content)
        print("Descarga completa.")
    except Exception as e:
        print(f"Error al descargar la base de datos pdbaa: {str(e)}")
    