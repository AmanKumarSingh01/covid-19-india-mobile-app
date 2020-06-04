import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ScrollView, SafeAreaView  , ActivityIndicator} from "react-native"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import {init , getLocation , getDistance , getStateData , getZones , SetFetched} from './../Features/Fetch'
;
class Update extends Component {
    constructor(props) {
      super(props);
      this.state = {
        location: {},
        screenHeight: 0,
      }
    }
    async componentDidMount() {
      await this.allloaded()
    }
    async allloaded() {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            await this.props.getLocation(position.coords.latitude, position.coords.longitude);
            await this.props.getDistance(position.coords.latitude, position.coords.longitude);
            this.props.News.State === null ? console.log('No news') : await this.props.getStateData(this.props.News.State), await this.props.getZones(this.props.News.State) , await this.props.SetFetched();
          }
        )
        await this.props.init();
    }
    render() {
      
      const disp = (
        <View>
                
                <SafeAreaView>
                   <ScrollView  contentContainerStyle={{ flexGrow: 1 }}>
                  <View style={styles.header}>
                    <Text style={styles.text}>The best way out is always through.</Text>
                    <Text style ={styles.text}>We will win this war if we follow social distancing.</Text>
                    <Image source={require('./../Asserts/Coronavirus-pana.png')}  style={styles.image}/>
                </View>
                 
                <View style={{padding:'5%'}}>
                  <CardIndia state="India" active = {this.props.News.status.Active} cured = {this.props.News.status.cured} death = {this.props.News.status.death}/>
                  <CardState state={this.props.News.State.state} active={this.props.News.currentState.total} cured={this.props.News.currentState.recovered} death={this.props.News.currentState.died} distance={this.props.News.distance} zone={this.props.News.zoneDist}/>
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
        <Text style={styles.text5}>{props.state} Data</Text>
        <View style={styles.Display}>
          <View style={{}}>
            <Text style={styles.text1}> Active</Text>
            <Text style={styles.text1}> {props.active}</Text>
          </View>
          <View style={styles.viewdata}>
            <Text style={styles.text2}> Recovered </Text>
            <Text style={styles.text2}> {props.cured} </Text>

          </View>
          <View style={styles.viewdata}>
            <Text style={styles.text3}>Death</Text>
            <Text style={styles.text3}> {props.death} </Text>

          </View>
        </View>
        <Text style={styles.disclamer}> Data displayed here is taken from MOHFW</Text>
      </View>
    </View>
  )
}
const CardState = (props) => {
  return (
    <View style={styles.istyle}>
      <View style={styles.india}>
        <Text style={styles.text5}>{props.state} Data</Text>
        <View style={styles.Display}>
          <View>
            <Text style={styles.text1}> Active</Text>
            <Text style={styles.text1}> {props.active}</Text>

            
          </View>
          <View style={styles.viewdata}>
            <Text style={styles.text2}> Recovered </Text>
            <Text style={styles.text2}> {props.cured} </Text>

          </View>
          <View style={styles.viewdata}>
            <Text style={styles.text3}>Death</Text>
            <Text style={styles.text3}> {props.death} </Text>

          </View>
        </View>
        <Text style={styles.disclamer1}> The nearest case is {parseInt(props.distance).toFixed(2)} KM away.</Text>
        <Text style={styles.disclamer1}>{props.zone.district} is a {props.zone.zone} zone.</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  istyle: {
    padding :10,
    backgroundColor: 'tomato',
    marginTop: 50,
    borderTopLeftRadius: 100,
    borderBottomRightRadius: 100,
    height : wp('50%')
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
    height: "80%",
    width: "90%",
    left: 20,
    top : 20,
  },
  india: {
    top: wp(10),
    height: wp('40%'),
    backgroundColor: 'white',
    borderTopLeftRadius: 60,
    borderBottomRightRadius: 50,
  },
  Display: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: "space-between",
    marginTop: 5,
    padding : wp(2)
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

export default connect(mapStateToProps, {init , getLocation ,getDistance , getStateData , getZones , SetFetched})(Update)
