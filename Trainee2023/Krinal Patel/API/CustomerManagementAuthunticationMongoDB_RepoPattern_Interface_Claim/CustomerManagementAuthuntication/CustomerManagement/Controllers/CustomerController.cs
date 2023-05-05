using Microsoft.AspNetCore.Mvc;
using CustomerManagement.Common;
using Microsoft.AspNetCore.Authorization;
using DataAccessLayer;
using MongoDB.Driver;
using MongoDB.Bson;
using CommonLibrary;
using DataAccessLayer.Services;

namespace CustomerManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
   public class CustomerController : ControllerBase
    {
        //private readonly IMongoCollection<Customer> _customerCollection;

        //public CustomerController(IMongoClient mongoClient)
        //{
        //    var connectionString = "mongodb://localhost:27017";
        //    var databaseName = "CustomerManagementDatabase";
        //    var collectionName = "CustomerCollection";

        //    var mongoUrl = new MongoUrl(connectionString);
        //    var clientSettings = MongoClientSettings.FromUrl(mongoUrl);
        //    var client = new MongoClient(clientSettings);
        //    var database = client.GetDatabase(databaseName);
        //    _customerCollection = database.GetCollection<Customer>(collectionName);
        //}
        CustomerRepository customerRepository = new CustomerRepository();

        [HttpGet("get-all")]
        public ActionResult GetAll()
        {

            var objResponse = new CommonJSONResponse();
            try
            {
                var customers = customerRepository.GetAllCustomers();

                if (customers != null && customers.Count > 0)
                {
                    objResponse.data = customers;
                    objResponse.message = "Records retrieved successfully..!";
                    objResponse.status = 1;
                }
                else
                {
                    objResponse.status = 0;
                    objResponse.data = new List<Customer>();
                    objResponse.message = "No Customer Data in Database..!!";

                }

            }
            catch (Exception ex)
            {
                objResponse.message = ex.Message;
                objResponse.status = 0;
            }

            return Ok(objResponse);
        }

        [HttpGet]
        public ActionResult Get(string name = "")
        {
            var objResponse = new CommonJSONResponse();
            try
            {

                var customers = customerRepository.GetCustomers();

           
                if (customers != null && customers.Count > 0)
                {
                    objResponse.data = customers;
                    objResponse.message = "Records retrieved successfully.";
                    objResponse.status = 1;
                }
                else
                {
                    objResponse.data = new List<Customer>(); 
                    objResponse.message = "Record not found.";
                }

            }
            catch (Exception ex)
            {
                objResponse.message = ex.Message;
                objResponse.status = 0;
            }

            return Ok(objResponse);
        }

        [HttpPost]
        public ActionResult Post(Customer modal)
        {

            var objResponse = new CommonJSONResponse();
            try
            {
                customerRepository.AddCustomer(modal);

                objResponse.status = 1;
                objResponse.message = "Record created successfully.";
                objResponse.data = modal;
            }
            catch (Exception ex)
            {
                objResponse.message = ex.Message;
                objResponse.status = 0;
            }

            return Ok(objResponse);
        }

        [HttpPut("{id}")]
        public ActionResult Put(string id, Customer customerIn)
        {
            var objResponse = new CommonJSONResponse();
            try
            {
                var objectId = new ObjectId(id);
                var customer = customerRepository.GetCustomerById(objectId);

                if (customer != null)
                {
                    customerIn.Id = objectId;
                    customerRepository.UpdateCustomer(customerIn);

                    objResponse.status = 1;
                    objResponse.message = "Record updated successfully.";
                    objResponse.data = customerIn;

                }
                else
                {
                    objResponse.message = "Record not found.";
                    objResponse.status = 0;
                    objResponse.data = new List<Customer>();
                }
            }
            catch (Exception ex)
            {
                objResponse.message = ex.Message;
                objResponse.status = 0;
            }

            return Ok(objResponse);
        }


        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            var objResponse = new CommonJSONResponse();
            try
            {
                long deletedCount = customerRepository.DeleteCustomer(id);

                if (deletedCount == 0)
                {
                    objResponse.message = "Record not found.";
                    objResponse.status = 0;
                    objResponse.data = new List<Customer>();
                }
                else
                {
                    objResponse.status = 1;
                    objResponse.message = "Record deleted successfully.";

                }
            }
            catch (Exception ex)
            {
                objResponse.message = ex.Message;
                objResponse.status = 0;
            }

            return Ok(objResponse);
        }

        [HttpGet]
        [Route("profile")]
        [Authorize]
        public ActionResult profile()
        {
            var objResponse = new CommonJSONResponse();
            try
            {
                string authHeader = Request.Headers["Authorization"];
                authHeader = authHeader.Replace("Bearer ", "");
                objResponse.status = 1;
                objResponse.data = CommonMethods.getEmail(authHeader);

            }
            catch (Exception ex)
            {
                objResponse.message = ex.Message;
                objResponse.status = 0;
            }
            return Ok(objResponse);

        }

    }
}