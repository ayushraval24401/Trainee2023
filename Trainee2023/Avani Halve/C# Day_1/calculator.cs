using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace demo1
{
    public class calculator
    {
        public void Calculator()
        {
                Console.WriteLine("Enter Your Choice\n1. Addition\n2. Substraction\n3. Multiplication\n4. Divide");
                string choice = Console.ReadLine();
                switch (choice)
                {
                    case "1":
                        {
                            Console.Write("Enter First Number: ");
                            decimal number1 = Convert.ToDecimal(Console.ReadLine());
                            Console.Write("Enter Second Number: ");
                            decimal number2 = Convert.ToDecimal(Console.ReadLine());
                            decimal result = number1 + number2;
                            Console.WriteLine("Addition is: " + result);
                            break;
                        }

                    case "2":
                        {
                            Console.Write("Enter First Number: ");
                            decimal number1 = Convert.ToDecimal(Console.ReadLine());
                            Console.Write("Enter Second Number: ");
                            decimal number2 = Convert.ToDecimal(Console.ReadLine());
                            decimal result = number1 - number2;
                            Console.WriteLine("Substraction is: " + result);
                            break;
                        }

                    case "3":
                        {
                            Console.Write("Enter First Number: ");
                            var number1 = Convert.ToDecimal(Console.ReadLine());
                            Console.Write("Enter Second Number: ");
                            var number2 = Convert.ToDecimal(Console.ReadLine());
                            var result = number1 * number2;
                            Console.WriteLine("Multiplication is: " + result);
                            break;
                        }

                    case "4":
                        {
                            Console.Write("Enter First Number: ");
                            var number1 = Convert.ToDecimal(Console.ReadLine());
                            Console.Write("Enter Second Number: ");
                            var number2 = Convert.ToDecimal(Console.ReadLine());
                            if (number2 == 0)
                            {
                                Console.WriteLine("Cannot divide by 0");
                            }
                            else
                            {
                                var result = number1 / number2;
                                Console.WriteLine("Divide is: " + result);
                            }
                            break;
                        }
                    default:
                        {
                            Console.WriteLine("Enter Valid Choice");
                            break;
                        }
                }
        }
    }
}
