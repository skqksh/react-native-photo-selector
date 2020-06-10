import React, { useEffect, useState } from 'react'
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { PhotoProps } from '../index'

const CheckIcon = (): JSX.Element => {
  return <View style={styles.checkIcon} />
}

export interface ItemProps {
  item: PhotoProps
  selected: boolean
  selectedMarker: any
  imageMargin: number
  imagesPerRow: number
  containerWidth?: number
  onClick: (item: PhotoProps) => void
}

const Item = ({
  item,
  selected,
  selectedMarker,
  imageMargin,
  imagesPerRow,
  containerWidth,
  onClick,
}: ItemProps): JSX.Element => {
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

  function _handleClick(item: PhotoProps): void {
    onClick(item)
  }

  const marker = selectedMarker || <CheckIcon />

  return (
    <TouchableOpacity
      style={{
        marginBottom: imageMargin,
        marginRight: imageMargin,
      }}
      onPress={(): void => _handleClick(item)}
    >
      <Image
        source={{ uri: item.uri }}
        style={{ height: imageSize, width: imageSize }}
      />
      {selected ? marker : null}
    </TouchableOpacity>
  )
}

export default Item

const styles = StyleSheet.create({
  checkIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: '#18a0fb',
  },
})
