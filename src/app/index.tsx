import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Constants from "expo-constants";
import { Banner } from "../components/Banner/banner";
import { Header } from "../components/Header/header";
import { DrinkLog } from "../components/DrinkLog/DrinkLog";
import { WaterProgressArc } from "../components/WaterProgressArc/WaterProgressArc";
import { MetaAnimation } from "../components/MetaAnimation/MetaAnimation";
import { GoalSelector } from "../components/GoalSelector/GoalSelector";

const statusBarHeight = Constants.statusBarHeight;

export default function Index() {
  const [goal, setGoal] = useState(2000);
  const [currentAmount, setCurrentAmount] = useState(0);

  const handleDrink = (amount: number) => {
    setCurrentAmount(prev => {
      const updated = prev + amount;
      return updated > goal ? goal : updated;
    });
  };

  const percentage = (currentAmount / goal) * 100;

  return (
    
    <ScrollView
      style={{ flex: 1 }}
      className="bg-slate-200"
      showsVerticalScrollIndicator={false}
    >
      <View className="w-full px-4" style={{ marginTop: statusBarHeight + 8 }}>
        <Header />
        <Banner />
        <GoalSelector currentGoal={goal} onChangeGoal={setGoal}/>
      </View>

      <View className="w-full px-4 py-2 flex-row justify-between items-center">
        <Text className="text-2xl font-semibold text-gray-800">
          Registro de Consumo
        </Text>
        <TouchableOpacity onPress={() => console.log("See more clicked")}>
          <Text className="text-blue-500 font-medium">Veja Mais</Text>
        </TouchableOpacity>
      </View>

      <DrinkLog onDrink={handleDrink} />

      <View className="flex-1 items-center justify-center">
        <WaterProgressArc percentage={percentage} />
        <Text className="text-base mt-2 font-medium text-gray-700">
          {currentAmount} mL / {goal} mL
        </Text>
      </View>
    </ScrollView>
  );
}
