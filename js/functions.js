export function toggleMenu() {
    const dropdownMenu = document.getElementById("dropdownMenu");
    dropdownMenu.classList.toggle("active");
}
export function closeMenu() {
    const dropdownMenu = document.getElementById("dropdownMenu");
    dropdownMenu.classList.remove("active");
}
