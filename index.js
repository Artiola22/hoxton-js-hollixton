const state = {
    store: []
}

//SERVER FUNCTIONS

//getStoreItems:: () => promise(store)
function getStoreItems() {
    return fetch('http://localhost:3000/store').then(resp => resp.json())
}

//HELPER FUNCTIONS
// isItemNew :: product => boolean
//Returns true if the item is added less than or 10 days ago
//Returns false if the item is added more than 10 days ago
function isItemNew(product) {
    const daysToConsider = 11

    //Check how many ms are in 10  days
    const second = 1000
    const minute = second * 60
    const hour = minute * 60
    const day = hour * 24
    const msForTenDaysAgo = Date.now() - (day * daysToConsider)

    //Get ms for current product
    const msForProductDate = Date.parse(product.dateEntered)
    //Check if the product ms is more recent than 10 days ago
    return msForProductDate > msForTenDaysAgo
}


function renderHeader() {

    const headerEl = document.createElement("header")
    const h1El = document.createElement("h1")
    h1El.textContent = "HOLLIXTON"

    const headerNav = document.createElement("nav")
    headerNav.setAttribute("class", "header-nav")

    const ulEl = document.createElement("ul")
    ulEl.setAttribute("class", "header-ul")

    const girlsHeaderList = document.createElement("li")
    girlsHeaderList.setAttribute("class", "girls-item")
    const anchorGirlsList = document.createElement("a")
    anchorGirlsList.setAttribute("href", "null")
    anchorGirlsList.textContent = "Girls"
    girlsHeaderList.append(anchorGirlsList)


    const guysHeaderList = document.createElement("li")
    guysHeaderList.setAttribute("class", "guys-item")
    const anchorGuysList = document.createElement("a")
    anchorGuysList.setAttribute("href", "null")
    anchorGuysList.textContent = "Guys"
    guysHeaderList.append(anchorGuysList)

    const saleHeaderList = document.createElement("li")
    saleHeaderList.setAttribute("class", "sale-item")
    const anchorItemList = document.createElement("a")
    anchorItemList.setAttribute("href", "null")
    anchorItemList.textContent = "Sale"
    saleHeaderList.append(anchorItemList)

    headerEl.append(headerNav)
    headerNav.append(h1El, ulEl)
    ulEl.append(girlsHeaderList, guysHeaderList, saleHeaderList)
    console.log(headerEl)

    const rightSectionBar = document.createElement("section")
    rightSectionBar.setAttribute("class", "section-bar")

    const rightUlEl = document.createElement("ul")
    rightUlEl.setAttribute("class", "right-ul-el")

    const searchLoop = document.createElement("li")
    searchLoop.setAttribute("class", "right-search-loop")


    const searchLoopButton = document.createElement("button")
    searchLoopButton.setAttribute("class", "search-button")
    const imageSearchButton = document.createElement("img")
    imageSearchButton.setAttribute("src", "./assets/magnifiying-glass.png")

    searchLoopButton.append(imageSearchButton)
    searchLoop.append(searchLoopButton)




    const loginLi = document.createElement("li")
    loginLi.setAttribute("class", "right-user-li")

    const loginButton = document.createElement("button")
    loginButton.setAttribute("class", "login-button")
    const imageLoginButton = document.createElement("img")
    imageLoginButton.setAttribute("src", "./assets/account.png")
    loginButton.append(imageLoginButton)
    loginLi.append(loginButton)


    const cartLi = document.createElement("li")
    cartLi.setAttribute("class", "right-cart-li")

    const cartButton = document.createElement("button")
    cartButton.setAttribute("class", "cart-button")
    const imageCartButton = document.createElement("img")
    imageCartButton.setAttribute("src", "./assets/shopping-bag.png")

    cartButton.append(imageCartButton)
    cartLi.append(cartButton)

    rightUlEl.append(searchLoop, loginLi, cartLi)
    rightSectionBar.append(rightUlEl)
    headerEl.append(headerNav, rightSectionBar)
    document.body.append(headerEl)



}

function renderProductItem(product, productList) {

    const productEl = document.createElement("li")
    productEl.setAttribute("class", "product-item")

    const imageEl = document.createElement("img")
    imageEl.setAttribute("class", "product-item__image")
    imageEl.setAttribute("src", product.image)
    imageEl.setAttribute("alt", product.name)

    const titleEl = document.createElement("h3")
    titleEl.setAttribute("class", "product-item__title")
    titleEl.textContent = product.name

    const priceEl = document.createElement("p")
    priceEl.setAttribute("class", "product-item__price")

    const fullPriceSpan = document.createElement("span")
    fullPriceSpan.setAttribute("class", "product-item__full-price")
    fullPriceSpan.textContent = `£${product.price}`
    priceEl.append(fullPriceSpan)

    //If there is a discount available
    if (product.discountedPrice) {
        //Add a class to the full price for alternative styling
        fullPriceSpan.classList.add("discounted")
        //Create and add the dicount span
        const discountSpan = document.createElement("span")
        discountSpan.setAttribute("class", "product-item__discount")
        discountSpan.textContent = `£${product.discountedPrice}`
        priceEl.append(discountSpan)
    }

    productEl.append(imageEl, titleEl, priceEl)

    if (isItemNew(product)) {

        const newEl = document.createElement("span")
        newEl.setAttribute("class", "product-item__new")
        newEl.textContent = "New!"
        productEl.append(newEl)
    }
    productList.append(productEl)
}

function renderMain() {
    const mainEl = document.createElement("main")
    const h2El = document.createElement("h2")
    h2El.setAttribute("class", "main-title")
    h2El.textContent = "Home"
    const productList = document.createElement("ul")
    productList.setAttribute("class", "product-list")
    for (const product of state.store) {
        renderProductItem(product, productList)

    }
    mainEl.append(h2El, productList)
    document.body.append(mainEl)

}

function renderFooter() {
    const footerEl = document.createElement("footer")
    footerEl.setAttribute("class", "footer-section")
    const titleFooterEl = document.createElement("h2")
    titleFooterEl.setAttribute("class", "footer-title")
    titleFooterEl.textContent = "Footer"

    const stateFooterEl = document.createElement("h3")
    stateFooterEl.setAttribute("class", "state-footer")
    stateFooterEl.textContent =
        "United Kingdom"
    footerEl.append(titleFooterEl, stateFooterEl)
    document.body.append(footerEl)
}

function render() {
    document.body.innerHTML = ""
    renderHeader()
    renderMain()
    renderFooter()
}

function init() {

    render()
    getStoreItems().then(function (store) {
        state.store = store
        render()
    })
}
init()