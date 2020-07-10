import React, { useEffect, useState } from 'react'
import {
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { observer } from 'mobx-react'

import { PhotoProps } from '../index'
import CommonStore from '../store/CommonStore'

const { width: windowWidth } = Dimensions.get('window')

export interface ItemProps {
  item: PhotoProps
  selectedMarker: (index: number) => JSX.Element
  imageMargin: number
  imagesPerRow: number
  containerWidth?: number
  onClick: (item: PhotoProps) => void
  setZoomImage: React.Dispatch<
    React.SetStateAction<string | undefined>
  >
}

const Item = observer(
  ({
    item,
    selectedMarker,
    imageMargin,
    imagesPerRow,
    containerWidth,
    onClick,
    setZoomImage,
  }: ItemProps): JSX.Element => {
    const { localSelectedUri } = CommonStore
    const selectedIndex =
      localSelectedUri.length > 0
        ? localSelectedUri.indexOf(item.uri)
        : -1

    const CheckIconImageZoom = (): JSX.Element => {
      return (
        <TouchableOpacity
          style={styles.checkIconImageZoom}
          onPress={(): void => _handleClick(item)}
        />
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
          setZoomImage(item.uri)
        }}
      >
        <Image
          source={{ uri: item.uri }}
          style={{ height: imageSize, width: imageSize }}
        />

        <TouchableOpacity
          onPress={(): void => {
            _handleClick(item)
          }}
          style={styles.selectedMarkerTouchable}
        >
          {selectedIndex > -1 ? (
            selectedMarker(selectedIndex + 1)
          ) : (
            <CheckIconImageZoom />
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }
)

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
