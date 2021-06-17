import * as React from 'react';
import { StyleSheet, Image, FlatList, TouchableOpacity, Button, ImageBackground } from 'react-native';
import { min } from 'react-native-reanimated';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { AntDesign } from '@expo/vector-icons';

const fetchURL = "https://app-14423.on-aptible.com/programs";

function getDurationFormat(time) {
  var minutes = Math.floor(time / 60);
  var seconds = time - minutes * 60;
  return minutes + ':' + seconds;
}

const Item = ({ data, navigation }) => (
  <View style={styles.item}>

    <View style={styles.itemTitleArea}>
      <Text style={styles.itemTitle}>
        {data.attributes.name}
      </Text>
    </View>

    <View style={styles.itemPlay}>
      <TouchableOpacity
        onPress={() => navigation.navigate('NotFound')}
      >
        <AntDesign name="play" size={50} color="#D3AAE2" />
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

  // Hooks
  const [pulledData, setPulledData] = React.useState([null]);
  const [programName, setProgramName] = React.useState("");
  const [episodes, setEpisodes] = React.useState([]);
  const [temp, setTemp] = React.useState([null]);

  async function fetchProgramData(id) {
    fetch(`${fetchURL}/${id}`, { method: 'get' })
      .then(response => response.json())
      .then(data => {
        setEpisodes(data.included);
        setPulledData(data);
        setProgramName(data.data.attributes.name);
      })
      .catch(err => {
        console.error('Request failed', err)
      })
  }

  const renderItem = ({ item }) => (
      <Item data={item} navigation={navigation} />
  );

  function test() {
    console.log(episodes);
    for (let item of episodes) {
      if (item != null) {
        console.log(item.id);
      }
    }
  }

  React.useEffect(() => {

    fetchProgramData(route.params);
  }, []);

  return (

    <View style={styles.container}>
      {/* <ImageBackground 
        source={{uri: "https://w7.pngwing.com/pngs/41/197/png-transparent-orange-yellow-and-green-floral-illustration-floral-design-illustration-painted-plants-watercolor-painting-flower-arranging-leaf.png"}} 
        style={styles.image}
        
        > */}

      <Image source={require('../assets/images/flower.png')} style={styles.image} />



      <View style={styles.headerArea}>
        <Text style={styles.headerText}>
          {programName}
        </Text>
      </View>


      {
        (episodes == []) ? <View><Text>testerr</Text></View> :
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

      {/* <Button
          onPress={() => test()}
          title="Learn More"
        >

        </Button> */}
      {/* </ImageBackground> */}

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
    // width: "100%",
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
    // margin: 'auto'
  },
  itemMetaArea: {
    backgroundColor: 'transparent',
    height: 100,
  },
  itemMeta: {
    color: 'black',
    fontFamily: 'CormorantGaramond_600SemiBold_Italic',
    // fontSize: 18,
    // lineHeight: 18
    textAlign: 'center'
  },
  itemDuration: {
    color: 'black',
    // fontFamily: 'CormorantGaramond_600SemiBold_Italic',
    // fontSize: 18,
    // lineHeight: 18
    marginTop: 5,
    textAlign: 'center',
    color: '#928d8f',
    fontSize: 13,
    textAlign: 'center',
  },
  image: {
    position: 'absolute',
    // top: 200,
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
    opacity: 0.30
  }
});
