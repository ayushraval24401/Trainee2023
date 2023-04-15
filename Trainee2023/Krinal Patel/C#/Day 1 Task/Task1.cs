using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Security.Policy;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using task_1;
using Tasks;

namespace Tasks
{
    class Program
    {

        static void Main(string[] args)
        {
            Console.WriteLine("1. Check Positive, Negative or zero");
            Console.WriteLine("2. Check Days of Week");
            Console.WriteLine("3. Check Maximum or Minimum");
            Console.WriteLine("4. Temperature State");
            Console.WriteLine("5. Calculator");

            Console.WriteLine("\n--------------- Enter your choice -------------------------\n");


            var task = Convert.ToInt32(Console.ReadLine());

            switch(task)
            {
                case 1:
                    Console.WriteLine("--------------- Check Positive, Negative or zero -------------------------");

                    Console.Write("Enter Number : ");
                    double number = Convert.ToDouble(Console.ReadLine());

                    if (number == 0)
                        Console.WriteLine("Entered Number is 0");

                    else if (number > 0)
                        Console.WriteLine("Entered Number is Positive");

                    else if (number < 0)
                        Console.WriteLine("Entered Number is Negative");
                    else
                        Console.WriteLine("Entered Input is Invalid");

                        Console.ReadLine(); //waits for enter button to be pressed to exit console

                    break;
                case 2:

                    Console.WriteLine("--------------- Check Days of Week -------------------------");

                    Console.Write("Enter Day No : ");
                    var day = Convert.ToInt32(Console.ReadLine());


                    switch (day)
                    {
                        case 1:
                            Console.WriteLine("Monday");
                            break;
                        case 2:
                            Console.WriteLine("Tuesday");
                            break;
                        case 3:
                            Console.WriteLine("Wednesday");
                            break;
                        case 4:
                            Console.WriteLine("Thursday");
                            break;
                        case 5:
                            Console.WriteLine("Friday");
                            break;
                        case 6:
                            Console.WriteLine("Saturday");
                            break;
                        case 7:
                            Console.WriteLine("Sunday");
                            break;
                        default:
                            Console.WriteLine("Enter between 1 and 7");
                            break;
                    }
                    Console.ReadLine(); //waits for enter button to be pressed to exit console
                    break;

                case 3:

                    Console.WriteLine("--------------- Check Maximum or Minimum -------------------------");

                    Console.Write("Enter Number 1 : ");
                    var num1 = Convert.ToInt32(Console.ReadLine());
                    Console.Write("Enter Number 2 : ");
                    var num2 = Convert.ToInt32(Console.ReadLine());

                    if (num1 != num2)
                    {
                        Console.Write("Enter Max or Min : ");
                        var maxmin = (Console.ReadLine()).ToLower();
                        if (maxmin == "max")
                            Console.WriteLine("Maximum is " + Math.Max(num1, num2));
                        else if (maxmin == "min")
                            Console.WriteLine("Minimum is " + Math.Min(num1, num2));
                        else
                            Console.Write("Please enter only Max or Min");
                    }

                    else if (num1 == num2)
                        Console.WriteLine("Both the numbers are same");

                    else
                        Console.WriteLine("Error");

                    Console.ReadLine(); //waits for enter button to be pressed to exit console
                    break;
                
                case 4:

                 
                        Console.WriteLine("--------------- Temperature State -------------------------");

                        Console.Write("Enter Temperature Degree C : ");
                        var temp = Convert.ToInt32(Console.ReadLine());


                        if (temp < 0)
                            Console.WriteLine("Freezing weather");
                        else if (temp > 0 && temp <= 10)
                            Console.WriteLine("Very Cold weather");
                        else if (temp > 10 && temp <= 20)
                            Console.WriteLine("Cold weather");
                        else if (temp > 20 && temp <= 30)
                            Console.WriteLine("Normal in Temp");
                        else if (temp > 30 && temp <= 40)
                            Console.WriteLine("Its Hot");
                        else if (temp >= 40)
                            Console.WriteLine("Its Very Hot");
                        else
                            Console.WriteLine("Enter Valid Temperature");

                    Console.ReadLine(); //waits for enter button to be pressed to exit console
                    break;

                case 5:

                    Console.WriteLine("--------------- Calculator -------------------------");

                    Console.Write("Enter Number 1 : ");
                    var no1 = Convert.ToInt32(Console.ReadLine());

                    Console.Write("Enter Number 2 : ");
                    var no2 = Convert.ToInt32(Console.ReadLine());


                    Console.Write("Enter Operator : ");
                    var operators = Console.ReadLine();


                    switch (operators)
                    {
                        case "+":
                            Console.WriteLine("Addition = " + (no1 + no2));
                            break;
                        case "-":
                            Console.WriteLine("Substraction = " + (no1 - no2));
                            break;
                        case "*":
                            Console.WriteLine("Multiplication = " + (no1 * no2));
                            break;
                        case "/":
                            Console.WriteLine("Division = " + (no1 / no2));
                            break;
                        case "%":
                            Console.WriteLine("Modulus = " + (no1 % no2));
                            break;
                        default:
                            Console.WriteLine("Please enter * - / + % only");
                            break;
                    }
                    Console.ReadLine(); //waits for enter button to be pressed to exit console
                    break;

                    default:
                    Console.WriteLine("Please Enter 1 to 5");
                    Console.ReadLine(); //waits for enter button to be pressed to exit console
                    break;

            }

        }

    }

 }

////Thread.Sleep(10000);  //To Pause the output for 10 seconds
