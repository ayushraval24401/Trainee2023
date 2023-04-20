using System;
using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;
using AutoMapper;
using System.Xml.Serialization;


namespace EmployeeRecord
{
    public enum Designation
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
        public int Phone { get; set; }
        public Designation Designation { get; set; }
        public int Salary { get; set; }
    }

    public static class ValidationExtensions
    {
        public static bool IsValidEmail(this string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }

        public static bool IsValidPhone(this int phone)
        {
            return phone.ToString().Length == 10;
        }

        public static bool IsValidSalary(this int salary)
        {
            return salary >= 10000 && salary <= 50000;
        }
    }

    class Program
    {
        static string nameFile = "D:\\avani_html\\C#\\day5\\employeeXMLFile.json";
        static string fileName = "D:\\avani_html\\C#\\day5\\employeeDetails.json";
        public void Main(string[] args)
        {
            List<Employee> employees = new List<Employee>();

            // Create employee record
            Console.WriteLine("Enter employee details:");
            Console.Write("First Name: ");
            string firstName = Console.ReadLine();

            Console.Write("Last Name: ");
            string lastName = Console.ReadLine();

            Console.Write("Gender: ");
            string gender = Console.ReadLine();

            Console.Write("Email: ");
            string email = Console.ReadLine();
            while (!email.IsValidEmail())
            {
                Console.Write("Invalid Email! Please enter valid email: ");
                email = Console.ReadLine();
            }

            Console.Write("Phone: ");
            int phone;
            while (!int.TryParse(Console.ReadLine(), out phone) || !phone.IsValidPhone())
            {
                Console.Write("Invalid Phone! Please enter valid phone (10 digit): ");
            }

            Console.Write("Designation (Developer, QA): ");
            Designation designation;
            while (!Enum.TryParse(Console.ReadLine(), out designation))
            {
                Console.Write("Invalid Designation! Please enter valid designation (Developer, QA): ");
            }

            Console.Write("Salary: ");
            int salary;
            while (!int.TryParse(Console.ReadLine(), out salary) || !salary.IsValidSalary())
            {
                Console.Write("Invalid Salary! Please enter valid salary (10,000 to 50,000): ");
            }

            Employee newEmployee = new Employee
            {
                FirstName = firstName,
                LastName = lastName,
                Gender = gender,
                Email = email,
                Phone = phone,
                Designation = designation,
                Salary = salary
            };

           
            employees.Add(newEmployee);

            var serializer = new XmlSerializer(typeof(Employee));
            using (var writer = new StreamWriter(nameFile))
            { serializer.Serialize(writer, employees); }

            string json = JsonConvert.SerializeObject(employees);
            File.WriteAllText(fileName, json);

            Console.WriteLine("\nAll Employees:");
            foreach (var emp in employees)
            {
                Console.WriteLine($"Name: {emp.FirstName} {emp.LastName}");
                Console.WriteLine($"Gender: {emp.Gender}");
                Console.WriteLine($"Email: {emp.Email}");
                Console.WriteLine($"Phone: {emp.Phone}");
                Console.WriteLine($"Designation: {emp.Designation}");
                Console.WriteLine($"Salary: {emp.Salary}");
                Console.WriteLine();
            }
        }
    }
}
