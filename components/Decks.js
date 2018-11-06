import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { initializeDecks, getDecks } from '../utils/api'
import { receiveDecks } from '../actions/index'

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
      <View>
        <Text>Decks</Text>
        {Object.keys(decks).map((deck) => (<Text key={deck}>{deck}</Text>))}
      </View>
    );
  }

}

function mapStateToProps (decks) {
	return {
		decks
	}
}

export default connect(mapStateToProps)(Decks)