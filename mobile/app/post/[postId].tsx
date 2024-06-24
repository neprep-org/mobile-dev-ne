import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import usePosts from "@/hooks/usePosts";
import { Post } from "@/types";
import Ioicons from "@expo/vector-icons/Ionicons";
import { usePathname, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";

const PostView = () => {
  const toast = useToast();
  const pathname = usePathname();
  const { posts, updatePost, updatingPost, deletePost, deletingPost } =
    usePosts();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState({
    userId: "",
    id: "",
    title: "",
    body: "",
  });

  useEffect(() => {
    if (pathname) {
      const id = pathname.split("/")[2];
      const post = posts?.find(
        (p) => parseInt(p.id as string, 10) === parseInt(id as string, 10)
      );
      if (post) {
        setPost(post);
        setFormData({
          userId: post.userId,
          id: post.id,
          title: post.title,
          body: post.body,
        });
      } else {
        setTimeout(() => {
          router.push("/home");
        }, 1000);
      }
    }
  }, []);

  const handleSubmit = () => {
    if (!formData.title || !formData.body) {
      return toast.show("Please fill in all fields", {
        type: "danger",
      });
    }

    // check if something changed
    if (formData.title === post?.title && formData.body === post?.body) {
      return toast.show("No changes detected", {
        type: "info",
      });
    }
    updatePost(
      {
        ...formData,
        id: post?.id as string,
      },
      true
    );
  };

  if (!post) return null;
  return (
    <SafeAreaView className="h-full p-3 bg-white">
      <View className="flex-row justify-between">
        <TouchableOpacity
          onPress={() => router.push("/home")}
          className="flex-row items-center h-fit"
        >
          <Ioicons name="arrow-back" size={24} />
          <Text>Back to posts</Text>
        </TouchableOpacity>
        <CustomButton
          isLoading={deletingPost}
          handlePress={() => deletePost(post.id, true)}
          title="Delete"
          variant="outline"
          titleStyles="text-red-500"
          containerStyles="border-red-500 w-32 py-1"
        />
      </View>
      <View className="mt-6">
        <Text className="text-xl text-gray-800 font-rubiksemibold">Post</Text>
        <View className="mt-4 mb-5">
          <CustomInput
            value={formData.title}
            label="Post Title"
            placeholder="Enter post title"
            onChangeText={(val) => setFormData({ ...formData, title: val })}
          />
          <CustomInput
            value={formData.body}
            label="Post Body"
            placeholder="Enter post's body"
            onChangeText={(val) => setFormData({ ...formData, body: val })}
            multiline
            numberOfLines={4}
            containerStyles="mt-3"
          />
        </View>
        <CustomButton
          isLoading={updatingPost}
          title="Update Post"
          handlePress={handleSubmit}
          containerStyles="mt-8"
        />
      </View>
    </SafeAreaView>
  );
};

export default PostView;
