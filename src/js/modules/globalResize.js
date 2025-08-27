import { initResizeSlider } from "./slider.js";
import { fixedCart } from "./fixedCart.js";

function initResize() {
   window.addEventListener('resize', function (e) {
      initResizeSlider();
      fixedCart();
   });
}

export { initResize };