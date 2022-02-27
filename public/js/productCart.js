window.addEventListener("load", function(){
    let sessionArray = sessionStorage.getItem("Order")
    let sessionParse = JSON.parse(sessionArray)
    let productResume = document.querySelector(".products-resume")
    let total = document.querySelector(".total")
    let subTotal = getPrice()

    function getPrice(){
        let acum =0;
        sessionParse.forEach(item => {
                acum = acum + (item.price*item.count)
        })
        return acum
    }
    

    sessionParse.forEach(item => {
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
            <p class="same">${subTotal+4000}</p>
        </div>
        `    
    })
})