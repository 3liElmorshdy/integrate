export async function getCategories(lang = 'en') {
  const { http } = await import('./http');
  const res = await http.get('/api/select/categories', {
    headers: { 'Accept-Language': lang }
  });
  return res.data?.data ?? res.data;
}

export async function getBlogs(lang = 'ar') {
  const { http } = await import('./http');
  const res = await http.get('/api/blogs', {
    headers: { 'Accept-Language': lang }
  });
  return res.data?.data ?? res.data;
}


