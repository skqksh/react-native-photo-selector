import React, { Fragment } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { RNCameraProps } from 'react-native-camera'

import { PhotoSelectorOptions, PhotoProps } from '../index'
import ImageItem from './Item'
import CameraButton from './CameraButton'

export interface RowProps {
  rowIndex: number
  selectedMarker?: ((index: number) => JSX.Element) | JSX.Element
  imageMargin: number
  imagesPerRow: number
  containerWidth?: number
  rowData: (PhotoProps | PhotoSelectorOptions | null)[]
  selectedIndexOf: number[]
  selectImage: (item: PhotoProps) => void
  takePhoto: (item: PhotoProps) => void
  cameraButtonIcon?: JSX.Element
  cameraPreviewProps?: RNCameraProps
  cameraPreviewStyle?: ViewStyle
  cameraFlipIcon?: JSX.Element
  cameraCaptureIcon?: JSX.Element
}

const Row = ({
  rowIndex,
  selectedMarker,
  imageMargin,
  imagesPerRow,
  containerWidth,
  rowData,
  selectedIndexOf,
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
    selectedIndex: number
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
    return (
      <ImageItem
        item={item}
        selectedIndex={selectedIndex}
        isSelected={selectedIndex > -1}
        imageMargin={imageMargin}
        selectedMarker={selectedMarker}
        imagesPerRow={imagesPerRow}
        containerWidth={containerWidth}
        onClick={selectImage}
      />
    )
  }
  const items = rowData.map((item, index) => {
    return (
      <Fragment key={`photo-selector-row-${rowIndex}-${index}`}>
        {item && renderImage(item, selectedIndexOf[index])}
      </Fragment>
    )
  })

  return (
    <View key={`photo-selector-row-${rowIndex}`} style={styles.row}>
      {items}
    </View>
  )
}

export default Row

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
  },
})
