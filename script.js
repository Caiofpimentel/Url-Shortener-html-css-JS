document.getElementById('url-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Captura os valores do formulário
    const originalUrl = document.getElementById('original-url').value;
    const expiryDate = document.getElementById('expiry-date').value;

    // Converte a data para timestamp em segundos
    const expirationTime = Math.floor(Date.parse(expiryDate) / 1000);

    // Monta o corpo da requisição
    const requestData = {
        expirationTime: expirationTime,
        originalUrl: originalUrl
    };

    try {
        // Faz a requisição HTTP POST
        const response = await fetch('https://wnuvaq8gjj.execute-api.sa-east-1.amazonaws.com/create', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao encurtar o link. Tente novamente.');
        }

        try {
            // Processa a resposta
            const responseData = await response.json();
            const code = responseData.code; // Extrai o valor do campo "code"
            const shortenedUrl = `https://wnuvaq8gjj.execute-api.sa-east-1.amazonaws.com/${code}`;
        
            // Exibe o link encurtado
            const linkElement = document.getElementById('shortened-url');
            linkElement.textContent = shortenedUrl;
            linkElement.href = shortenedUrl;
        } catch (error) {
            console.error('Erro:', error.message);
            alert('Falha montando URL: ' + error.message);
        }


    } catch (error) {
        console.error('Erro:', error.message);
        alert('Falha na requisição: ' + error.message);
    }
});
