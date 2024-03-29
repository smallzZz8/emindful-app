import * as React from 'react';
import { StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import SvgUri from "expo-svg-uri";

import { Text, View } from '../components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Icons
import { Feather } from '@expo/vector-icons';

// Redux
import { ApplicationState, storeAllData, storeProgramData } from '../redux';
import { useSelector, useDispatch } from 'react-redux';

const fetchURL = "https://app-14423.on-aptible.com/programs";

function getMins(createdDate: string) {
  let date = new Date(createdDate);
  let now = Date.now();

  let difference = now - date.getTime();
  let weeks = Math.floor((((difference / 60000) / 60) / 24) / 7);

  return weeks;
}

const Item = ({ data }) => (
  <View style={styles.item}>
    <View style={styles.itemTextView}>
      <View style={styles.mins}><Text style={styles.minsText}>{getMins(data.attributes.created_at)} weeks ago</Text></View>
      <Text style={styles.itemHeader}>{data.attributes.name}</Text>
      <Text style={styles.itemDescription}>{data.relationships.episodes.data.length} episodes</Text>
    </View>

    <View style={styles.itemImageView}>
      <Image source={require('../assets/images/itemImage.png')} style={styles.itemImage} />
    </View>
  </View>
);

const getData = async () => {
  try {
    const programId = await AsyncStorage.getItem('@last_watched_program_id');
    const episodeId = await AsyncStorage.getItem('@last_watched_episode_id')

    if (programId !== null && episodeId !== null)
      return [programId, episodeId];
    else
      return [0, 0];

  } catch (e) {
    // error reading value
    console.log(e);
  }
}



export default function TabTwoScreen({ navigation }) {

  // Hooks
  const [pulledData, setPulledData] = React.useState([null]);
  const [continueWatchingData, setContinueWatchingData] = React.useState(null);
  const [continueWatchingEpisodeId, setContinueWatchingEpisodeId] = React.useState(null);

  // Redux
  const dispactch = useDispatch();
  const { allData, programData } = useSelector((state: ApplicationState) => state.UserReducer);

  // Fetch individual program
  async function fetchProgramData(id) {
    fetch(`${fetchURL}/${id}`, { method: 'get' })
      .then(response => response.json())
      .then(data => {
        dispactch(storeProgramData(data));
      })
      .catch(err => {
        console.error('Request failed', err)
      })
  }

  // Fetch programs
  async function fetchData() {
    fetch(`${fetchURL}?format=recorded&limit=10&category_ids=35`, { method: 'get' })
      .then(response => response.json())
      .then(async data => {
        setPulledData(data.data);
        dispactch(storeAllData(data.data));
        for (let ele of data.data) {
          fetchProgramData(ele.id);
          if ((await getData())[0] == ele.id) {
            setContinueWatchingData(ele);
            setContinueWatchingEpisodeId((await getData())[1]);
          }
        }
      })
      .catch(err => {
        console.error('Request failed', err)
      })
  }

  // Render for the continue watching
  function getContinueWatching() {
    return (
      <View style={styles.continueWatching}>
        <View style={styles.continueWatchingTextArea}>
          <Text style={styles.continueWatchingText}>
            Welcome back! Continue watching:
          </Text>
        </View>
        <TouchableOpacity
          onPress={async () => {
            navigation.navigate('PlayModal', {
              programId: continueWatchingData.id,
              episodeId: continueWatchingEpisodeId,
            });
          }}
        >
          <Item data={continueWatchingData} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => {
            AsyncStorage.clear();
            setContinueWatchingData(null);
          }}
        >
          <View style={styles.dividerIcon}>
            <Feather name="divide-circle" size={24} color="#D3AAE2" />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  // Render for flatlist
  const renderItem = ({ item }) => (

    <TouchableOpacity
      onPress={async () => {
        navigation.navigate('MediaPage', item.id);
      }}
    >
      <Item data={item} />
    </TouchableOpacity>
  );



  React.useEffect(() => {

    // Rerenders page on focus in the event that there is new data or new continue watching items
    navigation.addListener('focus', () => {
    fetchData();
    });

  }, []);

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>

        {/* Header Image */}
        <SvgUri
          style={styles.image}
          width="100%"
          height="150"
          source={require("../assets/images/meditation.svg")}
        />

        {/* Header Text Section */}
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Meditations
          </Text>
          <Text style={styles.headerSubText}>
            35 mins of 60 this week
          </Text>
        </View>
      </View>

      {/* Programs Section */}
      <View style={styles.programsSection}>

        {(continueWatchingData == null) ? null : getContinueWatching()}
        {
          (pulledData[0] == null) ? <View></View> :
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1 }}
              style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30, flex: 1 }}
              data={pulledData}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
        }
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#F2EAF5',
    paddingHorizontal: 20
  },

  title: {
    backgroundColor: '#F2EAF5',
    fontSize: 20,
    fontWeight: 'bold',
  },

  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },

  header: {
    width: "100%",
    backgroundColor: 'transparent',
  },

  headerText: {
    width: "100%",
    color: 'black',
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'CormorantGaramond_700Bold',
    fontWeight: '600',
    marginTop: 10
  },

  headerSubText: {
    width: "100%",
    color: '#928d8f',
    fontSize: 15,
    textAlign: 'center'
  },

  image: {
    marginTop: 50,
  },

  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 30,
  },

  programsSection: {
    backgroundColor: 'transparent',
    marginTop: 20,
    marginBottom: 0,
    width: '100%',
    flexGrow: 1,
  },

  item: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 25,
    height: 170,
    marginBottom: 16,
    width: '100%',

  },
  itemHeader: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8
  },

  minsText: {
    color: '#be64df',
    width: 'auto',
  },

  mins: {
    backgroundColor: '#d7bfe055',
    padding: 5,
    borderRadius: 5,
    width: 'auto',
    marginBottom: 8
  },

  itemDescription: {
    color: '#928d8f',
    lineHeight: 18
  },

  itemImageView: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 10,
    bottom: 0,
    top: 0,
    zIndex: -1000,
    alignItems: 'center',
    justifyContent: 'center',
  },

  itemTextView: {
    backgroundColor: 'transparent',
    flex: 1,
    paddingRight: 100,
    alignItems: 'baseline'
  },

  continueWatching: {
    backgroundColor: 'transparent',
  },

  continueWatchingTextArea: {
    backgroundColor: 'transparent',
    marginBottom: 8,
  },

  continueWatchingText: {
    color: '#928d8f',
    textAlign: 'center'
  },

  dividerIcon: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: -8,
    marginBottom: 8,
  }

});
