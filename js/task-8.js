import galleryItems from './gallery-items.js';

const galleryRef = document.querySelector('.js-gallery');

const galleryMarkup = createGalleryItemsMarkup(galleryItems);
galleryRef.insertAdjacentHTML('beforeend', galleryMarkup);

const galleryModalRef = document.querySelector('.js-lightbox');
const galleryModalImgRef = galleryModalRef.querySelector('.lightbox__image');
const closeBtnRef = galleryModalRef.querySelector('[data-action]');
const overlayRef = galleryModalRef.querySelector ('.lightbox__overlay');

galleryRef.addEventListener('click', onGalleryElementClick);   

function createGalleryItemsMarkup(galleryItems) {
    return galleryItems.map(({ preview, original, description}, index) => {
        return `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img class="gallery__image" src="${preview}"
                data-source="${original}" data-index="${index+1}" alt="${description}" />
        </a>
    </li>`;
    })
        .join('');
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

    window.addEventListener('keydown', (event) => {
        if (event.code === 'Escape') onCloseBtnClick();
        if (event.code === 'ArrowLeft') onArrowLeftClick();
        if (event.code === 'ArrowRight') onArrowRightClick();
    });

    overlayRef.addEventListener('click', (event) => {
        if (event.currentTarget === event.target) onCloseBtnClick()
    });
}

function onCloseBtnClick(event) {
    galleryModalRef.classList.remove('is-open');
    galleryModalImgRef.src = '';
    closeBtnRef.removeEventListener('click', onCloseBtnClick);
    window.removeEventListener('keydown', onCloseBtnClick);
    overlayRef.removeEventListener('click', onCloseBtnClick);
}

function onArrowLeftClick(event) {
    let number = Number(galleryModalImgRef.dataset.index);
    galleryModalImgRef.src = '';
    galleryModalImgRef.src = galleryItems[number - 2].original;
    return;
}

function onArrowRightClick(event) {
    let number = Number(galleryModalImgRef.dataset.index);
    galleryModalImgRef.src = '';
    galleryModalImgRef.src = galleryItems[number + 2].original;
    return;
}