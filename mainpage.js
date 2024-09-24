let cart = [];

// Function to search and filter products
function searchProduct() {
    const input = document.querySelector('.srch').value.toLowerCase();
    const items = document.querySelectorAll('.item');

    items.forEach(item => {
        const itemName = item.querySelector('h5').textContent.toLowerCase();
        if (itemName.includes(input)) {
            item.style.display = 'block';  // Show matched items
        } else {
            item.style.display = 'none';   // Hide unmatched items
        }
    });
}

// Function to add items to the cart
function addToCart(productName, productPrice) {
    // Check if item already exists in the cart
    const existingItemIndex = cart.findIndex(item => item.name === productName);

    if (existingItemIndex > -1) {
        // If the item is already in the cart, increase the quantity
        cart[existingItemIndex].quantity += 1;
    } else {
        // If not, add a new item to the cart
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    updateCart();
}

// Function to update the cart and display items
function updateCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const totalAmountSpan = document.getElementById('total-amount');
    const cartCountSpan = document.getElementById('cart-count');

    cartItemsDiv.innerHTML = '';

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>No items in the cart</p>';
        totalAmountSpan.textContent = '0';
        cartCountSpan.textContent = '0';
        return;
    }

    let totalAmount = 0;
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `${item.name} - ₹${item.price} (x${item.quantity})`;
        cartItemsDiv.appendChild(itemDiv);
        totalAmount += item.price * item.quantity;
    });

    totalAmountSpan.textContent = totalAmount;
    cartCountSpan.textContent = cart.length;
}

// Event listeners for all "Add to cart" buttons
document.querySelectorAll('.item button').forEach((button, index) => {
    button.addEventListener('click', () => {
        const itemElement = button.parentElement;
        const productName = itemElement.querySelector('h5').textContent.split('<br>')[0];
        const productPrice = parseInt(itemElement.querySelector('h5').textContent.split('₹')[1]);

        addToCart(productName, productPrice);
    });
});

// Function to scroll to the cart section when the cart icon is clicked
function scrollToCart() {
    const cartSection = document.querySelector('.cart');
    cartSection.scrollIntoView({ behavior: 'smooth' });
}
