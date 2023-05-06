let cartItems = JSON.parse(localStorage.getItem("shopingCart")) || [];

function addToCart(title, image, price, id) {
    let isProduct = cartItems.some((item) => item.id == id)
    if (isProduct) {
        cartItems.forEach((item, index) => {
            if (item.id == id) {
                cartItems[index].qty++
            }
        })

    } else {
        cartItems.push({
            id, image, price, qty: 1, title
        })
    }
    console.log(isProduct);
    localStorage.setItem("shopingCart", JSON.stringify(cartItems))
    window.location.href = "../cart/cart.html"
}
displayCart();
function displayCart() {
    let cart_display = document.getElementById("cart");

    if (cart_display != null) {
        if (cartItems.length == 0) {
            cart_display.innerHTML = emptyCart()
        } else {
            let cartsDetails = "";
            cartItems.forEach(item => {
                cartsDetails += `
            <div class="cart-item">
                <div class="cart-image">
                    <img src="${item.image}" alt="${item.description}" />
                </div>
                <div class="cart-product-price">
                    <span>${item.qty} X ${item.price}</span>
                </div>
                <div class="cart-product-price">
                    <span>${parseFloat(item.qty) * parseFloat(item.price)}</span>
                </div>
                <div class="cart-remove">
                    <button class="remove-btn" onclick="removeCart(${item.id})">Remove</button>
                </div>
            </div>        
        `
            });
            cartsDetails += `
        <div class="cart-footer">
      
            <a class="btn_a countinue_btn" href="../shop/shop.html"> Continue Shoping</a>           
        </div>
        
    `
            cart_display.innerHTML = cartsDetails
        }
    }
}

function emptyCart() {
    return `
        <div class="empty_cart">
            <h1>Empty Cart</h1>
            <a href="../shop/shop.html" class="btn_a countinue_btn">Countiue shoping</a>
        </div>     
    `
}
function removeCart(id) {
    cartItems = cartItems.filter((item) => item.id != id)
    localStorage.setItem("shopingCart", JSON.stringify(cartItems))
    displayCart()
}


function priceList() {

    const priceTable = document.getElementById("total-items");
    let checkoutDetails = "";
    let total;
    let total_amount = 0;
    if (priceTable != null) {
        if (cartItems.length > 0) {
            cartItems.forEach((item, index) => {
                checkoutDetails += `
                <div class="listNo">
                  <div class="product-title">
                     <span>${item.title.length > 20 ? item.title.substring(1, 20) + "..." : item.title}</span>
                  </div>
                  <div class="product-price">
                  <span>${item.qty} X  $${item.price}</span>
                  </div>
                  <div class="total_rice">                  
                  <span>$${total = parseFloat(item.qty) * parseFloat(item.price)}</span>
                  </div>
                </div>
              `
                total_amount += total
            })
            checkoutDetails += `
             <div class="total" >Total : ${parseFloat(total_amount).toFixed(2)}</div>
            `
            console.log(parseFloat(total_amount).toFixed(2))
            priceTable.innerHTML = checkoutDetails
        }

    }
}
priceList()

const checkoutBtn = document.getElementById("check-btn");

checkoutBtn.addEventListener("click", () => {
    window.location.href = "../razorpay/index.html"

})