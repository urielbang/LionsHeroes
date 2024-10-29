import {
  Animated,
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useRef } from "react";
import ButtonLanguageChange from "../components/ButtonLanguageChange";
import { Button } from "../components/Button";
import CustomText from "../components/CustomText";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { height, width } = useWindowDimensions();
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleRegisterPress = () => {
    navigation.navigate("RegisterScreen");
  };
  const handleLoginPress = () => {
    navigation.navigate("loginScreen");
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ImageBackground
        source={require("../../assets/backgroundWithLion.webp")}
        style={styles.background}
      >
        <View style={styles.buttonChangeLanguage}>
          <ButtonLanguageChange />
        </View>
        <View style={styles.contanerHeader}>
          <CustomText
            tx="welcome"
            style={[styles.header, { fontSize: 26 * (width * 0.0025) }]}
          />
        </View>
        <View style={[styles.containerButtons, { marginTop: height * 0.7 }]}>
          <Button onPress={handleRegisterPress}>welcome-screen.register</Button>
          <Button
            onPress={handleLoginPress}
            color={"#3FA2F6"}
            style={{ backgroundColor: "white" }}
          >
            welcome-screen.login
          </Button>
        </View>
      </ImageBackground>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    backgroundColor: "transparent",
    color: "black",
    textAlign: "right",
    fontFamily: "sans-serif",
    fontSize: 26,
    fontWeight: "bold",
  },
  containerButtons: {
    width: "100%",
    gap: 20,
    alignItems: "center",
  },

  buttonChangeLanguage: {
    flex: 1,
    position: "absolute",
    top: 30,
    right: 20,
  },
  header: {
    fontWeight: "bold",
    color: "white",
  },
  contanerHeader: {
    position: "absolute",
    top: 150,
  },
});
