/*
    For the use of navigation outside React Native components.
*/

// https://www.npmjs.com/package/react-navigation
import { NavigationActions } from 'react-navigation'

let _dispatch

function setTopLevelDispatcher (dispatchRef) {
  if (!_dispatch) {
    _dispatch = dispatchRef
  }
}

function pop (numberPages = 1) {
  return _dispatch(
    NavigationActions.pop(numberPages)
  )
}

function popToTop () {
  return _dispatch(
    NavigationActions.popToTop()
  )
}

function navigate (routeName, params) {
  return _dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  )
}

function resetStack (routeName, params) {
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName, params })]
  })
  return _dispatch(resetAction)
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelDispatcher,
  resetStack,
  pop,
  popToTop
}
