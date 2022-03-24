using System.ComponentModel.DataAnnotations;

namespace VideoChatConferencesBackEnd.Models
{
    public class UserParametersViewModel
    {
        [Required]
        [Display(Name = "Имя пользователя")]
        public string Name { get; set; }
        [Display(Name = "Пароль")]
        [UIHint("password")]
        public string Password { get; set; }
    }
}
