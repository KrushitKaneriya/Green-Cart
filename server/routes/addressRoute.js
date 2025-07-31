import express from "express";
import authUser from "../middleware/authUser.js";
import { addAddress, getaddress } from "../controllers/addressController.js";

const addressRouter = express.Router();

addressRouter.post('/add', authUser, addAddress)
addressRouter.post('/get', authUser, getaddress)

export default addressRouter