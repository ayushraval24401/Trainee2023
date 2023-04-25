﻿using Microsoft.Extensions.Configuration;

namespace CommonLibrary
{
    public static class AppConfiguration
    {
        public static string connectionString = string.Empty;
        public static string databaseName = string.Empty;

        public static string ValidAudience = string.Empty;
        public static string ValidIssuer = string.Empty;
        public static string Secret = string.Empty;

        static AppConfiguration()
        {
            var configurationBuilder = new ConfigurationBuilder();
            var currentDirectory = Directory.GetCurrentDirectory();
            var path = Path.Combine(currentDirectory, "appsettings.json");
            configurationBuilder.AddJsonFile($"{path}");
            var root = configurationBuilder.Build();
            connectionString = root.GetSection("DatabaseSettings").GetSection("ConnectionString").Value;
            databaseName = root.GetSection("DatabaseSettings").GetSection("DatabaseName").Value;
            ValidAudience = root.GetSection("JWT").GetSection("Development").GetSection("ValidAudience").Value;
            ValidIssuer = root.GetSection("JWT").GetSection("Development").GetSection("ValidIssuer").Value;
            Secret = root.GetSection("JWT").GetSection("Development").GetSection("Secret").Value;

        
        }
    }
}