using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Day6_Tasks
{
    internal class Program
    {
        static void Main(string[] args)
        {
            do
            {
                Console.WriteLine("\n------------------------- MENU ---------------------------\n");

                Console.WriteLine("1. NG ArrayList ");
                Console.WriteLine("2. NG Hashtable ");
                Console.WriteLine("3. NG SortedList");
                Console.WriteLine("4. NG Stack");
                Console.WriteLine("5. NG Queue");
                Console.WriteLine("6. G List");
                Console.WriteLine("7. G Dictionary");
                Console.WriteLine("8. G SortedList");
                Console.WriteLine("9. G Stack");
                Console.WriteLine("10. G Queue");
                Console.WriteLine("0. Exit");

                Console.WriteLine("\n--------------------------------------------------------\n");
                Console.Write("Enter Your Choice : ");

                var task = Convert.ToInt32(Console.ReadLine());

                switch (task)
                {
                    case 1:

                        try
                        {
                            //Arraylist is a class that is similar to an array, but it can be used to store values of various types.
                            //An Arraylist doesn't have a specific size.
                            //Any number of elements can be stored.
                            
                            //Declaring ArrayList
                            ArrayList al = new ArrayList();

                            //3 Types of data is entered in ARRAYLIST
                            string name = "Krinal Patel";
                            int age = 23;
                            double income = 5.6;                

                            al.Add(name);
                            al.Add(age);
                            al.Add(income);
                            foreach (object o in al)
                            {
                                Console.WriteLine(o);           //printing from the ArrayList 
                            }
                        }
                        catch (Exception)
                        {
                            Console.WriteLine("Something Went Wrong ! Please Restart the menu by pressing Enter..");
                        }

                        Console.ReadLine(); //waits for enter button to be pressed to exit console

                        break;

                    case 2:

                        try
                        {
                            //HashTable is similar to arraylist but represents the items as a combination of a key and value

                            //Declaring Hashtable
                            Hashtable ht = new Hashtable();

                            ht.Add("Krinal", "Unjha");
                            ht.Add("Shivam", "Mehsana"); 
                            ht.Add("Marshil", "Palanpur");
                            ht.Add("Renish", "Siddhpur");

                            foreach (DictionaryEntry h in ht)               //DictonaryEntry is a class whose object represents the data in a combination of key & value pairs.
                            {
                                Console.WriteLine(h.Key + " " + h.Value);           //printing from the Hashtable 
                            }
                        }
                        catch (Exception)
                        {
                            Console.WriteLine("Something Went Wrong ! Please Restart the menu by pressing Enter..");
                        }

                        Console.ReadLine(); //waits for enter button to be pressed to exit console

                        break;


                    case 3:

                        try
                        {
                            //SortedList arranges all the items in sorted order.
                            //Declaring SortedList                         
                            SortedList sl = new SortedList();

                            sl.Add("zb", "Zukerberg");
                            sl.Add("ai", "ArtificialIntelligence");
                            sl.Add("tb", "terabyte");
                            sl.Add("kp", "krinalpatel");

                            foreach (DictionaryEntry s in sl)               //DictonaryEntry is a class whose object represents the data in a combination of key & value pairs.
                            {
                                Console.WriteLine(s.Key + " " + s.Value);           //printing from the SortedList 
                            }
                        }
                        catch (Exception)
                        {
                            Console.WriteLine("Something Went Wrong ! Please Restart the menu by pressing Enter..");
                        }

                        Console.ReadLine(); //waits for enter button to be pressed to exit console

                        break;

                    case 4:

                        try
                        {
                            //stack is a LIFO (last in first out) data structure
                            //Declaring Stack                         
                            Stack stk = new Stack();

                            stk.Push("KP 1st Element");
                            stk.Push("MP 2nd Element");
                            stk.Push("SP 3rd Element");
                            stk.Push("RP 4th Element");

                            foreach (object s in stk)              
                            {
                                Console.WriteLine(s);           //printing from the stack 
                            }
                        }
                        catch (Exception)
                        {
                            Console.WriteLine("Something Went Wrong ! Please Restart the menu by pressing Enter..");
                        }

                        Console.ReadLine(); //waits for enter button to be pressed to exit console

                        break;

                    case 5:

                        try
                        {
                            //Queue is a FIFO (last in first out) data structure
                            //Declaring Queue                         
                            Queue que = new Queue();
                        
                            que.Enqueue("E1");
                            que.Enqueue("E2");
                            que.Enqueue("E3");
                            que.Enqueue("E4");

                            foreach (object q in que)               //DictonaryEntry is a class whose object represents the data in a combination of key & value pairs.
                            {
                                Console.WriteLine(q);           //printing from the Queue 
                            }

                        }
                        catch (Exception)
                        {
                            Console.WriteLine("Something Went Wrong ! Please Restart the menu by pressing Enter..");
                        }

                        Console.ReadLine(); //waits for enter button to be pressed to exit console

                        break;

                    case 6:

                        try
                        {
                            //Specific type
                            //Array Size is not fixed
                            //Elements can be added / removed at runtime.
                            //Declaring Generic List                         
                           
                            List<int> l = new List<int>();

                            l.Add(100);
                            l.Add(200);
                            l.Add(300);
                            l.Add(400);
                            
                            foreach (object q in l)             
                            {
                                Console.WriteLine(q);           //printing from the List 
                            }

                        }
                        catch (Exception)
                        {
                            Console.WriteLine("Something Went Wrong ! Please Restart the menu by pressing Enter..");
                        }

                        Console.ReadLine(); //waits for enter button to be pressed to exit console

                        break;

                    case 7:

                        try
                        {
                            //Specific type
                            //Array Size is not fixed
                            //Elements can be added / removed at runtime.
                            //Declaring Generic Dictionary                         

                            Dictionary<int, string> dct = new Dictionary<int, string>();

                            dct.Add(1, "cs.net");
                            dct.Add(2, "vb.net");
                            dct.Add(3, "vb.net");
                            dct.Add(4, "vb.net");

                            foreach (KeyValuePair<int,string> kvp  in dct)               //KeyValuePair is a class whose object represents the data in a combination of key & value pairs.
                            {
                                Console.WriteLine(kvp.Key + " " + kvp.Value);           //printing from the Dictionary 
                            }

                        }
                        catch (Exception)
                        {
                            Console.WriteLine("Something Went Wrong ! Please Restart the menu by pressing Enter..");
                        }

                        Console.ReadLine(); //waits for enter button to be pressed to exit console

                        break;

                    case 8:

                        try
                        {
                            //Specific type
                            //Array Size is not fixed
                            //Elements can be added / removed at runtime.
                            //Declaring Generic Sorted List                         

                            SortedList<string, string> sl = new SortedList<string, string>();
                            sl.Add("ora", "oracle");
                            sl.Add("vb", "vb.net");
                            sl.Add("cs", "cs.net");
                            sl.Add("asp", "asp.net");


                            foreach (KeyValuePair<string, string> kvp in sl)  //KeyValuePair is a class whose object represents the data in a combination of key & value pairs.
                            {
                                Console.WriteLine(kvp.Key + " " + kvp.Value);           //printing from the SortedList 
                            }

                        }
                        catch (Exception)
                        {
                            Console.WriteLine("Something Went Wrong ! Please Restart the menu by pressing Enter..");
                        }

                        Console.ReadLine(); //waits for enter button to be pressed to exit console

                        break;
                    case 9:
                        try
                        {
                            //Specific type
                            //Array Size is not fixed
                            //Elements can be added / removed at runtime.
                            //Declaring Generic Stack                         

                            Stack<string> stk = new Stack<string>();
                            stk.Push("cs.net");
                            stk.Push("vb.net");
                            stk.Push("asp.net");
                            stk.Push("sqlserver");



                            foreach (string s in stk)

                            {
                                Console.WriteLine(s);           //printing from the Stack 
                            }

                        }
                        catch (Exception)
                        {
                            Console.WriteLine("Something Went Wrong ! Please Restart the menu by pressing Enter..");
                        }
                        Console.ReadLine(); //waits for enter button to be pressed to exit console

                        break;
                    case 10:
                        try
                        {
                            //Specific type
                            //Array Size is not fixed
                            //Elements can be added / removed at runtime.
                            //Declaring Generic Queue                         

                            Queue<string> q = new Queue<string>();

                            q.Enqueue("cs.net");
                            q.Enqueue("vb.net");
                            q.Enqueue("asp.net");
                            q.Enqueue("sqlserver");

                            foreach (string s in q)

                            {
                                Console.WriteLine(s);           //printing from the Queue 
                            }

                        }
                        catch (Exception)
                        {
                            Console.WriteLine("Something Went Wrong ! Please Restart the menu by pressing Enter..");
                        }
                        Console.ReadLine(); //waits for enter button to be pressed to exit console

                        break;
                    case 0:
                        Environment.Exit(1);// exit

                        break;

                    default:
                        Console.WriteLine("Please Enter 1 to 10");
                        Console.ReadLine(); //waits for enter button to be pressed to exit console
                        break;

                }

            }
            while (true);
        }
    }
}
