react-native-customize-donut-chart

The simple customizable donut chart component for the React Native app supports both iOS and Android.

<img src="https://raw.githubusercontent.com/dasuntn/react-native-customize-donut-chart/master/exampleImage1.png" width="400" />

<img src="https://raw.githubusercontent.com/dasuntn/react-native-customize-donut-chart/master/exampleImage2.png" width="400" />

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