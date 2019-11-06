
/*
   For handling the use of both session and local storages.
*/


// a good fit with the encrypt module.
import { encrypt, decrypt } from '../encrypt'

const sessionStorage = window.sessionStorage
const localStorage = window.localStorage
const prefix = '<YOUR_PREFIX_HERE>'


export const setItem = (key, value, { session = false } = {}) => {
  try {
    const storage = session ? sessionStorage : localStorage

    value = encrypt(value)

    storage.setItem(`${prefix}-${key}`, value)

  } catch (err) {
    throw err
  }
}

export const getItem = (key, defaultValue = null) => {
  try {
    let item = localStorage.getItem(`${prefix}-${key}`)

    if (!item) item = sessionStorage.getItem(`${prefix}-${key}`)

    item = item ? decrypt(item) : defaultValue

    return item

  } catch (err) {
    throw err
  }
}

export const removeItem = key => {
  sessionStorage.removeItem(`${prefix}-${key}`)
  localStorage.removeItem(`${prefix}-${key}`)
}

export default {
  setItem,
  getItem,
  removeItem
}