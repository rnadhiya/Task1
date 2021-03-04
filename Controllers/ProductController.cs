using System.Collections;
using System.Web.Http;
using WebApplication1.Scripts;


namespace WebApplication1.Controllers
{
    public class ProductController : ApiController
    {
        HTTPClientServices _clientService = new HTTPClientServices();

        [Route("api/product/GetProductDetails")]
        [HttpGet]
        public IEnumerable GetProductDetails()
        {

            var productList = _clientService.GetProductDetails();

            return productList;
        }


    }

}

