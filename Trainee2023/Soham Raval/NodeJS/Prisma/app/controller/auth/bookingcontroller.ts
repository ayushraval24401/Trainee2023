import { Request,Response} from 'express';
import {BookingModel} from "../../models/usermodel"
import { responseModel } from '../../../Model/interface';
import bookingrepositary from '../../repositary/authrepositary/bookingrepositary';
import { PrismaClient } from '@prisma/client';
// import { log } from 'console';
const prisma = new PrismaClient();

const postbooking=async (req: Request, res: Response)=> {
    console.log("insertttt");
    // const temp = new User(req.body);
  
    try {
      const user:BookingModel={
        passengerName:req.body.passengerName,
        passengerAge:req.body.passengerAge,
        passengerGender:req.body.passengerGender,
        passengerList:req.body.passengerList,
        passenger:req.body.passenger,
        trainList:req.body.trainList



    }
    console.log("userinsert",user);

      const userResponse=await bookingrepositary.create(user)
      let response:responseModel={
        status:201,
        message:"data saved",
        data:userResponse,
        error:null
      }
      // console.log(response)
      console.log("response userlist", response);

 console.log("userResponse ", userResponse);
      res.status(201).json(response);
    } catch (e) {
      console.log("error userlist",e)
      let response:responseModel={
        status:400,
        message:"data save failed",
        data:null,
        error:e as string
      }

      res.status(400).json(response);
    }
  }

  
  const getbooking = async (req: Request, res: Response) => {
    try {
      const users = await bookingrepositary.findMany();
  
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

  const deletebooking = async (req: Request, res: Response) => {
    try {
      console.log(req.params)

      const deletedUser = await bookingrepositary.delete(req.params.id);
  
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

  const updatebooking = async (req: Request, res: Response) => {
    console.log(req.params)
    try {
      const updatedUser = await bookingrepositary.update(req.params.id, {
        passengerName:req.body.passengerName,
        passengerAge:req.body.passengerAge,
        passengerGender:req.body.passengerGender,
        passengerList:req.body.passengerList,
        passenger:req.body.passenger,
        trainList:req.body.trainList

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

  const searchbooking = async (req: Request, res: Response) => {
    console.log(req.params);
  
    try {
      const bookings = await bookingrepositary.search(req.params.key);
      res.send(bookings);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }


  const filterdata = async (req: Request, res: Response) => {
    console.log(req.params);
  
    try {
      const filterbookings = await bookingrepositary.filter(req.params.key);
      res.send(filterbookings);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }


  // const sortdata = async (req: Request, res: Response) => {
  //   const sortby = req.params.sortby;
  //   let order = {};
  
  //   if (sortby === 'asc') {
  //     order = { passengerName: 'asc' };
  //   } else if (sortby === 'desc') {
  //     order = { passengerName: 'desc' };
  //   } else {
  //     return res.status(400).json({ message: 'Invalid sortby parameter' });
  //   }
  
  //   try {
  //     const users = await prisma.bookingList.findMany({
  //       orderBy: order,
  //     });
  //     return res.status(200).json(users);
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({ message: 'Internal server error' });
  //   }
  // }
  const sortdata = async (req: Request, res: Response) => {
    console.log(req.params);
  
    try {
      const bookings = await bookingrepositary.sortdata(req.params.sortby);
      res.send(bookings);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }


  

  export default {
    postbooking,
    getbooking,
    deletebooking,
    updatebooking,
    searchbooking,
    sortdata,
    filterdata,

  }

