import React, { useEffect, useState, useRef } from 'react'
import {
  Modal,
  StyleSheet,
  View,
  ViewStyle,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  StyleProp,
} from 'react-native'
import CameraRoll from '@react-native-community/cameraroll'
import ImageZoom from 'react-native-image-pan-zoom'
import _ from 'lodash'

import CheckIcon from './components/CheckIcon'

import Header, { HeaderProps } from './components/Header'
import ImageItem from './components/Item'
import CameraButton, { CameraProps } from './components/CameraButton'
import FolderList, { FolderProps } from './components/FolderList'
import CommonStore from './store/CommonStore'

const { width: windowWidth, height: windowHeight } = Dimensions.get(
  'window'
)

export interface PhotoProps {
  filename: string | null
  uri: string
  height: number
  width: number
  fileSize: number | null
  playableDuration: number | null
}

interface ImageListProps {
  initialNumToRender?: number
  containerWidth?: number
  containerStyle?: StyleProp<ViewStyle>
  ListEmptyComponent?: JSX.Element
  imagesPerRow?: number
  imageMargin?: number
}

interface ZoomImageProps {
  closeButton?: JSX.Element
  closeContainerStyle?: ViewStyle
}

interface LoadingProps {
  initialLoader?: JSX.Element
}

export interface PhotoSelectorProps {
  maximum?: number
  assetType?: CameraRoll.AssetType
  selectSingleItem?: boolean
  callback: (
    selectedImages: PhotoProps[],
    currentImage: PhotoProps
  ) => void
  selectedImagesUri?: string[]
  selectedMarker?: ((index: number) => JSX.Element) | JSX.Element
  loadingOption?: LoadingProps
  zoomImageOption?: ZoomImageProps
  imageListOption?: ImageListProps
  cameraOption?: CameraProps
  headerOption?: HeaderProps
}

