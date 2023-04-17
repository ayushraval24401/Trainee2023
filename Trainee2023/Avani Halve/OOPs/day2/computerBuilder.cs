using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace day2
{
    public class computerBuilder
    {
        public string brand { get; set; }

        public string price { get; set; }
        public string accessories { get; set; }
    }

    public class Brands : computerBuilder
    {
        public string brandsPrice
        {
            get
            {
                return brand;
            }
            set
            {
                string[] brandPrice = value.Split(',');
                brand = brandPrice[0];
                price = brandPrice[1]; 
            }
        }
    }
    public class Accessories : computerBuilder
    {
        public string accessoriesPrice
        {
            get
            {
                return accessories;
            }
            set
            {
                string[] brandPrice = value.Split(',');
                accessories = brandPrice[0];
                price = brandPrice[1];
            }
        }
    }
}
