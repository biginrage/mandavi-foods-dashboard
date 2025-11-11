import { google } from 'googleapis';

const sheets = google.sheets('v4');

const credentials = {
  "type": "service_account",
  "project_id": "mandavi-foods-dashboard",
  "private_key_id": "78d16c8b63980c58feac2c353ce852d0fe6aae29",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDgYX2amLWrnbhC0oZ58IJbDncktBpEnC916TZ97F4UyYt0M2JGctxhhbCPKoV1WuCYJ01a7NBujqVVW1hZ2PQjxhPTwDPUiCpbqioQVTrVMTosY03TzuYhWOiMIOQ8ovQSIO3H4qee5XhfTrYTDiArGpfJURfsaKAnrIXZ8GgDjd7RLhF5CFLV6W7RE8kWlLCNgNB5wvhecNQgbcyZpl0A9R9v0SqDhrWvMXbbDtCAGuUqYPgIO58yixKfumOx5PWTiEpGxMArVkBumZva4UwRTUqBnQ7ZOqfAnEZaiJCAw34ufDMNvufpAgMBAAECggEAAwpPIWEgVQr2DC9KSJdx0ZgKUQZeYla67DGLxYafZP619tDQHqMbmonO7Lfixw77XwBdTI7ykcLLYPvsmd9kG9HkgYVdHN5Tl2ZAK2C7vqhf4hpfHcz0okDlKnW5xQylVHwe3YYvv11YSmBD0xK6SRC1UfDv85ZZg3zHbRCT8qr8I4OqyQDZELDHzfr00j5Zf3uN9wQvoBOQnfPl9s1SiXBwlNWg4KQXg4X4P4hO0jaOom5XNz2PF3EfAA8liHioUot4VRb2TbH1desXgeB42o3u3vCoB1rs0KQyAFEukDtJu1PRpXpCEoDdHbJDYQKBgQD3QkraKFzgSTpHHeg5CY020CPfsOfuL7FH7IGrFx7mbuCEHh3uMlGBSt7GnLlThOTaAiSCD8SPE0Ky1UtQwxNI37dcvSil40kLJsXFDZg1sfV815iOjNZHru0uPrSdDDpoi819aLwKBgQDoUCZc1EUQp7kPV6EHNunZu5iPCpilFotE8jQ1bpd9v8ZZQ1GKJ4CCKT1Oy6tPnH7hvT7u3dGEIV3HJrjYfDlw3gDtPQhKS4Ml0qUdYQWOV1XPuuYfVDgzZH0RUh0ydAhBmVZNSDWNQgTQ2r4DGLPfPJMXVVMHAUEeJYcUEQXQQKBgQDDDOWIUL0J6EfHWJFAIrUDONQBvRvA8O0K9JF6e0U0c9VYV6zJfY1YVdGP7TJK5cItZJKU7QUHEQvHoVvJIGBYF4dxTYe8VQpXWnM6c8L7aQ4vN5TiRNQFWfXl9RXmJd7e7YBkdVb9r88VxfU2vFJ4aZEiCqBzgkHPZhOBNhJnVQQKBgBQkWfMT8gJvYiJJDqLDDqhgWLpkFKLFvnvvlQn2LVX7cQp5Gy5XY5r8XF4X2YZuJZV2dI7QDjdYlEQvlBHqEV8FD9zzDkV4qYVxNS2H8ISmJFTdDuHhgVqE4m5e8WzYZ82bKX5nVLPBKJX7qKVPJm5XQlvNhfRLZC7jbqkb2W+AQKBgQCO2Q3fqZLBcVPhXTnrR8XaLGOLsOCBLkYP8B+CZbNjIR8FLQu4FqARvUKXvFVvVHmn0pFJKVpOHLI0o8BHFHq30UtRxrZ5ijlZqN0T4r0h9tQrHdKyGxRDNKqpv0gSx8xwKZREqJYlCVU0mSmPq4zPxMXFZqH0tpJ8qJ6aaGj8Q==\n-----END PRIVATE KEY-----\n",
  "client_email": "mandavi-foods-app@mandavi-foods-dashboard.iam.gserviceaccount.com",
  "client_id": "117160302663917479800",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/mandavi-foods-app%40mandavi-foods-dashboard.iam.gserviceaccount.com"
};

const SHEET_ID = '1KzSY87VW0gfnK0ZHSTQdJP_WOpllN-1n';

async function getAuth() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    return auth.getClient();
  } catch (error) {
    console.error('Auth error:', error);
    throw error;
  }
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle GET request (for testing)
  if (req.method === 'GET') {
    return res.status(200).json({ 
      success: true, 
      message: 'Backend is working! Use POST to add entries.' 
    });
  }

  // Handle POST request
  if (req.method === 'POST') {
    const { action, data } = req.body;

    try {
      const auth = await getAuth();

      if (action === 'addEntry') {
        // Prepare data for Google Sheet
        const values = [[
          data.date,
          data.product,
          data.quantity,
          data.totalPurchase || (data.quantity * data.purchasePrice),
          data.purchasePrice
        ]];

        console.log('Adding entry to Sheet:', values);

        // Append to Purchase sheet
        const result = await sheets.spreadsheets.values.append({
          auth,
          spreadsheetId: SHEET_ID,
          range: 'Purchase!A:E',
          valueInputOption: 'USER_ENTERED',
          resource: { values },
        });

        console.log('Sheet update result:', result.data);

        return res.status(200).json({ 
          success: true, 
          message: 'Entry added successfully',
          updatedCells: result.data.updates?.updatedCells
        });
      } 
      else if (action === 'getData') {
        // Read data from Purchase sheet
        const result = await sheets.spreadsheets.values.get({
          auth,
          spreadsheetId: SHEET_ID,
          range: 'Purchase!A:E',
        });

        return res.status(200).json({ 
          success: true, 
          data: result.data.values || [] 
        });
      }
      else {
        return res.status(400).json({ 
          success: false, 
          error: 'Unknown action' 
        });
      }
    } catch (error) {
      console.error('API Error:', error);
      return res.status(500).json({ 
        success: false, 
        error: error.message || 'Internal server error',
        details: error.toString()
      });
    }
  }

  // Handle other methods
  res.status(405).json({ error: 'Method not allowed' });
}
