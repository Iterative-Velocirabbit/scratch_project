const express = require('express');
const { Pool } = require('pg');


const PG_URI = process.env.pgURI;

const pool = new Pool({
    connectionString: PG_URI
});

module.exports = {
    query: (text, params, callback) => {
        console.log('executed query', text);
        return pool.query(text, params, callback);
    }
};

// create table public_deck(
//   pd_id serial primary key,
//   name varchar not null,
//   deck_created TIMESTAMP DEFAULT NOW()
//   );
  
//   create table cards(
//     card_id serial primary key,
//     pd_id integer not null,
//     front_question varchar not null,
//     back_answer varchar not null,
//     difficult boolean DEFAULT true,
//     card_created TIMESTAMP DEFAULT NOW(),
//     CONSTRAINT fk_deck   
//       FOREIGN KEY (pd_id)
//       REFERANCES public_deck(pd_id)
//     );

const userController = require('../controllers/userController');

const router = express.Router();

// Decks...
// ...finds all decks for user (:user)
router.get('/:user/deck/all', 
  userController.displayAllDecks, 
  (req, res) => {
    return res.status(200).json(res.locals.decks)
  }
);
// ...finds specific deck (:deck) for user (:user)
router.get('/:user/deck/', userController.findDeck);
// ...creates new deck for existing user (:user)
router.patch('/:user/createDeck', userController.createDeck);
// ...edits specific deck (:deck) for existing user (:user)
router.patch('/:user/editDeck', userController.editDeck);
// ...deletes deck (:deck) for existing user (:user)
router.delete('/:user/deck/delete', userController.deleteDeck);

// Cards...
// ...creates card in a deck (:deck) specified by the user (:user)
router.post('/:user/createCard', userController.createCard);
// router.post('/cards/:user/:deck', userController.createCard);
// ...deletes specific card from user's deck
router.delete('/:user/deleteCard', userController.deleteCard);

// User...
// ...finds existing user
router.get('/user/:user', userController.findUser);
// ...creates user, sets cookie ()
// router.post(
//   '/user',
//   userController.createUser
//   cookieController.setCookie,
//   (req, res) => {
//     res.status(200).json('cookie set!');
//   }
// );

module.exports = router;


