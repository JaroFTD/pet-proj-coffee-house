import { handleFilterChange } from './filters.js';
import { initSpollers } from "./spollers.js";
import { addProductToCart } from './addProduct.js';
import { updateItemPrice } from './quantity.js';
import { updateCartPrice } from './cart.js';
import { calculateThumbPosition, findActiveBreakpoint, updateUI, snapToClosestStep } from './slider-range.js';

let sliderTabs;

function initGlobalClick() {
   sliderTabs = document.querySelector('.slider-tabs__body');

   window.addEventListener('click', function (e) {
      const target = e.target;
      initSpollers(target);
      if (sliderTabs && target.closest('.slider-tabs__body')) {
         const percent = calculateThumbPosition(e);
         const activeIndex = findActiveBreakpoint(percent);

         updateUI(percent, activeIndex);
         snapToClosestStep();
         handleFilterChange();
      }

      if (target.closest('.cart')) {
         document.querySelector('.popup').classList.add('_active');
      }

      if (target.closest('.popup__close')) {
         document.querySelector('.popup').classList.remove('_active');
      }

      if (target.closest('.card__btn')) {
         let cardItem = target.closest('.card');
         let img = cardItem.querySelector('img').getAttribute('src')
         let title = cardItem.querySelector('.card__title').textContent;
         let [weight, price] = cardItem.querySelector('.card__info').textContent.split('/').map(item => item.trim());
         let pid = cardItem.dataset.pid;
         let obj = { pid, img, title, weight, price };

         addProductToCart(obj, pid);

         updateItemPrice(document.querySelector(`.item-card[data-pid="${pid}"]`));
         updateCartPrice();
      }
   });
}

export { initGlobalClick };