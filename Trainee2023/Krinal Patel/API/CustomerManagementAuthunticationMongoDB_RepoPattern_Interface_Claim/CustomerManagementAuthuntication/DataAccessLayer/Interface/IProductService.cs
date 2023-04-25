using DataAccessLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interface
{
    public interface IProductService
    {
        List<Product> GetProducts();
        int Create(Product product);
        int Update(Product product);
        int Delete(Product product);

    }
}
