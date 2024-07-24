const API_URL = '/.netlify/functions/chat';

export const sendChatMessage = async (messages) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages })
  });

  if (!response.ok) throw new Error('Failed to get response');

  return response.json();
};
