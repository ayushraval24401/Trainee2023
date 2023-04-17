using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Security.Policy;
using System.Text;
using System.Threading;
using System.Threading.Tasks;


namespace Task_2_Day_2
{
    class Program
    {

        static void Main(string[] args)
        {
            do
            {
                Console.WriteLine("------------------------- MENU ---------------------------\n");

                Console.WriteLine("1. Write your name 5 times");
                Console.WriteLine("2. Write a method that returns a string of even numbers greater than 0 and less than 50");
                Console.WriteLine("3. Count negative elements in array");
                Console.WriteLine("4. Find maximum and minimum element in array");
                Console.WriteLine("5. count even and odd elements in array");
                Console.WriteLine("6. program to print int, string and int, string value by function overloading - use same method name");
                Console.WriteLine("7. sum of two integer value, three integer value and three double values - use same method name");
                Console.WriteLine("8. Exit");



                Console.WriteLine("\n--------------------------------------------------------\n");
                Console.Write("Enter Your Choice : ");

                var task = Convert.ToInt32(Console.ReadLine());

                switch (task)
                {
                    case 1:
                        try
                        {
                            Console.WriteLine("\n--------------- Print your name 5 times -------------------------");

                            Console.Write("\nEnter your Name : ");
                            string name = Console.ReadLine();

                            for (int i = 1; i <= 5; i++)
                            {
                                Console.WriteLine("Your Name is : " + name);

                            }
                            Console.Write("\nPress Enter to Proceed..!!");

                        }
                        catch (Exception)
                        {
                            Console.WriteLine("Enter Valid Input");
                        }

                        Console.ReadLine(); //waits for enter button to be pressed to exit console

                        break;
                    case 2:

                        Console.WriteLine("\n---------------  Even numbers greater than 0 and less than 50 -------------------------");

                        for (int i = 0; i < 50; i++)
                        {
                            if (i == 2 || i == 12 || i == 22 || i == 32 || i == 42)
                            {
                                continue;
                            }

                            if (i % 2 == 0)
                            {
                                Console.WriteLine(i);

                            }

                            //2,12,22,32,42 skip
                        }
                        Console.Write("\nPress Enter to Proceed..!!");
                        Console.ReadLine(); //waits for enter button to be pressed to exit console
                        break;

                    case 3:
                        try
                        {
                            Console.WriteLine("\n--------------- Count Netagive Numbers -------------------------");

                            Console.Write("Enter Length of Arrray  : ");
                            var length = Convert.ToInt32(Console.ReadLine());
                            double[] numbers = new double[length]; //Taking Array

                            for (int i = 0; i < length; i++)
                            {
                                Console.Write("\nEnter Numbers " + i + " : ");
                                numbers[i] = Convert.ToDouble(Console.ReadLine());

                            }
                            var negative = numbers.Where(n => n < 0);
                            Console.WriteLine("Total Negative numbers : " + negative.Count());
                            Console.ReadLine(); //waits for enter button to be pressed to exit console

                            Console.Write("\nPress Enter to Proceed..!!");

                        }
                        catch (Exception)
                        {
                            Console.WriteLine("Enter Valid Input !");
                        }
                        break;


                    case 4:


                        try
                        {
                            Console.WriteLine("\n--------------- Maximum and Minimum -------------------------");

                            Console.Write("Enter Length of Arrray  : ");
                            var length = Convert.ToInt32(Console.ReadLine());
                            double[] numbers = new double[length]; //Taking Array

                            for (int i = 0; i < length; i++)
                            {
                                Console.Write("Enter Numbers " + i + " : ");
                                numbers[i] = Convert.ToDouble(Console.ReadLine());

                            }
                            Console.WriteLine("Maximum number : " + numbers.Max());
                            Console.WriteLine("Minimum number : " + numbers.Min());

                            Console.Write("\nPress Enter to Proceed..!!");
                            Console.ReadLine(); //waits for enter button to be pressed to exit console
                         

                        }
                        catch (Exception)
                        {
                            Console.WriteLine("Enter Valid Input !");
                        }
                        break;

                    case 5:

                        try
                        {
                            Console.WriteLine("\n--------------- Count Even Odd -------------------------");

                            Console.Write("Enter Length of Arrray  : ");
                            var length = Convert.ToInt32(Console.ReadLine());
                            int[] numbers = new int[length]; //Taking Array

                            for (int i = 0; i < length; i++)
                            {
                                Console.Write("\nEnter Numbers " + i + " : ");
                                numbers[i] = Convert.ToInt32(Console.ReadLine());

                            }

                            var even = numbers.Where(n => n % 2 == 0);
                            Console.WriteLine("Total Even numbers : " + even.Count());

                            var odd = numbers.Where(n => n % 2 != 0);
                            Console.WriteLine("Total Odd numbers : " + odd.Count());

                            Console.Write("\nPress Enter to Proceed..!!");
                            Console.ReadLine(); //waits for enter button to be pressed to exit console
                        }
                        catch (Exception)
                        {
                            Console.WriteLine("Enter Valid Input !");
                        }
                        break;

                    case 6:

                        int num = Print(8, 5);
                        string str = Print("Krinal", "Patel");
                        Console.WriteLine("Int: " + num);
                        Console.WriteLine("String: " + str);
                        Console.Write("\nPress Enter to Proceed..!!");

                        Console.ReadLine();
                        break;

                    case 7:

                        try
                        {
                            Console.WriteLine("\n--------------- Function overloading -------------------------");

                            Console.Write("Enter Number 1 : ");
                            var no1 = Convert.ToInt32(Console.ReadLine());
                            Console.Write("Enter Number 2 : ");
                            var no2 = Convert.ToInt32(Console.ReadLine());

                            int Num = Add(no1, no2);               //Dynamic Parameter Passing

                            Console.WriteLine("\nAddition of two int value : " + Num);

                            Console.Write("Enter Number 1 : ");
                            var n1 = Convert.ToInt32(Console.ReadLine());
                            Console.Write("Enter Number 2 : ");
                            var n2 = Convert.ToInt32(Console.ReadLine());
                            Console.Write("Enter Number 3 : ");
                            var n3 = Convert.ToInt32(Console.ReadLine());

                            int n = Add(n1, n2, n3);               //Dynamic Parameter Passing

                            Console.WriteLine("\nAddition of three int value : " + n);



                            Console.Write("Enter Double Number 1 : ");
                            var d1 = Convert.ToDouble(Console.ReadLine());
                            Console.Write("Enter Double Number 2 : ");
                            var d2 = Convert.ToDouble(Console.ReadLine());
                            Console.Write("Enter Double Number 3 : ");
                            var d3 = Convert.ToDouble(Console.ReadLine());

                            double d = Add(d1, d2, d3);               //Dynamic Parameter Passing

                            Console.WriteLine("\nAddition of three double value : " + d);

                            Console.Write("\nPress Enter to Proceed..!!");
                            Console.ReadLine(); //waits for enter button to be pressed to exit console
                        }
                        catch (Exception)
                        {
                            Console.WriteLine("Enter Valid Input !");
                        }
                        break;

                   case 8:
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

        //7
        static int Add(int x, int y)
        {
            return x + y;
        }
        static int Add(int x, int y,int z)
        {
            return x + y+ z;
        }
        static double Add(double x, double y,double z)
        {
            return x + y+ z;
        }

        //6
        static int Print(int x, int y)
        {
            return x + y;
        }

        static string Print(string x, string y)
        {
            return x + y;
        }
    }

}

////Thread.Sleep(10000);  //To Pause the output for 10 seconds
