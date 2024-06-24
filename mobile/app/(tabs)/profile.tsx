import CustomButton from "@/components/CustomButton";
import useAuth from "@/hooks/useAuth";
import React from "react";
import { Image, SafeAreaView, Text, View } from "react-native";

export default function Profile() {
  const { loggingOut, logout, user } = useAuth();

  return (
    <SafeAreaView className="h-full bg-white">
      <View className="px-6">
        <Image
          source={require("@/assets/images/profile.png")}
          style={{
            width: 200,
            height: 200,
            alignSelf: "center",
            marginTop: 20,
          }}
        />
        <Text className="mt-5 text-2xl font-semibold text-center">
          {user?.name ?? "... username ..."}
        </Text>
        <Text className="text-base text-center text-gray-500">
          {user?.email ?? "... email ..."}
        </Text>
        <CustomButton
          title="Logout"
          isLoading={loggingOut}
          handlePress={logout}
          containerStyles="mt-8 border-red-500"
          variant="outline"
          titleStyles="text-red-500"
        />
      </View>
    </SafeAreaView>
  );
}
