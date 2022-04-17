localStorage.openpages = Date.now();
var onLocalStorageEvent = function (e) {
    if (e.key == "openpages") {
        localStorage.page_available = Date.now();
    }
    if (e.key == "page_available") {
        window.location.href = "already-connected";
    }
};
window.addEventListener('storage', onLocalStorageEvent, false);

const socket = io('socket-io-web-service.herokuapp.com');
const peer = new Peer(undefined, {
    host: 'peer-js-web-service.herokuapp.com',
    port: 443,
    path: '/peerjs'
});
const videoGrid = document.getElementById("video-grid");
const myVideo = document.createElement("video"); myVideo.muted = true;
let myVideoStream;
var successCallbackFromMediaDevides = false;
var joinRoomEmitted = false;
var readyCalled = false;
navigator.mediaDevices
    .getUserMedia({
        audio: true,
        video: true,
    })
    .then((stream) => {
        
        myVideoStream = stream;
        addVideoStream(myVideo, stream, peer._id);
        peer.on("call", (call) => {
            call.answer(stream);
            const video = document.createElement("video");
            call.on("stream", (userVideoStream) => {
                addVideoStream(video, userVideoStream, call.peer);
            });
        });
        socket.on("users-table", (users) => {
            for (var i = 0; i < users.length; i++) {
                adminAudioVideoPeers.push({ peerId: users[i].peerId, micMuted: users[i].micMuted, camOffed: users[i].camOffed });
            }
        });
        socket.on("user-data", (user) => {
            if (user.micMuted) {
                adminSwitchAudio(user.peerId);
            }
            if (user.camOffed) {
                adminSwitchVideo(user.peerId);
            }
        });
        socket.on("user-connected", (user, peerId) => {
            adminAudioVideoPeers.push({ peerId: user.peerId, micMuted: user.micMuted, camOffed: user.camOffed });
            connectToNewUser(peerId, stream);
        });
        socket.on("close-room", (user, peerId) => {
            window.location.href = "closed";
        });
        socket.on("user-disconnected", (user, peerId) => {
            adminAudioVideoPeers = adminAudioVideoPeers.filter(function (value, index, arr) {
                return value.peerId != user.peerId;
            });
            removeVideoStream(peerId);
        });
        socket.on("user-data", (connectedUser) => {
            removeVideoStream(peerId);
        });
        socket.on("on-off", (peerId) => {
            adminSwitchVideo(peerId);
        });
        socket.on("mute-unmute", (peerId) => {
            adminSwitchAudio(peerId);
        });
        successCallbackFromMediaDevides = true;
        if (successCallbackFromMediaDevides && joinRoomEmitted && !readyCalled) {
            socket.emit("ready");
            readyCalled = true;
        }
    });

const connectToNewUser = (peerId, stream) => {
    const call = peer.call(peerId, stream);
    const video = document.createElement("video");
    call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream, peerId);
    });
};



peer.on("open", (id) => {
    var roomId = document.URL.split('/').pop();
    socket.emit("join-room", roomId, userId, id, username);
    joinRoomEmitted = true;
    if (successCallbackFromMediaDevides && joinRoomEmitted && !readyCalled) {
        socket.emit("ready");
        readyCalled = true;
    }
});

const addVideoStream = (video, stream, peerId) => {
    video.srcObject = stream;
    video.setAttribute("id", peerId);
    video.setAttribute("onclick", "videoClickHandler(this.id)");
    video.addEventListener("loadedmetadata", () => {
        video.play();
        videoGrid.append(video);
    });
};

const removeVideoStream = (peerId) => {
    let videoEl = document.getElementById(peerId);
    if (videoEl) {
        const tracks = videoEl.srcObject.getTracks();
        tracks.forEach(function (track) {
            track.stop();
        });
        videoEl.srcObject = null;
        videoEl.parentNode.removeChild(videoEl);
    }
};

//---------------------------AUDIO/VIDEO STOP/UNSTOP---------------------------
var isAudioEnabled = true;
var isVideoEnabled = true;
const inviteButton = document.querySelector("#inviteButton");
const muteButton = document.querySelector("#muteButton");
const stopVideo = document.querySelector("#stopVideo");
muteButton.addEventListener("click", () => {
    if (!audioAdministrativelyBlocked) {
        if (myVideoStream.getAudioTracks()[0].enabled) {
            myVideoStream.getAudioTracks()[0].enabled = false;
            html = `<i class="ic icon-microphone-slash"></i>`;
            muteButton.classList.toggle("background-red");
            muteButton.innerHTML = html;
        }
        else {
            myVideoStream.getAudioTracks()[0].enabled = true;
            html = `<i class="ic icon-microphone"></i>`;
            muteButton.classList.toggle("background-red");
            muteButton.innerHTML = html;
        }
        isAudioEnabled = myVideoStream.getAudioTracks()[0].enabled;
    }
});
stopVideo.addEventListener("click", () => {
    if (!videoAdministrativelyBlocked) {
        if (myVideoStream.getVideoTracks()[0].enabled) {
            myVideoStream.getVideoTracks()[0].enabled = false;
            html = `<i class="ic icon-videocam_off"></i>`;
            stopVideo.classList.toggle("background-red");
            stopVideo.innerHTML = html;
        }
        else {
            myVideoStream.getVideoTracks()[0].enabled = true;
            html = `<i class="ic icon-videocam"></i>`;
            stopVideo.classList.toggle("background-red");
            stopVideo.innerHTML = html;
        }
        isVideoEnabled = myVideoStream.getVideoTracks()[0].enabled;
    }
});


