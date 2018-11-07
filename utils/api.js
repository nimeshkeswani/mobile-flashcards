import { AsyncStorage } from 'react-native'

const DECKS_STORAGE_KEY = 'MobileFlashcards:decks'

export function initializeDecks () {
  const data = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }

  let results = AsyncStorage.getItem(DECKS_STORAGE_KEY)

  if (results !== null) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then((data) => JSON.parse(data))
  }
  else {
    return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
  }

  
}

export function getDecks () {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((data) => JSON.parse(data))
}

export function getDeck (id) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((data) => JSON.parse(data[id]))
  
}

export function saveDeckTitle (title) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [title]: {
      'title': title,
      'questions': []
    }
  }))
}

export function addCardToDeck (title, card) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      let data = JSON.parse(results)
      data[title].questions.push(card)
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    })
}
