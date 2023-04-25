using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Customers;
using Microsoft.Extensions.Configuration;

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
    }
}
