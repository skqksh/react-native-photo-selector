import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native'

import CameraScreen, { CameraScreenProps } from './CameraScreen'

export interface CameraProps extends CameraScreenProps {
  cameraButtonIcon?: JSX.Element
}

const CameraButton = ({
  takePhoto,
  cameraButtonIcon,
  cameraPreviewProps,
  cameraPreviewStyle,
  cameraFlipIcon,
  cameraCaptureIcon,
}: CameraProps & { takePhoto: () => void }): JSX.Element => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <TouchableOpacity
        onPress={(): void => {
          setShowModal(true)
        }}
      >
        <View>
          {cameraButtonIcon || (
            <View style={styles.cameraIconCon}>
              <Image
                source={require('../assets/camera-icon.png')}
                style={styles.cameraIcon}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
      <Modal
        visible={showModal}
        onRequestClose={(): void => {
          setShowModal(false)
        }}
      >
        <CameraScreen
          {...{
            takePhoto,
            setShowModal,
            cameraPreviewProps,
            cameraPreviewStyle,
            cameraFlipIcon,
            cameraCaptureIcon,
          }}
        />
      </Modal>
    </>
  )
}

export default CameraButton

const styles = StyleSheet.create({
  cameraIconCon: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 60,
  },
  cameraIcon: {
    width: 30,
    height: 30,
  },
})
