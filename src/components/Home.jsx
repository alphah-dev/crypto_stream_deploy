// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'; // Add Link import

// function Home({ user }) {
//   const [videos, setVideos] = useState([]);
//   const [search, setSearch] = useState('');
//   const [category, setCategory] = useState('trending');

//   useEffect(() => {
//     fetch(`http://localhost:5000/api/videos?tag=${category === 'trending' ? 'video' : category}`)
//       .then(res => res.json())
//       .then(setVideos);
//   }, [category]);

//   const filteredVideos = videos.filter(v => v.title.toLowerCase().includes(search.toLowerCase()));

//   const upvote = (author, permlink) => {
//     window.hive_keychain.requestVote(user, permlink, '10000', (err) => {
//       if (!err) alert('Upvoted!');
//     });
//   };

//   const creators = [
//     { name: 'Harsh Katiyar', followers: '80k', image: 'https://i.ibb.co/SwVNJK5r/12.jpg' },
//     { name: 'Samay Raina', followers: '56k', image: 'https://i.ibb.co/mFCxdzkF/samay.jpg' },
// ];

//   return (
//     <div className="p-4">
//       <p className="text-sm text-gray-500">RECENT ACTIVITY</p>
//       <p className="text-sm">Watched: "NFT Marketing Strategies"</p>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
//         {filteredVideos.map(video => (
//           <div key={video.permlink} className="bg-white p-2 rounded shadow">
//             <div className="relative">
//               <img src={`https://via.placeholder.com/300x200?text=${video.title}`} alt={video.title} className="w-full h-40 object-cover rounded" />
//               <span className="absolute top-2 left-2 bg-purple-200 text-purple-800 text-xs px-2 py-1 rounded">
//                 {video.category === 'nft-video' ? 'NFT 0.5 ETH' : video.category === 'live-streams' ? 'LIVE' : ''}
//               </span>
//             </div>
//             <h3 className="text-lg font-semibold mt-2">{video.title}</h3>
//             <p className="text-sm text-gray-600">{video.author} | {video.views} views</p>
//             <Link to={`/video/${video.permlink}`} className="text-blue-600 hover:underline">Watch Video</Link> {/* Add link to VideoPlayer */}
//             {user && <button onClick={() => upvote(video.author, video.permlink)} className="mt-2 p-1 bg-green-500 text-white rounded">Upvote</button>}
//           </div>
//         ))}
//       </div>
//       <div className="mt-4 bg-white p-4 rounded shadow">
//         <h3 className="font-semibold">Creators You May Like</h3>
//         <div className="grid grid-cols-2 gap-4 mt-2">
//           {creators.map(creator => (
//             <div key={creator.name} className="flex items-center">
//               <img src={creator.image} alt={creator.name} className="w-12 h-12 rounded-full mr-2" />
//               <div>
//                 <p className="font-medium">{creator.name}</p>
//                 <p className="text-sm text-gray-500">{creator.followers} followers</p>
//               </div>
//               <button className="ml-auto bg-purple-600 text-white px-2 py-1 rounded">Follow</button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;


import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home({ user }) {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('trending');
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/videos?tag=${category === 'trending' ? 'video' : category}`)
      .then((res) => res.json())
      .then(setVideos)
      .catch((err) => console.error('Error fetching videos:', err));

    fetch('http://localhost:5000/api/creators')
      .then((res) => res.json())
      .then(setCreators)
      .catch((err) => console.error('Error fetching creators:', err));
  }, [category]);

  const filteredVideos = videos.filter((v) =>
    v.title.toLowerCase().includes(search.toLowerCase())
  );

  const upvote = (author, permlink) => {
    window.hive_keychain.requestVote(user, permlink, '10000', (err) => {
      if (!err) alert('Upvoted!');
      else alert('Upvote failed: ' + err.message);
    });
  };

  const followCreator = (username) => {
    if (!user) return alert('Please log in to follow creators');
    alert(`Followed ${username}!`);
  };

  return (
    <div className="p-4">
      <p className="text-sm text-gray-500">RECENT ACTIVITY</p>
      <p className="text-sm">Watched: "NFT Marketing Strategies"</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {filteredVideos.map((video) => (
          <div key={video.permlink} className="bg-white p-2 rounded shadow">
            <div className="relative">
              <img
                src={video.image || `https://via.placeholder.com/300x200?text=${encodeURIComponent(video.title)}`}
                alt={video.title}
                className="w-full h-40 object-cover rounded"
                onError={(e) => (e.target.src = 'https://via.placeholder.com/300x200')}
              />
              <span className="absolute top-2 left-2 bg-purple-200 text-purple-800 text-xs px-2 py-1 rounded">
                {video.category === 'nft-video' ? 'NFT 0.5 ETH' : video.category === 'live-streams' ? 'LIVE' : ''}
              </span>
            </div>
            <h3 className="text-lg font-semibold mt-2">{video.title}</h3>
            <p className="text-sm text-gray-600">
              {video.author} | {video.views} views
            </p>
            <Link to={`/video/${video.permlink}`} className="text-blue-600 hover:underline">
              Watch Video
            </Link>
            {user && (
              <button
                onClick={() => upvote(video.author, video.permlink)}
                className="mt-2 p-1 bg-green-500 text-white rounded"
              >
                Upvote
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 bg-white p-4 rounded shadow">
        <h3 className="font-semibold">Creators You May Like</h3>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {creators.map((creator) => (
            <div key={creator.username} className="flex items-center">
              <img
                src={creator.image || 'https://via.placeholder.com/50'}
                alt={creator.name}
                className="w-12 h-12 rounded-full mr-2"
                onError={(e) => (e.target.src = 'https://via.placeholder.com/50')}
              />
              <div>
                <p className="font-medium">{creator.name}</p>
                <p className="text-sm text-gray-500">{creator.followers} followers</p>
              </div>
              <button
                onClick={() => followCreator(creator.username)}
                className="ml-auto bg-purple-600 text-white px-2 py-1 rounded"
              >
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;