import { FormValidator } from './FormValidator.js'
import { Card } from './Card.js'
import {popupElement, openPopup, closePopup} from './utils.js'

const infoUserButton = document.querySelector('.profile__info-user-button')
const infoUserName = document.querySelector('.profile__info-user-name')
const infoUserStatus = document.querySelector('.profile__info-user-status')
const popups = document.querySelectorAll('.popup')
const popupProfile = document.querySelector('.popup-profile')
const popupProfileClosebutton = document.querySelector('.popup-profile__close-button')
const popupProfileNameInput = document.querySelector('.popup-profile__name-input')
const popupProfileJobInput = document.querySelector('.popup-profile__job-input')
const popupProfileForm = document.querySelector('.popup-profile__form')
const elements = document.querySelector('.elements')
const popupAddElem = document.querySelector('.popup-add-elem')
const profileAddButton = document.querySelector('.profile__add-button')
const popupAddElemCloseButton = document.querySelector('.popup-add-elem__close-button')
const popupAddElemNameInput = document.querySelector('.popup-add-elem__name-input')
const popupAddElemLinkInput = document.querySelector('.popup-add-elem__link-input')
const popupAddElemForm = document.querySelector('.popup-add-elem__form')
const popupElementCloseButton = popupElement.querySelector('.popup-element__close-button')
const formInputTypeError = document.querySelectorAll('.form__input-error') 
const formInputError =  document.querySelectorAll('.form__input') 
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]


const validationConfig = {
  inputElement: '.form__input',
  submit: '.form__submit',
  inputElementTypeError: 'form__input_type_error',
  errorElementActive: 'form__input-error_active',
  SubmitInactive: 'form__submit_inactive'
}


const editProfileValidator = new FormValidator(validationConfig, popupProfileForm)
const addCardValidator = new FormValidator(validationConfig, popupAddElemForm)


const renderCard = (data, wrap) => {
  const card = new Card(data)
  
  wrap.prepend(card.createCard(data))
}

function saveProfileInfo(evt) {
  evt.preventDefault()
  infoUserName.textContent = popupProfileNameInput.value
  infoUserStatus.textContent = popupProfileJobInput.value
  closePopup(popupProfile)
}

function saveElemInfo(evt) {
  evt.preventDefault()
  const popupAddElemInputValue = {
    name: popupAddElemNameInput.value.slice(0, 1).toUpperCase() + popupAddElemNameInput.value.slice(1),
    link: popupAddElemLinkInput.value
  }
  const card = new Card(popupAddElemInputValue)
  elements.prepend(card.createCard(popupAddElemInputValue))
  popupAddElemNameInput.value = ''
  popupAddElemLinkInput.value = ''
  closePopup(popupAddElem)
}


infoUserButton.addEventListener('click', function() {
  openPopup(popupProfile)
  editProfileValidator.enableValidation()
  popupProfileNameInput.value = infoUserName.textContent
  popupProfileJobInput.value = infoUserStatus.textContent
})

profileAddButton.addEventListener('click', function() {
  openPopup(popupAddElem)
  addCardValidator.clearPopupValues()
  addCardValidator.enableValidation()
  popupAddElemNameInput.value = ''
  popupAddElemLinkInput.value = ''
})

popupProfileClosebutton.addEventListener('click', function() {
  closePopup(popupProfile)
})

popupAddElemCloseButton.addEventListener('click', function() {
  closePopup(popupAddElem)
})

popupElementCloseButton.addEventListener('click', function() {
  closePopup(popupElement)
})


popups.forEach((popup) => {
  popup.addEventListener('click', function(event) {
    if(event.target === event.currentTarget){
      closePopup(popup)
    }
  })
})


popupProfileForm.addEventListener('submit', saveProfileInfo)


popupAddElemForm.addEventListener('submit', saveElemInfo)



initialCards.forEach((data) => {
  renderCard(data, elements)
})

