using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DataAccessLayer;
using Microsoft.Extensions.Configuration;
using Amazon.Runtime.Internal;

namespace CustomerManagement.Common
{
    public static class CommonMethods
    {

        public static string GenerateJSONWebToken(User user, string secret,string ValidAudience, string ValidIssuer)
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, $"{user.Email}"),
                new Claim(ClaimTypes.NameIdentifier, $"{user.UserId}"),
                new Claim(ClaimTypes.Role,$"Admin"),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),

            };
            var tokeOptions = new JwtSecurityToken(
                issuer: ValidIssuer,
                audience: ValidAudience,
                claims: authClaims,
                expires: DateTime.UtcNow.AddMinutes(59),
                signingCredentials: signinCredentials
            );
            return new JwtSecurityTokenHandler().WriteToken(tokeOptions);
        }
        public static string getEmail(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            
            var jsonToken = handler.ReadToken(token);
            var tokenS = handler.ReadToken(token) as JwtSecurityToken;
            var Email = tokenS.Claims.First(claim => claim.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name").Value;
            return Email;
        }  
        public static string GetRole(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            
            var jsonToken = handler.ReadToken(token);
            var tokenS = handler.ReadToken(token) as JwtSecurityToken;
            var Role = tokenS.Claims.First(claim => claim.Type == "Role").Value;
            return Role;
        }
    }
}
