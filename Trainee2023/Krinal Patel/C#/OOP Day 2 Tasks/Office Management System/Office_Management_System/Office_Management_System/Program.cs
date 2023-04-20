using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using static Office_Management_System.Program;

namespace Office_Management_System
{
    internal class Program
    {
        static List<Employee> employees = new List<Employee>();

        static void Main(string[] args)
        {
            while (true)
            {
                Console.WriteLine("\n-------------- Office Management System ---------------");
                Console.WriteLine("1. Add Employee");
                Console.WriteLine("2. Display All Employees");
                Console.WriteLine("0. Exit");
                Console.Write("Please Enter your choice : ");
                int choice = Convert.ToInt32(Console.ReadLine());

                switch (choice)
                {
                    case 1:
                        AddEmployee();
                        break;
                    case 2:
                        DisplayAllEmployees();
                        break;
                    case 0:
                        Environment.Exit(0);
                        break;
                    default:
                        Console.WriteLine("Invalid choice! Please try again.");
                        break;
                }
            }
        }

        public enum EmployeeDesignation
        {
            Developer,
            QA,
            HR,
            BD,
            PM
        }

        public abstract class Person
        {
            public string Name { get; set; }
            public string Gender { get; set; }
            public string Email { get; set; }
            public long PhoneNumber { get; set; }
        }

        public class Employee : Person
        {
            public EmployeeDesignation Designation { get; set; }
            public double Salary { get; set; }
        }

        static void AddEmployee()
        {
            // Prompt user for employee details and add a new employee object to the list
            Console.Write("Name: ");
            string name = Console.ReadLine();

            Console.Write("Gender: ");
            string gender = Console.ReadLine();

            Console.Write("Email: ");
            string email = Console.ReadLine();

            Console.Write("Phone Number: ");
            long phoneNumber = Convert.ToInt64(Console.ReadLine());

            Console.Write("Designation (0-4): ");
            EmployeeDesignation designation = (EmployeeDesignation)Convert.ToInt32(Console.ReadLine());

            Console.Write("Salary: ");
            double salary = Convert.ToDouble(Console.ReadLine());

            Employee emp = new Employee()
            {
                Name = name,
                Gender = gender,
                Email = email,
                PhoneNumber = phoneNumber,
                Designation = designation,
                Salary = salary
            };

            employees.Add(emp);
            Console.WriteLine("Employee added successfully!");
        }

        static void DisplayAllEmployees()
        {
            // Display all employees in the list
            Console.WriteLine("\nList of all Employees:");
            foreach (Employee emp in employees)
            {
                Console.WriteLine("Name: {0}, Gender: {1}, Email: {2}, Phone Number: {3}, Designation: {4}, Salary: {5}",
                    emp.Name, emp.Gender, emp.Email, emp.PhoneNumber, emp.Designation, emp.Salary);
            }
        }
    }
}
