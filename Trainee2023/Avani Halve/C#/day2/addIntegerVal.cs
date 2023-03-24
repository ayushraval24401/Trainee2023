using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace day2
{
    public class addIntegerVal
    {
        public void AddIntegerValue()
        {
            Console.WriteLine("Enter 2 values");
            //int num1 = Convert.ToInt32(Console.ReadLine());
            //int num2 = Convert.ToInt32(Console.ReadLine());
            Add(23, 24);
            Add(23, 24, 2);
        }

        void Add(int num1, int num2)
        {
            int add = num1 + num2;
            Console.WriteLine("Sum of 2 numbers (23 and 24): " + add);
        }
        void Add(int num1, int num2, int num3)
        {
            int add = num1 + num2 + num3;
            Console.WriteLine("Sum of 2 numbers (23, 24 and 02): " + add);
        }
    }
}
