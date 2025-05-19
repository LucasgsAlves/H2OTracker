import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

type GoalSelectorProps = {
  currentGoal: number;
  onChangeGoal: (goal: number) => void;
};

const goalOptions = [1000, 1500, 2000, 3000, 4000, 5000];

export function GoalSelector({ currentGoal, onChangeGoal }: GoalSelectorProps) {
  return (
    <View style={{ marginTop: 16 }}>
      <Text style={styles.label}>Escolha sua meta diária:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
                <Text style={isSelected ? styles.selectedText : styles.unselectedText}>
                  {goal} mL
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#7AB2D3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4, // Android shadow
  },
  selectedButton: {
    backgroundColor: '#3572EF',
  },
  unselectedButton: {
    backgroundColor: '#B9E5E8',
  },
  selectedText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  unselectedText: {
    color: '#000000',
    fontWeight: '600',
  },
});
