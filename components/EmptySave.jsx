import { View, Text, Image } from "react-native";
import { images } from "../constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptySave = ({ title, subtitle}) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[216px]"
        resizeMode="contain"
      />
      <Text className="mt-2 text-xl text-center font-psemibold text-white">
        {title}
      </Text>
      <Text className="font-pmedium text-sm text-gray-100">
        {subtitle}
    </Text>
    <CustomButton 
        title="Go to home"
        containerStyles="w-full my-5"
        handlePress={() => router.push('/home')}
    />
    </View>
  );
};

export default EmptySave;
