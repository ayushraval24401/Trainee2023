namespace CustomerManagement.Common
{
    public class CommonJSONResponse
    {
        public int status { get; set; }
        public string message { get; set; }
        public dynamic data { get; set; }
    }
}
