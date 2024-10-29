import React, { useState, forwardRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";
import CustomText from "../CustomText";
import i18next from "i18next";

const Input = forwardRef(function Input(
  {
    label,
    keyboardType = "default",
    secure = false,
    onUpdateValue,
    value,
    isInvalid = false,
    ...props
  },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);
  const { height, width } = useWindowDimensions();
  const isIos = Platform.OS === "ios";
  const currentLanguage = i18next.language;

  return (
    <View style={styles.inputContainer}>
      <Text
        style={[
          styles.label,
          isInvalid && styles.labelInvalid,
          { alignSelf: currentLanguage === "he" ? "flex-start" : "flex-end" },
        ]}
      >
        <CustomText tx={label} />
      </Text>
      <View>
        <TextInput
          {...props}
          ref={ref}
          style={[styles.input, isInvalid && styles.inputInvalid]}
          autoCapitalize="none"
          keyboardType={keyboardType}
          secureTextEntry={secure && !showPassword}
          onChangeText={onUpdateValue}
          value={value}
        />
        {secure && (
          <TouchableOpacity
            style={[
              styles.eyeIconContainer,
              {
                top: !isIos ? height * 0.013 : height * 0.009,
                left: currentLanguage === "he" ? width * 0.69 : 0,
              },
            ]}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye" : "eye-off"}
              size={20}
              color={Colors.primary800}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
});

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: "white",
    marginBottom: 4,
  },
  labelInvalid: {
    color: Colors.error500,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: "white",
    borderRadius: 4,
    fontSize: 16,
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
  eyeIconContainer: {
    position: "absolute",
  },
});
