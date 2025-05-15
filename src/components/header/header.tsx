import { Feather, Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

export function Header() {
  return (
    <View className="w-full flex flex-row items-center justify-between">
      <Pressable className="w-10 h-10 bg-white rounded-full flex justify-center items-center">
        <Ionicons name="menu" size={20} color="#121212" />
      </Pressable>

      <View>
        <Text className="font-extrabold text-xl">H2O</Text>
      </View>

      <Pressable className="w-10 h-10 bg-white rounded-full flex justify-center items-center">
        <Feather name="bell" size={20} color="#121212" />
      </Pressable>
    </View>
  );
}
