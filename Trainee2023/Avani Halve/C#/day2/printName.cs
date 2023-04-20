using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace day2
{
    public class printName
    {
        public void  printYourName()
        {
            Console.WriteLine("Enter Your Name");
            string name = Console.ReadLine();
            for (int i = 0; i < 5; i++)
            {
                Console.WriteLine("Your Name: " + name);
            }
        }
    }
}
