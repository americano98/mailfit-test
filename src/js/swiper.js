import Swiper, { Navigation, Pagination } from 'swiper';

Swiper.use([Navigation, Pagination]);

export const  swiper = new Swiper('.swiper', {
  slideActiveClass: 'swiper__card_item-current',
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    320: {
      slidesPerColumn: 2,
      slidesPerColumnFill: 'row',
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerColumn: 2,
      slidesPerColumnFill: 'row',
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1440 : {
      slidesPerColumn: 2,
      slidesPerColumnFill: 'row',
      slidesPerView: 6,
      spaceBetween: 30,
      navigation: {
        nextEl: '.swiper__button-next',
        prevEl: '.swiper__button-prev',
      }
    }
  }
});