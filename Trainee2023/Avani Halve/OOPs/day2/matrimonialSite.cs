using System;
using System.Collections.Generic;
using System.Diagnostics.Eventing.Reader;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace day2
{
    public enum gender
    {
        male,
        female,
    }
    public class matrimonialSite
    {
        public bool login;
        public string userName;
        public string email;
        public string address;
        public string city;
        public string password;
        public gender gender;
        public int id;

    }
    public class accounts : matrimonialSite
    {

        public void Login()
        {
            login = true;
            while (true)
            {
                Console.WriteLine("You can check out the feed!");
            }
        }
        public void register()
        {
            if (login == true)
            {
                Console.WriteLine("Enter UserName");
                userName = Console.ReadLine();
                Console.WriteLine("Enter Password");
                password = Console.ReadLine();
                Login();
            }
            else
            {
                Console.WriteLine("Enter UserName");
                userName = Console.ReadLine();
                Console.WriteLine("Enter Email Address");
                email = Console.ReadLine();
                Console.WriteLine("Enter Address");
                address = Console.ReadLine();
                Console.WriteLine("Enter City Name");
                city = Console.ReadLine();
                Console.WriteLine("Enter Gender(male/female)");
                while (true)
                {
                    string inputGender = Console.ReadLine();
                    if (Enum.TryParse(inputGender, out gender))
                    {
                        break;
                    }
                    Console.WriteLine("Invalid input. Please try again.");
                }
            }
        }
    }
    public class search : accounts
    {
        public void SearchPartner()
        {
            Console.WriteLine("Search by Name or by Id (1/2)");
            int choice = Convert.ToInt32(Console.ReadLine());
            if(choice == 1)
            {
                Console.WriteLine("Enter Name");
                userName = Console.ReadLine();
                Search(userName);
            }
            else
            {
                Console.WriteLine("Enter ID");
                id = Convert.ToInt32(Console.ReadLine());
                Search(id);
            }
        }
        public void Search(string name)
        {
            userName = name;
            Console.WriteLine(userName);
        }
        public void Search( int Id)
        {
            id = Id;
            Console.WriteLine(Id);
        }
    }
}
