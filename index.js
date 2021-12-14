const state = {
    store: []
}

function getStore() {
    return fetch(`http://localhost:3000/store`).then(function (resp) {
        return resp.json()
    })

}

// getStore().then(function (store) {
//     state.store = store
//     render()
// })

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

function renderMain() {
    const mainEl = document.createElement("main")
    for (const product of state.store) {

        const productSection = document.createElement("section")
        productSection.setAttribute("class", "product-card")
        const productLink = document.createElement("a")
        productLink.setAttribute("href", "#")

        const productImageEl = document.createElement("img")
        productImageEl.setAttribute("src", product.image)
        const h3El = document.createElement("h3")
        h3El.setAttribute("src", "product-name")
        h3El.textContent = product.name
        const spanEl = document.createElement("span")
        spanEl.setAttribute("class", "price")
        spanEl.textContent = `£${product.price}`
        const discountPrice = document.createElement("span")
        discountPrice.setAttribute("class", "disconted-price")

    }


    productSection.append(productLink, productImageEl, h3El, spanEl, discountPrice)
    mainEl.append(productSection)

    document.body.append(mainEl)
    console.log(productSection)
}

function renderFooter() {
    const h2El = document.createElement("h2")
    h2El.textContent = "Footer"

    document.body.append(h2El)
}

function render() {
    document.body.innerHTML = ""
    renderHeader()
    renderMain()
    renderFooter()
}
render()