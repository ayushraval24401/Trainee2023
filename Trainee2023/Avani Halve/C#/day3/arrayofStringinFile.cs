using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace day3
{
    public class arrayofStringinFile
    {
        public void ArrayOfString()
        {
            string fileName = @"D:\avani_html\C#\day3\stringArray.txt";
            string[] arrayString;
            Console.Write("write Array of Strings  :\n");

            if (File.Exists(fileName))
            {
                File.Delete(fileName);
            }
            Console.Write("Input number of lines which you want to insert: ");
            int lines = Convert.ToInt32(Console.ReadLine());
            arrayString = new string[lines];
            for (int i = 0; i < lines; i++)
            {
                Console.Write(" Input lines : ", i + 1);
                arrayString[i] = Console.ReadLine();
            }
            File.WriteAllLines(fileName, arrayString);
            using (StreamReader readFile = File.OpenText(fileName))
            {
                string writeFile = "";
                Console.WriteLine("The content of the file is: ", lines);
                while ((writeFile = readFile.ReadLine()) != null)
                {
                    Console.WriteLine(" {0} ", writeFile);
                }
                Console.WriteLine();
            }
        }
    }
}
