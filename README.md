# react-native-photo-selector

CameraRoll Picker component for React native

## DEMO

- basic

<a href="https://github.com/skqksh/react-native-photo-selector/blob/master/demo/normal.gif"><img src="https://github.com/skqksh/react-native-photo-selector/blob/master/demo/normal.gif" width="350"></a>

- usecamera

<a href="https://github.com/skqksh/react-native-photo-selector/blob/master/demo/usecamera.gif"><img src="https://github.com/skqksh/react-native-photo-selector/blob/master/demo/usecamera.gif" width="350"></a>


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

- (\*)`callback` : Callback function when images was selected. Return a selected image array and current selected image.

| return         | value        |
| -------------- | ------------ |
| selectedImages | PhotoProps[] |
| currentImage   | PhotoProps   |

- `initialNumToRender` : Specifies how many rows we want to render on our first render pass.

| type   | options   | default |
| ------ | --------- | ------- |
| number | 0 < value | 5       |

- `groupTypes` : The group where the photos will be fetched

| type                 | options                                                                         | default       |
| -------------------- | ------------------------------------------------------------------------------- | ------------- |
| CameraRoll.GroupType | "Album" , "All" , "Event" , "Faces" , "Library" , "PhotoStream" , "SavedPhotos" | "SavedPhotos" |

- `assetType` : The asset type

| type                 | options                    | default  |
| -------------------- | -------------------------- | -------- |
| CameraRoll.GroupType | 'Photos', 'Videos' , 'All' | "Photos" |

- `selected` : Already be selected images array. (Default: [])

| type  | default |
| ----- | ------- |
| any[] | []      |

- `selectSingleItem` : Boolean to select only one single image at time.

| type    | default |
| ------- | ------- |
| boolean | false   |

- `maximum` : Maximum number of selected images.

| type   | default |
| ------ | ------- |
| number | 15      |

- `imagesPerRow` : Number of images per row.

| type   | default |
| ------ | ------- |
| number | 3       |

- `imageMargin` : Margin size of one image.

| type   | default |
| ------ | ------- |
| number | 5       |

- `containerWidth` : Width of camer roll picker container.

| type   | default        |
| ------ | -------------- |
| number | 'device width' |

- `selectedMarker` : Custom selected image marker component.
  - 'selectedNumber' is starts from 1

| type        | default       |
| ----------- | ------------- |
| JSX.Element, (selectedNumber:number)=>JSX.Element | 'circle mark' |

- `backgroundColor` : Set background color.

| type   | default |
| ------ | ------- |
| string | 'white' |

- `emptyText`: Text to display instead of a list when there are no photos found.

| type   | default      |
| ------ | ------------ |
| string | "No photos." |

- `emptyTextStyle`: Styles to apply to the `emptyText`.

| type   | default               |
| ------ | --------------------- |
| string | `textAlign: 'center'` |

- `loader`: Loader component node.

| type        | default                 |
| ----------- | ----------------------- |
| JSX.Element | `<ActivityIndicator />` |

- `useCamera`: If use camera capture

| type    | default |
| ------- | ------- |
| boolean | false   |

- `cameraButtonIcon`: cameraButtonIcon component node.

| type        | default          |
| ----------- | ---------------- |
| JSX.Element | camera png image |

- `cameraPreviewProps`: props of react-native-camera.

| type          |
| ------------- |
| RNCameraProps |

- `cameraPreviewStyle`: Set camera preview style.

| type      |
| --------- |
| ViewStyle |

- `cameraFlipIcon`: Set camera preview style.

| type        | default        |
| ----------- | -------------- |
| JSX.Element | flip png image |

- `cameraCaptureIcon`: Set camera preview style.

| type        | default       |
| ----------- | ------------- |
| JSX.Element | 'circle mark' |

## Run Example
- To run the example app, you have to check the permissions of the app
```
$ git clone https://github.com/skqksh/react-native-photo-selector
$ cd react-native-photo-selector
$ cd example
$ npm install
$ npm run android
```

## ETC

- Typescript Support
- This library is based from [react-native-camera-roll-picker](https://www.npmjs.com/package/react-native-camera-roll-picker)
