// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Home from "./components/Home";
// import NFTMarket from "./components/NFTMarket";
// import EcencyAuth from "./components/EcencyAuth";
// import CreatorStudio from "./components/CreatorStudio";
// import VideoPlayer from "./components/VideoPlayer";
// import LiveStream from "./components/LiveStream";
// import "./index.css";

// function App() {
//   const [user, setUser] = useState(() => {
//     return localStorage.getItem('user') || null;
//   });

//   useEffect(() => {
//     console.log('App user state updated:', user);
//     if (user) {
//       localStorage.setItem('user', user);
//     } else {
//       localStorage.removeItem('user');
//     }
//   }, [user]);

//   const loginWithHive = () => {
//     if (!window.hive_keychain) {
//       alert("Install Hive Keychain!");
//       return;
//     }

//     const username = prompt("Enter Hive username");
//     if (!username) {
//       return alert("Username is required");
//     }

//     window.hive_keychain.requestSignBuffer(
//       username,
//       "Login to CryptoStream",
//       "Posting",
//       (err, result) => {
//         console.log('Sign buffer response:', { err, result });
//         if (err) {
//           console.error("Sign buffer failed:", err);
//           return alert("Login failed: " + err.message);
//         }
//         console.log('Full result from Hive Keychain:', result);
//         try {
//           setUser(username);
//           console.log('User set to:', username);
//           // Check state immediately and reload if successful
//           if (localStorage.getItem('user') === username) {
//             alert("Login successful! Welcome, " + username);
//             window.location.reload(); // Force re-render
//           } else {
//             console.error('User state did not update in localStorage');
//             alert("Login failed: State did not update. Please try again.");
//           }
//         } catch (error) {
//           console.error('Error setting user state:', error);
//           alert("Login failed: Error setting user state - " + error.message);
//         }
//       }
//     );
//   };

//   const logout = () => {
//     setUser(null);
//     console.log('User logged out');
//   };

//   const loginWithEcency = () => {
//     window.location.href = `https://ecency.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=${encodeURIComponent(
//       window.location.origin + "/auth/ecency"
//     )}&response_type=token&scope=login`;
//   };

//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-50 text-gray-800">
//         {/* HEADER */}
//         <header className="bg-white shadow-md p-4">
//           <div className="container mx-auto flex justify-between items-center">
//             <h1 className="text-2xl font-bold">CryptoStream</h1>
//             {user ? (
//               <div className="space-x-2">
//                 <span className="text-sm">Welcome, {user}</span>
//                 <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded">
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <div className="space-x-2">
//                 <button onClick={loginWithHive} className="bg-blue-600 text-white px-4 py-2 rounded">
//                   Login with Hive
//                 </button>
//                 <button onClick={loginWithEcency} className="bg-green-600 text-white px-4 py-2 rounded">
//                   Verify with Ecency
//                 </button>
//               </div>
//             )}
//           </div>
//         </header>

//         {/* MAIN CONTENT */}
//         <div className="container mx-auto flex mt-4">
//           {/* SIDEBAR */}
//           <aside className="w-1/4 p-4 bg-white rounded-lg shadow-md">
//             <h3 className="font-semibold text-gray-700">NAVIGATION</h3>
//             <ul className="space-y-2">
//               <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
//               <li><Link to="/studio" className="hover:text-blue-600">Creator Studio</Link></li>
//               <li><Link to="/live" className="hover:text-blue-600">Live Stream</Link></li>
//               <li><Link to="/nft-market" className="hover:text-blue-600">NFT Market</Link></li>
//             </ul>
//           </aside>

//           {/* MAIN SECTION */}
//           <main className="w-3/4 ml-4">
//             <div className="bg-white p-4 rounded-lg shadow-md">
//               <div className="category-buttons flex space-x-4 mb-4">
//                 <button className="active px-3 py-1 bg-purple-200 text-purple-800 rounded">Trending</button>
//                 <button className="px-3 py-1">New</button>
//                 <button className="px-3 py-1">NFT Video</button>
//               </div>
//               <Routes>
//                 <Route path="/" element={<Home user={user} />} />
//                 <Route path="/studio" element={<CreatorStudio user={user} key={user} />} />
//                 <Route path="/live" element={<LiveStream user={user} />} />
//                 <Route path="/nft-market" element={<NFTMarket user={user} />} />
//                 <Route path="/video/:permlink" element={<VideoPlayer user={user} />} />
//                 <Route path="/auth/ecency" element={<EcencyAuth setUser={setUser} />} />
//               </Routes>
//             </div>
//           </main>
//         </div>

//         {/* FOOTER */}
//         <footer className="bg-white mt-4 p-4 text-center text-gray-600">
//           <div className="container mx-auto flex justify-between">
//             <div>
//               <p className="font-semibold">Support</p>
//               <p>Help Center</p>
//               <p>Safety Center</p>
//             </div>
//             <div>
//               <p className="font-semibold">Legal</p>
//               <p>Terms of Service</p>
//             </div>
//             <div>
//               <p className="font-semibold">Follow Us</p>
//               <div className="flex space-x-2 justify-center">
//                 <span>🐦</span> <span>📷</span> <span>🎥</span>
//               </div>
//             </div>
//           </div>
//           <p className="mt-2">© 2025 CryptoStream. All rights reserved.</p>
//         </footer>
//       </div>
//     </Router>
//   );
// }

