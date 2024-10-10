document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".header__btn");
  const nav = document.querySelector(".mobile-nav");

  if (btn && nav) {
    btn.addEventListener("click", () => {
      console.log("Кнопка нажата");
      nav.classList.toggle("menu-open");
      btn.classList.toggle("menu-open");
    });
  } else {
    console.error("Кнопка или меню не найдены!");
  }
});
