import { initQuantity } from './quantity.js';
import { updateCartCount, updateCartPrice } from './cart.js';
import { initCart } from './cart.js';

export function addProductToCart(obj, pid) {
   const popupItems = document.querySelector('.popup__items');
   const existingItem = findItemByPid(pid);

   if (existingItem) {
      incrementItemQuantity(existingItem);
   } else {
      createNewItem(obj, pid, popupItems);
   }

   updateCartCount();
   updateCartPrice();
}

function findItemByPid(pid) {
   const items = document.querySelectorAll('.item-card');
   return Array.from(items).find(item => item.dataset.pid === pid);
}

function incrementItemQuantity(item) {
   const countElement = item.querySelector('.quantity__count');
   const currentCount = parseInt(countElement.textContent);
   if (currentCount < 99) {
      countElement.textContent = currentCount + 1;
   }
}

function createNewItem(obj, pid, container) {
   const div = document.createElement('div');
   div.className = 'item-card';
   div.dataset.pid = pid;
   div.dataset.basePrice = obj.price;

   div.innerHTML = `
      <div class="item-card__image">
         <img src="${obj.img}" alt="${obj.title}" loading="lazy">
      </div>
      <div class="item-card__body">
         <div class="item-card__info">
            <div class="item-card__title">${obj.title}</div>
            <div class="item-card__weight">${obj.weight}</div>
         </div>
         <div class="item-card__group">
            <div class="item-card__quantity quantity">
               <button type="button" class="quantity__btn quantity__btn--down">-</button>
               <div class="quantity__count">1</div>
               <button type="button" class="quantity__btn quantity__btn--up">+</button>
            </div>
            <div class="item-card__price">${obj.price}</div>
         </div>
      </div>`;

   container.append(div);
   initQuantity(div.querySelector('.quantity'));
   initCart();
}