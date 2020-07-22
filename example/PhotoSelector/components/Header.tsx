import React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'

export interface HeaderProps {
  hearderContainerStyle?: ViewStyle
  hearderLeftStyle?: ViewStyle
  hearderLeftComponent?: JSX.Element
  hearderCenterStyle?: ViewStyle
  hearderCenterComponent?: JSX.Element
  hearderRightStyle?: ViewStyle
  hearderRightComponent?: JSX.Element
}

const Header = (props: HeaderProps): JSX.Element => {
  return (
    <View
      style={[
        styles.hearderContainerStyle,
        props?.hearderContainerStyle,
      ]}
    >
      <View
        style={[styles.hearderLeftStyle, props?.hearderLeftStyle]}
      >
        {props?.hearderLeftComponent}
      </View>
      <View
        style={[styles.hearderCenterStyle, props?.hearderCenterStyle]}
      >
        {props?.hearderCenterComponent}
      </View>
      <View
        style={[styles.hearderRightStyle, props?.hearderRightStyle]}
      >
        {props?.hearderRightComponent}
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  hearderContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  hearderLeftStyle: {},
  hearderCenterStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hearderRightStyle: {},
})
