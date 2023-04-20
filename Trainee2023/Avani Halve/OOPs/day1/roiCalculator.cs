using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Schema;

namespace day1
{
    public class roiCalculator
    {
        public double amountInvestment;
        public double gainFromInvestment;
        public double amountReturn;
        public double resultROI;
        public double length;
        public void ROICalculator()
        {
            Console.WriteLine("Enter Amount Invested");
            amountInvestment = Convert.ToDouble(Console.ReadLine());
            Console.WriteLine("Enter Amount Returned");
            amountReturn = Convert.ToDouble(Console.ReadLine());
            Console.WriteLine("Time Investment: \n1.Use Dates \n2. Use Length");
            int investment = Convert.ToInt32(Console.ReadLine());
            if(investment == 1)
            {
                Console.WriteLine("Enter first Date(yyyy/mm/dd): ");
                DateTime firstDate = Convert.ToDateTime(Console.ReadLine());
                Console.WriteLine("Enter Second Date(yyyy/mm/dd): ");
                DateTime secondDate = Convert.ToDateTime(Console.ReadLine());
                TimeSpan span = secondDate - firstDate;
                int years = span.Days / 365;
                int months = (span.Days % 365) / 30;
                int days = (span.Days % 365) % 30;
                Console.WriteLine("Investment Length: {0}.{1}{2}", years, months, days + "Years");
            }
            else
            {
                Console.WriteLine("Enter Length: ");
                length = Convert.ToDouble(Console.ReadLine());
                Console.WriteLine("Investment Length: " + length + "Years");
            }
            if (amountInvestment > amountReturn) 
            {
                gainFromInvestment = amountInvestment - amountReturn;
                Console.WriteLine("Investment Gain: " + gainFromInvestment);
            }
            else
            {
                gainFromInvestment =   amountReturn - amountInvestment;
                Console.WriteLine("Investment Loss: -" + gainFromInvestment);
            }
            resultROI = ((gainFromInvestment - amountReturn) / amountReturn) * 100;
            Console.WriteLine("Annualized ROI: " + resultROI + "%");

        }
    }
}
