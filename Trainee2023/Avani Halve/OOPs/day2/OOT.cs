using System;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.Diagnostics.Eventing.Reader;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web.UI.WebControls;

namespace day2
{
    public class task2
    {
        public class registerDetail
        {
            public string Name { get; set; }
            public string Password { get; set; }
            public string userName { get; set; }
            public bool register { get; set; }
            public string languageName { get; set; }
            public string options { get; set; }
            public string Login
            {
                get
                {
                    return $"{Name}:{Password}";
                }
                set
                {
                    string[] loginValues = value.Split(',');
                    Name = loginValues[0];
                    Password = loginValues[1];
                }
            }
            public string Register
            {
                get
                {
                    return $"{userName},{Name},{Password}";
                }
                set
                {
                    string[] registerValues = value.Split(',');
                    userName = registerValues[0];
                    Name = registerValues[1];
                    Password = registerValues[2];
                }
            }
        }
        public class OOT : registerDetail
        {
            public string OOTOptoins
            {
                get
                {
                    return options;
                }
                set
                {
                    options = value;
                }
            }
        }
        public class language : OOT
        {
            public string langaugeOption
            {
                get
                {
                    return languageName;
                }
                set
                {
                    languageName = value;
                }
            }
        }
        public class movieOption : language
        {
            public string movieOptions
            {
                get
                {
                    return languageName;
                }
                set
                {
                    languageName = value;
                }
            }
        }
    }
}
