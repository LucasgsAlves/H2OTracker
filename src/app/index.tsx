import Constants from "expo-constants";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Banner } from "../components/banner/banner";
import { Header } from "../components/header/header";
import { DrinkLog } from "../components/DrinkLog/DrinkLog";
import { WaterProgressArc } from "../components/WaterProgressArc/WaterProgressArc";

const statusBarHeight = Constants.statusBarHeight;

export default function Index() {
  const [goal, setDailyGoal] = useState(2000);
  const [consumed, setConsumed] = useState(0);

  function handleDrink(amount: number){
    setConsumed((prev) => + amount)
  }

  const percentage = Math.min((consumed / goal) * 100, 100);

  return (
    <ScrollView
      style={{ flex: 1 }}
      className="bg-slate-200"
      showsVerticalScrollIndicator={false}
    >
      <View className="w-full px-4" style={{ marginTop: statusBarHeight + 8 }}>
        <Header />
        <Banner />
      </View>

      <View className="w-full px-4 py-2 flex-row justify-between items-center">
        <Text className="text-2xl font-semibold text-gray-800">
          Consumo de Água
        </Text>
        <TouchableOpacity onPress={() => console.log("Cliclou em 'Veja Mais'")}>
          <Text className="text-blue-500 font-medium">Veja Mais</Text>
        </TouchableOpacity>
      </View>

      <DrinkLog onDrink={handleDrink}/>

      <View className="flex-1 items-center justify-center">
        <WaterProgressArc percentage={percentage} />
      </View>
    </ScrollView>
  );
}
