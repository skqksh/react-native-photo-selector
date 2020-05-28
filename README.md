# react-native-photo-selector

CameraRoll Picker component for React native

## Add to Project

- Install component through npm

```
$ npm install react-native-photo-selector --save
```

- Install CameraRoll from @react-native-community

```
$ npm install @react-native-community/cameraroll
```

- Require component

```
import CameraRollSelector from 'react-native-photo-selector';
```

## Basic Usage

```js
<CameraRollSelector callback={this.getSelectedImages} />
```

## Props (* : required)

- (*)`callback` : Callback function when images was selected. (is required!). Return a selected image array and current selected image.
|return|value||
|---|---|---|
|selectedImages| PhotoProps[]||
|currentImage| PhotoProps||

- `initialNumToRender` : Specifies how many rows we want to render on our first render pass. 
|type|options|default|
|---|---|---|
|number| 0 < value |5|

- `groupTypes` : The group where the photos will be fetched

|type|options|default|
|---|---|---|
|CameraRoll.GroupType|"Album" , "All" , "Event" , "Faces" , "Library" , "PhotoStream" , "SavedPhotos"|"SavedPhotos"|

- `assetType` : The asset type

|type|options|default|
|---|---|---|
|CameraRoll.GroupType|'Photos', 'Videos' , 'All'|"Photos"|

- `selected` : Already be selected images array. (Default: [])

|type|default|
|---|---|
|any[]|[]|

- `selectSingleItem` : Boolean to select only one single image at time.

|type|default|
|---|---|
|boolean|false|

- `maximum` : Maximum number of selected images.

|type|default|
|---|---|
|number|15|

- `imagesPerRow` : Number of images per row.

|type|default|
|---|---|
|number|3|
- `imageMargin` : Margin size of one image.

|type|default|
|---|---|
|number|5|
- `containerWidth` : Width of camer roll picker container.

|type|default|
|---|---|
|number|'device width'|

- `selectedMarker` : Custom selected image marker component.

|type|default|
|---|---|
|JSX.Element|'circle mark'|

- `backgroundColor` : Set background color.

|type|default|
|---|---|
|string|'white'|

- `emptyText`: Text to display instead of a list when there are no photos found.

|type|default|
|---|---|
|string|"No photos."|

- `emptyTextStyle`: Styles to apply to the `emptyText`.

|type|default|
|---|---|
|string|`textAlign: 'center'`|

- `loader`: Loader component node.

|type|default|
|---|---|
|JSX.Element|`<ActivityIndicator />`|

## ETC
- Typescript Support
- This library is based from [react-native-camera-roll-picker](https://www.npmjs.com/package/react-native-camera-roll-picker)
