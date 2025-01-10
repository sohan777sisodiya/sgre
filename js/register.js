const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
    if (event.httpMethod === 'POST') {
        let body;
        try {
            body = JSON.parse(event.body);
        } catch (error) {
            return {
                statusCode: 400,
                body: JSON.stringify({ status: 'error', message: 'Invalid request body' }),
            };
        }

        const { phone, password } = body;

        // Validate inputs
        if (!phone || !password) {
            return {
                statusCode: 400,
                body: JSON.stringify({ status: 'error', message: 'Phone number and password are required.' }),
            };
        }

        // Create user data
        const userData = {
            phone,
            password, // Again, this should be hashed in a real app
            timestamp: new Date().toISOString(),
        };

        // Path to the JSON file
        const filePath = path.join(__dirname, '../../users.json');
        fs.appendFile(filePath, JSON.stringify(userData) + '\n', (err) => {
            if (err) {
                return {
                    statusCode: 500,
                    body: JSON.stringify({ status: 'error', message: 'Failed to store data.' }),
                };
            } else {
                return {
                    statusCode: 200,
                    body: JSON.stringify({ status: 'success', message: 'Data successfully stored.' }),
                };
            }
        });
        
        return {
            statusCode: 200,
            body: JSON.stringify({ status: 'success', message: 'Data successfully stored.' }),
        };
    } else {
        return {
            statusCode: 405,
            body: JSON.stringify({ status: 'error', message: 'Method not allowed' }),
        };
    }
};