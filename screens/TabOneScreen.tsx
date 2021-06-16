import * as React from 'react';
import { StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import SvgUri from "expo-svg-uri";

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

const image = { uri: "https://reactjs.org/logo-og.png" };

const DATA2 = [
  {
    id: 'bd7acbea-c1b1-46c2-323aed5-3ad53abb28ba',
    title: 'Breather',
    mins: '12 mins',
    desc: 'A 5-Minute Intro to Meditation. Relax and inhale to start.',
  },
  {
    id: 'bd7acbea-c1b12-46c2-aed5-3ad2353abb28ba',
    title: 'Love-Kind Meditation',
    mins: '20 mins',
    desc: 'Cultivate the ability to notice being experienced in the body.',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-323ad53abb2238ba',
    title: 'Flower Meditation',
    mins: '13 mins',
    desc: 'Outdoor concentration meditation. The object is a flower.',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b232a',
    title: 'Love-Kind Meditation',
    mins: '20 mins',
    desc: 'Cultivate the ability to notice being experienced in the body.',
  },
];

function getMins(createdDate){
  let date = new Date(createdDate);
  let now = Date.now();

  console.log(date.getTime());
  console.log(now);

  let difference = now - date.getTime();
  let minutes = Math.floor(difference / 60000);
  let hours = Math.round(minutes / 60);
  let days = Math.round(hours / 24);
  let weeks = Math.round(days / 7);

  return weeks;
}

const Item = ({ data }) => (
  <TouchableOpacity
    onPress={()=> alert('Hello World')}
  >
    <View style={styles.item}>
      <View style={styles.itemTextView}>
        <View style={styles.mins}><Text style={styles.minsText}>{getMins(data.attributes.created_at)} weeks ago</Text></View>
        <Text style={styles.itemHeader}>{data.attributes.name}</Text>
        {/* <Text style={styles.itemDescription}>{data.desc}</Text> */}
      </View>
      
      <View style={styles.itemImageView}>
        <Image source={require('../assets/images/itemImage.png')} style={styles.itemImage} />
      </View>
    </View>
  </TouchableOpacity>
);

export default function TabOneScreen() {

  // Hooks
  const [pulledData, setData] = React.useState([null]);
  const [programData, setProgramData] = React.useState([null]);
  const array = [];

  const renderItem = ({ item }) => (
    <Item data={item} />
  );

  React.useEffect(() => {
    async function getData(){
      return fetch('https://app-14423.on-aptible.com/programs?format=recorded&limit=10&category_ids=35')
      .then((response) => response.json())
      .then((json) => {
        setData(json.data);
        for(const item of json.data){
          fetch('https://app-14423.on-aptible.com/programs/' + item.id)
          .then((response) => response.json())
          .then((json) => {
            // setProgramData(json.data);
          console.log(item.id);
          })
        }
        
      })
      .catch((error) => {
        console.error(error);
      });
    }
    getData();
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
    flexGrow:1,
  },
  item: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 25,
    height: 170,
    marginVertical: 8,
    width: '100%',
    
  },
  itemHeader:{
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5
  },
  minsText:{
    color: '#be64df',
    width: 'auto',
  },
  mins:{
    backgroundColor: '#d7bfe055',
    padding: 5,
    borderRadius: 5,
    width: 'auto',
    // marginLeft
    marginBottom: 8
  },
  itemDescription:{
    color: '#928d8f',
    // fontSize: 40,
    lineHeight: 18
  },
  itemImageView:{
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
  itemTextView:{
    backgroundColor: 'transparent',
    flex: 1,
    // borderWidth: 1,
    paddingRight: 100,
    alignItems: 'baseline'
  }

});
