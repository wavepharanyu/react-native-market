import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ListingsScreen from "../screens/ListingsScreen"
import ListingDetailsScreen from "../screens/ListingDetailsScreen"

const Stack = createStackNavigator()

const FeedNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true, presentation: 'modal', headerTitleStyle: {fontFamily: 'NotoSansThai-Regular'}, }}>
      <Stack.Screen name="Listings" component={ListingsScreen} options={{ headerTitle: 'สินค้า' }}/>
      <Stack.Screen name="ListingDetails" component={ListingDetailsScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}

export default FeedNavigator
