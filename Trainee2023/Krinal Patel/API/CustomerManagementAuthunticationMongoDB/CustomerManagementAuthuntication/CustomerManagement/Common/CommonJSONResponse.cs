namespace CustomerManagement.Common
{
    public class CommonJSONResponse
    {
        public int status { get; set; }
        public string message { get; set; }
        public dynamic data { get; set; }
    }

    public class LoginResponse : CommonJSONResponse
    {
        public string access_token { get; set; }
        public string token_type { get; set; }
    }

}
