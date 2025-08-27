import { handleFilterChange } from './filters.js';

function initAllTabs() {
   const tabs = document.querySelectorAll('.tabs');
   tabs.forEach(tab => initTabs(tab));
}

function initTabs(item) {
   const tabsTitle = item.querySelectorAll('.tabs__title');

   tabsTitle.forEach(title => {
      title.addEventListener('click', function (e) {
         const activeTitle = item.querySelector('.tabs__title._active');
         activeTitle?.classList.remove('_active');

         this.classList.add('_active');
         handleFilterChange();
      });
   });
}

export { initAllTabs };