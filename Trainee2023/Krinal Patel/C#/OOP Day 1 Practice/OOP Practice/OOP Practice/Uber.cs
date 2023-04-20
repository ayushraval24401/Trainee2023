using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static OOP_Practice.Program;

namespace OOP_Practice
{
    public class Uber
    {
        public class Customer
        {

            private string cName = "Krinal";
            public string CName
            {
                get { return cName; }
                set { cName = value; }
            }

            private string address = "22 Jalaram Park";
            public string Address
            {
                get { return address; }
                set { address = value; }
            }

            private string city = "Unjha";
            public string City
            {
                get { return city; }
                set { city = value; }
            }

            private string region = "Mehsana";
            public string Region
            {
                get { return region; }
                set { region = value; }
            }

            private string postalCode = "384170";
            public string PostalCode
            {
                get { return postalCode; }
                set { postalCode = value; }
            }

            private string country = "Bharat";
            public string Country
            {
                get { return country; }
                set { country = value; }
            }

            private string phone = "9408494033";
            public string Phone
            {
                get { return phone; }
                set { phone = value; }
            }


        }

        public class Driver : Customer
        {
            private new Customer CName
            {
                get
                {
                    Console.ReadKey();

                    return CName;
                }
            }
            private new Customer Region
            {
                get
                {
                    Console.ReadKey();

                    return Region;
                }
            }

        }
   
    }  
    
}
  
  
