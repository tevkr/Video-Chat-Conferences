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

var MD5 = function (d) { var r = M(V(Y(X(d), 8 * d.length))); return r.toLowerCase() }; function M(d) { for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++)_ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _); return f } function X(d) { for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++)_[m] = 0; for (m = 0; m < 8 * d.length; m += 8)_[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32; return _ } function V(d) { for (var _ = "", m = 0; m < 32 * d.length; m += 8)_ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255); return _ } function Y(d, _) { d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _; for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) { var h = m, t = f, g = r, e = i; f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551), m = safe_add(m, h), f = safe_add(f, t), r = safe_add(r, g), i = safe_add(i, e) } return Array(m, f, r, i) } function md5_cmn(d, _, m, f, r, i) { return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m) } function md5_ff(d, _, m, f, r, i, n) { return md5_cmn(_ & m | ~_ & f, d, _, r, i, n) } function md5_gg(d, _, m, f, r, i, n) { return md5_cmn(_ & f | m & ~f, d, _, r, i, n) } function md5_hh(d, _, m, f, r, i, n) { return md5_cmn(_ ^ m ^ f, d, _, r, i, n) } function md5_ii(d, _, m, f, r, i, n) { return md5_cmn(m ^ (_ | ~f), d, _, r, i, n) } function safe_add(d, _) { var m = (65535 & d) + (65535 & _); return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m } function bit_rol(d, _) { return d << _ | d >>> 32 - _ }
function getHash() {
    var roomId = document.URL.split('/').pop();
    return MD5(roomId + 'nom_xd_prod');
}

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
            socket.emit("ready", getHash());
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
    socket.emit("join-room", roomId, userId, id, username, getHash());
    joinRoomEmitted = true;
    if (successCallbackFromMediaDevides && joinRoomEmitted && !readyCalled) {
        socket.emit("ready", getHash());
        readyCalled = true;
    }
});

const addVideoStream = (video, stream, peerId) => {
    video.srcObject = stream;
    video.setAttribute("id", peerId);
    video.onclick = function () { videoClickHandler(this.id) };
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
        socket.emit("message", text.value, getHash());
        text.value = "";
    }
});

text.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && text.value.length !== 0) {
        socket.emit("message", text.value, getHash());
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
var ccb = document.getElementById("closeConferenceButton");
var mu = document.getElementById("muteUnmute");
var oo = document.getElementById("offOn");
if (ccb != null) {
    ccb.onclick = function () { closeConf() };
}
if (mu != null) {
    mu.onclick = function () { muteUnmuteButtonHandler() };
}
if (oo != null) {
    oo.onclick = function () { offOnButtonHandler() };
}

function muteUnmuteButtonHandler() {
    var muteUnmuteButton = document.getElementById('muteUnmute');
    var peerId = muteUnmuteButton.getAttribute("name");
    socket.emit("mute-unmute", peerId, getHash());
    var adminAudioVideoPeer = adminAudioVideoPeers.find(function (value, index) {
        if (value.peerId == peerId)
            return true;
    });
    adminAudioVideoPeer.micMuted = !adminAudioVideoPeer.micMuted;
    muteUnmuteButton.classList.toggle("icon-microphone", !adminAudioVideoPeer.micMuted);
    muteUnmuteButton.classList.toggle("icon-microphone-slash", adminAudioVideoPeer.micMuted);
}
function offOnButtonHandler() {
    var offOnButton = document.getElementById('offOn');
    var peerId = offOnButton.getAttribute("name");
    socket.emit("on-off", peerId, getHash());
    var adminAudioVideoPeer = adminAudioVideoPeers.find(function (value, index) {
        if (value.peerId == peerId)
            return true;
    });
    adminAudioVideoPeer.camOffed = !adminAudioVideoPeer.camOffed;
    offOnButton.classList.toggle("icon-videocam", !adminAudioVideoPeer.camOffed);
    offOnButton.classList.toggle("icon-videocam_off", adminAudioVideoPeer.camOffed);
}
function closeConf() {
    socket.emit("close-room", getHash());
}

function videoClickHandler(peerId) {
    if (ccb != null && peerId != peer._id) {
        var myModal = new bootstrap.Modal(document.getElementById('muteUnmuteModal'));
        var muteUnmuteButton = document.getElementById('muteUnmute');
        var offOnButton = document.getElementById('offOn');
        muteUnmuteButton.setAttribute("name", peerId);
        offOnButton.setAttribute("name", peerId);
        var adminAudioVideoPeer = adminAudioVideoPeers.find(function (value, index) {
            if (value.peerId == peerId)
                return true;
        });
        muteUnmuteButton.classList.toggle("icon-microphone", !adminAudioVideoPeer.micMuted);
        muteUnmuteButton.classList.toggle("icon-microphone-slash", adminAudioVideoPeer.micMuted);
        offOnButton.classList.toggle("icon-videocam", !adminAudioVideoPeer.camOffed);
        offOnButton.classList.toggle("icon-videocam_off", adminAudioVideoPeer.camOffed);
        myModal.show();
    }
}