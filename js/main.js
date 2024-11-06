import BottomMenu from "@js/classes/BottomMenu";
import Submenu from "@js/classes/Submenu";
import MobileMenu from "@js/classes/MobileMenu";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

const bottomMenu = new BottomMenu(
  "li.header__item i",
  "fa-chevron-up",
  "fa-chevron-down",
  (trigger) => {
    const targetNode = document.querySelector(
      trigger.getAttribute("data-target-node-id")
    );
    targetNode.classList.toggle("d-block");
  }
);
const submenu = new Submenu(
  ".submenu-real__menu li > i",
  "fa-arrow-left",
  "fa-arrow-right",
  (trigger) => {
    const innerMenu = trigger.parentNode.querySelector("ul");
    innerMenu.classList.toggle("d-inline-block");
  }
);

const mobileMenu = new MobileMenu(
    '#mobile-menu-open',
    '#mobile-menu-close',
    '#dropdownMenu'
)

bottomMenu.init();
submenu.init();
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
