export const popupElement = document.querySelector('.popup-element')
export const popupElementImage = popupElement.querySelector('.popup-element__image')
export const popupElementTitle = popupElement.querySelector('.popup-element__title')
export const elementTemplate = document.querySelector('#elementTemplate').content

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

export function clearPopupValues(popup) {
  popup.querySelectorAll('.form__input-error').forEach((elm) => {
    elm.textContent = ''
  })
  popup.querySelectorAll('.form__input').forEach((elm) => {
    elm.classList.remove('form__input_type_error')
  })
}