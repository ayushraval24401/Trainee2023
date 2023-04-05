using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace demo1
{
    public class MaxorMin
    {
        public void CheckMaxMin()
        {
            Console.WriteLine("Enter Your Choice:\n1. Find Maximun \n2. Find Minimum");
            var choice = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Enter 2 Numbers");
            var num1 = Convert.ToInt32(Console.ReadLine()); 
            var num2 = Convert.ToInt32((Console.ReadLine()));
            if(choice == 1)
            {
                var compair = Math.Max(num1, num2);
                Console.WriteLine("Maximum number is: " + compair);
            }
            else if(choice == 2)
            {
                var compair = Math.Min(num1, num2);
                Console.WriteLine("Minimum number is: " + compair);
            }
            else
            {
                Console.WriteLine("Enter valid Choice");
            }
        }
    }
}
