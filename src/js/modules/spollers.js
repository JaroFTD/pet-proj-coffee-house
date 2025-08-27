import { _slideUp, _slideDown, _slideToggle, _slideRemove } from "./anim.js";

let isAnimating = false;
function initSpollers(target) {
   if (isAnimating) return;

   let spollersTitle = target.closest('.spollers__title');
   if (spollersTitle) {
      isAnimating = true;
      let spollersItem = spollersTitle.parentElement;
      let spollersBody = spollersItem.querySelector('.spollers__body');

      _slideToggle(spollersBody);
      spollersItem.classList.toggle('_active');

      setTimeout(() => {
         isAnimating = false;
      }, 500);
   }
}

export { initSpollers };