function createCardElement(item) {
   const { id, title, weight, price, image } = item;
   const card = document.createElement('div');
   card.className = 'card';
   card.dataset.pid = id;

   card.innerHTML = `
      <div class="card__image">
         <img src="${image}" alt="${title}" loading="lazy">
      </div>
      <div class="card__body">
         <div class="card__title">${title}</div>
         <div class="card__info">${weight} / ${price}р</div>
         <button type="button" class="card__btn"><span>В корзину</span></button>
      </div>`;

   return card;
}

export { createCardElement };