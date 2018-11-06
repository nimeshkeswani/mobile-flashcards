import React from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { white, red } from '../utils/colors'
import { connect } from 'react-redux'
import { addDeck } from '../actions/index'
import { saveDeckTitle } from '../utils/api'
import { NavigationActions } from 'react-navigation'

class AddDeck extends React.Component {

	state = {
		newDeckName: ''
	}

	handleSubmit = () => {
		const { newDeckName } = this.state
		this.props.dispatch(addDeck({
			[newDeckName]: {
				title: newDeckName,
				questions: []
			}
		}))
		saveDeckTitle(newDeckName)
		this.setState({newDeckName: ''})
		this.toHome()
	}

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({key: 'AddDeck'}))
  }

  render() {

  	const { newDeckName } = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.text}>What is the title of your new deck?</Text>
        <TextInput
	        style={styles.textBox}
	        value={newDeckName}
	        onChangeText={(newDeckName) => this.setState({newDeckName})}
      	/>
      	<TouchableOpacity
      		style={styles.submitBtn}
      		onPress={this.handleSubmit}>
	        <Text style={styles.submitBtnText}>Create Deck</Text>
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

export default connect()(AddDeck)