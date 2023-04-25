using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace day3
{
    public class readFirstLine
    {
        public void ReadFirstLineofFile()
        {
            string Filepath = @"D:\avani_html\C#\day3\firstTextFile.txt";
            string firstLine;
            using (StreamReader reader = new StreamReader(Filepath))
            {
                firstLine = reader.ReadLine();
            }
            Console.WriteLine(firstLine);
        }
    }
}
