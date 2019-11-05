import firebase from 'react-native-firebase'
import eventEnums from './events'

import { Alert } from "react-native"

let _analytics = null;

const analytics = () => {
  if (!_analytics) {
    _analytics = firebase.analytics()

    _analytics.setAnalyticsCollectionEnabled(true)
  }

  return _analytics
}


export const events = eventEnums

export const logEvent = ({ name, validator }, data) => {
  try {
    const params = {}

    if (data) params.value = validator ? validator(data) : data

    analytics().logEvent(name, params)

  } catch (err) {
    console.log(err)
    throw err
  }
}

