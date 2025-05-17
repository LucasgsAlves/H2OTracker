import { FlatList, View } from "react-native";
import { RegistrarConsumoHorizontal } from "./registrarConsumo-horizontal/registrarConsumo-horizintal";

const data = [
  { id: "1", title: "250mL", icon: require('../../assets/iconeBebida1.png') },
  { id: "2", title: "500mL", icon: require('../../assets/iconeBebida2.png') },
  { id: "3", title: "1L", icon: require('../../assets/iconeBebida3.png') },
  { id: "4", title: "Customizar", icon: require('../../assets/IconeCustomizar1.png') },
];

export function RegistrarConsumo() {
  return (
    <View className="p-4">
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => (
          <RegistrarConsumoHorizontal title={item.title} icon={item.icon} />
        )}
        ItemSeparatorComponent={() => <View className="p-12" />}
      />
    </View>
  );
}
