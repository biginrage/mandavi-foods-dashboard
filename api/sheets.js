export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({ 
      success: true, 
      message: 'Backend working' 
    });
  }

  if (req.method === 'POST') {
    const { action, data } = req.body;
    
    try {
      if (action === 'addEntry') {
        // Just return success - data is saved in browser localStorage
        return res.status(200).json({ 
          success: true, 
          message: 'Entry received',
          data: data
        });
      }
      return res.status(400).json({ success: false, error: 'Unknown action' });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
