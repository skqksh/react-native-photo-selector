## Props Detail (\* : required)

| Props                        | type                                          | default                              | etc                                                                 |
| ---------------------------- | --------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------- |
| \*callback                   | func                                          |                                      | (selectedImages:PhotoProps[],currentImage:PhotoProps)=>void         |
| initialNumToRender           | number                                        | 5                                    | Flatlist's props                                                    |
| groupTypes                   | CameraRoll.GroupType                          | "SavedPhotos"                        | "Album","All","Event","Faces","Library","PhotoStream","SavedPhotos" |
| assetType                    | CameraRoll.GroupType                          | "Photos"                             | "ALL","Videos","Photos"                                             |
| selected                     | any[]                                         | []                                   | Set array with which is returned by callback                        |
| selectSingleItem             | boolean                                       | false                                | If `true` ,`maximum` option is ignored                              |
| maximum                      | number                                        | 15                                   | To use this option,`selectSingleItem` option must be `false`        |
| imagesPerRow                 | number                                        | 3                                    | Not Recommend to be over 10                                         |
| imageMargin                  | number                                        | 5                                    | :)                                                                  |
| containerWidth               | number                                        | window.width                         | You can use react-native Dimensions to get window width             |
| selectedMarker               | JSX.Element \| (selected:number)=>JSX.Element | 'circle mark'                        | 'selected' is starts from 1                                         |
| backgroundColor              | string                                        | 'white'                              | :)                                                                  |
| emptyText                    | string                                        | "No photos."                         | :)                                                                  |
| emptyTextStyle               | TextStyle                                     | `textAlign: 'center'`                | :)                                                                  |
| loader                       | JSX.Element                                   | `<ActivityIndicator size="large" />` | It's located at bottom of the photos                                |
| loadingMoreLoader            | JSX.Element                                   | `<ActivityIndicator size="large" />` | It's located in center of the window                                |
| loadingMoreContainerStyle    | ViewStyle                                     |                                      |                                                                     |
| useCamera                    | boolean                                       | false                                |                                                                     |
| cameraButtonIcon             | JSX.Element                                   | Camera png image                     |                                                                     |
| cameraPreviewProps           | RNCameraProps                                 |                                      | Props of the `react-native-camera`                                  |
| cameraPreviewStyle           | ViewStyle                                     |                                      |                                                                     |
| cameraFlipIcon               | JSX.Element                                   | Flip png image                       |                                                                     |
| cameraCaptureIcon            | JSX.Element                                   | Circle mark                          |                                                                     |
| imageZoom(Deprecated)        | boolean                                       | false                                | Deprecated 2.0.4 <                                                  |
| zoomImageCloseButton         | JSX.Element                                   | close image                          |                                                                     |
| zoomImageCloseContainerStyle | ViewStyle                                     |                                      |                                                                     |

## Explanation

#### (\*)`callback` : Callback function when images was selected. Return a selected image array and current selected image.

#### `initialNumToRender` : How many items to render in the initial batch

#### `groupTypes` : The group where the photos will be fetched

#### `assetType` : The asset type

#### `selected` : Already be selected images array. (Default: [])

#### `selectSingleItem` : Boolean to select only one single image at time.

#### `maximum` : Maximum number of selected images.

#### `imagesPerRow` : Number of images per row.

#### `imageMargin` : Margin size of one image.

#### `containerWidth` : Width of camer roll picker container.

#### `selectedMarker` : Custom selected image marker component.

#### `backgroundColor` : Set background color.

#### `emptyText` : Text to display instead of a list when there are no photos found.

#### `emptyTextStyle` : Styles to apply to the `emptyText`.

#### `loader` : Loader component node.

#### `loadingMoreLoader` : Loader component node when Loading Images.

#### `loadingMoreContainerStyle` : loadingMoreLoader component container style.

#### `useCamera` : If use camera capture

#### `cameraButtonIcon` : cameraButtonIcon component node.

#### `cameraPreviewProps` : props of react-native-camera.

#### `cameraPreviewStyle` : Set camera preview style.

#### `cameraFlipIcon` : Set camera preview style.

#### `cameraCaptureIcon` : Set able to zoom image

#### `imageZoom` (Deprecated 2.0.4 < ) : Boolean to use image zoom

#### `zoomImageCloseButton` : Set button component of zoom-image

#### `zoomImageCloseContainerStyle` : Set constainer style of zoom-image button
