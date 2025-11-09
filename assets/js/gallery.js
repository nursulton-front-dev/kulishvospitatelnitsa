/* ==============================
   Галерея: фильтрация и лайтбокс
   ============================== */

(() => {
  const filterButtons = document.querySelectorAll('[data-filter]');
  const galleryItems = document.querySelectorAll('.gallery-item');

  const setActiveFilter = (targetButton) => {
    filterButtons.forEach((button) => button.classList.remove('active'));
    targetButton.classList.add('active');
  };

  const applyFilter = (filterValue) => {
    galleryItems.forEach((item) => {
      const matchesFilter =
        filterValue === 'all' || item.dataset.category === filterValue;
      item.classList.toggle('is-hidden', !matchesFilter);
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setActiveFilter(button);
      applyFilter(button.dataset.filter);
    });
  });

  const lightbox = document.querySelector('[data-lightbox]');
  if (!lightbox) {
    return;
  }

  const lightboxImage = lightbox.querySelector('.lightbox__image');
  const lightboxCaption = lightbox.querySelector('.lightbox__caption');
  const lightboxClose = lightbox.querySelector('.lightbox__close');
  let lastFocusedElement = null;

  const openLightbox = (imageSrc, description) => {
    if (!imageSrc) {
      return;
    }

    lastFocusedElement = document.activeElement;
    lightboxImage.src = imageSrc;
    lightboxImage.alt = description || '';
    lightboxCaption.textContent = description || '';

    lightbox.removeAttribute('hidden');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  };

  const closeLightbox = () => {
    lightbox.setAttribute('hidden', '');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
    document.body.style.overflow = '';

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  };

  document.querySelectorAll('.gallery-thumb').forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const previewImage = thumb.querySelector('img');
      if (!previewImage) {
        return;
      }

      const fullSrc = previewImage.dataset.full || previewImage.src;
      openLightbox(fullSrc, previewImage.alt);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !lightbox.hasAttribute('hidden')) {
      closeLightbox();
    }
  });
})();
