import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { useParams } from "react-router-dom";

function VideoPlayer({ user }) {
  const { permlink } = useParams();
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null); // Error state
  const platformWallet = "cryptostream";

  useEffect(() => {
    // Reset error and video state when permlink changes
    setError(null);
    setVideo(null);

    if (!permlink) {
      setError("Invalid parameters: No permlink provided");
      console.error("Invalid parameters: permlink is undefined");
      return;
    }

    // Fetch video data
    fetch(`http://localhost:5000/api/videos?permlink=${permlink}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch video: ${res.status}`);
        return res.json();
      })
      .then((videos) => {
        const v = Array.isArray(videos) ? videos.find((vid) => vid.permlink === permlink) : videos;
        if (!v) throw new Error(`Video with permlink ${permlink} not found`);
        console.log("Fetched video data:", v); // Debug: Log fetched video
        setVideo(v);
      })
      .catch((err) => {
        console.error("Video fetch error:", err.message);
        setError(`Failed to load video: ${err.message}`);
      });
  }, [permlink]);

  useEffect(() => {
    if (video && videoRef.current) {
      const videoUrl = `https://ipfs.io/ipfs/${video.cid}`; // Primary IPFS source
      const fallbackUrl = video.torrent || ""; // Fallback to torrent if available

      // Initialize or update video.js player
      if (!playerRef.current) {
        playerRef.current = videojs(videoRef.current, {
          controls: true,
          sources: [
            { src: videoUrl, type: "video/mp4" },
            ...(fallbackUrl ? [{ src: fallbackUrl, type: "video/mp4" }] : []),
          ],
          fluid: true,
          preload: "auto",
        }, () => {
          console.log("Player initialized with source:", videoUrl);
        });

        // Add error handling for video.js
        playerRef.current.on("error", () => {
          const errorMsg = "Failed to play video. The IPFS CID or torrent may be unavailable.";
          console.error(errorMsg, playerRef.current.error());
          setError(errorMsg);
        });
      } else {
        playerRef.current.src([
          { src: videoUrl, type: "video/mp4" },
          ...(fallbackUrl ? [{ src: fallbackUrl, type: "video/mp4" }] : []),
        ]);
        playerRef.current.load();
        playerRef.current.play().catch((err) => {
          console.error("Playback error:", err);
          setError("Failed to play video: " + err.message);
        });
      }

      // Fetch comments
      fetch(`http://localhost:5000/api/comments/${video.author}/${permlink}`)
        .then((res) => res.json())
        .then(setComments)
        .catch((err) => console.error("Comments fetch error:", err));
    }

    // Cleanup on unmount or video change
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [video, permlink]);

  const donate = () => {
    if (!user || !video) return alert("Login and select a video");
    window.hive_keychain.requestTransfer(
      user,
      video.author,
      "1.000 HIVE",
      "Donation",
      (err) => {
        if (!err) {
          window.hive_keychain.requestTransfer(
            user,
            platformWallet,
            "0.050 HIVE",
            "Platform fee (5%)",
            (err) => {
              if (!err) alert("Donated 1 HIVE!");
              else alert("Platform fee transfer failed");
            }
          );
        } else alert("Donation failed: " + err.message);
      }
    );
  };

  const subscribe = () => {
    if (!user || !video) return alert("Login and select a video");
    window.hive_keychain.requestTransfer(
      user,
      video.author,
      "5.000 HBD",
      "Subscription",
      (err) => {
        if (!err) {
          window.hive_keychain.requestTransfer(
            user,
            platformWallet,
            "0.250 HBD",
            "Platform fee (5%)",
            (err) => {
              if (!err) alert("Subscribed for 5 HBD!");
              else alert("Platform fee transfer failed");
            }
          );
        } else alert("Subscription failed: " + err.message);
      }
    );
  };

  const submitComment = () => {
    if (!user || !newComment || !video) return alert("Login, select a video, and enter a comment");
    fetch("http://localhost:5000/api/reward-points", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user, activity: "comment" }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message))
      .catch((err) => alert("Error rewarding points: " + err.message));

    setComments([...comments, { author: user, body: newComment, permlink: `${permlink}-comment-${Date.now()}` }]);
    setNewComment("");
  };

  return (
    <div className="container mx-auto p-4 bg-white rounded shadow">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : video ? (
        <>
          <h2 className="text-2xl font-semibold mb-2">{video.title}</h2>
          <div data-vjs-player>
            <video ref={videoRef} className="video-js vjs-default-skin" controls preload="auto" />
          </div>
          <div className="mt-4 flex space-x-2">
            <button onClick={donate} className="bg-blue-600 text-white px-4 py-2 rounded">
              Donate 1 HIVE
            </button>
            <button onClick={subscribe} className="bg-green-500 text-white px-4 py-2 rounded">
              Subscribe (5 HBD)
            </button>
            {video.torrent && (
              <a
                href={video.torrent}
                className="bg-gray-500 text-white px-4 py-2 rounded"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Torrent
              </a>
            )}
          </div>
          <h3 className="mt-4 font-semibold">Comments</h3>
          {comments.map((c) => (
            <p key={c.permlink} className="mt-2">
              {c.author}: {c.body}
            </p>
          ))}
          {user && (
            <div className="mt-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment"
                className="p-2 border rounded w-full"
              />
              <button onClick={submitComment} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
                Comment
              </button>
            </div>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default VideoPlayer;