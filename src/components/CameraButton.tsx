import React, { useEffect, useState } from 'react'
import {
  View,
  ViewStyle,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native'
import { RNCameraProps } from 'react-native-camera'

import { PhotoProps } from '../index'
import CameraScreen from './CameraScreen'

interface CameraButtonProps {
  imageMargin: number
  imagesPerRow: number
  containerWidth?: number
  takePhoto: (item: PhotoProps) => void
  cameraButtonIcon?: JSX.Element
  cameraPreviewProps?: RNCameraProps
  cameraPreviewStyle?: ViewStyle
  cameraFlipIcon?: JSX.Element
  cameraCaptureIcon?: JSX.Element
}

const CameraButton = ({
  imageMargin,
  imagesPerRow,
  containerWidth,
  takePhoto,
  cameraButtonIcon,
  cameraPreviewProps,
  cameraPreviewStyle,
  cameraFlipIcon,
  cameraCaptureIcon,
}: CameraButtonProps): JSX.Element => {
  const [showModal, setShowModal] = useState(false)
  const [imageSize, setImageSize] = useState<number>(0)

  useEffect(() => {
    let { width } = Dimensions.get('window')

    if (typeof containerWidth !== 'undefined') {
      width = containerWidth
    }
    setImageSize(
      (width - (imagesPerRow + 1) * imageMargin) / imagesPerRow
    )
  }, [])

  return (
    <>
      <TouchableOpacity
        style={{
          marginBottom: imageMargin,
          marginRight: imageMargin,
          backgroundColor: '#18a0fb',
        }}
        onPress={(): void => {
          setShowModal(true)
        }}
      >
        <View
          style={{
            height: imageSize,
            width: imageSize,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
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
