window.addEventListener('load', function() {

    let formulario = document.querySelector('form')
 
    formulario.addEventListener('submit', function(evento){
      evento.preventDefault()
      let name = document.querySelector('#name');
      let lastName = document.querySelector('#last-name');
      let email = document.querySelector('#email');
      let password = document.querySelector('#password');
      let image = document.querySelector('#image');
      let errores = [];
      let ulErrores = document.querySelector('.register__form--errors');
      ulErrores.innerHTML = ''


      function validarEmail(valor) {
        let expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        let esValido = expReg.test(valor)
        if (!esValido){
            errores.push('Debe ingresar un correo electrónico valido');
        }
    }
    function fileValidation(image){
      let filePath = image.value;
      let allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
      if(!allowedExtensions.exec(filePath)){
          errores.push('La imagen debe contener una de las sigientes extensiones: JPG, JPEG, PNG o GIF');
          image.value = '';
      }
  }

      if(name.value < 2){
        errores.push('El nombre debe tener al menos 2 caracteres');
      }
      if(lastName.value < 2){
        errores.push('El apellido debe tener al menos 2 caracteres');
      }
      validarEmail(email.value);

      if(image.value){
        fileValidation(image)
      }

      if(password.value.length < 8){
        errores.push('La contraseña debe tener al menos 8 caracteres');
      }
      if(errores.length>0){
        errores.forEach(error => {
            ulErrores.innerHTML += `<li>${error}</li>`
        })
      }
      else{
        formulario.submit()
      }

    })
  });