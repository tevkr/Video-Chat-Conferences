using Microsoft.AspNetCore.Mvc;
using VideoChatConferencesBackEnd.Models;
using VideoChatConferencesBackEnd.Services;

namespace VideoChatConferencesBackEnd.Controllers
{
    public class HomeController : Controller
    {
        private static List<Guid> RoomIds = new List<Guid>();
        public IActionResult Index()
        {
            return View();
        }
        [Route("create-room")]
        public IActionResult CreateRoom()
        {
            return View(new RoomViewModel());
        }
        [HttpPost]
        [Route("create-room")]
        public async Task<IActionResult> CreateRoom(RoomViewModel model)
        {
            if (ModelState.IsValid)
            {
                var option = new CookieOptions();
                option.Expires = DateTime.Now.AddDays(1);
                Response.Cookies.Append("vccrp", model.ConferencePassword.ToString(), option);
                Guid id = Guid.NewGuid();
                SocketIoWebService.AddRoomAsync(id.ToString(), model.ConferencePassword.ToString());
                return Redirect($"/room/{id}");
            }
            ModelState.AddModelError(nameof(RoomViewModel.ConferenceName), "Некорректные данные");
            return View(model);
        }
        [Route("find-room")]
        public IActionResult FindRoom()
        {
            return View();
        }
        [Route("contacts")]
        public IActionResult Contacts()
        {
            return View();
        }
        [Route("room/{id?}")]
        public IActionResult Room(Guid? id)
        {
            var password = Request.Cookies["vccrp"];
            var username = Request.Cookies["vccn"];
            if (id == null) return Redirect("/error/404");
            if (SocketIoWebService.IsPasswordCorrect(id.ToString(), password).Result && !String.IsNullOrEmpty(username))
            {
                return View();
            }
            return Redirect($"/room/user-params/{id}");
        }
        [Route("room/user-params/{id?}")]
        public IActionResult RoomUserParams(Guid? id)
        {
            var password = Request.Cookies["vccrp"];
            var username = Request.Cookies["vccn"];
            if (id == null) return Redirect("/error/404");
            if (SocketIoWebService.IsPasswordCorrect(id.ToString(), password).Result)
            {
                ViewData["Setting"] = "name";
                return View(new UserParametersViewModel());
            }
            ViewData["Setting"] = "name_password";
            return View(new UserParametersViewModel());
        }
        [HttpPost]
        [Route("room/user-params/{id?}")]
        public async Task<IActionResult> RoomUserParams(Guid? id, UserParametersViewModel model)
        {
            if (ModelState.IsValid)
            {
                var option = new CookieOptions();
                option.Expires = DateTime.Now.AddDays(1);
                Response.Cookies.Append("vccn", model.Name.ToString(), option);
                if (model.Password != null)
                {
                    Response.Cookies.Append("vccrp", model.Password.ToString(), option);
                    if (SocketIoWebService.IsPasswordCorrect(id.ToString(), model.Password.ToString()).Result)
                    {
                        return Redirect($"/room/{id}");
                    }
                }
            }
            ModelState.AddModelError(nameof(UserParametersViewModel.Password), "Некорректные данные");
            return View(model);
        }
    }
}