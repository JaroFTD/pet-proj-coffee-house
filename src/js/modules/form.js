function initAllForms() {
   let forms = document.querySelectorAll('form');
   forms.forEach(form => initForm(form));
}
function initForm(form) {
   form.addEventListener('submit', formSend);

   async function formSend(e) {
      e.preventDefault();

      let error = formValidate(form);

      if (error === 0) {
         form.reset();
         document.querySelectorAll('.popup').forEach(item => {
            item.classList.remove('_active');
         });
         document.getElementById('popup-sending').classList.add('_active');
         document.querySelector('.popup__items').innerHTML = '';
         document.querySelector('.cart').classList.remove('_active');
      }

      function formValidate(form) {
         let error = 0;
         let formReq = form.querySelectorAll('._req');

         for (let i = 0; i < formReq.length; i++) {
            let input = formReq[i];

            formRemoveError(input);

            if (input.getAttribute('type') === 'email') {
               if (emailTest(input)) {
                  formAddError(input);
                  error++;
               }
            } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
               formAddError(input);
               error++;
            } else if (input.getAttribute('type') === 'tel') {
               if (telTest(input)) {
                  formAddError(input);
                  error++;
               }
            } else {
               if (input.value === '') {
                  formAddError(input);
                  error++;
               }
            }
         }
         return error;
      }

      function formAddError(input) {
         input.parentElement.classList.add('_error');
         input.classList.add('_error');
      }
      function formRemoveError(input) {
         input.parentElement.classList.remove('_error');
         input.classList.remove('_error');
      }
      function emailTest(input) {
         return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
      }
      function telTest(input) {
         return !/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(input.value);
      }
   }
}

export { initAllForms };