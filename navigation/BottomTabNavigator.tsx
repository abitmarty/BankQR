import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import AdminScreen from '../screens/AdminScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList, AdminParamList } from '../types';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator({
  navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {
  
  // const unsubscribe = navigation.addListener('Balance', e => {
  //   // Prevent default action
  //   alert("Load balance");
  // });

  const colorScheme = useColorScheme();
  return (
    <BottomTab.Navigator
      initialRouteName="Purchases"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Purchases"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="account-balance-wallet" size={24} color="black" />,
        }}
      />
      <BottomTab.Screen
        name="Scanner"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="scan-outline" size={24} color="black" />,
        }}
      />
      <BottomTab.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="admin-panel-settings" size={24} color="black" />,
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
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: 'Products purchased' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Scanner' }}
      />
    </TabTwoStack.Navigator>
  );
}

const Admintack = createStackNavigator<AdminParamList>();

function AdminNavigator() {
  return (
    <Admintack.Navigator>
      <Admintack.Screen
        name="AdminScreen"
        component={AdminScreen}
        options={{ headerTitle: 'Admin' }}
      />
    </Admintack.Navigator>
  );
}