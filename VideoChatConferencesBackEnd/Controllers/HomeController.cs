using Microsoft.AspNetCore.Mvc;
using VideoChatConferencesBackEnd.Models;

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
                Guid id = Guid.NewGuid();
                RoomIds.Add(id);
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
            if (id == null)
                return Redirect("/error/404");
            else if (!RoomIds.Contains((Guid)id))
                return Redirect("/error/404");
            return View();
        }
    }
}