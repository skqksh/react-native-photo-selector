import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { observer } from 'mobx-react'

import CommonStore from '../store/CommonStore'

import { PhotoProps } from '../index'

export interface ItemProps {
  item: PhotoProps
  selectedMarker: (index: number) => JSX.Element
  imageMargin: number
  imageSize: number
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
    imageSize,
    onClick,
    setZoomImage,
  }: ItemProps): JSX.Element => {
    const { localSelected } = CommonStore

    const selectedIndex = localSelected
      .map((x) => x.uri)
      .indexOf(item.uri)
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
        <FastImage
          source={{ uri: item.uri }}
          style={{ height: imageSize, width: imageSize }}
          resizeMode={FastImage.resizeMode.cover}
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
            <View style={styles.selectMarker} />
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
  selectMarker: {
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
