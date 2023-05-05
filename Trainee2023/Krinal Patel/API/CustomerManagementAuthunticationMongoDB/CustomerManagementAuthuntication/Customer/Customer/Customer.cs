using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DataAccess
{
    public class Customer
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public string country { get; set; }
    }
}
