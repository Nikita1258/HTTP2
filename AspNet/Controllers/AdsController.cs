using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace AspNet.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AdsController : ControllerBase
    {
        public static List<Ad> ads = new List<Ad>();
        private readonly ILogger<AdsController> _logger;

        public AdsController(ILogger<AdsController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Ad> GetAds()
        {
            return ads.ToArray();
        }

        [HttpPost]
        public ActionResult<Ad> AddEditAd(Ad ad)
        {
            if(ad.Id == -1)
            {
                ad.Id = ads.Count > 0 ? ads[ads.Count - 1].Id + 1 : 0;
                ads.Add(ad);
            }
            else
            {
                Ad a = ads.Find(t => t.Id == ad.Id);
                if(a == null)
                    return BadRequest();
                a.Text = ad.Text;
                a.Author = ad.Author;
                a.Contacts = ad.Contacts;
                a.Date = ad.Date;
            }
            return ad;
        }

        [HttpDelete]
        public ActionResult DeleteAd(IEnumerable<int> del)
        {
            foreach(int i in del)
                ads.RemoveAt(ads.FindIndex(t => t.Id == i));
            return Ok();
        }
    }
}
