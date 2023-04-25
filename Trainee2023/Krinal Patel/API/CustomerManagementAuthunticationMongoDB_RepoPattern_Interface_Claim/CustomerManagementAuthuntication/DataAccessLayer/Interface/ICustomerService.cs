using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interface
{
    public interface ICustomerService
    {

        List<Customer> GetCustomers();
        List<Customer> GetAllCustomers(string name = "");
        void AddCustomer(Customer modal);
        void UpdateCustomer(Customer customer);
        Customer GetCustomerById(ObjectId id);
        long DeleteCustomer(string id);

    }
}
