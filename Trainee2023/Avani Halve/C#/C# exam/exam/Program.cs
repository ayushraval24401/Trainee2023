using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Security.Cryptography;
using System.Security.Policy;
using System.Text;
using System.Text.RegularExpressions;
using System.Xml.Serialization;
using exam;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using static System.Net.WebRequestMethods;
using File = System.IO.File;
public enum selectDepartment
{
    Sales, Marketing, Developer, QA, HR, SEO
}
namespace exam
{
    public class Employee

    {
        //public string EmployeeID { get; set; }
        public string FirstName { get; set; }
        public string Gender { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string postCode { get; set; }
        public string DOJ { get; set; }
        public string department { get; set; }
        public string remark { get; set; }
        public string Email { get; set; }
        public string EncryptedPhone { get; set; }
        public string Designation { get; set; }
        public string DOB { get; set; }
        public string salary { get; set; }
        public int Id { get; set; }
        public string exiprence { get; set; }



    }

    public static class ValidationExtensions
    {

        public static bool IsValidEmail(this string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return false;
            }
            Regex regex = new Regex(@"^[^\s@]+@[^\s@]+\.(com|org|edu|info|in)$");
            return regex.IsMatch(email);
        }

        public static bool IsValidPhone(this string phone)
        {
            return phone.Length == 10 && int.TryParse(phone, out int _);
        }

        public static bool IsValidpostCode(this string postcode)
        {
            return postcode.Length == 6;
        }
        public static bool IsValidName(this string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return false;
            }
            Regex regex = new Regex(@"^[a-zA-Z\s-]+$");
            return regex.IsMatch(name);
        }

        public static bool IsNumber(this string salary)
        {
            return int.TryParse(salary, out int _);
        }

        public static bool IsValidSalary(this string salary)
        {
            if (int.TryParse(salary, out int parsedSalary))
            {
                if (parsedSalary >= 5000)
                {
                    return true;
                }
                else
                {
                    Console.WriteLine("Invalid Salary! Salary must be greater than or equal to 5000.");
                    return false;
                }
            }
            else
            {
                Console.WriteLine("Invalid Salary! Please enter a valid numeric value.");
                return false;
            }
        }

        public static bool IsId(this int id)
        {
            return true;
        }

        public static bool IsValidGender(this string gender)
        {
            return !string.IsNullOrEmpty(gender) && (gender.ToLower() == "m" || gender.ToLower() == "f");
        }
        public static string employeesFile = "D:\\avani_html\\C# exam\\employeeDetailFile.json";
        private static string department;

        public static void Main(string[] args)
        {
            options();
        }

