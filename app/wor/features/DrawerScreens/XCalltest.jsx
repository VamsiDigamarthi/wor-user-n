import {
  Button,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
// import ScreenAppBar from "../../utiles/ScreenAppBar/ScreenAppBar";
import io from "socket.io-client";
import {
  RTCPeerConnection,
  RTCSessionDescription,
  RTCIceCandidate,
  mediaDevices,
} from "react-native-webrtc";
import { socketUrl } from "../../../../Constants/url";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";

const orderId = "your-room-id";

export default function AudioCalling({ userType = "captain" }) {
  const socket = useRef(null);
  const peerConnection = useRef(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [callStatus, setCallStatus] = useState("Waiting to start call...");
  const [callTimer, setCallTimer] = useState(0);
  const [isCallActive, setIsCallActive] = useState(false);
  const timerRef = useRef(null);
  const iceCandidateQueue = useRef([]);

  useEffect(() => {
    socket.current = io(`${socketUrl}/calling`, { transports: ["websocket"] });
    console.log(`Connecting as ${userType} to orderId: ${orderId}`);
    socket.current.emit("calling-connected", { orderId, userType });

    initPeerConnection();

    socket.current.on("receive-offer", handleReceiveOffer);
    socket.current.on("receive-answer", handleReceiveAnswer);
    socket.current.on("receive-ice-candidate", handleReceiveIceCandidate);
    socket.current.on("call-stopped", handleCallStopped);
    socket.current.on("call-started", handleCallStarted);

    return () => cleanup();
  }, []);

  const initPeerConnection = () => {
    if (peerConnection.current) peerConnection.current.close();
    peerConnection.current = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
      ],
    });

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("Sending ICE candidate:", event.candidate);
        socket.current.emit("send-ice-candidate", {
          orderId,
          candidate: event.candidate,
          userType,
        });
      }
    };

    peerConnection.current.ontrack = (event) => {
      console.log("Received remote stream:", event.streams);
      if (event.streams && event.streams[0]) {
        setRemoteStream(event.streams[0]);
      }
    };

    peerConnection.current.oniceconnectionstatechange = () => {
      console.log(
        "ICE Connection State:",
        peerConnection.current.iceConnectionState
      );
    };
  };

  const requestAudioPermission = async () => {
    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: "Microphone Permission",
            message:
              "This app needs access to your microphone for audio calls.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const result = await request(PERMISSIONS.IOS.MICROPHONE);
        return result === RESULTS.GRANTED;
      }
    } catch (err) {
      console.warn("Permission request error:", err);
      return false;
    }
  };

  const startLocalAudioStream = async () => {
    const hasPermission = await requestAudioPermission();
    if (!hasPermission) {
      setCallStatus("Microphone permission denied");
      return;
    }

    try {
      const stream = await mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      console.log("Local stream acquired:", stream);
      setLocalStream(stream);
      stream.getTracks().forEach((track) => {
        console.log("Adding track:", track);
        peerConnection.current.addTrack(track, stream);
      });
      return stream;
    } catch (error) {
      console.error("Error getting audio stream:", error);
      setCallStatus("Failed to get audio stream");
    }
  };

  const startCall = async () => {
    try {
      initPeerConnection();
      const stream = await startLocalAudioStream();
      if (!stream) return;

      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      console.log("Sending offer:", offer);

      socket.current.emit("send-offer", { orderId, offer, userType });
      socket.current.emit("start-call", { orderId, userType });

      setCallStatus("Calling...");
      setIsCallActive(true);
    } catch (error) {
      console.error("Start call error:", error);
      setCallStatus("Failed to start call");
    }
  };

  const handleReceiveOffer = async ({ offer }) => {
    console.log("Received offer:", offer);
    initPeerConnection();
    const stream = await startLocalAudioStream();
    if (!stream) return;

    await peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(offer)
    );

    const answer = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(answer);
    console.log("Sending answer:", answer);

    socket.current.emit("send-answer", { orderId, answer, userType });

    setCallStatus("Audio Call in Progress");
    setIsCallActive(true);
    startCallTimer();

    while (iceCandidateQueue.current.length > 0) {
      const candidate = iceCandidateQueue.current.shift();
      await peerConnection.current.addIceCandidate(candidate);
    }
  };

  const handleReceiveAnswer = async ({ answer }) => {
    console.log("Received answer:", answer);
    await peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(answer)
    );
    setCallStatus("Audio Call in Progress");
    startCallTimer();
  };

  const handleReceiveIceCandidate = async ({ candidate }) => {
    console.log("Received ICE candidate:", candidate);
    const iceCandidate = new RTCIceCandidate(candidate);
    if (peerConnection.current.remoteDescription) {
      await peerConnection.current.addIceCandidate(iceCandidate);
    } else {
      iceCandidateQueue.current.push(iceCandidate);
    }
  };

  const startCallTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(
      () => setCallTimer((prev) => prev + 1),
      1000
    );
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const stopCall = () => {
    console.log("Stopping call");
    socket.current.emit("stop-call", { orderId, userType });
    cleanup();
    resetCallState();
  };

  const handleCallStopped = () => {
    console.log("Call stopped by remote");
    cleanup();
    resetCallState();
  };

  const handleCallStarted = () => {
    console.log("Call started by remote");
    setCallStatus("Incoming Call...");
    setIsCallActive(true);
  };

  const cleanup = () => {
    if (peerConnection.current) peerConnection.current.close();
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
    }
    if (remoteStream) setRemoteStream(null);
    clearInterval(timerRef.current);
  };

  const resetCallState = () => {
    setCallStatus("Call ended");
    setIsCallActive(false);
    setCallTimer(0);
  };

  return (
    // <ScreenAppBar title={`Calling as ${userType}`} isPositionAppbar={false}>
    <View style={styles.container}>
      <Text>React Native Audio-Only WebRTC App</Text>
      <View style={styles.callInfo}>
        <Text style={styles.callStatus}>{callStatus}</Text>
        {isCallActive && (
          <Text style={styles.callTimer}>{formatTime(callTimer)}</Text>
        )}
      </View>
      <View style={styles.controls}>
        {!isCallActive ? (
          <Button title="Start Call" onPress={startCall} />
        ) : (
          <Button title="Stop Call" onPress={stopCall} />
        )}
      </View>
      <Text>{remoteStream ? "Remote audio connected" : "No remote audio"}</Text>
    </View>
    // </ScreenAppBar>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  controls: { marginTop: 20 },
  callInfo: { alignItems: "center", marginVertical: 20 },
  callStatus: { fontSize: 18, fontWeight: "bold" },
  callTimer: { fontSize: 24, marginTop: 10 },
});
