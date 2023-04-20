using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace day5
{
    public class xmlSerializer
    {
       public string Name;
        public int Age;
        public string City;
    }

    public class XML
    {
        static string nameFile = "D:\\avani_html\\C#\\day5\\xmlFile.json";
        public static void XMLSerializer()
        {
            Console.WriteLine("Enter name");
            var Name = Console.ReadLine();

            Console.WriteLine("Enter Age");
            int age = Convert.ToInt32(Console.ReadLine());

            Console.WriteLine("Enter City Name");
            var city = Console.ReadLine();

            var person = new Person
            {
                personName = Name,
                personAge = age,
                city = city,

            };
            var serializer = new XmlSerializer(typeof(Person));
            using (var writer = new StreamWriter(nameFile))
            { serializer.Serialize(writer, person); }
        }

    }
    public class Person
    {
        public string personName { get; set; }
        public int personAge { get; set; }
        public string city { get; set; }
    }

}
