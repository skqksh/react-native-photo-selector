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
  imageZoom: boolean
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
  imageZoom,
  setZoomImage,
}: ItemProps): JSX.Element => {
  const CheckIconImageZoom = (): JSX.Element => {
    return imageZoom ? (
      <TouchableOpacity
        style={styles.checkIconImageZoom}
        onPress={(): void => _handleClick(item)}
      />
    ) : (
      <View />
    )
  }
  const SelectedMarker = (): JSX.Element => {
    return imageZoom ? (
      <TouchableOpacity
        onPress={(): void => {
          _handleClick(item)
        }}
        style={styles.selectedMarkerTouchable}
      >
        {selectedMarker(selectedIndex + 1)}
      </TouchableOpacity>
    ) : (
      selectedMarker(selectedIndex + 1)
    )
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
        imageZoom ? setZoomImage(item.uri) : _handleClick(item)
      }}
    >
      <Image
        source={{ uri: item.uri }}
        style={{ height: imageSize, width: imageSize }}
      />
      {isSelected ? <SelectedMarker /> : <CheckIconImageZoom />}
    </TouchableOpacity>
  )
}

export default Item

const styles = StyleSheet.create({
  selectedMarkerTouchable: {
    right: 0,
    width: 40,
    height: 40,
    elevation: 1,
    position: 'absolute',
  },
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
