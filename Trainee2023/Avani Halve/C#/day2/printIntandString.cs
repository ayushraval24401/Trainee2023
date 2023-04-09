using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Text;
using System.Threading.Tasks;

namespace day2
{
    public class printIntandString
    {
        public void PrintIntandString()
        {
            Print(23);
            print("Hello String");
        }

        void Print(int val)
        {
            Console.WriteLine("Integer Value: " + val);
        }

        void print(string val)
        {
            Console.WriteLine("String Value: " + val);
        }
    }
}
