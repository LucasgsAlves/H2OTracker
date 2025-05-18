import { View, Pressable, Text, Image, ImageSourcePropType } from 'react-native';

type DrinkLogItemProps = {
  title: string;
  icon: ImageSourcePropType;
  onPress?: () => void;
};

export function DrinkLogItem({ title, icon, onPress }: DrinkLogItemProps) {
  return (
    <Pressable className="flex items-center justify-center" onPress={onPress}>
      <Image
        source={icon}
        className="w-16 h-16 rounded-full"
        resizeMode="contain"
      />
      <Text className="text-lg text-center font-bold">{title}</Text>
    </Pressable>
  );
}
