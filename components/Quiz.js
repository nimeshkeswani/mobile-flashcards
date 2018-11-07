import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Deck from './Deck'
import { red, white, green } from '../utils/colors'
import { deleteDeck } from '../actions/index'
import { removeDeck } from '../utils/api'

class Quiz extends Component {

  static navigationOptions = ({ navigation }) => {

    const { deckId } = navigation.state.params
     
     return {
      title: 'Quiz: ' + deckId
    }
  }

  state = {
    questionIndex: 0
  }

  render() {

    const { deck } = this.props

    const { questionIndex } = this.state

    console.log(this.props)

    if (deck.questions.length === 0) {
      return (
        <View style={styles.container}>
        <Text>There are no cards in this deck.</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text>{deck.totalCards}</Text>
        <Text>{deck.questions[questionIndex].question}</Text>
        <Text>{deck.questions[questionIndex].answer}</Text>
        <TouchableOpacity
          style={styles.correctBtn}
          onPress={() => console.log('Correct')}>
          <Text style={styles.btnText}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.incorrectBtn}
          onPress={() => console.log('Incorrect')}>
          <Text style={styles.btnText}>Incorrect</Text>
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  correctBtn: {
    backgroundColor: green,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    borderWidth: 1,
  },
  incorrectBtn: {
    backgroundColor: red,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    borderWidth: 1,
  },
  btnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
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