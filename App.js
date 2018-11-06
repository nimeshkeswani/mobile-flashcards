import React from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation'
import Decks from './components/Decks'
import AddDeck from './components/AddDeck'
import { purple, white } from './utils/colors'

const Tabs = createBottomTabNavigator({
  Decks: Decks,
  AddDeck: AddDeck
})

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Tabs />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
