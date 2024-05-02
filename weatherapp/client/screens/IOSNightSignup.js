import React, { useState, useCallback } from "react";
import { StyleSheet, View, Text, Pressable, Modal, TextInput,ScrollView, Alert,Keyboard, TouchableWithoutFeedback } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import IOSNightMenu from "../components/IOSNightMenu";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";
import axios from 'axios';

const IOSNightSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailVerify, setEmailVerify] = useState(false);
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');

  const navigation = useNavigation();
  const [iconMenuVisible, setIconMenuVisible] = useState(false);

   
  function handelSubmit(){
    const userData={
      name: name,
      email: email,
      password,
      location,
    };

    axios
    .post("http://172.24.157.115:8082/register",userData)
    .then((res)=>{
      console.log(res.data);
      if (res.data.status == 'ok') {
        Alert.alert('Registered Successfull!!');
        navigation.navigate("IOSNightLogin");
      } else {
        Alert.alert('Registration Failed', JSON.stringify(res.data));
      }
    })
    .catch((error) => {
      console.log(error); // Make sure there's no typo here
      Alert.alert('Error', 'An unexpected error occurred.');
    });
  }

  const openIconMenu = useCallback(() => {
    setIconMenuVisible(true);
  }, []);

  const closeIconMenu = useCallback(() => {
    setIconMenuVisible(false);
  }, []);

  return (
    <>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <LinearGradient
        style={[styles.iosNightSignup, styles.iconLayout1]}
        locations={[0, 0.76, 1, 1]}
        colors={["#0f1014", "#262d6c", "#3d4ac4", "rgba(10, 11, 29, 0)"]}
      >
        <Pressable
          style={styles.submit}
          onPress={() => handelSubmit()}
        >
          <View style={[styles.surveySubmitButton, styles.surveyShadowBox]} />
          <Text style={[styles.submit1, styles.submit1Typo]}>Submit</Text>
        </Pressable>
        <Pressable
          style={[styles.cancel, styles.cancelPosition]}
          onPress={() => navigation.navigate("IOSNightLogin")}
        >
          <View style={[styles.surveySubmitButton1, styles.cancelPosition]} />
          <Text style={[styles.cancel1, styles.cancel1Position]}>Cancel</Text>
        </Pressable>

        {/* location */}
        <View style={[styles.location, styles.emailLayout]}>
          <View style={[styles.box, styles.boxLayout]} />
          <TextInput
            style={[styles.inputText, styles.inputTextTypo]}
            onChangeText={setLocation}
            value={location}
            placeholder="Enter your location"
            placeholderTextColor="#B0B0B0"
          />
          <Text style={[styles.email1, styles.email1Position]}>location:</Text>
          {/* <Text style={[styles.location1, styles.email1Typo]}>location:</Text> */}
          <Image
            style={[styles.registerIcon, styles.email1Position]}
            contentFit="cover"
            source={require("../assets/place-marker.png")}
          />
        </View>

        {/* password */}
        <View style={[styles.password, styles.emailLayout]}>
          <View style={[styles.box, styles.boxLayout]} />
          <TextInput
            style={[styles.inputText, styles.inputTextTypo]}
            onChangeText={setPassword}
            value={password}
            placeholder="Enter your password"
            placeholderTextColor="#B0B0B0"
            secureTextEntry // This prop hides the password
          />
          <Text style={[styles.email1, styles.email1Position]}>Password:</Text>
          <Image
            style={[styles.registerIcon, styles.email1Position]}
            contentFit="cover"
            source={require("../assets/lock.png")}
          />
        </View>

        {/* email */}
        <View style={[styles.email, styles.emailLayout]}>
          <View style={[styles.box, styles.boxLayout]} />
          <TextInput
            style={[styles.inputText, styles.inputTextTypo]}
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            placeholder="Enter your email"
            placeholderTextColor="#B0B0B0"
          />
          <Text style={[styles.email1, styles.email1Position]}>Email:</Text>
          <Image
            style={[styles.registerIcon, styles.email1Position]}
            contentFit="cover"
            source={require("../assets/letter.png")}
          />
        </View>

        {/* username */}
        <View style={[styles.username, styles.emailLayout]}>
          <View style={[styles.box, styles.boxLayout]} />
          <TextInput
            style={[styles.inputText, styles.inputTextTypo]}
            onChangeText={setName}
            value={name}
            placeholder="Enter your name"
            placeholderTextColor="#B0B0B0"
          />
          <Text style={[styles.email1, styles.email1Position]}>User name:</Text>
          <Image
            style={[styles.registerIcon, styles.email1Position]}
            contentFit="cover"
            source={require("../assets/letter1.png")}
          />
        </View>
        <Text style={[styles.register, styles.registerLayout]}>Register</Text>
        <Pressable style={styles.iconMenu} onPress={openIconMenu}>
          <Image
            style={[styles.icon, styles.iconLayout1]}
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
  iconLayout1: {
    overflow: "hidden",
    width: "100%",
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
    backgroundColor: Color.colorSlateblue,
    borderRadius: Border.br_7xl,
  },
  submit1Typo: {
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
    marginTop: -8,
    position: "absolute",
  },
  cancelPosition: {
    height: 80,
    width: 100,
    left: "50%",
    top: "45%",
    position: "absolute",
    
  },
  cancel1Position: {
    left: "50%",
    top: "50%",
  },
  emailLayout: {
    height: 47,
    width: 328,
    position: "absolute",
  },
  boxLayout: {
    borderRadius: Border.br_8xs,
    height: 57,
    width: 328,
    position: "absolute",
  },
  registerLayout: {
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    color: Color.colorWhite,
    position: "absolute",
  },
  // email1Typo: {
  //   height: 17,
  //   fontSize: FontSize.size_mini,
  //   alignItems: "center",
  //   display: "flex",
  //   textAlign: "left",
  //   fontFamily: FontFamily.actorRegular,
  //   color: Color.colorWhite,
  // },
  inputTextTypo: {
    width: 253,
    left: 66,
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    fontFamily: FontFamily.actorRegular,
    fontSize: FontSize.size_lg,
    color: Color.colorWhite,
    position: "absolute",
  },
  email1Position: {
    top: 20,
    position: "absolute",
  },
  surveySubmitButton: { //
    right: 0,
    bottom: 0,
    left: 0,
    top: 16,
    position: "absolute",
    height: 80,
    width: 100,
  },
  submit1: {
    left: 29,
    top: "46%",
  },
  submit: {
    top: 535,
    right: 77,
    bottom: 273,
    left: 213,
    position: "absolute",
  },
  surveySubmitButton1: {
    marginTop: -18,
    marginLeft: -50,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    backgroundColor: Color.colorSlateblue,
    borderRadius: Border.br_7xl,
  },
  cancel1: {
    marginLeft: -20,
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
    marginTop: 10,
    position: "absolute",
  },
  cancel: {
    marginTop: 113,
    marginLeft: -117,
  },
  box: {
    backgroundColor: Color.colorGray_200,
    borderStyle: "solid",
    borderColor: Color.colorWhitesmoke_100,
    borderWidth: 1,
    left: 12,
    top: 17,
  },
  // random: {
  //   width: 165,
  //   height: 20,
  //   fontFamily: FontFamily.actorRegular,
  //   fontSize: FontSize.size_lg,
  //   display: "flex",
  //   textAlign: "left",
  //   left: 65,
  //   top: 23,
  // },
  // location1: {
  //   width: 95,
  //   left: 66,
  //   top: 1,
  //   fontSize: FontSize.size_mini,
  //   position: "absolute",
  // },
  placeMarkerIcon: {
    top: 20,
    left: 15,
  },
  location: {
    top: 412,
    left: 24,
    width: 328,
  },
  passwordinput: {
    top: 18,
    width: 166,
    height: 29,
    left: 66,
    fontFamily: FontFamily.actorRegular,
    fontSize: FontSize.size_lg,
    display: "flex",
    textAlign: "left",
  },
  // password1: {
  //   width: 78,
  //   top: 1,
  //   fontSize: FontSize.size_mini,
  //   position: "absolute",
  //   left: 65,
  // },
  password: {
    top: 319,
    left: 24,
    width: 328,
  },

  email1: {
    width: 70,
    height: 17,
    fontSize: FontSize.size_mini,
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    fontFamily: FontFamily.actorRegular,
    color: Color.colorWhite,
    left: 66,
  },
  registerIcon: {
    height: 42,
    width: 40,
    left: 20,
    top: 2,
  },
  email: {
    top: 231,
    left: 24,
    width: 328,
  },
  nameFieldIcon: {
    marginTop: -23.5,
    marginLeft: -164,
    left: "50%",
    top: "50%",
  },
  inputText: {
    top: 45,
    height: 25,
  },
  // userName: {
  //   top: 4,
  //   width: 99,
  //   left: 66,
  //   position: "absolute",
  // },
  username: {
    top: 140,
    left: 24,
    width: 328,
  },
  register: {
    top: 60,
    left: 32,
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
  iosNightSignup: {
    borderRadius: Border.br_8xl,
    flex: 1,
    height: 844,
    backgroundColor: "transparent",
  },
});

export default IOSNightSignup;