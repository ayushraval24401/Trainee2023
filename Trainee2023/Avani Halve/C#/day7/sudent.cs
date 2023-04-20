using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace day7
{
    public static class Globals
    {
        public static int count = 1;
    }

    public class sudent
    { 
        public void Student()
        {
            List<string> students = new List<string>();
            Console.WriteLine("--- Student Admission Starts ---");
            InputName(students);

            Console.WriteLine("\nSome students are leaving the college");
            DeleteStudent(students);

            Console.WriteLine("\nSome students are getting awards for best students");
            PrintAwards(students);
        }

        static void InputName(List<string> students)
        {
            while (true)
            {
                Console.WriteLine("-- Enter name --");
                string name = Console.ReadLine();
                students.Add(name);
                Console.WriteLine("Want to enter more (y/n)");
                string choice = Console.ReadLine();
                if (choice == "y" || choice == "Y")
                {
                    Console.WriteLine("\nAdmission is completed");
                    Console.WriteLine("Total Number of Students: " + students.Count);
                    break;
                }
            }
        }
      
        static void DeleteStudent(List<string> students)
        {
            while (true)
            {
                Console.WriteLine("-- Enter the name of the student to be removed --");
                string name = Console.ReadLine();
                if (students.Remove(name))
                {
                    Console.WriteLine(name + " is removed from the college");
                }
                else
                {
                    Console.WriteLine("Sorry, " + name + " is not found in the college");
                }
                Console.WriteLine("Want to remove more (y/n)");
                string choice = Console.ReadLine();
                if (choice == "y" || choice == "Y")
                {
                    break;
                }
            }
            Console.WriteLine("Total Number of Students: " + students.Count);
        }
        static void PrintAwards(List<string> students)
        {
              Console.WriteLine("-- Best Students --");
                foreach (string student in students)
                {
                    Console.WriteLine(student);
                }

        }

    }
}
