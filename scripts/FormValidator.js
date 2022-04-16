export class FormValidator {
  constructor(settings, form) {
    this._settings = settings
    this._form = form
  }

  _showInputError(inputElem, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElem.id}-error`)
    inputElem.classList.add(this._settings.inputElementTypeError)
    errorElement.textContent = errorMessage
    errorElement.classList.add(this._settings.errorElementActive)
  }

  _hideInputError(inputElem) {
    const errorElement = this._form.querySelector(`.${inputElem.id}-error`)
    inputElem.classList.remove(this._settings.inputElementTypeError)
    errorElement.classList.remove(this._settings.errorElementActive)
    errorElement.textContent = ''
  }
  
  _checkInputValidity(inputElem) {
    if (!inputElem.validity.valid) {
      this._showInputError(inputElem, inputElem.validationMessage)
    } else {
        this._hideInputError(inputElem)
      }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElem) => {
      return !inputElem.validity.valid
    })
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._settings.SubmitInactive)
      buttonElement.setAttribute('disabled', true)
    } else {
      buttonElement.classList.remove(this._settings.SubmitInactive)
      buttonElement.removeAttribute('disabled', true)
    }
  }

  _setEventListeners() {
    const inputList = Array.from(this._form.querySelectorAll(this._settings.inputElement))
    const buttonElement = this._form.querySelector(this._settings.submit)
    this._toggleButtonState(inputList, buttonElement)
    inputList.forEach((inputElem) => {
      this._checkInputValidity(inputElem)
      inputElem.addEventListener('input', () => {
        this._checkInputValidity(inputElem)
        this._toggleButtonState(inputList, buttonElement)
      })
    })
  }

  enableValidation() {
    this._form.addEventListener('submit', function (evt) {
      evt.preventDefault()
    })
    this._setEventListeners()
  }
}