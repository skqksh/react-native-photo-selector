import React, { useEffect, useState } from 'react'
import {
  Modal,
  Platform,
  StyleSheet,
  View,
  ViewStyle,
  Text,
  FlatList,
  ActivityIndicator,
  TextStyle,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native'
import CameraRoll from '@react-native-community/cameraroll'
import { RNCameraProps } from 'react-native-camera'
import ImageZoom from 'react-native-image-pan-zoom'
import CheckIcon from './components/CheckIcon'

import Row from './components/Row'

const { width: windowWidth, height: windowHeight } = Dimensions.get(
  'window'
)

export interface PhotoSelectorOptions {
  type: 'camera'
}

export interface PhotoProps {
  filename: string
  uri: string
  height: number
  width: number
  fileSize?: number
  isStored?: boolean | undefined
  playableDuration?: number
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
  selectedMarker?: ((index: number) => JSX.Element) | JSX.Element
  backgroundColor?: string
  emptyText?: string
  emptyTextStyle?: TextStyle
  loader?: JSX.Element
  useCamera?: boolean
  cameraButtonIcon?: JSX.Element
  cameraPreviewProps?: RNCameraProps
  cameraPreviewStyle?: ViewStyle
  cameraFlipIcon?: JSX.Element
  cameraCaptureIcon?: JSX.Element
  imageZoom?: boolean
}

// helper functions
const arrayObjectIndexOf = (
  array: PhotoProps[],
  value: string
): number => array.map((o) => o.uri).indexOf(value)

const nEveryRow = (
  data: (PhotoProps | PhotoSelectorOptions)[],
  n: number,
  useCamera: boolean
): (PhotoProps | PhotoSelectorOptions | null)[][] => {
  if (useCamera) data = [{ type: 'camera' }, ...data]
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
    useCamera = false,
    cameraButtonIcon,
    cameraPreviewProps,
    cameraPreviewStyle,
    cameraFlipIcon,
    cameraCaptureIcon,
    imageZoom = false,
    ...rest
  } = props
  const [images, setImages] = useState<PhotoProps[]>([])
  const [localSelected, setLocalSelected] = useState<PhotoProps[]>(
    selected
  )
  const [lastCursor, setLastCursor] = useState<string>()
  const [initialLoading, setInitialLoading] = useState<boolean>(true)
  const [loadingMore, setLoadingMore] = useState<boolean>(false)
  const [noMore, setNoMore] = useState<boolean>(false)
  const [data, setData] = useState<
    (PhotoProps | PhotoSelectorOptions | null)[][]
  >([])

  const [zoomImage, setZoomImage] = useState<string>()

  useEffect(() => {
    fetch()
  }, [])

  function onEndReached(): void {
    if (!noMore) {
      fetch()
    }
  }

  function appendImages({
    data,
    init,
  }: {
    data: CameraRoll.PhotoIdentifiersPage
    init?: boolean
  }): void {
    const assets = data.edges

    if (!data.page_info.has_next_page) {
      setNoMore(true)
    }

    if (assets.length > 0) {
      const asstesImages = assets.map(({ node: { image } }) => {
        return image
      })
      setLastCursor(data.page_info.end_cursor)
      const newImages = init
        ? asstesImages
        : images.concat(asstesImages)
      setImages(newImages)
      const rows = nEveryRow(newImages, imagesPerRow, useCamera)
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

  function doFetch(init?: boolean): void {
    const fetchParams: CameraRoll.GetPhotosParams = {
      first: 100,
      groupTypes: groupTypes,
      assetType: assetType,
    }

    if (Platform.OS === 'android') {
      // not supported in android
      delete fetchParams.groupTypes
    }

    fetchParams.after = init ? undefined : lastCursor

    CameraRoll.getPhotos(fetchParams).then((data) =>
      appendImages({ data, init })
    )
  }

  function selectImage(
    image: PhotoProps,
    oriImages?: PhotoProps[]
  ): void {
    const index = arrayObjectIndexOf(localSelected, image.uri)

    if (index >= 0) {
      localSelected.splice(index, 1)
    } else {
      if (selectSingleItem) {
        localSelected.splice(0, localSelected.length)
      }
      if (localSelected.length < maximum) {
        localSelected.push(image)
      }
    }

    setData(nEveryRow(oriImages || images, imagesPerRow, useCamera))
    setLocalSelected(localSelected)
    callback(localSelected, image)
  }

  const selectedMarker = (index: number): JSX.Element => {
    const { selectedMarker } = props
    if (selectedMarker) {
      if (typeof selectedMarker === 'function') {
        return selectedMarker(index)
      } else {
        return selectedMarker
      }
    }

    return <CheckIcon index={index} />
  }

  function takePhoto(): void {
    doFetch(true)
  }

  function renderRow(
    item: (PhotoProps | PhotoSelectorOptions | null)[],
    rowIndex: number
  ): JSX.Element {
    // item is an array of objects
    const selectedIndexOf = item.map((imageItem) => {
      if (imageItem !== null && 'uri' in imageItem) {
        const { uri } = imageItem
        return arrayObjectIndexOf(localSelected, uri)
      }
      return -1
    })
    return (
      <Row
        {...{
          rowIndex,
          rowData: item,
          selectedIndexOf,
          selectImage,
          takePhoto,
          imagesPerRow,
          imageMargin,
          containerWidth: props.containerWidth,
          selectedMarker,
          cameraButtonIcon,
          cameraPreviewProps,
          cameraPreviewStyle,
          cameraFlipIcon,
          cameraCaptureIcon,
          imageZoom,
          setZoomImage,
        }}
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
        renderItem={({ item, index }): JSX.Element =>
          renderRow(item, index)
        }
        keyExtractor={(item, i): string => `photo-selector-${i}`}
        data={data}
        extraData={selected}
      />
    ) : (
      <Text style={[{ textAlign: 'center' }, emptyTextStyle]}>
        {emptyText}
      </Text>
    )

  return (
    <>
      <View
        style={[
          styles.wrapper,
          { padding: imageMargin, paddingRight: 0, backgroundColor },
        ]}
      >
        {flatListOrEmptyText}
      </View>
      <Modal
        visible={!!zoomImage}
        onRequestClose={(): void => {
          setZoomImage(undefined)
        }}
      >
        {zoomImage && (
          <ImageZoom
            cropWidth={windowWidth}
            cropHeight={windowHeight}
            imageWidth={windowWidth}
            imageHeight={windowHeight}
            enableSwipeDown={true}
            onSwipeDown={(): void => {
              setZoomImage(undefined)
            }}
          >
            <Image
              style={{
                width: windowWidth,
                height: windowHeight,
              }}
              resizeMode="contain"
              resizeMethod="scale"
              source={{
                uri: zoomImage,
              }}
            />
          </ImageZoom>
        )}
        <TouchableOpacity
          style={styles.close}
          onPress={(): void => {
            setZoomImage(undefined)
          }}
        >
          <Image
            source={require('./assets/close.png')}
            style={{ width: '100%', height: '100%' }}
          />
        </TouchableOpacity>
      </Modal>
    </>
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
  close: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: 30,
    height: 30,
  },
})
