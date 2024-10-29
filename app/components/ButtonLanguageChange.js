import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import i18next, { languageResources } from "../services/i18next";
import languageList from "../services/languagesList.json";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function ButtonLanguageChange() {
  const { t } = useTranslation();
  const [visible, setVisible] = React.useState(false);
  const [toggle, setToggle] = useState(false);
  const changeLanguage = (lng) => {
    i18next.changeLanguage(lng);
    setVisible(false);
    setToggle(false);
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <>
      <TouchableOpacity style={styles.container} onPress={handleToggle}>
        {!toggle ? (
          <AntDesign name="down" size={24} color="white" />
        ) : (
          <AntDesign name="up" size={24} color="white" />
        )}
        <Image
          source={require("../../assets/Whiteglobe.png")}
          style={styles.image}
        />
      </TouchableOpacity>
      <View style={styles.languageList}>
        {toggle &&
          Object.keys(languageResources).map((lang, index) => {
            return (
              <View
                key={lang}
                style={[
                  styles.langItem,
                  { borderBottomWidth: index > 0 ? 0 : 2 },
                ]}
              >
                <TouchableOpacity onPress={() => changeLanguage(lang)}>
                  <Text style={styles.text}>
                    {languageList[lang].nativeName}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0F67B1",
    width: 70,
    alignContent: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: 10,
    padding: 6,
    height: 40,
  },
  image: {
    width: 30,
    height: 30,
  },
  languageList: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: "#0F67B1",
    zIndex: 300,
  },
  langItem: {
    borderBottomColor: "black",
    width: "100%",
  },
  text: {
    color: "white",
    margin: 3,
    padding: 4,
    textAlign: "center",
  },
});
