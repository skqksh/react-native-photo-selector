import React from 'react'
import { StyleSheet, View } from 'react-native'
import CameraRoll from '@react-native-community/cameraroll'

import ImageItem from './Item'

export interface RowProps {
  selectedMarker: any
  imageMargin: number
  imagesPerRow: number
  containerWidth?: number
  rowData: (CameraRoll.PhotoIdentifier | null)[]
  isSelected: boolean[]
  selectImage: (item: {
    filename: string
    uri: string
    height: number
    width: number
    fileSize: number
    isStored?: boolean | undefined
    playableDuration: number
  }) => void
}

const Row = ({
  selectedMarker,
  imageMargin,
  imagesPerRow,
  containerWidth,
  rowData,
  isSelected,
  selectImage,
}: RowProps): JSX.Element => {
  function renderImage(item: any, selected: boolean): JSX.Element {
    const { uri } = item.node.image
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
