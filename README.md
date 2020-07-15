# react-native-photo-selector

CameraRoll Picker component for React native

## DEMO

### usecamera(option)

<a href="https://github.com/skqksh/react-native-photo-selector/blob/master/demo/usecamera.gif"><img src="https://lh3.googleusercontent.com/pw/ACtC-3dMl3tpVQrndfeo8dorkJ387KITG5XI5QQzf-y3tSYRn-Fn898G32j8qg_Z7uktsV8FFPOmvC7eDU6Bq_MQwMG3dd-fuae4Z8Pxvx1HF9Awj9saYunQrDQmNhHHzt-ilNFWN3gc4ejtFvFqKM7F1eif=w222-h480-no?authuser=0" width="350"></a>

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

### (\*)`callback`

#### : Callback function when images was selected. Return a selected image array and current selected image.

| return         | value        |
| -------------- | ------------ |
| selectedImages | PhotoProps[] |
| currentImage   | PhotoProps   |

### `initialNumToRender`

#### : How many items to render in the initial batch

| type   | default | desc             |
| ------ | ------- | ---------------- |
| number | 5       | Flatlist's props |

### `groupTypes`

#### : The group where the photos will be fetched

| type                 | options                                                                         | default       |
| -------------------- | ------------------------------------------------------------------------------- | ------------- |
| CameraRoll.GroupType | "Album" , "All" , "Event" , "Faces" , "Library" , "PhotoStream" , "SavedPhotos" | "SavedPhotos" |

### `assetType`

#### : The asset type

| type                 | options                    | default  |
| -------------------- | -------------------------- | -------- |
| CameraRoll.GroupType | 'Photos', 'Videos' , 'All' | "Photos" |

### `selected`

#### : Already be selected images array. (Default: [])

| type  | default |
| ----- | ------- |
| any[] | []      |

### `selectSingleItem`

#### : Boolean to select only one single image at time.

| type    | default |
| ------- | ------- |
| boolean | false   |

### `maximum`

#### : Maximum number of selected images.

| type   | default |
| ------ | ------- |
| number | 15      |

### `imagesPerRow`

#### : Number of images per row.

| type   | default |
| ------ | ------- |
| number | 3       |

### `imageMargin`

#### : Margin size of one image.

| type   | default |
| ------ | ------- |
| number | 5       |

### `containerWidth`

#### : Width of camer roll picker container.

| type   | default        |
| ------ | -------------- |
| number | 'device width' |

### `selectedMarker`

#### : Custom selected image marker component.

| type                                                | default       | desc                              |
| --------------------------------------------------- | ------------- | --------------------------------- |
| JSX.Element \| (selectedNumber:number)=>JSX.Element | 'circle mark' | 'selectedNumber' is starts from 1 |

### `backgroundColor`

#### : Set background color.

| type   | default |
| ------ | ------- |
| string | 'white' |

### `emptyText`

#### : Text to display instead of a list when there are no photos found.

| type   | default      |
| ------ | ------------ |
| string | "No photos." |

### `emptyTextStyle`

#### : Styles to apply to the `emptyText`.

| type   | default               |
| ------ | --------------------- |
| string | `textAlign: 'center'` |

### `loader`

#### : Loader component node.

| type        | default                              |
| ----------- | ------------------------------------ |
| JSX.Element | `<ActivityIndicator size="large" />` |

### `loadingMoreLoader`

#### : Loader component node when Loading Images.

| type        | default                              |
| ----------- | ------------------------------------ |
| JSX.Element | `<ActivityIndicator size="large" />` |

### `loadingMoreContainerStyle`

#### : loadingMoreLoader component container style.

| type      |
| --------- |
| ViewStyle |

### `useCamera`

#### : If use camera capture

| type    | default |
| ------- | ------- |
| boolean | false   |

### `cameraButtonIcon`

#### : cameraButtonIcon component node.

| type        | default          |
| ----------- | ---------------- |
| JSX.Element | camera png image |

### `cameraPreviewProps`

#### : props of react-native-camera.

| type          |
| ------------- |
| RNCameraProps |

### `cameraPreviewStyle`

#### : Set camera preview style.

| type      |
| --------- |
| ViewStyle |

### `cameraFlipIcon`

#### : Set camera preview style.

| type        | default        |
| ----------- | -------------- |
| JSX.Element | flip png image |

### `cameraCaptureIcon`

#### : Set able to zoom image

| type        | default       |
| ----------- | ------------- |
| JSX.Element | 'circle mark' |

### `imageZoom` (Deprecated 2.0.4 < )

#### : Set camera preview style.

| type    | default |
| ------- | ------- |
| boolean | false   |

### `zoomImageCloseButton`

#### : Set button component of zoom-image

| type        | default     |
| ----------- | ----------- |
| JSX.Element | close image |

### `zoomImageCloseContainerStyle`

#### : Set constainer style of zoom-image button

| type      |
| --------- |
| ViewStyle |

## Run Example

- To run the example app, you have to check the permissions of the app

```
$ git clone https://github.com/skqksh/react-native-photo-selector
$ cd react-native-photo-selector
$ cd example
$ npm install
$ npm run android
```

## Sample usecase

<a href="https://github.com/skqksh/react-native-photo-selector/blob/master/demo/usecamera.gif"><img src="https://lh3.googleusercontent.com/bRVPIcqRYsIebCu_zTbZ14ObD9LmVVO99yLLO1d4WcS-mVpBrnYAj_P9h8xAY8rfGccOaZ5HEIFbcMwKh_MwokRLTcGn6GGb9CeGaqDbKg92NHC2KimHfTK6fkC3ORXdvb_SI8EiIKp5NFhJve97jJm5V7wJmj7d4AD1xNa6PEqqVjK26emx4u3S1J4eRnRThwvA6IZjAtsVj9gjRq8lrt891fKWFxLlBq-o9ecaaYo4uNRlyqqXKKBd-n7f9ca8WE8PyFIR12IlT1m7CBBD0DBzmaz8WSGO0o14cHzZChnWrwyOJ_KWjr36gi2ZqoEKMMwBTWV4NwZwPNsMc5aXZ2cWOZmKLntpFxOrL67eYVawjpc7HL3TBJt8jRdfo-GulTQ4oL-XM6hq0OSgNm6DAifBoOaCTF_BKgTglNN-f8NToBWseTky7DO22QLPg1ZQFz071mvHnHakm1iW_wZpxb-eDpeEMjwbTnPIjiZHNPFC7Cs4nTrFC1wqtsi69dWI_or_D-8tkgtVmvY9xso7IlFOh965kZ-oahKqYMxg6ET_gyWdrQ0Ieca0KPMorb18_nGL6bP4utmInK5kROZgb5eM9lChw5bvDL9U1Ud7uxqPvJxdIg4RqtLpSQYbquvqCGITqC1ppJtwwFkezybGYMgsjcymyQ--1cZk6YRTKDt3mcqb0aI5YHzXjpMYhQ=w366-h794-no?authuser=0" width="350"></a>

## ETC

- Typescript Support
- This library is based from [react-native-camera-roll-picker](https://www.npmjs.com/package/react-native-camera-roll-picker)
