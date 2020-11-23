import {swiper} from './swiper';


import '../css/reset.css'
import '../../node_modules/swiper/swiper-bundle.min.css'
import '../scss/style.scss'

// исходный набор фильтров
const filterLinks = document.querySelectorAll('.filter__link');
// исходный набор слайдов
const cards = document.querySelectorAll('.card');
const navArrows = document.querySelectorAll('.swiper__button');
const navBullet = document.querySelector('.swiper__pagination');

// функция фильтра
filterLinks.forEach(item => {
  item.addEventListener('click', (e)=>{
    e.preventDefault();
    
    cards.forEach(item => clearCardShow(item));

    if (!item.classList.contains('filter__link-active')){
      let currActivFilter = document.querySelector('.filter__link-active');
      document.querySelector('.filter').classList.remove('filter-open'); // при выборе пункта на мобилке скрываем

      let filterCountry = item.getAttribute('href').substr(1); // выбираем название страны из href 
      // показываем необходимые слайды
      if (filterCountry != "all") {
        swiper.removeAllSlides();
        let arr = []
        cards.forEach((itm, ind) => itm.dataset.country == filterCountry ? arr.push(ind) : null );
        arr.forEach((itm, ind) => swiper.addSlide(ind, cards[itm]))

        //скрываем пагинацию
        if (screenWidth >= 1440 && arr.length < 13 ) navArrows.forEach(item => item.classList.add('swiper__button-hide'))
        else if (screenWidth < 1440 && arr.length < 7 ) navBullet.classList.add('swiper__pagination-hide');
      }
      else{
        // Проверяю, какие слайды уже есть, параллельно добавляю остальные. Можно было полностью очисть слайдер и установить все слайды.
        let nowCards = document.querySelector('.card').dataset.country;
        cards.forEach((el, ind) => nowCards != el.dataset.country ? swiper.addSlide(ind, el): null)
        navArrows.forEach(itm => itm.classList.remove('swiper__button-hide'));
        navBullet.classList.remove('swiper__pagination-hide');
      }

      //меняем активный фильтр, обновляем слайдер
      currActivFilter.classList.remove('filter__link-active');
      item.classList.add('filter__link-active');
      swiper.navigation.update();
      swiper.update();
      setReverseCards();
    }
  });
});


// показ/скрытие фильтров в мобильной версии
document.querySelector('.filter__title').addEventListener('click', () => document.querySelector('.filter').classList.toggle('filter-open'));

// прохождение точки между планшно-смартфонным экраном и ПК
let screenWidth = document.documentElement.clientWidth;
let lastScreenWidth = screenWidth;

window.addEventListener('resize', () => {
  screenWidth = document.documentElement.clientWidth;
  if (screenWidth >= 1440 && lastScreenWidth < 1440) {
    cards.forEach(item => clearCardShow(item));
    swiper.update();
    swiper.navigation.update();
    setReverseCards();
  } else if (screenWidth < 1440 && lastScreenWidth >= 1440) {
    cards.forEach(item => item.addEventListener('click', (e) => showCardOnMobile(item, e)))
  }
  lastScreenWidth = screenWidth;
});

// при загрузке страницы для десктопа выбираем перевернутые слады, для планшетов и мобилок показ полной инфы со слайда
window.addEventListener('load', () => (screenWidth >= 1440) ? setReverseCards() : cards.forEach(item => item.addEventListener('click', (e) => showCardOnMobile(item, e))) );


// функция установки последних двух перевернутых слайда
let lastReversed = -1;
const setReverseCards = () => {
  let currentIndex = (swiper.activeIndex == lastReversed) ? swiper.activeIndex+1 : swiper.activeIndex;
  document.querySelectorAll('.card-reverse').forEach(item => item.classList.remove('card-reverse'));
  let card = document.querySelectorAll('.card'); // Не используем глобальный cards, чтобы иметь возможность обновлять и в фильтрах сразу
  for (let val of [4, 5, 13, 14])
    if (val<card.length)
      card[val+swiper.activeIndex].classList.add('card-reverse');
  
  lastReversed = currentIndex;
}
swiper.on('slideChange', setReverseCards);

// функция очистки демонстрации слайда на планшете/смартфоне
const clearCardShow = (item) => {
  item.classList.remove('card-show');
  item.firstChild.style.removeProperty('transform');
}

// функция демонстрации слайда на планшете/смартфоне
const showCardOnMobile = (item, e) => {
  //обработка кнопки закрыть
  if (e.target.classList.contains('card__close')) {
    clearCardShow(item)
    return
  }
  let curr = document.querySelector('.card-show');
  if ( curr )  
    clearCardShow(curr);
  item.classList.add('card-show');
  item.firstChild.style.transform = `translateX(${-swiper.translate}px)`;
}

