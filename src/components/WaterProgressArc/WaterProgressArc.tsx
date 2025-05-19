import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";

type Props = {
  percentage: number;
  goal: number;
};

function getColorByPercentage(percentage: number): {
  start: string;
  end: string;
} {
  if (percentage < 25) return { start: "#FF6B6B", end: "#EF4444" };
  if (percentage < 50) return { start: "#FFA83C", end: "#FB923C" };
  if (percentage < 75) return { start: "#FFD60A", end: "#FACC15" };
  return { start: "#60A5FA", end: "#3572EF" };
}

export function WaterProgressArc({ percentage, goal }: Props) {
  const radius = 80;
  const strokeWidth = 15;
  const circumference = Math.PI * radius;
  const progress = (percentage / 100) * circumference;
  const colors = getColorByPercentage(percentage);

  const progressAnim = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(0);

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    progressRef.current = progress;
  }, [progress]);

  return (
    <View style={styles.container}>
      <Svg width="200" height="100" viewBox="0 0 200 100">
        <Defs>
          <LinearGradient id="progressGradient" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor={colors.start} />
            <Stop offset="1" stopColor={colors.end} />
          </LinearGradient>
        </Defs>
        <Circle
          cx="100"
          cy="100"
          r={radius}
          stroke="#E5F2F3"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={0}
          fill="none"
          rotation="-180"
          origin="100,100"
          strokeLinecap="round"
        />
        <AnimatedCircle
          cx="100"
          cy="100"
          r={radius}
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={progressAnim.interpolate({
            inputRange: [0, circumference],
            outputRange: [circumference, 0],
          })}
          fill="none"
          rotation="-180"
          origin="100,100"
          strokeLinecap="round"
        />
      </Svg>
      <View style={styles.textContainer}>
        <Text style={styles.percentage}>{percentage}%</Text>
        <Text style={styles.goalText}>
          {((percentage / 100) * goal).toFixed(1)}L / {goal}L
        </Text>
      </View>
    </View>
  );
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    alignItems: "center",
    marginTop: 8,
  },
  percentage: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F509A",
  },
  goalText: {
    fontSize: 16,
    color: "#64748B",
    marginTop: 4,
  },
});
