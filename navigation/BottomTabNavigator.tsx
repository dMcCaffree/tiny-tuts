import {Ionicons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import LearnScreen from '../screens/LearnScreen';
import {BottomTabParamList, TabOneParamList, TabTwoParamList, LearnParamList, OverlayParamList} from '../types';
import CustomIcon from "../components/CustomIcon";
import {Text} from "react-native";
import CourseScreen from "../screens/CourseScreen";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Learn"
      tabBarOptions={{activeTintColor: Colors[colorScheme].tint, style: {backgroundColor: '#20242F', borderTopWidth: 0, paddingTop: 5}}}
    >
      <BottomTab.Screen
        name="Learn"
        component={LearnNavigator}
        options={{
          tabBarIcon: ({color}) => <TabBarIcon name="learn" color={color}/>,
          tabBarLabel: ({color}) => <Text style={{fontSize: 12, color}}>Learn</Text>,
        }}
      />
      <BottomTab.Screen
        name="Discover"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({color}) => <TabBarIcon name="discover" color={color}/>,
          tabBarLabel: ({color}) => <Text style={{fontSize: 12, color}}>Discover</Text>,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({color}) => <TabBarIcon name="profile" color={color}/>,
          tabBarLabel: ({color}) => <Text style={{fontSize: 12, color}}>Profile</Text>,
        }}
      />
    </BottomTab.Navigator>
  );
}

const OverlayNav = createStackNavigator<OverlayParamList>();

export function OverlayNavigator() {
  const colorScheme = useColorScheme();

  return (
    <OverlayNav.Navigator
      initialRouteName="CourseScreen"
      screenOptions={{headerShown: false}}
    >
      <OverlayNav.Screen
        name="CourseScreen"
        component={CourseScreen}
      />
    </OverlayNav.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <CustomIcon size={28} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab

const LearnStack = createStackNavigator<LearnParamList>();

function LearnNavigator() {
  return (
    <LearnStack.Navigator
      screenOptions={{headerShown: false}}
    >
      <LearnStack.Screen
        name="LearnScreen"
        component={LearnScreen}
      />
    </LearnStack.Navigator>
  );
}

const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator
      screenOptions={{headerShown: false}}
    >
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator
      screenOptions={{headerShown: false}}
    >
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{headerTitle: 'Tab Two Title'}}
      />
    </TabTwoStack.Navigator>
  );
}
