import React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';

import CameraRollSelector, {PhotoProps} from 'react-native-photo-selector';

const App = () => {
  const _callback = (images: PhotoProps[], image: PhotoProps) => {
    console.log('selected images :', images);
    console.log('current image :', image);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <CameraRollSelector
          callback={_callback}
          maximum={3}
          imagesPerRow={3}
          imageMargin={5}
          useCamera={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {width: '100%', height: '100%'},
});
