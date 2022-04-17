using Microsoft.AspNetCore.Mvc;
using VideoChatConferencesBackEnd.Models;
using VideoChatConferencesBackEnd.Services;

namespace VideoChatConferencesBackEnd.Controllers
{
    public class HomeController : Controller
    {
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
            if (String.IsNullOrEmpty(model.ConferenceName) || model.ConferenceName.Length > 30)
            {
                ModelState.Clear();
                ModelState.AddModelError(nameof(RoomViewModel.ConferenceName), "Некорректное название");
                return View(model);
            }
            if (model.ConferencePassword?.Length > 15)
            {
                ModelState.AddModelError(nameof(RoomViewModel.ConferencePassword), "Некорректный пароль");
                return View(model);
            }
            if (String.IsNullOrEmpty(model.ConferencePassword))
            {
                model.ConferencePassword = "";
            }
            Response.Cookies.Append("vccrp", model.ConferencePassword.ToString());
            Guid id = Guid.NewGuid();
            await Task.WhenAll(SocketIoWebService.AddRoomAsync(model.ConferenceName, id.ToString(), model.ConferencePassword.ToString()));
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
            var username = Request.Cookies["vccun"];
            var roomId = Request.Cookies["vccri"];
            var isRoomExists = SocketIoWebService.IsRoomExists(id.ToString()).Result;
            var isPasswordCorrect = SocketIoWebService.IsPasswordCorrect(id.ToString(), password).Result;
            if (id == null || !isRoomExists) return Redirect("/error/404");
            if (roomId != null && roomId == id.ToString() && isPasswordCorrect)
            {
                ViewData["Username"] = username;
                ViewData["UserId"] = Request.Cookies["vccui"];
                var setOwnerResult = SocketIoWebService.SetOwnerIfNotExists(id.ToString(), Request.Cookies["vccui"]).Result;
                var isOwner = SocketIoWebService.IsOwner(id.ToString(), Request.Cookies["vccui"]).Result;
                ViewData["IsOwner"] = isOwner;
                return View();
            }
            return Redirect($"/room/user-params/{id}");
        }
        [Route("room/user-params/{id?}")]
        public IActionResult RoomUserParams(Guid? id)
        {
            var password = Request.Cookies["vccrp"] == null ? "" : Request.Cookies["vccrp"];
            var isRoomExists = SocketIoWebService.IsRoomExists(id.ToString()).Result;
            var isPasswordCorrect = SocketIoWebService.IsPasswordCorrect(id.ToString(), password).Result;
            if (id == null || !isRoomExists) return Redirect("/error/404");
            if (isPasswordCorrect)
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
            var password = Request.Cookies["vccrp"] == null ? "" : Request.Cookies["vccrp"];
            var isRoomExists = SocketIoWebService.IsRoomExists(id.ToString()).Result;
            if (id == null || !isRoomExists) return Redirect("/error/404");
            if (String.IsNullOrEmpty(model.Password)) model.Password = password;
            if (String.IsNullOrEmpty(model.Name) || model.Name.Length > 10)
            {
                ModelState.Clear();
                ModelState.AddModelError(nameof(UserParametersViewModel.Password), "Некорректное имя пользователя");
                return View(model);
            }
            if (model.Password?.Length > 15)
            {
                ModelState.AddModelError(nameof(RoomViewModel.ConferencePassword), "Некорректный пароль");
                return View(model);
            }
            var isPasswordCorrect = SocketIoWebService.IsPasswordCorrect(id.ToString(), model.Password).Result;
            if (isPasswordCorrect)
            {
                Response.Cookies.Append("vccun", model.Name.ToString());
                Response.Cookies.Append("vccrp", model.Password.ToString());
                Response.Cookies.Append("vccri", id.ToString());
                if (String.IsNullOrEmpty(Request.Cookies["vccui"]))
                    Response.Cookies.Append("vccui", Guid.NewGuid().ToString());
                return Redirect($"/room/{id}");
            }
            ModelState.AddModelError(nameof(UserParametersViewModel.Password), "Неправильный пароль");
            ViewData["Settings"] = "name_password";
            return View(model);
        }
        [Route("room/closed")]
        public IActionResult Closed()
        {
            return View();
        }
        [Route("room/already-connected")]
        public IActionResult AlreadyConnected()
        {
            return View();
        }
    }
}