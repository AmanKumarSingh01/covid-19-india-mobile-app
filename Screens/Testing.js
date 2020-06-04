import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ScrollView, SafeAreaView ,ActivityIndicator } from "react-native"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { init, getLocation, getDistance, getStateData, getZones, SetFetched } from './../Features/Fetch';
import data from './../Asserts/resources.json'
class Testing extends Component {
    constructor(props) {
      super(props);
      this.state = {
        location: {},
        screenHeight: 0,
        Hospitals: [],
        Testing: [],
        FreeFood: [],
        ShowHospitals: true,
        ShowTesting: false,
        ShowFreeFood : false
      }
    }
    componentDidMount() {
      this.props.News.isfetched === false ? console.log('news') : this.fetchTestingCenter(this.props.News.State.state), this.fetchFreeFood(this.props.News.State.state), this.fetchHospitals(this.props.News.State.state);
    }
    fetchTestingCenter = (s) =>{
      var Testing = [];
      console.log(s);
      data.resources.map(res => {
        if (s === res.state && res.category === 'CoVID-19 Testing Lab') {
          Testing.push(res);
        }
      })
      console.log(Testing);
      this.setState({ Testing: Testing });

    }
    fetchFreeFood = (s) => {
      var FreeFood = [];
      console.log(s);
      data.resources.map(res => {
        if (s === res.state && res.category === 'Free Food') {
          FreeFood.push(res);
        }
      })
      console.log(FreeFood);
      this.setState({ FreeFood: FreeFood})
    }
    fetchHospitals = (s) => {
      var Hospitals = [];
      console.log(s);
      data.resources.map(res => {
        if (s === res.state && res.category === 'Hospitals and Centers') {
          Hospitals.push(res);
        }
      })
      console.log(Hospitals);
      this.setState({Hospitals: Hospitals})
    }
    ShowHospitals =() => {
      console.log('Hospitals');
      this.setState({ShowHospitals: true , ShowTesting : false , ShowFreeFood : false});
    }
    ShowFreeFood    = () => {
      console.log('FreeFood')
      this.setState({ShowHospitals: false , ShowTesting : false , ShowFreeFood : true});

    }
    ShowTesting =() => {
      console.log('Testing')
      this.setState({ShowHospitals: false , ShowTesting : true , ShowFreeFood : false});

    }
    render() {
      const disp = (
        <View>
                
                <SafeAreaView>
                   <ScrollView  contentContainerStyle={{ flexGrow: 1 }}>
                  <View style={styles.header}>
                    <Text style={styles.text}>Resources.</Text>
                    {/* <Text style ={styles.text}>We will win this war if we follow social distancing.</Text> */}
                    <Image source={require('./../Asserts/Data-bro.png')}  style={styles.image}/>
                </View>
                 
              <View style={{ padding: '5%' }}>
                <View style={styles.istyle}>
                    <View style={styles.india}>
                      <Text style={styles.text5}>Select Tags</Text>
                      <View style={styles.Display}>
                        <Text style={{ color: 'white', backgroundColor: 'tomato', padding: '1%' }} onPress={this.ShowTesting}>Testing Center </Text>
                          <Text style ={{color: 'white' , backgroundColor : 'tomato' , padding :'1%'}} onPress={this.ShowHospitals}>Hospital </Text>
                          <Text style ={{color: 'white' , backgroundColor : 'tomato' , padding :'1%'}} onPress={this.ShowFreeFood}>Free Food </Text>
                      </View>
                       {this.state.ShowHospitals === true ? <CardIndia data ={this.state}/> : console.log('No')}
                       {this.state.ShowFreeFood === true ? <FreeFood data ={this.state}/> : console.log('No')}
                       {this.state.ShowTesting === true ? <Hospitals data ={this.state}/> : console.log('No')}
                      <Text style={styles.disclamer}> Data displayed here is taken from MOHFW</Text>
                    </View>
                  </View>
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
  console.log(props)
  return (
    <View style={styles.dataShow}>
      <Text style={styles.text5}>Hospitals {props.data.Hospitals.length}</Text>
            {props.data.Hospitals.map(news =>(
                <View style = { styles.dataShowInner}>
                    <Text style = { {color: 'grey' , width:"40%"}}>
                       {news.nameoftheorganisation} 
                    </Text>
                    <Text style={{color: 'green'}}>
                        {news.phonenumber} 
                    </Text>
                </View>
            ))}
        </View>
  )
}

const Hospitals = (props) => {
  console.log(props)
  return (
    <View style = { styles.dataShow}>
      <Text style={styles.text5}>Testing Centers {props.data.Testing.length}</Text>
            {props.data.Testing.map(news =>(
                <View style = { styles.dataShowInner}>
                    <Text style = { {color: 'grey' , width:"40%"}}>
                       {news.nameoftheorganisation} 
                    </Text>
                    <Text style={{color: 'green'}}>
                        {news.phonenumber} 
                    </Text>
                </View>
            ))}
        </View>
  )
}

const FreeFood = (props) => {
  console.log(props)
  return (
    <View style={styles.dataShow}>
      <Text style={styles.text5}>FreeFood {props.data.FreeFood.length}</Text>
            {props.data.FreeFood.map(news =>(
                <View style = { styles.dataShowInner}>
                    <Text style = { {color: 'grey' , width:"40%"}}>
                       {news.nameoftheorganisation} 
                    </Text>
                    <Text style={{color: 'green'}}>
                        {news.phonenumber} 
                    </Text>
                </View>
            ))}
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

export default connect(mapStateToProps, {init , getLocation ,getDistance , getStateData , getZones , SetFetched})(Testing)
