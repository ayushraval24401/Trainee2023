using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace day7
{
    public class integerList
    {
        public void IntegerList()
        {
            List<int> list = integerlist(new List<int>(new int[] {5,6,10,2,9}));
            foreach (int i in list)
            {
                Console.WriteLine(i);
            }
        }
        public static List<int> integerlist(List<int> numbers)
        {
            IEnumerable<int> newList = numbers.Select(num => 5 * (num + 2));
            return newList.ToList();
        }
    }
}
