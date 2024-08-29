const apiUrl = 'http://localhost:3000/items';

// Função para criar um novo item
function createItem() {
    const itemName = document.getElementById('itemName').value;

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: itemName }),
    })
    .then(response => response.json())
    .then(data => {
        alert('Item criado com sucesso!');
        document.getElementById('itemName').value = '';
        loadItems();
    })
    .catch(error => console.error('Erro:', error));
}

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

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Excluir';
                deleteButton.onclick = () => deleteItem(item.id);

                li.appendChild(deleteButton);
                itemsList.appendChild(li);
            });
        })
        .catch(error => console.error('Erro:', error));
}

// Função para excluir um item
function deleteItem(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    })
    .then(() => {
        alert('Item excluído com sucesso!');
        loadItems();
    })
    .catch(error => console.error('Erro:', error));
}

// Carregar os itens quando a página for carregada
window.onload = loadItems;

