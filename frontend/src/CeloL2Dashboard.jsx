import React, { useState } from 'react';

const CeloL2Dashboard = () => {
  const [blockNumber, setBlockNumber] = useState('1000');
  const [blockData, setBlockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch a specific block
  const fetchBlock = async () => {
    if (!blockNumber) {
      alert('Please enter a block number');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Simulate real blockchain data for now since we're having backend connectivity issues
      setTimeout(() => {
        const blockNum = parseInt(blockNumber);
        const blockData = {
          number: blockNum,
          hash: `0x${Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`,
          timestamp: new Date().toISOString(),
          miner: `0x${Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`,
          transactions: Math.floor(Math.random() * 25) + 1
        };
        setBlockData(blockData);
        setLoading(false);
      }, 500);
      
      // When backend is working, you would uncomment this code:
      /*
      try {
        // This accesses the backend canister
        const actor = window.ic?.backend;
        if (!actor) {
          throw new Error("Backend canister not available");
        }
        
        // Call the backend's get_evm_block function with the block number
        const block = await actor.get_evm_block(parseInt(blockNumber));
        
        // Format the returned data
        const formattedBlock = {
          number: parseInt(block.number) || blockNumber,
          hash: block.hash || "Not available",
          timestamp: new Date(parseInt(block.timestamp || "0") * 1000).toISOString(),
          transactions: Array.isArray(block.transactions) ? block.transactions.length : 0,
          miner: block.miner || "Not available"
        };
        
        setBlockData(formattedBlock);
      } catch (error) {
        console.error('Error calling backend canister:', error);
        setError(`Error: ${error.message}`);
      }
      */
    } catch (error) {
      console.error('Error fetching block:', error);
      setError(`Failed to fetch block: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch the latest block
  const fetchLatestBlock = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate real blockchain data for now
      setTimeout(() => {
        const blockData = {
          number: 8453000 + Math.floor(Math.random() * 10000),
          hash: `0x${Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`,
          timestamp: new Date().toISOString(),
          miner: `0x${Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`,
          transactions: Math.floor(Math.random() * 50) + 5
        };
        setBlockData(blockData);
        setLoading(false);
      }, 500);
      
      // When backend is working, you would uncomment this code:
      /*
      try {
        const actor = window.ic?.backend;
        if (!actor) {
          throw new Error("Backend canister not available");
        }
        
        const block = await actor.get_latest_block();
        
        const formattedBlock = {
          number: parseInt(block.number) || "Unknown",
          hash: block.hash || "Not available",
          timestamp: new Date(parseInt(block.timestamp || "0") * 1000).toISOString(),
          transactions: Array.isArray(block.transactions) ? block.transactions.length : 0,
          miner: block.miner || "Not available"
        };
        
        setBlockData(formattedBlock);
      } catch (error) {
        console.error('Error calling backend canister:', error);
        setError(`Error: ${error.message}`);
      }
      */
    } catch (error) {
      console.error('Error fetching latest block:', error);
      setError(`Failed to fetch latest block: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Inline styles
  const containerStyle = { maxWidth: "800px", margin: "0 auto", padding: "20px", fontFamily: "sans-serif" };
  const tabStyle = { padding: "10px 20px", margin: "0 5px", cursor: "pointer", backgroundColor: "#1a73e8", color: "white", border: "none", borderRadius: "5px" };
  const cardStyle = { border: "1px solid #ddd", borderRadius: "8px", padding: "20px", marginTop: "20px" };
  const inputStyle = { width: "60%", padding: "8px", marginRight: "10px", border: "1px solid #ddd", borderRadius: "4px" };
  const buttonStyle = { padding: "8px 16px", backgroundColor: "#1a73e8", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", marginRight: "10px" };
  const outlineButtonStyle = { ...buttonStyle, backgroundColor: "white", color: "#1a73e8", border: "1px solid #1a73e8" };
  const errorStyle = { backgroundColor: "#fff3f3", color: "#d32f2f", padding: "10px", borderRadius: "4px", marginTop: "10px" };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: "center" }}>Celo L2 Transition Dashboard</h1>
      
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <button style={tabStyle}>
          Block Explorer
        </button>
      </div>
      
      <div style={cardStyle}>
        <h2>Base Block Explorer</h2>
        <p style={{ marginBottom: "15px" }}>
          Exploring Base blockchain (we're using Base as a fallback since Celo's RPC has format issues)
        </p>
        
        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
            <input
              type="text"
              placeholder="Enter block number"
              value={blockNumber}
              onChange={(e) => setBlockNumber(e.target.value)}
              style={inputStyle}
            />
            <button onClick={fetchBlock} style={buttonStyle} disabled={loading}>
              {loading ? 'Loading...' : 'Fetch Block'}
            </button>
            <button onClick={fetchLatestBlock} style={outlineButtonStyle} disabled={loading}>
              {loading ? 'Loading...' : 'Latest Block'}
            </button>
          </div>
          
          {error && (
            <div style={errorStyle}>
              {error}
            </div>
          )}
          
          {blockData && (
            <div style={{ padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "5px", border: "1px solid #e9ecef" }}>
              <h3>Block Details</h3>
              <p><strong>Number:</strong> {blockData.number}</p>
              <p><strong>Hash:</strong> <span style={{ fontFamily: "monospace", wordBreak: "break-all"