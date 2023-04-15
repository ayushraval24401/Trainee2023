using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace day2
{
    public class generalStore
    {
        public int price;
        public int quantity;
        public string name;

    }
    public class rowMaterial : generalStore
    {
        public string material
        {
            get
            {
                return $"{name},{quantity}";
            }
            set
            {
                string[] material = value.Split(',');
                name = material[0];
                int inputQuantity;
                if (int.TryParse(material[1], out inputQuantity))
                {
                    quantity = inputQuantity;
                }
                int inputPrice;
                if (int.TryParse(material[1], out inputPrice))
                {
                    price = inputPrice;
                }
            }
        }
        public void displayPrice(string typeName)
        {
            Console.WriteLine(typeName);
        }
        public void displayPrice()
        {
            Console.WriteLine("Grocery");
        }
        public void displayPrice(int typePrice)
        {
            Console.WriteLine(typePrice);
        }

    }

    public class Price : rowMaterial
    {
        public void displayPrice()
        {

            if (name == "Grocery")
            {
                displayPrice();
            }
            else
            {
                displayPrice(price);
            }
        }
    }
}
