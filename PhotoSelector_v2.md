# react-native-photo-selector v2.x.x

CameraRoll Picker component for React native

<a href="https://github.com/skqksh/react-native-photo-selector/blob/master/README.md"><h3>v3.x.x is now available</h3></a>

## DEMO

### :arrow_forward: usecamera(option)

<a href="https://github.com/skqksh/react-native-photo-selector/blob/master/demo/photovideo.gif"><img src="https://lh3.googleusercontent.com/pw/ACtC-3cyhUsKHVt-QsEI3X1PEN5e4itjoURHT_wQYJyaZlHiIHyDW3G8L-2TkH6whRfPLjjoeJvq8WUpGuUDLk0CYLsUBCsO5pHIFSZzgA23PnFryjngdxAVRv5NlenZJwCZWBoqBtqHgCSxO1fff__731cD=w222-h480-no?authuser=0" width="350"></a>

## :heavy_plus_sign: Add to Project

- Install Dependency libraries with Android & IOS settings
  - [react-native-camera](https://github.com/react-native-community/react-native-camera)
  - [react-native-cameraroll](https://github.com/react-native-community/react-native-cameraroll)

```
$ npm i @react-native-community/cameraroll react-native-camera
```

- Install component through npm

```
$ npm i react-native-photo-selector@previous
```

## :bulb: Basic Usage

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

## :wrench: Props (\* : required)

<a href="https://github.com/skqksh/react-native-photo-selector/blob/master/PropsDetail_v2.md"><h3> :eyes: View props detail</h3></a>

## :calling: Run Example

- To run the example app, you have to check the _permissions_ of the app

```
$ git clone https://github.com/skqksh/react-native-photo-selector.git
$ cd react-native-photo-selector
$ cd example
$ npm install
$ npm run android
```

## :rocket: Sample usecase

<a href="https://github.com/skqksh/react-native-photo-selector/blob/master/demo/sample.gif"><img src="https://lh3.googleusercontent.com/bRVPIcqRYsIebCu_zTbZ14ObD9LmVVO99yLLO1d4WcS-mVpBrnYAj_P9h8xAY8rfGccOaZ5HEIFbcMwKh_MwokRLTcGn6GGb9CeGaqDbKg92NHC2KimHfTK6fkC3ORXdvb_SI8EiIKp5NFhJve97jJm5V7wJmj7d4AD1xNa6PEqqVjK26emx4u3S1J4eRnRThwvA6IZjAtsVj9gjRq8lrt891fKWFxLlBq-o9ecaaYo4uNRlyqqXKKBd-n7f9ca8WE8PyFIR12IlT1m7CBBD0DBzmaz8WSGO0o14cHzZChnWrwyOJ_KWjr36gi2ZqoEKMMwBTWV4NwZwPNsMc5aXZ2cWOZmKLntpFxOrL67eYVawjpc7HL3TBJt8jRdfo-GulTQ4oL-XM6hq0OSgNm6DAifBoOaCTF_BKgTglNN-f8NToBWseTky7DO22QLPg1ZQFz071mvHnHakm1iW_wZpxb-eDpeEMjwbTnPIjiZHNPFC7Cs4nTrFC1wqtsi69dWI_or_D-8tkgtVmvY9xso7IlFOh965kZ-oahKqYMxg6ET_gyWdrQ0Ieca0KPMorb18_nGL6bP4utmInK5kROZgb5eM9lChw5bvDL9U1Ud7uxqPvJxdIg4RqtLpSQYbquvqCGITqC1ppJtwwFkezybGYMgsjcymyQ--1cZk6YRTKDt3mcqb0aI5YHzXjpMYhQ=w366-h794-no?authuser=0" width="350"></a>

## :star: ETC

- Typescript Support
- This library is based from [react-native-camera-roll-picker](https://www.npmjs.com/package/react-native-camera-roll-picker)
