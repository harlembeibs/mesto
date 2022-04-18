export const popupElement = document.querySelector('.popup-element')
export const popupElementImage = popupElement.querySelector('.popup-element__image')
export const popupElementTitle = popupElement.querySelector('.popup-element__title')

export function escClosePopup(event) {
  if (event.key === 'Escape') {
    const popupForClose = document.querySelector('.popup_active')
    closePopup(popupForClose)
  }
}

export function closePopup(popup) {
  popup.classList.remove('popup_active')
  document.removeEventListener('keydown', escClosePopup)
}

export function openPopup(popup) {
  popup.classList.add('popup_active')
  document.addEventListener('keydown', escClosePopup)
}
