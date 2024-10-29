import {
  Alert,
  Platform,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import { Header } from "../components/Header";
import Login from "../components/Auth/Login";
import { AuthContext } from "../store/auth.context";
import { loginUser } from "../utils/api/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [isAuth, setIsAuth] = useState(false);
  const authCtx = useContext(AuthContext);
  const isIos = Platform.OS == "ios";
  const { height, width } = useWindowDimensions();

  const handleLogin = async ({ email, password }) => {
    setIsAuth(true);
    try {
      const token = await loginUser(email, password);
      authCtx.authenticate(token);
      if (token) {
        await AsyncStorage.setItem("token", token);
        navigation.navigate("home");
      }
    } catch (error) {
      Alert.alert("Auth failed", "Could not log in try again later!");
      setIsAuth(false);
    }
  };

  if (isAuth) {
    return <LoadingOverlay message="login is in progress..." />;
  }

  return (
    <LinearGradient
      colors={["#2c3e50", "#34495e"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Header text="welcome-screen.login" />
      <View style={{ marginTop: isIos ? height * 0.2 : height * 0.2 }}>
        <Login onAuthenticate={handleLogin} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
