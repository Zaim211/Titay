import { View, Text, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { Link, Redirect } from "expo-router";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";


const SignUp = () => {
  const {setUser, setIsLogged} = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill all fields");
    }
    setIsSubmitting(true);

    try {
      const response = await createUser(form.email, form.password, form.username);
      setUser(response);
      setIsLogged(true);
      setRedirect(true)
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
        <View className="px-4 my-6 min-h-[90vh] justify-center">
          <Image
            source={images.logo}
            className="w-16 h-16"
            resizeMode="contain"
          />
          <Text className="text-2xl mt-10 font-psemibold text-semibold text-white">
            Sign up to Titay
          </Text>
          <FormField
            title="Username"
            placeholder="Enter your username"
            otherStyles="mt-10"
            value={form.username}
            handleChangeText={(ev) => setForm({ ...form, username: ev })}
          />
          <FormField
            title="Email"
            placeholder="Enter your email"
            otherStyles="mt-6"
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
            title="Sing Up"
            handlePress={submit}
            containerStyles="w-full mt-7"
            isLoading={isSubmitting}
          />
          <Text className="text-center text-sm text-gray-200 mt-4">
            have an account already?  {" "}
            <Link href="/SignIn" className="text-secondary-200 underline">
              Sign in
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
