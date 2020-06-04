import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Update from './Screens/Update';
import Myth from './Screens/Myth';
import Statewise from './Screens/Statewise';
import Help from './Screens/Help';
import Testing from './Screens/Testing';
import { Provider } from 'react-redux';
import store from './Redux_Store/store'
const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Update"
      activeColor="white"
      labelStyle={{ fontSize: 20 }}
      barStyle={{ backgroundColor: "tomato" }}
    >
      <Tab.Screen
        name="Update"
        component={Update}
        options={{
          tabBarLabel: "Updates",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="network-strength-outline"
              color={color}
              size={26}
            />
          )
        }}
      />
      {/* <Tab.Screen
        name="Myths"
        component={Myth}
        options={{
          tabBarLabel: "Myth",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="looks" color={color} size={26} />
          )
        }}
      /> */}
      <Tab.Screen
        name="Statewise"
        component={Statewise}
        options={{
          tabBarLabel: "Statewise",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map" color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name="Helplines"
        component={Help}
        options={{
          tabBarLabel: "Helplines",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="nature-people"
              color={color}
              size={26}
            />
          )
        }}
      />
      <Tab.Screen
        name="Testing"
        component={Testing}
        options={{
          tabBarLabel: "Resources",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="doctor" color={color} size={26} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <Provider store ={store}>
      <NavigationContainer style ={{backgroundColor : 'white'}}>
        <MyTabs />
      </NavigationContainer>
    </Provider>
  );
}