import { View, Text, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { Link, Redirect } from "expo-router";
import { Signin, getCurrentUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const submit = async () => {
    if (form.email == "" || form.password === "") {
      Alert.alert("Error", "Please fill all fields");
    }

    setIsSubmitting(true);

    try {
      await Signin(form.email, form.password);
      const response = await getCurrentUser();
      setUser(response);
      setIsLogged(true);
      Alert.alert("Success", "Logged in successfully");
      setRedirect(true);
    } catch (error) { 
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (redirect) return <Redirect href="/home"/>;

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="px-4 my-1 min-h-[90vh] justify-center">
          <Image
            source={images.titay}
            className="w-16 h-16"
            resizeMode="contain"
          />
          <Text className="text-2xl mt-10 font-psemibold text-semibold text-white">
            Sign In to Titay
          </Text>
          <FormField
            title="Email"
            placeholder="Enter your email"
            otherStyles="mt-6"
            keyboardType="email-address"
            value={form.email}
            handleChangeText={(ev) => setForm({ ...form, email: ev })}
          />
          <FormField
            title="Password"
            placeholder="Enter your password"
            otherStyles="mt-6"
            value={form.password}
            handleChangeText={(ev) => setForm({ ...form, password: ev })}
          />
          <CustomButton
            title="Login"
            handlePress={submit}
            containerStyles="w-full mt-7"
            isLoading={isSubmitting}
          />
          <Text className="text-center text-sm text-gray-200 mt-4">
            Don't have an account?  {" "}
            <Link href="/SignUp" className="text-secondary-200 underline">
              Sign up
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
