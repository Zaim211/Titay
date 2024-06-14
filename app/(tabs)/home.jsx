import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";
import { getLatestPosts, getAllPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";

import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import VideoCard from "../../components/VideoCard";


const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard 
            title={item.title}
            creator={item.creator.username}
            avatar={item.creator.avatar}
            thumbnail={item.thumbnail}
            video={item.video}
            like={item.like}
          />
        
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  Titay application
                </Text>
              </View>
              <View className="mt-1;5">
                <Image
                  source={images.titay}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            <View className="flex-1 w-full pt-5 pb-8">
              <Text className="text-gray-100 font-pregular mb-3 text-lg">
                Latest Videos
              </Text>
              <Trending 
                posts={latestPosts ?? []}
              />
            </View>
          </View>
        )}
          ListEmptyComponent={() => (
            <EmptyState 
              title="No videos found"
              subtitle="Be the first to upload a video"
            />
          )}
          refreshControl={
           <RefreshControl refreshing={refreshing}
            onRefresh={onRefresh}
           />
          } 
      />
    </SafeAreaView>
  );
};

export default Home;
