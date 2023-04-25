using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace day3
{
    public class emailregex
    {
        public void EncryptedDecrypted()
        {

            string filePath = @"D:\avani_html\C#\day3\email.txt";
            try
            {
                if (File.Exists(filePath))
                {
                    File.Delete(filePath);
                }
                Console.WriteLine("Enter Email");

                var email = Console.ReadLine();
                var encryptedString = EncryptedString(email);

                var OriginalEmail = DecryptedString(encryptedString);

                // Write the encrypted and decrypted strings to the file
                using (StreamWriter writer = new StreamWriter(filePath))
                {
                    writer.WriteLine("Encrypted String: " + encryptedString);
                }

                // Read the file and display its contents
                using (StreamReader reader = new StreamReader(filePath))
                {
                    Console.WriteLine("Encrypted Email:" + OriginalEmail);

                }
            }
            catch (FileNotFoundException e)
            {
                Console.WriteLine(e.ToString());
            }
        }

        private static string EncryptedString(string strEncrypted)
        {
            byte[] b = System.Text.ASCIIEncoding.ASCII.GetBytes(strEncrypted);
            string encrypted = Convert.ToBase64String(b);
            return encrypted;
        }
        private static string DecryptedString(string encrString)
        {
            byte[] b;
            string decrypted;
            try
            {
                b = Convert.FromBase64String(encrString);
                decrypted = System.Text.ASCIIEncoding.ASCII.GetString(b);
            }
            catch (FormatException fe)
            {
                decrypted = " ";
            }
            return decrypted;
        }
    }
}