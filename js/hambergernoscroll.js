document.addEventListener("DOMContentLoaded", function () {
    const navTrigger = document.querySelector(".navTrigger");
    const menu = document.querySelector(".menu");

    navTrigger.addEventListener("click", function () {
        menu.classList.toggle("show"); // 切換菜單顯示
        document.body.classList.toggle("menu-open"); // 控制頁面滾動
    });
});
