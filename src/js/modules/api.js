import { createCardElement } from './cards.js';

async function getMenuApi(pos = 'all', onion = false, sauce = false, valueStars = 3) {
   let response = await fetch('https://raw.githubusercontent.com/JaroFTD/cafe-project/main/data.json');
   let data = await response.json();
   let cards = [];
   for (let key in data) {
      let item = data[key]
      let { isPosition, isOnion, isSauce, stars } = item;
      if ((pos === 'all' || isPosition === pos) && (!onion || isOnion) && (!sauce || isSauce) && stars <= valueStars) {
         cards.push(createCardElement(item));
      }
   }

   return cards;
}

export { getMenuApi };