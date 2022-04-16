import {popupElement, popupElementImage, popupElementTitle, openPopup, elementTemplate} from './utils.js'

export class Card {
  constructor(data) {
    this._name = data.name
    this._link = data.link
  }

  _likeElement = () => {
    this._elementLikeButton.classList.toggle('element__like-button_active')
  }

  _deleteElement = () => {
    this._element.remove()
  }

  _addElementListeners = () => {
    this._elementLikeButton.addEventListener('click', this._likeElement)
    this._elementDeleteButton.addEventListener('click', this._deleteElement)
    this._elementPhoto.addEventListener('click', (evt) => {
      popupElementImage.src = evt.target.src
      popupElementTitle.textContent = evt.target.parentElement.textContent
      popupElementImage.alt = `Вид на ${popupElementTitle.textContent}`

      openPopup(popupElement)
    })
  }

  createCard() {
    this._element = elementTemplate.querySelector('.element').cloneNode(true);
    this._elementPhoto = this._element.querySelector('.element__photo')
    this._elementTitle = this._element.querySelector('.element__title')
    this._elementLikeButton = this._element.querySelector('.element__like-button')
    this._elementDeleteButton = this._element.querySelector('.element__delete-button')

    this._elementPhoto.src = this._link
    this._elementTitle.textContent = this._name
    this._elementPhoto.alt = `Вид на ${this._name}`

    this._addElementListeners()

    return this._element
  }
}