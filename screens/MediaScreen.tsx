import * as React from 'react';
import { StyleSheet, Image, FlatList, TouchableOpacity, Button, ImageBackground } from 'react-native';

import { Text, View } from '../components/Themed';
import { AntDesign } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

// Redux
import { ApplicationState, storeAllData, storeProgramData } from '../redux';
import { useSelector, useDispatch } from 'react-redux';

const fetchURL = "https://app-14423.on-aptible.com/programs";

function getDurationFormat(time) {
  var minutes = Math.floor(time / 60);
  var seconds = time - minutes * 60;
  return minutes + ':' + seconds;
}

const Item = ({ data, navigation, id }) => (
  <View style={styles.item}>

    <View style={styles.itemTitleArea}>
      <Text style={styles.itemTitle}>
        {data.attributes.name}
      </Text>
    </View>

    <View style={styles.itemPlay}>
      <TouchableOpacity
        onPress={() => navigation.navigate('PlayModal', {
          programId: id,
          episodeId: data.id
        })}
      >
        <LottieView
          autoPlay={true}
          style={{
            width: 60,
            height: 60,
            backgroundColor: 'transparent',
            opacity: 0.75,
          }}
          source={require('../assets/animations/play.json')}
        />
        <Text style={styles.itemDuration}>
          {getDurationFormat(data.attributes.assets[0].duration)}
        </Text>
      </TouchableOpacity>
    </View>

    <View style={styles.itemMetaArea}>
      <Text style={styles.itemMeta}>
        {data.attributes.description}
      </Text>
    </View>
  </View>
);

export default function MediaScreen({ navigation, route }) {

  // Redux
  const dispactch = useDispatch();
  const {allData, programData} = useSelector((state: ApplicationState) => state.UserReducer);

  // Hooks
  const [programName, setProgramName] = React.useState("");
  const [episodes, setEpisodes] = React.useState([]);

  // Render for Flatlist
  const renderItem = ({ item }) => (
    <Item data={item} navigation={navigation} id={route.params} />
  );

  React.useEffect(() => {

    for(let program of programData){
      if (program.data.id == route.params){
        setEpisodes(program.included);
        setProgramName(program.data.attributes.name);
        break;
      }
    }
  }, []);

  return (

    <View style={styles.container}>

      <Image source={require('../assets/images/flower.png')} style={styles.image} />

      <View style={styles.back}>
        <TouchableOpacity
          onPress={() => { navigation.navigate('Meditation') }}
        >
          <AntDesign name="back" size={28} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.headerArea}>
        <Text style={styles.headerText}>
          {programName}
        </Text>
      </View>


      {
        (episodes == []) ? <View></View> :
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
            style={{ flex: 1 }}
            data={episodes}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
      }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2EAF5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 150,
  },
  title: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  item: {
    width: 300,
    height: 300,
    backgroundColor: 'white',
    borderRadius: 30,
    marginRight: 5,
    marginLeft: 15,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerArea: {
    marginBottom: 50,
    backgroundColor: 'transparent',
  },
  headerText: {
    color: 'black',
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'CormorantGaramond_700Bold',
    fontWeight: '600',
  },
  itemTitleArea: {
    backgroundColor: 'transparent',
    marginBottom: 8,
  },
  itemTitle: {
    color: 'black',
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 20,
    textAlign: 'center',
  },
  itemPlay: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: '40%',
  },
  itemMetaArea: {
    backgroundColor: 'transparent',
    height: 100,
  },
  itemMeta: {
    color: 'black',
    fontFamily: 'CormorantGaramond_600SemiBold_Italic',
    textAlign: 'center'
  },
  itemDuration: {
    color: 'black',
    textAlign: 'center',
    color: '#928d8f',
    fontSize: 13,
    textAlign: 'center',
  },
  image: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
    opacity: 0.30
  },
  back: {
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0,
    top: 50,
    padding: 30,
  },
});
