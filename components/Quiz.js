import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Deck from './Deck'
import { red, white, green, gray } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/api'

class Quiz extends Component {

  static navigationOptions = ({ navigation }) => {

    const { deckId } = navigation.state.params
     
     return {
      title: 'Quiz: ' + deckId
    }
  }

  state = {
    questionIndex: 0,
    showAnswer: false,
    correctAnswers: 0
  }

  toggleAnswerQuestion = () => (this.setState((currentState) => ({
    showAnswer: !currentState.showAnswer
  })))

  correct = () => (this.setState((currentState) => ({
    questionIndex: currentState.questionIndex + 1,
    correctAnswers: currentState.correctAnswers + 1
  })))

  incorrect = () => (this.setState((currentState) => ({
    questionIndex: currentState.questionIndex + 1
  })))

  restartQuiz = () => (this.setState((currentState) => ({
    questionIndex: 0,
    showAnswer: false,
    correctAnswers: 0
  })))

  render() {

    const { deckId, deck } = this.props

    const { questionIndex, showAnswer, correctAnswers } = this.state

    if (deck.questions.length === 0) {
      return (
        <View style={styles.container}>
        <Text style={styles.text}>There are no cards in this deck.</Text>
        </View>
      )
    }

    if (questionIndex > (deck.totalCards - 1)) {
      clearLocalNotification()
        .then(setLocalNotification)
      return (
        <View style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.text}>End of quiz.</Text>
            <Text style={styles.text}>You correctly answered {correctAnswers} out of {deck.totalCards} questions.</Text>
          </View>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.incorrectBtn}
              onPress={this.restartQuiz}>
              <Text style={styles.btnText}>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.answerBtn}
              onPress={() => this.props.navigation.navigate(
                  'DeckDetails',
                  { deckId: deckId }
                )}>
              <Text style={styles.btnText}>Back to Deck Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.text}>{questionIndex + 1}/{deck.totalCards}</Text>
          </View>
          {showAnswer ? <Text style={styles.text}>{deck.questions[questionIndex].answer}</Text> : <Text style={styles.text}>{deck.questions[questionIndex].question}</Text>}
          <TouchableOpacity
            style={styles.answerBtn}
            onPress={this.toggleAnswerQuestion}>
            <Text style={styles.btnText}>{showAnswer ? 'Question' : 'Answer'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
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
  text: {
    fontSize: 30,
    textAlign: 'center'
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