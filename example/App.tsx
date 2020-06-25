import React from 'react'
import { SafeAreaView, View, StyleSheet } from 'react-native'

import CameraRollSelector, {
  PhotoProps,
} from 'react-native-photo-selector'

const App = (): JSX.Element => {
  const _callback = (
    images: PhotoProps[],
    image: PhotoProps
  ): void => {
    console.log('selected images :', images) // eslint-disable-line
    console.log('current image :', image) // eslint-disable-line
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <CameraRollSelector
          callback={_callback}
          maximum={3}
          assetType="All"
          groupTypes="All"
          imagesPerRow={3}
          imageMargin={5}
          useCamera={true}
          imageZoom={true}
        />
      </View>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container: { width: '100%', height: '100%' },
})
