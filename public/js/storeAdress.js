window.addEventListener("load", function () {
    let adress = document.querySelector(".store-locations")
    let mapLink = document.querySelector(".store-adress-google-maps")
    let mapDefault = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9411546.199751085!2d-78.61865959915902!3d4.492983780286805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e15a43aae1594a3%3A0x9a0d9a04eff2a340!2sColombia!5e0!3m2!1ses!2sco!4v1646161525284!5m2!1ses!2sco"
    mapLink.src= mapDefault
    
    let array = [{
        name: "Bogotá",
        adress: "Centro Comercial Shopping Center Local 102",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.9383048780214!2d-74.08333858529569!3d4.605069243761734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f990b0d9485e9%3A0xe76d74c4f1c49fe0!2sCentro%20Comercial%20Shopping%20Center!5e0!3m2!1ses!2sco!4v1646163334308!5m2!1ses!2sco"
    },
    {
        name: "Medellin",
        adress: "Centro Comercial Unicentro Medellín Local 203",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1016647.726932441!2d-76.2705835640752!3d5.525383351989253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4429a573d090a7%3A0x426cf6249a68c3a6!2sCentro%20Comercial%20Unicentro%20Medell%C3%ADn!5e0!3m2!1ses!2sco!4v1646164128731!5m2!1ses!2sco"
    },
    {
        name: "Pereira",
        adress: "Centro Comercial Unicentro Local 109",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.772315602371!2d-75.74412943529555!3d4.809112842047178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e387dc3e3d6b3f1%3A0x59d89d49aef3d964!2sCentro%20Comercial%20Unicentro%20Pereira!5e0!3m2!1ses!2sco!4v1646164236214!5m2!1ses!2sco"
    },
    {
        name: "Barranquilla",
        adress: "Centro Comercial Buenavista Local 201",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31332.193524091275!2d-74.83140843479111!3d10.999242076304267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef42c4d4ad7ec73%3A0x9ab6eda3d5142548!2sCentro%20Comercial%20Buenavista!5e0!3m2!1ses!2sco!4v1646164322205!5m2!1ses!2sco"
    },
    {
        name: "Cali",
        adress: "Centro Comercial Aventura Plaza Local 112",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63726.82728213964!2d-76.56509812089843!3d3.3680933000000044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a127ec883961%3A0xaff94174b49af1a1!2sCentro%20Comercial%20Aventura%20Plaza!5e0!3m2!1ses!2sco!4v1646164454692!5m2!1ses!2sco"
    }
    
    ]
    array.forEach(item=>{
        adress.innerHTML += 
        `<div class="store-description">
            <p class="store-name-adress" style="font-weight: bold">${item.name}</p>
            <p class="store-name-adress">${item.adress}</p>                      
            <button class="store-button" id="${item.map}" >Ver Ubicación</button>
        </div>
        `
    })
    adress.addEventListener("click", function(e){
        let k = e.target.id
        if(k){
        mapLink.src = k
        }else {
        }
    })
    
})