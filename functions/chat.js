const axios = require('axios');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { messages } = JSON.parse(event.body);

    try {
        const response = await axios.post('https://api.anthropic.com/v1/messages', {
            model: 'claude-3-opus-20240229',
            messages: messages,
            max_tokens: 1000,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.CLAUDE_API_KEY,
                'anthropic-version': '2023-06-01'
            },
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: response.data.content[0].text }),
        };
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch response from Claude API' }),
        };
    }
};