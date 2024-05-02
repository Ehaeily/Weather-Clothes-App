import React, { useState, useCallback, useEffect } from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text, Pressable, Modal, ScrollView, TextInput, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import IOSNightMenu from "../components/IOSNightMenu";
import { Color, Border, FontSize, FontFamily } from "../GlobalStyles";
import {debounce} from 'lodash';

import {fetchLocations, fetchWeatherForecast} from '../api/weather'
import * as Location from 'expo-location';
import {MapPinIcon} from 'react-native-heroicons/solid';
// import { ScrollView } from "react-native-gesture-handler";

const IOSRainyNightMain = () => {
  const [iconMenuVisible, setIconMenuVisible] = useState(false);

  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const [imageIndex, setImageIndex] = useState(0);
  const images= [require("../assets/20_01.jpg"), require("../assets/20_02.jpg"), require("../assets/20_03.jpg"),require("../assets/20_04.jpg"),require("../assets/20_05.jpg"),require("../assets/20_06.jpg"),require("../assets/b27_20_01.jpg")];

  const images5_8 = [require("../assets/b5_8_01.jpg"), require("../assets/b5_8_02.jpg"), require("../assets/b5_8_03.jpg"),require("../assets/b5_8_04.jpg"),require("../assets/b5_8_05.jpg"),require("../assets/b5_8_06.jpg"),require("../assets/b5_8_07.jpg"),require("../assets/b5_8_08.jpg"),require("../assets/b5_8_09.jpg"),require("../assets/b5_8_10.jpg")];

  const images9_11 = [require("../assets/b9_11_01.jpg"), require("../assets/b9_11_02.jpg"), require("../assets/b9_11_03.jpg"),require("../assets/b9_11_04.jpg"),require("../assets/b9_11_05.jpg"),require("../assets/b9_11_06.jpg"),require("../assets/b9_11_07.jpg")];

  const images12_16 = [require("../assets/b12_16_01.jpg"), require("../assets/b12_16_02.jpg"), require("../assets/b12_16_03.jpg"),require("../assets/b12_16_04.jpg"),require("../assets/b12_16_05.jpg"),require("../assets/b12_16_06.jpg")];

  const images17_19 = [require("../assets/b17_19_01.jpg"), require("../assets/b17_19_02.jpg"), require("../assets/b17_19_03.jpg"),require("../assets/b17_19_04.jpg"),require("../assets/b17_19_05.jpg"),require("../assets/b17_19_06.jpg"),require("../assets/b17_19_07.jpg"),require("../assets/b17_19_08.jpg")];

  const images20_22 = [require("../assets/b20_22_01.jpg"), require("../assets/b20_22_02.jpg"), require("../assets/b20_22_03.jpg"),require("../assets/b20_22_04.jpg"),require("../assets/b20_22_05.jpg"),require("../assets/b20_22_06.jpg")];

  const images23_27 = [require("../assets/b23_27_01.jpg"), require("../assets/b23_27_02.jpg"), require("../assets/b23_27_03.jpg"),require("../assets/b23_27_04.jpg"),require("../assets/b23_27_05.jpg"),require("../assets/b23_27_06.jpg")];

  const images0_4 = [require("../assets/below4_01.jpg"), require("../assets/below4_02.jpg"), require("../assets/below4_03.jpg"),require("../assets/below4_04.jpg"),require("../assets/below4_05.jpg"),require("../assets/below4_06.jpg"),require("../assets/below4_07.jpg"),require("../assets/below4_08.jpg")];

  
  //////////////////////////////////adding////////////////////////////

  // handleResetClick 함수 정의
  const handleResetClick = () => {
    setImageIndex((imageIndex + 1) % images.length);
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때마다 랜덤 이미지 선택
    handleResetClick();
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때 한 번만 실행되도록 함





  const [locations, setLocations] = useState([]);
  const [weather,setWeather] = useState({});

  const fetchWeatherForecastByCoords = async (latitude, longitude) => {
    // Assuming your fetchWeatherForecast can also accept latitude and longitude
    const data = await fetchWeatherForecast({
        lat: latitude,
        lon: longitude,
        days: '7'
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

const handleLocation = (loc) =>{
  console.log('location: ',loc);
  setLocations([]);
  // toggleSearch(false);
  fetchWeatherForecast({
    cityName: loc.name,
    days: '7'
  }).then(data=>{
    setWeather(data);
    console.log('got forecast: ', data);
  })
}

//
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

 //////////////////////////////////adding////////////////////////////
  const openIconMenu = useCallback(() => {
    setIconMenuVisible(true);
  }, []);

  const closeIconMenu = useCallback(() => {
    setIconMenuVisible(false);
  }, []);

  const { current, location } = weather || {};
  return (
    <>
     
      <LinearGradient
        style={[styles.iosRainyNightMain, styles.iconLayout]}
        locations={[0, 0.76, 1, 1]}
        colors={["#0f1014", "#262d6c", "#3d4ac4", "rgba(10, 11, 29, 0)"]}
      >
        
        <LinearGradient
          style={styles.iosRainyNightMainChild}
          locations={[0, 1]}
          colors={["#284694", "rgba(143, 154, 241, 0)"]}
        />

        <View style={styles.iosRainyNightMainItem} />
        
        <Text
          style={[styles.recommendedClothes, styles.infoFlexBox]}
        >{`Recommended clothes `}</Text>
        
        

{/* if 27_40*/}
        {Math.round(current?.temp_c) >= "28" && Math.round(current?.temp_c) <= "40" &&(
        <ScrollView 
        horizontal
        contentContainerStyle={{paddingHorizontal :10}}
        showsHorizontalScrollIndicator={false}>

        <Pressable onPress={handleResetClick} style={styles.iconMenu}>
          <Image source={require("../assets/icons8-reset-50.png")}  style={[styles.icon2, styles.iconLayout]}
            contentFit="cover" />
        </Pressable>
          <View 
            style={[styles.cloth01]}
          ><Image source={images[imageIndex]} style={{ width: 400, height: 530, borderRadius: 48 }} />
          </View>
          <View
            style={[styles.cloth01]}
          ><Image source={images[imageIndex+1]} style={{ width: 400, height: 530, borderRadius: 48 }} />
          </View>
          <View
            style={[styles.cloth01]}
          ><Image source={images[imageIndex+2]} style={{ width: 400, height: 530, borderRadius: 48 }} />
          </View>

         
        </ScrollView>
        )}


{/* if 5_8*/}
        {Math.round(current?.temp_c) >= "5" && Math.round(current?.temp_c) <= "8" &&(
        <ScrollView 
        horizontal
        contentContainerStyle={{paddingHorizontal :10}}
        showsHorizontalScrollIndicator={false}>

        <Pressable onPress={handleResetClick} style={styles.iconMenu}>
          <Image source={require("../assets/icons8-reset-50.png")}  style={[styles.icon2, styles.iconLayout]}
            contentFit="cover" />
        </Pressable>
          <View 
            style={[styles.cloth01]}
          ><Image source={images5_8[imageIndex]} style={{ width: 400, height: 530, borderRadius: 48 }} />
          </View>
          <View
            style={[styles.cloth01]}
          ><Image source={images5_8[imageIndex+1]} style={{ width: 400, height: 530, borderRadius: 48 }} />
          </View>
          <View
            style={[styles.cloth01]}
          ><Image source={images5_8[imageIndex+2]} style={{ width: 400, height: 530, borderRadius: 48 }} />
          </View>
         
        </ScrollView>
        )}

        {/* if 9_11*/}
        {Math.round(current?.temp_c) >= "9" && Math.round(current?.temp_c) <= "11" &&(
        <ScrollView 
        horizontal
        contentContainerStyle={{paddingHorizontal :10}}
        showsHorizontalScrollIndicator={false}>

        <Pressable onPress={handleResetClick} style={styles.iconMenu}>
          <Image source={require("../assets/icons8-reset-50.png")}  style={[styles.icon2, styles.iconLayout]}
            contentFit="cover" />
        </Pressable>
          <View 
            style={[styles.cloth01]}
          ><Image source={images9_11[imageIndex]} style={{ width: 400, height: 530, borderRadius: 48 }} />
          </View>
          <View
            style={[styles.cloth01]}
          ><Image source={images9_11[imageIndex+1]} style={{ width: 400, height: 530, borderRadius: 48 }} />
          </View>
          <View
            style={[styles.cloth01]}
          ><Image source={images9_11[imageIndex+2]} style={{ width: 400, height: 530, borderRadius: 48 }} />
          </View>
         
        </ScrollView>
        )}

        {/* if 12_16*/}
        {Math.round(current?.temp_c) >= "12" && Math.round(current?.temp_c) <= "16" &&(
        <ScrollView 
        horizontal
        contentContainerStyle={{paddingHorizontal :10}}
        showsHorizontalScrollIndicator={false}>

        <Pressable onPress={handleResetClick} style={styles.iconMenu}>
          <Image source={require("../assets/icons8-reset-50.png")}  style={[styles.icon2, styles.iconLayout]}
            contentFit="cover" />
        </Pressable>
          <View 
            style={[styles.cloth01]}
          ><Image source={images12_16[imageIndex]} style={{ width: 400, height: 530, borderRadius: 48 }} />
          </View>
          <View
            style={[styles.cloth01]}
          ><Image source={images12_16[imageIndex+1]} style={{ width: 400, height: 530, borderRadius: 48 }} />
          </View>
          <View
            style={[styles.cloth01]}
          ><Image source={images12_16[imageIndex+2]} style={{ width: 400, height: 530, borderRadius: 48 }} />
          </View>
         
        </ScrollView>
        )}


        {/* if 17_19*/}
        {Math.round(current?.temp_c) >= "17" && Math.round(current?.temp_c) <= "19" &&(
        <ScrollView 
        horizontal
        contentContainerStyle={{paddingHorizontal :10}}
        showsHorizontalScrollIndicator={false}>

        <Pressable onPress={handleResetClick} style={styles.iconMenu}>
          <Image source={require("../assets/icons8-reset-50.png")}  style={[styles.icon2, styles.iconLayout]}
            contentFit="cover" />
        </Pressable>
          <View 
            style={[styles.cloth01]}
          ><Image source={images17_19[imageIndex]} style={{ width: 400, height: 530, borderRadius: 48 }} />
          </View>
          <View
            style={[styles.cloth01]}
          ><Image source={images17_19[imageIndex+1]} style={{ width: 400, height: 530, borderRadius: 48 }} />
          </View>
          <View
            style={[styles.cloth01]}
          ><Image source={images17_19[imageIndex+2]} style={{ width: 400, height: 530, borderRadius: 48 }} />
          </View>
         
        </ScrollView>
        )}

        {/* if 20_22*/}
        {Math.round(current?.temp_c) >= "20" && Math.round(current?.temp_c) <= "22" &&(
        <ScrollView 
        horizontal
        contentContainerStyle={{paddingHorizontal :10}}
        showsHorizontalScrollIndicator={false}>

        <Pressable onPress={handleResetClick} style={styles.iconMenu}>
          <Image source={require("../assets/icons8-reset-50.png")}  style={[styles.icon2, styles.iconLayout]}
            contentFit="cover" />
        </Pressable>
          <View 
            style={[styles.cloth01]}
          ><Image source={images20_22[imageIndex]} style={{ width: 400, height: 530, borderRadius: 48 }} />
          </View>
          <View
            style={[styles.cloth01]}
          ><Image source={images20_22[imageIndex+1]} style={{ width: 400, height: 530, borderRadius: 48 }} />
          </View>
          <View
            style={[styles.cloth01]}
          ><Image source={images20_22[imageIndex+2]} style={{ width: 400, height: 530, borderRadius: 48 }} />
          </View>
         
        </ScrollView>
        )}

        {/* if 23_27*/}
        {Math.round(current?.temp_c) >= "23" && Math.round(current?.temp_c) <= "27" &&(
        <ScrollView 
        horizontal
        contentContainerStyle={{paddingHorizontal :10}}
        showsHorizontalScrollIndicator={false}>

        <Pressable onPress={handleResetClick} style={styles.iconMenu}>
          <Image source={require("../assets/icons8-reset-50.png")}  style={[styles.icon2, styles.iconLayout]}
            contentFit="cover" />
        </Pressable>
          <View 
            style={[styles.cloth01]}
          ><Image source={images23_27[imageIndex]} style={{ width: 400, height: 530, borderRadius: 48 }} />
          </View>
          <View
            style={[styles.cloth01]}
          ><Image source={images23_27[imageIndex+1]} style={{ width: 400, height: 530, borderRadius: 48 }} />
          </View>
          <View
            style={[styles.cloth01]}
          ><Image source={images23_27[imageIndex+2]} style={{ width: 400, height: 530, borderRadius: 48 }} />
          </View>
         
        </ScrollView>
        )}

        {/* if 0_4*/}
        {Math.round(current?.temp_c) >= "-10" && Math.round(current?.temp_c) <= "4" &&(
        <ScrollView 
        horizontal
        contentContainerStyle={{paddingHorizontal :10}}
        showsHorizontalScrollIndicator={false}>

        <Pressable onPress={handleResetClick} style={styles.iconMenu}>
          <Image source={require("../assets/icons8-reset-50.png")}  style={[styles.icon2, styles.iconLayout]}
            contentFit="cover" />
        </Pressable>
          <View 
            style={[styles.cloth01]}
          ><Image source={images0_4[imageIndex]} style={{ width: 400, height: 530, borderRadius: 48 }} />
          </View>
          <View
            style={[styles.cloth01]}
          ><Image source={images0_4[imageIndex+1]} style={{ width: 400, height: 530, borderRadius: 48 }} />
          </View>
          <View
            style={[styles.cloth01]}
          ><Image source={images0_4[imageIndex+2]} style={{ width: 400, height: 530, borderRadius: 48 }} />
          </View>
         
        </ScrollView>
        )}



        <Pressable style={styles.iconMenu} onPress={openIconMenu}>
          <Image
            style={[styles.icon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/-icon-menu.png")}
          />
        </Pressable>
        
        

        {/* forecast section */}
        <View style={styles.weatherInfo}>
          <Text
            style={[styles.info, styles.infoFlexBox]}
          >{current?.condition?.text}</Text>
          <Text style={[styles.degree, styles.infoFlexBox]}>{Math.round(current?.temp_c)}°</Text>
          <Text style={[styles.city, styles.infoFlexBox]}>{location?.name || 'Loading...'}</Text>
        </View>

      </LinearGradient>

      <Modal animationType="fade" transparent visible={iconMenuVisible}>
        <View style={styles.iconMenuOverlay}>
          <Pressable style={styles.iconMenuBg} onPress={closeIconMenu} />
          <IOSNightMenu onClose={closeIconMenu} />
        </View>
      </Modal>

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
    </>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    overflow: "hidden",
    width: "100%",
  },
  infoFlexBox: {
    textAlign: "left",
    color: Color.colorWhite,
    position: "absolute",
  },
  // dalle20240216152020CrIcon: {
  //   top: 299,
  //   left: -7,
  //   width: 397,
  //   height: 580,
  //   opacity: 0.8,
  //   position: "absolute",
  // },
  // iosRainyNightMainChild: { // 뒷에 배경 바
  //   top: 364,
  //   left: 2,
  //   borderTopLeftRadius: Border.br_22xl,
  //   borderTopRightRadius: Border.br_22xl,
  //   width: 425,
  //   height: 806,
  //   position: "absolute",
  //   backgroundColor: "transparent",
  // },
  // iosRainyNightMainItem: {
  //   top: 582,
  //   left: 179,
  //   borderRadius: 40,
  //   backgroundColor: "#d9d9d9",
  //   width: 43,
  //   height: 7,
  //   position: "absolute",
  // },
  recommendedClothes: {
    top: 335,
    left: 55,
    fontSize: 20,
    fontFamily: FontFamily.interRegular,
    color: Color.colorWhite,
  },
  // rain116242512801Icon: {
  //   top: -6,
  //   left: 1,
  //   width: 398,
  //   height: 560,
  //   opacity: 0.5,
  //   position: "absolute",
  // },
  info: {
    top: 114,
    left: 110,
    fontSize: FontSize.size_5xl,
    fontFamily: FontFamily.interRegular,
    color: Color.colorWhite,
  },
  degree: {
    top: 97,
    left: 5,
    fontSize: 64,
    fontFamily: FontFamily.encodeSansSemiCondensedRegular,
  },
  city: {
    top: 0,
    left: 0,
    fontSize: FontSize.size_21xl,
    fontFamily: FontFamily.interRegular,
    color: Color.colorWhite,
  },
  weatherInfo: {
    top: 137,
    left: 59,
    width: 224,
    height: 176,
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
  icon2: {
    marginTop: -150,
    maxWidth: 40,
    height: 40,
    left: 35
  },
  
  iconMenu: {
    left: "91.54%",
    top: "50%",
    right: "1.85%",
    width: "6.62%",
    height: 26,
    position: "absolute",
  },
  
  iosRainyNightMain: {
    borderRadius: Border.br_8xl,
    flex: 1,
    height: 844,
    backgroundColor: "transparent",
  },
  cloth01: {
    top: 364,
    left: 0,
    height:530,
    backgroundColor:"#d9d9d9",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 400,
    borderRadius: 48, // 3 * 16
    paddingVertical: 3,
    marginHorizontal: 4,
    marginTop: 4,
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
  searchLayout: {
    height: 40,
    width: 320,
    position: "absolute",
  },
  textPosition: {
    top: 9,
    textAlign: "left",
    color: Color.colorWhite,
    fontSize: FontSize.size_lg,
    position: "absolute",
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
});

export default IOSRainyNightMain;