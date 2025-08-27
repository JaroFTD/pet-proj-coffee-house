import { handleFilterChange } from './filters.js';


const breakpoints = [0, 12.5, 37.5, 62.5, 87.5, 100];
const stepsBreakpoints = [0, 25, 50, 75, 100];

let sliderTabs, progress, thumb, thumbValue, steps;

function initSliderRange() {
   sliderTabs = document.querySelector('.slider-tabs__body');
   progress = sliderTabs.querySelector('.slider-tabs__progress');
   thumb = sliderTabs.querySelector('.slider-tabs__thumb');
   thumbValue = thumb.querySelector('.slider-tabs__value');
   steps = sliderTabs.querySelectorAll('.slider-tabs__steps span');

   window.thumbValue = thumbValue;

   initSliderEvents();
}

function initSliderEvents() {
   thumb.onpointerdown = function (event) {
      thumb.setPointerCapture(event.pointerId);

      thumb.onpointermove = function (event) {
         const percent = calculateThumbPosition(event);
         const activeIndex = findActiveBreakpoint(percent);
         updateUI(percent, activeIndex);
      };

      thumb.onpointerup = function () {
         snapToClosestStep();
         handleFilterChange();
         thumb.onpointermove = null;
         thumb.onpointerup = null;
      };
   };

   thumb.ondragstart = () => false;
}

function calculateThumbPosition(event) {
   const sliderRect = sliderTabs.getBoundingClientRect();
   const widthSlider = sliderTabs.offsetWidth;
   let newLeft = event.clientX - sliderRect.left;

   newLeft = Math.max(0, Math.min(newLeft, widthSlider));
   return newLeft / widthSlider * 100;
}

function findActiveBreakpoint(percent) {
   for (let i = 0; i < breakpoints.length - 1; i++) {
      if (percent >= breakpoints[i] && percent <= breakpoints[i + 1]) {
         return i;
      }
   }
   return 0;
}

function updateUI(percent, activeIndex) {
   steps.forEach((step, index) => {
      step.classList.toggle('_active', index === activeIndex);
   });

   thumbValue.textContent = activeIndex + 1;
   thumb.style.left = `${percent}%`;
   progress.style.width = `${percent}%`;
}

function snapToClosestStep() {
   steps.forEach((step, index) => {
      if (step.classList.contains('_active')) {
         thumb.style.left = `${stepsBreakpoints[index]}%`;
         progress.style.width = `${stepsBreakpoints[index]}%`;
      }
   });
}

export { initSliderRange, calculateThumbPosition, findActiveBreakpoint, updateUI, snapToClosestStep };