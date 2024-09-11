document.getElementById("searchButton").addEventListener("click", function () {
  const searchIcon = document.getElementById("searchIcon");

  if (this.classList.contains("active")) {
    searchIcon.src = "img/search.svg";
    this.classList.remove("active");
  } else {
    searchIcon.src = "img/close.svg";
    this.classList.add("active");
  }
});
// --------------------------------------------------------------------------------------------------
document.querySelectorAll(".header__top-social-icon").forEach((icon) => {
  icon.addEventListener("click", function (event) {
    event.preventDefault();

    document.querySelectorAll(".header__top-social-icon").forEach((el) => {
      el.classList.remove("active");
      const img = el.querySelector("img");
      img.src = img.dataset.original || img.src;
      img.style.opacity = "1";
    });

    this.classList.add("active");
    const img = this.querySelector("img");
    img.src = this.dataset.color || img.src;

    event.stopPropagation();
  });
});

document.addEventListener("click", function (event) {
  if (!event.target.closest(".header__top-social-icon")) {
    document.querySelectorAll(".header__top-social-icon").forEach((el) => {
      el.classList.remove("active");
      const img = el.querySelector("img");
      img.src = img.dataset.original || img.src;
      img.style.opacity = "1";
    });
  }
});
