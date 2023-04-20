using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace day3
{
    public class cpuntLineofFile
    {
        public void CountLinesofFile()
        {
            int lineCount = 0;
            using (var reader = File.OpenText(@"D:\avani_html\C#\day3\readFile.txt"))
            {
                while (reader.ReadLine() != null)
                {
                    lineCount++;
                }
            }
            Console.WriteLine(lineCount);

        }
    }
}
