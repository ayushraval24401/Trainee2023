using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace day3
{

    public static class DateExtension
    {
        public static string DateFormate(this DateTime date, string dateFormat)
        {
            return date.ToString(dateFormat);
        }
    }
    public class dataMethodExtensionMethod
    {
        public void DateMethodExtensionMethod()
        {
            try
            {
                Console.WriteLine("Enter Date Format:");
                string dateFormat = Console.ReadLine();

                DateTime currentDate = DateTime.Now;
                string formattedDate = currentDate.DateFormate(dateFormat);

                Console.WriteLine("Formatted Date: " + formattedDate);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
        }
    }
}
