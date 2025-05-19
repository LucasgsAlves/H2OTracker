import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customAmount, setCustomAmount] = useState("100");

  const [lastDrink, setLastDrink] = useState<{
    amount: number;
    time: string;
  } | null>(null);

  const handleDrink = (amount: number) => {
    onDrink(amount);
    setLastDrink({
      amount,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
  };

  return (
    <View style={styles.container}>
      {lastDrink && (
        <View style={styles.lastDrinkContainer}>
          <MaterialIcons name="history" size={16} color="#64748B" />
          <Text style={styles.lastDrinkText}>
            Último registro:{" "}
            {lastDrink.amount >= 1000
              ? `${(lastDrink.amount / 1000).toFixed(1)}L`
              : `${lastDrink.amount}mL`}{" "}
            às {lastDrink.time}
          </Text>
        </View>
      )}

      <FlatList
        data={drinkOptions}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => (
          <DrinkLogItem
            title={item.title}
            icon={item.icon}
            onPress={() => {
              if (item.title === "Personalizar") {
                setShowCustomInput(!showCustomInput);
              } else {
                let amount = 0;
                if (item.title.includes("mL")) {
                  amount = parseFloat(item.title.replace("mL", ""));
                } else if (item.title.includes("L")) {
                  amount = parseFloat(item.title.replace("L", "")) * 1000;
                }
                handleDrink(amount);
              }
            }}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />

      {showCustomInput && (
        <View style={styles.customInputContainer}>
          <Text style={styles.customInputLabel}>
            Quantidade personalizada (mL):
          </Text>
          <View style={styles.customInputRow}>
            <TouchableOpacity
              style={styles.customButton}
              onPress={() =>
                setCustomAmount((prev) => (parseInt(prev) - 50).toString())
              }
            >
              <Text style={styles.customButtonText}>-</Text>
            </TouchableOpacity>

            <View style={styles.customInputWrapper}>
              <Text style={styles.customInputValue}>{customAmount}</Text>
              <Text style={styles.customInputUnit}>mL</Text>
            </View>

            <TouchableOpacity
              style={styles.customButton}
              onPress={() =>
                setCustomAmount((prev) => (parseInt(prev) + 50).toString())
              }
            >
              <Text style={styles.customButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => {
              const amount = parseInt(customAmount);
              if (!isNaN(amount) && amount > 0) {
                handleDrink(amount);
                setShowCustomInput(false);
              }
            }}
          >
            <Text style={styles.confirmButtonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  listContent: {
    paddingVertical: 8,
  },
  lastDrinkContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  lastDrinkText: {
    fontSize: 14,
    color: "#64748B",
    marginLeft: 6,
  },
  customInputContainer: {
    marginTop: 16,
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  customInputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 12,
  },
  customInputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  customButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },
  customButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#334155",
  },
  customInputWrapper: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  customInputValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F509A",
  },
  customInputUnit: {
    fontSize: 16,
    color: "#64748B",
    marginLeft: 4,
  },
  confirmButton: {
    backgroundColor: "#3572EF",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
