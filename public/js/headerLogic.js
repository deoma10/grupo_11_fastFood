window.addEventListener('load', function () {
    let cintaOpciones = document.querySelector('.header__burgermenu');
    let pBurgerMenu = document.querySelector('.header-mobile-touch__x');
    cintaOpciones.addEventListener('touchend', function(){
        menuLateral.classList.remove('header-mobile-touch-close')
    })

    pBurgerMenu.addEventListener('touchend', function(){
        menuLateral.classList.add('header-mobile-touch-close')
    })
  });