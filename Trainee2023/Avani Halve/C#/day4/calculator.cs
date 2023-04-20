using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace day4
{
    public class calculator
    {
        decimal result;
        public void Calculator()
        {
            Console.WriteLine("--- Calculator ---");
            Console.WriteLine("-- Enter your Choice -- \n1. Addition. \n2. Substraction. \n3. Multiplication. \n4. Divide");
            int choice = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Enter 2 numbres to calculate");
            int num1 = Convert.ToInt32(Console.ReadLine());
            int num2 = Convert.ToInt32(Console.ReadLine());
           
            switch (choice)
            {
                case 1:
                    {
                        addition(num1, num2);
                        break;
                    }
                case 2:
                    {
                        substraction(num1, num2);
                        break;
                    }
                case 3:
                    {
                        multiplication(num1, num2);
                        break;
                    }
                case 4:
                    {
                        divide(num1, num2);
                        break;
                    }
            }

        }

        void addition(int number1, int number2)
        {
            result = number1 + number2;
            Console.WriteLine("Addition is: " + result);
        }
        void substraction(int number1, int number2)
        {
            result = number1 - number2;
            Console.WriteLine("Substraction is: " + result);
        }
        void multiplication(int number1, int number2)
        {
            result = number1 * number2;
            Console.WriteLine("Multiplication is: " + result);
        }
        void divide(int number1, int number2)
        {
            if (number2 == 0)
            {
                Console.WriteLine("Cannot divide by 0");
            }
            else
            {
                result = number1 / number2;
                Console.WriteLine("Division is: " + result);
            }
        }
    }
}
