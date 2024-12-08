document.addEventListener("DOMContentLoaded", function () {
  // 確保插件已註冊
  gsap.registerPlugin(TextPlugin);

  // 選擇元素
  var text = document.getElementById("text");

  // 創建時間軸
  var tl = gsap.timeline({
    repeat: -1, // 無限重複
    yoyo: true, // 不反向播放
    repeatDelay: 1, // 重複間隔時間
    onComplete: timelineDone, // 完成時觸發
    onCompleteParams: ["test1", "test2"] // 傳遞參數
  });

  // 添加動畫
        tl.to(text, {
            duration: 1.5,
            text: "WELL DONE",
            color: "#F0FF92", // 更改文字顏色為黃色
            ease: "none",
            delay: 1 // 先等待 1 秒後開始
        })
        .to(text, {
            duration: 1.5,
            text: "HOW DONE",
            ease: "none",
            delay: 1 // 在動畫結束後停留 1 秒
        });

  // 完成時的回呼函式
  function timelineDone(p1, p2) {
    console.log("Timeline done. Params: " + p1 + " and " + p2);
  }
});
