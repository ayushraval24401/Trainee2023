import {PrismaClient} from '@prisma/client';
import {TrainsModel} from "../../models/usermodel";


const prisma=new PrismaClient();

class TrainRepositary{
    // async findMany() {
    //     const users=await prisma.trainList.findMany();
    //     return users;
    //   }

    async findMany()
    {
      const users=await prisma.trainList.findMany({
        include:{
          station:{
            select:{
              stationCode:true,
              stationName:true
            }
          },
          bookinglist:{
            select:{
              passengerAge:true,
              passengerName:true,
              
            }
          }
        
        }
      })
      return users
    }

    authrepositary: any;

    async create(usermodel: TrainsModel) {
        let responseUser = await prisma.trainList.create({
          data: {
            Train_No: usermodel.Train_No,
            trainName: usermodel.trainName,
            destination: usermodel.destination,
            seatsTotal: usermodel.seatsTotal,
            stationList:usermodel.stationList

          }
        });
      
        return responseUser;
      }
      
async delete(id: string) {
    const deletedUser = await prisma.trainList.delete({
      where: {id},
    });
    return deletedUser;
  }

  async update(id: string, usermodel: TrainsModel) {
    const updatedUser = await prisma.trainList.update({
      where: { id },
      data: {
        Train_No: usermodel.Train_No,
        trainName: usermodel.trainName,
        destination: usermodel.destination,
        seatsTotal: usermodel.seatsTotal,
        stationList:usermodel.stationList
      },
    });
    return updatedUser;
  }

  async sortdata(sortby: any) {
    const users = await prisma.trainList.findMany({
      orderBy: {
        destination: sortby,
      },
    });
    return users;
  }


  async search(key: string) {
    try {
      const searchResults = await prisma.trainList.findMany({
      where:{
        station:{
         stationName:{
          contains:key
         }
        }
      }
      });
      return searchResults;
    } catch (error) {
      console.error(error);
      throw new Error('Error searching bookings');
    }
  }

  // async search(key: string) {
  //   try {
  //     const searchResults = await prisma.bookingList.findMany({
  //       where: {
  //         OR: [
  //           {
  //             passengerName: {
  //               contains: key,
  //             },
  //           },
  //           {
  //             passengerGender: {
  //               contains: key,
  //             },
  //           },
  //         ],
  //       },
  //     });
  //     return searchResults;
  //   } catch (error) {
  //     console.error(error);
  //     throw new Error('Error searching bookings');
  //   }
  // }

}

export default new TrainRepositary;
