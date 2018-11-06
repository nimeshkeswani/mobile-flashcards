import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import Deck from './Deck'

class DeckDetails extends Component {

  static navigationOptions = ({ navigation }) => {
    
    const { deckId } = navigation.state.params
     
     return {
      deckId
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <Deck deck={this.props.deck} />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params
   return {
    deckId,
    deck: state[deckId]
  }
}

export default connect(
  mapStateToProps,
)(DeckDetails)