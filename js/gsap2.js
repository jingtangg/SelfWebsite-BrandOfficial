// 確保 GSAP 已經載入
gsap.registerPlugin();

// 動畫邏輯
gsap.fromTo(
    ".text-title", // 選取目標
    { y: "10%", opacity: 0 }, // 初始狀態
    { y: "0%", opacity: 1, duration: 2, ease: "power2.out" } // 終止狀態
);
