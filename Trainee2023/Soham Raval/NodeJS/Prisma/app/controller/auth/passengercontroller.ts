import { Request,Response} from 'express';
import {PassengerModel} from "../../models/usermodel"
import { responseModel } from '../../../Model/interface';
import passengerrepositary from '../../repositary/authrepositary/passengerrepositary';



const postpassenger=async (req: Request, res: Response)=> {
    console.log("insertttt");
    // const temp = new User(req.body);
  
    try {
      const user:PassengerModel={
        username:req.body.username,
        password:req.body.password,
        email:req.body.email,
        BookingList:req.body.BookingList




    }
    console.log(user);

      const userResponse=await passengerrepositary.create(user)
      let response:responseModel={
        status:201,
        message:"data saved",
        data:userResponse,
        error:null
      }
      // console.log(response)
      console.log("response ", response);

 console.log("userResponse ", userResponse);
      res.status(201).json(response);
    } catch (e) {
      console.log("error",e)
      let response:responseModel={
        status:400,
        message:"data save failed",
        data:null,
        error:e as string
      }

      res.status(400).json(response);
    }
  }

  
  const getpassenger = async (req: Request, res: Response) => {
    try {
      const users = await passengerrepositary.findMany();
  
      let response: responseModel = {
        status: 200,
        message: "data retrieved successfully",
        data: { users: users },
        error: null
      };
  console.log(users);
      res.status(200).json(response);
    } catch (e) {
      let response: responseModel = {
        status: 400,
        message: "data record not found",
        data: null,
        error: e as string
      };
      console.log("response ", response);

      res.status(400).json(response);
    }
  };

  const deletepassenger = async (req: Request, res: Response) => {
    try {
      console.log(req.params)

      const deletedUser = await passengerrepositary.delete(req.params.id);
  
      if (deletedUser) {
        let response: responseModel = {
          status: 200,
          message: "User deleted successfully",
          data: null,
          error: null,
        };
        console.log("deleteresponse",response)
        res.status(200).json(response);
      } else {
        let response: responseModel = {
          status: 404,
          message: "User not found",
          data: null,
          error: null,
        };
        res.status(404).json(response);
      }
    } catch (e) {
      console.log("deleteerror",e)
      let response: responseModel = {
        status: 500,
        message: "Data delete failed",
        data: null,
        error: e as string,
      };
      res.status(500).json(response);
    }
  };

  const updatepassenger = async (req: Request, res: Response) => {
    console.log(req.params)
    try {
      const updatedUser = await passengerrepositary.update(req.params.id, {
        username:req.body.username,
        password:req.body.password,
        email:req.body.email,
        BookingList:req.body.BookingList

      
      });

      if (!updatedUser) {
        let response: responseModel = {
          status: 404,
          message: "User not found",
          data: null,
          error: null,
        };
        res.status(404).json(response);
      } else {
        let response: responseModel = {
          status: 200,
          message: "User updated successfully",
          data: { user: updatedUser },
          error: null,
        };
        res.status(200).json(response);
      }
    } catch (e) {
      let response: responseModel = {
        status: 500,
        message: "Data update failed",
        data: null,
        error: e as string,
      };
      res.status(500).json(response);
    }
  };
  
  

  export default {
    postpassenger,
    getpassenger,
    deletepassenger,
    updatepassenger
  }