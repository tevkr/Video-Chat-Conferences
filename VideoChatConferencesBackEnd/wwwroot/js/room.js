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
navigator.mediaDevices
    .getUserMedia({
        audio: true,
        video: true,
    })
    .then((stream) => {
        successCallbackFromMediaDevides = true;
        myVideoStream = stream;
        addVideoStream(myVideo, stream, peer._id);
        peer.on("call", (call) => {
            call.answer(stream);
            const video = document.createElement("video");
            call.on("stream", (userVideoStream) => {
                addVideoStream(video, userVideoStream, call.peer);
            });
        });
        socket.emit("ready");
        socket.on("user-connected", (peerId) => {
            connectToNewUser(peerId, stream);
        });
        socket.on("user-disconnected", (peerId) => {
            removeVideoStream(peerId);
        });
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
    socket.emit("join-room", roomId, id, username);
    if (successCallbackFromMediaDevides) {
        setTimeout(function () {
            socket.emit("ready");
        }, 500);
    }
});

const addVideoStream = (video, stream, peerId) => {
    video.srcObject = stream;
    video.setAttribute("id", peerId);
    video.addEventListener("dblclick", videodblclickHandler);
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
const inviteButton = document.querySelector("#inviteButton");
const muteButton = document.querySelector("#muteButton");
const stopVideo = document.querySelector("#stopVideo");
muteButton.addEventListener("click", () => {
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    if (enabled) {
        myVideoStream.getAudioTracks()[0].enabled = false;
        html = `<i class="ic icon-microphone-slash"></i>`;
        muteButton.classList.toggle("background-red");
        muteButton.innerHTML = html;
    } else {
        myVideoStream.getAudioTracks()[0].enabled = true;
        html = `<i class="ic icon-microphone"></i>`;
        muteButton.classList.toggle("background-red");
        muteButton.innerHTML = html;
    }
});
stopVideo.addEventListener("click", () => {
    const enabled = myVideoStream.getVideoTracks()[0].enabled;
    if (enabled) {
        myVideoStream.getVideoTracks()[0].enabled = false;
        html = `<i class="ic icon-videocam_off"></i>`;
        stopVideo.classList.toggle("background-red");
        stopVideo.innerHTML = html;
    } else {
        myVideoStream.getVideoTracks()[0].enabled = true;
        html = `<i class="ic icon-videocam"></i>`;
        stopVideo.classList.toggle("background-red");
        stopVideo.innerHTML = html;
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