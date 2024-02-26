from Bio.Blast import NCBIWWW,NCBIXML
from Bio import SeqIO

def blastp_search(query_sequence):
    # Realizar la búsqueda blastp utilizando Biopython
    result = "No se encontraron resultados"  # Mensaje predeterminado

    try:
        # Realizar la búsqueda blastp contra la base de datos pdbaa
        result_handle = NCBIWWW.qblast("blastp", "pdbaa", query_sequence)

        # Parsear el resultado en formato XML
        blast_records = list(NCBIXML.parse(result_handle))
        
        # Verificar si hay resultados y extraer información relevante si es necesario
        if blast_records:
            # Extraer información del primer resultado (puedes adaptar esto según tus necesidades)
            first_record = blast_records[0]
            alignment = first_record.alignments[0]
            result = f"ID del sujeto: {alignment.hit_id}, Descripción: {alignment.hit_def}, E-valor: {alignment.hsps[0].expect}"
    except Exception as e:
        result = f"Error en la búsqueda blastp: {str(e)}"

    return result
