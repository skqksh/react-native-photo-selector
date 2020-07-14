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
import 'mobx-react-lite/batchingForReactDom'

import CheckIcon from './components/CheckIcon'

import ImageItem from './components/Item'
import CameraButton from './components/CameraButton'
import CommonStore from './store/CommonStore'

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
  loadingMoreLoader?: JSX.Element
  loadingMoreContainerStyle?: ViewStyle
  useCamera?: boolean
  cameraButtonIcon?: JSX.Element
  cameraPreviewProps?: RNCameraProps
  cameraPreviewStyle?: ViewStyle
  cameraFlipIcon?: JSX.Element
  cameraCaptureIcon?: JSX.Element
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
    ...rest
  } = props

  const [lastCursor, setLastCursor] = useState<string>()
  const [initialLoading, setInitialLoading] = useState<boolean>(true)
  const [loadingMore, setLoadingMore] = useState<boolean>(false)
  const [noMore, setNoMore] = useState<boolean>(false)
  const [data, setData] = useState<
    (PhotoProps | PhotoSelectorOptions)[]
  >([])

  const [zoomImage, setZoomImage] = useState<string>()

  useEffect(() => {
    CommonStore.localSelected = selected
    CommonStore.localSelectedUri = selected.map((o) => o.uri)
    if (useCamera) setData([{ type: 'camera' }])
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

      setData((ori) => {
        return init
          ? useCamera
            ? [{ type: 'camera' }, ...asstesImages]
            : asstesImages
          : ori.concat(asstesImages)
      })
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

  function selectImage(image: PhotoProps): void {
    const { localSelected, localSelectedUri } = CommonStore
    const index = localSelectedUri.indexOf(image.uri)

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

    CommonStore.localSelected = localSelected
    CommonStore.localSelectedUri = localSelected.map((o) => o.uri)
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
    item: PhotoProps | PhotoSelectorOptions
  ): JSX.Element {
    if ('uri' in item) {
      return (
        <ImageItem
          {...{
            item,
            imageMargin,
            selectedMarker,
            imagesPerRow,
            containerWidth: props.containerWidth,
            onClick: selectImage,
            setZoomImage,
          }}
        />
      )
    }

    return (
      <CameraButton
        {...{
          imageMargin,
          imagesPerRow,
          containerWidth: props.containerWidth,
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

  const {
    emptyTextStyle,
    loader,
    loadingMoreLoader,
    loadingMoreContainerStyle,
  } = rest

  if (initialLoading) {
    return (
      <View style={[styles.loader, { backgroundColor }]}>
        {loader || <ActivityIndicator size="large" />}
      </View>
    )
  }

  const flatListOrEmptyText =
    data.length > 0 ? (
      <FlatList
        style={{ flex: 1 }}
        initialNumToRender={initialNumToRender}
        onEndReached={onEndReached}
        renderItem={({ item }): JSX.Element =>
          item ? renderRow(item) : <View />
        }
        numColumns={imagesPerRow}
        keyExtractor={(item, i): string => `photo-selector-${i}`}
        data={data}
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
        <View
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
          }}
        >
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
        </View>
      </Modal>
      {loadingMore && (
        <View
          style={
            loadingMoreContainerStyle ||
            styles.loadingMoreContainerStyle
          }
        >
          {loadingMoreLoader || <ActivityIndicator size="large" />}
        </View>
      )}
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
  loadingMoreContainerStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffffAA',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
