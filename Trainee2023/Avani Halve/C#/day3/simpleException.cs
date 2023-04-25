using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace day3
{
    public class simpleException
    {
        public void SimpleException()
        {
            try
            {
                using (StreamReader reader = new StreamReader("fileNotPresent.txt"))
                {
                    reader.ReadToEnd();
                }
            }
            catch (FileNotFoundException exception)
            {
                Console.WriteLine(exception.Message);
                Console.WriteLine("Custome Message for Error : File not Found");
            }
        }
    }
}
