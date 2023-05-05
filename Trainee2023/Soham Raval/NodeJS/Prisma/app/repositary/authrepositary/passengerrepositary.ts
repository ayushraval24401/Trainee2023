import {PrismaClient} from '@prisma/client';
import {PassengerModel} from "../../models/usermodel";


const prisma=new PrismaClient();

class StationRepositary{
    // async findMany() {
    //     const users=await prisma.passengerList.findMany();
    //     return users;
    //   }

      async findMany() {
        const passengerdata = await prisma.passengerList.findMany({
          include:{
            booking:{
              select:{
                passengerName:true,
                passengerAge:true,
                passengerGender:true
              }
            }
          },
      
        })
        return passengerdata
      }


    authrepositary: any;

    async create(usermodel: PassengerModel) {
        let responseUser = await prisma.passengerList.create({
          data: {
            username: usermodel.username,
            password: usermodel.password,
            email:usermodel.email,
            BookingList:usermodel.BookingList
   

          }
        });
      
        return responseUser;
      }
      
async delete(id: string) {
    const deletedUser = await prisma.passengerList.delete({
      where: {id},
    });
    return deletedUser;
  }

  async update(id: string, usermodel: PassengerModel) {
    const updatedUser = await prisma.passengerList.update({
      where: { id },
      data: {
        username: usermodel.username,
        password: usermodel.password,
        email:usermodel.email,
        BookingList:usermodel.BookingList
      },
    });
    return updatedUser;
  }
}

export default new StationRepositary;
