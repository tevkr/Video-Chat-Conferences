using System.ComponentModel.DataAnnotations;

namespace VideoChatConferencesBackEnd.Models
{
    public class RoomViewModel
    {
        [Required]
        [Display(Name = "Название конференции")]
        public string ConferenceName { get; set; }
        [Display(Name = "Пароль")]
        [UIHint("password")]
        public string ConferencePassword { get; set; }
    }
}
