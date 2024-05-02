import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const IOSNightSurvey = () => {
  return (
    <LinearGradient
      style={styles.iosNightSurvey}
      locations={[0, 0.76, 1, 1]}
      colors={["#0f1014", "#262d6c", "#3d4ac4", "rgba(10, 11, 29, 0)"]}
    >
      <Image
        style={styles.iconMenu}
        contentFit="cover"
        source={require("../assets/-icon-menu.png")}
      />
      <Image
        style={styles.iosNightSurveyChild}
        contentFit="cover"
        source={require("../assets/ellipse-3.png")}
      />
      <Text style={[styles.q1, styles.q1Typo]}>
        Q1. How did you feel about the weather today?
      </Text>
      <Text style={[styles.q11, styles.q1Typo]}>
        Q2. How did you feel about the weather yesterday?
      </Text>
      <Text style={[styles.q12, styles.q1Typo]}>
        Q3. Did you like our recommended outfit?
      </Text>
      <View style={styles.surveySubmitButton} />
      <Text style={[styles.submit, styles.submitTypo]}>Submit</Text>
      <View style={styles.yesnogroup}>
        <View style={styles.yesnogroupChild} />
        <View style={[styles.yesnogroupItem, styles.rectangleViewLayout]} />
        <Text style={styles.yes}>Yes</Text>
        <Text style={[styles.no, styles.noTypo]}>No</Text>
      </View>
      <View style={[styles.yesnogroup1, styles.yesnogroupLayout]}>
        <View style={styles.yesnogroupChild} />
        <View style={[styles.rectangleView, styles.rectangleViewLayout]} />
        <Text style={styles.yes}>Yes</Text>
        <Text style={[styles.no1, styles.noTypo]}>No</Text>
      </View>
      <View style={[styles.yesnogroup2, styles.yesnogroupLayout]}>
        <View style={styles.yesnogroupChild} />
        <View style={[styles.yesnogroupItem, styles.rectangleViewLayout]} />
        <Text style={styles.yes}>Yes</Text>
        <Text style={[styles.no1, styles.noTypo]}>No</Text>
      </View>
      <Text style={[styles.todaysSurveys, styles.submitTypo]}>
        Todays Surveys
      </Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  q1Typo: {
    textAlign: "left",
    color: Color.colorWhite,
    fontFamily: FontFamily.actorRegular,
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  submitTypo: {
    textAlign: "center",
    fontFamily: FontFamily.interRegular,
    color: Color.colorWhite,
    position: "absolute",
  },
  rectangleViewLayout: {
    left: 123,
    height: 19,
    width: 21,
    backgroundColor: Color.colorGainsboro_100,
    borderRadius: Border.br_9xs,
    position: "absolute",
  },
  noTypo: {
    left: 154,
    fontFamily: FontFamily.jostRegular,
    textAlign: "left",
    color: Color.colorWhite,
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  yesnogroupLayout: {
    height: 23,
    width: 176,
    left: 94,
    position: "absolute",
  },
  iconMenu: {
    marginTop: -371,
    width: "6.62%",
    top: "50%",
    right: "1.85%",
    left: "91.54%",
    maxWidth: "100%",
    height: 26,
    position: "absolute",
    overflow: "hidden",
  },
  iosNightSurveyChild: {
    top: 156,
    left: 14,
    width: 366,
    height: 6,
    position: "absolute",
  },
  q1: {
    top: 183,
    left: 19,
  },
  q11: {
    top: 286,
    left: 21,
  },
  q12: {
    top: 391,
    left: 21,
  },
  surveySubmitButton: {
    top: 505,
    left: 137,
    borderRadius: Border.br_7xl,
    backgroundColor: Color.colorSlateblue,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    width: 100,
    height: 36,
    position: "absolute",
  },
  submit: {
    top: 515,
    left: 165,
    fontSize: FontSize.size_smi,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowRadius: 4,
  },
  yesnogroupChild: {
    left: 0,
    height: 19,
    width: 21,
    backgroundColor: Color.colorGainsboro_100,
    borderRadius: Border.br_9xs,
    top: 2,
    position: "absolute",
  },
  yesnogroupItem: {
    top: 2,
  },
  yes: {
    left: 31,
    fontFamily: FontFamily.jostRegular,
    top: 0,
    textAlign: "left",
    color: Color.colorWhite,
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  no: {
    top: 2,
  },
  yesnogroup: {
    top: 223,
    height: 25,
    width: 176,
    left: 94,
    position: "absolute",
  },
  rectangleView: {
    top: 4,
  },
  no1: {
    top: 0,
    left: 154,
  },
  yesnogroup1: {
    top: 325,
  },
  yesnogroup2: {
    top: 430,
  },
  todaysSurveys: {
    top: 102,
    fontSize: FontSize.size_5xl,
    left: 21,
  },
  iosNightSurvey: {
    borderRadius: Border.br_8xl,
    flex: 1,
    width: "100%",
    height: 844,
    backgroundColor: "transparent",
    overflow: "hidden",
  },
});

export default IOSNightSurvey;