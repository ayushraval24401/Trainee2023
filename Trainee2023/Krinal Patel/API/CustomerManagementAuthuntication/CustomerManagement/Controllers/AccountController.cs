using Microsoft.AspNetCore.Mvc;
using CustomerManagement.Common;
using Customers;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CustomerManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]


    public class AccountController : ControllerBase
    {
        IConfiguration configuration;
        public AccountController(IConfiguration configurationManager) {

            configuration=configurationManager;
        }

        public string userFilePath = @"D:\Krinal Patel\API\CustomerManagementAuthuntication\Customer\Customer\Data\User.json";

        // POST api/<AccountController>
        [HttpPost]
        [Route("register")]
        public ActionResult register(User model)
        {
                var objResponse = new CommonJSONResponse();
                try
                {

                    model.UserId = Guid.NewGuid();
                    var objUser = Newtonsoft.Json.JsonConvert.SerializeObject(model);
                    var userDb = System.IO.File.ReadAllText(userFilePath);
                    var objUsers = new List<User>();
                    if (!string.IsNullOrEmpty(userDb))
                    {
                        objUsers = Newtonsoft.Json.JsonConvert.DeserializeObject<List<User>>(userDb);

                        if (objUsers != null && objUsers.Count > 0)
                        {
                            if (objUsers.Where(p => p.Email == model.Email).Count() > 0)
                            {
                                objResponse.message = "email is already exists";
                            }
                            else
                            {
                            Createuser(model, objResponse, objUsers);
                            }
                        }
                    }
                    else
                    {
                        Createuser(model, objResponse, objUsers);
                    }

                }
            catch (System.Exception e)
            {
                objResponse.message = e.Message;
            }

            return Ok(objResponse);
        }
        private void Createuser(User model, CommonJSONResponse objResponse, List<User> objUsers)
        {
            //TODO: add new user in database
            objUsers.Add(model);
            //write file or udpate file.
            System.IO.File.WriteAllText(userFilePath, Newtonsoft.Json.JsonConvert.SerializeObject(objUsers));
            objResponse.status = 1;
            objResponse.message = "register successfully.";
        }

    [HttpPost]
        [Route("login")]
        public ActionResult login(Login model)
        {
            var objResponse = new LoginResponse();
            try
            {
                var secretKey = configuration.GetSection("JWT:Development:Secret");

                var userDb = System.IO.File.ReadAllText(userFilePath);
                var objUsers = new List<User>();
                if (!string.IsNullOrEmpty(userDb))
                {
                    objUsers = Newtonsoft.Json.JsonConvert.DeserializeObject<List<User>>(userDb);
                    var objuser = objUsers.Where(p => p.Email == model.Email && p.Password == model.Password).FirstOrDefault();
                    if (objuser != null &&!string.IsNullOrEmpty(objuser.UserId.ToString()))
                    {
                        //Generate user token.
                        objResponse.access_token = CustomerManagement.Common.CommonMethods.GenerateJSONWebToken(objuser,secretKey.Value);
                        objResponse.status = 1;
                        objResponse.token_type = "Bearer";    
                        objResponse.data=objuser;
                        objResponse.message = "login successfully.";
                    }
                    else
                    {
                        //TODO : send error message to user.
                    }
                }
            }
            catch (System.Exception e)
            {
                objResponse.message = e.Message;

            }
            return Ok(objResponse);
        }

    }
}
