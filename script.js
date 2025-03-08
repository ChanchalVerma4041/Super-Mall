// Product Data with Local Images
const products = [
    { name: "Trendy Clothes", price: "Rs 1500", image: "images/Navy-T-Shirt.jpg" },
    { name: "Stylish Shoes", price: "Rs 2000", image: "images/shoes.webp" },
    { name: "Luxury Watch", price: "Rs 1100", image: "images/watch.webp" },
    { name: "Smartphone", price: "Rs 25000", image: "images/oppo.png" },
    { name: "Headphones", price: "Rs 1900", image: "images/headphone.webp"},
    { name: "Gaming Console", price: "Rs 2300", image: "images/gamingconsole.avif"},
    { name: "Backpack", price: "Rs 1600", image: "images/bag.webp" },
    { name: "Sunglasses", price: "Rs700", image: "images/sunglass.jpg" },
    { name: "Perfume", price: "Rs500", image: "images/parfum.webp" },
    { name: "Laptop", price: "Rs45000", image: "images/hp.jpeg" },
    { name: "Mouse", price: "Rs450", image: "images/mouse.webp" },
    { name: "Speaker", price: "Rs800", image: "images/speakar.jpg" },
];

// Retrieve cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Populate products dynamically on Shop Page
document.addEventListener("DOMContentLoaded", () => {
    const productList = document.querySelector(".product-list");
    if (productList) {
        productList.innerHTML = products.map((product, index) => `
            <div class="product">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
                <button class="btn add-to-cart" data-index="${index}">Add to Cart</button>
                <a href="product.html" class="btn details-btn" data-index="${index}">View Details</a>
            </div>
        `).join("");
    }

    // Attach event listeners for dynamically generated buttons
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("add-to-cart")) {
            addToCart(event.target.dataset.index);
        } else if (event.target.classList.contains("details-btn")) {
            event.preventDefault();
            let index = event.target.dataset.index;
            localStorage.setItem("selectedProduct", JSON.stringify(products[index]));
            window.location.href = "product.html";
        }
    });

    updateCart();
});

// Function to Add Items to Cart
function addToCart(index) {
    let selectedProduct = products[index];
    let existingItem = cart.find(item => item.name === selectedProduct.name);

    if (existingItem) {
        alert(`${selectedProduct.name} is already in the cart!`);
    } else {
        cart.push(selectedProduct);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${selectedProduct.name} added to cart!`);
        updateCart();
    }
}

// Function to Update Cart Page
function updateCart() {
    let cartList = document.getElementById("cart-list");
    if (cartList) {
        cartList.innerHTML = cart.length
            ? cart.map(item => `<li>${item.name} - ${item.price}</li>`).join("")
            : "<p>Your cart is empty</p>";
    }
}

// Function for Checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert("Proceeding to checkout...");
        localStorage.removeItem("cart");
        cart = [];
        updateCart();
    }
}

// Load Product Details on Product Page
if (window.location.pathname.includes("product.html")) {
    document.addEventListener("DOMContentLoaded", () => {
        let product = JSON.parse(localStorage.getItem("selectedProduct"));
        if (product) {
            document.getElementById("product-name").innerText = product.name;
            document.getElementById("product-price").innerText = product.price;
            document.getElementById("product-img").src = product.image;
        }
    });
}


