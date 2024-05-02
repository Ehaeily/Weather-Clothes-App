import * as React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontSize, Color, FontFamily, Border } from "../GlobalStyles";

const IOSNightMenu = ({ onClose }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.iosNightMenu}>
      <View style={[styles.profile, styles.profilePosition]}>
        <Text style={styles.userName}>User name</Text>
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
      <View style={styles.menu}>
        <Pressable
          style={[styles.setting, styles.mapPosition]}
          onPress={() => navigation.navigate("IOSNightLogin")}
        >
          <Image
            style={[styles.settingsIcon, styles.mapPosition]}
            contentFit="cover"
            source={require("../assets/settings.png")}
          />
          <Text style={styles.setting1}>Setting</Text>
        </Pressable>

        <Pressable
          style={[styles.map, styles.mapPosition]}
          onPress={() => navigation.navigate("IOSNight10days")}
        >
          <Text style={[styles.location, styles.likes1Typo]}>Location</Text>
          <Image
            style={[styles.settingsIcon, styles.mapPosition]}
            contentFit="cover"
            source={require("../assets/map-marker.png")}
          />
        </Pressable>

        {/* home icon */}
        <Pressable
          style={[styles.home, styles.mapPosition]}
          onPress={() => navigation.navigate("IOSRainyNightMain")}
        >
          <Image
            style={[styles.settingsIcon, styles.mapPosition]}
            contentFit="cover"
            source={require("../assets/icons8-home-50.png")}
          />
          <Text style={styles.hometext}>Home</Text>
        </Pressable>


        <View style={[styles.likes, styles.mapPosition]}>
          <Text style={[styles.likes1, styles.likes1Typo]}>Likes</Text>
          <Image
            style={[styles.settingsIcon, styles.mapPosition]}
            contentFit="cover"
            source={require("../assets/favorite.png")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profilePosition: {
    width: 101,
    left: "50%",
    position: "absolute",
  },
  mapPosition: {
    height: 30,
    left: 0,
    position: "absolute",
  },
  likes1Typo: {
    left: 43,
    fontSize: FontSize.size_lg,
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    color: Color.colorWhite,
    fontFamily: FontFamily.actorRegular,
    position: "absolute",
  },
  userName: {
    marginLeft: -46.5,
    top: 112,
    fontSize: FontSize.size_xl,
    height: 29,
    width: 92,
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    color: Color.colorWhite,
    fontFamily: FontFamily.actorRegular,
    left: "50%",
    position: "absolute",
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
    marginLeft: -49.5,
    top: 41,
    height: 141,
  },
  settingsIcon: {
    width: 30,
    top: 0,
  },
  setting1: {
    top: 2,
    left: 42,
    width: 57,
    height: 25,
    fontSize: FontSize.size_lg,
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    color: Color.colorWhite,
    fontFamily: FontFamily.actorRegular,
    position: "absolute",
  },
  setting: {
    top: 80,
    width: 99,
  },
  location: {
    top: 1,
    width: 70,
    height: 28,
  },
  map: {
    top: 40,
    width: 113,
  },
  likes1: {
    top: 4,
    width: 49,
    height: 22,
  },
  likes: {
    top: 0,
    width: 92,
  },
  menu: {
    top: 239,
    left: 27,
    height: 110,
    width: 113,
    position: "absolute",
  },
  iosNightMenu: {
    borderTopRightRadius: Border.br_8xl,
    borderBottomRightRadius: Border.br_8xl,
    backgroundColor: "rgba(45, 64, 74, 0.96)",
    width: 167,
    height: 925,
    overflow: "hidden",
    maxWidth: "100%",
    maxHeight: "100%",
    left: "30%",
  },
  home:{
    top :120
  },
  hometext: {
    top : 3,
    left: 43,
    fontSize: FontSize.size_lg,
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    color: Color.colorWhite,
    fontFamily: FontFamily.actorRegular,
    position: "absolute",
  }
});

export default IOSNightMenu;
