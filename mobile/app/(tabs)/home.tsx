import CustomButton from "@/components/CustomButton";
import useAuth from "@/hooks/useAuth";
import usePosts from "@/hooks/usePosts";
import { useRouter } from "expo-router";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { user } = useAuth();
  const { posts } = usePosts();

  const router = useRouter();
  return (
    <SafeAreaView className="h-full px-3 pt-3 bg-white">
      <FlatList
        data={posts}
        ListEmptyComponent={() => (
          <View className="items-center justify-center h-full rounded-lg bg-gray-50">
            <Image
              source={require("../../assets/images/no-data.png")}
              style={{ width: 200, height: 200 }}
              className="rounded-lg"
            />
            <Text className="pt-3 text-lg text-gray-700 ">
              No posts available
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="p-3 mb-3 border border-gray-200 rounded-lg shadow-sm">
            <Text className="mb-6 text-lg font-semibold">{item.title}</Text>
            <Text className="mb-3 text-base text-gray-500">{item.body}</Text>
            <CustomButton
              handlePress={() => router.push(`/post/view-post/${item.id}`)}
              title="View"
              containerStyles="mt-3"
              variant="outline"
              titleStyles="text-base"
            />
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="mb-6">
            <Text className="text-xl text-gray-800 font-rubiksemibold">
              Welcome, {user?.name}
            </Text>
            <Text className="text-base text-gray-500">
              Here are the post we've for you!
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
