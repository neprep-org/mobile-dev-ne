/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import useSWR from "swr";
import axios, { baseURLs } from "../lib/axios.config";
import { Comment } from "../types";
import useAuth from "./useAuth";

export default function useComments() {
  const { user } = useAuth();

  const {
    data: comments,
    isLoading,
    error,
    mutate,
  } = useSWR<Comment[]>(
    `${baseURLs.jsonplaceholder}/comments`,
    async (url: string) => {
      if (!user) return;
      const { data } = await axios.get(url);
      return data;
    }
  );
  useEffect(() => {
    mutate();
  }, [user]);

  return {
    comments,
    isLoading,
    error,
  };
}
