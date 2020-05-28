import React, { useEffect, useState } from 'react'
import {
  Platform,
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TextStyle,
} from 'react-native'
import CameraRoll from '@react-native-community/cameraroll'
import Row from './components/Row'

export interface PhotoProps {
  filename: string
  uri: string
  height: number
  width: number
  fileSize: number
  isStored?: boolean | undefined
  playableDuration: number
}

export interface PhotoSelectorProps {
  initialNumToRender?: number
  groupTypes?: CameraRoll.GroupType
  maximum?: number
  assetType?: CameraRoll.AssetType
  selectSingleItem?: boolean
  imagesPerRow?: number
  imageMargin?: number
  containerWidth?: number
  callback: (
    selectedImages: PhotoProps[],
    currentImage: PhotoProps
  ) => void
  selected?: any[]
  selectedMarker?: JSX.Element
  backgroundColor?: string
  emptyText?: string
  emptyTextStyle?: TextStyle
  loader?: JSX.Element
}

// helper functions
const arrayObjectIndexOf = (
  array: PhotoProps[],
  value: string
): number => array.map((o) => o.uri).indexOf(value)

const nEveryRow = (
  data: CameraRoll.PhotoIdentifier[],
  n: number
): (CameraRoll.PhotoIdentifier | null)[][] => {
  const result = []
  let temp = []

  for (let i = 0; i < data.length; ++i) {
    if (i > 0 && i % n === 0) {
      result.push(temp)
      temp = []
    }
    temp.push(data[i])
  }

  if (temp.length > 0) {
    while (temp.length !== n) {
      temp.push(null)
    }
    result.push(temp)
  }

  return result
}

const PhotoSelector = (props: PhotoSelectorProps): JSX.Element => {
  const {
    initialNumToRender = 5,
    groupTypes = 'SavedPhotos',
    maximum = 15,
    imagesPerRow = 3,
    imageMargin = 5,
    selectSingleItem = false,
    assetType = 'Photos',
    backgroundColor = 'white',
    callback = (): void => {
      return
    },
    selected = [],
    emptyText = 'No photos.',
    ...rest
  } = props
  const [images, setImages] = useState<CameraRoll.PhotoIdentifier[]>(
    []
  )
  const [lastCursor, setLastCursor] = useState<string>()
  const [initialLoading, setInitialLoading] = useState<boolean>(true)
  const [loadingMore, setLoadingMore] = useState<boolean>(false)
  const [noMore, setNoMore] = useState<boolean>(false)
  const [data, setData] = useState<
    (CameraRoll.PhotoIdentifier | null)[][]
  >([])
  useEffect(() => {
    fetch()
  }, [])

  function onEndReached(): void {
    if (!noMore) {
      fetch()
    }
  }

  function appendImages(data: CameraRoll.PhotoIdentifiersPage): void {
    const assets = data.edges

    if (!data.page_info.has_next_page) {
      setNoMore(true)
    }

    if (assets.length > 0) {
      setLastCursor(data.page_info.end_cursor)
      const newImages = images.concat(assets)
      setImages(newImages)
      const rows = nEveryRow(newImages, imagesPerRow)
      if (rows) setData(rows)
    }

    setLoadingMore(false)
    setInitialLoading(false)
  }

  function fetch(): void {
    if (!loadingMore) {
      setLoadingMore(true)
      doFetch()
    }
  }

  function doFetch(): void {
    const fetchParams: CameraRoll.GetPhotosParams = {
      first: 100,
      groupTypes: groupTypes,
      assetType: assetType,
    }

    if (Platform.OS === 'android') {
      // not supported in android
      delete fetchParams.groupTypes
    }

    if (lastCursor) {
      fetchParams.after = lastCursor
    }

    CameraRoll.getPhotos(fetchParams).then((data) =>
      appendImages(data)
    )
  }

  function selectImage(image: PhotoProps): void {
    const index = arrayObjectIndexOf(selected, image.uri)

    if (index >= 0) {
      selected.splice(index, 1)
    } else {
      if (selectSingleItem) {
        selected.splice(0, selected.length)
      }
      if (selected.length < maximum) {
        selected.push(image)
      }
    }

    setData(nEveryRow(images, imagesPerRow))

    callback(selected, image)
  }

  function renderRow(
    item: (CameraRoll.PhotoIdentifier | null)[]
  ): JSX.Element {
    // item is an array of objects
    const isSelected = item.map((imageItem) => {
      if (!imageItem) return false
      const { uri } = imageItem.node.image
      return arrayObjectIndexOf(selected, uri) >= 0
    })
    return (
      <Row
        rowData={item}
        isSelected={isSelected}
        selectImage={selectImage}
        imagesPerRow={imagesPerRow}
        containerWidth={props.containerWidth}
        imageMargin={imageMargin}
        selectedMarker={props.selectedMarker}
      />
    )
  }

  function renderFooterSpinner(): JSX.Element {
    return noMore ? <View /> : <ActivityIndicator />
  }

  const { emptyTextStyle, loader } = rest

  if (initialLoading) {
    return (
      <View style={[styles.loader, { backgroundColor }]}>
        {loader || <ActivityIndicator />}
      </View>
    )
  }

  const flatListOrEmptyText =
    data.length > 0 ? (
      <FlatList
        style={{ flex: 1 }}
        ListFooterComponent={renderFooterSpinner}
        initialNumToRender={initialNumToRender}
        onEndReached={onEndReached}
        renderItem={({ item }): JSX.Element => renderRow(item)}
        keyExtractor={(item, i): string =>
          item[0] ? `${item[0].node.image.uri}-${i}` : `${i}`
        }
        data={data}
        extraData={selected}
      />
    ) : (
      <Text style={[{ textAlign: 'center' }, emptyTextStyle]}>
        {emptyText}
      </Text>
    )

  return (
    <View
      style={[
        styles.wrapper,
        { padding: imageMargin, paddingRight: 0, backgroundColor },
      ]}
    >
      {flatListOrEmptyText}
    </View>
  )
}

export default PhotoSelector

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
  },
  loader: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
