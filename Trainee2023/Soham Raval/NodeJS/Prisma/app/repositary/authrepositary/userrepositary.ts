// import {PrismaClient} from '@prisma/client';
// import {UserListModel} from "../../models/usermodel";


// const prisma=new PrismaClient();

// class UserRepositary{
//     async findMany() {
//         const users = await prisma.userList.findMany();
//         return users;
//       }


//     authrepositary: any;

//     async create(usermodel: UserListModel) {
//         let responseUser = await prisma.userList.create({
//           data: {
//             name: usermodel.name,
//             email: usermodel.email,
//             city: usermodel.city,
//             gender: usermodel.gender
//           }
//         });
      
//         return responseUser;
//       }
      
// async delete(id: string) {
//     const deletedUser = await prisma.userList.delete({
//       where: {id},
//     });
//     return deletedUser;
//   }

//   async update(id: string, usermodel: UserListModel) {
//     const updatedUser = await prisma.userList.update({
//       where: { id },
//       data: {
//         name: usermodel.name,
//         email: usermodel.email,
//         city: usermodel.city,
//         gender: usermodel.gender,
//       },
//     });
//     return updatedUser;
//   }
// }

// export default new UserRepositary;
