import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import useAuth from "@/hooks/useAuth";
import usePosts from "@/hooks/usePosts";
import { Post } from "@/types";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";

const AddPost = () => {
  const toast = useToast();
  const { createPost, creatingPost } = usePosts();
  const { user } = useAuth();

  const initialPostState: Post = {
    userId: String(user?.id) || "",
    id: String(Math.floor(Math.random() * 10000) + 1), // give a post a random id
    title: "",
    body: "",
  };

  const [formData, setFormData] = useState<Post>(initialPostState);

  const handleSubmit = () => {
    if (!formData.title || !formData.body) {
      return toast.show("Please fill in all fields", {
        type: "danger",
      });
    } else if (formData.title.length > 50 || formData.title.length < 5) {
      return toast.show("Title must be between 5 and 50 characters", {
        type: "danger",
      });
    } else if (formData.body.length > 200 || formData.body.length < 10) {
      return toast.show("Description must be between 10 and 200 characters", {
        type: "danger",
      });
    }

    createPost(formData, true);

    // restore default state
    setFormData(initialPostState);
  };

  return (
    <SafeAreaView className="h-full p-3 px-5 mt-8 mb-4">
      <View>
        <Text className="text-xl text-gray-800 font-rubiksemibold">
          Add Post
        </Text>
        <Text className="text-base text-gray-600">
          Fill in the form below to add a new a post
        </Text>
      </View>
      <View className="mt-8 mb-5">
        <CustomInput
          value={formData.title}
          label="Post Title"
          placeholder="Enter post title"
          onChangeText={(val) => setFormData({ ...formData, title: val })}
        />
        <CustomInput
          value={formData.body}
          label="Body"
          placeholder="Enter post body"
          onChangeText={(val) => setFormData({ ...formData, body: val })}
          multiline
          numberOfLines={4}
          containerStyles="mt-3"
          textAlignVertical="top"
        />
      </View>
      <CustomButton
        title="Add Post"
        handlePress={handleSubmit}
        isLoading={creatingPost}
        containerStyles="mt-8"
      />
    </SafeAreaView>
  );
};

export default AddPost;
