window.addEventListener("load", function () {
    let sessionArray = sessionStorage.getItem("Order")
    let sessionParse = JSON.parse(sessionArray)
    let productResume = document.querySelector(".products-resume")
    let formSpace = document.querySelector(".cart__button")
    let form = document.querySelector('.cart__form')
    let button = document.querySelector(".cart__form--button")
    let total = document.querySelector(".total__cart")

    formSpace.style.display = "none"

    let session = sessionStorage.getItem("Order")
    let sParse = JSON.parse(sessionArray)
    let subTotal = getPrice()

    function getPrice() {
        let acum = 0;
        if (sParse) {
            sParse.forEach(item => {
                acum = acum + (item.price * item.count)
            })
        }

        return acum
    }

    if (session != null) {
        productResume.innerHTML = ""
        formSpace.style.display = "block"
        sParse.forEach(item => {
            productResume.innerHTML += `
         <div class="product-only">
             <img src=${item.image} alt="">
             <div class="product-only-n">
                 <p class="only-name">Nombre: ${item.name}</p>
                 <p class="only-price">Precio: $ ${item.price}</p>
                 <p class="only-delete">Cantidad: ${item.count}</p>
             </div>
         </div>
         `
            total.innerHTML = `
         <section class="total">
             <div class="subtotal">
                 <p class="title">Subtotal</p>
                 <p class="same">${subTotal}</p>
             </div>
             <div class="delivery">
                 <p class="title">Domicilio</p>
                 <p class="same">4.000</p>
             </div>
             <div class="total-include">
                 <p class="title">TOTAL</p>
                 <p class="same">${subTotal + 4000}</p>
             </div>
         </section>
         `
        })
        button.addEventListener('click', function(e) {
            e.preventDefault();
            sessionStorage.removeItem('Order');
            form.submit();
        })
    }
})