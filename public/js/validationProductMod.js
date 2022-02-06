window.addEventListener('load', function(){
    let form = document.querySelector('form')
    let name = document.querySelector('#creation_product_name')
    let description = document.querySelector('#creation_product_description')
    let img = document.querySelector('#creation_product_img')
    let errName = document.querySelector('.productModErrorName')
    let errDescription = document.querySelector('.productModErrorDescription')
    let errImg = document.querySelector('.productModErrorImg')
    let bName;
    let bDescription;
    let bImg;
    let extP = /\.(jpg|png|gif)$/i

    name.addEventListener('change', function(){
        if(this.value.length<5){
            bName=false
            errName.classList.add('hasError')}
        else if(this.value.length>=5){
            bName=true
            errName.classList.remove('hasError')}
    })

    description.addEventListener('change', function(){
        if(this.value.length<20){
            bDescription=false
            errDescription.classList.add('hasError')}
        else if(this.value.length>=20){ 
            bDescription=true
            errDescription.classList.remove('hasError')}
    })

    img.addEventListener('change', function(){
        console.log('se cargo la imagen')
        if(!extP.exec(img.value)){
            bImg=false
            errImg.classList.add('hasError')
        }else if(extP.exec(img.value)){
            bImg=true;
            errImg.classList.remove('hasError')
        }
    })

    form.addEventListener('submit', function(e){
        e.preventDefault()
        console.log(bImg, bName, bDescription)
        if(bName==true&&bDescription==true&&bImg==true){
            form.submit()
        }
        if((bName==true||bName==undefined)&&(bDescription==true||bDescription==undefined)&&(bImg==true||bImg==undefined)){
            form.submit()
        }
    })
    
})