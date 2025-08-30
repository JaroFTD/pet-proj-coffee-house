import { handleFilterChange } from './filters.js';

function initAllTabs() {
   const tabs = document.querySelectorAll('.tabs');
   tabs.forEach(tab => initTabs(tab));
}

function initTabs(item) {
   const tabstitle = item.querySelectorAll('.tabs__title');

   tabstitle.forEach(title => {
      title.addEventListener('click', function (e) {
         const activetitle = item.querySelector('.tabs__title._active');
         activetitle?.classList.remove('_active');

         this.classList.add('_active');
         handleFilterChange();
      });
   });
}

export { initAllTabs };