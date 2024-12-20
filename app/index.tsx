import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ImageBackground } from "react-native";
import { login } from "../scripts/login";
import Backgroud from "../assets/images/background.jpg";
import Logo from "../assets/images/logo.png";
import { router } from "expo-router";
const App = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    errors: { email: "", password: "" },
    errorMessage: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onPressLogin = async () => {
    setForm((prev) => ({ ...prev, errors: { ...prev.errors, email: "", password: "" }, errorMessage: "" }));
    const payload = {
      email: form.email,
      password: form.password,
    };
    const response = await login(payload);
    if (response.status === 200) {
      router.navigate("./dashboard");
    } else if (response.status === 422) {
      if (response.data?.errors?.email) {
        setForm((prev) => ({ ...prev, errors: { ...prev.errors, email: response.data.errors.email } }));
      }
      if (response.data?.errors?.password) {
        setForm((prev) => ({ ...prev, errors: { ...prev.errors, password: response.data.errors.password } }));
      }
    } else {
      setForm((prev) => ({ ...prev, errorMessage: response.data.message }));
    }
  };

  const onPressForgotPassword = () => {
    // Handle forgot password funciton will be added here
  };

  return (
    <ImageBackground source={Backgroud} style={styles.background} resizeMode="cover">
      <Image source={Logo} style={styles.logo} />
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Login</Text>
          <View style={styles.form}>
            <Text style={styles.inputLabel}>Email</Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Enter Email ID . . ."
                placeholderTextColor="#476d7e"
                onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
              />
            </View>
            {form.errors.email && <Text style={styles.errorMessage}>{form.errors.email}</Text>}
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                secureTextEntry
                placeholder="Type here . . ."
                placeholderTextColor="#003f5c"
                onChangeText={(text) => setForm((prev) => ({ ...prev, password: text }))}
              />
            </View>
            {form.errors.password && <Text style={styles.errorMessage}>{form.errors.password}</Text>}
            {form.errorMessage && <Text style={styles.errorMessage}>{form.errorMessage}</Text>}
          </View>

          <View style={styles.bottomContainer}>
            <TouchableOpacity onPress={onPressForgotPassword}>
              <Text style={styles.forgotAndSignUpText}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressLogin} style={styles.loginBtn}>
              <Text>LOGIN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: "contain",
    marginTop: 80,
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    marginVertical: 40,
    alignItems: "center",
    width: "100%",
  },
  card: {
    width: "90%",
    backgroundColor: "white", // Transparent white background for contrast
    borderRadius: 15,
    alignItems: "flex-start",
    paddingVertical: 20,
    paddingHorizontal: 10,
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  form: {
    width: "100%",
    padding: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#333",
    marginBottom: 20,
    marginHorizontal: "auto",
  },
  inputLabel: {
    fontSize: 14,
    color: "#000000",
    marginBottom: 5,
  },
  inputView: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 4,
    height: 40,
    marginBottom: 10,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D3D3D3",
  },
  inputText: {
    height: 40,
    color: "#000",
    paddingLeft: 10,
  },
  errorMessage: {
    height: 40,
    color: "#db0606",
  },
  bottomContainer: {
    alignItems: "flex-start",
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: "100%",
  },
  forgotAndSignUpText: {
    color: "#007BFF",
    fontSize: 14,
  },
  loginBtn: {
    width: "100%",
    backgroundColor: "#007BFF",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});

export default App;
