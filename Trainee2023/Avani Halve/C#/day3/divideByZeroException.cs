using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace day3
{
    public class divideByZeroException
    {
        public void DivideByZeroException()
        {
            Console.WriteLine("Enter 2 numbers for divide");
            int num1 = Convert.ToInt32(Console.ReadLine());
            int num2 = Convert.ToInt32(Console.ReadLine());
            try
            {
                decimal result = num1 / num2;
            }
            catch(DivideByZeroException exception)
            {
                Console.WriteLine(exception.Message);
                Console.WriteLine("Error Message : Cannot divide by zero");
            }
            finally
            {
                Console.WriteLine("So here Finally is excuted");
            }
            
        }
    }
}
