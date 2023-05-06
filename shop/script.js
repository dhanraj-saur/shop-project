const applyBtn = document.getElementById("apply-btn");
const lowPrice = document.getElementById("low");
const midPrice = document.getElementById("mid");
const highPrice = document.getElementById("high");
const vHighPrice = document.getElementById("vHigh");

const rangeBar = document.getElementById("range")

const BASE_URL = "https://fakestoreapi.com";

const fetchApi = async (url) => {
    let full_url = BASE_URL + url;

    const res = await fetch(full_url)
    const rslt = await res.json()
    return rslt;
}

let catData = "";
let products = [];

function getCategories() {
    let categories = [{
        display_name: "All", cat: "All", active: true
    },
    { display_name: "Mens", cat: "men's clothing", active: false },
    { display_name: "Womens", cat: "women's clothing", active: false },
    { display_name: "Electronics", cat: "electronics", active: false },
    {
        display_name: "Jewelery", cat: "jewelery", active: false
    }]

    for (const key in categories) {
        let { display_name, cat, active } = categories[key]

        catData += `
       <div class="filter ${active && 'active'}" onclick='getCategoryData("${btoa(cat)}","${display_name}")'>${display_name}</div>
      `
    }

    document.getElementById("category").innerHTML = catData

};

const getProductData = async () => {
    let url = "/products";
    products = await fetchApi(url)

    shopFunction(products);
}

async function getCategoryData(cat, cat_name) {

    let category = atob(cat)
    if (category == "All") {
        getProductData()
    } else {
        let url = "/products/category/" + category;
        const result = await fetchApi(url)

        shopFunction(result);

    }
    document.getElementById("title").innerHTML = cat_name;
}

window.addEventListener("load", () => {
    getCategories()
    getProductData()

});

function shopFunction(dataStore) {

    let html = ""
    const shopKart = document.getElementById("shop-cart");
    dataStore.forEach(item => {
        html += `
    <div class="item">
      <img src="${item.image}"width='100%' height='190px'/>
      <hr>
      <div class="info">
        <div class="row">
          <div class="price"><span>$</span>${item.price}</div>
          <div class="sized">S,M,L</div>
        </div>
        <div class="colors">
          Colors:
          <div class="row">
            <div class="circle" style="background-color: #000"></div>
            <div class="circle" style="background-color: #4938af"></div>
            <div class="circle" style="background-color: #203d3e"></div>
          </div>
        </div>
        <div class="row">Rating:${item.rating.rate}</div>
      </div>
      <button class="addBtn" onclick="addToCart('${item.title.replace("'", "")}','${item.image}',${item.price},${item.id})">Add to Cart</button>
    </div>
      `
    });
    shopKart.innerHTML = html;
}

let searchInput = document.getElementById("search");
searchInput.addEventListener("input", (e) => {
    let value = e.target.value;
    products = products.filter((item) =>

        item.title
            .toLowerCase()
            .includes(value.trim().toLowerCase())
    );
    shopFunction(products)
});


// filtering by price and rating...........*/
applyBtn.addEventListener("click", filterPrice)

function filterPrice() {
    let newArr = [];
    if (lowPrice.checked) {
        newArr = [...newArr, ...products.filter((item) => item.price <= 25.0)]
    }
    if (midPrice.checked) {
        newArr = [...newArr, ...products.filter((item) => item.price >= 25.0 && item.price <= 50.0)]
    }
    if (highPrice.checked) {
        newArr = [...newArr, ...products.filter((item) => item.price >= 50.0 && item.price <= 100.0)]
    }
    if (vHighPrice.checked) {
        newArr = [...newArr, ...products.filter((item) => item.price >= 100.0)]
    }
    if (rangeBar.value > 0) {
        let rangeData = newArr.length > 0 ? newArr : products
        console.log(rangeData);
        newArr = [...rangeData.filter((item) => Math.floor(item.rating.rate) == (rangeBar.value))]
    }

    shopFunction(newArr)

    if (!lowPrice.checked && !midPrice.checked && !highPrice.checked && !vHighPrice.checked && rangeBar.value == 0) {
        shopFunction(products)
    }

}
