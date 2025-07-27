import React, { useState } from 'react';
import '../pages/Aistyle.css';

const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/ai/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input }),
      });

      const data = await response.json();
      const aiMessage = {
        sender: 'ai',
        text: data.answer || "⚠️ AI didn't return a proper response.",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI API error:', error);
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: '❌ Error contacting AI server.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <button className="ai-toggle-btn" onClick={() => setIsOpen(true)}>
        🤖
      </button>

      {isOpen && (
        <div className="ai-dialog-overlay">
          <div className="ai-dialog">
            <div className="ai-header">
              <h3>AI Assistant</h3>
              <button className="ai-close-btn" onClick={() => setIsOpen(false)} style={{ color: 'black' }}>
                ×
              </button>
            </div>

            <div className="ai-body">
              {messages.map((msg, index) => (
                <div key={index} className={`ai-message ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
              {loading && <div className="ai-message ai">⏳ Thinking...</div>}
            </div>

            <div className="ai-footer">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                onKeyDown={handleKeyDown}
              />
              <button onClick={handleSend} disabled={loading}>
                ➤
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AiAssistant;
