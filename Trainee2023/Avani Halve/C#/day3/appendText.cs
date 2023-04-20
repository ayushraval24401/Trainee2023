using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace day3
{
    public class appendText
    {
        public void AppendTextinFile()
        {
            string Filepath = @"D:\avani_html\C#\day3\firstTextFile.txt";
            using (StreamWriter writeText = File.AppendText(Filepath))
            {
                writeText.Write("Append Line hai yeh!! :)");
            }
            string text = File.ReadAllText(Filepath);
            Console.WriteLine(text);
        }
    }
}
