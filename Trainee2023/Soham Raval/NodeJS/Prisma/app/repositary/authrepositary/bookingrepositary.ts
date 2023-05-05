import { Prisma, PrismaClient } from '@prisma/client';
import { BookingModel } from "../../models/usermodel";


const prisma = new PrismaClient();

class StationRepositary {
  async find(passengerName: string) {
    try {
      const booking = await prisma.bookingList.findMany({
        where: { passengerName },
      });
      return booking;
    } catch (error) {
      throw error;
    }
  }



  // async findMany() {
  //     const users=await prisma.bookingList.findMany();
  //     return users;
  //   }

  //  return await prisma.bookingList.findMany({
  //       orderBy: {
  //         name:'asc'
  //       },
  //     });

  // async findMany()
  // {
  //     const users = await prisma.bookingList.findMany({
  //         where: {
  //             passengerAge: {
  //             gt: 27,
  //           },
  //         },
  //       })
  //       return users;

  // }

  async findMany() {
    const bookingdata = await prisma.bookingList.findMany({
      include: {
        passenger: {
          select: {
            username: true,
            password: true,
            email: true
          }
          
          
        },
        
       
        //     train: {
        //   select: {
        //     destination: true,
        //     seatsTotal: true,
        //     trainName: true

        //   }
        
          
        // },
      
        
        
      },
      // where:{
      //   train:{
      //     destination:"junagadh"
      //   }
      // }
      // where:{
      //   passenger.email:{
      //     "ee@gmail.com"
      //   }
      // }

  
  //  where:{
  //   OR:[{
  //     passengerName:{
  //       startsWith:'a',
  //     }
  //   },{
  //     AND:{
  //       train:{
  //         seatsTotal:{
  //           gt:385,
  //         },
  //         trainName:{
  //           equals:"suarashtra"
  //         }
  //       }
  //     }
  //   }]
  //  }
      // where: {
      //   passengerAge: {
      //     lt: 27,
      //   },
      // }
      
      
    })
    return bookingdata
  }

  authrepositary: any;

  async create(usermodel: BookingModel) {
    let responseUser = await prisma.bookingList.create({
      data: {
        passengerName: usermodel.passengerName,
        passengerAge: usermodel.passengerAge,
        passengerGender: usermodel.passengerGender,
        passengerList: usermodel.passengerList,
        trainList:usermodel.trainList


      }
    });

    return responseUser;
  }

  async delete(id: string) {
    const deletedUser = await prisma.bookingList.delete({
      where: { id },
    });
    return deletedUser;
  }

  async update(id: string, usermodel: BookingModel) {
    const updatedUser = await prisma.bookingList.update({
      where: { id },
      data: {
        passengerName: usermodel.passengerName,
        passengerAge: usermodel.passengerAge,
        passengerGender: usermodel.passengerGender,
        passengerList: usermodel.passengerList,
        trainList:usermodel.trainList

      },
    });
    return updatedUser;
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
  async search(key: string) {
    try {
      const searchResults = await prisma.bookingList.findMany({
        include: {
          
          passenger: {
            where: {
              username: {
                contains: key,
                mode:"insensitive"
              },
            }
          }
        },
      });
      return searchResults;
    } catch (error) {
      console.error(error);
      throw new Error('Error searching bookings');
    }
  }
  
  
  
  async filter(key: string){
      try {
        const filterresult = await prisma.bookingList.findMany({
          where: {
            passengerName: {
              contains: key,
            },
          }
        });
        return filterresult;
      }
      catch (error) {
        console.error(error);
        throw new Error('Error filter bookings');


      }
    }

  async sortdata(sortby: any) {
      const users = await prisma.bookingList.findMany({
        orderBy: {
          passengerName: sortby,
          
        },
      });
      return users;
    }


    
  // async sortdata(sortby: any) {
  //   const users = await prisma.bookingList.findMany({
  //     orderBy: {
  //       passengerName: {
  //         [sortby.toLowerCase()]: { mode: 'insensitive' },
  //       },
  //     },
  //   });
  //   return users;
  // }
  





  }

export default new StationRepositary;

