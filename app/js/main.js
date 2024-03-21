
// ------------------ Mobile Menu ---------------- //
const burger = document.querySelector(".burger");
const mobileMenu = document.querySelector(".mobile-menu"); //мобильное меню
const bodyLock = document.querySelector("body"); //ищем как селектор ТЕГА

document.addEventListener('click', (e) => {
   const target = e.target;

   if (target.classList.contains('burger')) {
      burger.classList.toggle('burger--active');
      mobileMenu.classList.toggle('mobile-menu--active');
      bodyLock.classList.toggle('lock');

      if (mobileMenu.classList.contains('mobile-menu--active')) {
         burger.classList.add('burger--active');
         bodyLock.classList.add('lock');
      } 

   } else if (target.classList.contains('mobile-link')) {
      console.log('click')
      burger.classList.remove('burger--active');
      bodyLock.classList.remove('lock');
      mobileMenu.classList.remove('mobile-menu--active');
   }
});




// ----------------- swiper`s ------------------ //
// comments
const swiperComments = new Swiper('.comments__slider', {
   loop: true,
   autoplay: {
      delay: 3000,
   },
   slidesPerView: 3,
   spaceBetween: 40,
   autoplay: {
      delay: 3000,
   },
   breakpoints: {
      1200: {
         slidesPerView: 3,
         spaceBetween: 30,
      },
      992: {
         slidesPerView: 3,
         spaceBetween: 30,
      },
      576: {
         slidesPerView: 2,
         spaceBetween: 20,
      },
      325: {
         slidesPerView: 1,
      },
   },
});

// order
const swiperOrder = new Swiper('.order__slider', {
   loop: true,
   
   autoplay: {
      delay: 5000,
   },
});

// hero
const swiperHero = new Swiper('.hero-slider', {
   loop: true,

   autoplay: {
      delay: 5000,
   },
});

// case
const caseSwiper = new Swiper('.case__slider', {
   loop: true,

   autoplay: {
      delay: 3000,
   },
});




//------------------ Accordion -----------------//
const accordion = document.querySelector('.accordion');
const accordionItemList = document.querySelectorAll('.accordion__item');

accordion.addEventListener(`click`, (e) => {
   const target = e.target;

   if (target.closest('.accordion__item')) {
      addClassToAcord(target);
   }
});


function addClassToAcord(target) {

   if (target.closest('.accordion__item').classList.contains('open')) {
      target.closest('.accordion__item').classList.remove('open');

   } else {
      accordionItemList.forEach(item => {

         if (item.classList.contains('open')) {
            item.classList.remove('open');
         };
      });

      target.closest('.accordion__item').classList.add('open');
   }
};


// -------------------- mask ---------------- //
const element = document.getElementById('phone');
const element2 = document.getElementById('phone2');

const maskOptions = {
   mask: '+{38}(000)000-00-00',
   lazy: false
}
const mask = new IMask(element, maskOptions);
const mask2 = new IMask(element2, maskOptions);