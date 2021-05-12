import React from 'react'
import { TouchableOpacity, Text } from 'react-native';
import { CardStyleInterpolators, createStackNavigator, HeaderBackButton } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import { Log } from "../../SSLog"

export const init = (Pages) => {
  // Log("__SERVISOFTS SOCKET WEB__ hola","34");
  const Home = createStackNavigator(
    Pages.getPages(),
    {
      defaultNavigationOptions: ({ navigation }) => ({
        headerTintColor: "#000",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }),
    }
  );

  const Container = createAppContainer(Home);
  return Container
}