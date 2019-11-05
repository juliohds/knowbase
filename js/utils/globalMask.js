export const MASCARA_CPF = '###.###.###-##'
export const MASCARA_CNPJ = '##.###.###/####-##'
export const MASCARA_DATA = '##/##/####'
export const MASCARA_DATA_MES_ANO = '##/####'
export const MASCARA_CEP = '##.###-###'
export const MASCARA_INTEIRO = '###.###.###.###.###'
export const MASCARA_REAL = MASCARA_INTEIRO + ',##'
export const MASCARA_FONE = '##-####-####'
export const MASCARA_FONE3 = '##-####-####'
export const MASCARA_FONE2 = '####-####'
export const MASCARA_FATOR = '#,#################'
export const MASCARA_REAL_COM_PONTO = '#######.##'
export const MASCARA_ESTADO = '##.#'
export const MASCARA_CONTA = '############-#'

export const formatRegexMask = (value, mask, alignment = 'D') => {
  let returnValue = '' + value
  returnValue = returnValue.replace(/\D/g, '')
  let size = returnValue.length
  let aux = ''

  if (alignment === 'D') {
    let sizeMask = mask.length - 1
    for (let i = size - 1; i >= 0; i--) {
      let letter = returnValue.charAt(i)
      if (letter >= '0' && letter <= '9') {
        aux = letter + aux
        let sizeAux = aux.length
        letter = mask.charAt(sizeMask - sizeAux)
        let sizeSpecial = aux.replace(/\D/g, '').length
        if (letter !== '#' && size > sizeSpecial) {
          aux = letter + aux
        }
      }
    }
  }
  if (aux !== '') {
    returnValue = aux
  }
  return returnValue
}

export const unFormat = (value) => {
  try {
    if (value === undefined || value === null || value === isNaN) return 0
    const x = value.replace(/\./g, '')
    return x.replace(',', '.')
  } catch (error) {
    return value
  }
}

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
