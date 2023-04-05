using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace day2
{
    public class printevennumbers
    {
        public void PrintEvenNumbers()
        {
            Console.WriteLine("Even Numbers between 0-50");
            for( int i = 0; i <= 50; i++)
            {
                if (i % 2 == 0)
                {
                    if (i == 2 || i == 12 || i== 22 || i == 32 || i == 42)
                    {
                        continue;
                    }
                    else
                    {
                        Console.WriteLine(i);
                    }
                }

            }
        }
    }
}
