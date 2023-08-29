import {
  setLocalStorageData,
  localStorageData,
  getLocalStorageData,
  modalClose,
  resetInputValue,
  checkUserAuth,
} from './main.js'

const loginInputEmail = document.querySelector('.login__email')
const loginInputPassword = document.querySelector('.login__password')
const loginSubmitBtn = document.querySelector('.login__submit')
const logInModal = document.querySelector('.login__modal')
const loginInputs = document.querySelectorAll('.login__input')

const isUserDataMatch = () => {
  const currentUser = localStorageData.reduce((acc, item) => {
    if (item.email === loginInputEmail.value || item.cardNumber === loginInputEmail.value) {
      acc = { ...item }
    }
    return acc
  }, {})

  const { email, cardNumber, password } = currentUser

  const isPasswordMatch = password === loginInputPassword.value
  const isCardNumberMatch = cardNumber === loginInputEmail.value
  const isEmailMatch = email === loginInputEmail.value

  const errorEmail = loginInputEmail.nextElementSibling
  const errorPassword = loginInputPassword.nextElementSibling
  let isMatch = false

  if (isEmailMatch || isCardNumberMatch) {
    errorEmail.innerHTML = ''

    if (!isPasswordMatch) {
      errorPassword.innerHTML = 'User with this password was not found'
      isMatch = false
    }
    else {
      errorPassword.innerHTML = ''
      isMatch = true
      setLocalStorageData(currentUser, 'currentUser')
    }
  }
  else {
    errorEmail.innerHTML = 'User with this email or card was not found'
    isMatch = false
  }

  return isMatch
}

const visitsCounter = () => {
  const currentUser = getLocalStorageData('currentUser')
  const users = getLocalStorageData('users')

  currentUser.visitsCount += 1
  setLocalStorageData(currentUser, 'currentUser')

  const userMatch = users.find(item => currentUser.email === item.email)
  userMatch.visitsCount += 1
  setLocalStorageData(users, 'users')
}

export const visitsCountShow = () => {
  const visitsCount = document.querySelectorAll('.visits__count')
  const currentUser = getLocalStorageData('currentUser')

  visitsCount.forEach(item => {
    item.innerHTML = currentUser?.visitsCount
  })
}

visitsCountShow()

loginSubmitBtn.addEventListener('click', (e) => {
  e.preventDefault()
  if (isUserDataMatch()) {
    modalClose(logInModal)
    resetInputValue(loginInputs)
    checkUserAuth()
    visitsCounter()
    visitsCountShow()
  }
})