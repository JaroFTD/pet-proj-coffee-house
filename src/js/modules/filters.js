import { getMenuApi } from './api.js';

let checkboxOnion, checkboxSauce;

function initFilters() {
   checkboxOnion = document.getElementById('onion');
   checkboxSauce = document.getElementById('sauce');

   checkboxOnion?.addEventListener('change', handleFilterChange);
   checkboxSauce?.addEventListener('change', handleFilterChange);

   handleFilterChange();
}

function handleFilterChange() {
   let tabs = document.querySelectorAll('.tabs');
   let filters = {
      onion: checkboxOnion.checked,
      sauce: checkboxSauce.checked
   };
   let stars = thumbValue ? +thumbValue.textContent : 3;

   for (let i = 0; i < tabs.length; i++) {
      let tabstitleActive = tabs[i].querySelector('.tabs__title._active');
      let titlePos = tabstitleActive.dataset.pos;
      let tabsBody = tabs[i].querySelector('.tabs__body');

      getMenuApi(titlePos, filters.onion, filters.sauce, stars).then(data => {
         tabsBody.innerHTML = '';
         for (let elem of data) {
            tabsBody.append(elem);
         }
      });
   }
}

export { initFilters, handleFilterChange };