import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Banner } from "../components/banner/banner";
import { Header } from "../components/header/header";
import { WaterTracker } from "../components/water-tracker/water-track";

import Constants from "expo-constants";

const statusBarHeight = Constants.statusBarHeight;

export default function Index() {
  const [consumoAtual, setConsumoAtual] = useState(0);
  const [metaDiaria, setMetaDiaria] = useState(2000);

  return (
    <ScrollView
      style={{ flex: 1 }}
      className="bg-slate-200"
      showsVerticalScrollIndicator={false}
    >
      <View className="w-full px-4" style={{ marginTop: statusBarHeight + 8 }}>
        <Header />
        <Banner />
        <View className="my-4 p-2 bg-blue-400 rounded-lg shadow">
          <Text className="text-center text-white text-xl font-bold">
            Você bebeu {formatVolume(consumoAtual)} de{" "}
            {formatVolume(metaDiaria)}
          </Text>
        </View>

        <WaterTracker
          metaDiaria={metaDiaria}
          setMetaDiaria={setMetaDiaria}
          consumoAtual={consumoAtual}
          setConsumoAtual={setConsumoAtual}
        />
      </View>
    </ScrollView>
  );
}

function formatVolume(ml: number) {
  if (ml >= 1000) {
    return (ml / 1000).toFixed(2).replace(/\.?0+$/, "") + " L";
  }
  return ml + " ml";
}
