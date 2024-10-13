function toggleMenu() {
  const dropdownMenu = document.getElementById('dropdownMenu');
  dropdownMenu.classList.toggle('active');
}
function closeMenu() {
  const dropdownMenu = document.getElementById('dropdownMenu');
  dropdownMenu.classList.remove('active');
}
// document.getElementById("searchButton").addEventListener("click", function () {
//   const searchIcon = document.getElementById("searchIcon");
//
//   if (this.classList.contains("active")) {
//     searchIcon.src = "img/search.svg";
//     this.classList.remove("active");
//   } else {
//     searchIcon.src = "img/close.svg";
//     this.classList.add("active");
//   }
// });
