//  thumbnail render*****
// // import { useState, useEffect, useRef } from 'react';

// function CreatorStudio({ user }) {
//   const [file, setFile] = useState(null);
//   const [category, setCategory] = useState('video');
//   const [cid, setCid] = useState('');
//   const [premium, setPremium] = useState(false);
//   const [permlink, setPermlink] = useState('');
//   const [error, setError] = useState(null); // State for error messages
//   const fileInputRef = useRef(null); // Ref for file input

//   // Log state changes for debugging
//   useEffect(() => {
//     console.log('Component re-rendered. File:', file, 'User:', user);
//   }, [file, user]);

//   const handleFileSelect = () => {
//     const selectedFile = fileInputRef.current.files[0];
//     console.log('Selected file:', selectedFile);
//     if (selectedFile && selectedFile.type.startsWith('video/')) {
//       setFile(selectedFile);
//       setError(null); // Clear error if file is valid
//     } else {
//       setError('Please select a valid video file.');
//       setFile(null);
//     }
//   };

//   const handleUpload = async () => {
//     console.log('File state before upload:', file);
//     console.log('User state before upload:', user);
//     if (!file || !file.name) {
//       setError('Please select a valid video file.');
//       return alert('Please select a valid video file.');
//     }
//     if (!user) {
//       setError('Please log in to upload.');
//       return alert('Please log in to upload.');
//     }

//     setError(null); // Clear previous errors
//     const formData = new FormData();
//     formData.append('video', file);
//     formData.append('filename', file.name);
//     formData.append('username', user);
//     formData.append('category', category);
//     formData.append('premium', premium);

//     try {
//       const res = await fetch('http://localhost:5000/api/upload', {
//         method: 'POST',
//         body: formData,
//       });
//       if (!res.ok) throw new Error(`Upload failed with status ${res.status}`);
//       const data = await res.json();
//       setCid(data.cid);
//       setPermlink(data.permlink);
//       alert('Video uploaded!');
//     } catch (error) {
//       setError(`Upload failed: ${error.message}`);
//       alert(`Upload failed: ${error.message}`);
//       console.error('Upload error:', error);
//     }
//   };

//   const shareToEcency = () => {
//     if (!user || !permlink) {
//       setError('Upload a video first.');
//       return alert('Upload a video first.');
//     }
//     const ecencyUrl = `https://ecency.com/${category}/@${user}/${permlink}`;
//     window.open(ecencyUrl, '_blank');
//     alert(`Shared to Ecency: ${ecencyUrl}`);
//   };

//   const subscribePremium = () => {
//     if (!user) {
//       setError('Please log in to subscribe.');
//       return alert('Please log in to subscribe.');
//     }
//     window.hive_keychain.requestTransfer(user, 'cryptostream', '10.000 HBD', 'Premium Feature Subscription', (err) => {
//       if (!err) {
//         setPremium(true);
//         alert('Subscribed to Premium Features!');
//       } else {
//         setError('Subscription failed: ' + err.message);
//         alert('Subscription failed: ' + err.message);
//       }
//     });
//   };

//   return (
//     <div className="container mx-auto p-4 bg-white rounded shadow">
//       <h2 className="text-2xl font-semibold mb-4">Creator Studio</h2>
//       {error && <p className="text-red-500 mb-2">{error}</p>} {/* Display error message */}
//       <div className="flex space-x-2 mb-4">
//         <select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="p-2 border rounded"
//         >
//           <option value="video">General</option>
//           <option value="music">Music</option>
//           <option value="gaming">Gaming</option>
//         </select>
//         <input
//           type="file"
//           accept="video/*"
//           ref={fileInputRef}
//           onChange={handleFileSelect}
//           className="p-2 border rounded"
//         />
//         <button onClick={handleUpload} className="bg-blue-600 text-white px-4 py-2 rounded">
//           Upload
//         </button>
//       </div>
//       {cid && (
//         <div className="mt-2">
//           <p>Video CID: {cid}</p>
//           <button onClick={shareToEcency} className="mt-2 bg-purple-600 text-white px-4 py-2 rounded">
//             Share to Ecency
//           </button>
//         </div>
//       )}
//       {!premium && (
//         <button onClick={subscribePremium} className="mt-4 bg-purple-600 text-white px-4 py-2 rounded">
//           Subscribe to Premium Features (10 HBD)
//         </button>
//       )}
//       <h3 className="mt-4 font-semibold">Stats</h3>
//       <p>(Views/earnings coming soon)</p>
//     </div>
//   );
// }

// export default CreatorStudio;

import { useState, useEffect, useRef } from 'react';

function CreatorStudio({ user }) {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('video');
  const [cid, setCid] = useState('');
  const [premium, setPremium] = useState(false);
  const [permlink, setPermlink] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    console.log('Component re-rendered. File:', file, 'User:', user);
  }, [file, user]);

  const handleFileSelect = () => {
    const selectedFile = fileInputRef.current.files[0];
    console.log('Selected file:', selectedFile);
    if (selectedFile && selectedFile.type.startsWith('video/')) {
      setFile(selectedFile);
      setError(null);
    } else {
      setError('Please select a valid video file.');
      setFile(null);
    }
  };

  const handleUpload = async () => {
    console.log('File state before upload:', file);
    console.log('User state before upload:', user);
    if (!file || !file.name) {
      setError('Please select a valid video file.');
      return alert('Please select a valid video file.');
    }
    if (!user) {
      setError('Please log in to upload.');
      return alert('Please log in to upload.');
    }

    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append('video', file);
    formData.append('filename', file.name);
    formData.append('username', user);
    formData.append('category', category);
    formData.append('premium', premium);

    try {
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `Upload failed with status ${res.status}`);
      }
      const data = await res.json();
      setCid(data.cid);
      setPermlink(data.permlink);
      alert('Video uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      setError(`Upload failed: ${error.message}`);
      alert(`Upload failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const shareToEcency = () => {
    if (!user || !permlink) {
      setError('Upload a video first.');
      return alert('Upload a video first.');
    }
    const ecencyUrl = `https://ecency.com/${category}/@${user}/${permlink}`;
    window.open(ecencyUrl, '_blank');
    alert(`Shared to Ecency: ${ecencyUrl}`);
  };

  const subscribePremium = () => {
    if (!user) {
      setError('Please log in to subscribe.');
      return alert('Please log in to subscribe.');
    }
    window.hive_keychain.requestTransfer(user, 'cryptostream', '10.000 HBD', 'Premium Feature Subscription', (err) => {
      if (!err) {
        setPremium(true);
        alert('Subscribed to Premium Features!');
      } else {
        setError('Subscription failed: ' + err.message);
        alert('Subscription failed: ' + err.message);
      }
    });
  };

  return (
    <div className="container mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Creator Studio</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="flex space-x-2 mb-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="video">General</option>
          <option value="music">Music</option>
          <option value="gaming">Gaming</option>
        </select>
        <input
          type="file"
          accept="video/*"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="p-2 border rounded"
        />
        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
      {cid && (
        <div className="mt-2">
          <p>Video CID: {cid}</p>
          <button onClick={shareToEcency} className="mt-2 bg-purple-600 text-white px-4 py-2 rounded">
            Share to Ecency
          </button>
        </div>
      )}
      {!premium && (
        <button onClick={subscribePremium} className="mt-4 bg-purple-600 text-white px-4 py-2 rounded">
          Subscribe to Premium Features (10 HBD)
        </button>
      )}
      <h3 className="mt-4 font-semibold">Stats</h3>
      <p>(Views/earnings coming soon)</p>
    </div>
  );
}

export default CreatorStudio;