window.addEventListener("load", function () {
    let product = document.querySelector(".product-n")

    product.addEventListener("click", async function (e) {
        e.preventDefault()
        let id = e.target.id
        let dataSend = await searchPorduct(id)
        dataSend = {
            id: dataSend.idProducts,
            name: dataSend.name,
            count: 1,
            price: dataSend.price,
            image: dataSend.imageName
        }
        if (dataSend.id != undefined) {
            save(dataSend)
        }
        redirect()
    })

    function redirect() {
        let host = window.location.origin
        window.location.replace(host + "/");
    }

    async function searchPorduct(id) {
        let res = await fetch(`http://fast-food-dh.herokuapp.com/api/products/${id}`)
        const result = await res.json()
        return result
    }

    function save(data) {
        sessionStorage.setItem("New_Order", JSON.stringify(data))
    }
})