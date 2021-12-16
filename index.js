const state = {
    store: [],
    typeFilters: ['Girls', 'Guys', 'Sale'],
    selectedFilter: 'Home',
    selectedItem: null,
    search: '',
    modals: '',
    Forms: ''
}

function searchModal() {
    //MODAL 
    const divEl = document.createElement("div")
    divEl.setAttribute("class", "model-wrapper")

    const modalDivEl = document.createElement("div")
    modalDivEl.setAttribute("class", "modal")

    const buttonEl = document.createElement("button")
    buttonEl.setAttribute("class", "modal__close-btn")
    buttonEl.textContent = "x"
    buttonEl.addEventListener("click", function () {
        state.modals = ""
        render()
    })

    const profileEl = document.createElement("h2")
    profileEl.textContent = "What are you searching for?"

    const inputEl = document.createElement("input")
    inputEl.setAttribute("type", "text")
    inputEl.setAttribute("class", "input-modal")
    inputEl.setAttribute("name", "search-input")
    inputEl.setAttribute("placeholder", "search")

    modalDivEl.append(buttonEl, profileEl, inputEl)
    divEl.append(modalDivEl)
    document.body.append(divEl)

}

function renderModals() {
    if (state.modals === 'search') {
        searchModal()
    }
}

function getItemsToDisplay() {

    let itemsToDisplay = state.store
    if (state.selectedFilter === 'Girls') {
        itemsToDisplay = itemsToDisplay.filter(item => item.type === 'Girls')
    }
    if (state.selectedFilter === 'Guys') {
        itemsToDisplay = itemsToDisplay.filter(item => item.type === 'Guys')
    }
    if (state.selectedFilter === 'Sale') {
        itemsToDisplay = itemsToDisplay.filter(item => item.discountedPrice !== undefined)
    }
    return itemsToDisplay
}
// if (state.search !== ''){
//     itemsToDisplay = itemsToDisplay.filter(item => item.name === )
// }




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
    h1El.addEventListener("click", function () {
        state.selectedFilter = "Home"
        state.selectedItem = null
        render()

    })

    //Left 
    const headerNavLeft = document.createElement("nav")
    headerNavLeft.setAttribute("class", "header-nav")

    const leftUlEl = document.createElement("ul")
    leftUlEl.setAttribute("class", "header-ul")

    for (const filter of state.typeFilters) {
        const liEl = document.createElement("li")
        liEl.setAttribute("class", "header__left__item")
        const aEl = document.createElement("a")
        aEl.setAttribute("href", "#")
        aEl.textContent = filter
        aEl.addEventListener("click", function () {
            state.selectedFilter = filter
            state.selectedItem = null
            render()
        })
        liEl.append(aEl)
        headerNavLeft.append(liEl)

    }



    const rightSectionBar = document.createElement("section")
    rightSectionBar.setAttribute("class", "section-bar")

    const rightUlEl = document.createElement("ul")
    rightUlEl.setAttribute("class", "right-ul-el")

    const searchLoop = document.createElement("li")
    searchLoop.setAttribute("class", "right-search-loop")


    const searchLoopButton = document.createElement("button")
    searchLoopButton.setAttribute("class", "search-button")
    searchLoopButton.addEventListener("click", function () {
        state.modals = "search"
        render()
    })

    const imageSearchButton = document.createElement("img")
    imageSearchButton.setAttribute("src", "./assets/magnifiying-glass.png")

    searchLoopButton.append(imageSearchButton)
    searchLoop.append(searchLoopButton)



    const imageLoginButton = document.createElement("img")
    imageLoginButton.setAttribute("src", "./assets/account.png")
    imageLoginButton.addEventListener("click", function () {
        render()
        renderForms()
    })



    const cartLi = document.createElement("li")
    cartLi.setAttribute("class", "right-cart-li")

    const cartButton = document.createElement("button")
    cartButton.setAttribute("class", "cart-button")
    const imageCartButton = document.createElement("img")
    imageCartButton.setAttribute("src", "./assets/shopping-bag.png")

    cartButton.append(imageCartButton)
    cartLi.append(cartButton)

    const loginLi = document.createElement("li")
    loginLi.setAttribute("class", "right-user-li")

    const loginButton = document.createElement("button")
    loginButton.setAttribute("class", "login-button")

    loginButton.append(imageLoginButton)
    loginLi.append(loginButton)
    rightUlEl.append(loginLi)
    rightUlEl.append(searchLoop, cartLi)
    rightSectionBar.append(rightUlEl)
    headerEl.append(h1El, headerNavLeft, rightSectionBar)
    document.body.append(headerEl)



}

