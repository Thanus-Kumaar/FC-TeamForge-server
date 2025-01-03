const express=require("express");
const router=express.Router();

const { 
    addPlayer, 
    searchPlayer, 
    getPlayersByCategory, 
    getMyPlayers 
  } = require('../controllers/playerController');

router.post('/addPlayer',addPlayer);
router.get('/search_player', searchPlayer); //using get bcoz we'll get the info
router.get('/player_by_category', getPlayersByCategory); //same here
router.post('/get_my_players', getMyPlayers); //this will print

module.exports=router;