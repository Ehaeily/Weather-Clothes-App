import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, View, Text, Pressable, Modal } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import IOSNightMenu from "../components/IOSNightMenu";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IOSNightSetting = () => {
  const [userData, setUserData] = useState('');
  const [iconMenuVisible, setIconMenuVisible] = useState(false);

  const openIconMenu = useCallback(() => {
    setIconMenuVisible(true);
  }, []);

  const closeIconMenu = useCallback(() => {
    setIconMenuVisible(false);
  }, []);

  async function getData(){
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    axios
    .post("http://172.24.157.115:8082/userdata",{token:token})
    .then(res => {
      console.log(res.data);
      setUserData(res.data.data);
    });
  }

  useEffect(async()=>{
    getData();
  }, []);

  return (
    <>
      <LinearGradient
        style={[styles.iosNightSetting, styles.iconLayout1]}
        locations={[0, 0.76, 1, 1]}
        colors={["#0f1014", "#262d6c", "#3d4ac4", "rgba(10, 11, 29, 0)"]}
      >
        <View style={styles.iosNightSettingChild} />
        <View style={styles.submit}>
          <Text style={[styles.submit1, styles.hiFlexBox]}>Submit</Text>
        </View>
        <View style={styles.email}></View>
        <View style={[styles.temp, styles.tempLayout]}>
          <View style={[styles.cButton, styles.buttonLayout]}>
            <View style={styles.rectangle} />
            <Text style={styles.text} />
          </View>
          <Text style={[styles.celsiusC, styles.celsiusCTypo]}>
            Celsius (°C)
          </Text>
          <View style={[styles.fButton, styles.buttonLayout]}>
            <View style={styles.rectangle} />
            <Text style={styles.text} />
          </View>
          <Text style={[styles.fahrenheitF, styles.celsiusCTypo]}>
            Fahrenheit (°F)
          </Text>
          <Image
            style={[styles.thermometerAutomationIcon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/thermometer-automation.png")}
          />
        </View>
        <View style={[styles.line3, styles.lineShadowBox]} />
        <View style={[styles.location, styles.tempLayout]}>
          <Text style={[styles.locationinput, styles.emailinputLayout]}>
            city name
          </Text>
          <Text style={[styles.location1, styles.location1Layout]}>
            location:
          </Text>
          <Image
            style={[styles.placeMarkerIcon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/place-marker.png")}
          />
        </View>
        <View style={[styles.line2, styles.lineShadowBox]} />
        <View style={styles.password}>
          <Text style={[styles.passwordinput, styles.email1Position]}>{userData.password}</Text>
          <Text style={[styles.password1, styles.email1Position]}>
            Password:
          </Text>
          <Image
            style={[styles.lockIcon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/lock.png")}
          />
        </View>
        <View style={[styles.line1, styles.lineShadowBox]} />
        <View style={styles.email}>
          <Text style={[styles.emailinput, styles.emailinputLayout]}>
            {userData.email}
          </Text>
          <Text style={[styles.email1, styles.email1Position]}>Email:</Text>
          <Image
            style={[styles.letterIcon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/letter1.png")}
          />
        </View>
        <View style={[styles.profile, styles.profilePosition]}>
          <Text style={[styles.userName, styles.userNameFlexBox]}>{userData.name}</Text>
          <Image
            style={[styles.profileCircleIcon, styles.profilePosition]}
            contentFit="cover"
            source={require("../assets/profile-circle.png")}
          />
          <Image
            style={styles.userPicIcon}
            contentFit="cover"
            source={require("../assets/user-pic.png")}
          />
        </View>
        <Text style={[styles.hi, styles.hiFlexBox]}>
          <Text style={styles.hi1}>Hi</Text>
          <Text style={styles.text2}>!</Text>
        </Text>
        <Pressable style={styles.iconMenu} onPress={openIconMenu}>
          <Image
            style={[styles.icon, styles.iconLayout1]}
            contentFit="cover"
            source={require("../assets/-icon-menu.png")}
          />
        </Pressable>
      </LinearGradient>

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
  hiFlexBox: {
    textAlign: "center",
    color: Color.colorWhite,
    position: "absolute",
  },
  tempLayout: {
    height: 50,
    position: "absolute",
  },
  buttonLayout: {
    height: 20,
    width: 20,
    left: 220,
    position: "absolute",
  },
  celsiusCTypo: {
    height: 25,
    textAlign: "left",
    fontFamily: FontFamily.actorRegular,
    fontSize: FontSize.size_xl,
    left: 74,
    alignItems: "center",
    display: "flex",
    color: Color.colorWhite,
    position: "absolute",
  },
  iconLayout: {
    height: 40,
    width: 40,
    left: 0,
    position: "absolute",
  },
  lineShadowBox: {
    width: 325,
    borderTopWidth: 1,
    borderColor: Color.colorLightgray,
    height: "0.12%",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    borderStyle: "solid",
    left: "50%",
    position: "absolute",
  },
  emailinputLayout: {
    height: 27,
    width: 231,
  },
  location1Layout: {
    height: 24,
    width: 78,
    fontSize: FontSize.size_sm,
    top: 0,
  },
  email1Position: {
    left: 76,
    textAlign: "left",
    fontFamily: FontFamily.actorRegular,
    alignItems: "center",
    display: "flex",
    color: Color.colorWhite,
    position: "absolute",
  },
  profilePosition: {
    width: 101,
    left: "50%",
    position: "absolute",
  },
  userNameFlexBox: {
    textAlign: "left",
    fontFamily: FontFamily.actorRegular,
    alignItems: "center",
    display: "flex",
    color: Color.colorWhite,
    position: "absolute",
  },
  iosNightSettingChild: {
    marginLeft: -176,
    top: 268,
    borderRadius: Border.br_xl,
    backgroundColor: "rgba(148, 148, 148, 0.35)",
    borderColor: "rgba(236, 236, 236, 0.74)",
    borderWidth: 1,
    width: 352,
    height: 370,
    borderStyle: "solid",
    left: "50%",
    position: "absolute",
    
    // textShadowRadius: 4,
    // textShadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // textShadowColor: "rgba(0, 0, 0, 0.25)",
    // textAlign: "center",
    // color: Color.colorWhite,
    // fontFamily: FontFamily.interRegular,
    // fontSize: FontSize.size_smi,
    // marginTop: -8,
    // position: "absolute",
  },
  submit1: {
    top: 10,
    left: 27,
    fontSize: FontSize.size_smi,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowRadius: 4,
    fontFamily: FontFamily.interRegular,
  },
  submit: {
    marginLeft: -49,
    top: 672,
    borderRadius: Border.br_7xl,
    backgroundColor: Color.colorSlateblue,
    width: 98,
    height: 36,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    left: "50%",
    position: "absolute",
  },
  rectangle: {
    right: 0,
    bottom: 0,
    backgroundColor: Color.colorGray_100,
    left: 0,
    top: 0,
    position: "absolute",
  },
  text: {
    fontSize: FontSize.size_xs,
    color: Color.colorDarkslategray_100,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    left: 0,
    top: 0,
    height: 20,
    width: 20,
    textAlign: "center",
    fontFamily: FontFamily.interRegular,
    position: "absolute",
  },
  cButton: {
    top: 2,
  },
  celsiusC: {
    width: 100,
    top: 0,
  },
  fButton: {
    top: 27,
  },
  fahrenheitF: {
    top: 25,
    width: 134,
  },
  thermometerAutomationIcon: {
    top: 5,
  },
  temp: {
    top: 526,
    width: 240,
    left: 45,
  },
  line3: {
    marginLeft: -159.5,
    top: 510,
    // bottom: "39.51%",
  },
  locationinput: {
    top: 23,
    fontSize: FontSize.size_lg,
    textAlign: "left",
    fontFamily: FontFamily.actorRegular,
    alignItems: "center",
    display: "flex",
    color: Color.colorWhite,
    position: "absolute",
    left: 74,
  },
  location1: {
    textAlign: "left",
    fontFamily: FontFamily.actorRegular,
    alignItems: "center",
    display: "flex",
    color: Color.colorWhite,
    position: "absolute",
    left: 74,
  },
  placeMarkerIcon: {
    top: 3,
  },
  location: {
    top: 448,
    left: 45,
    width: 305,
  },
  line2: {
    marginLeft: -162.5,
    top: 430,
    // bottom: "48.05%",
  },
  passwordinput: {
    top: 24,
    height: 27,
    width: 231,
    fontSize: FontSize.size_xl,
  },
  password1: {
    height: 24,
    width: 78,
    fontSize: FontSize.size_sm,
    top: 0,
  },
  lockIcon: {
    top: 4,
  },
  password: {
    top: 365,
    width: 307,
    height: 47,
    left: 45,
    position: "absolute",
  },
  line1: {
    marginLeft: -166.5,
    top: 350,
    // bottom: "56.69%",
  },
  emailinput: {
    top: 20,
    left: 75,
    textAlign: "left",
    fontFamily: FontFamily.actorRegular,
    alignItems: "center",
    display: "flex",
    color: Color.colorWhite,
    position: "absolute",
    fontSize: FontSize.size_xl,
  },
  email1: {
    width: 50,
    fontSize: FontSize.size_sm,
    left: 76,
    top: 0,
    height: 20,
  },
  letterIcon: {
    top: 0,
  },
  email: {
    top: 290,
    width: 306,
    height: 47,
    left: 45,
    position: "absolute",
  },
  userName: {
    marginLeft: -46.5,
    top: 112,
    width: 92,
    height: 29,
    fontSize: FontSize.size_xl,
    left: "50%",
    fontFamily: FontFamily.actorRegular,
  },
  profileCircleIcon: {
    marginLeft: -50.5,
    height: 102,
    top: 0,
  },
  userPicIcon: {
    left: 6,
    width: 90,
    height: 90,
    top: 0,
    position: "absolute",
  },
  profile: {
    marginLeft: -51,
    top: 107,
    height: 141,
  },
  hi1: {
    fontWeight: "800",
    fontFamily: FontFamily.interExtraBold,
  },
  text2: {
    fontFamily: FontFamily.interRegular,
  },
  hi: {
    top: 51,
    left: 11,
    fontSize: FontSize.size_17xl,
    width: 109,
    height: 39,
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
    top: "50%",
    right: "1.85%",
    width: "6.62%",
    height: 26,
    position: "absolute",
  },
  iosNightSetting: {
    borderRadius: Border.br_8xl,
    flex: 1,
    height: 844,
    backgroundColor: "transparent",
  },
});

export default IOSNightSetting;