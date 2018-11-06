import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Deck from './Deck'
import { red, white } from '../utils/colors'

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
        <TouchableOpacity style={styles.addCardBtn}>
          <Text style={styles.addCardBtnText}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.startQuizBtn}>
          <Text style={styles.startQuizBtnText}>Start Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteDeckBtn}>
          <Text style={styles.deleteDeckBtnText}>Delete Deck</Text>
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
    justifyContent: 'space-between',
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
  addCardBtn: {
    backgroundColor: white,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    borderWidth: 1,
  },
  addCardBtnText: {
    color: red,
    fontSize: 22,
    textAlign: 'center',
  },
  startQuizBtn: {
    backgroundColor: red,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  startQuizBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  deleteDeckBtn: {
    backgroundColor: white,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  deleteDeckBtnText: {
    color: red,
    fontSize: 22,
    textAlign: 'center',
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