import axios from 'axios';

const groqClient = axios.create({
  baseURL: 'http://localhost:8080/api/legal',
});

export const analyzeDocument = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await groqClient.post('/analyze', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const askQuestion = async (documentText, question) => {
  const response = await groqClient.post('/ask', { documentText, question });
  return response.data;
};

export default groqClient;