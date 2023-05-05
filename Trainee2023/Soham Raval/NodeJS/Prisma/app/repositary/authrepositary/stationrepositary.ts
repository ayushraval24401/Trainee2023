import {PrismaClient} from '@prisma/client';
import {StationModel} from "../../models/usermodel";


const prisma=new PrismaClient();

class StationRepositary{
    async findMany() {
        const users=await prisma.stationList.findMany();
        return users;
      }


    authrepositary: any;

    async create(usermodel: StationModel) {
        let responseUser = await prisma.stationList.create({
          data: {
            stationCode: usermodel.stationCode,
            stationName: usermodel.stationName,

   

          }
        });
      
        return responseUser;
      }
      
async delete(id: string) {
    const deletedUser = await prisma.stationList.delete({
      where: {id},
    });
    return deletedUser;
  }

  async update(id: string, usermodel: StationModel) {
    const updatedUser = await prisma.stationList.update({
      where: { id },
      data: {
        stationCode: usermodel.stationCode,
        stationName: usermodel.stationName,
      },
    });
    return updatedUser;
  }
}

export default new StationRepositary;
