export const formataCPFCNPJ = (value) => {
  value = value.replace(/\D/g, '')
  value = value.replace(/[^0-9]/g, '')
  if (value.length <= 11) {
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  } else {
    value = value.replace(/^(\d{2})(\d)/, '$1.$2')
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    value = value.replace(/\.(\d{3})(\d)/, '.$1/$2')
    value = value.replace(/(\d{4})(\d)/, '$1-$2')
  }
  return value
}

export const mascaraTelefone = (value) => {
  let ddd
  let stop
  if (value.length > 2) {
    ddd = value.charAt(0) + value.charAt(1)
  }
  if (ddd <= '99') {
    value = value
      .replace(/[^\d]/g, '')
      .replace(/^(\d\d)(\d)/, '($1) $2')
      .replace(/(\d{5})(\d{4})/, '$1-$2')
    if (value.length > 15) value = stop
    else stop = value
  }
  if (value.length === 13) {
    value = value
      .replace(/[^\d]/g, '')
      .replace(/^(\d\d)(\d)/, '($1) $2')
      .replace(/(\d{4})(\d{4})/, '$1-$2')
    if (value.length > 14) value = stop
    else stop = value
  }
  return value
}
