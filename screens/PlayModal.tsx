import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button, Image } from 'react-native';

import { Audio } from 'expo-av';
import { ProgressBar, Colors } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RootStackParamList } from '../types';

// Icons
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default function PlayModal({
  navigation,
  route
}: StackScreenProps<RootStackParamList, 'PlayModal'>) {

  // Hooks
  const [sound, setSound] = React.useState();
  const [play, setPlay] = React.useState(true);
  const [started, setStarted] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [animation, setAnimation] = React.useState();
  const LottieRef = React.useRef(null);

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@last_watched', value);
      console.log("Saving: " + value);
    } catch (e) {
      // saving error
      console.log(e);
    }
  }

  async function updateProgressBar(theSound) {
    return setInterval(async () => {
      setProgress((await theSound.getStatusAsync()).positionMillis / (await theSound.getStatusAsync()).playableDurationMillis);
    }, 1000);
  }

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      { uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" }
    );
    setSound(sound);
    setStarted(true);

    console.log('Playing Sound');
    await sound.playAsync();
    updateProgressBar(sound);
  }

  function controller(bool) {
    if (bool) {
      (!started) ? playSound() : sound.playAsync();
      LottieRef.current.play();
      storeData(route.params.programId);
    }
    else {
      sound.pauseAsync();
      LottieRef.current.pause();
    }

    setPlay(!play);
  }

  React.useEffect(() => {




    return sound ? () => {
      console.log('Unloading Sound');
      sound.unloadAsync();
    } : undefined;
  }, [sound]);
  return (
    <View style={styles.container}>

      <View style={styles.topAnimation}>
        <LottieView
          autoPlay={true}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
            opacity: 0.75,
          }}
          source={require('../assets/animations/leaf.json')}
        />
      </View>

      <View style={styles.back}>
        <TouchableOpacity
          onPress={() => { navigation.goBack() }}
        >
          <AntDesign name="back" size={28} color="black" />
        </TouchableOpacity>
      </View>


      <View style={styles.titleArea}>
        <Text style={styles.titleText}>
          {route.params.title}
        </Text>
      </View>

      <View>
        <Image source={{ uri: route.params.promo_image }} style={styles.image} />
      </View>

      <View style={styles.controllerArea}>
        <TouchableOpacity
          onPress={() => { controller(play) }}
        >
          {
            play ?
              <FontAwesome name="play" size={40} color="#D3AAE2" />
              :
              <FontAwesome5 name="pause" size={40} color="#D3AAE2" />
          }
        </TouchableOpacity>
      </View>

      <View style={styles.progressArea}>
        <ProgressBar style={styles.progressBar} progress={progress} color={'#D3AAE2'} />
      </View>

      <View style={styles.animationArea}>
        <LottieView
          ref={LottieRef}
          speed={0.50}
          autoPlay={false}
          style={{
            width: 100,
            height: 100,
            backgroundColor: 'transparent',
            opacity: 0.5,
          }}
          source={require('../assets/animations/music.json')}
        />
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2EAF5',
    padding: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  link: {
    marginTop: 15,
    paddingVertical: 15,
  },

  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },

  titleArea: {
    marginBottom: 20,
  },
  
  titleText: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'CormorantGaramond_700Bold',
    fontWeight: '600',
  },

  image: {
    width: 300,
    height: 200,
    borderRadius: 30,
  },

  controllerArea: {
    marginTop: 25
  },

  progressArea: {
    marginTop: 25,
    // marginBottom: 50,
    width: '90%',
  },

  animationArea: {
    position: 'absolute',
    bottom: 50,
  },

  progressBar: {
    width: '100%',
  },

  back: {
    position: 'absolute',
    left: 0,
    top: 50,
    padding: 30,
  },

  topAnimation: {
    position: 'absolute',
    left: 15,
    top: 0,
  }
});
