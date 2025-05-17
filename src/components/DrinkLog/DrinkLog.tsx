import { FlatList, View } from "react-native";
import { DrinkLogItem } from "./DrinkLogHorizontal/DrinkLogItem";

const data = [
  { id: "1", title: "250mL", icon: require('../../assets/iconeBebida1.png') },
  { id: "2", title: "500mL", icon: require('../../assets/iconeBebida2.png') },
  { id: "3", title: "1L", icon: require('../../assets/iconeBebida3.png') },
  { id: "4", title: "Customize", icon: require('../../assets/IconeCustomizar1.png') },
];

export function DrinkLog() {
  return (
    <View className="p-4">
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => (
          <DrinkLogItem title={item.title} icon={item.icon} />
        )}
        ItemSeparatorComponent={() => <View className="p-12" />}
      />
    </View>
  );
}
