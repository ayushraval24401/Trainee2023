using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using CustomerManagement.Common;
using DataAccessLayer;
using DataAccessLayer.Services;
using CommonLibrary;

namespace CustomerManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        AccountRepository accountRepository = new AccountRepository();

        //private readonly IMongoCollection<User> _usersCollection;

        //public AccountController(IConfiguration configuration)
        //{
        //    var connectionString = configuration.GetConnectionString("MongoDB");
        //    var client = new MongoClient(connectionString);
        //    var databaseName = "CustomerManagementDatabase";
        //    var collectionName = "UserCollection"; 
        //    var database = client.GetDatabase(databaseName);

        //    _usersCollection = database.GetCollection<User>(collectionName);
        //}

        [HttpPost]
        [Route("register")]
        public ActionResult Register(User model)
        {
            var objResponse = new CommonJSONResponse();
            try
            {
                var existingUser = accountRepository.IsEmailExists(model);
                if (existingUser != null)
                {
                    objResponse.message = "Email is already exists";
                    objResponse.data = new List<User>(); 
                }
                else
                {
                    model.UserId = Guid.NewGuid();
                    accountRepository.RegisterNew(model);
                    objResponse.status = 1;
                    objResponse.message = "Registration successful..!";
                    objResponse.data = new List<User>();
                }
            }
            catch (Exception e)
            {
                objResponse.message = e.Message;
            }
            return Ok(objResponse);
        }

        [HttpPost]
        [Route("login")]
        public ActionResult Login(Login model, [FromServices] IConfiguration configuration)
        {
            var objResponse = new LoginResponse();
            try
            {
                //var secretKey = configuration.GetSection("JWT:Development:Secret");
                //var ValidIssuer = configuration.GetSection("JWT:Development:ValidIssuer");
                //var ValidAudience = configuration.GetSection("JWT:Development:ValidAudience");

                var user = accountRepository.LoginUser(model);
                if (user != null)
                {
                    objResponse.access_token = CommonMethods.GenerateJSONWebToken(user, AppConfiguration.Secret, AppConfiguration.ValidAudience, AppConfiguration.ValidIssuer);;
                    objResponse.status = 1;
                    objResponse.token_type = "Bearer";
                    objResponse.data = user;
                    objResponse.message = "Login Successfull..!!";
                }
                else
                {
                    objResponse.message = "Invalid Credentials..!!";
                }
            }
            catch (Exception e)
            {
                objResponse.message = e.Message;
            }
            return Ok(objResponse);
        }
    }
}
