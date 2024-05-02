
import React, { useState, useCallback , useEffect} from "react";
import { Image } from "expo-image";
import { StyleSheet, Pressable, View, Text, Modal, TextInput, TouchableOpacity, ScrollView ,Keyboard, TouchableWithoutFeedback} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import IOSNightMenu from "../components/IOSNightMenu";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import {debounce} from 'lodash';

import {MapPinIcon} from 'react-native-heroicons/solid';
import {fetchLocations, fetchWeatherForecast} from '../api/weather'
import * as Location from 'expo-location';



  


const IOSNight10days = () => {
  const [locations, setLocations] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [iconMenuVisible, setIconMenuVisible] = useState(false);
  const [weather,setWeather] = useState({});


  // 내일의 날짜와 요일 구하기
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const twoday = new Date(today);
  twoday.setDate(today.getDate() + 2);
  const threeday = new Date(today);
  threeday.setDate(today.getDate() + 3);
  const fourday = new Date(today);
  fourday.setDate(today.getDate() + 4);
  const fiveday = new Date(today);
  fiveday.setDate(today.getDate() + 5);
  const sixday = new Date(today);
  sixday.setDate(today.getDate() + 6);
  const sevenday = new Date(today);
  sevenday.setDate(today.getDate() + 7);
  const eightday = new Date(today);
  eightday.setDate(today.getDate() + 8);
  const nineday = new Date(today);
  nineday.setDate(today.getDate() + 9);
  
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const tomorrowDayOfWeek = days[tomorrow.getDay()];
  const twoDayAfter = days[twoday.getDay()];
  const threeDayAfter = days[threeday.getDay()];
  const fourDayAfter = days[fourday.getDay()];
  const fiveDayAfter = days[fiveday.getDay()];
  const sixDayAfter = days[sixday.getDay()];
  const sevenDayAfter = days[sevenday.getDay()];
  const eightDayAfter = days[eightday.getDay()];
  const nineDayAfter = days[nineday.getDay()];
  
  //아이콘 
  const iconUrl0 = weather.forecast?.forecastday[0]?.day?.condition?.icon;
  const fullIconUrl0 = iconUrl0 ? 'https:' + iconUrl0 : null;
  const iconUrl1 = weather.forecast?.forecastday[1]?.day?.condition?.icon;
  const fullIconUrl1 = iconUrl1 ? 'https:' + iconUrl1 : null;
  const iconUrl2 = weather.forecast?.forecastday[2]?.day?.condition?.icon;
  const fullIconUrl2 = iconUrl2 ? 'https:' + iconUrl2 : null;
  const iconUrl3 = weather.forecast?.forecastday[3]?.day?.condition?.icon;
  const fullIconUrl3 = iconUrl3 ? 'https:' + iconUrl3 : null;
  const iconUrl4 = weather.forecast?.forecastday[4]?.day?.condition?.icon;
  const fullIconUrl4 = iconUrl4 ? 'https:' + iconUrl4 : null;
  const iconUrl5 = weather.forecast?.forecastday[5]?.day?.condition?.icon;
  const fullIconUrl5 = iconUrl5 ? 'https:' + iconUrl5 : null;
  const iconUrl6 = weather.forecast?.forecastday[6]?.day?.condition?.icon;
  const fullIconUrl6 = iconUrl6 ? 'https:' + iconUrl6 : null;
  const iconUrl7 = weather.forecast?.forecastday[7]?.day?.condition?.icon;
  const fullIconUrl7 = iconUrl7 ? 'https:' + iconUrl7 : null;
  const iconUrl8 = weather.forecast?.forecastday[8]?.day?.condition?.icon;
  const fullIconUrl8 = iconUrl8 ? 'https:' + iconUrl8 : null;
  const iconUrl9 = weather.forecast?.forecastday[9]?.day?.condition?.icon;
  const fullIconUrl9 = iconUrl9 ? 'https:' + iconUrl9 : null;



  const fetchWeatherForecastByCoords = async (latitude, longitude) => {
    // Assuming your fetchWeatherForecast can also accept latitude and longitude
    const data = await fetchWeatherForecast({
        lat: latitude,
        lon: longitude,
        days: '10' ///여기 10으로 바꿔줘여함
    });
    if (data) {
        setWeather(data);
        console.log('Weather data based on current location: ', data);
    } else {
        console.error('Failed to fetch weather data');
    }
};

async function getCurrentLocationAndWeather() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location);

    // Now, fetch weather data using the obtained coordinates
    fetchWeatherForecastByCoords(location.coords.latitude, location.coords.longitude);
}

