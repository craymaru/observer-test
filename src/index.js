let target = document.getElementsByClassName("transcript-panel")[0];
console.log(target);
const config = {
  childList: true, // 対象ノードの子ノード（テキストノードも含む）に対する追加・削除を監視する
  attributes: true, // 対象ノードの属性に対する変更を監視する
  characterData: true, // 対象ノードのデータに対する変更を監視する
  subtree: true // 対象ノードとその子孫ノードに対する変更を監視する
};

const highlight = "highlight";

const observerFac = function () {
  console.log("Fac!");

  const process = (mutations) => {
    console.log("PROCESS", mutations);
    let subtitle = document.getElementsByClassName(highlight)[0] || {
      textContent: "There are no highlighted subtitles."
    };
    document.getElementById("get").textContent = subtitle.textContent;
  };
  return new MutationObserver(process);
};
const observer = observerFac();

const deleteClass = function (className) {
  const cls = document.getElementsByClassName(className);
  if (!cls.length) return;
  for (let h of cls) {
    h.classList.remove(className);
  }
};

const switchHighlight = function (value) {
  const container = target.getElementsByClassName("cue-container")[value];
  const underline = container.getElementsByClassName("underline-cue")[0];
  const span = underline.getElementsByTagName("span")[0];
  if (span.className === highlight) return;
  deleteClass(highlight);
  span.setAttribute("class", highlight);
};

// Documents

document.getElementById("btn-0").onclick = function () {
  const value = document.getElementById("btn-0").value;
  switchHighlight(value);
};
document.getElementById("btn-1").onclick = function () {
  const value = document.getElementById("btn-1").value;
  switchHighlight(value);
};
document.getElementById("btn-2").onclick = function () {
  const value = document.getElementById("btn-2").value;
  switchHighlight(value);
};
document.getElementById("btn-remove").onclick = function () {
  deleteClass(highlight);
};

document.getElementById("btn-observe").onclick = function () {
  observer.observe(target, config);
};

document.getElementById("btn-disconnect").onclick = function () {
  observer.disconnect();
};

document.getElementById("btn-get").onclick = function () {
  let e = document.getElementById("items").innerHTML;
  if (e) e = "<div>Get:<div/>" + e;
  document.getElementById("get").innerHTML = e;
};

if (document.readyState === "loading") {
  // Loading hasn't finished yet
  document.addEventListener("DOMContentLoaded", observer);
} else {
  // `DOMContentLoaded` has already fired
  observer.observe(target, config);
}
