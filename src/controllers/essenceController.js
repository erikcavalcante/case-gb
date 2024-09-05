const axios = require('axios');
const formatBoticarioError = require('../utils/errorFormatter');

exports.getEssences = async (req, res) => {
  try {
    const response = await axios.get('https://api.dev.grupoboticario.com.br/v1/essences-challenge/essences', {
      headers: { 'Authorization': `Basic ${req.basicAuth}` }
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      const formattedError = formatBoticarioError(error.response);
      res.status(error.response.status).json(formattedError);
    } else {
      console.error('Unexpected Error:', error.message);
      res.status(500).json({ message: 'Unexpected error occurred' });
    }
  }
};

exports.getEssenceById = async (req, res) => {
  try {
    const response = await axios.get(`https://api.dev.grupoboticario.com.br/v1/essences-challenge/essences/${req.params.id}`, {
      headers: { 'Authorization': `Basic ${req.basicAuth}` }
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      const formattedError = formatBoticarioError(error.response);
      res.status(error.response.status).json(formattedError);
    } else {
      console.error('Unexpected Error:', error.message);
      res.status(500).json({ message: 'Unexpected error occurred' });
    }
  }
};
