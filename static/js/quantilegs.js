"use strict";

// Every tab is operable with mouse, touch, and the standard arrow/Home/End keys.
document.querySelectorAll("[data-tab-group]").forEach((group) => {
  const list = group.querySelector('[role="tablist"]');
  const tabs = Array.from(list.querySelectorAll('[role="tab"]'));
  function activate(tab, moveFocus = false) {
    tabs.forEach((item) => {
      const selected = item === tab;
      item.setAttribute("aria-selected", String(selected));
      item.tabIndex = selected ? 0 : -1;
      const panel = document.getElementById(item.getAttribute("aria-controls"));
      panel.hidden = !selected;
      if (!selected) panel.querySelectorAll("video").forEach((video) => video.pause());
    });
    if (moveFocus) tab.focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activate(tab));
    tab.addEventListener("keydown", (event) => {
      let next;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft") next = (index + tabs.length - 1) % tabs.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = tabs.length - 1;
      else return;
      event.preventDefault();
      activate(tabs[next], true);
    });
  });
});

const dialog = document.getElementById("image-dialog");
const dialogImage = document.getElementById("dialog-image");
const dialogOriginal = document.getElementById("dialog-original");
let zoomTrigger = null;
document.querySelectorAll("[data-zoom]").forEach((button) => {
  button.addEventListener("click", () => {
    zoomTrigger = button;
    dialogImage.src = button.dataset.zoom;
    dialogImage.alt = button.querySelector("img").alt;
    document.getElementById("dialog-caption").textContent = button.dataset.caption;
    dialogOriginal.hidden = !button.dataset.pdf;
    if (button.dataset.pdf) dialogOriginal.href = button.dataset.pdf;
    else dialogOriginal.removeAttribute("href");
    dialog.showModal();
  });
});
document.getElementById("close-dialog").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener("close", () => zoomTrigger?.focus());

document.querySelectorAll("[data-pruning-scene]").forEach((button) => {
  button.addEventListener("click", () => {
    const scene = button.dataset.pruningScene;
    if (!["kitchen", "bicycle"].includes(scene)) return;
    const image = document.getElementById("pruning-image");
    const wrapper = document.getElementById("pruning-image-button");
    image.src = `static/images/pruning-${scene}.webp`;
    image.alt = `${scene} renderings and RGB-MAE maps at 20 and 10 percent Gaussian retention`;
    wrapper.dataset.zoom = image.src;
    wrapper.dataset.pdf = `static/pdfs/pruning-${scene}.pdf`;
    wrapper.dataset.caption = `Pruning comparison · Mip-NeRF 360 ${scene}`;
    document.querySelectorAll("[data-pruning-scene]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
  });
});

const copyButton = document.getElementById("copy-citation");
copyButton.addEventListener("click", async () => {
  const value = document.getElementById("bibtex-code").textContent;
  const status = document.getElementById("copy-status");
  try {
    await navigator.clipboard.writeText(value);
    copyButton.textContent = "Copied!";
    status.textContent = "BibTeX copied to clipboard.";
    window.setTimeout(() => { copyButton.textContent = "Copy BibTeX"; }, 1800);
  } catch {
    const range = document.createRange();
    range.selectNodeContents(document.getElementById("bibtex-code"));
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    status.textContent = "Automatic copy is unavailable. The BibTeX is selected; press Ctrl+C or Command+C.";
    copyButton.textContent = "Selected — press Ctrl/Cmd+C";
  }
});

const config = window.QUANTILEGS_CONFIG || {};
const releaseUrls = { arxiv: config.arxivUrl, code: config.codeUrl };
document.querySelectorAll("[data-resource]").forEach((link) => {
  const url = releaseUrls[link.dataset.resource];
  if (!url) return;
  try {
    if (new URL(url).protocol !== "https:") return;
  } catch { return; }
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.removeAttribute("aria-disabled");
  link.removeAttribute("role");
  link.classList.remove("pending");
  link.querySelector(".resource-note")?.remove();
});
