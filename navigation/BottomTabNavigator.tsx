/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabOneScreen';
import TabThreeScreen from '../screens/TabOneScreen';
import TabFourScreen from '../screens/TabOneScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList, TabThreeParamList, TabFourParamList } from '../types';

// Icons
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Profile"
      tabBarOptions={{ activeTintColor: "#D3AAE2", activeBackgroundColor: "white", inactiveBackgroundColor: "white" }}>
      <BottomTab.Screen
        name="Yoga"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="yoga" size={24} color={color}/>,
        }}
      />
      <BottomTab.Screen
        name={"Meditation"}
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="planet" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Food"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="fruit-pineapple" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={TabFourNavigator}
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="face" size={24} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="Yoga"
        component={TabOneScreen}
        options={{ headerShown: false }}
      />
      <TabOneStack.Screen
        name="Yoga2"
        component={TabFourScreen}
        options={{ headerShown: false }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="Meditation"
        component={TabTwoScreen}
        options={{ headerShown: false }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="Food"
        component={TabThreeScreen}
        options={{ headerShown: false }}
      />
    </TabThreeStack.Navigator>
  );
}

const TabFourStack = createStackNavigator<TabFourParamList>();

function TabFourNavigator() {
  return (
    <TabFourStack.Navigator>
      <TabFourStack.Screen
        name="Profile"
        component={TabFourScreen}
        options={{ headerShown: false }}
      />
    </TabFourStack.Navigator>
  );
}
