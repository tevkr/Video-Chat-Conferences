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
            if (String.IsNullOrEmpty(model.ConferenceName))
            {
                ModelState.AddModelError(nameof(RoomViewModel.ConferenceName), "Некорректное название");
                return View(model);
            }
            if (String.IsNullOrEmpty(model.ConferencePassword))
                model.ConferencePassword = "";
            var option = new CookieOptions();
            option.Expires = DateTime.Now.AddMinutes(5);
            Response.Cookies.Append("vccrp", model.ConferencePassword.ToString(), option);
            Guid id = Guid.NewGuid();
            SocketIoWebService.AddRoomAsync(model.ConferenceName, id.ToString(), model.ConferencePassword.ToString());
            return Redirect($"/room/{id}");
        }
        [Route("find-room")]
        public IActionResult FindRoom()
        {
            ViewData["Rooms"] = SocketIoWebService.GetAllRooms().Result;
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
            var password = Request.Cookies["vccrp"] == null ? "" : Request.Cookies["vccrp"];
            var username = Request.Cookies["vccn"];
            if (id == null || !SocketIoWebService.IsRoomExists(id.ToString()).Result) return Redirect("/error/404");
            if (SocketIoWebService.IsPasswordCorrect(id.ToString(), password).Result && !String.IsNullOrEmpty(username))
            {
                ViewData["Username"] = username;
                return View();
            }
            return Redirect($"/room/user-params/{id}");
        }
        [Route("room/user-params/{id?}")]
        public IActionResult RoomUserParams(Guid? id)
        {
            var password = Request.Cookies["vccrp"] == null ? "" : Request.Cookies["vccrp"];
            if (id == null || !SocketIoWebService.IsRoomExists(id.ToString()).Result) return Redirect("/error/404");
            if (SocketIoWebService.IsPasswordCorrect(id.ToString(), password).Result)
            {
                ViewData["Settings"] = "name";
                return View(new UserParametersViewModel());
            }
            ViewData["Settings"] = "name_password";
            return View(new UserParametersViewModel());
        }
        [HttpPost]
        [Route("room/user-params/{id?}")]
        public async Task<IActionResult> RoomUserParams(Guid? id, UserParametersViewModel model)
        {
            if (id == null || !SocketIoWebService.IsRoomExists(id.ToString()).Result) return Redirect("/error/404");
            if (String.IsNullOrEmpty(model.Password))
                model.Password = Request.Cookies["vccrp"] == null ? "" : Request.Cookies["vccrp"];
            if (String.IsNullOrEmpty(model.Name))
            {
                ModelState.AddModelError(nameof(UserParametersViewModel.Password), "Некорректное имя пользователя");
                return View(model);
            }
            if (SocketIoWebService.IsPasswordCorrect(id.ToString(), model.Password.ToString()).Result)
            {
                var option = new CookieOptions();
                option.Expires = DateTime.Now.AddMinutes(5);
                Response.Cookies.Append("vccn", model.Name.ToString(), option);
                Response.Cookies.Append("vccrp", model.Password.ToString(), option);
                return Redirect($"/room/{id}");
            }
            ModelState.AddModelError(nameof(UserParametersViewModel.Password), "Неправильный пароль");
            ViewData["Settings"] = "name_password";
            return View(model);
        }
    }
}