        public static void options()
        {

            Dictionary<int, Employee> employees = new Dictionary<int, Employee>();
            if (File.Exists(employeesFile))
            {
                string json = File.ReadAllText(employeesFile);
                List<Employee> employeesList = JsonConvert.DeserializeObject<List<Employee>>(json);
                employees = employeesList.ToDictionary(e => e.Id, e => e);
            }

            while (true)
            {
                Console.WriteLine("Enter option number:");
                Console.WriteLine("1. Add new Employee");
                Console.WriteLine("2. Delete Employee");
                Console.WriteLine("3. Exit");

                if (!int.TryParse(Console.ReadLine(), out int option))
                {
                    Console.WriteLine("Invalid option!");
                    continue;
                }

                switch (option)
                {
                    case 1:
                        AddEmployee(employees);
                        break;
                    case 2:
                        DeleteEmployee(employees);
                        break;
                    case 3:
                        options();
                        return;
                    default:
                        Console.WriteLine("Invalid option!");
                        break;
                }
            }
        }
        public static void AddEmployee(Dictionary<int, Employee> employees)
        {

            Console.WriteLine("--- Enter employee details ---");

            Console.WriteLine("Enter Employee ID (In numbers only)");
            int EmployeeID = Convert.ToInt32(Console.ReadLine());
            if (employees.ContainsKey(EmployeeID))
            {
                Console.WriteLine("Employee with this ID already exists.");
                options();
                return;
            }

            Console.WriteLine("Enter First Name: ");
            string firstName = Console.ReadLine();
            while (!firstName.IsValidName())
            {
                Console.WriteLine("Invalid First Name! Please enter a valid First Name: ");
                firstName = Console.ReadLine();
            }

            Console.WriteLine("Enter Date of Birth (MM/DD/YYYY)");
            string DOB = Console.ReadLine();
            DateTime d;
            while (!DateTime.TryParseExact(DOB, "MM/dd/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out d))
            {
                Console.WriteLine("Invalid Date of Birth! Enter Correct Date of Birth (MM/DD/YYYY)");
                DOB = Console.ReadLine();
            }


            Console.WriteLine("Enter Gender (m/f): ");
            string gender = Console.ReadLine();
            while (!gender.IsValidGender())
            {
                Console.WriteLine("Invalid Gender! Please enter valid Gender: ");
                gender = Console.ReadLine();
            }


            Console.WriteLine("Enter Designation: ");
            string designationString = Console.ReadLine();
            while (!designationString.IsValidName())
            {
                Console.WriteLine("Invalid Designation! Please enter valid Designation: ");
                designationString = Console.ReadLine();
            }

            Console.WriteLine("Enter City: ");
            string city = Console.ReadLine();
            while (!city.IsValidName())
            {
                Console.WriteLine("Invalid City! Please enter valid City Name: ");
                city = Console.ReadLine();
            }

            Console.WriteLine("Enter State: ");
            string state = Console.ReadLine();
            while (!state.IsValidName())
            {
                Console.WriteLine("Invalid State! Please enter valid State Name: ");
                state = Console.ReadLine();
            }

            Console.WriteLine("Enter PostCode: ");
            string postCode = Console.ReadLine();
            while (!postCode.IsValidpostCode())
            {
                Console.WriteLine("Invalid PostCode! Please enter valid PostCode Name: ");
                postCode = Console.ReadLine();
            }
            Console.WriteLine("Enter Phone Number: ");
            string phone = Console.ReadLine();
            while (!phone.IsValidPhone())
            {
                Console.WriteLine("Invalid Phone Number! Please enter valid phone number: ");
                phone = Console.ReadLine();
            }

            Console.WriteLine("Enter Email: ");
            string email = Console.ReadLine();
            if (email.IsValidEmail())
            {
                Console.WriteLine("Valid Email: " + email);
            }
            else
            {
                Console.WriteLine("Invalid Email! Please enter a valid email address.");
                email = Console.ReadLine();
            }

            Console.WriteLine("Enter Date of Joining (MM/DD/YYYY)");
            string DOJ = Console.ReadLine();
            DateTime doj;
            while (!DateTime.TryParseExact(DOJ, "MM/dd/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out doj) || doj <= d)
            {
                if (doj <= d)
                {
                    Console.WriteLine("Date of Joining must be greater than Date of Birth! Enter Correct Date of Joining (MM/DD/YYYY)");
                }
                else
                {
                    Console.WriteLine("Invalid Date of Joining! Enter Correct Date of Joining (MM/DD/YYYY)");
                }
                DOJ = Console.ReadLine();
            }

            DateTime currentDate = DateTime.Now;
            TimeSpan timeSpan = currentDate - doj;
            int years = timeSpan.Days / 365;
            int months = (timeSpan.Days % 365) / 30;
            int days = (timeSpan.Days % 365) % 30;
            var date = $"{years} years, {months} months, {days} days";
            Console.WriteLine("Experience: " + date);

            Console.WriteLine("Enter Remark: ");
            string remark = Console.ReadLine();
            while (!remark.IsValidName())
            {
                Console.WriteLine("Invalid remark! Please enter valid remark: ");
                remark = Console.ReadLine();
            }

            string selectedDepartment;
            bool validDepartment = false;

            Console.WriteLine("Choose Department - \n1. Sales\n2. Marketing\n3. QA\n4. Developer\n5. HR\n6. SEO");
            selectedDepartment = Console.ReadLine();

            switch (selectedDepartment)
            {
                case "1":
                    department = selectDepartment.Sales.ToString();
                    Console.WriteLine("Selected option - " + department);
                    validDepartment = true;
                    break;
                case "2":
                    department = selectDepartment.Marketing.ToString();
                    Console.WriteLine("Selected option - " + department);
                    validDepartment = true;
                    break;
                case "3":
                    department = selectDepartment.QA.ToString();
                    Console.WriteLine("Selected option - " + department);
                    validDepartment = true;
                    break;
                case "4":
                    department = selectDepartment.Developer.ToString();
                    Console.WriteLine("Selected option - " + department);
                    validDepartment = true;
                    break;
                case "5":
                    department = selectDepartment.HR.ToString();
                    Console.WriteLine("Selected option - " + department);
                    validDepartment = true;
                    break;
                case "6":
                    department = selectDepartment.SEO.ToString();
                    Console.WriteLine("Selected option - " + department);
                    validDepartment = true;
                    break;
                default:
                    Console.WriteLine("Invalid input. Please choose between 1 - 6");
                    break;
            }
            while (!validDepartment) ;

            Console.WriteLine("Enter Monthly Salary: ");
            string salary = Console.ReadLine();
            while (!salary.IsValidSalary())
            {
                Console.WriteLine("Invalid Salary! Please enter valid Salary: ");
                salary = Console.ReadLine();
            }


            var newEmployee = new Employee()
            {
                Id = EmployeeID,
                FirstName = firstName,
                DOB = DOB,
                Gender = gender,
                Designation = designationString,
                city = city,
                state = state,
                postCode = postCode,
                Email = email,
                EncryptedPhone = phone,
                DOJ = DOJ,
                exiprence = date,
                remark = remark,
                department = department,
                salary = salary,
            };
            employees.Add(newEmployee.Id, newEmployee);

            List<Employee> sortedEmployees = employees.Values.OrderByDescending(e => Convert.ToDouble(e.salary, new CultureInfo("en-US"))).ToList();

            string json = JsonConvert.SerializeObject(sortedEmployees, Formatting.Indented);
            File.WriteAllText(employeesFile, json);
            Console.WriteLine("Data Added Successfully!");
            options();
        }


        public static void DeleteEmployee(Dictionary<int, Employee> employees)
        {
            var json = File.ReadAllText(employeesFile);

            var jArray = JArray.Parse(json);
            bool employeeFound = false;

            Console.WriteLine("Employee data from JSON file:");
            foreach (var jObject in jArray)
            {
                Console.WriteLine("ID: " + jObject["Id"].ToString());
                Console.WriteLine("Name: " + jObject["FirstName"].ToString());
                Console.WriteLine("DOB: " + jObject["DOB"].ToString());
                Console.WriteLine("Designation: " + jObject["Designation"].ToString());
                Console.WriteLine("City: " + jObject["city"].ToString());
                Console.WriteLine("Email: " + jObject["Email"].ToString());
                Console.WriteLine("----------------------------");
            }

            Console.Write("Enter the ID of the employee to delete: ");
            int idToDelete = Convert.ToInt32(Console.ReadLine());

            for (int i = 0; i < jArray.Count; i++)
            {
                var jObject = (JObject)jArray[i];
                int id = jObject["Id"].Value<int>();

                if (id == idToDelete)
                {
                    jArray.RemoveAt(i);
                    employeeFound = true;
                    break;
                }
            }

            if (employeeFound)
            {
                File.WriteAllText(employeesFile, jArray.ToString());
                Console.WriteLine("Employee data deleted successfully.");
            }
            else
            {
                Console.WriteLine("Employee with ID " + idToDelete + " not found.");
            }
        }
    }
}