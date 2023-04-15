using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOP_Practice
{
    internal class ROI_Calc
    {
        public class InputValues
        {
            public InputValues()
            {
                Console.Write("Enter Amount Invested : ");
                var AmountInvested = Convert.ToDouble(Console.ReadLine());
                Console.Write("Enter Amount Returned : ");
                var AmountReturned = Convert.ToDouble(Console.ReadLine());

                var ROI = (AmountReturned - AmountInvested) / AmountInvested*100;


                Console.WriteLine("Choose d to calculate Time by date or l to calculate Time by Length");
                Console.Write("Investment Time (d/l) : ");
                var selection = Convert.ToString(Console.ReadLine());

                if (selection == "d")
                {

                    Console.Write("Enter Start Date (DD/MM/YYYY) : ");
                    DateTime start = Convert.ToDateTime(Console.ReadLine());
                    Console.Write("Enter End Date (DD/MM/YYYY) : ");
                    DateTime end = Convert.ToDateTime(Console.ReadLine());

                    var difference = end.Subtract(start);
                    var diffinyears = difference.Days * 0.0027379;


                    Console.WriteLine("ROI = " + ROI + "%");
                    Console.WriteLine("Difference in Years : {0}", diffinyears + " years");


                }
                else if (selection == "l")
                {
                    Console.Write("Enter Years : ");
                    var years = Convert.ToDouble(Console.ReadLine());
                    Console.WriteLine("ROI = " + ROI + "%");
                    Console.WriteLine("Investment Length = " + years + " years");

                }

                var InvestmentDifference = AmountReturned - AmountInvested;

                if(InvestmentDifference > 0)
                {
                    Console.WriteLine("Investment Gain = " +InvestmentDifference);
                }
                else
                {
                    Console.WriteLine("Investment Loss = " + (-InvestmentDifference));
                }
            }
        }
    }
}
