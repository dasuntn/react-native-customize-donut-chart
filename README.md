# react-native-customize-donut-chart

The simple customizable donut chart component for the React Native app supports both iOS and Android.

## Screenshots

<img width="250" alt="Screenshot 2023-12-04 at 15 41 03" src="https://github.com/dasuntn/react-native-customize-donut-chart/assets/15120571/e0785d24-ab9a-463e-bd02-44757314d8b2">

<img width="250" alt="Screenshot 2023-12-04 at 15 40 52" src="https://github.com/dasuntn/react-native-customize-donut-chart/assets/15120571/b24d999c-6a00-452b-9916-79abbef70b21">

## Demo

https://github.com/dasuntn/react-native-customize-donut-chart/assets/15120571/31ad57cd-64ee-4573-81a9-45a2153d4cb5

## Features

- Cross platform
- Donut slice is clickable
- Custom colors can be passed
- Add any component to center of the donut




## Installation

### Required dependencies

 - react
 - react-native 
 - react-native-svg (https://www.npmjs.com/package/react-native-svg)

Install react-native-customize-donut-chart with npm

```bash
  npm install react-native-customize-donut-chart
```
    
## Usage/Examples

```javascript
import React from "react";
import DonutChart from "react-native-customize-donut-chart";

const exampleData = [{ value: 10 }, { value: 20 }, { value: 40 }];

const ChartComponent = () => {
  return <DonutChart data={exampleData} />;
};

export default ChartComponent;

```


## Props

| Property	| Type | Required |
|-----------|------|----------|
|   data    |  {value: number}[] |  yes |
|   size    |  number |  no |
|   sliceColors    |  string[] |  no |
|   centerCircle    |  { isEnable: boolean; color: string } |  no |
|   percentageTextStyle    |  { color: string } |  no |
