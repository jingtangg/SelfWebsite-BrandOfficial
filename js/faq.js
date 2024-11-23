document.addEventListener("DOMContentLoaded", () => {
  const faqButtons = document.querySelectorAll(".faq-button");

  faqButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // 找到當前的 FAQ 卡片
      const faqCard = button.closest(".faq-card");
      const faqAnswer = faqCard.querySelector(".faq-answer");

      // 如果已經打開，則收起
      if (faqCard.classList.contains("open")) {
        faqCard.classList.remove("open");
        faqAnswer.style.maxHeight = "0";
      } else {
        // 先關閉所有其他已打開的 FAQ
        document.querySelectorAll(".faq-card.open").forEach((openCard) => {
          openCard.classList.remove("open");
          openCard.querySelector(".faq-answer").style.maxHeight = "0";
        });

        // 打開當前卡片
        faqCard.classList.add("open");
        faqAnswer.style.maxHeight = faqAnswer.scrollHeight + "px"; // 設置高度為內容的實際高度
      }
    });
  });
});
