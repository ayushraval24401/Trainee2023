using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

using Newtonsoft.Json;
using static serializerJson;

public class serializerJson
{
    static string nameFile = "D:\\avani_html\\C#\\day5\\jsonFile.json";

    public void jsonSerailizer()
    {
        Console.WriteLine("Enter name");
        var Name = Console.ReadLine();

        Console.WriteLine("Enter Age");
        int age = Convert.ToInt32(Console.ReadLine());

        Console.WriteLine("Enter City Name");
        var CityName = Console.ReadLine();

        Console.WriteLine("Enter Population");
        int population = Convert.ToInt32(Console.ReadLine());

        var person = new Person
        {
            personName = Name,
            personAge = age,
            City = new City { cityName = CityName, cityPopulation = population }

        };

        string jsoncovert = JsonConvert.SerializeObject(person);
        File.WriteAllText(nameFile, jsoncovert);

        serializerJson jsonReadWrite = new serializerJson();
        Console.WriteLine(jsonReadWrite.ToString());
    }

    public override string ToString()
    {
        if (File.Exists(nameFile))
        {
            string jsonString = File.ReadAllText(nameFile);
            Person person1 = JsonConvert.DeserializeObject<Person>(jsonString);
            return $"Person Name: {person1.personName} , Person Age : {person1.personAge}, Person City : {person1.City.cityName}, Person City Population : {person1.City.cityPopulation}";
        }

        else
        {
            Console.WriteLine("File Does Not Exist");
            return "";
        }
    }
}
    public class Person
    {
        public string personName { get; set; }
        public int personAge { get; set; }
        public City City { get; set; }
    }

    public class City
    {
        public string cityName { get; set; }
        public int cityPopulation { get; set; }
    }
