import React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { RNCameraProps } from 'react-native-camera'

import { PhotoSelectorOptions, PhotoProps } from '../index'
import ImageItem from './Item'
import CameraButton from './CameraButton'

export interface RowProps {
  selectedMarker: any
  imageMargin: number
  imagesPerRow: number
  containerWidth?: number
  rowData: (PhotoProps | PhotoSelectorOptions | null)[]
  isSelected: boolean[]
  selectImage: (item: PhotoProps) => void
  takePhoto: (item: PhotoProps) => void
  cameraButtonIcon?: JSX.Element
  cameraPreviewProps?: RNCameraProps
  cameraPreviewStyle?: ViewStyle
  cameraFlipIcon?: JSX.Element
  cameraCaptureIcon?: JSX.Element
}

const Row = ({
  selectedMarker,
  imageMargin,
  imagesPerRow,
  containerWidth,
  rowData,
  isSelected,
  selectImage,
  takePhoto,
  cameraButtonIcon,
  cameraPreviewProps,
  cameraPreviewStyle,
  cameraFlipIcon,
  cameraCaptureIcon,
}: RowProps): JSX.Element => {
  function renderImage(
    item: PhotoProps | PhotoSelectorOptions,
    selected: boolean
  ): JSX.Element {
    if ('type' in item) {
      return (
        <CameraButton
          {...{
            imageMargin,
            imagesPerRow,
            containerWidth,
            takePhoto,
            cameraButtonIcon,
            cameraPreviewProps,
            cameraPreviewStyle,
            cameraFlipIcon,
            cameraCaptureIcon,
          }}
        />
      )
    }
    const { uri } = item
    return (
      <ImageItem
        key={uri}
        item={item}
        selected={selected}
        imageMargin={imageMargin}
        selectedMarker={selectedMarker}
        imagesPerRow={imagesPerRow}
        containerWidth={containerWidth}
        onClick={selectImage}
      />
    )
  }
  const items = rowData.map((item, index) => {
    if (item === null) {
      return null
    }
    return renderImage(item, isSelected[index])
  })

  return <View style={styles.row}>{items}</View>
}

export default Row

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
  },
})
