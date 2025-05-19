import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Banner } from "../components/Banner/banner";
import { DrinkLog } from "../components/DrinkLog/DrinkLog";
import { GoalSelector } from "../components/GoalSelector/GoalSelector";
import { Header } from "../components/Header/header";
import { WaterProgressArc } from "../components/WaterProgressArc/WaterProgressArc";

const statusBarHeight = Constants.statusBarHeight;

export default function Index() {
  const [goal, setGoal] = useState(2000);
  const [currentAmount, setCurrentAmount] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showTip, setShowTip] = useState(false);

  const celebrationAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const hydrationTips = [
    "Beber água logo ao acordar ajuda a ativar seus órgãos internos",
    "Beba um copo de água 30 minutos antes de cada refeição",
    "Mantenha uma garrafa de água sempre por perto",
    "Adicione frutas à sua água para um sabor natural",
    "Estabeleça lembretes regulares para beber água durante o dia",
  ];

  const [currentTip, setCurrentTip] = useState(
    hydrationTips[Math.floor(Math.random() * hydrationTips.length)]
  );

  useEffect(() => {
    const checkAndResetDailyIntake = async () => {
      const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
      const storedDate = await AsyncStorage.getItem("lastLoggedDate");
      const storedAmount = await AsyncStorage.getItem("currentAmount");
      const storedGoal = await AsyncStorage.getItem("waterGoal");

      if (storedDate !== today) {
        await AsyncStorage.setItem("lastLoggedDate", today);
        await AsyncStorage.setItem("currentAmount", "0");
        setCurrentAmount(0);
        setShowTip(true);
        setTimeout(() => setShowTip(false), 5000);
      } else if (storedAmount) {
        setCurrentAmount(Number(storedAmount));
      }

      if (storedGoal) {
        setGoal(Number(storedGoal));
      }
    };

    checkAndResetDailyIntake();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("currentAmount", currentAmount.toString());
  }, [currentAmount]);

  useEffect(() => {
    AsyncStorage.setItem("waterGoal", goal.toString());
  }, [goal]);

  const handleDrink = (amount: number) => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.05,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    setCurrentAmount((prev) => {
      const updated = prev + amount;

      if (updated >= goal && prev < goal) {
        setShowAnimation(true);
        Animated.timing(celebrationAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }).start(() => {
          setTimeout(() => {
            Animated.timing(celebrationAnim, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }).start(() => setShowAnimation(false));
          }, 2000);
        });

        Alert.alert(
          "🎉 Parabéns!",
          "Você atingiu sua meta diária de hidratação!",
          [
            {
              text: "Continuar",
              style: "default",
            },
          ]
        );
      } else if (updated > goal * 1.5) {
        Alert.alert(
          "⚠️ Atenção",
          "Você está consumindo uma quantidade muito acima da sua meta. Embora a hidratação seja importante, o excesso também pode ser prejudicial.",
          [
            {
              text: "Entendi",
              style: "default",
            },
          ]
        );
      } else if (updated > goal) {
        Alert.alert(
          "🌊 Excelente!",
          "Você está bebendo mais do que a meta. Continue assim!",
          [
            {
              text: "Continuar",
              style: "default",
            },
          ]
        );
      }

      return updated;
    });
  };

  const percentage = Math.min((currentAmount / goal) * 100, 100);

  const rotation = celebrationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={[styles.container, { marginTop: statusBarHeight + 8 }]}>
        <Header />
        <Banner />

        {showTip && (
          <Animated.View
            style={[
              styles.tipContainer,
              {
                opacity: celebrationAnim.interpolate({
                  inputRange: [0, 0.2, 0.8, 1],
                  outputRange: [1, 0.9, 0.9, 0],
                }),
              },
            ]}
          >
            <MaterialIcons name="lightbulb-outline" size={20} color="#3572EF" />
            <Text style={styles.tipText}>{currentTip}</Text>
            <TouchableOpacity
              style={styles.tipCloseButton}
              onPress={() => setShowTip(false)}
            >
              <MaterialIcons name="close" size={16} color="#64748B" />
            </TouchableOpacity>
          </Animated.View>
        )}

        <GoalSelector currentGoal={goal} onChangeGoal={setGoal} />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Registro de Consumo</Text>
        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => {
            Alert.alert(
              "Histórico",
              "Funcionalidade de histórico detalhado será implementada em breve!",
              [{ text: "OK", style: "default" }]
            );
          }}
        >
          <MaterialIcons name="history" size={18} color="#3572EF" />
          <Text style={styles.historyButtonText}>Histórico</Text>
        </TouchableOpacity>
      </View>

      <DrinkLog onDrink={handleDrink} />

      <Animated.View
        style={[
          styles.progressContainer,
          {
            transform: [
              { scale: scaleAnim },
              ...(showAnimation ? [{ rotate: rotation }] : []),
            ],
          },
        ]}
      >
        <WaterProgressArc percentage={percentage} goal={goal / 1000} />

        {showAnimation && (
          <Animated.View
            style={[
              styles.celebrationContainer,
              {
                opacity: celebrationAnim.interpolate({
                  inputRange: [0, 0.2, 0.8, 1],
                  outputRange: [0, 1, 1, 0],
                }),
              },
            ]}
          >
            <Text style={styles.celebrationText}>🎉 Meta atingida! 🎉</Text>
          </Animated.View>
        )}
      </Animated.View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Consumido</Text>
          <Text style={styles.statValue}>
            {currentAmount >= 1000
              ? `${(currentAmount / 1000).toFixed(1)}L`
              : `${currentAmount}mL`}
          </Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Meta</Text>
          <Text style={styles.statValue}>
            {goal >= 1000 ? `${(goal / 1000).toFixed(1)}L` : `${goal}mL`}
          </Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Restante</Text>
          <Text
            style={[
              styles.statValue,
              { color: currentAmount >= goal ? "#10B981" : "#3572EF" },
            ]}
          >
            {currentAmount >= goal
              ? "Completo!"
              : goal - currentAmount >= 1000
              ? `${((goal - currentAmount) / 1000).toFixed(1)}L`
              : `${goal - currentAmount}mL`}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.resetButton}
        onPress={() => {
          Alert.alert(
            "Reiniciar Contagem",
            "Tem certeza que deseja zerar seu consumo de água de hoje?",
            [
              {
                text: "Cancelar",
                style: "cancel",
              },
              {
                text: "Confirmar",
                style: "destructive",
                onPress: () => setCurrentAmount(0),
              },
            ]
          );
        }}
      ></TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    width: "100%",
    paddingHorizontal: 16,
  },
  tipContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F9FF",
    borderRadius: 8,
    padding: 12,
    marginVertical: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#3572EF",
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: "#334155",
    marginLeft: 8,
  },
  tipCloseButton: {
    padding: 4,
  },
  sectionHeader: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#334155",
  },
  historyButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  historyButtonText: {
    fontSize: 14,
    color: "#3572EF",
    marginLeft: 4,
  },
  progressContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    position: "relative",
  },
  celebrationContainer: {
    position: "absolute",
    top: -40,
    backgroundColor: "#3572EF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  celebrationText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statLabel: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3572EF",
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#E2E8F0",
  },
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
    paddingVertical: 8,
  },
});
