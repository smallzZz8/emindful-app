import * as React from 'react';
import { StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import SvgUri from "expo-svg-uri";

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

const image = { uri: "https://reactjs.org/logo-og.png" };
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

export default function TabTwoScreen({ navigation }) {

  // Hooks
  const [pulledData, setPulledData] = React.useState([null]);
  const [programData, setProgramData] = React.useState({});

  async function fetchData() {
    fetch(`${fetchURL}?format=recorded&limit=10&category_ids=35`, { method: 'get' })
      .then(response => response.json())
      .then(async data => {
        setPulledData(data.data);
      })
      .catch(err => {
        console.error('Request failed', err)
      })
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={async () => {
        // await fetchProgramData(item.id);
        navigation.navigate('MediaPage', item.id);
        // console.log(programData);
      }}
    >
      <Item data={item} />
    </TouchableOpacity>
  );

  React.useEffect(() => {

    fetchData();
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
    // marginTop: 50,
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
    marginVertical: 8,
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
    // marginLeft
    marginBottom: 8
  },
  itemDescription: {
    color: '#928d8f',
    // fontSize: 40,
    lineHeight: 18
  },
  itemImageView: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 10,
    bottom: 0,
    top: 0,
    // borderWidth: 1,
    zIndex: -1000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTextView: {
    backgroundColor: 'transparent',
    flex: 1,
    // borderWidth: 1,
    paddingRight: 100,
    alignItems: 'baseline'
  }

});