// export default App;





import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home";
import NFTMarket from "./components/NFTMarket";
import EcencyAuth from "./components/EcencyAuth";
import CreatorStudio from "./components/CreatorStudio";
import VideoPlayer from "./components/VideoPlayer";
import LiveStream from "./components/LiveStream";
import "./index.css";

function App() {
  const [user, setUser] = useState(() => {
    return localStorage.getItem('user') || null;
  });

  useEffect(() => {
    console.log('App user state updated:', user);
    if (user) {
      localStorage.setItem('user', user);
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const loginWithHive = () => {
    if (!window.hive_keychain) {
      alert("Install Hive Keychain!");
      return;
    }

    const username = prompt("Enter Hive username");
    if (!username) {
      return alert("Username is required");
    }

    window.hive_keychain.requestSignBuffer(
      username,
      "Login to CryptoStream",
      "Posting",
      (err, result) => {
        console.log('Sign buffer response:', { err, result });
        if (err && !err.success) {
          console.error("Sign buffer failed:", err);
          // Detailed error logging and handling
          if (err.message) {
            console.error("Error message:", err.message);
            if (err.error_code === "signature_reject") {
              alert("Login failed: You canceled the signature request. Please approve the signature in Hive Keychain to proceed.");
            } else {
              alert("Login failed: " + err.message);
            }
          } else {
            console.error("Unknown error object:", JSON.stringify(err, null, 2));
            alert("Login failed: Unknown error - Check console for details");
          }
          return;
        }
        // Success case: Check err.success or result
        if (err && err.success) {
          try {
            setUser(username);
            localStorage.setItem('user', username);
            console.log('User set to:', username);
            alert("Login successful! Welcome, " + username);
          } catch (error) {
            console.error('Error setting user state:', error);
            alert("Login failed: Error setting user state - " + error.message);
          }
        } else if (result && result.result) {
          try {
            setUser(username);
            localStorage.setItem('user', username);
            console.log('User set to:', username);
            alert("Login successful! Welcome, " + username);
          } catch (error) {
            console.error('Error setting user state:', error);
            alert("Login failed: Error setting user state - " + error.message);
          }
        } else {
          console.error("Invalid response from Hive Keychain:", { err, result });
          alert("Login failed: Invalid response from Hive Keychain");
        }
      }
    );
  };

  const logout = () => {
    setUser(null);
    console.log('User logged out');
  };

  const loginWithEcency = () => {
    window.location.href = `https://ecency.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=${encodeURIComponent(
      window.location.origin + "/auth/ecency"
    )}&response_type=token&scope=login`;
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        {/* HEADER */}
        <header className="bg-white shadow-md p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">CryptoStream</h1>
            {user ? (
              <div className="space-x-2">
                <span className="text-sm">Welcome, {user}</span>
                <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded">
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-x-2">
                <button onClick={loginWithHive} className="bg-blue-600 text-white px-4 py-2 rounded">
                  Login with Hive
                </button>
                <button onClick={loginWithEcency} className="bg-green-600 text-white px-4 py-2 rounded">
                  Verify with Ecency
                </button>
              </div>
            )}
          </div>
        </header>

        {/* MAIN CONTENT */}
        <div className="container mx-auto flex mt-4">
          {/* SIDEBAR */}
          <aside className="w-1/4 p-4 bg-white rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-700">NAVIGATION</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
              <li><Link to="/studio" className="hover:text-blue-600">Creator Studio</Link></li>
              <li><Link to="/live" className="hover:text-blue-600">Live Stream</Link></li>
              <li><Link to="/nft-market" className="hover:text-blue-600">NFT Market</Link></li>
            </ul>
          </aside>

          {/* MAIN SECTION */}
          <main className="w-3/4 ml-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="category-buttons flex space-x-4 mb-4">
                <button className="active px-3 py-1 bg-purple-200 text-purple-800 rounded">Trending</button>
                <button className="px-3 py-1">New</button>
                <button className="px-3 py-1">NFT Video</button>
              </div>
              <Routes>
                <Route path="/" element={<Home user={user} />} />
                <Route path="/studio" element={<CreatorStudio user={user} key={user} />} />
                <Route path="/live" element={<LiveStream user={user} />} />
                <Route path="/nft-market" element={<NFTMarket user={user} />} />
                <Route path="/video/:permlink" element={<VideoPlayer user={user} />} />
                <Route path="/auth/ecency" element={<EcencyAuth setUser={setUser} />} />
              </Routes>
            </div>
          </main>
        </div>

        {/* FOOTER */}
        <footer className="bg-white mt-4 p-4 text-center text-gray-600">
          <div className="container mx-auto flex justify-between">
            <div>
              <p className="font-semibold">Support</p>
              <p>Help Center</p>
              <p>Safety Center</p>
            </div>
            <div>
              <p className="font-semibold">Legal</p>
              <p>Terms of Service</p>
            </div>
            <div>
              <p className="font-semibold">Follow Us</p>
              <div className="flex space-x-2 justify-center">
                <span>🐦</span> <span>📷</span> <span>🎥</span>
              </div>
            </div>
          </div>
          <p className="mt-2">© 2025 CryptoStream. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;