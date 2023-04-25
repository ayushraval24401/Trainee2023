using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Customers
{
    public class User
    {
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
