import {
  Alert,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Register from "../components/Auth/Register";
import { createUser } from "../utils/api/auth";

import { AuthContext } from "../store/auth.context";

import React, { useContext, useState } from "react";
import { Header } from "../components/Header";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterScreen({ navigation }) {
  const [isAuth, setIsAuth] = useState(false);
  const authCtx = useContext(AuthContext);
  const { height } = useWindowDimensions();

  const handleRegister = async ({ email, password, name }) => {
    setIsAuth(true);
    try {
      const token = await createUser(email, password, name);
      authCtx.authenticate(token);
      if (token) {
        await AsyncStorage.setItem("token", token);
        navigation.navigate("home");
      }
    } catch (error) {
      Alert.alert(
        "Auth Failed!",
        "Could not create user , please check your input and try again!"
      );
      setIsAuth(false);
    }
  };

  if (isAuth) {
    return <LoadingOverlay message="auth is in progress..." />;
  }

  return (
    <LinearGradient
      colors={["#2c3e50", "#34495e"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView style={{ flex: 1, marginTop: 30 * (height * 0.0025) }}>
        <View>
          <Header text="welcome-screen.register" />
          <Register onAuthenticate={handleRegister} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
