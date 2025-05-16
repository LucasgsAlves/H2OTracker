import { Image, Pressable, View } from "react-native";
import PagerView from "react-native-pager-view";

export function Banner() {
  return (
    <View className="w-full h-36 md:h-60 rounded-2xl mt-5 mb-4">
      <PagerView style={{ flex: 1 }} initialPage={0} pageMargin={14}>
        <Pressable
          className="w-full h-36 md:h-60  rounded-2xl"
          key="1"
          onPress={() => console.log("Cliclou no Banner1")}
        >
          <Image
            source={require("../../assets/Imagem1.png")}
            className="w-full h-36 md:h-60  rounded-2xl"
          />
        </Pressable>

        <Pressable
          className="w-full h-36 md:h-60  rounded-2xl"
          key="2"
          onPress={() => console.log("Cliclou no Banner2")}
        >
          <Image
            source={require("../../assets/Imagem2.png")}
            className="w-full h-36 md:h-60  rounded-2xl"
          />
        </Pressable>

        <Pressable
          className="w-full h-36 md:h-60 rounded-2xl"
          key="3"
          onPress={() => console.log("Cliclou no Banner3")}
        >
          <Image
            source={require("../../assets/Imagem3.png")}
            className="w-full h-36 md:h-60 rounded-2xl"
          />
        </Pressable>
      </PagerView>
    </View>
  );
}
