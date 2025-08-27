function initCart() {
   const cart = document.querySelector('.cart');
   cart?.classList.add('_active');

   updateCartCount();
}

function updateCartCount() {
   const itemCards = document.querySelectorAll('.item-card');
   let totalCount = 0;

   itemCards.forEach(card => {
      const quantityElement = card.querySelector('.quantity__count');
      totalCount += parseInt(quantityElement?.textContent || 0);
   });

   const countCart = document.querySelector('.cart__count');
   if (countCart) {
      countCart.textContent = totalCount;
   }

   if (totalCount == 0) {
      document.querySelector('.cart').classList.remove('_active');
      document.querySelector('.popup').classList.remove('_active');
   }

   return totalCount;
}

function updateCartPrice() {
   const fullAmountItem = document.querySelector('.form-popup__total-price span');
   const itemCards = document.querySelectorAll('.item-card');
   let allPrice = 0;
   itemCards.forEach(item => {
      const priceElement = item.querySelector('.item-card__price');
      const price = parseFloat(priceElement.textContent || 0);
      allPrice += price;
   });
   fullAmountItem.textContent = `${allPrice}р`;
}

export { initCart, updateCartCount, updateCartPrice };