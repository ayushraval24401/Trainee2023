using System;
using static OOP_Practice.ROI_Calc;
using static OOP_Practice.Uber;

namespace OOP_Practice
{
    internal class Program
    {
        public class Player
        {
     
         //Encapsulation : Encapsulation is the process of hiding internal details of an object from the outside world and providing a public interface for accessing it.
         //Here data members of Player class is kept private but getter and setter methods of it is kept public for open access..  
         
            private string name = "KP";
            private int runs;

            public string Name                                  //Name getter setter is Public
            {
                get { return name; }
                set { name = value; }
            }

            public int Runs                                    //Run getter setter is Public
            {
                get { return runs; }
                set { runs = value; }
            }

      

        }
        class Team : Player                     //Player is base class and it is inherited by Team class that makes use of Name property of Player class 
        {
            private new Player Name
           
            { get
                {
                        return Name;
                } }

            //Overloading   : Method with same name but Different Parameters
            public void Play(string team1, string team2)                                            
            {
                Console.WriteLine("{0} vs {1} - Let the game begin!", team1, team2);
            }

            public void Play(string team1, string team2, int overs)
            {
                Console.WriteLine("{0} vs {1} - {2} overs game starts now!", team1, team2, overs);
            }


        }

        static void Main(string[] args)
        {
            //CRICKET
            Team team = new Team();

            //Inheritance
            Console.WriteLine("Player Name (Inherited) : "+team.Name);

            //Overloading : It takes the method as per the parameters passed

            team.Play("India","Pakistan");
            team.Play("Australia", "India", 50);
            Console.ReadLine();



            //UBER
            Driver driver = new Driver();

            //Inheritance
            Console.WriteLine("Uber Customer Name (Inherited) : " + driver.CName);
            Console.WriteLine("Uber Customer Region (Inherited) : " + driver.Region);
            Console.ReadLine();

            //ROI CALCULATOR
            InputValues calc = new InputValues();
            Console.ReadLine();



        }
    }
}


