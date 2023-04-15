using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace day3
{
    public class readFile
    {
        public void ReadFile()
        {
            string fileName = @"D:\avani_html\C#\day3\readFile.txt";
            try
            {
                if (File.Exists(fileName))
                {
                    File.Delete(fileName);
                }
                Console.Write("Create a file with some text :\n");
                //Write text in file
                using (StreamWriter writeFile = File.CreateText(fileName))
                {
                    writeFile.WriteLine("Hello guys! Sham ho gaii :)");
                    writeFile.WriteLine("Aaj Friday Hai!!!!");
                    writeFile.WriteLine("Weekend aa gaya, nachooo :)");
                }
                //read from file
                using (StreamReader readFile = File.OpenText(fileName))
                {
                    string blankString = "";
                    Console.WriteLine("Here is the Content 'About Weekend'");
                    while ((blankString = readFile.ReadLine()) != null)
                    {
                        Console.WriteLine(blankString);
                    }
                    Console.WriteLine("");
                }
            }
            catch (Exception MyExcep)
            {
                Console.WriteLine(MyExcep.ToString());
            }
        }
    }
}
