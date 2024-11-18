document.addEventListener("DOMContentLoaded", () => {
    // 取得所有卡片和對應的圖標
    const cards = document.querySelectorAll(".card-item");
    const icons = document.querySelectorAll(".icon-container .icon");

    // 設定 hover 事件
    cards.forEach((card, index) => {
        card.addEventListener("mouseenter", () => {
            // 切換左側圖標為太陽
            icons[index].src = "./images/sun.png";
            // 讓右側連結亮起來
            const link = card.querySelector("a");
            link.style.color = "#FFA500"; // 太陽亮起時的顏色
        });

        card.addEventListener("mouseleave", () => {
            // 恢復左側圖標為星星
            icons[index].src = "./images/star.png";
            // 恢復右側連結顏色
            const link = card.querySelector("a");
            link.style.color = "#FFD700";
        });
    });
});
