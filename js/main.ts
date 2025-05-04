import 'choices.js';

import MainMenu from '@js/classes/MainMenu';
import MobileMenu from '@js/classes/MobileMenu';
import Swiper from 'swiper';
import {Navigation, Pagination, Autoplay} from 'swiper/modules';
import Choices from 'choices.js';
import tab from "@js/functions/tab";
import Vue from "vue";
import UnderMainMenuSpace from "@js/components/UnderMainMenuSpace.vue";
import MobileSearch from "@js/components/MobileSearch.vue";
import DesktopSearchButton from "@js/components/DesktopSearchButton.vue";
import MobileSearchButton from "@js/components/MobileSearchButton.vue";

Vue.component('under-main-menu-space', UnderMainMenuSpace);
Vue.component('desktop-search-button', DesktopSearchButton);
Vue.component('mobile-search-button', MobileSearchButton);
Vue.component('mobile-search', MobileSearch);

// TODO: Remove mainMenu from window after refactoring
window.mainMenu = new MainMenu();
const mobileMenu = new MobileMenu();

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
        } as any
    }));
tab();

const $vueContentElems = document.querySelectorAll('.vue-content');
$vueContentElems.forEach($elem => {
    new Vue({el: $elem})
})
