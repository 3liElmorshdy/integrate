import React, { useEffect, useState } from 'react';
import { getCategories } from '../../api/public';
import { useTranslation } from 'react-i18next';

function CategoriesList() {
  const { i18n } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    getCategories(i18n.language === 'ar' ? 'ar' : 'en')
      .then((data) => {
        if (isMounted) setCategories(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (isMounted) setError(err?.data || err?.message || 'Error');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, [i18n.language]);

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div style={{ color: 'red' }}>{typeof error === 'string' ? error : JSON.stringify(error)}</div>;

  return (
    <div className="row gy-3">
      {categories.map((cat) => (
        <div className="col-md-4" key={cat.id}>
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">{cat.text}</h5>
              <p className="card-text" style={{ fontSize: 14 }}>{cat.description}</p>
              <p className="card-text" style={{ color: '#65471E' }}>{cat.formatted_starting_price}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategoriesList;


