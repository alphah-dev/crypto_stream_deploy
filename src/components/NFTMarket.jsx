import { useState, useEffect } from 'react';

function NFTMarket({ user }) {
  const [nfts, setNfts] = useState([]);
  const [newNFT, setNewNFT] = useState({ name: '', price: '' });

  useEffect(() => {
    setNfts([
      { id: 1, name: 'Premium Video Pass', price: '0.1 ETH', owner: 'creator1' },
      { id: 2, name: 'Exclusive Music NFT', price: '0.5 ETH', owner: 'creator2' },
    ]);
  }, []);

  const mintNFT = () => {
    if (!user || !newNFT.name || !newNFT.price) return alert('Fill all fields');
    const nft = { id: Date.now(), name: newNFT.name, price: newNFT.price, owner: user };
    setNfts([...nfts, nft]);
    setNewNFT({ name: '', price: '' });
    alert('NFT minted! (Pending Hive-Engine integration)');
  };

  const buyNFT = (nft) => {
    if (!user) return alert('Login required');
    window.hive_keychain.requestTransfer(user, nft.owner, nft.price, `Purchase of ${nft.name}`, (err) => {
      if (!err) {
        window.hive_keychain.requestTransfer(user, 'cryptostream', `${parseFloat(nft.price) * 0.025} ETH`, 'Platform fee (2.5%)', (err) => {
          if (!err) alert(`Bought ${nft.name} for ${nft.price}!`);
        });
      }
    });
  };

  return (
    <div className="container mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">NFT Market</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="NFT Name"
          value={newNFT.name}
          onChange={(e) => setNewNFT({ ...newNFT, name: e.target.value })}
          className="p-2 border rounded mr-2"
        />
        <input
          type="text"
          placeholder="Price (e.g., 0.1 ETH)"
          value={newNFT.price}
          onChange={(e) => setNewNFT({ ...newNFT, price: e.target.value })}
          className="p-2 border rounded mr-2"
        />
        <button onClick={mintNFT} className="bg-blue-600 text-white px-4 py-2 rounded">Mint NFT</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {nfts.map(nft => (
          <div key={nft.id} className="bg-gray-100 p-4 rounded shadow">
            <h3 className="font-semibold">{nft.name}</h3>
            <p>Price: {nft.price}</p>
            <p>Owner: {nft.owner}</p>
            {user && user !== nft.owner && (
              <button onClick={() => buyNFT(nft)} className="mt-2 bg-green-500 text-white px-4 py-2 rounded">
                Buy Now
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NFTMarket;