let sliderReviews = document.querySelector('.reviews__slider');
let sliderReviewsButtonPrev = sliderReviews.querySelector('.slider__arrow--prev');
let sliderReviewsButtonNext = sliderReviews.querySelector('.slider__arrow--next');
let sliderReviewsBody = sliderReviews.querySelector('.slider__items');
let sliderReviewsItems = sliderReviewsBody.querySelectorAll('.slider__item');
let sliderReviewsItemsLength = sliderReviewsItems.length - 3;
let sliderReviewsItemWidth = sliderReviewsItems[0].offsetWidth + 20;
let sliderReviewsItemMaxWidth = 0;
let sliderReviewsCount = 0;

function initSlider() {
   sliderReviewsButtonNext.addEventListener('click', function (e) {
      if (sliderReviewsCount < sliderReviewsItemsLength) {
         sliderReviewsItemMaxWidth += sliderReviewsItemWidth;
         sliderReviewsBody.style.transform = `translateX(-${sliderReviewsItemMaxWidth}px)`;
         sliderReviewsCount++;
      }
   });
   sliderReviewsButtonPrev.addEventListener('click', function (e) {
      if (sliderReviewsCount > 0) {
         sliderReviewsItemMaxWidth -= sliderReviewsItemWidth;
         sliderReviewsBody.style.transform = `translateX(-${sliderReviewsItemMaxWidth}px)`;
         sliderReviewsCount--;
      }
   });
}
function initResizeSlider() {
   if (window.innerWidth <= 1300.98) {
      sliderReviewsItemsLength = sliderReviewsItems.length - 2;
   } else {
      sliderReviewsItemsLength = sliderReviewsItems.length - 3;
   }
   if (window.innerWidth <= 767.98) {
      sliderReviewsItemsLength = sliderReviewsItems.length - 1;
   }
   sliderReviewsItemWidth = sliderReviewsItems[0].offsetWidth + 20;
   if (sliderReviewsCount > 0) {
      sliderReviewsItemMaxWidth = sliderReviewsItemWidth * sliderReviewsCount;
      sliderReviewsBody.style.transform = `translateX(-${sliderReviewsItemMaxWidth}px)`;
   }
}

export { initSlider, initResizeSlider };