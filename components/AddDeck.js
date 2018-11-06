import React from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { white, red } from '../utils/colors'

export default class AddDeck extends React.Component {

	state = {
		newDeckName: ''
	}

	handleChange = (e) => (this.setState((state) => ({
		newDeckName: e.value
	})))

  render() {

  	const { newDeckName } = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.text}>What is the title of your new deck?</Text>
        <TextInput
	        style={styles.textBox}
	        value={newDeckName}
	        onChange={this.handleChange}
      	/>
      	<TouchableOpacity style={styles.submitBtn}>
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