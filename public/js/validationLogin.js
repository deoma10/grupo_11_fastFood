window.addEventListener('load', function () {

  let formulario = document.querySelector('form')
  let email = document.querySelector('#email');
  let password = document.querySelector('#password');
  let pErrorEmail = document.querySelector('.email-error');
  let pErrorPassword = document.querySelector('.password-error');

  function validarEmail(valor) {
    let expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    let esValido = expReg.test(valor)
    if (!esValido) {
      return true
    }
  }

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

  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault()

    let errores = [];
    // let ulErrores = document.querySelector('.register__form--errors');
    // ulErrores.innerHTML = ''
    if(validarEmail(email.value)){
      errores.push('Debe ingresar un correo electrónico valido');
    };
    if (password.value.length < 8) {
      errores.push('La contraseña debe tener al menos 8 caracteres');
    }
    // if (errores.length > 0) {
    //   errores.forEach(error => {
    //     ulErrores.innerHTML += `<li>${error}</li>`
    //   })
    // }
    if (errores.length == 0) {
      formulario.submit()
    }

  })
});