document.getElementById('blastpForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const numero_acceso = document.getElementById('numero_acceso').value;
    console.log(numero_acceso);
    fetch('/api/blastp', {
        method: 'POST',
        headers: {
             'Content-Type': 'application/json',
         },
        body: JSON.stringify({ numero_acceso: numero_acceso }),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error en la solicitud');
        }
    })
    .then(data => {
        if (data.error) {
            document.getElementById('resultArea').innerText = 'Error: ' + data.error;
        } else {
            document.getElementById('resultArea').innerText = data.resultado;
        }
    })

    .then(data => {
        const resultArea = document.getElementById('resultArea');
        if (data.error) {
            resultArea.innerText = 'Error: ' + data.error;
        } else {
            resultArea.innerHTML = '';  // Limpiar contenido anterior
    
            // Crear tabla
            const table = document.createElement('table');
            table.border = '1';
    
            // Crear encabezados
            const headers = Object.keys(data.resultado[0]);
            const headerRow = document.createElement('tr');
            headers.forEach(header => {
                const th = document.createElement('th');
                th.textContent = header;
                headerRow.appendChild(th);
            });
            table.appendChild(headerRow);
    
            // Llenar la tabla con datos
            data.resultado.forEach(item => {
                const row = document.createElement('tr');
                headers.forEach(header => {
                    const td = document.createElement('td');
                    td.textContent = item[header];
                    row.appendChild(td);
                });
                table.appendChild(row);
            });
    
            resultArea.appendChild(table);
        }
    })
    .catch(error => console.error('Error:', error));
});