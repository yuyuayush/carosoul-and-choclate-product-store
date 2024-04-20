document.addEventListener('DOMContentLoaded', function() {
    const chocolates = [
        { id: 1, name: 'Dark Chocolate', price: 2.99, imageUrl: 'https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Premium dark chocolate bar' },
        { id: 2, name: 'Milk Chocolate', price: 1.99, imageUrl: 'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Smooth milk chocolate bar' },
        { id: 3, name: 'White Chocolate', price: 3.49, imageUrl: 'https://images.pexels.com/photos/2373520/pexels-photo-2373520.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Creamy white chocolate bar' },
        { id: 4, name: 'Hazelnut Chocolate', price: 3.99, imageUrl: 'https://images.pexels.com/photos/3206433/pexels-photo-3206433.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Chocolate with hazelnut filling' },
        {id: 5, name: 'Dark Chocolate', price: 2.99, imageUrl: 'https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Premium dark chocolate bar' },
        {id: 6, name: 'Milk Chocolate', price: 1.99, imageUrl: 'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Smooth milk chocolate bar' },
        { id: 7, name: 'Dark Chocolate', price: 2.99, imageUrl: 'https://images.pexels.com/photos/3206433/pexels-photo-3206433.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Premium dark chocolate bar' },
        {id: 8, name: 'Milk Chocolate', price: 1.99, imageUrl: 'https://images.pexels.com/photos/1009841/pexels-photo-1009841.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Smooth milk chocolate bar' },
        {id: 9, name: 'White Chocolate', price: 3.49, imageUrl: 'https://images.pexels.com/photos/2373520/pexels-photo-2373520.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Creamy white chocolate bar' },
        {id: 10, name: 'Hazelnut Chocolate', price: 3.99, imageUrl: 'https://images.pexels.com/photos/3206433/pexels-photo-3206433.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Chocolate with hazelnut filling' },
        {id: 11, name: 'Caramel Chocolate', price: 2.49, imageUrl: 'https://images.pexels.com/photos/1998633/pexels-photo-1998633.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', description: 'Chocolate with caramel center' },
        { id: 12, name: 'Fruit & Nut Chocolate', price: 3.79, imageUrl: 'https://images.pexels.com/photos/2067420/pexels-photo-2067420.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Chocolate with dried fruits and nuts' },
        {id: 13, name: 'Almond Chocolate', price: 2.99, imageUrl: 'https://images.pexels.com/photos/4110097/pexels-photo-4110097.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Chocolate with whole almonds' },
        {id: 14, name: 'Raspberry Chocolate', price: 3.29, imageUrl: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Chocolate with raspberry filling' },
        {id: 15, name: 'Coconut Chocolate', price: 2.79, imageUrl: 'https://images.pexels.com/photos/4110096/pexels-photo-4110096.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Chocolate with shredded coconut' },
        {id: 16, name: 'Toffee Crunch Chocolate', price: 3.49, imageUrl: 'https://images.pexels.com/photos/887853/pexels-photo-887853.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Chocolate with toffee bits' },
      
    
       
    ];
    const chocolateGrid = document.getElementById('chocolateGrid');
    const cartItems = document.getElementById('cartItems');
    const totalAmount = document.getElementById('totalAmount');

    let cart = []; // Array to store items in the cart

    // Function to render chocolates
    function renderChocolates() {
        chocolateGrid.innerHTML = '';

        chocolates.forEach(chocolate => {
            const card = createChocolateCard(chocolate);
            chocolateGrid.appendChild(card);
        });
    }

    // Helper function to create a chocolate card
    function createChocolateCard(chocolate) {
        const card = document.createElement('div');
        card.classList.add('chocolate-card');

        const image = document.createElement('img');
        image.src = chocolate.imageUrl;
        image.alt = chocolate.name;
        card.appendChild(image);

        const name = document.createElement('h3');
        name.textContent = chocolate.name;
        card.appendChild(name);

        const price = document.createElement('p');
        price.textContent = `$${chocolate.price.toFixed(2)}`;
        card.appendChild(price);

        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = 'Add to Cart';
        addToCartButton.addEventListener('click', () => {
            if (getTotalQuantity() < 8) { // Check if total quantity is less than 8
                addToCart(chocolate);
            } else {
                alert('You can select up to 8 chocolates in total.'); // Alert user if max limit reached
            }
        });
        card.appendChild(addToCartButton);

        return card;
    }

    // Function to add item to the cart
    function addToCart(chocolate) {
        const existingItem = cart.find(item => item.id === chocolate.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id: chocolate.id, name: chocolate.name, price: chocolate.price, quantity: 1 });
        }

        renderCart();
    }

    // Function to calculate total quantity of items in the cart
    function getTotalQuantity() {
        return cart.reduce((total, item) => total + item.quantity, 0);
    }

    // Function to render cart items
    function renderCart() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('li');
            cartItem.textContent = `${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
            cartItems.appendChild(cartItem);
            total += item.price * item.quantity;
        });

        totalAmount.textContent = `$${total.toFixed(2)}`;
    }

    renderChocolates();
});