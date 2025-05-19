import { View, Pressable, Text, Image, ImageSourcePropType, StyleSheet } from 'react-native';

type DrinkLogItemProps = {
  title: string;
  icon: ImageSourcePropType;
  onPress?: () => void;
};

export function DrinkLogItem({ title, icon, onPress }: DrinkLogItemProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.imageWrapper}>
        <Image source={icon} style={styles.image} resizeMode="contain" />
      </View>
      <Text style={styles.label}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    backgroundColor: '#B9E5E8',
    padding: 10,
    borderRadius: 50,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  label: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
  },
});
