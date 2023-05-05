using CommonLibrary;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace DataAccessLayer.Services
{
    public class AccountRepository
    {
        private readonly IMongoCollection<User> _userCollection;

        public AccountRepository() 
        {
            var client = new MongoClient(AppConfiguration.connectionString);
            var database = client.GetDatabase(AppConfiguration.databaseName);
            _userCollection = database.GetCollection<User>("User");
        }
        public User RegisterEmail(User model)
        {

             return _userCollection.Find(u => u.Email == model.Email).FirstOrDefault();

        }
        public void RegisterNew (User model) {
            _userCollection.InsertOne(model);
        }

        public User LoginUser(Login model)
        {
            return _userCollection.Find(u => u.Email == model.Email && u.Password == model.Password).FirstOrDefault();
        }
    }
}
