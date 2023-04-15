using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using static EmployeeRecord.Program;

namespace EmployeeRecord
{

    public static class MyExtensions
    {
        public static bool IsValidEmail(this string email)
        {
            if (string.IsNullOrEmpty(email))
                return false;

            // Define a regular expression pattern for email validation
            string pattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";

            // Create a regular expression object and match the email address
            var regex = new Regex(pattern);
            var match = regex.Match(email);

            return match.Success;
        }


        public static bool IsValidPhoneNumber(this long number)
        {
            return number.ToString().Length <= 10;
        }

        public static bool IsValidSalary(this double salary)
        {
            return salary >= 10000 && salary <= 50000;
        }

        public static bool IsValidDesignation(this string designation)
        {
            return Enum.GetNames(typeof(EmployeeDesignation)).Contains(designation);
        }
    }
    public class Program
    {

    

        static List<Employee> employees = new List<Employee>();

        static void Main(string[] args)
        {
            while (true)

            {
                Console.WriteLine("\n-------------- Employee Management System ---------------");
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
                        Environment.Exit(0);// exit
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
    QA
}

public class Employee
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Gender { get; set; }
    public string Email { get; set; }
    public long PhoneNumber { get; set; }
    public Program.EmployeeDesignation Designation { get; set; }
    public double Salary { get; set; }
}


        static void AddEmployee()
        {


            try
            {
                Employee emp = new Employee();
                //employees

                Console.Write("First Name (Required): ");
                emp.FirstName = Console.ReadLine().Trim();
                if (string.IsNullOrEmpty(emp.FirstName))
                {
                    Console.WriteLine("First Name is Required!");
                    Console.ReadKey();

                    return;
                }

                Console.Write("Last Name (Required): ");
                emp.LastName = Console.ReadLine().Trim();
                if (string.IsNullOrEmpty(emp.LastName))
                {
                    Console.WriteLine("Last Name is Required!");
                    Console.ReadKey();

                    return;
                }

                Console.Write("Gender (Required): ");
                emp.Gender = Console.ReadLine().Trim();
                if (string.IsNullOrEmpty(emp.Gender))
                {
                    Console.WriteLine("Gender is Required!");
                    Console.ReadKey();
                    return;
                }

                Console.Write("Email Address (Required, Must be Valid): ");
                emp.Email = Console.ReadLine().Trim();
                if (string.IsNullOrEmpty(emp.Email) || !emp.Email.IsValidEmail())
                {
                    Console.WriteLine("Invalid Email Address!");
                    Console.ReadKey();
                    return;
                }

                Console.Write("Phone Number (Required, only int, Range Max 10 numbers): ");
                long phoneNumber;
                if (!long.TryParse(Console.ReadLine().Trim(), out phoneNumber) || !phoneNumber.IsValidPhoneNumber())
                {
                    Console.WriteLine("Invalid Phone Number!");
                    Console.ReadKey();

                    return;
                }
                emp.PhoneNumber = phoneNumber;

                Console.Write("Designation (Required, Should be from Enum, Developer, QA): ");
                string designationStr = Console.ReadLine().Trim();
                if (string.IsNullOrEmpty(designationStr) || !Enum.TryParse(designationStr, out EmployeeDesignation desig))
                {
                    Console.WriteLine("Designation is Required and Should be from Enum, Developer, QA!");
                    Console.ReadKey();

                    return;
                }
                emp.Designation = desig;

                Console.Write("Salary (Required, Min 10,000 & Max 50,000): ");
                double salary;
                if (!double.TryParse(Console.ReadLine().Trim(), out salary) || !salary.IsValidSalary())
                {
                    Console.WriteLine("Invalid Salary!");
                    Console.ReadKey();

                    return;
                }
                emp.Salary = salary;

                Console.WriteLine("All Fields are Validated..");

                employees.Add(emp);

                SaveEmployeesToJson();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        static void DisplayAllEmployees()
        {
            if (employees.Count == 0)
            {
                Console.WriteLine("No employees added yet.");
                return;
            }

            foreach (Employee emp in employees)
            {
                Console.WriteLine($"Name: {emp.FirstName} {emp.LastName}");
                Console.WriteLine($"Gender: {emp.Gender}");
                Console.WriteLine($"Email: {emp.Email}");
                Console.WriteLine($"Phone Number: {emp.PhoneNumber}");
                Console.WriteLine($"Designation: {emp.Designation}");
                Console.WriteLine($"Salary: {emp.Salary}");
                Console.WriteLine("--------------------------");
            }
        }
        static void SaveEmployeesToJson()
        {
            string fileName = @"D:\C# Krinal Patel\Day 8 Tasks\Files\KPJSON1.json";
            string json = JsonConvert.SerializeObject(employees, Formatting.Indented);

            File.AppendAllText(fileName, json);
            Console.WriteLine("Employee data saved to KPJSON1.JSON file.");
        }      
    }

}
