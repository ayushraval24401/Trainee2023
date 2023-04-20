using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace day2
{
    public class countNegElementinArray
    {
        public void CountNegValinArray()
        {
            
            Console.WriteLine("Enter size of Array");
            int sizeOfArray = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Enter the values of Array");
            int[] myNum = new int[sizeOfArray] ;
            int count = 0 ;
            for (int i = 0; i < sizeOfArray; i++)
            {
                myNum[i] = Convert.ToInt32(Console.ReadLine());
               if(myNum[i] < 0)
                {
                    count++;
                }
            }
            Console.WriteLine("Negative Numbers are: " + count);
        }
    }
}
