import React from 'react';
import Footer from '../Footer/Footer';
import './Blog.css'
import BlogsList from './BlogsList';

function Blog() {
  return (
    <section id="blog" style={{ padding: "2rem" }}>
      <div className="container-fluid">
        <h2 className="custom-text pt-2">Blogs</h2>
        <BlogsList />
      </div>
      <Footer />
    </section>
  );
}

export default Blog; 