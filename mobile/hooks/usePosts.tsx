/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import useSWR from "swr";
import axios, { baseURLs } from "../lib/axios.config";
import { Post } from "../types";
import useAuth from "./useAuth";
import { useRouter } from "expo-router";

export default function usePosts() {
  const toast = useToast();
  const router = useRouter();
  const { user } = useAuth();
  const [creatingPost, setCreatingPost] = useState(false);
  const [deletingPost, setDeletingPost] = useState(false);
  const [updatingPost, setUpdatingPost] = useState(false);

  const {
    data: posts,
    isLoading,
    error,
    mutate,
  } = useSWR<Post[]>(
    `${baseURLs.jsonplaceholder}/posts`,
    async (url: string) => {
      if (!user) return;
      const { data } = await axios.get(url);
      return data;
    }
  );
  useEffect(() => {
    mutate();
  }, [user]);

  const createPost = async (post: Post, redirect?: boolean) => {
    setCreatingPost(true);
    try {
      const { data } = await axios.post(
        `${baseURLs.jsonplaceholder}/posts`,
        post
      );
      if (data) {
        toast.show("Post created successfully", {
          type: "success",
        });
        mutate([...(posts || []), data]); // update the posts list and add new post
        if (redirect) {
          router.push(`/home`);
        }
      } else {
        toast.show("An error occurred", {
          type: "danger",
        });
      }
    } catch (error) {
      console.error(error);
      toast.show("An error occurred", {
        type: "danger",
      });
    } finally {
      setCreatingPost(false);
    }
  };

  const deletePost = async (id: string, redirect?: boolean) => {
    setDeletingPost(true);
    try {
      console.log(id);
      const { data } = await axios.delete(
        `${baseURLs.jsonplaceholder}/posts/${id}`
      );

      // if (data.success) {
      toast.show("Post deleted successfully", {
        type: "success",
      });
      mutate(posts?.filter((post) => post.id !== id));
      if (redirect) {
        router.push(`/home`);
      }
      // } else {
      //   toast.show("An error occurred", {
      //     type: "danger",
      //   });
      // }
    } catch (error) {
      console.error(error);
      toast.show("An error occurred", {
        type: "danger",
      });
    } finally {
      setDeletingPost(false);
    }
  };

  const updatePost = async (post: Post, redirect?: boolean) => {
    setUpdatingPost(true);
    try {
      const { data } = await axios.put(
        `${baseURLs.jsonplaceholder}/posts/${post.id}`,
        post
      );
      // if (data.success) {
      toast.show("Post updated successfully", {
        type: "success",
      });
      mutate(posts?.map((p) => (p.id === post.id ? post : p)));
      if (redirect) {
        router.push(`/home`);
      }
      // } else {
      //   toast.show("An error occurred", {
      //     type: "danger",
      //   });
      // }
    } catch (error) {
      console.error(error);
      toast.show("An error occurred", {
        type: "danger",
      });
    } finally {
      setDeletingPost(false);
    }
  };

  return {
    posts,
    isLoading,
    error,
    createPost,
    deletePost,
    updatePost,
    creatingPost,
    deletingPost,
    updatingPost,
  };
}
