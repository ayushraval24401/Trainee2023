import { Request,Response} from 'express';
import {TrainsModel} from "../../models/usermodel"
// import userrepositary from '../../repositary/authrepositary/userrepositary';
import trainrepositary from '../../repositary/authrepositary/trainrepositary';
import { responseModel } from '../../../Model/interface';


const posttrain=async (req: Request, res: Response)=> {
    console.log("insertttt");
    // const temp = new User(req.body);
  
    try {
      const user:TrainsModel={
        Train_No:req.body.Train_No,
        trainName:req.body.trainName,
        destination:req.body.destination,
        seatsTotal:req.body.seatsTotal,
        stationList:req.body.stationList

     

    }
    console.log(user);

      const userResponse=await trainrepositary.create(user)
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

  
  const gettrain = async (req: Request, res: Response) => {
    try {
      const users = await trainrepositary.findMany();
  
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

  const deletetrain = async (req: Request, res: Response) => {
    try {
      console.log(req.params)

      const deletedUser = await trainrepositary.delete(req.params.id);
  
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

  const updatetrain = async (req: Request, res: Response) => {
    console.log(req.params)
    try {
      const updatedUser = await trainrepositary.update(req.params.id, {
        Train_No:req.body.Train_No,
        trainName:req.body.trainName,
        destination:req.body.destination,
        seatsTotal:req.body.seatsTotal,
        stationList:req.body.stationList
      
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
  
  const sortdata = async (req: Request, res: Response) => {
    console.log(req.params);
  
    try {
      const bookings = await trainrepositary.sortdata(req.params.sortby);
      res.send(bookings);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  const searchtrain = async (req: Request, res: Response) => {
    console.log(req.params);
  
    try {
      const bookings = await trainrepositary.search(req.params.key);
      res.send(bookings);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  export default {
    posttrain,
    gettrain,
    deletetrain,
    updatetrain,
    sortdata,
    searchtrain
  }