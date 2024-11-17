import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ImageBackground } from "react-native";
import { login } from "../../scripts/login";
import Backgroud from "../../assets/images/background.jpg";
import Logo from "../../assets/images/logo.png";
const App = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const onPressLogin = async () => {
    setErrors({
      email: "",
      password: "",
    });
    setErrorMessage("");
    const payload = {
      email: state.email,
      password: state.password,
    };
    const response = await login(payload);
    if (response.status === 200) {
      console.log(response);
    } else if (response.status === 422) {
      if (response.data?.errors?.email) {
        setErrors((prev) => ({ ...prev, email: response.data.errors.email }));
      }
      if (response.data?.errors?.password) {
        setErrors((prev) => ({ ...prev, password: response.data.errors.password }));
      }
    } else {
      setErrorMessage(response.data.message);
    }
  };

  const onPressForgotPassword = () => {
    // Handle forgot password
  };

  return (
    <ImageBackground source={Backgroud} style={styles.background} resizeMode="cover">
      <Image source={Logo} style={styles.logo} />
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
