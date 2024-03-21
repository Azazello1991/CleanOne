
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

// --------------- AOS ------------------------ //
AOS.init({
   // Global settings:
   disable: false, // виключити анімацію на мобільних пристроях прописати "phone"
   startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
   initClassName: 'aos-init', // class applied after initialization
   animatedClassName: 'aos-animate', // class applied on animation
   useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
   disableMutationObserver: false, // disables automatic mutations' detections (advanced)
   debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
   throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


   // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
   offset: 120, // кількість пікселів щоб показалось для анімації
   delay: 0, // values from 0 to 3000, with step 50ms (затримка анімації)
   duration: 800, // values from 0 to 3000, with step 50ms (швидкість анімації)
   easing: 'ease', // default easing for AOS animations (тип анімації)
   once: false, // whether animation should happen only once - while scrolling down (повторна анімація)
   mirror: false, // whether elements should animate out while scrolling past them
   anchorPlacement: 'top-bottom', // відлік анімації з...

});