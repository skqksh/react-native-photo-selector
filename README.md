# react-native-photo-selector v3.x.x

CameraRoll Picker component for React native

<a href="https://github.com/skqksh/react-native-photo-selector/blob/master/PhotoSelector_v2.md"><h3>v2.x.x is still available</h3></a>

## DEMO

### :arrow_forward: usecamera(option)

<a href="https://github.com/skqksh/react-native-photo-selector/blob/master/demo/photo-selector-v3.gif"><img src="https://lh3.googleusercontent.com/pw/ACtC-3dyBBE4ybjwxColf7gaOWrv3dsOqXXKOa0u4rRgbe-bfrBlptj7z5eQ8Jn40ToPZzem8aL0P6DAfzzLA4bgozS16VN-6Pl3reA4Eu-uLJ1t4oIjNxhyr-zIOclb5Fsq4E57DjvTFGHVcyctJKBziarx=w222-h480-no?authuser=0" width="350"></a>

## :heavy_plus_sign: Add to Project

- Install Dependency libraries with Android & IOS settings
  - [react-native-camera](https://github.com/react-native-community/react-native-camera)
  - [react-native-cameraroll](https://github.com/react-native-community/react-native-cameraroll)

```
$ npm i @react-native-community/cameraroll react-native-camera react-native-fast-image
```

- Install component through npm

```
$ npm i react-native-photo-selector
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

<a href="https://github.com/skqksh/react-native-photo-selector/blob/master/PropsDetail.md"><h3> :eyes: View props detail</h3></a>

## :calling: Run Example

- To run the example app, you have to check the _permissions_ of the app

```
$ git clone https://github.com/skqksh/react-native-photo-selector
$ cd react-native-photo-selector@latest
$ cd example
$ npm install
$ (ios) cd ios
$ (ios) pod install
$ (ios) pod update SDWebImage
$ npm run android / npm run ios
```

## Known Issue

- [](IOS) No Recent album count

## :star: ETC

- Typescript Support
- This library is based from [react-native-camera-roll-picker](https://www.npmjs.com/package/react-native-camera-roll-picker)
