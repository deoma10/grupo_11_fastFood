window.addEventListener("load", function(){
    let product = document.querySelectorAll(".product-n")
    let sessionArray = sessionStorage.getItem("Order")
    let sessionParse = JSON.parse(sessionArray)
    let array = []

    product.forEach(item => {
        item.addEventListener("click", async function(e){
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
            if(dataSend.id != undefined){
            save(dataSend)
            
            }
        redirect()
        })
    })

    function redirect(){
        let host = window.location.origin
        window.location.replace(host+"/productCart");
    }

    async function searchPorduct(id){
      let res = await fetch(`http://fast-food-dh.herokuapp.com/api/products/${id}`)
      const result = await res.json()
      return result
    }

    function save (data){
        let array2 = sessionStorage.getItem("Order")
        let parseJson = JSON.parse(array2)
        if(array2){
            let verify = ifExist(data.name, parseJson)
            if(verify!=null){
                parseJson[verify].count = parseJson[verify].count + 1;
                array = parseJson
                sessionStorage.setItem("Order", JSON.stringify(array))
            }else{
                array.push(data)
                sessionStorage.setItem("Order", JSON.stringify(array))
            }
        }
        else{
            array.push(data)
            sessionStorage.setItem("Order", JSON.stringify(array))
        }
    }

    function ifExist(name, array){
        let exist = null
        for (let i = 0; i < array.length; i++) {
            if(array[i].name==name){
                exist = i
            }
        }
        return exist
    }
})