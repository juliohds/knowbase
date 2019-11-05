import React from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import Colors from '../../themes/colors'

import styles from './styles'

export default function Loader({color, size, text, style}) {
  return (
    <View style={[
      styles.container,
      styles.horizontal,
      style || { backgroundColor: Colors.white }
    ]}>
      <ActivityIndicator
        size={size || 'large'}
        color={color || Colors.blueCerulean }
      />
      {
        text &&
        <Text
          size={size || 'large'}
          color={color ||  Colors.blueCerulean }
          style={{ color: color ||  Colors.blueCerulean }}
        >
          {text}
        </Text>
      }
    </View>
  )
}

