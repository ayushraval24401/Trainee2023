using CommonLibrary;
using DataAccessLayer.Interface;
using MongoDB.Bson;
using MongoDB.Driver;

namespace DataAccessLayer.Services
{
    public class CustomerRepository:ICustomerService
    {
        private readonly IMongoCollection<Customer> _customerCollection;

        public CustomerRepository() 
        {
            var client = new MongoClient(AppConfiguration.connectionString);
            var database = client.GetDatabase(AppConfiguration.databaseName);
            _customerCollection = database.GetCollection<Customer>("CustomerCollection");
        }
        public List<Customer> GetCustomers()
        {

            return _customerCollection.Find(c => true).ToList();

        }     
        public List<Customer> GetAllCustomers(string name="")
        {

            return _customerCollection.Find(c => c.name.ToLower().Contains(name.ToLower())).ToList();
        }
        public void AddCustomer(Customer modal)
        {
            _customerCollection.InsertOne(modal); 
        }
        public void UpdateCustomer(Customer customer)
        {
            var filter = Builders<Customer>.Filter.Eq(c => c.Id, customer.Id);
            var update = Builders<Customer>.Update
                .Set(c => c.name, customer.name)
                .Set(c => c.email, customer.email)
                .Set(c => c.phone, customer.phone)
                .Set(c => c.country, customer.country);
            _customerCollection.UpdateOne(filter, update);
        }

        public Customer GetCustomerById(ObjectId id)
        {
            return _customerCollection.Find(c => c.Id == id).FirstOrDefault();
        }
   
        public long DeleteCustomer(string id)
        {
            var objectId = new ObjectId(id);
            var result = _customerCollection.DeleteOne(c => c.Id == objectId);
            return result.DeletedCount;
        }

    }
}
