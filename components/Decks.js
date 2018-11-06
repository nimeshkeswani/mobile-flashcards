import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { initializeDecks, getDecks } from '../utils/api'
import { receiveDecks } from '../actions/index'
import Deck from './Deck'

class Decks extends Component {

	componentDidMount () {
		const { dispatch } = this.props

		initializeDecks()
			.then(getDecks()
					.then((decks) => dispatch(receiveDecks(decks))))
			.catch((e) => console.log(e))
	}

  render() {

  	const { decks } = this.props

    return (
      <View style={styles.container}>
        {decks.map((deck) => (<Deck key={deck.title} deck={deck}/>))}
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