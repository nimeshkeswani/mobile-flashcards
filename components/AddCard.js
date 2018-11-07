import React from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { white, red } from '../utils/colors'
import { connect } from 'react-redux'
import { addCard } from '../actions/index'
import { addCardToDeck } from '../utils/api'
import { NavigationActions } from 'react-navigation'

class AddCard extends React.Component {

	state = {
		question: '',
    answer: ''
	}

	handleSubmit = () => {
    const { question, answer } = this.state
    const { deckId } = this.props
    const card = {
      question,
      answer,
    }
    this.props.dispatch(addCard(deckId, card))
    addCardToDeck(deckId, card)
    this.setState({
      question: '',
      answer: ''
    })
    this.toHome()
	}

  toHome = () => {
    const { deckId } = this.props
    this.props.navigation.navigate(
            'DeckDetails',
            { deckId: deckId }
          )
  }

  render() {

  	const { question, answer } = this.state

    return (
      <View style={styles.container}>
        <TextInput
	        style={styles.textBox}
          placeholder='Question'
	        value={question}
	        onChangeText={(question) => this.setState({question})}
      	/>
        <TextInput
          style={styles.textBox}
          placeholder='Answer'
          value={answer}
          onChangeText={(answer) => this.setState({answer})}
        />
      	<TouchableOpacity
      		style={styles.submitBtn}
      		onPress={this.handleSubmit}>
	        <Text style={styles.submitBtnText}>Add Card</Text>
	    </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    textAlign: 'center'
  },
  textBox: {
  	height: 50,
  	width: 300,
  	borderColor: 'gray',
  	borderWidth: 1,
  	fontSize: 30,
  },
  submitBtn: {
    backgroundColor: red,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
});

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params
   return {
    deckId,
  }
}

export default connect(
  mapStateToProps,
)(AddCard)