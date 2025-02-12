const itensEstoque = [
    "Farinha Panko", "Farinha de trigo", "Farinha", "Fubá", "Óleo", "Óleo de algodão", "Ketchup", "Batata palha", 
    "Macarrão", "Arroz", "Leite", "Creme de leite", "Leite condensado", "Caldo de galinha", "Caldo de carne", 
    "Amaciante", "Queijo ralado", "Azeite", "Molho", "Manteiga", "Vinagre", "Ovos", "Ovos de codorna", "Sal", 
    "Coloral", "Açafrão", "Feijão", "Macarrão de Lasanha", "Champignons", "Mostarda", "Molho shoyu", "Café", 
    "Caldo de frutos do mar", "Bacon", "Calabresa", "Água sanitária", "Detergente", "Desinfetante", "Veja", 
    "Papel higiênico", "Naftalina", "PeFex", "Saco de lixo preto", "Saco de lixo azul", "Sabão em pó", "Sabão em barra", 
    "Esponja para pratos", "Bombril", "Lustra móveis", "Sabão em barra", "Kpp viagem"
];

let estoque = {};

// Carregar estoque do localStorage ou inicializar vazio
function carregarEstoque() {
    const data = localStorage.getItem("estoque");
    estoque = data ? JSON.parse(data) : {};
    atualizarLista();
}

// Salvar estoque no localStorage
function salvarEstoque() {
    localStorage.setItem("estoque", JSON.stringify(estoque));
}

// Atualizar lista de estoque na interface
function atualizarLista() {
    const lista = document.getElementById("lista-estoque");
    lista.innerHTML = "";

    itensEstoque.forEach((item) => {
        const quantidade = estoque[item] || 0;
        const li = document.createElement("li");
        li.textContent = `${item}: ${quantidade}`;
        lista.appendChild(li);
    });

    const select = document.getElementById("item-selecionado");
    select.innerHTML = "";
    itensEstoque.forEach((item) => {
        const option = document.createElement("option");
        option.value = item;
        option.textContent = item;
        select.appendChild(option);
    });
}

// Adicionar ou retirar quantidade
function atualizarEstoque(item, quantidade) {
    if (!estoque[item]) estoque[item] = 0;
    estoque[item] += quantidade;

    if (estoque[item] < 0) estoque[item] = 0;
    salvarEstoque();
    atualizarLista();
}

// Eventos
document.getElementById("adicionar").addEventListener("click", () => {
    const item = document.getElementById("item-selecionado").value;
    const quantidade = parseInt(document.getElementById("quantidade").value);
    if (!isNaN(quantidade)) {
        atualizarEstoque(item, quantidade);
    }
});

document.getElementById("retirar").addEventListener("click", () => {
    const item = document.getElementById("item-selecionado").value;
    const quantidade = parseInt(document.getElementById("quantidade").value);
    if (!isNaN(quantidade)) {
        atualizarEstoque(item, -quantidade);
    }
});

// Inicializar
carregarEstoque();

const fastFoodItems = [
    "Estrogonofe de frango", "Estrogonofe de carne", "Lasanha de frango", 
    "Lasanha de carne", "Escondidinho de camarão", "Escondidinho de charque"
];

// Carregar estoques específicos de FastFood do localStorage
function carregarEstoqueFastFood() {
    const data = localStorage.getItem("estoqueFastFood");
    return data ? JSON.parse(data) : {};
}

// Atualizar estoque do FastFood no localStorage
function salvarEstoqueFastFood(estoqueFastFood) {
    localStorage.setItem("estoqueFastFood", JSON.stringify(estoqueFastFood));
}

// Função para atualizar a lista no pop-up
function atualizarListaFastFood() {
    const estoqueFastFood = carregarEstoqueFastFood();
    const estoqueDiv = document.getElementById("estoque-fastfood");
    estoqueDiv.innerHTML = "";
    fastFoodItems.forEach(item => {
        const quantidade = estoqueFastFood[item] || 0;
        const li = document.createElement("li");
        li.textContent = `${item}: ${quantidade}`;
        estoqueDiv.appendChild(li);
    });

    // Atualizar select de itens para o pop-up
    const select = document.getElementById("item-selecionado-fastfood");
    select.innerHTML = "";
    fastFoodItems.forEach(item => {
        const option = document.createElement("option");
        option.value = item;
        option.textContent = item;
        select.appendChild(option);
    });
}

// Atualizar o estoque FastFood
function atualizarEstoqueFastFoodItem(item, quantidade) {
    let estoqueFastFood = carregarEstoqueFastFood();
    if (!estoqueFastFood[item]) estoqueFastFood[item] = 0;
    estoqueFastFood[item] += quantidade;

    if (estoqueFastFood[item] < 0) estoqueFastFood[item] = 0;
    salvarEstoqueFastFood(estoqueFastFood);
    atualizarListaFastFood();
}

// Eventos de adicionar e retirar itens no pop-up
document.getElementById("adicionar-fastfood").addEventListener("click", () => {
    const item = document.getElementById("item-selecionado-fastfood").value;
    const quantidade = parseInt(document.getElementById("quantidade-fastfood").value);
    if (!isNaN(quantidade)) {
        atualizarEstoqueFastFoodItem(item, quantidade);
    }
});

document.getElementById("retirar-fastfood").addEventListener("click", () => {
    const item = document.getElementById("item-selecionado-fastfood").value;
    const quantidade = parseInt(document.getElementById("quantidade-fastfood").value);
    if (!isNaN(quantidade)) {
        atualizarEstoqueFastFoodItem(item, -quantidade);
    }
});

// Abrir e fechar pop-up
document.getElementById("abrir-popup").addEventListener("click", () => {
    document.getElementById("popup").style.display = "block";
    atualizarListaFastFood();
});

document.getElementById("fechar-popup").addEventListener("click", () => {
    document.getElementById("popup").style.display = "none";
});

// Inicializar
atualizarListaFastFood();