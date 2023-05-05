// import { Request, Response, response } from 'express';
// import { responseModel} from '../Model/interface';
// import {UserListModel} from '../app/models/usermodel'
// // import User from '../Model/userSchema';
// import {PrismaClient} from '@prisma/client';

// const prisma=new PrismaClient();

// class CustomerController {

//     async getdata(req: Request, res: Response) {
//         try {
//           const responses = await prisma.userList.findMany();


//           let response: responseModel = {
//             status: 200,
//             message: "data retrieved successfully",
//             data: {user:responses},
//             error: null
//           };
  
//           res.status(200).json(response);
//         } catch (e:any) {
//           let response: responseModel = {
//             status: 400,
//             message: "data record not found",
//             data: null,
//             error: e as string
//           };
//           res.status(400).json(response);
//         }
//       }
      

//   async postdata(req: Request, res: Response) {
//     console.log("insertttt");
//     // const temp = new User(req.body);
//     const user:UserListModel={
//         name:req.body.name,
//         email:req.body.email,
//         city:req.body.city,
//         gender:req.body.gender,
//     }
//     try {

//       let responseUser = await prisma.userList.create({data:{

//         name:user.name,
//         email:user.email,
//         city:user.city,
//         gender:user.gender
//       }})
//       let response:responseModel={
//         status:201,
//         message:"data saved successfully",
//         data:{user:responseUser},
//         error:null,
//       }

//       res.status(201).json(response);
//     } catch (e) {
//       let response:responseModel={
//         status:400,
//         message:"data save failed",
//         data:null,
//         error:e as string
//       }

//       res.status(400).json(response);
//     }
//   }

//  async deletedata(req: Request, res: Response) {
//     try {
//       const deletedUser = await prisma.userList.delete({
//         where: { id: req.params._id },
//       });

//       if (deletedUser) {
//         let response: responseModel = {
//           status: 200,
//           message: "Email deleted successfully",
//           data: null,
//           error: null,
//         };
//         res.status(200).json(response);
//       } else {
//         let response: responseModel = {
//           status: 404,
//           message: "Email not found",
//           data: null,
//           error: null,
//         };
//         res.status(404).json(response);
//       }
//     } catch (e) {
//       let response: responseModel = {
//         status: 500,
//         message: "data delete failed",
//         data: null,
//         error: e as string,
//       };
//       res.status(500).json(response);
//     }
//   }

//   async updatedata(req: Request, res: Response) {
//     try {
//       const updatedUser = await prisma.userList.update({
//         where: { id: req.params._id },
//         data: {
//           name: req.body.name,
//           email:req.body.email,
//           city: req.body.city,
//           gender: req.body.gender,
//         },
//       });
//       if (!updatedUser) {
//         let response: responseModel = {
//           status: 404,
//           message: "Email not found",
//           data: null,
//           error: null,
//         };
//         res.status(404).json(response);
//       } else {
//         let response: responseModel = {
//           status: 200,
//           message: "Email updated successfully",
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
//   }
  


// }

// export default new CustomerController();
