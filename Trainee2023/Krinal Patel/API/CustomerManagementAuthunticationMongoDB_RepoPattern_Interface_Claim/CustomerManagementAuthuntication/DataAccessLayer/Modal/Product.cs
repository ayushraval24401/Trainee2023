using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;


namespace DataAccessLayer
{
    public class Product
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)] 
        //public string Name { get; set; }
        //public string Description { get; set; }

        public ObjectId Id { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
    }
}

