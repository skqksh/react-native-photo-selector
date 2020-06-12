# react-native-photo-selector

CameraRoll Picker component for React native

## DEMO

- basic

<a href="https://github.com/skqksh/react-native-photo-selector/blob/master/demo/normal.gif"><img src="https://lh3.googleusercontent.com/jUgl1rQAogo3FiGIL2gU86D_stRTgURtwMZ4VEV2xm7HIYHKDq5dI4wK-wWzmBsffLVgzR4roQZ07Rv-i8GZUhAIhiHu5FEAQYFOKa_IryGQyUKB1oLPMgUT1y9XBHfcVQLAnwbGNnE5zBhcSiHwhoOLLdUlChEl-3DUdi96a_Y6VQ98wNOhhB_s0U68LkpUsRcDf1k2Z6OYCQ8Sk_rABP_D0ge3zLUJtmF3RKMvSTXrJe8LQtJqeDm9d8yGCSpV4RR5C7M9ReTePuSdiN5p2aSV4ugt9R6MEO_grVP7fJ4enF6SNMwPo9QHSIcgknJKLlIhdMqypUu-8PWIvqQCryd0xHJ2wLhHIjuug3HYBodu8hPlZIMZU72cVhSAZoRRUfPBYUo5yds5iM4_npwEKFJ1znwkpr62qLbEYUXALPt9cXmtu8NpM-diYUnyPa8grml4xlHOPWalBAeTJGFqu7bWaQkGxbBvDkGSU6ndsdjYWraOk6ATtJK0ZS2JsG2dyvWQxsdpeG1GUr8wkekos6uvhhEbelIQ_nHERB0LcdEVxwIT_ybiqQnv33qBBuuLgtwtXmdlXk76vZQPtM8amKE07PggLp-lUK_QMTuqSCgWXH5vV-tvRL52nt7ZTEblwpoHd-HeUWzMZdZbuPUJPn-tDawNAQzkXhn0DdYYgCorRFcB6pyXZ_zIVTob3w=w458-h992-no?authuser=0" width="350"></a>

- usecamera

<a href="https://github.com/skqksh/react-native-photo-selector/blob/master/demo/usecamera.gif"><img src="https://lh3.googleusercontent.com/EH_d-wlpgwSi7RqL6C5TqcIXorlvfCmnbcXBG3XZK9g-rhO4kp8M46A6tVm0yrICTXx3tkkNMCrH0cQ6eK7xMQP7VUgbL8_Xdt48_NmB3P6bMalI9LhLn4IbJFjbo8HuviDQsT4QAyUO0EbQYf7U-O9BctSTYGDW1O9kI-v2V42fVrgu6_4fPOVUrtjlrAJXHXLqLcESZw-9_wyQ35vhmfYoGLWrWRAo_xgWz-e965HHfeeViGb56dLKuXxJ00aPoDJHP3TzDqZt9jpE_kY7jUL9oZ6MHAnOpqsSQjQ27u22D3zlOaayQKBZMX-CV9DCfNJsKUjVEo6nrleJ4enqi--58VI-aySIrCm7qHErr7aza_s_r1ek4zKjNZY49ntaW8O5AiRgvCA6xk-Ja-pPYX6r02CiIrpimR4YgGkWtTSufW7TbHe1y2qskJi0ygVRcy75kZIh-ZC6DrJXhhobCScfHQPAPTu_Asl5k8mj9a2mrlgO5XDt53FQS9shDZAxffKoxgv-WORfIcuxE_a3ufQpxadRXQ9AGOd9yhtEU0fWabNPFv6hCn0yEgTMu92bRx9bMFvFDkLmF9CCP47EBnvh2x-lFop65hNJCx_WQtXLXCoT2UDU0B-DDJrFSyqv9aFmEXvL25rqocVZeQVBLnn1zczr1h-YEl2HRJHUhD6NhiroWSTvXnWuRyR0zw=w458-h992-no?authuser=0" width="350"></a>

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

| type        | default                 |
| ----------- | ----------------------- |
| JSX.Element | `<ActivityIndicator />` |

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

#### : Set camera preview style.

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

## Sample usecase

<a href="https://github.com/skqksh/react-native-photo-selector/blob/master/demo/usecamera.gif"><img src="https://lh3.googleusercontent.com/bRVPIcqRYsIebCu_zTbZ14ObD9LmVVO99yLLO1d4WcS-mVpBrnYAj_P9h8xAY8rfGccOaZ5HEIFbcMwKh_MwokRLTcGn6GGb9CeGaqDbKg92NHC2KimHfTK6fkC3ORXdvb_SI8EiIKp5NFhJve97jJm5V7wJmj7d4AD1xNa6PEqqVjK26emx4u3S1J4eRnRThwvA6IZjAtsVj9gjRq8lrt891fKWFxLlBq-o9ecaaYo4uNRlyqqXKKBd-n7f9ca8WE8PyFIR12IlT1m7CBBD0DBzmaz8WSGO0o14cHzZChnWrwyOJ_KWjr36gi2ZqoEKMMwBTWV4NwZwPNsMc5aXZ2cWOZmKLntpFxOrL67eYVawjpc7HL3TBJt8jRdfo-GulTQ4oL-XM6hq0OSgNm6DAifBoOaCTF_BKgTglNN-f8NToBWseTky7DO22QLPg1ZQFz071mvHnHakm1iW_wZpxb-eDpeEMjwbTnPIjiZHNPFC7Cs4nTrFC1wqtsi69dWI_or_D-8tkgtVmvY9xso7IlFOh965kZ-oahKqYMxg6ET_gyWdrQ0Ieca0KPMorb18_nGL6bP4utmInK5kROZgb5eM9lChw5bvDL9U1Ud7uxqPvJxdIg4RqtLpSQYbquvqCGITqC1ppJtwwFkezybGYMgsjcymyQ--1cZk6YRTKDt3mcqb0aI5YHzXjpMYhQ=w366-h794-no?authuser=0" width="350"></a>

## ETC

- Typescript Support
- This library is based from [react-native-camera-roll-picker](https://www.npmjs.com/package/react-native-camera-roll-picker)
