# Recommended next steps:
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

!!) client 안에 IOSNightSignup 파일에서
axios
    .post("http://000.00.0.00:8082/register",userData)
    .then((res)=>{
      console.log(res.data);
      navigation.navigate("IOSNightLogin");
    })

이부분 바꾸기
1. 개인 ip address랑 port number 바꾸기 -> 000.00.0.00:8082 이부분

################### To run Server ##############
1. 서버 파일에서 터미널에 각 라인 넣고 돌리기
npm install expo@latest
npx expo install --fix 
npm i express nodemon
npm i mongoose
npm install bcryptjs
npm i jsonwebtoken

!!) 서버런 하기 전에 client port number보고 숫자 바꿔서 집어 넣기
예를 들어 client port number가 8081이면 8081+1해서 숫자 바꾸기
app.listen(8082,()=>{
    console.log("Node js server started.");
});

2. npx nodemon app 터미널에 넣고 돌리기
데이터베이스 연결 되면
....
Node js server started.
Database Connected
이런식으로 터미널에 뜸
# Weather-Clothes-App
