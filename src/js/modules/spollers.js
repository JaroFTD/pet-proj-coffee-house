import { _slideUp, _slideDown, _slideToggle, _slideRemove } from "./anim.js";

let isAnimating = false;
function initSpollers(target) {
   if (isAnimating) return;

   let spollerstitle = target.closest('.spollers__title');
   if (spollerstitle) {
      isAnimating = true;
      let spollersItem = spollerstitle.parentElement;
      let spollersBody = spollersItem.querySelector('.spollers__body');

      _slideToggle(spollersBody);
      spollersItem.classList.toggle('_active');

      setTimeout(() => {
         isAnimating = false;
      }, 500);
   }
}

export { initSpollers };