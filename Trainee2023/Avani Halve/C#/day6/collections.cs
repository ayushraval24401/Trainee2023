using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace day6
{
    public class collections
    {
        public void arrayCollection()
        {
            //ArrayList class is a collection that can be used for any types or objects. 

            ArrayList arrList = new ArrayList();
            Console.WriteLine("Enter Name: ");
            string arrName = Console.ReadLine();
            Console.WriteLine("Enter Age: ");
            int arrAge = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Enter City");
            string arrCity = Console.ReadLine();

            arrList.Add(arrName);
            arrList.Add(arrAge);
            arrList.Add(arrCity);

            foreach(object i in arrList)
            {
                Console.WriteLine(i);
            }
        }

        public void hashCollection()
        {
            //HashTable is similar to arraylist but represents the items as a combination of a key and value.
            
            Hashtable hash = new Hashtable();
            Console.WriteLine("Enter Name: ");
            string hashName = Console.ReadLine();
            Console.WriteLine("Enter Age: ");
            int hashAge = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Enter City");
            string hashCity = Console.ReadLine();

            hash.Add("Name", hashName);
            hash.Add("Age", hashAge);
            hash.Add("City", hashCity);

            foreach(DictionaryEntry hashobj in hash) //DictonaryEntry: is a class whose object represents the data in a combination of key & value pairs.
            {
                Console.WriteLine(hashobj.Key + " : " + hashobj.Value);
            }
        }

        public void stackCollection()
        {
            Stack stck = new Stack();
            Console.WriteLine("Enter Name: ");
            string stckName = Console.ReadLine();
            Console.WriteLine("Enter Age: ");
            int stckAge = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Enter City");
            string stckCity = Console.ReadLine();

            stck.Push(stckName);
            stck.Push(stckAge);
            stck.Push(stckCity);
            Console.WriteLine("Name Age and City are Push in Stack");
            foreach (object i in stck)
            {
                Console.WriteLine(i);
            }

            stck.Pop();
            Console.WriteLine("Pop from Stack");
            foreach (object i in stck)
            {
                Console.WriteLine(i);
            }
        }

        public void queueCollection()
        {
            Queue queue = new Queue();
            Console.WriteLine("Enter Name: ");
            string stckName = Console.ReadLine();
            Console.WriteLine("Enter Age: ");
            int stckAge = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Enter City");
            string stckCity = Console.ReadLine();

            queue.Enqueue(stckName);
            queue.Enqueue(stckAge);
            queue.Enqueue(stckCity);
            Console.WriteLine("Name Age and City are in Queue");
            foreach (object i in queue)
            {
                Console.WriteLine(i);
            }

            queue.Dequeue();
            Console.WriteLine("Dequeue from Queue");
            foreach (object i in queue)
            {
                Console.WriteLine(i);
            }
        }

        public void listCollection()
        {
            //this are non-generic collections, in list we have to define the type

            List<int> newList = new List<int>();
            Console.WriteLine("Enter 3 numbers: ");
            for (int i = 0; i < 3; i++)
            {
                int[] number = new int[3];
                number[i] = Convert.ToInt32(Console.ReadLine());
                newList.Add(number[i]);
            }
            Console.WriteLine("-----------------------------------");
            foreach (int i in newList)
            {
                Console.WriteLine(i);
            }
        }

        public void NonGenericdictionary()
        {
            int count = 1;
            Dictionary<int, string> dictionaryVal = new Dictionary<int, string>();
            Console.WriteLine("Enter 3 names: ");
            for (int i = 0; i < 3; i++)
            {
                string[] name = new string[3];
                name[i] = Console.ReadLine();
                dictionaryVal.Add(count, name[i]);
                count++;
            }
            Console.WriteLine("-----------------------------------");
            foreach (KeyValuePair<int, string> i in dictionaryVal)
            {
                Console.WriteLine(i);
            }
        }

    }
}