using System;

class rangeList
{
    public void RangeofList()
    {
        int[] numbers = { 1, 2, 4, 6, 7, 8, 9, 10, 12, 17, 19, 20, 21, 24, 25, 30 };
        string range = rangeNumbers(numbers);
        Console.WriteLine(range);
    }

    static string rangeNumbers(int[] numbers)
    {
        if (numbers == null || numbers.Length == 0)
        {
            return "";
        }

        Array.Sort(numbers); 
        int start = numbers[0]; 
        int end = numbers[0]; 
        string result = "";

        for (int i = 1; i < numbers.Length; i++)
        {
            if (numbers[i] == end + 1)
            {
                end = numbers[i]; 
            }
            else
            {
                result += (start == end) ? start.ToString() + "," : start.ToString() + "-" + end.ToString() + ",";
                start = numbers[i];
                end = numbers[i];
            }
        }

        result += (start == end) ? start.ToString() : start.ToString() + "-" + end.ToString();

        return result;
    }
}