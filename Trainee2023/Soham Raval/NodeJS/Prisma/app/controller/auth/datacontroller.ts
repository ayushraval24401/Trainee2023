// import { Request,Response} from 'express';
// import {UserDataModel} from "../../models/usermodel"
// import datarepositary from '../../repositary/authrepositary/datarepositary';
// import { responseModel } from '../../../Model/interface';


// const postfield=async (req: Request, res: Response)=> {
//     console.log("insertttt");
//     // const temp = new User(req.body);
  
//     try {
//       const user:UserDataModel={
//         rollno:req.body.rollno,
//         lastname:req.body.lastname,
//         country:req.body.country,

//     }
//     console.log(user);

//       const userResponse=await datarepositary.create(user)
//       let response:responseModel={
//         status:201,
//         message:"data saved",
//         data:userResponse,
//         error:null
//       }
//       // console.log(response)
//       console.log("response ", response);

//  console.log("userResponse ", userResponse);
//       res.status(201).json(response);
//     } catch (e) {
//       console.log("error",e)
//       let response:responseModel={
//         status:400,
//         message:"data save failed",
//         data:null,
//         error:e as string
//       }

//       res.status(400).json(response);
//     }
//   }

  
//   const getfield = async (req: Request, res: Response) => {
//     try {
//       const users = await datarepositary.findMany();
  
//       let response: responseModel = {
//         status: 200,
//         message: "data retrieved successfully",
//         data: { users: users },
//         error: null
//       };
//   console.log(users);
//       res.status(200).json(response);
//     } catch (e) {
//       let response: responseModel = {
//         status: 400,
//         message: "data record not found",
//         data: null,
//         error: e as string
//       };
//       console.log("response ", response);

//       res.status(400).json(response);
//     }
//   };

//   const deletefield = async (req: Request, res: Response) => {
//     try {
//       console.log(req.params)

//       const deletedUser = await datarepositary.delete(req.params.id);
  
//       if (deletedUser) {
//         let response: responseModel = {
//           status: 200,
//           message: "User deleted successfully",
//           data: null,
//           error: null,
//         };
//         console.log("deleteresponse",response)
//         res.status(200).json(response);
//       } else {
//         let response: responseModel = {
//           status: 404,
//           message: "User not found",
//           data: null,
//           error: null,
//         };
//         res.status(404).json(response);
//       }
//     } catch (e) {
//       console.log("deleteerror",e)
//       let response: responseModel = {
//         status: 500,
//         message: "Data delete failed",
//         data: null,
//         error: e as string,
//       };
//       res.status(500).json(response);
//     }
//   };

//   const updatefield = async (req: Request, res: Response) => {
//     console.log(req.params)
//     try {
//       const updatedUser = await datarepositary.update(req.params.id, {
//         rollno:req.body.rollno,
//         lastname:req.body.lastname,
//         country:req.body.country,
      
//       });

//       if (!updatedUser) {
//         let response: responseModel = {
//           status: 404,
//           message: "User not found",
//           data: null,
//           error: null,
//         };
//         res.status(404).json(response);
//       } else {
//         let response: responseModel = {
//           status: 200,
//           message: "User updated successfully",
//           data: { user: updatedUser },
//           error: null,
//         };
//         res.status(200).json(response);
//       }
//     } catch (e) {
//       let response: responseModel = {
//         status: 500,
//         message: "Data update failed",
//         data: null,
//         error: e as string,
//       };
//       res.status(500).json(response);
//     }
//   };
  
  

//   export default {
//     postfield,
//     getfield,
//     deletefield,
//     updatefield
//   }