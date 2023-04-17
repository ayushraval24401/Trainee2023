using System;
using System.Collections.Generic;
using System.Linq;

namespace Matrimonial
{
    internal class Users
    {
        static List<User> users = new List<User>();

        static void Main(string[] args)
        {
            while (true)
            {
                Console.WriteLine("\n-------------- Matrimonial Management System ---------------");
                Console.WriteLine("1. Insert Users");
                Console.WriteLine("2. Display All Users");
                Console.WriteLine("3. Find your Match");
                Console.WriteLine("0. Exit");
                Console.Write("Please Enter your choice : ");
                int choice = Convert.ToInt32(Console.ReadLine());

                switch (choice)
                {
                    case 1:
                        AddUser();
                        break;
                    case 2:
                        DisplayAllUsers();
                        break;
                    case 3:
                        MatchUsers();
                        break;
                    case 0:
                        Environment.Exit(0);
                        break;
                    default:
                        Console.WriteLine("Invalid choice! Please try again.");
                        break;
                }
            }
        }

        public enum Gender
        {
            Male,
            Female
        }
        public enum Religion
        {
            Hindu,
            Muslim,
            Jain,
            Christian
        }
        public abstract class Person
        {
            public string Name { get; set; }
            public Gender Gender { get; set; }
            public Religion Religion { get; set; }
            public long Age { get; set; }
            public string Hobbies { get; set; }
        }

        public class User : Person
        {
            public double PhoneNo { get; set; }
        }

        static void AddUser()
        {
            Console.Write("Name: ");
            string name = Console.ReadLine();

            Console.Write("Gender (0 for Male, 1 for Female): ");
            Gender gender = (Gender)Convert.ToInt32(Console.ReadLine());

            Console.Write("Religion (0 for Hindu, 1 for Muslim, 2 for Jain, 3 for Christian): ");
            Religion religion = (Religion)Convert.ToInt32(Console.ReadLine());

            Console.Write("Age: ");
            long age = Convert.ToInt64(Console.ReadLine());

            Console.Write("Phone No: ");
            double phoneNo = Convert.ToDouble(Console.ReadLine());

            Console.Write("Hobbies: ");
            string hobbies = Console.ReadLine();

            User user = new User()
            {
                Name = name,
                Gender = gender,
                Religion = religion,
                Age = age,
                PhoneNo = phoneNo,
                Hobbies = hobbies
            };

            users.Add(user);
            Console.WriteLine("User added successfully!");
        }

        static void DisplayAllUsers()
        {
            Console.WriteLine("\n--------------------- List of Users ----------------------");
            foreach (User user in users)
            {
                Console.WriteLine($"Name: {user.Name}, Gender: {user.Gender}, Religion: {user.Religion}, Age: {user.Age}, Phone No: {user.PhoneNo}, Hobbies: {user.Hobbies}");
            }
        }
        static void MatchUsers()
        {
            Console.Write("Enter user name: ");
            string userName = Console.ReadLine();

            User user = users.FirstOrDefault(u => u.Name.Equals(userName, StringComparison.OrdinalIgnoreCase));

            if (user == null)
            {
                Console.WriteLine($"User {userName} not found!");
                return;
            }

            List<User> matches = GetMatches(user);

            Console.WriteLine("\n------------------ Matching Users ------------------");
            foreach (User match in matches)
            {
                Console.WriteLine($"Name: {match.Name}, Age: {match.Age}, Religion: {match.Religion}, Phone No: {match.PhoneNo}, Hobbies: {match.Hobbies}");
            }
        }

        static List<User> GetMatches(User user)
        {
            List<User> matches = new List<User>();

            foreach (User match in users)
            {
                if (match != user && match.Religion == user.Religion && match.Age == user.Age)
                {
                    matches.Add(match);
                }
            }

            return matches;
        }


    }
}
