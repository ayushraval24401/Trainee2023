using Microsoft.AspNetCore.Mvc;
using DataAccess;
using CustomerManagement.Common;
using System.Xml.Linq;
using System.Xml;
using Newtonsoft.Json;
using Formatting = Newtonsoft.Json.Formatting;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CustomerManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        // GET: api/<CustomerController> ALL Data
        [HttpGet("get-all")]
        public ActionResult GetAll()
        {
            var objResponse = new CommonJSONResponse();
            try
            {
                //Task To be performed on 18-04-2023
                //Customer Add to list
                //GET Customer 
                //Read Customer JSON

                var json = System.IO.File.ReadAllText("D:\\Krinal Patel\\API\\CustomerManagement\\Customer\\Customer\\Data\\Customer.json");
                var customers = JsonConvert.DeserializeObject<List<Customer>>(json);

                objResponse.data = customers;
                objResponse.message = "Record Get Successfully..!!";
                objResponse.status = 1;


            }
            catch (Exception)
            {

            }

            return Ok(objResponse);
        }


        // GET: api/<CustomerController> Filter by name
        [HttpGet]
        public ActionResult Get(string email = "")
        {
            var objResponse = new CommonJSONResponse();
            try
            {
     
                var json = System.IO.File.ReadAllText("D:\\Krinal Patel\\API\\CustomerManagement\\Customer\\Customer\\Data\\Customer.json");
                var customers = JsonConvert.DeserializeObject<List<Customer>>(json);

                if (!string.IsNullOrEmpty(email))
                {
                    customers = customers.Where(c => c.email.ToLower().Contains(email.ToLower())).ToList();
                }
            

                objResponse.data = customers;
                objResponse.message = "Record Get Successfully..!!";
                objResponse.status = 1;


            }
            catch (Exception)
            {

                throw;
            }

            return Ok(objResponse);
        }


        // POST api/<CustomerController> Insert
        [HttpPost]
        public ActionResult Post(Customer modal)
        {
            var objResponse = new CommonJSONResponse();
            try
            {
                objResponse.status = 1;
                objResponse.message = "record created";
                objResponse.data = modal;

                var json = System.IO.File.ReadAllText("D:\\Krinal Patel\\API\\CustomerManagement\\Customer\\Customer\\Data\\Customer.json");

                var customers = JsonConvert.DeserializeObject<List<Customer>>(json);

                customers.Add(modal);

                var updatedJson = JsonConvert.SerializeObject(customers, Formatting.Indented);

                System.IO.File.WriteAllText("D:\\Krinal Patel\\API\\CustomerManagement\\Customer\\Customer\\Data\\Customer.json", updatedJson);
            }
            catch (System.Exception ex)
            {
                //Add log for error
            }

            return Ok(objResponse);
        }

        // PUT api/<CustomerController> Update
        [HttpPut("{name}")]
        public ActionResult Put(string name, [FromBody] Customer updatedCustomer)
        {
            var objResponse = new CommonJSONResponse();
            try
            {

                var json = System.IO.File.ReadAllText("D:\\Krinal Patel\\API\\CustomerManagement\\Customer\\Customer\\Data\\Customer.json");
                var customers = JsonConvert.DeserializeObject<List<Customer>>(json);

                var customerToUpdate = customers.FirstOrDefault(c => c.name.ToLower() == name.ToLower());

                if (customerToUpdate != null)
                {
                    customerToUpdate.name = updatedCustomer.name;
                    customerToUpdate.email = updatedCustomer.email;
                    customerToUpdate.phone = updatedCustomer.phone;
                    customerToUpdate.country = updatedCustomer.country;

                    var updatedJson = JsonConvert.SerializeObject(customers);
                    System.IO.File.WriteAllText("D:\\Krinal Patel\\API\\CustomerManagement\\Customer\\Customer\\Data\\Customer.json", updatedJson);

                    objResponse.data = customerToUpdate;
                    objResponse.message = "Record updated successfully..!!";
                    objResponse.status = 1;
                }
                else
                {
                    objResponse.message = "No customer record found with name " + name;
                    objResponse.status = 0;
                }
            }
            catch (Exception ex)
            {
                objResponse.message = ex.Message;
                objResponse.status = 0;
            }

            return Ok(objResponse);
        }

        // DELETE api/<CustomerController>/5 Delete
        [HttpDelete("{name}")]
        public ActionResult Delete(string name)
        {
            var objResponse = new CommonJSONResponse();
            try
            {
      

                var json = System.IO.File.ReadAllText("D:\\Krinal Patel\\API\\CustomerManagement\\Customer\\Customer\\Data\\Customer.json");
                var customers = JsonConvert.DeserializeObject<List<Customer>>(json);

                var customerToDelete = customers.FirstOrDefault(c => c.name.ToLower() == name.ToLower());

                if (customerToDelete != null)
                {
                    customers.Remove(customerToDelete);

                    json = JsonConvert.SerializeObject(customers, Formatting.Indented);
                    System.IO.File.WriteAllText("D:\\Krinal Patel\\API\\CustomerManagement\\Customer\\Customer\\Data\\Customer.json", json);

                    objResponse.data = customers; 
                    objResponse.message = "Record deleted successfully.";
                    objResponse.status = 1;
                }
                else
                {
                    objResponse.message = "Record not found.";
                    objResponse.status = 0;
                }
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
