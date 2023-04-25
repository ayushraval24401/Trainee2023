using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace day2
{
    abstract class MobilePhone
    {
        public void Calling();
        public void SendSMS();
    }
    class Samsung : MobilePhone { }
    class VIVO : MobilePhone
    {
        public void FMRadio();
        public void MP3();
        public void Camera();
    }
    class BlackBerry : MobilePhone
    {
        public void FMRadio();
        public void MP3();
        public void Camera();
        public void Recording();
        public void ReadAndSendEmails();
    }
}
