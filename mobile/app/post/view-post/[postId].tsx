import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { usePathname, useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";
import usePosts from "@/hooks/usePosts";
import { Post } from "@/types";
import useComments from "@/hooks/useComments";
import { Ionicons } from "@expo/vector-icons";

export default function ViewPostScreen() {
  const router = useRouter();
  const pathname = usePathname();
  const [post, setPost] = useState<Post | null>(null);
  const { posts, deletingPost, deletePost } = usePosts();
  const { comments } = useComments();

  useEffect(() => {
    if (pathname) {
      const id = pathname.split("/")[3];
      const post = posts?.find(
        (p) => parseInt(p.id as string, 10) === parseInt(id as string, 10)
      );

      if (post) {
        setPost(post);
      }
    }
  }, [pathname, posts, router]);

  if (!post) return <Text>Loading...</Text>;

  const renderHeader = () => (
    <>
      <View className="flex-row justify-between">
        <TouchableOpacity
          onPress={() => router.push("/home")}
          className="flex-row items-center h-fit"
        >
          <Ionicons name="arrow-back" size={24} />
          <Text>Back to posts</Text>
        </TouchableOpacity>
      </View>
      <Text className="mt-6 mb-4 text-3xl font-bold">{post.title}</Text>
      <Text className="mb-6 text-base text-gray-600">{post.body}</Text>
      <View className="flex-row mb-8 justify-evenly">
        <CustomButton
          title="Update"
          handlePress={() => router.push(`/post/update-post/${post.id}`)}
          containerStyles="mr-2 flex-1"
          variant="outline"
        />
        <CustomButton
          isLoading={deletingPost}
          handlePress={() => deletePost(post.id, true)}
          title="Delete"
          variant="outline"
          titleStyles="text-red-500"
          containerStyles="border-red-500 w-32 py-1 ml-2 flex-1"
        />
      </View>
      <Text className="text-2xl font-bold mb-2.5">Comments</Text>
    </>
  );

  return (
    <SafeAreaView className="h-full p-3 mt-8 bg-white">
      <FlatList
        data={comments?.filter((comment) => comment.postId == post.id)}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={() => (
          <View className="items-center justify-center h-full rounded-lg bg-gray-50">
            <Text className="pt-3 text-lg text-gray-700 ">
              No comments on this post.
            </Text>
          </View>
        )}
        renderItem={({ item: comment }) => (
          <View className="p-3 mb-3 border border-gray-200 rounded-lg shadow-sm">
            <Text className="mb-3 text-base text-gray-700">{comment.body}</Text>
            <Text className="text-sm text-gray-400 mt-1.5 italic">
              -{" "}
              {comment.name.split(" ")[0] +
                " " +
                (comment.name.split(" ")[1] ?? "")}{" "}
              || {comment.email}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
