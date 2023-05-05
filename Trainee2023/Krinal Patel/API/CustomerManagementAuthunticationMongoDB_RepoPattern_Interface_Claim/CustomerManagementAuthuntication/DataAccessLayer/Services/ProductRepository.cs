using CommonLibrary;
using DataAccessLayer.Interface;
using DataAccessLayer;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Services
{
    public class ProductRepository : IProductService
    {

        private readonly IMongoCollection<Product> _productCollection;

        public ProductRepository()
        {
            var client = new MongoClient(AppConfiguration.connectionString);
            var database = client.GetDatabase(AppConfiguration.databaseName);
            _productCollection = database.GetCollection<Product>("ProductCollection");
        }

        public List<Product> GetProducts()
        {
        
            return _productCollection.Find(c => true).ToList();

        }   

        public int Create(Product product)
        {
            throw new NotImplementedException();
        }

        public int Update(Product product)
        {
            throw new NotImplementedException();
        }

        public int Delete(Product product)
        {
            throw new NotImplementedException();
        }
    }
}
