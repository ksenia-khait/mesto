export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', closePopupByEsc);
}

function closePopupByEsc(event) {
  if(event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', closePopupByEsc);
}

