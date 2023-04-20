using System;
using System.Collections.Generic;


namespace OTT
{
    internal class Program
    {
        // Interface
        interface Platform
        {
            void Netflix(); // interface method (does not have a body)
            void Prime(); 
        }

        // Pig "implements" the IAnimal interface
        class OTTNET : Platform
        {
            public void Netflix()
            {
                // The body of animalSound() is provided here
                Console.WriteLine("Welcome To NetFlix");
            }
            public void Prime()
            {
                // The body of animalSound() is provided here
                Console.WriteLine("Welcome To Prime");
            }
        }
        

        class Mains
        {
            static void Main(string[] args)
            {
                OTTNET ott = new OTTNET();  // Create a Pig object
                ott.Netflix();
                ott.Prime();
                Console.ReadKey();
            }
        }
    }
}




