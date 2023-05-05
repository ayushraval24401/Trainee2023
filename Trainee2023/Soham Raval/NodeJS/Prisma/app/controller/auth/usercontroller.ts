// import { Request,Response} from 'express';
// import {UserListModel} from "../../models/usermodel"
// import userrepositary from '../../repositary/authrepositary/userrepositary';
// import { responseModel } from '../../../Model/interface';


// const postdata=async (req: Request, res: Response)=> {
//     console.log("insertttt");
//     // const temp = new User(req.body);
  
//     try {
//       const user:UserListModel={
//         name:req.body.name,
//         email:req.body.email,
//         city:req.body.city,
//         gender:req.body.gender,

//     }
//     console.log(user);

//       const userResponse=await userrepositary.create(user)
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

  
//   const getdata = async (req: Request, res: Response) => {
//     try {
//       const users = await userrepositary.findMany();
  
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

//   const deletedata = async (req: Request, res: Response) => {
//     try {
//       console.log(req.params)

//       const deletedUser = await userrepositary.delete(req.params.id);
  
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

//   const updatedata = async (req: Request, res: Response) => {
//     console.log(req.params)
//     try {
//       const updatedUser = await userrepositary.update(req.params.id, {
//         name: req.body.name,
//         email: req.body.email,
//         city: req.body.city,
//         gender: req.body.gender,
      
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
//     postdata,
//     getdata,
//     deletedata,
//     updatedata
//   }