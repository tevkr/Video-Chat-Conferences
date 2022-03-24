using VideoChatConferencesBackEnd.Models;

namespace VideoChatConferencesBackEnd.Services
{
    public class SocketIoWebService
    {
        public static string Url { get; }
        private static readonly HttpClient Client = new HttpClient();
        static SocketIoWebService()
        {
            Url = "https://socket-io-web-service.herokuapp.com/";
        }
        public static async void AddRoomAsync(string name, string id, string password)
        {
            var values = new Dictionary<string, string?>
            {
                { "name", name },
                { "roomId", id },
                { "ownerId", null },
                { "password", password },
                { "usersCount", "0" }
            };
            var content = new FormUrlEncodedContent(values);
            var response = await Client.PostAsync($"{Url}add-room", content);
            var responseString = await response.Content.ReadAsStringAsync();
        }
        public static async Task<bool> IsPasswordCorrect(string roomId, string password)
        {
            var responseString = await Client.GetStringAsync($"{Url}is-password-correct?roomId={roomId}&password={password}");
            return Newtonsoft.Json.JsonConvert.DeserializeObject<bool>(responseString);
        }
        public static async Task<bool> IsRoomExists(string roomId)
        {
            var responseString = await Client.GetStringAsync($"{Url}is-room-exists?roomId={roomId}");
            return Newtonsoft.Json.JsonConvert.DeserializeObject<bool>(responseString);
        }
        public static async Task<List<RoomModel>?> GetAllRooms()
        {
            var responseString = await Client.GetStringAsync($"{Url}get-all-rooms");
            return Newtonsoft.Json.JsonConvert.DeserializeObject<List<RoomModel>?>(responseString);
        }
    }
}
