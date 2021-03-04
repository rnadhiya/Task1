using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApplication1.Controllers
{
    public class AuthController : ApiController
    {
        public class LoginUser
        {
            public string UserName { get; set; }
            public string Password { get; set; }
            public bool Remembered { get; set; }
        }
        public class ResultInfo
        {
            public bool Success { get; set; }
            public string Message { get; set; }
            public bool IsException { get; set; }
        }
        /// <summary>
        /// Authenticate a user on the logon page
        /// </summary>
        /// <param name="user">The user's credentials</param>
        /// <param name="skipAuthMode">Flag to indicate auth mode (other than FORMS) has been skipped in the UI</param>
        /// <returns></returns>
        public HttpResponseMessage Put([FromBody] LoginUser user)
        {
            try
            {

                if (user.UserName == "admin" && user.Password == "pass")
                {
                    return Request.CreateResponse(HttpStatusCode.OK, "Login success");
                }
                else
                {                    
                    return Request.CreateResponse(HttpStatusCode.Forbidden, new ResultInfo { Success = false, Message = "Invalid username or password" });
                }            
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, string.Format("Login failed. {0}", ex));
            }

        }
    }
}
