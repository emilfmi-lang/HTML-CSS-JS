using ASP.NET.Models;
using Microsoft.AspNetCore.Mvc;

namespace ASP.NET.Controllers
{
    public class HomeController:Controller
    {
        // viewdata example
        Car Car = new Car { Id = 2, Make = "Toyota", Model = "Camry" };

        public IActionResult Index()
        {
            ViewData["CarId"] = 1;
            ViewBag.CarId = Car.Id;                                 
            TempData["CarId"] = 3; 

            return View();
        }
    }
}
