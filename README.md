### Recommended next steps:
Note: Make sure you have installed native code dependencies [here](https://reactnative.dev/docs/environment-setup#installing-dependencies)

### To preview and run the project on your device:
1. Open project folder in <u>Visual Studio Code</u>
2. Run  `npm install`  in the terminal
3. Run  `npx expo start`  in the terminal
4. Run on For iOS device (only on MacOS)
    1. Press  `i`  to view on iOS simulator or follow the instructions [here](https://docs.expo.dev/workflow/run-on-device/) to run on a physical device.
5. Run on For android device
    1. Press  `a`  to view on Android Virtual Device or follow the instructions [here](https://docs.expo.dev/workflow/run-on-device/) to run on a physical device.

    npx expo install react-native@0.71.14 react-native-gesture-handler@~2.9.0 react-native-screens@~3.20.0

!) need to change IP address in some file.

axios
    .post("http://000.00.0.00:8082/register",userData)
    .then((res)=>{
      console.log(res.data);
      navigation.navigate("IOSNightLogin");
    })

#### To run Server 

1. 
npm install expo@latest
npx expo install --fix 
npm i express nodemon
npm i mongoose
npm install bcryptjs
npm i jsonwebtoken

!) before the the Server, check client port number
ex) if client port number is 8081 then change to 8081+1

app.listen(8082,()=>{
    console.log("Node js server started.");
});

2. npx nodemon app 
....
Node js server started.
Database Connected


## this app is 
This app is based on the user's current location to fetch weather information for that area and recommend appropriate clothing choices for the weather. Users can also search for the weather in new locations and view a 10-day weather forecast for each location. It supports user personalization through registration and login features, and recommends various clothing choices based on the user's preferences.

<img width="234" alt="스크린샷 2024-05-02 오후 3 32 54" src="https://github.com/Ehaeily/Weather-Clothes-App/assets/122630020/4f24ab45-88c3-43c9-a0d7-0b65dc71d58e">

<img width="256" alt="스크린샷 2024-05-02 오후 3 33 36" src="https://github.com/Ehaeily/Weather-Clothes-App/assets/122630020/06f5103f-5394-4128-a078-b0a7865136fe">

<img width="246" alt="스크린샷 2024-05-02 오후 3 33 37" src="https://github.com/Ehaeily/Weather-Clothes-App/assets/122630020/7f3c3b68-208e-4942-91f4-5a3e3740aeab">

<img width="246" alt="스크린샷 2024-05-02 오후 3 33 41" src="https://github.com/Ehaeily/Weather-Clothes-App/assets/122630020/52ce5e6c-c496-476a-8e94-36f6887ce620">

<img width="239" alt="스크린샷 2024-05-02 오후 3 33 43" src="https://github.com/Ehaeily/Weather-Clothes-App/assets/122630020/9b927cff-ad61-431d-b422-f49a52fef2cc">

<img width="247" alt="스크린샷 2024-05-02 오후 3 33 44" src="https://github.com/Ehaeily/Weather-Clothes-App/assets/122630020/43d4cd35-641e-42de-b3aa-74efabdfff3f">

<img width="243" alt="스크린샷 2024-05-02 오후 3 33 47" src="https://github.com/Ehaeily/Weather-Clothes-App/assets/122630020/37485544-709b-4b04-ac24-9d9494aff17f">

<img width="243" alt="스크린샷 2024-05-02 오후 3 33 49" src="https://github.com/Ehaeily/Weather-Clothes-App/assets/122630020/ac5ff5de-77f2-447c-9aff-86af80778a94">

<img width="244" alt="스크린샷 2024-05-02 오후 3 33 50" src="https://github.com/Ehaeily/Weather-Clothes-App/assets/122630020/cbe5ff5d-8dea-4970-982c-c3ea4a465238">

