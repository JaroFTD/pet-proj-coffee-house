let header, headerCont, cart, cartWidth;

function initAllFixedCart() {
   header = document.querySelector('.header');
   headerCont = header.querySelector('.header__container');
   cart = header.querySelector('.cart');
   cartWidth = cart.offsetWidth;
   document.onscroll = fixedCart;
}

function fixedCart() {
   let leftPosition = headerCont.getBoundingClientRect().right - cartWidth - 15;
   let scroll = window.scrollY;
   if (scroll > header.clientHeight) {
      cart.classList.add('_fixed');
      cart.style.left = `${leftPosition}px`;
   } else {
      cart.classList.remove('_fixed');
      cart.style.left = '';
   }
}

export { initAllFixedCart, fixedCart };