//Creating login form
function renderForms() {
    const divWrapper = document.createElement("div")
    divWrapper.setAttribute("class", "modal-wrapper")
    const divForm = document.createElement("div")
    divForm.setAttribute("class", "signup-box")

    const signinEl = document.createElement("h1")
    signinEl.setAttribute("class", "signin-el")
    signinEl.textContent = "Sign In"


    const formEl = document.createElement("form")
    formEl.setAttribute("class", "form-el")

    const labelEmailEl = document.createElement("label")
    labelEmailEl.textContent = "Email"
    labelEmailEl.setAttribute("for", "user-email")

    const emailInputEl = document.createElement("input")
    emailInputEl.setAttribute("type", "email")
    emailInputEl.setAttribute("id", "user-email")


    const labelPasswordEl = document.createElement("label")
    labelPasswordEl.textContent = "Password"
    labelPasswordEl.setAttribute("for", "user-password")

    const inputPasswordEl = document.createElement("input")
    inputPasswordEl.setAttribute("type", "password")
    inputPasswordEl.setAttribute("id", "user-password")

    const formButtonEl = document.createElement("button")
    formButtonEl.setAttribute("class", "signin-button")
    formButtonEl.setAttribute("type", "submit")
    formButtonEl.textContent = "Sign In"

    const closeButtonFormEl = document.createElement("button")
    closeButtonFormEl.setAttribute("class", "form__close-btn")
    closeButtonFormEl.textContent = "x"
    closeButtonFormEl.addEventListener("click", function () {
        state.modals = ""
        render()
    })


    formEl.append(labelEmailEl, emailInputEl, labelPasswordEl, inputPasswordEl, formButtonEl, closeButtonFormEl)
    divForm.append(signinEl, formEl)
    divWrapper.append(divForm)
    document.body.append(divWrapper)





}

function renderProductItem(product, productList) {

    const productEl = document.createElement("li")
    productEl.setAttribute("class", "product-item")
    productEl.addEventListener("click", function () {
        state.selectedItem = product
        render()
    })

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

function renderItemDetails(mainEl) {
    const divEl = document.createElement("div")
    divEl.setAttribute("class", "product-details")

    const imgEl = document.createElement("img")
    imgEl.setAttribute("class", "product-details__image")
    imgEl.setAttribute("src", state.selectedItem.image)

    const titleEl = document.createElement("h2")
    titleEl.setAttribute("class", "product-details__title")
    titleEl.textContent = state.selectedItem.name

    const addToBagButton = document.createElement("button")
    addToBagButton.setAttribute("class", "product-details__add-to-bag")
    addToBagButton.textContent = "ADD TO BAG"
    addToBagButton.addEventListener("click", function () {
        state.selectedItem = null
        render()
    })

    divEl.append(imgEl, titleEl, addToBagButton)
    mainEl.append(divEl)
}

function renderProductList(mainEl) {
    const h2El = document.createElement("h2")
    h2El.setAttribute("class", "main-title")
    h2El.textContent = state.selectedFilter
    const productList = document.createElement("ul")
    productList.setAttribute("class", "product-list")
    for (const product of getItemsToDisplay()) {
        renderProductItem(product, productList)

    }
    mainEl.append(h2El, productList)
}

function renderMain() {
    const mainEl = document.createElement("main")

    if (state.selectedItem !== null) {
        renderItemDetails(mainEl)
    } else {

        renderProductList(mainEl)
    }
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
    stateFooterEl.textContent = "United Kingdom"
    footerEl.append(titleFooterEl, stateFooterEl)
    document.body.append(footerEl)
}

function render() {
    document.body.innerHTML = ""
    renderHeader()
    renderMain()
    renderFooter()
    renderModals()


}

function init() {

    render()
    getStoreItems().then(function (store) {
        state.store = store
        render()
    })
}
init()