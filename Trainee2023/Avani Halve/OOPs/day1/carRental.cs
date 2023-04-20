using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace day1
{
    public class carRental
    {
        private double hoursPrice;
        private double daysPrice;
        public void Price()
        {
            Console.WriteLine("------------- Here is the Price Options -------------");
            Console.WriteLine("Enter your Choice: \n1.On hourly. \n2. On Days");
            int choice = Convert.ToInt32(Console.ReadLine());
            switch (choice)
            {
                case 1:
                    {
                        Console.WriteLine("For how much hours:");
                        double hours = Convert.ToDouble(Console.ReadLine());
                        hoursPrice = hours * 50;
                        Console.WriteLine("Your total cost is: " + hoursPrice);
                        break;
                    }
                case 2:
                    {
                        Console.WriteLine("For how many days:");
                        double days = Convert.ToDouble(Console.ReadLine());
                        daysPrice = days * 500;
                        Console.WriteLine("Your total cost is: " + daysPrice);
                        break;
                    }
                default:
                    {
                        Console.WriteLine("Wrong Choice!");
                        break;
                    }
            }

        }

        public void CarOptions()
        {
            Dictionary<int, string> carList = new Dictionary<int, string>();
            Console.WriteLine("----------- Here are the Options Pick anyOne Rates are same ---------");
            carList.Add(1, "Audi");
            carList.Add(2, "Jaguar");
            carList.Add(3, "BMW");
            carList.Add(4, "Hyundai");
            carList.Add(5, "Maruti");
            carList.Add(6, "Aulto");
            foreach (KeyValuePair<int, string> car in carList)
            {
                Console.WriteLine($"{car.Key}. {car.Value}"); 
            }
            Console.WriteLine("-------------------------------------");
            Console.WriteLine("You want Price Options (y/n)");
            string choice = Console.ReadLine();
            if(choice == "y" || choice == "Y")
            {
                Price();
            }
            else
            {
                Console.WriteLine("Thank You for Visit");
            }
        }
    }
}
