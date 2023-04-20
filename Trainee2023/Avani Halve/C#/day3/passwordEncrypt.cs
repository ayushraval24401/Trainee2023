using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace day3
{
    public class passwordEncrypt
    {
        public void PasswordEncrypt()
        {
            string Filepath = @"D:\avani_html\C#\day3\password.txt";
            string password = ConfigurationManager.AppSettings["passsword"];
            string encryptedPassword = EncryptedString(password);
            using (StreamWriter writer = new StreamWriter(Filepath))
            {
                writer.WriteLine("Encrypted String: " + encryptedPassword);
            }
        }


        private static string EncryptedString(string strEncrypted)
            {
                byte[] b = System.Text.ASCIIEncoding.ASCII.GetBytes(strEncrypted);
                string encrypted = Convert.ToBase64String(b);
                return encrypted;
            }
        }
    }
