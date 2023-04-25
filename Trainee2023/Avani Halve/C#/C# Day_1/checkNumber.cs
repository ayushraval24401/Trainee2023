using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace demo1
{
    public class checkNumber
    {
        public void CheckNumber()
        {
            Console.WriteLine("Enter a valid number to check whether it is negative, positive, or zero:");
            string Number = Console.ReadLine();

            if (Decimal.TryParse(Number, out decimal validNumber))
            {
                if (validNumber < 0)
                {
                    Console.WriteLine("The number is negative.", validNumber);
                }
                else if (validNumber > 0)
                {
                    Console.WriteLine("The number is positive.", validNumber);
                }
                else
                {
                    Console.WriteLine("The number is zero.");
                }
            }
            else
            {
                Console.WriteLine("Invalid input: please enter a valid number.");
            }
        }
    }
}
