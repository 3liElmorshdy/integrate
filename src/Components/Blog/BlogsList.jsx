import React, { useEffect, useState } from 'react';
import { getBlogs } from '../../api/public';
import { useTranslation } from 'react-i18next';

function stripHtml(html) {
  const temp = document.createElement('div');
  temp.innerHTML = html || '';
  return temp.textContent || temp.innerText || '';
}

function BlogsList() {
  const { i18n } = useTranslation();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    getBlogs(i18n.language === 'ar' ? 'ar' : 'en')
      .then((data) => {
        if (isMounted) setBlogs(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (isMounted) setError(err?.data || err?.message || 'Error');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, [i18n.language]);

  if (loading) return <div>Loading blogs...</div>;
  if (error) return <div style={{ color: 'red' }}>{typeof error === 'string' ? error : JSON.stringify(error)}</div>;

  return (
    <div className="row gy-3">
      {blogs.map((b) => (
        <div className="col-md-6" key={b.id}>
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">{b.title}</h5>
              <p className="card-text" style={{ fontSize: 14 }}>{stripHtml(b.description).slice(0, 160)}...</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BlogsList;


