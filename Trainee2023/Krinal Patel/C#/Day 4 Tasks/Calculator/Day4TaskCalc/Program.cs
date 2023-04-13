using System;
using System.Security.Cryptography;
using System.IO;

namespace Day4TaskCalc
{

    class Program
    {

        //Calculator
        static double addition(double num1, double num2)
        {
            return num1 + num2;
        }
        static double substract(double no1, double no2)
        {
            return no1 - no2;
        }
        static double multiply(double no1, double no2)
        {
            return no1 * no2;
        }
        static double division(double no1, double no2)
        {
            if (no2 == 0)
            {
                throw new DivideByZeroException();
            }
            return no1 / no2;
        }
        static double modulus(double no1, double no2)
        {
            return no1 % no2;
        }



        static void Main(string[] args)
        {


            do
            {
                Console.WriteLine("\n------------------------- MENU ---------------------------\n");

                Console.WriteLine("1. Calculator");
                Console.WriteLine("2. Student Portal");

                Console.WriteLine("0. Exit");




                Console.WriteLine("\n--------------------------------------------------------\n");
                Console.Write("Enter Your Choice : ");

                var task = Convert.ToInt32(Console.ReadLine());

                switch (task)
                {
                    case 1:

                        try
                        {
                            Console.Write("Enter Number 1 : ");
                            var no1 = Convert.ToInt32(Console.ReadLine());
                            Console.Write("Enter Number 2 : ");
                            var no2 = Convert.ToInt32(Console.ReadLine());

                            Console.WriteLine("The Addition of {0} and {1} is: {2} ", no1, no2, addition(no1, no2));
                            Console.WriteLine("The Substraction of {0} and {1} is: {2} ", no1, no2, substract(no1, no2));
                            Console.WriteLine("The Multiplication of {0} and {1} is: {2} ", no1, no2, multiply(no1, no2));
                            Console.WriteLine("The Division of {0} and {1} is: {2} ", no1, no2, division(no1, no2));
                            Console.WriteLine("The Modulus of {0} and {1} is: {2} ", no1, no2, modulus(no1, no2));

                        }
                        catch (FormatException ex)
                        {
                            Console.WriteLine(ex.Message);
                        }
                        break;
                    case 2:
                        Console.WriteLine("Done in another file named Student");


                        break;

                    case 0:
                        Environment.Exit(1);// exit

                        break;

                    default:
                        Console.WriteLine("Please Enter 1 to 7");
                        Console.ReadLine(); //waits for enter button to be pressed to exit console
                        break;

                }

            }
            while (true);

        }
    }


}

