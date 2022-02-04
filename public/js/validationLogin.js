window.addEventListener('load', function() {

    let formulario = document.querySelector('form')
 
    formulario.addEventListener('submit', function(evento){
      evento.preventDefault()

      let email = document.querySelector('#email');
      let password = document.querySelector('#password');
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

      validarEmail(email.value);

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