//---------------------------MESSAGES---------------------------
let text = document.querySelector("#chatMessage");
let send = document.getElementById("send");
let messages = document.querySelector(".messages");

send.addEventListener("click", (e) => {
    if (text.value.length !== 0) {
        socket.emit("message", text.value);
        text.value = "";
    }
});

text.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && text.value.length !== 0) {
        socket.emit("message", text.value);
        text.value = "";
    }
});

socket.on("createMessage", (message, senderUsername) => {
    messages.innerHTML =
        messages.innerHTML +
        `<div class="message">
        <b><i class="ic icon-user"></i> <span> ${senderUsername === username ? "me" : senderUsername
        }</span> </b>
        <span>${message}</span>
    </div>`;
});


//---------------------------INVITE---------------------------
inviteButton.addEventListener("click", (e) => {
    prompt(
        "Copy this link and send it to people you want to meet with",
        window.location.href
    );
});


//---------------------------MOBILE GRID---------------------------
const backBtn = document.querySelector(".back");
const showChat = document.querySelector("#showChat");
backBtn.addEventListener("click", () => {
    document.querySelector(".main-right").style.display = null;
    document.querySelector(".main-right").style.flex = null;
    document.querySelector(".main-left").style.display = null;
    document.querySelector(".back").style.display = null;
});

showChat.addEventListener("click", () => {
    document.querySelector(".main-right").style.display = "flex";
    document.querySelector(".main-right").style.flex = "1";
    document.querySelector(".main-left").style.display = "none";
    document.querySelector(".back").style.display = "block";
});

//---------------------------ADMIN SECTION---------------------------
var adminAudioVideoPeers = [];
var audioAdministrativelyBlocked = false;
var videoAdministrativelyBlocked = false;
const adminSwitchAudio = (peerId) => {
    if (peerId == peer._id) {
        audioAdministrativelyBlocked = !audioAdministrativelyBlocked;
    }
    if (audioAdministrativelyBlocked) {
        myVideoStream.getAudioTracks()[0].enabled = false;
        html = `<i class="ic icon-microphone-slash"></i>`;
        muteButton.classList.toggle("background-admin", true);
        muteButton.classList.toggle("background-red", false);
        muteButton.innerHTML = html;
    }
    else {
        if (!isAudioEnabled) {
            myVideoStream.getAudioTracks()[0].enabled = false;
            html = `<i class="ic icon-microphone-slash"></i>`;
            muteButton.classList.toggle("background-admin", false);
            muteButton.classList.toggle("background-red", true);
            muteButton.innerHTML = html;
        }
        else {
            myVideoStream.getAudioTracks()[0].enabled = true;
            html = `<i class="ic icon-microphone"></i>`;
            muteButton.classList.toggle("background-admin", false);
            muteButton.classList.toggle("background-red", false);
            muteButton.innerHTML = html;
        }
    }
};

const adminSwitchVideo = (peerId) => {
    if (peerId == peer._id) {
        videoAdministrativelyBlocked = !videoAdministrativelyBlocked;
    }
    if (videoAdministrativelyBlocked) {
        myVideoStream.getVideoTracks()[0].enabled = false;
        html = `<i class="ic icon-videocam_off"></i>`;
        stopVideo.classList.toggle("background-admin", true);
        stopVideo.classList.toggle("background-red", false);
        stopVideo.innerHTML = html;
    }
    else {
        if (!isVideoEnabled) {
            myVideoStream.getVideoTracks()[0].enabled = false;
            html = `<i class="ic icon-videocam_off"></i>`;
            stopVideo.classList.toggle("background-admin", false);
            stopVideo.classList.toggle("background-red", true);
            stopVideo.innerHTML = html;
        }
        else {
            myVideoStream.getVideoTracks()[0].enabled = true;
            html = `<i class="ic icon-videocam"></i>`;
            stopVideo.classList.toggle("background-admin", false);
            stopVideo.classList.toggle("background-red", false);
            stopVideo.innerHTML = html;
        }
    }
};