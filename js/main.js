import BottomMenu from "@js/classes/BottomMenu";
import Submenu from "@js/classes/Submenu";
import MobileMenu from "@js/classes/MobileMenu";
import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const bottomMenu = new BottomMenu('#main-header-menu');
const submenu = new Submenu('#submenu-real');

const mobileMenu = new MobileMenu(
    '#dropdown-menu',
    '#mobile-menu-open',
    '#mobile-menu-close'
);

const heroSwiper = new Swiper("#hero-swiper", {
  modules: [Navigation, Pagination, Autoplay],
  slidesPerView: 1,
  spaceBetween: 20,
  effect: "fade",
  // navigation: {
  //   nextEl: "#next-slide",
  //   prevEl: "#prev-slide",
  // },
  pagination: {
    el: "#hero-swiper-pagination",
    clickable: true,
    bulletClass: "navigation-section__box",
    bulletActiveClass: "navigation-section__box--active",
    renderBullet: (index, className) =>
        `<div class="box ${className}"></div>`,
  },
  autoplay: {
    delay: 5000,
  },
  loop: true,
});

const calendarSwiper = new Swiper("#calendar-swiper", {
  modules: [Navigation],
  slidesPerView: 1,
  spaceBetween: 20,
  navigation: {
    nextEl: "#calendar-cards-control-next",
    prevEl: "#calendar-cards-control-prev",
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
