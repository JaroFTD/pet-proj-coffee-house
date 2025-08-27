import { updateCartCount, updateCartPrice} from './cart.js';

function initAllQuantity() {
   const quantitys = document.querySelectorAll('.quantity');
   quantitys.forEach(item => initQuantity(item));
}

function changeQuantity(quantity, change) {
   const countElement = quantity.querySelector('.quantity__count');
   let count = parseInt(countElement.textContent);

   const newCount = count + change;
   if (newCount >= 1 && newCount <= 99) {
      countElement.textContent = newCount;
      updateCartCount();
      updateItemPrice(quantity.closest('.item-card'));
      updateCartPrice();
   }

   if (newCount == 0) {
      deleteProduct(quantity.closest('.item-card'))
      updateCartPrice();
   }
}

function initQuantity(item) {
   const btnDown = item.querySelector('.quantity__btn--down');
   const btnUp = item.querySelector('.quantity__btn--up');

   btnDown.addEventListener('click', () => changeQuantity(item, -1));
   btnUp.addEventListener('click', () => changeQuantity(item, 1));
}

function updateItemPrice(itemCard) {
   const priceElement = itemCard.querySelector('.item-card__price');
   const quantityElement = itemCard.querySelector('.quantity__count');
   const basePrice = parseFloat(itemCard.dataset.basePrice || 0);

   if (priceElement && quantityElement && basePrice) {
      const totalPrice = basePrice * parseInt(quantityElement.textContent);
      priceElement.textContent = `${totalPrice}р`;
   }
}


function deleteProduct(item) {
   const productId = item.dataset.pid;
   const productToRemove = document.querySelector(`.item-card[data-pid="${productId}"]`);

   if (productToRemove) {
      productToRemove.remove();
      updateCartCount();
   }
}


export { initAllQuantity, initQuantity, updateItemPrice };