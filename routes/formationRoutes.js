const express=require("express");
const router=express.Router();
const {getFormations} =require("../controllers/formationController")

router.get("/formations",getFormations)

module.exports=router;