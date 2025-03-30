import 'choices.js';

import BottomMenu from '@js/classes/BottomMenu';
import Submenu from '@js/classes/Submenu';
import MobileMenu from '@js/classes/MobileMenu';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Choices from 'choices.js';

const bottomMenu = new BottomMenu('#main-header-menu');
const submenu = new Submenu('#submenu-real');

const mobileMenu = new MobileMenu(
    '#dropdown-menu',
    '#mobile-menu-open',
    '#mobile-menu-close'
);

const heroSwiper = new Swiper('#hero-swiper', {
    modules: [Navigation, Pagination, Autoplay],
    slidesPerView: 1,
    spaceBetween: 20,
    effect: 'fade',
    navigation: {
        nextEl: '#hero-next-slide',
        prevEl: '#hero-prev-slide',
    },
    pagination: {
        el: '#hero-swiper-pagination',
        clickable: true,
        bulletClass: 'navigation-section__box',
        bulletActiveClass: 'navigation-section__box--active',
        renderBullet: (index, className) => `<div class="box ${className}"></div>`,
    },
    autoplay: {
        delay: 5000,
    },
    loop: true,
});

const calendarSwiper = new Swiper('#calendar-swiper', {
    modules: [Navigation],
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
        nextEl: '#calendar-cards-control-next',
        prevEl: '#calendar-cards-control-prev',
    },
    pagination: {
        clickable: true,
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        680: {
            slidesPerView: 2,
        },
        991: {
            slidesPerView: 3,
        },
    },
});

document
    .querySelectorAll('select')
    .forEach(el => new Choices(el, {
        itemSelectText: '',
        noResultsText: '',
        classNames: {
            itemSelectable: ['choices__item--selectable-custom'],
        }
    }));

let tab = function () {
    let tabBtn = document.querySelectorAll('.tabs__button');
    let tabContent = document.querySelectorAll('.content');
    let tabName;

    tabBtn.forEach((item) => {
        item.addEventListener('click', selectTabNav);
    });

    function selectTabNav() {
        tabBtn.forEach((item) => {
            item.classList.remove('active');
        });
        this.classList.add('active');
        tabName = this.getAttribute('data-tab-name');
        selectTabContent(tabName);
    }

    function selectTabContent(tabName) {
        tabContent.forEach((item) => {
            item.classList.contains(tabName) ? item.classList.add('active') : item.classList.remove('active');
        });
    }
};
tab();
