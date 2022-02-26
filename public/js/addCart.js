window.addEventListener("load", function(){
    let dataId = document.querySelectorAll("content")
    document.querySelector("#add-cart-prevent").addEventListener("submit", function(e){
        e.preventDefault()
    })
    dataId.forEach(id => {
        id.addEventListener("click", function(e){
            console.log("ssss");
        })
    })
})