useEffect(() => {
    getCurrentLocationAndWeather();
}, []); // Empty dependency array means this effect runs once on component mount


  const openIconMenu = useCallback(() => {
    setIconMenuVisible(true);
  }, []);

  const closeIconMenu = useCallback(() => {
    setIconMenuVisible(false);
  }, []);

  const handleLocation = (loc) =>{
    console.log('location: ',loc);
    setLocations([]);
    // toggleSearch(false);
    fetchWeatherForecast({
      cityName: loc.name,
      days: '10'  //여기도 10으로 바꿔야함
    }).then(data=>{
      setWeather(data);
      console.log('got forecast: ', data);
    })
  }

  const handleSearch = value  =>{
    // console.log('value: ', value);
    //fetch locations
    if(value.length>2){
      fetchLocations({cityName: value}).then(data=>{
        // console.log('got locations: ', data);
        setLocations(data);
      })
    }
  }

  const handleTextDebaunce = useCallback(debounce(handleSearch, 1200), []);

  const {current, location} = weather;

  

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <LinearGradient
          style={[styles.iosNight10days, styles.iconLayout1]}
          locations={[0, 0.76, 1, 1]}
          colors={["#0f1014", "#262d6c", "#3d4ac4", "rgba(10, 11, 29, 0)"]}
        >
        
        <Pressable
          style={[styles.iconMenu, styles.iconPosition]}
          onPress={openIconMenu}
        >
          <Image
            style={[styles.icon, styles.iconLayout1]}
            contentFit="cover"
            source={require("../assets/-icon-menu.png")}
          />
        </Pressable>

        {/* forecast section */}
        <View style={styles.weatherInfo}>
          <View style={styles.weatherDetail}>
          <Text
            style={[styles.info, styles.textFlexBox]}
          >{current?.condition?.text}</Text>
          <Text style={[styles.degree, styles.textFlexBox]}>{Math.round(current?.temp_c)}°</Text>
          </View>
          <Text style={[styles.cityDetail]}>{location?.country}</Text>
          <Text style={[styles.city]}>{location?.name}</Text>
        </View>

