import React from 'react'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'

import CameraRollSelector, { PhotoProps } from './PhotoSelector'

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
          groupTypes="SavedPhotos"
          loadingOption={{
            initialLoader: (
              <View>
                <Text>Initializing...</Text>
              </View>
            ),
          }}
          imageListOption={{
            ListEmptyComponent: (
              <Text>
                no photos... If there are any images in your album,
                please check your app permissions
              </Text>
            ),
          }}
        />
      </View>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container: { width: '100%', height: '100%' },
})
