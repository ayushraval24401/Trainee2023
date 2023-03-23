using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace demo1
{
    public  class checkWeekdays
    {

        public void CheckWeekDays()
        {

                Console.WriteLine("Enter any Number (1-7)");
                var weeknNumber = Convert.ToInt32(Console.ReadLine());
                switch (weeknNumber)
                {
                    case 1:
                        {
                            Console.WriteLine("Sunday");
                            break;
                        }
                    case 2:
                        {
                            Console.WriteLine("Monday");
                            break;
                        }
                    case 3:
                        {
                            Console.WriteLine("Tuesday");
                            break;
                        }
                    case 4:
                        {
                            Console.WriteLine("Wednesday");
                            break;
                        }
                    case 5:
                        {
                            Console.WriteLine("Thrusday");
                            break;
                        }
                    case 6:
                        {
                            Console.WriteLine("Friday");
                            break;
                        }
                    case 7:
                        {
                            Console.WriteLine("Saturday");
                            break;
                        }
                    default:
                        {
                            Console.WriteLine("Enter Valid WeekNumber");
                            break;
                        }
                        
                }
            }

        }
    }

