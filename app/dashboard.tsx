import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ImageBackground } from "react-native";
import { login } from "../scripts/login";
import Backgroud from "../assets/images/background.jpg";
import Logo from "../assets/images/logo.png";
import { Link, Stack, router, useNavigation } from "expo-router";
const Dashboard = () => {
  return (
    <ImageBackground source={Backgroud} style={styles.background} resizeMode="cover">
      <Image source={Logo} style={styles.logo} />
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Hi, Welcome to Dashboard</Text>
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

  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#333",
    marginBottom: 20,
    marginHorizontal: "auto",
  },
});

export default Dashboard;
