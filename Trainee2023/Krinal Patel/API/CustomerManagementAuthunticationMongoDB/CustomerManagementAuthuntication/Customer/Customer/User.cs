using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Customers
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public Guid UserId { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Country { get; set; }
    }
    public class Login
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
