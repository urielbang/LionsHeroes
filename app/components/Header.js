import React, { useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import CustomText from "./CustomText";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import i18next from "i18next";

export const Header = ({
  text,
  goBackCallback,
  shouldShowBackButton = true,
}) => {
  const navigation = useNavigation();
  const currentLanguage = i18next.language;
  const { width } = useWindowDimensions();

  return (
    <View
      style={[
        styles.container,
        { flexDirection: currentLanguage === "he" ? "row-reverse" : "row" },
      ]}
    >
      {shouldShowBackButton && (
        <TouchableOpacity onPress={goBackCallback ?? navigation.goBack}>
          <AntDesign
            name="left"
            size={26}
            color="white"
            style={{ fontWeight: "bold", marginLeft: 2 }}
          />
        </TouchableOpacity>
      )}
      <CustomText
        allowFontScaling={false}
        style={[styles.headline, { fontSize: 20 * (width * 0.0025) }]}
        tx={text}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingTop: 36,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  headline: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
});
