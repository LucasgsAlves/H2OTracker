import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";

type Props = {
  percentage: number;
};

function getColorByPercentage(percentage: number): string {
  if (percentage < 25) return "#EF4444";
  if (percentage < 50) return "#FB923C";
  if (percentage < 75) return "#FACC15";
  return "#3572EF";                      
}

export function WaterProgressArc({ percentage }: Props) {
  const radius = 80;
  const strokeWidth = 15;
  const circumference = Math.PI * radius;
  const progress = (percentage / 100) * circumference;
  const strokeColor = getColorByPercentage(percentage);

  return (
    <View style={styles.container}>
      <Svg width="200" height="100" viewBox="0 0 200 100">
        <Circle
          cx="100"
          cy="100"
          r={radius}
          stroke="#B9E5E8"
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
      <Text style={styles.percentage}>{percentage}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  percentage: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: "700",
    color: "#1F509A",
  },
});
