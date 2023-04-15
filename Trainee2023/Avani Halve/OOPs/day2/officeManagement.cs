using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace day2
{
    public class officeManagement
    {
        public string Name { get; set; }
        public string Department { get; set; }
        public double expeirence { get; set; }
        public string responsibility { get; set; }
    }

    abstract class Details
    {
        public Details()
        {
            int Id = 1;
            string details = "Office Management";
            Console.WriteLine(Id);
            Console.WriteLine(details);
        }
    }

    class display : Details
    {
        public void displayDetails()
        {
            Console.WriteLine("Details");
        }
    }
    public class Departments : officeManagement
    {
        public string department
        {
            get
            {
                return Department;
            }
            set
            {
                Department = value;
            }
        }

    } 
    public class employeeDetail : Departments
    {   
        public string Details
        {
            get
            {
                return $"{Name},{expeirence},{responsibility}";
            }
            set
            {
                string[] loginValues = value.Split(',');
                Name = loginValues[0];
                double experienceValue;
                if (double.TryParse(loginValues[1], out experienceValue))
                {
                    expeirence = experienceValue;
                }
                responsibility = loginValues[2];
            }
        }

    }
}
