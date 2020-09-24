import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Platform,
} from 'react-native'
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
  isZoomEnabled?: boolean
  setZoomImage: React.Dispatch<
    React.SetStateAction<string | undefined>
  >
}

const ImageComp = ({
  uri,
  imageSize,
}: {
  uri: string
  imageSize: number
}): JSX.Element => {
  return Platform.select({
    ios: (
      <Image
        source={{ uri }}
        style={{ height: imageSize, width: imageSize }}
        resizeMode={'cover'}
      />
    ),
    default: (
      <FastImage
        source={{ uri }}
        style={{ height: imageSize, width: imageSize }}
        resizeMode={FastImage.resizeMode.cover}
      />
    ),
  })
}

const Item = observer(
  ({
    item,
    selectedMarker,
    imageMargin,
    imageSize,
    onClick,
    isZoomEnabled,
    setZoomImage,
  }: ItemProps): JSX.Element => {
    const { localSelected } = CommonStore

    const selectedIndex = localSelected
      .map((x) => x.uri)
      .indexOf(item.uri)
    function _handleClick(item: PhotoProps): void {
      onClick(item)
    }

    const isSelected = selectedIndex > -1

    return (
      <TouchableOpacity
        style={{
          marginBottom: imageMargin,
          marginRight: imageMargin,
        }}
        onPress={(): void => {
          isZoomEnabled
            ? setZoomImage(item.uri)
            : onClick(item)
        }}
      >
        <ImageComp
          {...{
            uri: item.uri,
            imageSize,
          }}
        />

        <TouchableOpacity
          onPress={(): void => {
            _handleClick(item)
          }}
          style={styles.selectedMarkerTouchable}
        >
          {isSelected ? (
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
