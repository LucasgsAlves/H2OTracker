import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

type GoalSelectorProps = {
  currentGoal: number;
  onChangeGoal: (goal: number) => void;
};

const goalOptions = [1000, 1500, 2000, 3000, 4000, 5000];

export function GoalSelector({ currentGoal, onChangeGoal }: GoalSelectorProps) {
  return (
    <View className="mt-4">
      <Text className="text-lg font-semibold text-gray-800 mb-2">
        Escolha sua meta diária:
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="gap-4 flex-row">
          {goalOptions.map((goal) => (
            <TouchableOpacity
              key={goal}
              onPress={() => onChangeGoal(goal)}
              className={`px-4 py-2 rounded-full ${
                currentGoal === goal ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              <Text
                className={`font-medium ${
                  currentGoal === goal ? "text-white" : "text-gray-800"
                }`}
              >
                {goal} mL
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
