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
        public static async Task AddRoomAsync(string name, string id, string password)
        {
            var hashVal = StringToMD5(id + "nom_xd_prod");
            var values = new Dictionary<string, string?>
            {
                { "name", name },
                { "roomId", id },
                { "ownerId", null },
                { "password", password },
                { "usersCount", "0" }
            };
            var content = new FormUrlEncodedContent(values);
            var response = await Client.PostAsync($"{Url}add-room?hashVal={hashVal}", content);
            var responseString = await response.Content.ReadAsStringAsync();
        }
        public static async Task<bool> SetOwnerIfNotExists(string roomId, string ownerId)
        {
            var hashVal = StringToMD5(roomId + "nom_xd_prod");
            var values = new Dictionary<string, string?>
            {
                { "roomId", roomId },
                { "ownerId", ownerId }
            };
            var content = new FormUrlEncodedContent(values);
            var response = await Client.PostAsync($"{Url}set-owner-if-not-exists?hashVal={hashVal}", content);
            var responseString = await response.Content.ReadAsStringAsync();
            if (responseString == "\"success\"")
                return true;
            else
                return false;
        }
        public static async Task<bool> IsPasswordCorrect(string roomId, string password)
        {
            var hashVal = StringToMD5(roomId + "nom_xd_prod");
            var responseString = await Client.GetStringAsync($"{Url}is-password-correct?hashVal={hashVal}&roomId={roomId}&password={password}");
            return Newtonsoft.Json.JsonConvert.DeserializeObject<bool>(responseString);
        }
        public static async Task<bool> IsOwner(string roomId, string userId)
        {
            var hashVal = StringToMD5(roomId + "nom_xd_prod");
            var responseString = await Client.GetStringAsync($"{Url}is-owner?hashVal={hashVal}&roomId={roomId}&userId={userId}");
            return Newtonsoft.Json.JsonConvert.DeserializeObject<bool>(responseString);
        }
        public static async Task<bool> IsRoomExists(string roomId)
        {
            var hashVal = StringToMD5(roomId + "nom_xd_prod");
            var responseString = await Client.GetStringAsync($"{Url}is-room-exists?hashVal={hashVal}&roomId={roomId}");
            return Newtonsoft.Json.JsonConvert.DeserializeObject<bool>(responseString);
        }
        public static async Task<List<RoomModel>?> GetAllRooms()
        {
            var responseString = await Client.GetStringAsync($"{Url}get-all-rooms");
            return Newtonsoft.Json.JsonConvert.DeserializeObject<List<RoomModel>?>(responseString);
        }
        private static string StringToMD5(string input)
        {
            using (System.Security.Cryptography.MD5 md5 = System.Security.Cryptography.MD5.Create())
            {
                byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(input);
                byte[] hashBytes = md5.ComputeHash(inputBytes);
                return Convert.ToHexString(hashBytes);
            }
        }
    }
}
