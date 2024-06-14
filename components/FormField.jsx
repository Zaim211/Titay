import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const FormField = ({
  title,
  placeholder,
  value,
  otherStyles,
  handleChangeText,
  ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">
        {title}
    </Text>
     <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2
      border-black-200 focus:border-secondary flex flex-row items-center">
        <TextInput
            className="text-white flex-1 text-base font-psemibold"
            placeholder={placeholder}
            value={value}
            onChangeText={handleChangeText}
            placeholderTextColor="#8D8D8D"
            secureTextEntry={title === "Password" && !showPassword}
            {...props}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image  
              source={!showPassword ? icons.eye : icons.eyeHide }
              className="w-6 h-6"
              resizeMode="contain"
            />
        </TouchableOpacity>
        )}
     </View>
    </View>
  );
};

export default FormField;
