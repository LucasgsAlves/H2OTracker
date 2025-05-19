import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { Banner } from "../components/Banner/banner";
import { DrinkLog } from "../components/DrinkLog/DrinkLog";
import { GoalSelector } from "../components/GoalSelector/GoalSelector";
import { Header } from "../components/Header/header";
import { WaterProgressArc } from "../components/WaterProgressArc/WaterProgressArc";

const statusBarHeight = Constants.statusBarHeight;

export default function Index() {
  const [goal, setGoal] = useState(2000);
  const [currentAmount, setCurrentAmount] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const checkAndResetDailyIntake = async () => {
      const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
      const storedDate = await AsyncStorage.getItem("lastLoggedDate");
      const storedAmount = await AsyncStorage.getItem("currentAmount");

      if (storedDate !== today) {
        await AsyncStorage.setItem("lastLoggedDate", today);
        await AsyncStorage.setItem("currentAmount", "0");
        setCurrentAmount(0);
      } else if (storedAmount) {
        setCurrentAmount(Number(storedAmount));
      }
    };

    checkAndResetDailyIntake();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("currentAmount", currentAmount.toString());
  }, [currentAmount]);

  const handleDrink = (amount: number) => {
    setCurrentAmount((prev) => {
      const updated = prev + amount;

      if (updated >= goal && prev < goal) {
        setShowAnimation(true);
        setTimeout(() => setShowAnimation(false), 3000);
        Alert.alert("Parabéns!", "Você bateu sua meta diária!");
      } else if (updated > goal) {
        Alert.alert(
          "Excelente!",
          "Você está bebendo mais do que a meta. Continue assim!"
        );
      }

      return updated;
    });
  };

  const percentage = Math.min((currentAmount / goal) * 100, 100);

  return (
    <ScrollView
      style={{ flex: 1 }}
      className="bg-white"
      showsVerticalScrollIndicator={false}
    >
      <View className="w-full px-4" style={{ marginTop: statusBarHeight + 8 }}>
        <Header />
        <Banner />
        <GoalSelector currentGoal={goal} onChangeGoal={setGoal} />
      </View>

      <View className="w-full px-4 py-2 flex-row justify-between items-center pt-8">
        <Text className="text-2xl font-semibold text-gray-800">
          Registro de Consumo
        </Text>
      </View>

      <DrinkLog onDrink={handleDrink} />

      <View className="flex-1 items-center justify-center mb-6">
        <WaterProgressArc percentage={percentage} />
        <Text className="text-base mt-2 font-medium text-gray-700">
          {currentAmount} mL / {goal} mL
        </Text>
      </View>
    </ScrollView>
  );
}
