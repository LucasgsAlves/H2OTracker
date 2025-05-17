import { View, Pressable, Text, Image } from 'react-native';

type RegistrarConsumoHorizontalProps = {
  title: string;
  icon: any;
}

export function RegistrarConsumoHorizontal({title, icon}: {title: string, icon: any}) {
  return (
    <Pressable className='flex items-center justify-center'>
      <Image source={icon} className='w-16 h-16 rounded-full' resizeMode='contain' ></Image>
      <Text className="text-lg text-center font-bold">{title}</Text>
    </Pressable>
  );
}