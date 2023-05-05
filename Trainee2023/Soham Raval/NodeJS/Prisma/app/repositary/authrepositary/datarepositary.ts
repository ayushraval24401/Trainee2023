// import {PrismaClient} from '@prisma/client';
// import {UserDataModel} from '../../models/usermodel'


// const prisma=new PrismaClient();

// class DataRepositary{
//     async findMany() {
//         const users = await prisma.dataList.findMany()
//         return users;
//       }


//     authrepositary: any;

//     async create(datamodel: UserDataModel) {
//         let responseUser = await prisma.dataList.create({
//           data: {
//             rollno: datamodel.rollno,
//             lastname:datamodel.lastname,
//             country:datamodel.country
          
//           }
//         });
      
//         return responseUser;
//       }
      
// async delete(id: string) {
//     const deletedUser = await prisma.dataList.delete({
//       where: {id},
//     });
//     return deletedUser;
//   }

//   async update(id: string, datamodel: UserDataModel) {
//     const updatedUser = await prisma.dataList.update({
//       where: { id },
//       data: {
//         rollno: datamodel.rollno,
//         lastname:datamodel.lastname,
//         country:datamodel.country
   
//       },
//     });
//     return updatedUser;
//   }
// }

// export default new DataRepositary;
