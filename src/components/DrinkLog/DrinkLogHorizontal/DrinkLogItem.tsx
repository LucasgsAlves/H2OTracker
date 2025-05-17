import { View, Pressable, Text, Image, ImageSourcePropType } from 'react-native';

type DrinkLogItemProps = {
  title: string;
  icon: ImageSourcePropType;
};

export function DrinkLogItem({ title, icon }: DrinkLogItemProps) {
  return (
    <Pressable className="flex items-center justify-center">
      <Image
        source={icon}
        className="w-16 h-16 rounded-full"
        resizeMode="contain"
      />
      <Text className="text-lg text-center font-bold">{title}</Text>
    </Pressable>
  );
}
