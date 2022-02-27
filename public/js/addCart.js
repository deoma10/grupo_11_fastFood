window.addEventListener("load", function(){
    let dataId = document.querySelectorAll("#add-cart-prevent")
    let aside = document.querySelector(".aside-working")
    let sessionArray = sessionStorage.getItem("Order")
    let sessionParse = JSON.parse(sessionArray)
    let array = []
    
    if(sessionParse){
        sessionParse.forEach(item => {
            aside.innerHTML += 
            `<div class="order-product-aside">
            <p class="order-cart-description">${item.name}</p> 
            <p id=cart${item.id} class="order-cart-count">${item.count}</p> </div>`
        })
    }


    async function searchPorduct(id){
      let res = await fetch(`http://fast-food-dh.herokuapp.com/api/products/${id}`)
      const result = await res.json()
      return result
    }
    dataId.forEach(k => {
        k.addEventListener('click', async function(e){
            e.preventDefault()
            let element = e.target.firstChild.id
            let dataSend = await searchPorduct(element)
            dataSend = {
                id: dataSend.idProducts,
                name: dataSend.name,
                count: 1,
                price: dataSend.price,
                image: dataSend.imageName
            }
            if(dataSend.id != undefined){
            save(dataSend)
            editAside(dataSend)
            }
        })
    })

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

    function editAside(data){
        let array2 = sessionStorage.getItem("Order")
        let parseJson = JSON.parse(array2)
        let element = document.querySelector("#cart"+data.id)
        if(!element){
            aside.innerHTML += 
            `<div class="order-product-aside">
            <p class="order-cart-description">${data.name}</p> 
            <p id=cart${data.id} class="order-cart-count">${data.count}</p> </div>`
        }else{
            let productToFind = parseJson.filter(item => {
                return item.id == data.id
            })
            element.innerHTML = productToFind[0].count
        }
    }
})