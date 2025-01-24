const express=require("express");
const router=express.Router();
const {createTeams} =require("../controllers/teamController")

router.post('/create',createTeams);

module.exports=router;
