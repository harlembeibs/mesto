import {popupElement, popupElementImage, popupElementTitle, openPopup} from './utils.js'

export class Card {
  constructor(data, selector) {
    this._name = data.name
    this._link = data.link
    this._elementTemplate = selector
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
      popupElementImage.src = this._link
      popupElementTitle.textContent = this._name
      popupElementImage.alt = `Вид на ${this._name}`

      openPopup(popupElement)
    })
  }

  createCard() {
    this._element = this._elementTemplate.querySelector('.element').cloneNode(true);
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