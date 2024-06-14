import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Save from "../../components/Save";
import EmptySave from "../../components/EmptySave";
import { images } from "../../constants";

export default function Bookmark() {
  const { posts } = useLocalSearchParams(); // Receive posts from params
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    if (posts) {
      const parsedPosts = JSON.parse(posts); // Parse the JSON string
      setPostsData(prevPosts => [...prevPosts, ...parsedPosts]); // Append parsedPosts to existing postsData
    }
  }, [posts]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={postsData}
        keyExtractor={(item, index) => item.$id + index}
        renderItem={({ item }) => (
          <Save
            title={item.title}
            creator={item.creator?.username} // Access nested data correctly
            avatar={item.creator?.avatar}
            thumbnail={item.thumbnail}
            prompt={item.prompt}
            video={item.video}
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="text-2xl font-psemibold text-white">Saved posts</Text>
              </View>
              <View className="mt-1.5">
                <Image source={images.titay} className="w-9 h-10" resizeMode="contain" />
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptySave title="No videos found" subtitle="Be the first to upload a video" />
        )}
      />
    </SafeAreaView>
  );
}
