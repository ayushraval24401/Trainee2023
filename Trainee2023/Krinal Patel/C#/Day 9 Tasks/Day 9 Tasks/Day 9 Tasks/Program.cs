using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Xml.Linq;
using System.Xml.Serialization;

    namespace Day_9_Tasks
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

       
        }
        public class Program
        {



            static List<Student> students= new List<Student>();

             static int studentIdCounter = 1;

        static void Main(string[] args)
            {
                while (true)

                {
                    Console.WriteLine("\n-------------- Admission Management System ---------------");
                    Console.WriteLine("1. Add Student");
                    Console.WriteLine("2. Display All Students");
                    Console.WriteLine("3. Get Student by ID");
                    Console.WriteLine("4. Delete Student by ID");


                    Console.WriteLine("0. Exit");
                    Console.Write("Please Enter your choice : ");
                    int choice = Convert.ToInt32(Console.ReadLine());

                    switch (choice)
                    {
                        case 1:
                            AddStudent();
                            break;
                        
                        case 2:
                            DisplayAllStudents();
                            Console.ReadKey();
                            break;
                        
                        case 3:
                             GetStudentByID();
                             Console.ReadKey();
                             break;
                        case 4:
                            DeleteStudentByID();
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

            public enum Gender
            {
                Male,
                Female
            }

            public class Student
            {
                public int Id { get; set; }
                public string FirstName { get; set; }
                public string LastName { get; set; }
                public string FullName { get; set; }
                public Gender Gender { get; set; }
                public string Email { get; set; }
                public long PhoneNumber { get; set; }
                public string Address { get; set; }

            }


            static void AddStudent()
            {


                try
                {
                    Student s1 = new Student();


                    s1.Id = studentIdCounter++;
                    Console.WriteLine("ID : " + s1.Id);
                    
                Console.Write("First Name (Required): ");
                    s1.FirstName = Console.ReadLine().Trim();
                    if (string.IsNullOrEmpty(s1.FirstName))
                    {
                        Console.WriteLine("First Name is Required!");
                        Console.ReadKey();

                        return;
                    }

                    Console.Write("Last Name (Required): ");
                    s1.LastName = Console.ReadLine().Trim();
                    if (string.IsNullOrEmpty(s1.LastName))
                    {
                        Console.WriteLine("Last Name is Required!");
                        Console.ReadKey();

                        return;
                    }
                    Console.WriteLine("Full Name : "+ s1.FirstName + s1.LastName);
                    var FullName = s1.FullName;
                    s1.FullName = FullName;
    
                    Console.Write("Please enter your gender (Male/Female): ");
                    string genderString = Console.ReadLine();
                    Gender gender;

                    if (!Enum.TryParse<Gender>(genderString, out gender))
                    {
                        Console.WriteLine("Invalid gender input. Please try again.");
                        return;
                    }


                    Console.Write("Email Address (Required, Must be Valid): ");
                    s1.Email = Console.ReadLine().Trim();
                    if (string.IsNullOrEmpty(s1.Email) || !s1.Email.IsValidEmail())
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
                    s1.PhoneNumber = phoneNumber;

                    Console.Write("Address : ");
                    string Address = Console.ReadLine().Trim();
                      s1.Address = Address;

                Console.ReadKey();

                    Console.WriteLine("All Fields are Validated..");

                    students.Add(s1);

                SaveStudentToXML();
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }


        static void SaveStudentToXML()
        {
            string fileName = @"D:\C# Krinal Patel\Day 8 Tasks\Files\KPXML1.xml";
            XmlSerializer serializer = new XmlSerializer(typeof(List<Student>));

            using (TextWriter writer = new StreamWriter(fileName))
            {
                serializer.Serialize(writer, students);
            }

            Console.WriteLine("Student data saved to KPXML1.xml file.");
        }
        static List<Student> LoadStudentsFromXML()
        {
            string fileName = @"D:\C# Krinal Patel\Day 8 Tasks\Files\KPXML1.xml";
            List<Student> students = new List<Student>();
            if (File.Exists(fileName))
            {
                XmlSerializer serializer = new XmlSerializer(typeof(List<Student>));
                using (StreamReader reader = new StreamReader(fileName))
                {
                    students = (List<Student>)serializer.Deserialize(reader);
                }
            }
            return students;
        }
        static void DisplayAllStudents()
        {
            List<Student> students = LoadStudentsFromXML();
            if (students.Any())
            {
                Console.WriteLine("\n------------ All Students ------------");
                foreach (var student in students)
                {
                    Console.WriteLine($"Id:{student.Id}\nName: {student.FirstName}\nGender: {student.Gender}\nEmail: {student.Email}\nPhone Number: {student.PhoneNumber}\nAddress: {student.Address}\n");
                }
            }
            else
            {
                Console.WriteLine("No students found.");
            }
        }
        static void GetStudentByID()
        {
            string fileName = @"D:\C# Krinal Patel\Day 8 Tasks\Files\KPXML1.xml";

            // Load XML file
            XDocument xdoc = XDocument.Load(fileName);

            // Display all students
            DisplayAllStudents(xdoc);

            Console.Write("Enter the ID of the student: ");
            int id = Convert.ToInt32(Console.ReadLine());

            // Search for student with the given ID
            var student = xdoc.Descendants("Student")
                              .Where(s => s.Element("Id").Value == id.ToString())
                              .FirstOrDefault();

            if (student == null)
            {
                Console.WriteLine("Student not found!");
            }
            else
            {
                Console.WriteLine("Student found:");
                Console.WriteLine($"Name: {student.Element("FirstName").Value}");
                Console.WriteLine($"Gender: {student.Element("Gender").Value}");
                Console.WriteLine($"Email: {student.Element("Email").Value}");
                Console.WriteLine($"Phone Number: {student.Element("PhoneNumber").Value}");
                Console.WriteLine($"Address: {student.Element("Address").Value}");
            }
        }

        static void DisplayAllStudents(XDocument xdoc)
        {
            foreach (var student in xdoc.Descendants("Student"))
            {
                Console.WriteLine($"ID: {student.Element("Id").Value}");
                Console.WriteLine($"Name: {student.Element("FirstName").Value} {student.Element("LastName").Value}");
                Console.WriteLine($"Gender: {student.Element("Gender").Value}");
                Console.WriteLine($"Email: {student.Element("Email").Value}");
                Console.WriteLine($"Phone Number: {student.Element("PhoneNumber").Value}");
                Console.WriteLine($"Address: {student.Element("Address").Value}");
                Console.WriteLine();
            }
        }

     static void DeleteStudentByID()
{
    string fileName = @"D:\C# Krinal Patel\Day 8 Tasks\Files\KPXML1.xml";

    // Load XML file
    XDocument xdoc = XDocument.Load(fileName);

    // Display all students
    DisplayAllStudents(xdoc);

    Console.Write("Enter the ID of the student to delete: ");
    int id = Convert.ToInt32(Console.ReadLine());

    // Find the student with the given ID
    var student = students.FirstOrDefault(s => s.Id == id);
    if (student == null)
    {
        Console.WriteLine("No student with the given ID found.");
    }
    else
    {
        // Remove the student from the list
        students.Remove(student);
        Console.WriteLine("Student with ID {0} deleted.", id);

        // Update the XML file
        xdoc.Descendants("Students")
            .Elements("Student")
            .Where(e => (int)e.Attribute("Id") == id)
            .Remove();
        xdoc.Save(fileName);
    }
}

    }

}
