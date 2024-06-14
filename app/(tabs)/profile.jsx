import { FlatList, TouchableOpacity, View, Image } from "react-native";
import { icons } from "../../constants";
import { getUserPosts, signout } from "../../lib/appwrite";
import { router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import EmptyState from "../../components/EmptyState";
import { SafeAreaView } from "react-native-safe-area-context";
import InfoBox from "../../components/InfoBox";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";

const profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user?.$id));
  
  const logout = () => {
    // logout user
    signout();
    setUser(null);
    setIsLogged(false);

    router.replace("/SignIn");
  };
  return (
    <SafeAreaView className="h-full bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos"
            description="You have not uploaded any videos yet"
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-fullflex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={logout}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>

            <View className="w-16 h-16 flex justify-center border-secondary border rounded-lg items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-24 h-24 rounded-full"
                resizeMode="cover"
              />
            </View>
            <InfoBox
              title={user?.username}
              containerStyles="mt-4"
              titleStyles="text-lg"
            />
            <View>
              <InfoBox
                title={posts?.length || 0}
                subtitle="Posts"
                titleStyles="text-xl"
                // containerStyles="mr-6"
              />
              <InfoBox
                title="1.3k"
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default profile;
