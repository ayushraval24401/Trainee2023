using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace demo1
{
    public class checkTemprature
    {
        public void CheckTemprature()
        {
            Console.WriteLine("Enter Temprature in centigrade");
            string temprature = Console.ReadLine();
            if (Decimal.TryParse(temprature, out decimal validtemp)) 
            { 
                if (validtemp <= 0)
                {
                    Console.WriteLine("Freezing weather");
                }
                else if (validtemp <= 10)
                {
                    Console.WriteLine("Very Cold weather");
                }
                else if (validtemp <= 20)
                {
                    Console.WriteLine("Cold weather");
                }
                else if ( validtemp <= 30)
                {
                    Console.WriteLine("Normal Temprature");
                }
                else if (validtemp <= 40)
                {
                    Console.WriteLine("Its Hot");
                }
                else
                {
                    Console.WriteLine("Its Very Hot");
                }
            }
            else
            {
                Console.WriteLine("Enter Valid Temprature value");
            }

        }
    }
}
