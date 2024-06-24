// ViewPostScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { usePathname, useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";
import usePosts from "@/hooks/usePosts";
import { Comment, Post } from "@/types";
import useComments from "@/hooks/useComments";

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

      // set post
      if (post) {
        setPost(post);
      } else {
        setTimeout(() => {
          router.push("/home");
        }, 1000);
      }
    }
  }, []);

  if (!post) return <Text>Loading...</Text>;

  return (
    <ScrollView className="flex-1 p-2.5 bg-white">
      <Text className="text-3xl font-bold mb-2.5">{post.title}</Text>
      <Text className="mb-5 text-base text-gray-600">{post.body}</Text>
      <View className="flex-row justify-center mb-5">
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
      {comments?.map(
        (comment) =>
          comment.postId === post.id && (
            <View
              key={comment.id}
              className="bg-gray-100 p-2.5 rounded-md mb-2.5"
            >
              <Text className="text-base text-gray-800">{comment.body}</Text>
              <Text className="text-sm text-gray-600 mt-1.5 italic">
                -{" "}
                {comment.name.split(" ")[0] + " " + comment.name.split(" ")[1]}
              </Text>
            </View>
          )
      )}
    </ScrollView>
  );
}
