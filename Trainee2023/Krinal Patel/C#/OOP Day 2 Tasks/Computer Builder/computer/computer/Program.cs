using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace computer
{
    public class Hardware
    {
        private string keyboard = "Dell";
        public string Keyboard   // property
        {
            get { return keyboard; }   // get method
            set { keyboard = value; }  // set method
        }
    }

    public class Software
    {
        private string os = "Windows";

        public string OS   // property
        {
            get { return os; }   // get method
            set { os = value; }  // set method
        }
    }

    internal class Program
    {
        static void Main(string[] args)
        {
            Hardware h1 = new Hardware();
            string keyboardBrand = h1.Keyboard; // accessing the property using the getter method
            Console.WriteLine($"The keyboard brand is: {keyboardBrand}"); // output the keyboard brand value to the console
         
            Software s1 = new Software();
            string OSName = s1.OS; // accessing the property using the getter method
            Console.WriteLine($"The OS Name is: {OSName}"); // output the keyboard brand value to the console

            Console.ReadKey();
        }
    }
}
