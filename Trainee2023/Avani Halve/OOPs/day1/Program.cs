using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace day1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            criketGame gameObj = new criketGame();
            //gameObj.Criketgame();
            // Console.WriteLine(gameObj.players); // cannot access this 
            //gameObj.TeamPlayers(); // cannot access this, beacuse it is private method
            // Console.WriteLine(gameObj.teams);
            // gameObj.score();

            roiCalculator roiCalculatorObj = new roiCalculator();
            roiCalculatorObj.ROICalculator();

            //carRental carRentObj = new carRental();
            //carRentObj.CarOptions();
        }
    }
}
