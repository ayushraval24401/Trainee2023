using Day4TaskStudent;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Day4TaskStudent
{
    class Student
    {
        private int studentID;
        private string studentName;
        private string studentDOB;
        private string studentEmail;
        private double studentGPA;

        public Student(Student snew)                   //Copy Constructor
        {
            studentID = snew.studentID;
            studentName = snew.studentName;
            studentDOB = snew.studentDOB;
            studentEmail = snew.studentEmail;
            studentGPA = snew.studentGPA;
        }

        public int StudentID
        {
            get { return studentID; }
            set { studentID = value; }
        }

        public string StudentName
        {
            get { return studentName; }
            set { studentName = value; }
        }

        public string StudentDOB
        {
            get { return studentDOB; }
            set { studentDOB = value; }
        }

        public string StudentEmail
        {
            get { return studentEmail; }
            set { studentEmail = value; }
        }

        public double StudentGPA
        {
            get { return studentGPA; }
            set { studentGPA = value; }
        }

        public static void Main(string[] args)
        {
            Console.WriteLine("           Enter 3 Student Details :  \n");
            Student s1 = new Student();
            Student s2 = new Student();
            Student s3 = new Student();

            double[] studentArr = new double[3];

            Console.WriteLine("---------------Student 1 Data-----------------");
            s1.DataGet();
            studentArr[0] = s1.studentGPA;

            Console.ReadLine();

            Console.WriteLine("---------------Student 2 Data-----------------");
            s2.DataGet();
            studentArr[1] = s2.studentGPA;

            Console.ReadLine();

            Console.WriteLine("---------------Student 3 Data-----------------");
            s3.DataGet();
            studentArr[2] = s3.studentGPA;


            s1.Display(); Console.WriteLine("--------------------------------");
            s2.Display(); Console.WriteLine("--------------------------------");
            s3.Display(); Console.WriteLine("--------------------------------");

            double highestCGPA = studentArr.Max();

            //if (highestCGPA == s1.studentGPA)
            //{
            //    Console.WriteLine("CR: " + s1.studentName);
            //}
            //else if (highestCGPA == s2.studentGPA)
            //{
            //    Console.WriteLine("CR: " + s2.studentName);
            //}
            //else if (highestCGPA == s3.studentGPA)
            //{
            //    Console.WriteLine("CR: " + s3.studentName);
            //}

            List<Student> students = new List<Student>() { s1, s2, s3 };
            highestCGPA = students.Max(s => s.studentGPA);
            Student highestCGPAStudent = students.First(s => s.studentGPA == highestCGPA);
            Console.WriteLine("CR: " + highestCGPAStudent.studentName);
            Console.WriteLine("--------------------------------");


            //Operator Overloading
            Student s4 = s1 + s2 + s3; // Adding s1, s2, and s3 using operator overloading
            Console.WriteLine("Operator Overloaded s1, s2 and s3 Details");
            s4.Display(); Console.WriteLine("--------------------------------");


            // Create a new Student object using the copy constructor
            Student s5 = new Student(s1);
            Console.WriteLine("Copy Constructor (Copy of Student 1)");
            s5.Display(); Console.WriteLine("--------------------------------");
            Console.ReadLine();

        }
        public static Student operator +(Student s1, Student s2)
        {
            Student result = new Student();

            result.studentID = s1.studentID + s2.studentID;
            result.studentName = s1.studentName + " " + s2.studentName;
            result.studentDOB = s1.studentDOB + " " + s2.studentDOB;
            result.studentEmail = s1.studentEmail + " " + s2.studentEmail;
            result.studentGPA = s1.studentGPA + s2.studentGPA;

            return result;
        }

        public double[] arr = new double[6];
        double TotalGPA;
        public double[] DataGet()
        {
            try
            {
                Console.Write("Enter Student ID:");
                studentID = Convert.ToInt32(Console.ReadLine());
                Console.Write("Enter Student Name:");
                studentName = Console.ReadLine();
                Console.Write("Enter Student DOB:");
                studentDOB = Console.ReadLine();
                Console.Write("Enter Student Email:");
                studentEmail = Console.ReadLine();

                calculateCGPA();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return arr;

        }
        public double calculateCGPA()
        {
            try
            {

                Console.WriteLine("Please Enter GPA between 1 and 4");
                for (int i = 1; i <= 5; i++)
                {
                    Console.Write("Enter GPA for Semester {0} : ", i);

                    int gpa = Convert.ToInt32(Console.ReadLine());
                    if (gpa > 4)
                    {

                        Console.WriteLine("GPA Entered is greater than 4 Default value 3 is set in GPA");
                        gpa = 3;
                    }
                    TotalGPA = gpa + TotalGPA;

                }
            }
            catch (ArgumentNullException ex)
            {
                Console.WriteLine(ex.Message);

            }

            double CGPA = TotalGPA / 5;
            studentGPA = CGPA;
            Console.WriteLine("CGPA = " + CGPA);
            return studentGPA;

        }
        public Student()
        {
            studentGPA = 3.0;
        }
        public static double GetMaxCGPA(Student[] students)
        {
            double maxCGPA = 0;
            foreach (Student s in students)
            {
                if (s.studentGPA > maxCGPA)
                {
                    maxCGPA = s.studentGPA;
                }
            }
            return maxCGPA;
        }
        public void Display()
        {
            Console.WriteLine("Student ID     : " + studentID);
            Console.WriteLine("Student Name   : " + studentName);
            Console.WriteLine("Student DOB    : " + studentDOB);
            Console.WriteLine("Student Email  : " + studentEmail);
            Console.WriteLine("Student CGPA   : " + studentGPA);
        }
    }
}


