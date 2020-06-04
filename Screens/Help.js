import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ScrollView, SafeAreaView ,ActivityIndicator} from "react-native"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { init, getLocation, getDistance, getStateData, getZones, SetFetched } from './../Features/Fetch';
import data from './../Asserts/data.json'
class Help extends Component {
    constructor(props) {
      super(props);
      this.state = {
        location: {},
        screenHeight: 0,
      }
    }
    render() {
      
      const disp = (
        <View>
                <SafeAreaView>
                   <ScrollView  contentContainerStyle={{ flexGrow: 1 }}>
                  <View style={styles.header}>
                    <Text style={styles.text}>Helplines</Text>
                    {/* <Text style ={styles.text}>We will win this war if we follow social distancing.</Text> */}
                    <Image source={require('./../Asserts/Active.png')}  style={styles.image}/>
                </View>
                 
                <View style={{padding:'5%'}}>
                  <CardIndia data ={data}/>
                </View>
                </ScrollView>
                </SafeAreaView>
            </View>
      )
        return (
          <View>
            {this.props.News.isfetched === true ? disp : <ActivityIndicator size="large" color="tomato" />}
          </View>
        )
    }
}


const CardIndia = (props) => {
  return (
    <View style={styles.istyle}>
      <View style={styles.india}>
        <Text style={styles.text5}>StateWise Data</Text>
        <View style={styles.Display}>
            <Text style ={{color: 'grey'}}>State</Text>
            <Text style={{color: 'green'}}>HelplineNumber</Text>
        </View>
        <View style = { styles.dataShow}>
            {props.data.contact_details.map(news =>(
                <View style = { styles.dataShowInner}>
                    <Text style = { {color: 'grey'}}>
                       {news.state_or_UT} 
                    </Text>
                    <Text style={{color: 'green'}}>
                        {news.helpline_number} 
                    </Text>
                </View>
            ))}
        </View>
        <Text style={styles.disclamer}> Data displayed here is taken from MOHFW</Text>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  dataShow :{
    display: 'flex',
    flexDirection :'column',
    justifyContent:'space-between'
  },
  dataShowInner : {
    display: 'flex',
    flexDirection :'row',
    justifyContent: 'space-between',
    marginTop :10
  },
  istyle: {
    padding :10,
    backgroundColor: 'tomato',
    marginTop: 50,
    borderTopLeftRadius: 100,
    borderBottomRightRadius: 100,
    
  },
  container: {
    flex: 1,
    padding: 24
  },
  text: {
      color: 'white',
      fontSize: 20,
      fontWeight: "bold",
      textAlign : "center"
  },
  header: {
    marginTop: 20,
    height : wp("55%"),
    borderBottomColor: "red",
    padding: 5,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    backgroundColor: "tomato"
  },
  image: {
    height: wp("50%"),
    width: "90%",
    left: wp(5),
    top : hp(5),
  },
  india: {
    top: wp(10),
    backgroundColor: 'white',
    borderTopLeftRadius: 60,
    borderBottomRightRadius: 50,
    padding : wp(3)
  },
  Display: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: "space-between",
    marginTop: 5
  },
  image1: {
    height: 20,
    width: 40,
    
  },
  viewdata: {
    marginLeft: 80, 
    // padding : 
  },
  text1: {
      color: 'red',
      fontSize: 15,
      fontWeight: "bold",
      textAlign : "center"
  },
  text2: {
    color: 'green',
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center"
  },
  text3: {
    color: 'grey',
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center"
  },
  text5: {
    color: 'tomato',
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center"
  },
  disclamer: {
    color: 'grey',
    marginTop: 10,
    textAlign:'right'
  },
  disclamer1: {
    color: 'blue',
    marginTop: 10,
  }
})

const mapStateToProps = (state) => ({
  News: state.News,
})

export default connect(mapStateToProps, {init , getLocation ,getDistance , getStateData , getZones , SetFetched})(Help)
