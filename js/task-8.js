import galleryItems from './gallery-items.js';

const galleryRef = document.querySelector('.js-gallery');
const arrOfImg = [];
const galleryMarkup = createGalleryItemsMarkup(galleryItems);
const galleryModalRef = document.querySelector('.js-lightbox');
const galleryModalImgRef = galleryModalRef.querySelector('.lightbox__image');
const closeBtnRef = galleryModalRef.querySelector('[data-action]');
const overlayRef = galleryModalRef.querySelector('.lightbox__overlay');

galleryRef.insertAdjacentHTML('beforeend', galleryMarkup);
galleryRef.addEventListener('click', onGalleryElementClick);   

function createGalleryItemsMarkup(galleryItems) {
    const markup = galleryItems.map(({ preview, original, description }, index) => {
       arrOfImg.push(original);
        return `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img class="gallery__image" src="${preview}"
                data-source="${original}" data-index="${index}" alt="${description}" />
        </a>
    </li>`;
    })
        .join('');
    return (markup);
  };

function onGalleryElementClick(event) {
    event.preventDefault('');
    if (!event.target.classList.contains('gallery__image')) {
        return;
    }
    console.log(event.target.dataset.source);
    galleryModalRef.classList.add('is-open');
    galleryModalImgRef.src = event.target.dataset.source;
    galleryModalImgRef.dataset.index = event.target.dataset.index;

    closeBtnRef.addEventListener('click', onCloseBtnClick);
    window.addEventListener('keydown', onKeyPress);

    overlayRef.addEventListener('click', (event) => {
        if (event.currentTarget === event.target) onCloseBtnClick()
    });
}

function onKeyPress(event) {
    if (galleryModalRef.classList.contains('is-open')) {
        if (event.code === 'Escape') onCloseBtnClick();
        if (event.code === 'ArrowLeft') onArrowLeftClick();
        if (event.code === 'ArrowRight') onArrowRightClick();
    }
}

function onCloseBtnClick() {
    galleryModalRef.classList.remove('is-open');
    galleryModalImgRef.src = '';
    galleryModalImgRef.dataset.index = '';
    closeBtnRef.removeEventListener('click', onCloseBtnClick);
    window.removeEventListener('keydown', onCloseBtnClick);
    window.removeEventListener('keydown', onArrowLeftClick);
    window.removeEventListener('keydown', onArrowRightClick);
    overlayRef.removeEventListener('click', onCloseBtnClick);
}

function onArrowLeftClick() {
    let number = Number(galleryModalImgRef.dataset.index);
    number -= 1; 
    if (number < 0) number = galleryItems.length - 1;
    updateModal(number);
    return;
}

function onArrowRightClick() {
    let number = Number(galleryModalImgRef.dataset.index);
    number += 1; 
    if (number > galleryItems.length - 1) number = 0;
    updateModal(number);
    return;
}

function updateModal(number) {
    galleryModalImgRef.dataset.index = number;
    galleryModalImgRef.src = "";
    galleryModalImgRef.src = arrOfImg[number];
}