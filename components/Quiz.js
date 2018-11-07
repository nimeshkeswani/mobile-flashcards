import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Deck from './Deck'
import { red, white, green, gray } from '../utils/colors'
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
    questionIndex: 0,
    showAnswer: false
  }

  toggleAnswerQuestion = () => (this.setState((currentState) => ({
    showAnswer: !currentState.showAnswer
  })))

  correct = () => (this.setState((currentState) => ({
    questionIndex: currentState.questionIndex + 1
  })))

  incorrect = () => (this.setState((currentState) => ({
    questionIndex: currentState.questionIndex + 1
  })))

  render() {

    const { deck } = this.props

    const { questionIndex, showAnswer } = this.state

    console.log(this.props)

    if (deck.questions.length === 0) {
      return (
        <View style={styles.container}>
        <Text>There are no cards in this deck.</Text>
        </View>
      )
    }

    if (questionIndex > (deck.totalCards - 1)) {
      return (
        <View style={styles.container}>
        <Text>End of quiz.</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text>{questionIndex + 1}/{deck.totalCards}</Text>
        {showAnswer ? <Text>{deck.questions[questionIndex].answer}</Text> : <Text>{deck.questions[questionIndex].question}</Text>}
        <TouchableOpacity
          style={styles.answerBtn}
          onPress={this.toggleAnswerQuestion}>
          <Text style={styles.btnText}>{showAnswer ? 'Question' : 'Answer'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.correctBtn}
          onPress={this.correct}>
          <Text style={styles.btnText}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.incorrectBtn}
          onPress={this.incorrect}>
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
  answerBtn: {
    backgroundColor: gray,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
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