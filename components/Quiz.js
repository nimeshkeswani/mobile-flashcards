import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Deck from './Deck'
import { red, white } from '../utils/colors'
import { deleteDeck } from '../actions/index'
import { removeDeck } from '../utils/api'

class Quiz extends Component {

  static navigationOptions = () => {
     
     return {
      title: 'Quiz'
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <Text>Quiz</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default connect()(Quiz)