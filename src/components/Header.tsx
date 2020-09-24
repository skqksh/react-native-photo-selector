import React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'

export interface HeaderProps {
  headerContainerStyle?: ViewStyle
  headerLeftStyle?: ViewStyle
  headerLeftComponent?: JSX.Element
  headerCenterStyle?: ViewStyle
  headerCenterComponent?: JSX.Element
  headerRightStyle?: ViewStyle
  headerRightComponent?: JSX.Element
}

const Header = (props: HeaderProps): JSX.Element => {
  return (
    <View
      style={[
        styles.headerContainerStyle,
        props?.headerContainerStyle,
      ]}
    >
      <View style={[styles.headerLeftStyle, props?.headerLeftStyle]}>
        {props?.headerLeftComponent}
      </View>
      <View
        style={[styles.headerCenterStyle, props?.headerCenterStyle]}
      >
        {props?.headerCenterComponent}
      </View>
      <View
        style={[styles.headerRightStyle, props?.headerRightStyle]}
      >
        {props?.headerRightComponent}
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  headerContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  headerLeftStyle: {},
  headerCenterStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRightStyle: {},
})
