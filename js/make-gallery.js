import galleryItems from "./gallery-items.js";

const refs = {
  galleryPictures: document.querySelector(".js-gallery"),
  modal: document.querySelector(".js-lightbox"),
  modalImage: document.querySelector(".lightbox__image"),
  buttonClose: document.querySelector('[data-action="close-lightbox"]'),
};

let activeIndex;

const picturesGridMarkup = galleryItems.map(
  ({ preview, original, description }) => {
    return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
  }
);
refs.galleryPictures.insertAdjacentHTML(
  "afterbegin",
  picturesGridMarkup.join("")
);

refs.galleryPictures.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.localName !== "img") {
    return;
  }

  refs.modal.classList.add("is-open");
  refs.modalImage.src = e.target.dataset.source;

  for (let i = 0; i < picturesGridMarkup.length; i += 1) {
    if (picturesGridMarkup[i].includes(e.target.src)) {
      activeIndex = i;
    }
  }
  console.log(activeIndex);
});

refs.buttonClose.addEventListener("click", removeModal);

refs.modal.addEventListener("click", (e) => {
  if (e.target.localName !== "img") {
    removeModal();
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key !== "Escape") {
    return;
  }
  removeModal();
});

window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight" && activeIndex < galleryItems.length - 1) {
    activeIndex += 1;
    refs.modalImage.src = galleryItems[activeIndex].original;
  }
  if (e.key === "ArrowLeft" && activeIndex > 0) {
    activeIndex -= 1;
    refs.modalImage.src = galleryItems[activeIndex].original;
  }
});

function removeModal() {
  (refs.modalImage.src = ""), refs.modal.classList.remove("is-open");
}
