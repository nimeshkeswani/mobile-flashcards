import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Deck from './Deck'
import { red, white } from '../utils/colors'
import { deleteDeck } from '../actions/index'
import { removeDeck } from '../utils/api'

class Quiz extends Component {

  static navigationOptions = ({ navigation }) => {

    const { deckId } = navigation.state.params
     
     return {
      title: 'Quiz: ' + deckId
    }
  }

  render() {

    console.log(this.props)

    return (
      <View style={styles.container}>
        <Text>{this.props.deck.totalCards}</Text>
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

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params
  const deck = state[deckId]
   return {
    deckId,
    deck,
  }
}

export default connect(mapStateToProps)(Quiz)