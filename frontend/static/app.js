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
            document.getElementById('resultArea').innerText = data.result;
        }
    })
    .catch(error => console.error('Error:', error));
});