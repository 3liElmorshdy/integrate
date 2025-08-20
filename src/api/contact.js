export async function postContactUs({ name, email, phone, subject, message, lang }) {
  const formData = new FormData();
  formData.append('name', name || '');
  formData.append('email', email || '');
  formData.append('phone', phone || '');
  formData.append('subject', subject || '');
  formData.append('message', message || '');

  const { http } = await import('./http');
  const res = await http.post('/api/contact-us', formData, {
    headers: {
      'Accept-Language': lang || 'en'
    }
  });
  return res.data;
}


