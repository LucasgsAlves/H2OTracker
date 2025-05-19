import { FlatList, View, StyleSheet } from "react-native";
import { DrinkLogItem } from "./DrinkLogHorizontal/DrinkLogItem";

const drinkOptions = [
  { id: "1", title: "250mL", icon: require("../../assets/iconeBebida1.png") },
  { id: "2", title: "500mL", icon: require("../../assets/iconeBebida2.png") },
  { id: "3", title: "1L", icon: require("../../assets/iconeBebida3.png") },
];

type DrinkLogProps = {
  onDrink: (amount: number) => void;
};

export function DrinkLog({ onDrink }: DrinkLogProps) {
  return (
    <View style={styles.container}>
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
                let amount = 0;
                if (item.title.includes("mL")) {
                  amount = parseFloat(item.title.replace("mL", ""));
                } else if (item.title.includes("L")) {
                  amount = parseFloat(item.title.replace("L", "")) * 1000;
                }
                onDrink(amount);
              }
            }}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ width: 24 }} />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
