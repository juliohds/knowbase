const baseValidator = (data, callback) => {
  const value = callback(data)

  if (!value) throw Error("Required value(s) not found")

  return value
}

const COIN_SELECTED = {
  name: 'coin_selected',
  validator: data => baseValidator(data, v => v.moeda ? v.moeda.sigla : v.sigla)
}

export default {
  COIN_SELECTED,
}
