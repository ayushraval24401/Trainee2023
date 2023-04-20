using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace day3
{
    public class argumentNullException
    {
        public void ArgumentNullException()
        {
            try
            {
                //string name = null;
                Console.WriteLine("Enter name");
                string name = Console.ReadLine();
                if (name is null || name is "")
                {
                    throw new ArgumentNullException("Name connot be null");
                }
                else
                {
                    Console.WriteLine("Valid name");
                }
            }
            catch(ArgumentNullException exception)
            {
                Console.WriteLine(exception.Message);
            }
        }
    }
}
