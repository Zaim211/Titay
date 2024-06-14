import { View, TouchableOpacity, Image, Alert } from "react-native";
import { icons } from "../constants";
import { getPost } from "../lib/appwrite";
import { useRouter } from "expo-router";


const SaveVideo = ({ title, postsData, setPostsData }) => {
  const router = useRouter();

  const onSave = async () => {
    try {
      const posts = await getPost(title);
      if (posts && posts.length > 0) {
        Alert.alert("Video saved successfully");
        const newPost = posts[0];
        const updatedPosts = [...postsData, newPost];
        setPostsData(updatedPosts);
        router.push({
          pathname: "/bookmark",
          params: { posts: JSON.stringify(updatedPosts) },
        });
      } else {
        console.log("Failed to save video");
      }
    } catch (error) {
      console.error("Error saving video:", error.message);
    }
  };

  return (
    <View className="flex flex-row gap-3 items-start">
      <TouchableOpacity className="gap-3" onPress={onSave}>
        <Image source={icons.bookmark} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SaveVideo;
