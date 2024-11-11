import BottomMenu from "@js/classes/BottomMenu";
import Submenu from "@js/classes/Submenu";
import MobileMenu from "@js/classes/MobileMenu";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

const bottomMenu = new BottomMenu('#main-header-menu');
const submenu = new Submenu('#submenu-real');

const mobileMenu = new MobileMenu(
    '#mobile-menu-open',
    '#mobile-menu-close',
    '#dropdown-menu'
)

mobileMenu.init();

document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".swiper", {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".slider-control--right",
      prevEl: ".slider-control--left",
    },
    pagination: {
      el: ".swiper-pagination",
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
});
