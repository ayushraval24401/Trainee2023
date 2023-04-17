using Extension_method;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace day3
{
    public class extensionMethod
    {
        public void DateExtensionMethod()
        {
            Console.WriteLine("Enter date Formate(Ex: 5/3/2012 12:00:00 AM, 5/3/2012, Thursday, May 03, 2012, 5/3/2012 12:00 AM)");
            DateTime currentDate = Convert.ToDateTime(Console.ReadLine());
            DateTime date = currentDate.ExtensionMethod();
        }
    }
}

namespace Extension_method
{
    public static class ExtensionMethodDate
    {
        public static DateTime ExtensionMethod(this DateTime date)
        {
           
                string[] currentdate =
              date.GetDateTimeFormats('D');

           
            return date;
        }
    }
}
