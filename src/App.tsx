import "./App.css";

function App() {
  const handleClick = () => {
    chrome.runtime.sendMessage({ type: "TEST_MESSAGE" });
  };

  return (
    <>
      <div style={{ padding: "1rem" }}>
        <h1>Jupiter Extension</h1>
        <button onClick={handleClick}>Send Test Message</button>
      </div>
    </>
  );
}

export default App;
