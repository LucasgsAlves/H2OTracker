import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Button,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type GoalSelectorProps = {
  currentGoal: number;
  onChangeGoal: (goal: number) => void;
};

const goalOptions = [1000, 1500, 2000, 2500, 3000, 3500, 4000, 5000];

export function GoalSelector({ currentGoal, onChangeGoal }: GoalSelectorProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [customValue, setCustomValue] = useState("");

  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, []);

  const calculateRecommendedWater = (weight: number) => {
    return Math.round((weight * 35) / 100) * 100;
  };

  const exampleWeight = 70;
  const recommendedAmount = calculateRecommendedWater(exampleWeight);

  return (
    <Animated.View
      style={[styles.container, { transform: [{ scale: scaleAnim }] }]}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.label}>Escolha sua meta diária:</Text>
        <TouchableOpacity
          style={styles.infoButton}
          onPress={() => {
            alert(
              "A quantidade de água recomendada varia de acordo com seu peso, nível de atividade física e clima. Uma regra geral é consumir 35ml por kg de peso corporal."
            );
          }}
        >
          <MaterialIcons name="info-outline" size={18} color="#64748B" />
        </TouchableOpacity>
      </View>

      <View style={styles.recommendationContainer}>
        <Text style={styles.recommendationText}>
          Recomendado para seu perfil:{" "}
          <Text style={styles.recommendedValue}>{recommendedAmount}mL</Text>
        </Text>
        <TouchableOpacity
          style={styles.useRecommendedButton}
          onPress={() => onChangeGoal(recommendedAmount)}
        >
          <Text style={styles.useRecommendedText}>Usar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.buttonContainer}>
          {goalOptions.map((goal) => {
            const isSelected = currentGoal === goal;
            return (
              <TouchableOpacity
                key={goal}
                onPress={() => onChangeGoal(goal)}
                style={[
                  styles.button,
                  isSelected ? styles.selectedButton : styles.unselectedButton,
                ]}
              >
                <Text
                  style={
                    isSelected ? styles.selectedText : styles.unselectedText
                  }
                >
                  {goal >= 1000 ? `${goal / 1000}L` : `${goal}mL`}
                </Text>
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity
            style={[styles.button, styles.customButton]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.customButtonText}>
              <MaterialIcons name="add" size={16} /> Personalizar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.tipContainer}>
        <MaterialIcons name="lightbulb-outline" size={16} color="#3572EF" />
        <Text style={styles.tipText}>
          Dica: Sua meta ideal pode variar conforme seu peso, atividade física e
          clima.
        </Text>
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={modalStyles.overlay}>
          <View style={modalStyles.modalContainer}>
            <Text style={modalStyles.modalTitle}>Meta Personalizada (mL)</Text>
            <TextInput
              style={modalStyles.input}
              keyboardType="numeric"
              placeholder="Ex: 3200"
              value={customValue}
              onChangeText={setCustomValue}
            />
            <View style={modalStyles.modalButtons}>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
              <Button
                title="Confirmar"
                onPress={() => {
                  const value = parseInt(customValue);
                  if (!isNaN(value) && value > 0) {
                    onChangeGoal(value);
                    setModalVisible(false);
                    setCustomValue("");
                  } else {
                    alert("Digite um valor válido em mL");
                  }
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </Animated.View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 16,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#334155",
  },
  infoButton: {
    padding: 4,
  },
  recommendationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F0F9FF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderLeftWidth: 3,
    borderLeftColor: "#3572EF",
  },
  recommendationText: {
    fontSize: 14,
    color: "#64748B",
    flex: 1,
  },
  recommendedValue: {
    fontWeight: "600",
    color: "#3572EF",
  },
  useRecommendedButton: {
    backgroundColor: "#E0F2FE",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  useRecommendedText: {
    color: "#3572EF",
    fontWeight: "500",
    fontSize: 12,
  },
  scrollContent: {
    paddingBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    minWidth: 80,
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#3572EF",
    shadowColor: "#3572EF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  unselectedButton: {
    backgroundColor: "#E2E8F0",
  },
  customButton: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderStyle: "dashed",
  },
  selectedText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  unselectedText: {
    color: "#334155",
    fontWeight: "500",
  },
  customButtonText: {
    color: "#64748B",
    fontWeight: "500",
    flexDirection: "row",
    alignItems: "center",
  },
  tipContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    paddingHorizontal: 4,
  },
  tipText: {
    fontSize: 12,
    color: "#64748B",
    marginLeft: 6,
    flex: 1,
  },
});

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    width: "80%",
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
    fontSize: 14,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
