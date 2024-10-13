function toggleMenu() {
  const dropdownMenu = document.getElementById("dropdownMenu");
  const overlay = document.getElementById("overlay");
  dropdownMenu.classList.toggle("active");
  overlay.classList.toggle("active");
}

function closeMenu() {
  const dropdownMenu = document.getElementById("dropdownMenu");
  const overlay = document.getElementById("overlay");
  dropdownMenu.classList.remove("active");
  overlay.classList.remove("active");
}

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
