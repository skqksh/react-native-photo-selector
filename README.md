# react-native-photo-selector v3.x.x

CameraRoll Picker component for React native

<a href="https://github.com/skqksh/react-native-photo-selector/blob/master/PhotoSelector_v2.md"><h3>v2.x.x is still available</h3></a>

## DEMO

### :arrow_forward: usecamera(option)

<a href="https://github.com/skqksh/react-native-photo-selector/blob/master/demo/photo-selector-v3.gif"><img src="https://lh3.googleusercontent.com/pw/ACtC-3dWw6X12vngn6rzl-H9lYUYg2OtBFLFKfnPyeF7a78csVA4I8mcEV5YM5OKWSVRUScd3xKApx4qMqEcY7y8gj5oFI0AFtVW51SXyAMUky_Z8kFQQo2toQuu_F_Ve6DD9yg6ve3eSSN51pLyc8-HFqbB=w222-h480-no?authuser=0" width="350"></a>

## :heavy_plus_sign: Add to Project

- Install Dependency libraries with Android & IOS settings
  - [react-native-camera](https://github.com/react-native-community/react-native-camera)
  - [react-native-cameraroll](https://github.com/react-native-community/react-native-cameraroll)

```
$ npm i react-native-camera react-native-fast-image @react-native-community/cameraroll@git+https://github.com/skqksh/react-native-cameraroll.git
```

- :exclamation: about : @react-native-community/cameraroll@git+https://github.com/skqksh/react-native-cameraroll.git
  - Only IOS. With this version, you can take favorites album

- Install component through npm

```
$ npm i react-native-photo-selector@latest
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

:exclamation: To run the example app, you have to check the <b>_permissions_</b> of the app

```
$ git clone https://github.com/skqksh/react-native-photo-selector.git
$ cd react-native-photo-selector
$ cd example
$ npm install
$ (ios) cd ios
$ (ios) pod install
$ (ios) pod update SDWebImage
$ npm run android / npm run ios
```

## Update Log

<a href="https://github.com/skqksh/react-native-photo-selector/blob/V3/UpdateLog.md"><h3> :eyes: View update history</h3></a>

## Known Issue

- (IOS) Could count recent album only under 100

## :star: ETC

- Typescript Support
- This library is based from [react-native-camera-roll-picker](https://www.npmjs.com/package/react-native-camera-roll-picker)
