window.addEventListener('load', function() {

  function validarEmail(valor) {
    let expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    let esValido = expReg.test(valor)
    if (!esValido) {
      return true
    }
  }

    let formulario = document.querySelector('form')
    let name = document.querySelector('#name');
    let lastName = document.querySelector('#last-name');
    let email = document.querySelector('#email');
    let password = document.querySelector('#password');

    let pErrorName = document.querySelector('.name-error');
    let pErrorLastName = document.querySelector('.last-name-error');
    let pErrorEmail = document.querySelector('.email-error');
    let pErrorPassword = document.querySelector('.password-error');

    name.addEventListener('blur', function () {
      let errores = [];
      pErrorName.innerHTML = '';
      if(name.value.length  < 2){
        errores.push('El nombre debe tener al menos 2 caracteres');
      }
      if (errores.length > 0) {
        errores.forEach(error => {
          pErrorName.innerHTML += error
        })
      }
    })

    lastName.addEventListener('blur', function () {
      let errores = [];
      pErrorLastName.innerHTML = '';
      if(lastName.value.length  < 2){
        errores.push('El apellido debe tener al menos 2 caracteres');
      }
      if (errores.length > 0) {
        errores.forEach(error => {
          pErrorLastName.innerHTML += error
        })
      }
    })

    email.addEventListener('blur', function () {
      let errores = [];
      pErrorEmail.innerHTML = ''
  
      if(validarEmail(email.value)){
        errores.push('Debe ingresar un correo electrónico válido');
      };
      if (errores.length > 0) {
        errores.forEach(error => {
          pErrorEmail.innerHTML += error
        })
      }
    })

    password.addEventListener('blur', function () {
      let errores = [];
      pErrorPassword.innerHTML = '';
      if (password.value.length < 8) {
        errores.push('La contraseña debe tener al menos 8 caracteres');
      }
      if (errores.length > 0) {
        errores.forEach(error => {
          pErrorPassword.innerHTML += error
        })
      }
    })

    formulario.addEventListener('submit', function(evento){
      evento.preventDefault()
      let image = document.querySelector('#image');
      let errores = [];
      let ulErrores = document.querySelector('.register__form--errors');
      ulErrores.innerHTML = ''


    function fileValidation(image){
      let filePath = image.value;
      let allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
      if(!allowedExtensions.exec(filePath)){
          errores.push('La imagen debe contener una de las sigientes extensiones: JPG, JPEG, PNG o GIF');
          image.value = '';
      }
  }
      if(image.value){
         fileValidation(image)
      }
      if(name.value < 2){
        errores.push('');
      }
      if(lastName.value < 2){
        errores.push('');
      }
      if(validarEmail(email.value)){
        errores.push('');
      };
      if(password.value.length < 8){
        errores.push('');
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