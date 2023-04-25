using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Xml.Serialization;
using EmployeeRecord;
using Newtonsoft.Json;

namespace EmployeeManagement
{
    public enum Designation
    {
        Developer,
        QA
    }

    [Serializable]
    public class Employee
    {
        
        public int EmployeeID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string EncryptedPhone { get; set; }
        public Designation Designation { get; set; }
        public int Salary { get; set; }
        public int Id { get; internal set; }

        public void SetPhone(string phone)
        {
            byte[] data = Encoding.UTF8.GetBytes(phone);
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] hash = sha256.ComputeHash(data);
                EncryptedPhone = Convert.ToBase64String(hash);
            }
        }

        public string GetPhone()
        {
            byte[] data = Convert.FromBase64String(EncryptedPhone);
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] hash = sha256.ComputeHash(data);
                return Encoding.UTF8.GetString(hash);
            }
        }
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

        public static bool IsValidPhone(this string phone)
        {
            return phone.Length == 10 && int.TryParse(phone, out int _);
        }

        public static bool IsValidSalary(this int salary)
        {
            return salary >= 10000 && salary <= 50000;
        }

        public static bool IsValidName(this string name)
        {
            return !string.IsNullOrEmpty(name) && !string.IsNullOrWhiteSpace(name);
        }

        public static bool IsValidGender(this string gender)
        {
            return !string.IsNullOrEmpty(gender) && (gender.ToLower() == "male" || gender.ToLower() == "female");
        }
    }

    internal class Program
    {
        private static string employeesFile = "D:\\avani_html\\C#\\day8\\employeeXMLFile.xml";

        private static void Main(string[] args)
        {
            Dictionary<int, Employee> employees = LoadEmployees();

            while (true)
            {
                Console.WriteLine("Enter option number:");
                Console.WriteLine("1. Add employee");
                Console.WriteLine("2. Get employee detail by employee ID");
                Console.WriteLine("3. Delete employee by employee ID");
                Console.WriteLine("4. Exit");

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
                        GetEmployeeDetail(employees);
                        break;
                    case 3:
                        DeleteEmployee(employees);
                        break;
                    case 4:
                        SaveEmployees(employees);
                        return;
                    default:
                        Console.WriteLine("Invalid option!");
                        break;
                }
            }
        }
        private static void AddEmployee(Dictionary<int, Employee> employees)
        {
            Console.WriteLine("--- Enter employee details ---");

            Console.WriteLine("Enter First Name: ");
            string firstName = Console.ReadLine();
            while (!firstName.IsValidName())
            {
                Console.WriteLine("Invalid First Name! Please enter valid First Name: ");
                firstName = Console.ReadLine();
            }

            Console.WriteLine("Enter Last Name: ");
            string lastName = Console.ReadLine();
            while (!lastName.IsValidName())
            {
                Console.WriteLine("Invalid Last Name! Please enter valid Last Name: ");
                firstName = Console.ReadLine();
            }

            Console.WriteLine("Enter Gender (male/female): ");
            string gender = Console.ReadLine();
            while (!gender.IsValidGender())
            {
                Console.WriteLine("Invalid Gender! Please enter valid Gender: ");
                gender = Console.ReadLine();
            }

            Console.WriteLine("Enter Email: ");
            string email = Console.ReadLine();
            while (!email.IsValidEmail())
            {
                Console.WriteLine("Invalid Email! Please enter valid email: ");
                email = Console.ReadLine();
            }

            Console.WriteLine("Enter Phone Number: ");
            string phone = Console.ReadLine();
            while (!phone.IsValidPhone())
            {
                Console.WriteLine("Invalid Phone Number! Please enter valid phone number: ");
                phone = Console.ReadLine();
            }
            Console.WriteLine("Enter Designation (Developer/QA): ");
            string designationString = Console.ReadLine();
            while (!Enum.TryParse<Designation>(designationString, out var designation))
            {
                Console.WriteLine("Invalid Designation! Please enter valid Designation: ");
                designationString = Console.ReadLine();
            }

            Console.WriteLine("Enter Salary (between 10000-50000): ");
            string salaryString = Console.ReadLine();
            while (!int.TryParse(salaryString, out var salary) || !salary.IsValidSalary())
            {
                Console.WriteLine("Invalid Salary! Please enter valid Salary: ");
                salaryString = Console.ReadLine();
            }

            var encryptedPhone = Encrypt(phone);

            var newEmployee = new Employee()
            {
                Id = employees.Count + 1,
                FirstName = firstName,
                LastName = lastName,
                Gender = gender,
                Email = email,
                EncryptedPhone = encryptedPhone,
                Designation = designation,
                Salary = int.Parse(salaryString)
            };

            employees.Add(newEmployee.Id, newEmployee);

            Console.WriteLine("Employee added successfully!");

            SaveEmployees(employees);
        }

        private static void GetEmployeeDetail(Dictionary<int, Employee> employees)
        {
            Console.WriteLine("Enter Employee ID: ");
            string idString = Console.ReadLine();

            if (!int.TryParse(idString, out int id))
            {
                Console.WriteLine("Invalid Employee ID!");
                return;
            }

            if (!employees.ContainsKey(id))
            {
                Console.WriteLine("Employee not found!");
                return;
            }

            var employee = employees[id];

            Console.WriteLine("Employee ID: " + employee.Id);
            Console.WriteLine("Name: " + employee.FirstName + " " + employee.LastName);
            Console.WriteLine("Gender: " + employee.Gender);
            Console.WriteLine("Email: " + employee.Email);
            Console.WriteLine("Phone: " + Decrypt(employee.EncryptedPhone));
            Console.WriteLine("Designation: " + employee.Designation);
            Console.WriteLine("Salary: " + employee.Salary);
        }

        private static string Decrypt(string encryptedPhone)
        {
            throw new NotImplementedException();
        }

        private static void DeleteEmployee(Dictionary<int, Employee> employees)
        {
            Console.WriteLine("Enter Employee ID: ");
            string idString = Console.ReadLine();
            while (!int.TryParse(idString, out var id) || !employees.ContainsKey(id))
            {
                Console.WriteLine("Invalid Employee ID! Please enter valid Employee ID: ");
                idString = Console.ReadLine();
            }

            employees.Remove(id);

            Console.WriteLine("Employee deleted successfully!");

            SaveEmployees(employees);
        }

        private static void SaveEmployees(Dictionary<int, Employee> employees)
        {
            using (StreamWriter sw = new StreamWriter(employeesFile))
            {
                string json = JsonConvert.SerializeObject(employees.Values, Formatting.Indented);
                sw.Write(json);
            }

            XmlSerializer serializer = new XmlSerializer(typeof(List<Employee>));
            using (FileStream fs = new FileStream(employeesFile, FileMode.Create))
            {
                serializer.Serialize(fs, employees.Values.ToList());
            }
        }

        private static Dictionary<int, Employee> LoadEmployees()
        {
            Dictionary<int, Employee> employees = new Dictionary<int, Employee>();

            if (File.Exists(employeesFile))
            {
                string json = File.ReadAllText(employeesFile);
                employees = JsonConvert.DeserializeObject<Dictionary<int, Employee>>(json);
            }

            return employees;
        }

        private static string Encrypt(string plainText)
        {
            byte[] plainTextBytes = Encoding.UTF8.GetBytes(plainText);

            Aes aes = Aes.Create();
            aes.Key = Encoding.UTF8.GetBytes("mysecretkey12345");
            aes.IV = new byte[16];
            ICryptoTransform encryptor = aes.CreateEncryptor();

            using (MemoryStream ms = new MemoryStream())
            {
                Dictionary<int, Employee> LoadEmployees()
                {
                    Dictionary<int, Employee> employees = new Dictionary<int, Employee>();

                    if (File.Exists(employeesFile))
                    {
                        using (StreamReader reader = new StreamReader(employeesFile))
                        {
                            XmlSerializer serializer = new XmlSerializer(typeof(Dictionary<int, Employee>));
                            employees = (Dictionary<int, Employee>)serializer.Deserialize(reader);
                        }
                    }

                    return employees;
                }
            }
        }
    }
}
