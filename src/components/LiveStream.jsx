function LiveStream({ user }) {
    return (
      <div className="container mx-auto p-4 bg-white rounded shadow">
        <h2 className="text-2xl font-semibold">Live Streaming</h2>
        {user ? (
          <p>Live streaming coming soon! (WebRTC integration pending)</p>
        ) : (
          <p>Login to stream.</p>
        )}
      </div>
    );
  }
  
  export default LiveStream;