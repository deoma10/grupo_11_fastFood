window.addEventListener('load', function () {
    let cintaOpciones = document.querySelector('.header__burgermenu');
    let xBurgerMenu = document.querySelector('.header-mobile-touch__x');
    let menuLateral = document.querySelector('#menu-lateral');

    cintaOpciones.addEventListener('touchend', function(){
        menuLateral.classList.remove('header-mobile-touch-close');
    })

    xBurgerMenu.addEventListener('touchend', function(){
        menuLateral.classList.add('header-mobile-touch-close')
    })
  });