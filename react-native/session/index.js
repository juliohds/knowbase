/*
    Creates a session only state, that can be access outside React Native components.
*/

const state = {}

const allowedKeys = [] // place your allowed keys here or leave it empty for any key be allowed

export const setValues = payload => {
  try {
    for (const key in payload) {
      if (!payload[key]) continue

      if (allowedKeys && !allowedKeys.includes(key)) {
        throw Error(`Invalid request, setValues, key: ${key}`)
      }

      state[key] = payload[key]
    }
  } catch (err) {
    throw err
  }
}

export const getValue = (key, defaultValue = null) => {
  try {
    if (allowedKeys && !allowedKeys.includes(key)) {
      throw Error(`Invalid request, getValue, key: ${key}`)
    }

    return state[key] || defaultValue
  } catch (err) {
    throw err
  }
}

export const getValues = (keys, defaultValue = null) => {
  try {
    const result = {}

    for (const key of keys) {
      if (allowedKeys && !allowedKeys.includes(key)) {
        throw Error(`Invalid request, getValues, key: ${key}`)
      }

      result[key] = state[key] || defaultValue
    }

    return result
  } catch (err) {
    throw err
  }
}

export const removeValue = key => {
  try {
    if (allowedKeys && !allowedKeys.includes(key)) {
      throw Error(`Invalid request, removeValue, key: ${key}`)
    }

    delete state[key]
  } catch (err) {
    throw err
  }
}

export const clear = () => {
  for (key in state) {
    delete state[key]
  }
}

export default {
  getValue,
  getValues,
  setValues,
  removeValue,
  clear
}
