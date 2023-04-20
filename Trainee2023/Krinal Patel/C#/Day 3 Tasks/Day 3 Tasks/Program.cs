using System;
using System.Security.Cryptography;
using System.IO;
using System.Configuration;

namespace Day_3_Tasks
{
    public static class DateFormateExt { 
    public static string DateFormate(this DateTime date, string format)
    {
        return date.ToString(format);
    }
    }


    class Program
    {

        private static string Encrypt(string strEncrypted)
        {
            byte[] b = System.Text.ASCIIEncoding.ASCII.GetBytes(strEncrypted);
            string encrypted = Convert.ToBase64String(b);
            return encrypted;
        }
        private static string Decrypt(string encrString)
        {
            byte[] b;
            string decrypted;
            try
            {
                b = Convert.FromBase64String(encrString);
                decrypted = System.Text.ASCIIEncoding.ASCII.GetString(b);
            }
            catch (FormatException)
            {
                decrypted = " ";

            }
            return decrypted;
        }

        static void Main(string[] args)
        {
            do
            {
                Console.WriteLine("\n------------------------- MENU ---------------------------\n");

                Console.WriteLine("1. Create a file and add some text");
                Console.WriteLine("2. Create a file with text and read the file");
                Console.WriteLine("3. Create a file and write an array of strings to the file");
                Console.WriteLine("4. Append some text to an existing file");
                Console.WriteLine("5. Read the first line from a file");
                Console.WriteLine("6. Count the number of lines in a file");
                Console.WriteLine("7. Throw a Simple Exception and handle it");
                Console.WriteLine("8. Exception Handling Division");
                Console.WriteLine("9. Returns today's date in user given date format");
                Console.WriteLine("10. Throw ArgumentNullException and handle it");
                Console.WriteLine("11. Store User Email Address in encrypted format and retrive it in original form");
                Console.WriteLine("12. Retrieve the user password from the Configuration file and encrypt it and store it in file");
                Console.WriteLine("0. Exit");




                Console.WriteLine("\n--------------------------------------------------------\n");
                Console.Write("Enter Your Choice : ");

                var task = Convert.ToInt32(Console.ReadLine());

                switch (task)
                {
                    case 1:

                        string fileName1 = @"D:\C# Training\Day 3 Tasks\Files\KPTask1.txt";
                        try
                        {
                            Console.WriteLine("\n--------------- create a file and add some text -------------------------");

                            if (File.Exists(fileName1))
                            {
                                File.Delete(fileName1);
                            }

                            Console.WriteLine("\nEnter Text to Write in File and press enter to insert into file : ");
                            var text = Convert.ToString(Console.ReadLine());
                            //var text = "This is for testing file created in Task 1 By Krinal Patel";
                            File.WriteAllText(fileName1, text);
                            Console.WriteLine("\nFile Created and user inputed text is written in it..!!");
                            Console.WriteLine("\nPress Enter to proceed further..!!");


                        }
                        catch (Exception)
                        {
                            Console.WriteLine("Something Went Wrong ! Please Restart the menu by pressing Enter..");
                        }

                        Console.ReadLine(); //waits for enter button to be pressed to exit console

                        break;
                    case 2:

                        string fileName2 = @"D:\C# Training\Day 3 Tasks\Files\KPTask2.txt";
                        try
                        {

                            Console.WriteLine("\n---------------  Create a file with text and read the file -------------------------");

                            if (File.Exists(fileName2))
                            {
                                File.Delete(fileName2);
                            }

                            using (StreamWriter sw = File.CreateText(fileName2))
                            {
                                sw.WriteLine("This is for hardcoded text for testing Task 2 by Krinal Patel");
                                sw.WriteLine("This is for Training purpose in Satva Solutions");
                                sw.WriteLine("Trainee Web Developer");
                                sw.WriteLine("Krinal Patel");
                                sw.WriteLine("From Unjha, Mehsana");
                            }
                            Console.WriteLine("File is created successfully..!!");
                            Console.WriteLine("Reading from the file..");
                            using (StreamReader sr = File.OpenText(fileName2))
                            {
                                string s = "";
                                Console.WriteLine("\nKPTask2.txt File Content : \n");
                                while ((s = sr.ReadLine()) != null)
                                {
                                    Console.WriteLine(s);
                                }
                                Console.WriteLine("");
                            }
                            Console.Write("Press Enter to Proceed..!!");
                        }
                        catch (Exception)
                        {
                            Console.WriteLine("Something Went Wrong ! Please Restart the menu by pressing Enter..");

                        }
                        Console.ReadLine(); //waits for enter button to be pressed to exit console
                        break;

                    case 3:
                        string fileName3 = @"D:\C# Training\Day 3 Tasks\Files\KPTask3.txt";

                        try
                        {
                            Console.WriteLine("\n--------------- Create a file and write an array of strings to the file -------------------------");

                            if (File.Exists(fileName3))
                            {
                                File.Delete(fileName3);
                            }

                            Console.Write("Enter Array Length : ");
                            var length = Convert.ToInt32(Console.ReadLine());

                            string[] array3 = new string[length];
                            Console.WriteLine("Enter Strings from below : ");
                            for (int i = 0; i < length; i++)
                            {
                                Console.Write("Input Line : ", i + 1);
                                array3[i] = Convert.ToString(Console.ReadLine());
                            }
                            using (StreamWriter sw = File.CreateText(fileName3))
                            {
                                foreach (string s in array3)
                                {
                                    sw.WriteLine(s);
                                }
                            }
                            Console.Write("\nFile is created successfully..!!");
                            Console.Write("\nPress Enter to Proceed..!!");

                        }
                        catch (Exception)
                        {
                            Console.WriteLine("Enter Valid Input !");
                        }
                        break;


                    case 4:

                        string fileName4 = @"D:\C# Training\Day 3 Tasks\Files\KPTask4.txt";

                        try
                        {
                            Console.WriteLine("\n--------------- Append some text to an existing file -------------------------");

                            var text = "This is for testing file created in Task 4 which is to be appended by some other text By Krinal Patel";
                            File.WriteAllText(fileName4, text);

                            using (StreamWriter sw = File.AppendText(fileName4))
                            {
                                Console.WriteLine("\nEnter Text to Write in File and press enter to append into file : ");
                                var appendtext = Convert.ToString(Console.ReadLine());
                                sw.WriteLine(appendtext);
                                Console.WriteLine("\nFile Created and user inputed text is appended in it..!!");
                            }
                            Console.Write("\nPress Enter to Proceed..!!");
                            Console.ReadLine(); //waits for enter button to be pressed to exit console

                        }
                        catch (Exception)
                        {
                            Console.WriteLine("Enter Valid Input !");
                        }
                        break;

                    case 5:

                        string fileName5 = @"D:\C# Training\Day 3 Tasks\Files\KPTask5.txt";

                        try
                        {
                            Console.WriteLine("\n--------------- Read the first line from a file -------------------------");

                            if (File.Exists(fileName5))
                            {
                                File.Delete(fileName5);
                            }

                            using (StreamWriter sw = File.CreateText(fileName5))
                            {
                                sw.WriteLine("This is for hardcoded line 1 created by Krinal Patel");
                                sw.WriteLine("This is for Training purpose in Satva Solutions");
                                sw.WriteLine("Trainee Web Developer");
                                sw.WriteLine("Krinal Patel");
                                sw.WriteLine("From Unjha, Mehsana");
                            }

                            if (File.Exists(fileName5))
                            {
                                string[] lines = File.ReadAllLines(fileName5);
                                Console.Write("\nLine 1 : " + lines[0]);
                            }


                            Console.Write("\nPress Enter to Proceed..!!");
                            Console.ReadLine(); //waits for enter button to be pressed to exit console
                        }
                        catch (Exception)
                        {
                            Console.WriteLine("Enter Valid Input !");
                        }
                        break;

                    case 6:

                        string fileName6 = @"D:\C# Training\Day 3 Tasks\Files\KPTask6.txt";

                        try
                        {
                            Console.WriteLine("\n---------------  count the number of lines in a file -------------------------");

                            if (File.Exists(fileName6))
                            {
                                File.Delete(fileName6);
                            }

                            using (StreamWriter sw = File.CreateText(fileName6))
                            {
                                sw.WriteLine("This is for hardcoded line 1 created by Krinal Patel");
                                sw.WriteLine("This is for Training purpose in Satva Solutions");
                                sw.WriteLine("Trainee Web Developer");
                                sw.WriteLine("Krinal Patel");
                                sw.WriteLine("From Unjha, Mehsana");
                            }

                            using (StreamReader sr = File.OpenText(fileName6))
                            {
                                string s = "";
                                int count = 0;
                                Console.WriteLine("File Content : \n");
                                while ((s = sr.ReadLine()) != null)
                                {
                                    Console.WriteLine(s);
                                    count++;
                                }
                                Console.WriteLine("");
                                Console.Write("The number of lines in  the File : {0}\n", count);

                            }

                            Console.Write("\nPress Enter to Proceed..!!");
                            Console.ReadLine(); //waits for enter button to be pressed to exit console
                        }
                        catch (Exception)
                        {
                            Console.WriteLine("Enter Valid Input !");
                        }
                        break;


                    case 7:

                        try
                        {
                            Console.WriteLine("\n--------------- Throw a Simple Exception and handle it -------------------------");

                            int[] number = { 1, 2, 3, 4, 5 };
                            Console.WriteLine(number[15]);

                            Console.Write("\nPress Enter to Proceed..!!");
                            Console.ReadLine(); //waits for enter button to be pressed to exit console
                        }
                        catch (IndexOutOfRangeException e)
                        {
                            Console.WriteLine("\nException caught: {0}", e.Message);

                        }
                        break;

                    case 8:

                        try
                        {
                            Console.WriteLine("\n--------------- Exception Handling Division -------------------------");

                            Console.Write("Enter Number 1 : ");
                            var no1 = Convert.ToInt32(Console.ReadLine());
                            Console.Write("Enter Number 2 : ");
                            var no2 = Convert.ToInt32(Console.ReadLine());

                            var div = no1 / no2;

                            Console.WriteLine("Division =" + div);


                            Console.Write("\nPress Enter to Proceed..!!");
                            Console.ReadLine(); //waits for enter button to be pressed to exit console
                        }
                        catch (DivideByZeroException e)
                        {
                            Console.WriteLine("\nException caught: {0}", e.Message);

                        }

                        break;
                    case 9:
                        try
                        {
                            Console.Write("Enter Format : ");
                            string format = Console.ReadLine();

                            DateTime today = DateTime.Now;
                            string final = today.DateFormate(format);                                           //F12 to Navigate to Extension
                            Console.WriteLine(final);

                        }
                        catch (Exception e)
                        {
                            Console.WriteLine(e.Message);
                        }
                        break;
                    case 10:

                        try
                        {
                            Console.WriteLine("\n--------------- Throw ArgumentNullException and handle it -------------------------");

                            string id = null;
                            int result = int.Parse(id);
                            Console.WriteLine(result);

                            Console.Write("\nPress Enter to Proceed..!!");
                            Console.ReadLine(); //waits for enter button to be pressed to exit console
                        }
                        catch (ArgumentNullException e)
                        {
                            Console.WriteLine("\nException caught: {0}", e.Message);
                        }
                        break;

                    case 11:
                        // Get the user's email address
                        Console.Write("Enter your email address which you want to Encrypt = ");
                        string email = Console.ReadLine();
                        string fileName11 = @"D:\C# Training\Day 3 Tasks\Files\KPTask11.txt";

                        var encryptedemail = Encrypt(email);
                        var decryptedemail = Decrypt(encryptedemail);

                        if (File.Exists(fileName11))
                        {
                            File.Delete(fileName11);
                        }


                        using (StreamWriter writer = new StreamWriter(fileName11))
                        {
                            writer.WriteLine(encryptedemail);

                        }
                        using (StreamReader reader = new StreamReader(fileName11))

                        {
                            Console.Write("Decrypted Email = "+decryptedemail);
                            Console.ReadLine();

                        }
                        break;
                    case 12:
                        string fileName12 = @"D:\C# Training\Day 3 Tasks\Files\KPTask12.txt";

                        string config = ConfigurationManager.AppSettings["password"];
                        using(StreamWriter sw = File.CreateText(fileName12))
                        {
                            sw.WriteLine("Encrypted = "+ config);

                        }
                        using (StreamReader sr = File.OpenText(fileName12))
                        {
                            string s = "";
                            while ((s = sr.ReadLine()) != null)
                            {
                                Console.WriteLine(s);
                            }
                            Console.ReadLine();
                        }
                        break;

                    case 0:
                        Environment.Exit(1);// exit

                        break;

                    default:
                        Console.WriteLine("Please Enter 1 to 7");
                        Console.ReadLine(); //waits for enter button to be pressed to exit console
                        break;

                }

            }
            while (true);

        }
    }
}



