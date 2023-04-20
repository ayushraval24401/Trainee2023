using System;
using System.Collections.Generic;
using System.Linq;
using System.Media;
using System.Text;
using System.Threading.Tasks;

namespace day1
{
    public class criketGame
    {
        enum runs
        {
            wide,
            noBall, 
            one, 
            two,
            three
        }

        enum actions
        {
            four,
            six,
            Out,
            bouncer
        }

        private int players { get; set; }
        public int teams {get; set; }
        public void Criketgame()
        {
            players = 25;
            int substitute_player = 5;
            Console.WriteLine("Total Number of Players " + players + " With Substitute players " + substitute_player);
        }

        private void TeamPlayers()
        {
            Console.WriteLine("Total Number of Players: " + players);
            Console.WriteLine("Total number of teams: " + teams);
        }
        
        public void score ()
        {
            List<runs> totalRuns = new List<runs>();
            totalRuns.Add((runs) 0); // add one 
            foreach(runs run in totalRuns)
            {
                Console.WriteLine(run);
            }
           // Console.WriteLine("runs: " + totalRuns.Count);

            List<actions> runActions = new List<actions>();
            runActions.AddRange(Enum.GetValues(typeof(actions)).Cast<actions>()); // add all
            foreach(actions action in runActions)
            {
                Console.WriteLine(action);
            }
        }
    }

    public class players
    {
        public string name { get; set; }    
        public double runs { get; set; }
        public double strikeRate { get; set; }
        public double average { get; set; }
        public void Players()
        {
            List<players> playersDetail = new List<players>();
            playersDetail.Add(new players { name = "John", runs = 42, strikeRate = 115, average = 55 });
            playersDetail.Add(new players { name = "Alex", runs = 21, strikeRate = 130, average = 30 });
            playersDetail.Add(new players { name = "Jack", runs = 60, strikeRate = 145, average = 75 });
        }
    }
}
