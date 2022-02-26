window.addEventListener("load", function(){
    let dataId = document.querySelectorAll("#add-cart-prevent")
    let array = []

    dataId.forEach(k => {
        k.addEventListener('click', function(e){
            e.preventDefault()
            let element = e.target.firstChild.id
            array.push(element)
            console.log(array)
        })
    })

})