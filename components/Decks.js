import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { initializeDecks, getDecks } from '../utils/api'
import { receiveDecks } from '../actions/index'
import Deck from './Deck'

class Decks extends Component {

	componentDidMount () {
		const { dispatch } = this.props

		getDecks()
			.then((decks) => dispatch(receiveDecks(decks)))
	}

	navigateToDeckDetails = () => (this.props.navigation.navigate(
              'DeckDetails'
            ))

  render() {

  	const { decks } = this.props

  	if (decks.length === 0) {
  		return (
	      <View style={styles.container}>
	        <Text style={styles.text}>No Decks Present.</Text>
	      </View>
  		)
  	}

    return (
      <View style={styles.container}>
        {decks.map((deck) => (
        	  <View key={deck.title} style={styles.deck}>
		      	<TouchableOpacity
		      		onPress={() => this.props.navigation.navigate(
		      			'DeckDetails',
		      			{ deckId: deck.title}
		      		)}
		        >
			        <Deck deck={deck} />
			    </TouchableOpacity>
		      </View>
      ))}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  deck: {
  	padding: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    textAlign: 'center'
  },
});

function mapStateToProps (decks) {
	return {
		decks: Object.keys(decks).map((deck) => decks[deck]).map((deck) => {
			let deckInfo = deck
			deckInfo.totalCards = deckInfo.questions.length
			return deckInfo
		})
	}
}

export default connect(mapStateToProps)(Decks)