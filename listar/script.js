const apiUrl = 'http://localhost:3000/items';

// Função para carregar todos os itens
function loadItems() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(items => {
            const itemsList = document.getElementById('itemsList');
            itemsList.innerHTML = '';
            items.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item.name;
                itemsList.appendChild(li);
            });
        })
        .catch(error => console.error('Erro:', error));
}

// Carregar os itens quando a página for carregada
window.onload = loadItems;