//Format                                                                  Result

//DateTime.Now.ToString("MM/dd/yyyy")	                                  05 / 29 / 2015
//DateTime.Now.ToString("dddd, dd MMMM yyyy")                             Friday, 29 May 2015
//DateTime.Now.ToString("dddd, dd MMMM yyyy")	                          Friday, 29 May 2015 05:50
//DateTime.Now.ToString("dddd, dd MMMM yyyy")                             Friday, 29 May 2015 05:50 AM
//DateTime.Now.ToString("dddd, dd MMMM yyyy")                             Friday, 29 May 2015 5:50
//DateTime.Now.ToString("dddd, dd MMMM yyyy")                             Friday, 29 May 2015 5:50 AM
//DateTime.Now.ToString("dddd, dd MMMM yyyy HH:mm:ss")                    Friday, 29 May 2015 05:50:06
//DateTime.Now.ToString("MM/dd/yyyy HH:mm")                               05 / 29 / 2015 05:50
//DateTime.Now.ToString("MM/dd/yyyy hh:mm tt")                            05 / 29 / 2015 05:50 AM
//DateTime.Now.ToString("MM/dd/yyyy H:mm")                                05 / 29 / 2015 5:50
//DateTime.Now.ToString("MM/dd/yyyy h:mm tt")                             05 / 29 / 2015 5:50 AM
//DateTime.Now.ToString("MM/dd/yyyy HH:mm:ss")                            05 / 29 / 2015 05:50:06
//DateTime.Now.ToString("MMMM dd")                                        May 29
//DateTime.Now.ToString("yyyy’-‘MM’-‘dd’T’HH’:’mm’:’ss.fffffffK")	      2015 - 05 - 16T05: 50:06.7199222 - 04:00
//DateTime.Now.ToString("ddd, dd MMM yyy HH’:’mm’:’ss ‘GMT’")             Fri, 16 May 2015 05:50:06 GMT
//DateTime.Now.ToString("yyyy’-‘MM’-‘dd’T’HH’:’mm’:’ss")                  2015 - 05 - 16T05: 50:06
//DateTime.Now.ToString("HH:mm")                                          05:50
//DateTime.Now.ToString("hh:mm tt")                                       05:50 AM
//DateTime.Now.ToString("H:mm")                                           5:50
//DateTime.Now.ToString("h:mm tt")                                        5:50 AM
//DateTime.Now.ToString("HH:mm:ss")                                       05:50:06
//DateTime.Now.ToString("yyyy MMMM")                                      2015 May