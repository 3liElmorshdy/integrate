import React from 'react';
import CategoriesList from '../Categories/CategoriesList';
import BlogsList from '../Blog/BlogsList';

function RealState() {
  return (
    <section style={{ padding: '2rem' }}>
      <div className="container-fluid">
        <h2>Real Estate</h2>
        <CategoriesList />
        <hr />
        <BlogsList />
      </div>
    </section>
  );
}

export default RealState;


