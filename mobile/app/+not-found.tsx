import CustomButton from "@/components/CustomButton";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView, Text } from "react-native";

export default function NotFoundScreen() {
  const router = useRouter();
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <SafeAreaView className="items-center justify-center flex-1">
        <Text className="text-xl font-semibold">
          This screen doesn't exist.
        </Text>
        <CustomButton
          handlePress={() => router.push("/")}
          title="Go Home"
          containerStyles="mt-6"
        />
      </SafeAreaView>
    </>
  );
}
