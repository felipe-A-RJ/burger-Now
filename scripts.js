// Função para exibir mensagem de confirmação de pedido
function orderNow() {
    alert('Obrigado por escolher o Burger Now! Seu pedido será processado.');
}

// Array para armazenar os itens do carrinho
let cart = [];
const deliveryFee = 5.00; // Taxa de entrega fixa

// Função para adicionar itens ao carrinho
function addToCart(itemName, itemPrice) {
    // Verificar se o item já existe no carrinho
    const existingItem = cart.find(item => item.name === itemName);

    if (existingItem) {
        // Incrementa a quantidade se o item já existir
        existingItem.quantity++;
    } else {
        // Adiciona novo item ao carrinho
        cart.push({ name: itemName, price: itemPrice, quantity: 1 });
    }

    // Atualiza a exibição do carrinho
    updateCartDisplay();
}

// Função para atualizar a exibição do carrinho
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');
    
    // Limpar itens anteriores
    cartItemsContainer.innerHTML = '';
    
    // Calcular o total
    let total = 0;

    // Exibir os itens no carrinho
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const li = document.createElement('li');
        li.innerHTML = `${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity} = R$ ${itemTotal.toFixed(2)}
                        <button onclick="removeFromCart(${index})">Remover</button>
                        <button onclick="decreaseQuantity(${index})">-</button>
                        <button onclick="increaseQuantity(${index})">+</button>`;
        cartItemsContainer.appendChild(li);
    });

    // Adiciona a taxa de entrega ao total
    total += deliveryFee;

    // Atualizar o total do carrinho
    cartTotalContainer.textContent = `Total: R$ ${total.toFixed(2)} (incluindo R$ ${deliveryFee.toFixed(2)} de taxa de entrega)`;

    // Adicionar mensagem sobre taxa de entrega
    const deliveryMessage = document.createElement('p');
    deliveryMessage.textContent = '*Consulte a taxa de entrega';
    deliveryMessage.style.fontSize = '12px'; // Opcional: define o tamanho da fonte da mensagem
    deliveryMessage.style.color = 'red'; // Opcional: define a cor da mensagem
    cartTotalContainer.appendChild(deliveryMessage);
}

// Função para remover itens do carrinho
function removeFromCart(index) {
    cart.splice(index, 1); // Remove o item do array
    updateCartDisplay(); // Atualiza a exibição do carrinho
}

// Função para diminuir a quantidade de um item
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        removeFromCart(index); // Remove o item se a quantidade for 1 e o botão de diminuir for pressionado
    }
    updateCartDisplay();
}

// Função para aumentar a quantidade de um item
function increaseQuantity(index) {
    cart[index].quantity++;
    updateCartDisplay();
}

// Função para redirecionar para o WhatsApp com o pedido, escolha de pagamento, endereço e nome
function redirectToWhatsApp() {
    let orderMessage = "Olá, gostaria de fazer o pedido dos seguintes itens:\n";
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        orderMessage += `- ${item.name} (Quantidade: ${item.quantity}) - R$ ${item.price.toFixed(2)} cada\n`;
    });

    // Adiciona a taxa de entrega ao total
    total += deliveryFee;

    // Adiciona a taxa de entrega à mensagem
    orderMessage += `\nTaxa de entrega: R$ ${deliveryFee.toFixed(2)}`;

    // Solicita o método de pagamento ao usuário
    const paymentMethod = prompt("Escolha o meio de pagamento: Dinheiro, Cartão de Crédito, Débito ou PIX");

    if (!paymentMethod) {
        alert('Por favor, escolha um meio de pagamento.');
        return;
    }

    // Adiciona o método de pagamento à mensagem do pedido
    orderMessage += `\nMétodo de Pagamento: ${paymentMethod}`;

    // Solicita o endereço de entrega ao usuário
    const address = prompt("Informe o endereço de entrega:");

    if (!address) {
        alert('Por favor, informe um endereço de entrega.');
        return;
    }

    // Adiciona o endereço à mensagem do pedido
    orderMessage += `\nEndereço de Entrega: ${address}`;

    // Solicita o nome do cliente
    const customerName = prompt("Por favor, informe seu nome:");

    // Verificação atualizada para o nome do cliente
    if (!customerName || customerName.trim() === "") {
        alert('Por favor, informe seu nome.');
        return;
    }

    // Adiciona o nome do cliente à mensagem do pedido
    orderMessage += `\nNome do Cliente: ${customerName}`;

    // Adiciona o total ao final da mensagem
    orderMessage += `\n\nTotal do Pedido: R$ ${total.toFixed(2)}`;

    const phoneNumber = "5521981268012"; // Substitua pelo seu número
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(orderMessage)}`;
    
    window.open(whatsappUrl, '_blank');
}
