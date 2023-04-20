using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Linq;
using System.Net.Mail;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

//code reusabilty
//naming conventions 
//validations

namespace day4
{
    public class studentDetail
    {
        private int studentId;
        private string studentName;
        private string DOB;
        private int studentRollNo;
        private string studentEmail;
        private double studentGPA;
        enum studentgpa    //in different class
            {
               one = 1,
               two = 2,
               three = 3,
               four = 4
            };
        studentgpa gpa;
        public void sudent() 
        {
            studentDetail studentObj1 = new studentDetail();
            studentDetail studentObj2 = new studentDetail();
            studentDetail studentObj3 = new studentDetail();
            studentDetail comp = new studentDetail();
            double[] comapir = new double[5];
            double[] student = new double[5];
            comapir = studentObj1.StudentDetails();
            double cgpa = 0;
            for (int i = 0; i < 5; i++)
            {
                cgpa = cgpa + comapir[i];
            }
            cgpa = cgpa / 5;
            studentGPA = cgpa;
            Console.WriteLine("CGPA is: " + cgpa);
            student[0] = cgpa;

            comapir = studentObj2.StudentDetails();
            double cgpa1 = 0;
            for (int i = 0; i < 5; i++)
            {
                cgpa1 = cgpa1 + comapir[i];
            }
            cgpa1 = cgpa1 / 5;
            studentGPA = cgpa1;
            Console.WriteLine("CGPA is: " + cgpa1);
            student[1] = cgpa1;

            comapir = studentObj3.StudentDetails();
            double cgpa2 = 0;
            for (int i = 0; i < 5; i++)
            {
                cgpa2 = cgpa2 + comapir[i];
            }
            cgpa2 = cgpa2 / 5;
            studentGPA = cgpa2;
            Console.WriteLine("CGPA is: " + cgpa2);
            student[2] = cgpa2;

            comp.CompairCGPA(student[0], student[1], student[2]);
            Console.ReadKey();
        }
        public studentDetail()
        {
           // studentGPA = 3.0;
        }
        public studentDetail(studentDetail copyConstObj)  //Copy Constructor
        {
            studentId = copyConstObj.studentId;
            studentName = copyConstObj.studentName;
            DOB = copyConstObj.DOB;
            studentEmail = copyConstObj.studentEmail;
            studentRollNo = copyConstObj.studentRollNo;
            studentGPA = copyConstObj.studentGPA;
        }

        public double[] cgpa = new double[5];
        public double[] StudentDetails()
        {
            Console.WriteLine("--- Enter Details of Students ---");
            Console.WriteLine("Enter ID of Student");
            studentId = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Enter Name of Student");
            studentName = Console.ReadLine();
            Console.WriteLine("Enter Date of Birth (mm/dd/yyyy)");
            DOB = Console.ReadLine();
            Console.WriteLine("Enter Roll Number of Student");
            studentRollNo = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Enter Email of Student");
            studentEmail = Console.ReadLine();
            try
            {
                MailAddress m = new MailAddress(studentEmail);
            }
            catch (FormatException)
            {
                Console.WriteLine("Enter Valid Email Address!");
            }
            int choice;
            int count = 1;
            for (int i = 0; i < 5; i++)
            {
                Console.WriteLine("Enter Student GPA Semester: " + count);
                choice = Convert.ToInt32(Console.ReadLine());
                gpa = (studentgpa)choice;
                switch (gpa)
                {
                    case studentgpa.one:
                        cgpa[i] = (double)studentgpa.one;
                        break;
                    case studentgpa.two:
                        cgpa[i] = (double)studentgpa.two;
                        break;
                    case studentgpa.three:
                        cgpa[i] = (double)studentgpa.three;
                        break;
                    case studentgpa.four:
                        cgpa[i] = (double)studentgpa.four;
                        break;
                    default:
                        cgpa[3] = (double)studentgpa.four;
                        break;
                }
                count++;
            }
            return cgpa;
        }
        public double CompairCGPA(double s1, double s2, double s3)   //make it dynamic for more entries
        {
            if ((s1 == s2) && (s2 == s3)  && (s1 == s3))
            {
                Console.WriteLine("Student 1, 2 and 3 are CR");
            }
            else if (s1 == s3)
            {
                Console.WriteLine("Student 1 and 3 are CR");
            }
            else if (s2 == s3)
            {
                Console.WriteLine("Student 2 and 3 are CR");
            }
            else if (s1 == s2)
            {
                Console.WriteLine("Student 1 and 2 are CR");
            }
            else if (s1 > s2 && s1 > s3)
            {
                Console.WriteLine("Student 1 is CR");
            }
            else if (s2 > s1 && s2 > s3)
            {
                Console.WriteLine("Student 2 is CR");
            }
            else
            {
                Console.WriteLine("Student 3 is CR");
            }
            return 0;
        }


        //operator overloading
        public static studentDetail operator + (studentDetail detail1, studentDetail detail2)
        {
            studentDetail detailObj = new studentDetail();
            detailObj.studentName = String.Concat(detailObj.studentName, detail2.studentName);
            detailObj.studentEmail = String.Concat(detailObj.studentEmail, detail2.studentEmail);
            detailObj.studentId = detail1.studentId + detail2.studentId;
            detailObj.studentRollNo = detail1.studentRollNo + detail2.studentRollNo;
            
            return detailObj;
        }
    }
}


//(student1 == student2) && (student1 > student3) && (student2 > student3)
//Student First & Second is CR

//enum studentgpa
//{
//    one = 1,
//    two = 2,
//    three = 3,
//    four = 4
//};
//int count = 1;
//for (int i = 0; i < 5; i++)
//{
//    Console.WriteLine("Enter Student GPA of Semester " + count);
//    int choice = Convert.ToInt32(Console.ReadLine());
//    gpa = (studentgpa)choice;
//    switch (gpa)
//    {
//        case studentgpa.one:
//            cgpa[i] = (double)studentgpa.one;
//            break;
//        case studentgpa.two:
//            cgpa