{/* 10days */}

        {/* 10days */}

        {/* <ScrollView
            vertical
            // contentContainerStyle={{paddingVerical: 15}}
            showVerticalScrollIndicator={false}> */}
        <View style={[styles.daysInfo, styles.daysInfoPosition]}>
          <LinearGradient
            style={[styles.innerRec, styles.daysInfoPosition]}
            locations={[0, 1]}
            colors={["rgba(73, 103, 179, 0.68)", "rgba(63, 91, 161, 0)"]}
          />
          
         
         {/* +9 day */}
          <View style={styles.textMax10Parent}>
            <Text style={[styles.textMax10, styles.textLayout5]}>{Math.round(weather.forecast?.forecastday[9]?.day?.maxtemp_c)}°</Text>
            <Text style={[styles.text, styles.textLayout4]}>/</Text>
            <Text style={[styles.textMin10, styles.textLayout3]}>{Math.round(weather.forecast?.forecastday[9]?.day?.mintemp_c)}°</Text>
            {iconUrl9 &&(
              <Image
                style={[styles.icon10, styles.iconLayout]}
                contentFit="cover"
                source={{ uri: fullIconUrl9 }}
              />)}
            <Text style={[styles.textDate10, styles.textFlexBox]}>{nineDayAfter}</Text>
          </View>

          {/* +8 day */}
          <View style={[styles.textMax9Parent, styles.textParentPosition]}>
            <Text style={[styles.textMax10, styles.textLayout5]}>{Math.round(weather.forecast?.forecastday[8]?.day?.maxtemp_c)}°</Text>
            <Text style={[styles.text1, styles.textLayout2]}>/</Text>
            <Text style={[styles.textMin9, styles.textLayout1]}>{Math.round(weather.forecast?.forecastday[8]?.day?.mintemp_c)}°</Text>
            {iconUrl8 &&(   
              <Image
                style={[styles.icon9, styles.iconLayout]}
                contentFit="cover"
                source={{ uri: fullIconUrl8 }}
              />)}
            <Text style={[styles.textDate9, styles.textLayout]}>{eightDayAfter}</Text>
          </View>

          {/* +7 day */}
          <View style={[styles.textMax8Parent, styles.textParentPosition]}>
            <Text style={[styles.textMax8, styles.textTypo]}>{Math.round(weather.forecast?.forecastday[7]?.day?.maxtemp_c)}°</Text>
            <Text style={[styles.text2, styles.textTypo]}>/</Text>
            <Text style={[styles.textMin8, styles.textTypo]}>{Math.round(weather.forecast?.forecastday[7]?.day?.mintemp_c)}°</Text>
            {iconUrl7 &&( 
              <Image
                style={[styles.icon8, styles.iconLayout]}
                contentFit="cover"
                source={{ uri: fullIconUrl7 }}
              />)}
            <Text style={[styles.textDate9, styles.textLayout]}>{sevenDayAfter}</Text>
          </View>

          {/* +6 day */}
          <View style={[styles.textMax7Parent, styles.textParentLayout1]}>
            <Text style={[styles.textMax10, styles.textLayout5]}>{Math.round(weather.forecast?.forecastday[6]?.day?.maxtemp_c)}°</Text>
            <Text style={[styles.text, styles.textLayout4]}>/</Text>
            <Text style={[styles.textMin10, styles.textLayout3]}>{Math.round(weather.forecast?.forecastday[6]?.day?.mintemp_c)}°</Text>
            {iconUrl6 &&( 
              <Image
                style={[styles.icon8, styles.iconLayout]}
                contentFit="cover"
                source={{ uri: fullIconUrl6 }}
              />)}
            <Text style={[styles.textDate9, styles.textLayout]}>{sixDayAfter}</Text>
          </View>

          {/* +5 day */}
          <View style={[styles.textMax6Parent, styles.textParentLayout1]}>
            <Text style={[styles.textMax8, styles.textTypo]}>{Math.round(weather.forecast?.forecastday[5]?.day?.maxtemp_c)}°</Text>
            <Text style={[styles.text4, styles.textTypo]}>/</Text>
            <Text style={[styles.textMin6, styles.textTypo]}>{Math.round(weather.forecast?.forecastday[5]?.day?.mintemp_c)}°</Text>
            {iconUrl5 &&(
              <Image
                style={[styles.icon8, styles.iconLayout]}
                contentFit="cover"
                source={{ uri: fullIconUrl5 }}
              />)}
            <Text style={[styles.textDate9, styles.textLayout]}>{fiveDayAfter}</Text>
          </View>

          {/* +4 day */}
          <View style={[styles.textMax5Parent, styles.textParentLayout]}>
            <Text style={[styles.textMax8, styles.textTypo]}>{Math.round(weather.forecast?.forecastday[4]?.day?.maxtemp_c)}°</Text>
            <Text style={[styles.text4, styles.textTypo]}>/</Text>
            <Text style={[styles.textMin6, styles.textTypo]}>{Math.round(weather.forecast?.forecastday[4]?.day?.mintemp_c)}°</Text>
            {iconUrl4 &&( 
              <Image
                style={[styles.icion5Icon, styles.iconLayout]}
                contentFit="cover"
                source={{ uri: fullIconUrl4 }}
              />)}
            <Text style={[styles.textDate5, styles.textTypo]}>{fourDayAfter}</Text>
          </View>

          {/* +3 day */}
          <View style={[styles.textMax4Parent, styles.textParentLayout]}>
            <Text style={[styles.textMax8, styles.textTypo]}>{Math.round(weather.forecast?.forecastday[3]?.day?.maxtemp_c)}°</Text>
            <Text style={[styles.text4, styles.textTypo]}>/</Text>
            <Text style={[styles.textMin6, styles.textTypo]}>{Math.round(weather.forecast?.forecastday[3]?.day?.mintemp_c)}°</Text>
            {iconUrl3 &&(  
              <Image
                style={[styles.icion5Icon, styles.iconLayout]}
                contentFit="cover"
                source={{ uri: fullIconUrl3 }}
              />
            )}
            <Text style={[styles.textDate5, styles.textTypo]}>{threeDayAfter}</Text>
          </View>

          {/* +2 day */}
          <View style={[styles.textMax3Parent, styles.textParentPosition]}>
            <Text style={[styles.textMax8, styles.textTypo]}>{Math.round(weather.forecast?.forecastday[2]?.day?.maxtemp_c)}°</Text>
            <Text style={[styles.text2, styles.textTypo]}>/</Text>
            <Text style={[styles.textMin8, styles.textTypo]}>{Math.round(weather.forecast?.forecastday[2]?.day?.mintemp_c)}°</Text>
            {iconUrl2 &&(  
              <Image
                style={[styles.icion5Icon, styles.iconLayout]}
                contentFit="cover"
                source={{ uri: fullIconUrl2 }}
              />
            )}
            <Text style={[styles.textDate5, styles.textTypo]}>{twoDayAfter}{}</Text>
          </View>

          {/* +1 day */}    
          <View style={[styles.textMax2Parent, styles.textParentLayout]}>
            <Text style={[styles.textMax8, styles.textTypo]}>{Math.round(weather.forecast?.forecastday[1]?.day?.maxtemp_c)}°</Text>
            <Text style={[styles.text4, styles.textTypo]}>/</Text>
            <Text style={[styles.textMin6, styles.textTypo]}>{Math.round(weather.forecast?.forecastday[1]?.day?.mintemp_c)}°</Text>
            {iconUrl1 &&(  
              <Image
                style={[styles.icon2, styles.iconLayout]}
                contentFit="cover"
                source={{ uri: fullIconUrl1 }}
              />
            )}
            <Text style={[styles.textDate5, styles.textTypo]}>{tomorrowDayOfWeek} {/* 내일의 요일 */}</Text>
            {/* <Text style={[styles.textDate5, styles.textTypo]}>Fri</Text> */}
          </View>

         {/* D-day */}
          <View style={[styles.textMax1Parent, styles.textParentLayout1]}>
            <Text style={[styles.textMax1, styles.textPosition]}>{Math.round(weather.forecast?.forecastday[0]?.day?.maxtemp_c)}°</Text>
            <Text style={[styles.text9, styles.textPosition]}>/</Text>
            <Text style={[styles.textMin1, styles.textPosition]}>{Math.round(weather.forecast?.forecastday[0]?.day?.mintemp_c)}°</Text>
            {iconUrl0 &&(
              <Image
                style={[styles.icon1, styles.iconLayout]}
                contentFit="cover"
                source={{ uri: fullIconUrl0 }}
              />
            )}
            <Text style={[styles.textDate1, styles.textTypo]}>Today</Text>
          </View>


          <Text style={[styles.textTitle, styles.textFlexBox]}>
            10-DAY FORECAST
          </Text>
          <Image
            style={[styles.lineGroupIcon, styles.iconPosition]}
            contentFit="cover"
            source={require("../assets/line-group.png")}
          />
          </View>

