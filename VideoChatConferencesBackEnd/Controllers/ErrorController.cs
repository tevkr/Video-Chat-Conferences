using Microsoft.AspNetCore.Mvc;

namespace VideoChatConferencesBackEnd.Controllers
{
    public class ErrorController : Controller
    {
        [Route("error/{statusCode}")]
        public IActionResult HttpStatusCodeHandler(int statusCode)
        {
            ViewBag.ErrorCode = statusCode;
            ViewBag.ErrorMessage = "";
            switch (statusCode)
            {
                case 404:
                    ViewBag.ErrorMessage = "Страница не найдена.";
                    break;
            }
            return View();
        }
    }
}
