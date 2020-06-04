import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ScrollView } from "react-native"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import {init , getLocation , getDistance , getStateData , getZones , SetFetched} from './../Features/Fetch'
;
class Myth extends Component {

    render() {
      const disp = (
        <View>
                <ScrollView>
                    <View style={styles.header}>
                        <Text style={styles.text}>If it's not your business, Don't spread it!.</Text>
                        <Text style ={styles.text}>#STOPSPREADINGRUMORS!</Text>
                        <Image source={require('./../Asserts/myth.png')}  style={styles.image} resizeMode = "center" />
                    </View>
                    <Myths/>
                </ScrollView>
            </View>
      )
        return (
          <View>
            {this.props.News.isfetched === true ? disp : <Text>Liading</Text>}
          </View>
        )
    }
}

const Myths = (props) => {
    return (
        <View style={styles.infoContainer}>
            <Image source={{ uri: 'https://www.mygov.in/sites/all/themes/mygov/images/covid/dis_type_1.png' }} style={{width:'50%', height:'50%'}} />
        </View>
    )
}


const styles = StyleSheet.create({
  
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
    height : wp("70%"),
    borderBottomColor: "red",
    padding: 5,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    backgroundColor: "tomato"
  },
  image: {
    height: wp("60%"),
    width: hp("60%"),
    top: 0,
    left : -50
  },
   infoContainer: {
       display: 'flex',
       flexDirection: 'row',
       justifyContent : 'space-between'
  }
})

const mapStateToProps = (state) => ({
  News: state.News,
})

export default connect(mapStateToProps, {init , getLocation ,getDistance , getStateData , getZones , SetFetched})(Myth)
