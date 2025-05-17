import React from "react";
import { Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

type Props = {
  percentage: number;
};

function getColorByPercentage(percentage: number): string {
  if (percentage < 25) return "#EF4444";
  if (percentage < 50) return "#FB923C";
  if (percentage < 75) return "#FACC15";
  return "#3B82F6";
}

export function WaterProgressArc({ percentage }: Props) {
  const radius = 80;
  const strokeWidth = 15;
  const circumference = Math.PI * radius;
  const progress = (percentage / 100) * circumference;
  const strokeColor = getColorByPercentage(percentage);

  return (
    <View className="items-center justify-center mt-8">
      <Svg width="200" height="100" viewBox="0 0 200 100">
        <Circle
          cx="100"
          cy="100"
          r={radius}
          stroke="#3ABEF9"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={0}
          fill="none"
          rotation="-180"
          origin="100,100"
        />
        <Circle
          cx="100"
          cy="100"
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          fill="none"
          rotation="-180"
          origin="100,100"
        />
      </Svg>
      <Text className="text-xl font-bold mt-2">{percentage}%</Text>
    </View>
  );
}
