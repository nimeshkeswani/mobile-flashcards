import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { initializeDecks, getDecks } from '../utils/api'
import { receiveDecks } from '../actions/index'

class Decks extends Component {

	componentDidMount () {
		const { dispatch } = this.props

		initializeDecks()
			.then(getDecks()
					.then((decks) => dispatch(receiveDecks(decks))))
	}

	navigateToDeckDetails = () => (this.props.navigation.navigate(
              'DeckDetails'
            ))

  render() {

  	const { decks } = this.props

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
			        <Text style={styles.titleText}>{deck.title}</Text>
			        <Text style={styles.text}>{deck.totalCards} Cards</Text>
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
  titleText: {
    fontSize: 30,
    textAlign: 'center'
  },
  text: {
    fontSize: 15,
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