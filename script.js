document.getElementById('url-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const originalUrl = document.getElementById('original-url').value;
    const expiryDate = document.getElementById('expiry-date').value;

    // Converte a data para timestamp em milissegundos
    const expirationTime = Date.parse(expiryDate);

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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        // Logs para depuração
        console.log('Status da resposta:', response.status);

        if (!response.ok) {
            const errorDetails = await response.text();
            throw new Error(`Erro ao encurtar o link: ${errorDetails}`);
        }

        // Processa a resposta
        const responseData = await response.json();
        const code = responseData.code; // Pega o código retornado pela API
        const shortenedUrl = `https://wnuvaq8gjj.execute-api.sa-east-1.amazonaws.com/${code}`;

        // Exibe o link encurtado
        const linkElement = document.getElementById('shortened-url');
        linkElement.textContent = shortenedUrl;
        linkElement.href = shortenedUrl;
    } catch (error) {
        console.error('Erro:', error.message);
        alert('Falha na requisição: ' + error.message);
    }
});
