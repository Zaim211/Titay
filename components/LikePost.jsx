import React, { useState } from "react";
import { View, TouchableOpacity, Image, Alert, Text } from "react-native";
import { likePost } from "../lib/appwrite"; // Ensure the correct path is used
import { icons } from "../constants";

const LikePost = ({ like, postsData, setPostsData }) => {
  const [likes, setLikes] = useState((like = 0));

  const handleLike = async () => {
    try {
      await likePost(like + 1);
      setLikes(likes + 1); // Increment the local like count

      // Update the postsData state with the new like
      const updatedPosts = postsData.map((post) =>
        post.$id === like.videoId ? { ...post, like: likes + 1 } : post
      );
      setPostsData(updatedPosts);
    } catch (error) {
      Alert.alert("Failed to like post, please try again");
      console.error("Error liking post:", error.message);
    }
  };

  return (
    <View className="flex flex-col items-center justify-center mt-5">
      <TouchableOpacity onPress={handleLike} className="flex items-center">
        <Image source={icons.like} className="w-6 h-6"  resizeMode="cover" />
        <Text className="text-xs text-gray-100 font-pregular">{likes}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LikePost;
