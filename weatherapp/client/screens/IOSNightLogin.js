import React, { useState, useCallback } from "react";
import { StyleSheet, View, Text, Pressable, Modal, TextInput, Alert,Keyboard, TouchableWithoutFeedback } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import IOSNightMenu from "../components/IOSNightMenu";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IOSNightLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [iconMenuVisible, setIconMenuVisible] = useState(false);

  const openIconMenu = useCallback(() => {
    setIconMenuVisible(true);
  }, []);

  const closeIconMenu = useCallback(() => {
    setIconMenuVisible(false);
  }, []);

  function handleSubmit(){
    console.log(email, password);
    const userData ={
      email: email,
      password,
    };
    axios
    .post("http://172.24.157.115:8082/login-user",userData)
    .then((res)=>{
      console.log(res.data);
      // navigation.navigate("IOSNightSetting");
      if(res.data.status =="ok"){
        Alert.alert("logged in successful");
        AsyncStorage.setItem("token",res.data.data);
        navigation.navigate("IOSNightSetting");
      }
    })
  }


  return (
    <>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <LinearGradient
        style={[styles.iosNightLogin, styles.iconLayout]}
        locations={[0, 0.76, 1, 1]}
        colors={["#0f1014", "#262d6c", "#3d4ac4", "rgba(10, 11, 29, 0)"]}
      >
        {/* signup */}
        <Pressable
          style={[styles.signup, styles.signupPosition1]}
          onPress={() => navigation.navigate("IOSNightSignup")}
        >
          <View style={[styles.surveySubmitButton, styles.surveyShadowBox]} />
          <Text style={[styles.signup, styles.signUpTypo]}>Sign up</Text>
        </Pressable>

        <View style={[styles.line2, styles.surveyShadowBox]} />

        {/* submit */}
        <Pressable
          style={[styles.submit, styles.signupPosition2]}
          onPress={() => handleSubmit()}
        >
          <View style={[styles.surveySubmitButton, styles.surveyShadowBox]} />
          <Text style={[styles.signup, styles.signUpTypo]}>Submit</Text>
        </Pressable>

        {/* password */}
        <View style={[styles.password, styles.emailPosition]}>
          <Image
            style={styles.fieldPosition}
            contentFit="cover"
            source={require("../assets/password-field.png")}
          />
          <TextInput
            style={[styles.inputText]}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            placeholderTextColor="#9a9a9a"
            secureTextEntry // This prop hides the password
          />
          <Text style={[styles.password1, styles.loginFlexBox]}>Password</Text>
        </View>

        {/* email */}
        <View style={[styles.email, styles.emailPosition]}>
          <View style={[styles.emailField, styles.fieldPosition]} />
          <TextInput
            style={[styles.inputText]}
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            placeholder="Email"
            placeholderTextColor="#B0B0B0"
          />
          <Text
            style={[styles.password1, styles.loginFlexBox]}
          >{`Email `}</Text>
        </View>
        <Text style={[styles.login, styles.loginFlexBox]}>login</Text>
        <Pressable style={styles.iconMenu} onPress={openIconMenu}>
          <Image
            style={[styles.icon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/-icon-menu.png")}
          />
        </Pressable>
      </LinearGradient>
      </TouchableWithoutFeedback>

      <Modal animationType="fade" transparent visible={iconMenuVisible}>
        <View style={styles.iconMenuOverlay}>
          <Pressable style={styles.iconMenuBg} onPress={closeIconMenu} />
          <IOSNightMenu onClose={closeIconMenu} />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    overflow: "hidden",
    width: "100%",
  },
  signupPosition1: {
    left: 220,
    // right: 59,
    width:100,
    height:100,
    position: "absolute",
    top : 335
  },
  signupPosition2: {
    left: 100,
    // right: 59,
    width:100,
    height:100,
    position: "absolute",

  },
  surveyShadowBox: {
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    position: "absolute",
  },
  signUpTypo: {
    textShadowRadius: 4,
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textAlign: "center",
    color: Color.colorWhite,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_smi,
    marginTop: -8.4,
    top: "65%",
  },
  emailPosition: {
    height: 47,
    width: 329,
    marginLeft: -159,
    left: "50%",
    position: "absolute",
  },
  loginFlexBox: {
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    color: Color.colorWhite,
    position: "absolute",
  },
  fieldPosition: {
    borderRadius: Border.br_8xs,
    marginLeft: -164.5,
    height: 47,
    width: 329,
    left: "50%",
    top: 0,
    position: "absolute",
  },
  surveySubmitButton: {
    backgroundColor: Color.colorSlateblue,
    borderRadius: Border.br_7xl,
    left: 0,
    bottom: 0,
    right: 0,
    top: 30,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  signup: {
    top: 421,
    bottom: 385,
  },
  line2: {
    height: "0.12%",
    marginLeft: -150,
    top: "49.26%",
    bottom: "50%",
    borderColor: "rgba(165, 164, 164, 0.49)",
    borderTopWidth: 1,
    width: 300,
    borderStyle: "solid",
    left: "50%",
  },
  submit: {
    top: 336,
    bottom: 470,
  },
  password1: {
    top: 3,
    fontSize: FontSize.size_mini,
    width: 136,
    height: 18,
    fontFamily: FontFamily.actorRegular,
    left: 11,
    display: "flex",
  },
  password: {
    top: 278,
  },
  emailField: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderColor: "rgba(255, 255, 255, 0.74)",
    borderWidth: 1,
    borderStyle: "solid",
  },
  inputText: {
    top: 23,
    width: 300,
    height: 20,
    fontFamily: FontFamily.actorRegular,
    left: 11,
    display: "flex",
    fontSize: FontSize.size_lg,
  },
  email: {
    top: 222,
  },
  login: {
    top: 59,
    left: 36,
    fontSize: FontSize.size_17xl,
    fontWeight: "900",
    fontFamily: FontFamily.interBlack,
    width: 181,
    height: 50,
  },
  iconMenuOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  iconMenuBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  icon: {
    marginTop: -371,
    maxWidth: "100%",
    height: "100%",
  },
  iconMenu: {
    left: "91.54%",
    right: "1.85%",
    width: "6.62%",
    height: 26,
    top: "50%",
    position: "absolute",
  },
  iosNightLogin: {
    borderRadius: Border.br_8xl,
    flex: 1,
    height: 844,
    backgroundColor: "transparent",
  },
});

export default IOSNightLogin;