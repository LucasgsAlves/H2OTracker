import { FlatList, View } from "react-native";
import { DrinkLogItem } from "./DrinkLogHorizontal/DrinkLogItem";

const drinkOptions = [
  { id: "1", title: "250mL", icon: require("../../assets/iconeBebida1.png") },
  { id: "2", title: "500mL", icon: require("../../assets/iconeBebida2.png") },
  { id: "3", title: "1L", icon: require("../../assets/iconeBebida3.png") },
  {
    id: "4",
    title: "Personalizar",
    icon: require("../../assets/IconeCustomizar1.png"),
  },
];

type DrinkLogProps = {
  onDrink: (amount: number) => void;
};

export function DrinkLog({ onDrink }: DrinkLogProps) {
  return (
    <View className="p-4">
      <FlatList
        data={drinkOptions}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => (
          <DrinkLogItem
            title={item.title}
            icon={item.icon}
            onPress={() => {
              if (item.title !== "Customize") {
                const amount = item.title.includes("L")
                  ? parseInt(item.title.replace("L", "")) * 1000
                  : parseInt(item.title.replace("mL", ""));
                onDrink(amount);
              }
            }}
          />
        )}
        ItemSeparatorComponent={() => <View className="p-6" />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
