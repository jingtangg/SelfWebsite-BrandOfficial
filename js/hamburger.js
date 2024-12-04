document.addEventListener("DOMContentLoaded", function () {
    const navTrigger = document.querySelector(".navTrigger");
    const menu = document.querySelector(".menu");

    navTrigger.addEventListener("click", function () {
        navTrigger.classList.toggle("active"); // 確保 X 狀態正常切換
        menu.classList.toggle("show");
    });
});
