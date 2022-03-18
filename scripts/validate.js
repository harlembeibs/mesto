const showInputError = (formElement, inputElem, errorMessage, inputElementTypeError, errorElementActive) => {
  const errorElement = formElement.querySelector(`.${inputElem.id}-error`)
  inputElem.classList.add(inputElementTypeError)
  errorElement.textContent = errorMessage
  errorElement.classList.add(errorElementActive)
}

const hideInputError = (formElement, inputElem, inputElementTypeError, errorElementActive) => {
  const errorElement = formElement.querySelector(`.${inputElem.id}-error`)
  inputElem.classList.remove(inputElementTypeError)
  errorElement.classList.remove(errorElementActive)
  errorElement.textContent = ''
}

const checkInputValidity = (formElement, inputElem, inputElementTypeError, errorElementActive) => {
  if (!inputElem.validity.valid) {
    showInputError(formElement, inputElem, inputElem.validationMessage, inputElementTypeError, errorElementActive)
  } else {
    hideInputError(formElement, inputElem, inputElementTypeError, errorElementActive)
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElem) => {
  return !inputElem.validity.valid
})
}

const toggleButtonState = (inputList, buttonElement, SubmitInactive) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(SubmitInactive)
    buttonElement.setAttribute('disabled', true)
  } else {
    buttonElement.classList.remove(SubmitInactive)
    buttonElement.removeAttribute('disabled', true)
  }
}

const setEventListeners = (formElement, inputElement, inputElementTypeError, errorElementActive, SubmitInactive, submit) => {
  const inputList = Array.from(formElement.querySelectorAll(inputElement))
  const buttonElement = formElement.querySelector(submit)
  toggleButtonState(inputList, buttonElement, SubmitInactive)
  inputList.forEach((inputElem) => {
    checkInputValidity(formElement, inputElem, inputElementTypeError, errorElementActive)
    inputElem.addEventListener('input', function () {
      checkInputValidity(formElement, inputElem, inputElementTypeError, errorElementActive)
      toggleButtonState(inputList, buttonElement, SubmitInactive)
    })
  })
}

const enableValidation = (object) => {
  const formList = Array.from(document.querySelectorAll(object.formInput))
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault()
    })
    setEventListeners(formElement, object.inputElement, object.inputElementTypeError, object.errorElementActive, object.SubmitInactive, object.submit)
  })
}

enableValidation({
  formInput: '.form',
  inputElement: '.form__input',
  submit: '.form__submit',
  inputElementTypeError: 'form__input_type_error',
  errorElementActive: 'form__input-error_active',
  SubmitInactive: 'form__submit_inactive'
})
