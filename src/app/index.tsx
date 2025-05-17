import Constants from "expo-constants";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Banner } from "../components/banner/banner";
import { DrinkLog } from "../components/DrinkLog/DrinkLog";
import { Header } from "../components/header/header";
import { WaterProgressArc } from "../components/WaterProgressArc/WaterProgressArc";

const statusBarHeight = Constants.statusBarHeight;

export default function Index() {
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

      <DrinkLog />

      <View className="flex-1 items-center justify-center">
        <WaterProgressArc percentage={100} />
      </View>
    </ScrollView>
  );
}
