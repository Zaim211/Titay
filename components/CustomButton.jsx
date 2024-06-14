import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({ title, handlePress, containerStyles,
textStyles, isLoading }) => {
  return (
    <TouchableOpacity 
    className={`bg-secondary-100 min-h-[60px]
     justify-center items-center rounded-xl ${containerStyles}
     {isLoading ? 'opacity-50' : ''}`}
     disabled={isLoading}
    onPress={handlePress}
    activeOpacity={0.8}
    >
      <Text className={`text-primary text-lg font-psemibold ${textStyles}`}>
        {title}
    </Text>
    </TouchableOpacity> 
  )
}

export default CustomButton