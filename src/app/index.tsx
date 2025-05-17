import Constants from "expo-constants";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { Banner } from "../components/banner/banner";
import { Header } from "../components/header/header";
import { RegistrarConsumo } from "../components/registrarConsumo/registrarConsumo";

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
        <Text className="text-2xl font-semibold text-gray-800">Registrar Consumo</Text>
        <TouchableOpacity onPress={() => console.log("Clicou em veja mais")}>
          <Text className="text-blue-500 font-medium">Veja Mais</Text>
        </TouchableOpacity>
      </View>

      <RegistrarConsumo/>
    </ScrollView>
  );
}
