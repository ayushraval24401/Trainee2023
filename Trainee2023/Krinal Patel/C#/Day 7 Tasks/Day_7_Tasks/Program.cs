using System;
using System.Collections.Generic;


namespace Day_7_Tasks
{
    internal class Program
    {

        static List<string> GroupBySeries(List<int> elements)
        {
            List<string>Series = new List<string>();
           
            for (int i = 0; i < elements.Count; i++)
            {
                int first = elements[i];
                int last = first;

                while (i < elements.Count - 1 && elements[i + 1] == last + 1)
                {   
                    last = elements[i + 1];
                    i++;
                }
                if (first == last)
                {
                    Series.Add(first.ToString());
                }
                else
                {
                    Series.Add(first + "-" + last);
                }
            }

            return Series;
        }

        static void Main(string[] args)
        {
            do
            {
                Console.WriteLine("\n------------------------- MENU ---------------------------\n");

                Console.WriteLine("1. Create a new list from a given list of integers where each integer value is added to 2 and the result value is multiplied by 5");
                Console.WriteLine("2. Create List that can be expressed as a series of groups and individual numbers");
                Console.WriteLine("3. Admission Portal \r\n");

                Console.WriteLine("0. Exit");

                Console.WriteLine("\n--------------------------------------------------------\n");
                Console.Write("Enter Your Choice : ");

                var task = Convert.ToInt32(Console.ReadLine());

                switch (task)
                {
                    case 1:

                        try
                        {
                            List<int> ExistingList = new List<int>();

                            Console.Write("Enter the number of elements you want in List : ");
                            var elementno = Convert.ToInt32(Console.ReadLine());
                            for (int i = 1; i <= elementno; i++)
                            {
                                Console.Write("Enter Element {0} : ", i);
                                var ExistingElement = Convert.ToInt32(Console.ReadLine());
                                ExistingList.Add(ExistingElement);
                            }

                            List<int> NewList = new List<int>();

                            foreach (int i in ExistingList)
                            {
                                int NewListData = (i + 2) * 5;
                                NewList.Add(NewListData);
                            }

                            Console.WriteLine("Existing List : " + string.Join(" , ", ExistingList));
                            Console.WriteLine("New list : " + string.Join(" , ", NewList));
                        }
                        catch (Exception)
                        {
                            Console.WriteLine("Something Went Wrong ! Please Restart the menu by pressing Enter..");
                        }

                        Console.ReadLine(); //waits for enter button to be pressed to exit console

                        break;

                    case 2:

                        try
                        {
                            List<int> ExistingList = new List<int>();

                            Console.Write("Enter the number of elements you want in List : ");
                            var elementno = Convert.ToInt32(Console.ReadLine());
                            for (int i = 1; i <= elementno; i++)
                            {
                                Console.Write("Enter Element {0} : ", i);
                                var ExistingElement = Convert.ToInt32(Console.ReadLine());
                                ExistingList.Add(ExistingElement);
                            }

                            // List<int> ExistingList = new List<int> { 1, 2, 3, 4, 5, 10, 1, 2, 8, 7, 6, 7, 8, 2, 3, 12 };      //Creating a List that we want to Group by series 

                            ExistingList.Sort();
                            
                            List<string> SeriesList = GroupBySeries(ExistingList);  //Creating a new list of strings called SeriesList and assigns the value returned by the GroupBySeries method to it.

                            Console.WriteLine(string.Join(", ", SeriesList));

                        }

                        catch (Exception)
                        {
                            Console.Write("Something Went Wrong ! Please Restart the menu by pressing Enter..");
                        }

                        Console.ReadLine(); //waits for enter button to be pressed to exit console

                        break;


                    case 3:


    
                Dictionary<int, string> sl = new Dictionary<int, string>();

                bool exitProgram = false;

                        while (!exitProgram)
                        {
                            Console.WriteLine("Please select an option:");
                            Console.WriteLine("1. Add a student");
                            Console.WriteLine("2. Remove a student");
                            Console.WriteLine("3. Select the best performer");
                            Console.WriteLine("4. Exit");

                            string option = Console.ReadLine();

                            switch (option)
                            {
                                case "1":
                                    Console.Write("\nEnter the number of Students who have confirmed their Admission : ");
                                    var elementnos = Convert.ToInt32(Console.ReadLine());
                                    for (int i = 1; i <= elementnos; i++)
                                    {
                                        Console.Write("\nId of Student {0} : {1} ", i, i);

                                        Console.Write("\nEnter Name of Student {0} : ", i);
                                        var sname = Convert.ToString(Console.ReadLine());

                                        Console.Write("Enter City of Student {0} : ", i);
                                        var city = Convert.ToString(Console.ReadLine());

                                        Console.Write("Enter Contact number of Student {0} : ", i);
                                        var contact = Convert.ToString(Console.ReadLine());

                                        Console.Write("Enter HSC Percentage of Student {0} : ", i);
                                        var HscPercentage = Convert.ToString(Console.ReadLine());

                                        sl.Add(i, $"{"\nName : " + sname} {"\nCity : " + city} {"\nContact : " + contact} {"\nHsc Percentage : " + HscPercentage}");
                                    }

                                    foreach (KeyValuePair<int, string> s in sl)
                                    {
                                        Console.WriteLine(s.Key + ": " + s.Value);
                                        Console.WriteLine("\n");
                                    }

                                    Console.WriteLine("Admission is done. Total number of students: " + sl.Count);
                                    break;

                                case "2":
                                    Console.Write("\nEnter the roll number of the student you want to remove: ");
                                    int rollNoToRemove = Convert.ToInt32(Console.ReadLine());

                                    if (sl.ContainsKey(rollNoToRemove))
                                    {
                                        sl.Remove(rollNoToRemove);
                                        Console.WriteLine("\nStudent with roll number {0} has been removed.", rollNoToRemove);
                                    }
                                    else
                                    {
                                        Console.WriteLine("\nStudent with roll number {0} does not exist in the list.", rollNoToRemove);
                                    }

                                    Console.WriteLine("\nList of remaining students:");
                                    foreach (KeyValuePair<int, string> student in sl)
                                    {   
                                        Console.WriteLine(student.Key + ": " + student.Value);
                                    }

                                    break;

                                case "3":
                                    Console.Write("\nEnter the ID of the student who is best performer : ");
                                    int selectedId = int.Parse(Console.ReadLine());

                                    Console.WriteLine("\nBest student award is awarded to :");
                                    foreach (KeyValuePair<int, string> student in sl)
                                    {
                                        if (student.Key == selectedId)
                                        {
                                            Console.WriteLine(student.Key + ": " + student.Value);
                                            break;
                                        }
                                    }

                                    break;

                                case "4":
                                    exitProgram = true;
                                    Console.WriteLine("Exiting the program...");
                                    break;

                                default:
                                    Console.WriteLine("Invalid option. Please try again.");
                                    break;
                            }

                            Console.WriteLine("\nPress any key to continue...");
                            Console.ReadKey();
                            Console.Clear();
                        }
               
                        break;


                    case 0:
                        Environment.Exit(1);// exit

                        break;

                    default:
                        Console.WriteLine("Please Enter 1 to 10");
                        Console.ReadLine(); //waits for enter button to be pressed to exit console
                        break;

                }

            }
            while (true);
        }
    }
}