const PhotoSelector = (props: PhotoSelectorProps): JSX.Element => {
  const {
    maximum = 15,
    selectSingleItem = false,
    assetType = 'Photos',
    callback = (): void => {
      return
    },
    selectedImagesUri = [],
    zoomImageOption,
    imageListOption,
    loadingOption,
    cameraOption,
    headerOption,
  } = props

  const [lastCursor, setLastCursor] = useState<string>()
  const [initialLoading, setInitialLoading] = useState<boolean>(true)
  const [loadingMore, setLoadingMore] = useState<boolean>(false)
  const [hasNextPage, setPageInfo] = useState<boolean>(true)
  const [data, setData] = useState<PhotoProps[]>([])

  const [zoomImage, setZoomImage] = useState<string>()

  const [imageSize, setImageSize] = useState<number>(0)

  const [showFolderList, setShowFolderList] = useState<boolean>(false)
  const [groupName, setGroupName] = useState<string>()
  const [folderList, setForderList] = useState<FolderProps[]>([])

  const flatListRef = useRef<FlatList>(null)

  const imagesPerRow = imageListOption?.imagesPerRow
    ? imageListOption.imagesPerRow
    : 3
  const imageMargin = imageListOption?.imageMargin
    ? imageListOption.imageMargin
    : 5

  function _setImageSize(): void {
    let width = windowWidth
    const containerWidth = imageListOption?.containerWidth
    if (containerWidth) {
      width = containerWidth
    }

    setImageSize(
      (width - (imagesPerRow - 1) * imageMargin * 2)
      / imagesPerRow
    );
  }

  function _addFolderList(props: {
    index: number
    title: string
    groupName?: string
    count: number | string
  }): void {
    CameraRoll.getPhotos({
      first: 1,
      groupName: props.groupName,
      groupTypes: props.groupName ? 'Album' : 'All',
      assetType: assetType,
    }).then(({ edges }) => {
      if (edges.length > 0) {
        setForderList((ori) =>
          ori.concat([
            {
              ...props,
              mainImageUrl: edges[0].node.image.uri,
            },
          ])
        )
      }
    })
  }

  function _getAlbum(): void {
    if (Platform.OS === 'ios') {
      const getPhotoMax = 100
      CameraRoll.getPhotos({
        first: getPhotoMax,
        assetType,
        groupTypes: 'All',
      }).then((result) => {
        const { length } = result.edges

        _addFolderList({
          title: 'All',
          index: 0,
          count: `${length}${length < getPhotoMax ? '' : '+'}`,
        })
      })
    }

    CameraRoll.getAlbums({
      assetType,
    }).then((list) => {
      // All
      if (Platform.OS !== 'ios') {
        _addFolderList({
          title: 'All',
          index: 0,
          count: _.sum(list.map((x) => x.count)),
        })
      }

      // Folder List
      _.forEach(
        list,
        async (item: { title: string; count: number }, index) => {
          _addFolderList({
            ...item,
            index: index + 1,
            groupName: item.title,
          })
        }
      )
    })
  }

  useEffect(() => {
    const defaultLocaleSelected: PhotoProps[] = _.map(
      selectedImagesUri,
      (uri) => ({
        filename: null,
        uri,
        height: 0,
        width: 0,
        fileSize: null,
        playableDuration: null,
      })
    )
    CommonStore.localSelected = defaultLocaleSelected
    _setImageSize()
    _getAlbum()
  }, [])

  useEffect(() => {
    _resetGetPhotos()
  }, [groupName])

  function _resetGetPhotos(): void {
    setData([])
    getPhotosWithCameraRoll(true)
  }
  function _onEndReached(): void {
    fetch()
  }

  function fetch(): void {
    if (!loadingMore) {
      getPhotosWithCameraRoll()
    }
  }

  function getPhotosWithCameraRoll(init?: boolean): void {
    if (hasNextPage || init) {
      setLoadingMore(true)
      const fetchParams: CameraRoll.GetPhotosParams = {
        first: 100,
        groupTypes: groupName ? 'Album' : 'All',
        assetType: assetType,
        groupName,
      }

      fetchParams.after = init ? undefined : lastCursor

      CameraRoll.getPhotos(fetchParams).then(
        ({ page_info, edges }) => {
          setPageInfo(page_info.has_next_page)
          setLastCursor(page_info.end_cursor)
          const asstesImages = edges.map(({ node: { image } }) => {
            return image
          })
          setData((ori) =>
            init ? asstesImages : ori.concat(asstesImages)
          )
          setLoadingMore(false)
          setInitialLoading(false)
        }
      )
    }
  }

  function selectImage(image: PhotoProps): void {
    const { localSelected } = CommonStore
    const index = localSelected.map((x) => x.uri).indexOf(image.uri)

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
    callback(localSelected, image)
  }

  function takePhoto(): void {
    _resetGetPhotos()
  }

  const HeaderCenter = (): JSX.Element => {
    return (
      <TouchableOpacity
        onPress={(): void => {
          setShowFolderList(!showFolderList)
        }}
      >
        <Text>
          {groupName || 'All'} {showFolderList ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>
    )
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

  if (initialLoading) {
    return (
      <>
        {loadingOption?.initialLoader || (
          <View style={styles.loader}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </>
    )
  }

  return (
    <>
      <Header
        headerContainerStyle={headerOption?.headerContainerStyle}
        headerLeftStyle={headerOption?.headerLeftStyle}
        headerLeftComponent={
          headerOption?.headerLeftComponent || (
            <View style={{ width: 20 }} />
          )
        }
        headerCenterStyle={headerOption?.headerCenterStyle}
        headerCenterComponent={
          headerOption?.headerCenterComponent || <HeaderCenter />
        }
        headerRightStyle={headerOption?.headerRightStyle}
        headerRightComponent={
          headerOption?.headerRightComponent || (
            <CameraButton
              {...{
                takePhoto,
                ...cameraOption,
              }}
            />
          )
        }
      />
      {showFolderList ? (
        <FolderList
          {...{ folderList, setGroupName, setShowFolderList }}
        />
      ) : (
        <>
          <FlatList
            ref={flatListRef}
            contentContainerStyle={[{
              padding: imageMargin,
            }, imageListOption?.containerStyle]}
            initialNumToRender={imageListOption?.initialNumToRender}
            onEndReachedThreshold={0.5}
            onEndReached={_onEndReached}
            renderItem={({ item }): JSX.Element => (
              <ImageItem
                {...{
                  item,
                  imageMargin,
                  selectedMarker,
                  imageSize,
                  onClick: selectImage,
                  setZoomImage,
                }}
              />
            )}
            numColumns={imagesPerRow}
            keyExtractor={(item, i): string => `photo-selector-${i}`}
            data={data}
            ListEmptyComponent={
              <>
                {!loadingMore && (
                  <>
                    {imageListOption?.ListEmptyComponent || (
                      <Text style={{ textAlign: 'center' }}>
                        No Photos...
                      </Text>
                    )}
                  </>
                )}
              </>
            }
            ListFooterComponent={
              <>{hasNextPage && <ActivityIndicator size="large" />}</>
            }
          />
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
              style={[
                styles.close,
                zoomImageOption?.closeContainerStyle,
              ]}
              onPress={(): void => {
                setZoomImage(undefined)
              }}
            >
              {zoomImageOption?.closeButton || (
                <Image
                  source={require('./assets/close.png')}
                  style={{ width: '100%', height: '100%' }}
                />
              )}
            </TouchableOpacity>
          </Modal>
        </>
      )}
    </>
  )
}

export default PhotoSelector

const styles = StyleSheet.create({
  loader: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  close: {
    position: 'absolute',
    right: 30,
    top: 40,
    width: 30,
    height: 30,
  },
})
