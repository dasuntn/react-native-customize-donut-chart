import { arc, DefaultArcObject, pie } from "d3-shape";
import * as Haptics from "expo-haptics";
import React, { useMemo, useState } from "react";
import { Pressable, useWindowDimensions, View } from "react-native";
import Svg, { G, Path, Text as SvgText } from "react-native-svg";

const PERCENTAGE_LABEL_PADDING = 20; // space between donut and percentage label

type SliceProps = {
  slicePath: string | null;
  radius: number;
  color: string;
  opacity: number;
};
const Slice = ({ color, slicePath, opacity }: SliceProps) => {
  return <Path d={slicePath ?? undefined} opacity={opacity} fill={color} />;
};

const HEIGHT_BUFFER = 120;
const DEFAULT_COLORS = [
  "#F49F61",
  "#4A62E8",
  "#E5AFEE",
  "#43B77E",
  "#EA7162",
  "#D3D57B",
  "#A2A1F2",
  "#8CC7D9",
  "#AE29C7",
  "#C0E1EC",
  "#4D8393",
  "#F4C1B8",
];

type DataType = { value: number };
type DonutChartProps = {
  data: DataType[];
  size?: number;
  SliceColors?: string[];
  centerCircle?: { isEnable: boolean; color: string };
  percentageTextStyle?: { color: string };
};
const DonutChart = ({
  data,
  size,
  SliceColors = DEFAULT_COLORS,
  centerCircle = { isEnable: true, color: "#F5F5F5" },
  percentageTextStyle = { color: "#000000" },
}: DonutChartProps) => {
  const { width: deviceWidth } = useWindowDimensions();
  const width = size ?? deviceWidth;
  const radius = width / 4 + 32;
  const canvasHeight = width / 2 + HEIGHT_BUFFER;

  const [selectedIndex, setSelectedIndex] = useState<undefined | number>();

  const calculatedArcs = useMemo(() => {
    return pie<any, DataType>()
      .sort(null)
      .value((data) => data.value)(data);
  }, [data]);

  const total = data.reduce((acc, prev) => {
    return acc + prev.value;
  }, 0);

  const OnSlicePress = (index: number, isHepticsEnabled: boolean = false) => {
    if (isHepticsEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
    setSelectedIndex(index);
  };

  return (
    <>
      <Pressable onPress={() => setSelectedIndex(undefined)}>
        <Svg
          width={width}
          height={canvasHeight}
          viewBox={`0 0 ${canvasHeight} ${canvasHeight}`}
        >
          {calculatedArcs.length > 0 &&
            data.map(({ value }, index) => {
              const arcData = calculatedArcs[index];

              const sliceInfo: DefaultArcObject = {
                innerRadius: radius - 24,
                outerRadius: radius,
                padAngle: 0.02,
                startAngle: arcData.startAngle,
                endAngle: arcData.endAngle,
              };
              const slicePath = arc().cornerRadius(60)(sliceInfo);

              // Second arc is for the percentage label
              const percentageLabelArcInfo: DefaultArcObject = {
                innerRadius: radius - 16 + PERCENTAGE_LABEL_PADDING,
                outerRadius: radius + PERCENTAGE_LABEL_PADDING,
                startAngle: arcData.startAngle,
                endAngle: arcData.endAngle,
              };

              const percentageLabelArcPoint = arc().centroid(
                percentageLabelArcInfo
              );

              const isRightLabel = percentageLabelArcPoint[0] > 0;
              const textAnchor = isRightLabel ? "start" : "end";
              const isSelected = selectedIndex === index;

              const sliceOpacity =
                selectedIndex === undefined ? 1 : isSelected ? 1 : 1 / 5;
              const percentageOpacity =
                selectedIndex === undefined ? 0 : isSelected ? 1 : 0;

              return (
                <G
                  key={index}
                  x={canvasHeight / 2}
                  y={canvasHeight / 2}
                  onPress={() => OnSlicePress(index)}
                  onPressIn={() => OnSlicePress(index, true)}
                >
                  <Slice
                    color={SliceColors[index]}
                    slicePath={slicePath}
                    radius={radius}
                    opacity={sliceOpacity}
                  />
                  {total && value ? (
                    <SvgText
                      fill={percentageTextStyle.color}
                      x={percentageLabelArcPoint[0]}
                      y={percentageLabelArcPoint[1]}
                      textAnchor={textAnchor}
                      opacity={percentageOpacity}
                      onPress={() => OnSlicePress(index)}
                      onPressIn={() => OnSlicePress(index, true)}
                    >
                      {`${((100 * value) / total).toFixed(0)}%`}
                    </SvgText>
                  ) : null}
                </G>
              );
            })}
        </Svg>
        {centerCircle.isEnable ? (
          <View
            style={{
              position: "absolute",
              left: width / 4,
              top: canvasHeight / 2 - width / 4,
              width: width / 2,
              height: width / 2,
              borderRadius: canvasHeight / 2,
              backgroundColor: centerCircle.color,
            }}
          />
        ) : null}
      </Pressable>
    </>
  );
};

export default DonutChart;
