module.exports = (response) => {
  let data;

  try {
    // Verifica se a resposta contém um corpo
    if (response.data) {
      data = typeof response.data === 'string' ? JSON.parse(response.data.replace(/(\d{4})/, '"$1"')) : response.data;
    }
  } catch (e) {
    console.error('Failed to parse JSON string:', e.message);
  }

  if (data) {
    const code = data.code !== undefined ? data.code : 'N/A';
    const message = data.message !== undefined ? data.message : 'Unknown error';
    return {
      message: `[grupo boticario]: ${message} | code: ${code}`
    };
  }

};
