import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { initializeDecks, getDecks } from '../utils/api'
import { receiveDecks } from '../actions/index'

export default class Deck extends Component {

  render() {

  	const { deck } = this.props

    return (
      <View>
        <Text style={styles.titleText}>{deck.title}</Text>
        <Text style={styles.text}>{deck.totalCards} Cards</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 30,
    textAlign: 'center'
  },
  text: {
    fontSize: 15,
    textAlign: 'center'
  },
});