{/* end 10days box */}

        
        {/* </ScrollView> */}

         {/* search bar */}
         <View style={[styles.search, styles.searchLayout]}>
          <Image
            style={[styles.searchbarIcon, styles.searchLayout]}
            contentFit="cover"
            source={require("../assets/searchbar.png")}
          />
          {/* <Text style={[styles.searchForA, styles.textPosition]}>
            Search for a city
          </Text> */}
          <TextInput 
            style={[styles.searchForA, styles.textPosition]}
            placeholder="Search for a city" 
            placeholderTextColor="#9a9a9a"
            onFocus={() => setIsSearchFocused(true)} // Show suggestions on focus
            onBlur={() => setIsSearchFocused(false)}
            onChangeText={handleTextDebaunce}/>
            {isSearchFocused && locations.length > 0 && (
            <View style={styles.suggestionsContainer}>
              {locations.map((loc, index) => (
                <TouchableOpacity 
                onPress={() => handleLocation(loc)}
                key={index} 
                style={styles.suggestionItem}>
                  <MapPinIcon style={styles.mapIcon} />
                  <Text style={styles.suggestionText}>{loc?.name}, {loc?.country}</Text>
                </TouchableOpacity>
              ))}
            </View>
            )}
          <Image
            style={styles.searchIcon}
            contentFit="cover"
            source={require("../assets/search.png")}
          />
        </View>
        

        

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
  iconPosition: {
    top: "50%",
    position: "absolute",
  },
  daysInfoPosition: {
    height: 592,
    width: 350,
    marginLeft: -175,
    // marginTop: -175,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  textLayout5: {
    height: 18,
    width: 33,
    right: 0,
  },
  textLayout4: {
    width: 15,
    right: 29,
    height: 22,
  },
  textLayout3: {
    right: 42,
    height: 18,
    width: 33,
  },
  iconLayout: {
    width: 55,
    top: 0,
    height: 43,
    position: "absolute",
  },
  textFlexBox: {
    textAlign: "left",
    position: "absolute",
  },
  textParentPosition: {
    right: 39,
    height: 43,
    position: "absolute",
  },
  textLayout2: {
    right: 30,
    height: 22,
    width: 15,
    color: Color.colorWhite,
  },
  textLayout1: {
    right: 43,
    height: 18,
    width: 33,
    color: Color.colorWhite,
  },
  textLayout: {
    width: 52,
    left: 0,
    height: 22,
  },
  textTypo: {
    top: 10,
    textAlign: "left",
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_lg,
    position: "absolute",
  },
  textParentLayout1: {
    width: 271,
    height: 43,
    right: 40,
    position: "absolute",
  },
  textParentLayout: {
    width: 269,
    height: 43,
    right: 40,
    position: "absolute",
  },
  textPosition: {
    top: 9,
    textAlign: "left",
    color: Color.colorWhite,
    fontSize: FontSize.size_lg,
    position: "absolute",
  },
  cityPosition: {
    top: 0,
    left: 0,
  },
  searchLayout: {
    height: 40,
    width: 320,
    position: "absolute",
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
  },
  innerRec: {
    marginTop: -296,
    borderRadius: 47,
    backgroundColor: "transparent",
  },
  textMax10: {
    textAlign: "left",
    position: "absolute",
    color: Color.colorWhite,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_lg,
    top: 11,
  },
  text: {
    height: 22,
    textAlign: "left",
    position: "absolute",
    color: Color.colorWhite,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_lg,
    top: 11,
  },
  textMin10: {
    textAlign: "left",
    position: "absolute",
    color: Color.colorWhite,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_lg,
    top: 11,
  },
  icon10: {
    marginLeft: -29,
    left: "50%",
  },
  textDate10: {
    width: 53,
    left: 0,
    height: 22,
    color: Color.colorWhite,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_lg,
    top: 11,
    textAlign: "left",
  },
  textMax10Parent: {
    top: 523,
    height: 43,
    right: 40,
    width: 272,
    position: "absolute",
  },
  text1: {
    textAlign: "left",
    position: "absolute",
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_lg,
    top: 11,
  },
  textMin9: {
    textAlign: "left",
    position: "absolute",
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_lg,
    top: 11,
  },
  icon9: {
    marginLeft: -30,
    left: "50%",
  },
  textDate9: {
    textAlign: "left",
    position: "absolute",
    color: Color.colorWhite,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_lg,
    top: 11,
  },
  textMax9Parent: {
    top: 473,
    width: 272,
    right: 39,
  },
  textMax8: {
    height: 18,
    width: 33,
    right: 0,
    color: Color.colorWhite,
  },
  text2: {
    right: 30,
    height: 22,
    width: 15,
    color: Color.colorWhite,
  },
  textMin8: {
    right: 43,
    height: 18,
    width: 33,
    color: Color.colorWhite,
  },
  icon8: {
    left: 106,
  },
  textMax8Parent: {
    top: 423,
    width: 272,
    right: 39,
  },
  textMax7Parent: {
    top: 373,
  },
  text4: {
    height: 22,
    width: 15,
    right: 29,
    color: Color.colorWhite,
  },
  textMin6: {
    right: 42,
    height: 18,
    width: 33,
    color: Color.colorWhite,
  },
  textMax6Parent: {
    top: 323,
  },
  icion5Icon: {
    left: 104,
  },
  textDate5: {
    width: 50,
    left: 0,
    height: 22,
    color: Color.colorWhite,
  },
  textMax5Parent: {
    top: 274,
  },
  textMax4Parent: {
    top: 224,
  },
  textMax3Parent: {
    top: 174,
    width: 270,
  },
  icon2: {
    marginLeft: -30.5,
    left: "50%",
  },
  textMax2Parent: {
    top: 124,
  },
  textMax1: {
    height: 18,
    width: 33,
    right: 0,
    fontFamily: FontFamily.interRegular,
  },
  text9: {
    height: 22,
    width: 15,
    right: 29,
    fontFamily: FontFamily.interRegular,
  },
  textMin1: {
    right: 42,
    height: 18,
    width: 33,
    fontFamily: FontFamily.interRegular,
  },
  icon1: {
    marginLeft: -29.5,
    left: "50%",
  },
  textDate1: {
    color: "#78a7df",
    width: 52,
    left: 0,
    height: 22,
  },
  textMax1Parent: {
    top: 74,
  },
  textTitle: {
    top: 33,
    left: 39,
    fontSize: FontSize.size_xs,
    width: 205,
    height: 20,
    color: Color.colorWhite,
    fontFamily: FontFamily.interRegular,
  },
  lineGroupIcon: {
    marginTop: -239,
    marginLeft: -136,
    width: 273,
    height: 513,
    left: "50%",
  },
  daysInfo: {
    // marginTop: 300,
    marginTop: -170,
  },
  info: {
    // alignItems: 'center',
    top: 90,
    left: -10,
    fontSize: 15,
    color: Color.colorWhite,
    fontFamily: FontFamily.interRegular,
  },
  degree: {
    top: 80,
    right: 20,
    fontSize: 25,
    fontFamily: FontFamily.encodeSansSemiCondensedRegular,
    color: Color.colorWhite,
  },
  city: {
    fontSize: FontSize.size_21xl,
    textAlign: "center", // Center text horizontally
    color: Color.colorWhite,
    fontFamily: FontFamily.interRegular,
  },
  weatherInfo: {
    top: 145,
    // left: 73,
    // width: 224,
    // height: 99,
    // left: 0, // Align to the left edge of the parent to allow centering within the full width
    // right: 0, // Align to the right edge of the parent to allow centering within the full width
    alignItems: 'center', // 조건과 온도를 중앙에 정렬합니다.
    // paddingVertical: 10, // 위아래로 패딩을 추가합니다.
  },
  weatherDetail: {

    position: 'center',
  },
  searchbarIcon: {
    borderRadius: Border.br_xl,
    left: 0,
    top: 0,
  },
  searchForA: {
    marginLeft: -98,
    fontFamily: FontFamily.actorRegular,
    display: "flex",
    alignItems: "center",
    width: 200,
    height: 21,
    left: "50%",
  },
  searchIcon: {
    top: 5,
    left: 15,
    width: 30,
    height: 29,
    position: "absolute",
  },
  search: {
    top: 77,
    left: 38,
  },
  iosNight10days: {
    borderRadius: Border.br_8xl,
    flex: 1,
    height: 844,
    backgroundColor: "transparent",
  },
  suggestionsContainer: {
    position: 'absolute',
    top: 50, // Adjust this based on your search bar's height
    left: 0,
    right: 0,
    backgroundColor: 'lightgray', // Or any other background color
    borderRadius: 20,
    zIndex: 2, // Ensure this is above other components
  },
  suggestionItem: {
    flexDirection: 'row', // Arrange children (icon and text) in a row
    alignItems: 'center', // Center items vertically in the container
    // justifyContent: 'space-between',
    padding: 15,
    // fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#9E9E9E', // Light grey color for the item separator
  },
  mapIcon: {
    size: "20",
    color: "gray",
  },
  cityDetail: {
    fontSize: 20, // Adjusted fontSize for consistency
    textAlign: "center", // Center text horizontally
    color: Color.colorWhite,
    fontFamily: FontFamily.interRegular,
    marginTop: 4, // Adjust spacing between city and cityDetail as needed
  }
});

export default IOSNight10days;