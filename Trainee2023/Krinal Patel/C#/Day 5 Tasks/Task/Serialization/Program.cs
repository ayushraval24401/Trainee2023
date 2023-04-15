using InheritanceTask1;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using System.Xml.Serialization;

namespace InheritanceTask1
{
    public class City
    {
        public string Name { get; set; }
        public double Population { get; set; }

        // Define a ToString() method to format the City object as a string
        public override string ToString()
        {
            return $"City : {Name} \npopulation : {Population}";
        }
    }
    public class Person
    {

        public string Name { get; set; }
        public int Age { get; set; }
        public City City { get; set; }

        public override string ToString()
        {
            return $"Name : {Name} \nAge : {Age}\n {City}";
        }

    }

   
    public class Program
    {

        static void Main(string[] args)
        {

            Console.Write("Enter your Name : ");
            string name = Console.ReadLine();

            Console.Write("Enter your Age : ");
            int age = int.Parse(Console.ReadLine());

            Console.Write("Enter your City : ");
            string cityName = Console.ReadLine();

            Console.Write("Enter your City's population : ");
            double population = double.Parse(Console.ReadLine());

            // Create a Person object with the input values
            var city = new City { Name = cityName, Population = population };
            var person = new Person { Name = name, Age = age, City = city };


            Console.Write("Press Enter for JSON Serialization");
            Console.ReadLine();
            Console.WriteLine("--------------- Serialization Implementation ----------------");


            string jsonData = JsonConvert.SerializeObject(person);
            Console.WriteLine("--------------- JSON Serialize ----------------");
            Console.WriteLine(jsonData);

            string fileName1 = @"D:\C# Krinal Patel\Day 5 Tasks\Files\KPJSON1.json";

            if (File.Exists(fileName1))
            {
                File.Delete(fileName1);
            }

            using (StreamWriter sw = File.CreateText(fileName1))
            {
                sw.WriteLine(jsonData);
            }
            Console.WriteLine("JSON File is serialized successfully..!!");

            Person p2 = JsonConvert.DeserializeObject<Person>(jsonData);
            Console.WriteLine("--------------- JSON Deserialize ----------------");

            Console.WriteLine("Reading from the file..");
            string jsonDataFromFile = File.ReadAllText(fileName1);
            Person p3 = JsonConvert.DeserializeObject<Person>(jsonDataFromFile);

            Console.WriteLine("Name : "+p3.Name);
            Console.WriteLine("Age : "+p3.Age);
            Console.WriteLine(p3.City);

            Console.WriteLine("Press Enter for XML Serialization");

            Console.ReadLine() ;

            Console.WriteLine("--------------- XML serialization ----------------");

            XmlSerializer serializer = new XmlSerializer(typeof(Person));
            string fileName2 = @"D:\C# Krinal Patel\Day 5 Tasks\Files\KPXML1.xml";

            using (FileStream stream = new FileStream(fileName2, FileMode.Create))
            {
                serializer.Serialize(stream, p3);
            }

            Console.WriteLine("XML file is serialized successfully..!!");

            Console.WriteLine("--------------- XML Deserialization ----------------");

            using (StreamReader reader = new StreamReader(fileName2))
            {
                Person p4 = (Person)serializer.Deserialize(reader);
                Console.WriteLine("Name : "+p4.Name);
                Console.WriteLine("Age : "+p4.Age);
                Console.WriteLine(p4.City);
            }
            Console.ReadLine();

        }
    }
}
