const infoUserButton = document.querySelector('.profile__info-user-button')
const infoUserName = document.querySelector('.profile__info-user-name')
const infoUserStatus = document.querySelector('.profile__info-user-status')
const popups = document.querySelectorAll('.popup')
const popupsCloseButton = document.querySelectorAll('.popup__close-button')
const popupsActive = document.querySelector('.popup_active')
const popupProfile = document.querySelector('.popup-profile')
const popupProfileClosebutton = document.querySelector('.popup-profile__close-button')
const popupProfileButton = document.querySelector('.popup-profile__button')
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
const popupElement = document.querySelector('.popup-element')
const popupElementCloseButton = popupElement.querySelector('.popup-element__close-button')
const popupElementImage = popupElement.querySelector('.popup-element__image')
const popupElementTitle = popupElement.querySelector('.popup-element__title')
const elementTemplate = document.querySelector('#elementTemplate').content
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

/**this function open popup */
function openPopup(popup) {
  popup.classList.add('popup_active')
  document.addEventListener('keydown', escClosePopup)
}

/**this function close popup */
function closePopup(popup) {
  popup.classList.remove('popup_active')
  document.removeEventListener('keydown', escClosePopup)
}

/**this function clear validation values */
function clearPopupValues(popup) {
  popup.querySelectorAll('.form__input-error').forEach((elm) => {
    elm.textContent = ''
  })
  popup.querySelectorAll('.form__input').forEach((elm) => {
    elm.classList.remove('form__input_type_error')
  })
}

/**this function close popup with escape */
function escClosePopup(event) {
  if (event.key === 'Escape') {
    const popupForClose = document.querySelector('.popup_active')
    closePopup(popupForClose)
  }
}

/**this function save profile info */
function saveProfileInfo(evt) {
  evt.preventDefault()
  infoUserName.textContent = popupProfileNameInput.value
  infoUserStatus.textContent = popupProfileJobInput.value
  closePopup(popupProfile)
}

/**this function save element info */
function saveElemInfo(evt) {
  evt.preventDefault()
  const popupAddElemInputValue = {
    name: popupAddElemNameInput.value.slice(0, 1).toUpperCase() + popupAddElemNameInput.value.slice(1),
    link: popupAddElemLinkInput.value
  }
  elements.prepend(createCard(popupAddElemInputValue))
  popupAddElemNameInput.value = ''
  popupAddElemLinkInput.value = ''
  closePopup(popupAddElem)
}
/**this function like element */
function likeElement(evt) {
  evt.target.classList.toggle('element__like-button_active')
}
/**this function delete element */
function deleteElement(evt) {
  evt.target.parentElement.remove()
}

/**this function create card */
function createCard(item) {
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const elementPhoto = element.querySelector('.element__photo')
  const elementTitle = element.querySelector('.element__title')
  elementPhoto.src = item.link
  elementTitle.textContent = item.name
  elementPhoto.alt = `Вид на ${item.name}`
  addElementListeners(element)
  return element
}

/**this function add element listeners */
function addElementListeners(elm) {
  elm.querySelector('.element__like-button').addEventListener('click', likeElement)
  elm.querySelector('.element__delete-button').addEventListener('click', deleteElement)
  elm.querySelector('.element__photo').addEventListener('click', function(evt) {
    const evtTarget = evt.target
    popupElementImage.src = evtTarget.src
    popupElementTitle.textContent = evtTarget.parentElement.textContent
    popupElementImage.alt = `Вид на ${popupElementTitle.textContent}`
    openPopup(popupElement)
    clearPopupValues()
  })
}



infoUserButton.addEventListener('click', function() {
  openPopup(popupProfile)
  clearPopupValues(popupProfileForm)
  popupProfileNameInput.value = infoUserName.textContent
  popupProfileJobInput.value = infoUserStatus.textContent
})


profileAddButton.addEventListener('click', function() {
  openPopup(popupAddElem)
  clearPopupValues(popupAddElemForm)
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


for (let i = 0; i < initialCards.length; i += 1) {
  elements.prepend(createCard(initialCards[i]))
}

