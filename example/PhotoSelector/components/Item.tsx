import React, { useEffect, useState } from 'react'
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native'

import { PhotoProps } from '../index'

const { width: windowWidth } = Dimensions.get('window')

export interface ItemProps {
  item: PhotoProps
  selectedIndex: number
  isSelected: boolean
  selectedMarker: (index: number) => JSX.Element
  imageMargin: number
  imagesPerRow: number
  containerWidth?: number
  onClick: (item: PhotoProps) => void
  setZoomImage: React.Dispatch<
    React.SetStateAction<string | undefined>
  >
}

const Item = ({
  item,
  selectedIndex,
  isSelected,
  selectedMarker,
  imageMargin,
  imagesPerRow,
  containerWidth,
  onClick,
  setZoomImage,
}: ItemProps): JSX.Element => {
  const CheckIconImageZoom = (): JSX.Element => {
    return <View style={styles.checkIconImageZoom} />
  }

  const [imageSize, setImageSize] = useState<number>(0)

  useEffect(() => {
    let width = windowWidth
    if (typeof containerWidth !== 'undefined') {
      width = containerWidth
    }
    setImageSize(
      (width - (imagesPerRow + 1) * imageMargin) / imagesPerRow
    )
  }, [])

  function _handleClick(item: PhotoProps): void {
    onClick(item)
  }

  return (
    <TouchableOpacity
      style={{
        marginBottom: imageMargin,
        marginRight: imageMargin,
      }}
      onPress={(): void => {
        _handleClick(item)
      }}
      onLongPress={(): void => {
        setZoomImage(item.uri)
      }}
    >
      <Image
        source={{ uri: item.uri }}
        style={{ height: imageSize, width: imageSize }}
      />
      {isSelected ? (
        selectedMarker(selectedIndex + 1)
      ) : (
        <CheckIconImageZoom />
      )}
    </TouchableOpacity>
  )
}

export default Item

const styles = StyleSheet.create({
  checkIconImageZoom: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 5,
    right: 5,
    width: 25,
    height: 25,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#888',
  },
})
