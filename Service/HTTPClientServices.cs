using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web;
using WebApplication1.Models;

namespace WebApplication1.Scripts
{
    public class HTTPClientServices
    {

        public HttpClient _client = new HttpClient();
        public string _secretKey, _senderId;
       
        public List<ProductDetails> GetProductDetails()
        {
            List<ProductDetails> prodDetails = new List<ProductDetails>();
            string apiKey = "API-E26WUL81338NEZW";
            string authorization = Convert.ToBase64String(Encoding.UTF8.GetBytes(apiKey));
            // Prepare authorisation header
            _client.DefaultRequestHeaders.Accept.Clear();
            _client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
            _client.DefaultRequestHeaders.Authorization =
                    new AuthenticationHeaderValue("Bearer", authorization);
            _client.DefaultRequestHeaders.Add("api-key", "API-E26WUL81338NEZW");

            string URI = String.Format("https://alltheclouds.com.au/api/products/");
          
            HttpResponseMessage response = _client.GetAsync(URI).Result;
            if (response.IsSuccessStatusCode)
            {
                prodDetails = response.Content.ReadAsAsync<List<ProductDetails>>().Result;
            }

            return prodDetails;
        }

    }
}