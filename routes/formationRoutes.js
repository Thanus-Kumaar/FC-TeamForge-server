const express=require("express");
const router=express.Router();
const {getFormations} =require("../controllers/formationController")

router.get("/",getFormations)

module.exports=router;
