# react-native-photo-selector

CameraRoll Picker component for React native

## DEMO

### usecamera(option)

<a href="https://github.com/skqksh/react-native-photo-selector/blob/master/demo/photovideo.gif"><img src="https://lh3.googleusercontent.com/pw/ACtC-3cyhUsKHVt-QsEI3X1PEN5e4itjoURHT_wQYJyaZlHiIHyDW3G8L-2TkH6whRfPLjjoeJvq8WUpGuUDLk0CYLsUBCsO5pHIFSZzgA23PnFryjngdxAVRv5NlenZJwCZWBoqBtqHgCSxO1fff__731cD=w222-h480-no?authuser=0" width="350"></a>

## Add to Project

- Install Dependency libraries with Android & IOS settings
  - [react-native-camera](https://github.com/react-native-community/react-native-camera)
  - [react-native-cameraroll](https://github.com/react-native-community/react-native-cameraroll)

```
$ npm i @react-native-community/cameraroll react-native-camera
```

- Install component through npm

```
$ npm i react-native-photo-selector
```

## Basic Usage

```js
import PhotoSelector, { PhotoProps } from 'react-native-photo-selector';

...
const Demo = () => {
    const _callback = (images: PhotoProps[], image: PhotoProps) => {
        console.log('selected images :', images);
        console.log('current image :', image);
    };

    return <PhotoSelector callback={_callback} />
}

```

## Props (\* : required)

#### (\*)`callback` : Callback function when images was selected. Return a selected image array and current selected image.

#### `initialNumToRender` : How many items to render in the initial batch

#### `groupTypes` : The group where the photos will be fetched

#### `assetType` : The asset type

#### `selected` : Already be selected images array. (Default: [])

#### `selectSingleItem` : Boolean to select only one single image at time.

#### `maximum` : Maximum number of selected images.

#### `imagesPerRow` : Number of images per row.

##### `imageMargin` : Margin size of one image.

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

#### `imageZoom` (Deprecated 2.0.4 < ) : Set camera preview style.

#### `zoomImageCloseButton` : Set button component of zoom-image

#### `zoomImageCloseContainerStyle` : Set constainer style of zoom-image button


## Props (\* : required)

| Props                        | type                                          | default                              | etc                                                                             |
| ---------------------------- | --------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------- |
| \*callback                   | func                                          |                                      | (selectedImages:PhotoProps[],currentImage:PhotoProps)=>void                     |
| initialNumToRender           | number                                        | 5                                    | Flatlist's props                                                                |
| groupTypes                   | CameraRoll.GroupType                          | "SavedPhotos"                        | "Album" , "All" , "Event" , "Faces" , "Library" , "PhotoStream" , "SavedPhotos" |
| assetType                    | CameraRoll.GroupType                          | "Photos"                             | "ALL" , "Videos" , "Photos"                                                     |
| selected                     | any[]                                         | []                                   | Set array with which is returned by callback                                    |
| selectSingleItem             | boolean                                       | false                                | If `true` , `maximum` option is ignored                                         |
| maximum                      | number                                        | 15                                   | To use this option, `selectSingleItem` option must be `false`                   |
| imagesPerRow                 | number                                        | 3                                    | Not Recommend to be over 10                                                     |
| imageMargin                  | number                                        | 5                                    | :)                                                                              |
| containerWidth               | number                                        | window.width                         | You can use react-native Dimensions to get window width                         |
| selectedMarker               | JSX.Element \| (selected:number)=>JSX.Element | 'circle mark'                        | 'selected' is starts from 1                                                     |
| backgroundColor              | string                                        | 'white'                              | :)                                                                              |
| emptyText                    | string                                        | "No photos."                         | :)                                                                              |
| emptyTextStyle               | TextStyle                                     | `textAlign: 'center'`                | :)                                                                              |
| loader                       | JSX.Element                                   | `<ActivityIndicator size="large" />` | It's located at bottom of the photos                                            |
| loadingMoreLoader            | JSX.Element                                   | `<ActivityIndicator size="large" />` | It's located in center of the window                                            |
| loadingMoreContainerStyle    | ViewStyle                                     |                                      |                                                                                 |
| useCamera                    | boolean                                       | false                                |                                                                                 |
| cameraButtonIcon             | JSX.Element                                   | Camera png image                     |                                                                                 |
| cameraPreviewProps           | RNCameraProps                                 |                                      | Props of the `react-native-camera`                                              |
| cameraPreviewStyle           | ViewStyle                                     |                                      |                                                                                 |
| cameraFlipIcon               | JSX.Element                                   | Flip png image                       |                                                                                 |
| cameraCaptureIcon            | JSX.Element                                   | Circle mark                          |                                                                                 |
| imageZoom                    | boolean                                       | false                                | Deprecated 2.0.4 <                                                              |
| imageZoom(Deprecated)        | boolean                                       | false                                | Deprecated 2.0.4 <                                                              |
| zoomImageCloseButton         | JSX.Element                                   | close image                          |                                                                                 |
| zoomImageCloseContainerStyle | ViewStyle                                     |                                      |                                                                                 |

## Run Example

- To run the example app, you have to check the *permissions* of the app

```
$ git clone https://github.com/skqksh/react-native-photo-selector
$ cd react-native-photo-selector
$ cd example
$ npm install
$ npm run android
```

## Sample usecase

<a href="https://github.com/skqksh/react-native-photo-selector/blob/master/demo/sample.gif"><img src="https://lh3.googleusercontent.com/bRVPIcqRYsIebCu_zTbZ14ObD9LmVVO99yLLO1d4WcS-mVpBrnYAj_P9h8xAY8rfGccOaZ5HEIFbcMwKh_MwokRLTcGn6GGb9CeGaqDbKg92NHC2KimHfTK6fkC3ORXdvb_SI8EiIKp5NFhJve97jJm5V7wJmj7d4AD1xNa6PEqqVjK26emx4u3S1J4eRnRThwvA6IZjAtsVj9gjRq8lrt891fKWFxLlBq-o9ecaaYo4uNRlyqqXKKBd-n7f9ca8WE8PyFIR12IlT1m7CBBD0DBzmaz8WSGO0o14cHzZChnWrwyOJ_KWjr36gi2ZqoEKMMwBTWV4NwZwPNsMc5aXZ2cWOZmKLntpFxOrL67eYVawjpc7HL3TBJt8jRdfo-GulTQ4oL-XM6hq0OSgNm6DAifBoOaCTF_BKgTglNN-f8NToBWseTky7DO22QLPg1ZQFz071mvHnHakm1iW_wZpxb-eDpeEMjwbTnPIjiZHNPFC7Cs4nTrFC1wqtsi69dWI_or_D-8tkgtVmvY9xso7IlFOh965kZ-oahKqYMxg6ET_gyWdrQ0Ieca0KPMorb18_nGL6bP4utmInK5kROZgb5eM9lChw5bvDL9U1Ud7uxqPvJxdIg4RqtLpSQYbquvqCGITqC1ppJtwwFkezybGYMgsjcymyQ--1cZk6YRTKDt3mcqb0aI5YHzXjpMYhQ=w366-h794-no?authuser=0" width="350"></a>

## ETC

- Typescript Support
- This library is based from [react-native-camera-roll-picker](https://www.npmjs.com/package/react-native-camera-roll-picker)
