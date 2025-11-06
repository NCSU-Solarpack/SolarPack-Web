import { useState, useEffect } from 'react';
import { supabaseService } from '../utils/supabase';
import './Home.css';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    setIsLoading(true);
    try {
      const data = await supabaseService.getPublishedBlogs();
      setBlogs(data || []);
    } catch (error) {
      console.error('Error loading blogs:', error);
      setBlogs([]);
    } finally {
      setIsLoading(false);
    }
  };

  const openBlog = (blog) => {
    setSelectedBlog(blog);
    // Scroll to top when opening a blog
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeBlog = () => {
    setSelectedBlog(null);
  };

  if (isLoading) {
    return (
      <div className="blogs-page">
        <div className="blogs-container">
          <div className="loading">Loading blog posts...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="blogs-page">
      <style>{`
        .blogs-page {
          min-height: 100vh;
          background: var(--bg);
          padding: 2rem 1rem;
        }

        .blogs-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .blogs-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .blogs-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: 3rem;
          color: var(--accent);
          margin: 0 0 1rem 0;
          letter-spacing: 0.05em;
        }

        .blogs-subtitle {
          color: var(--subtxt);
          font-size: 1.2rem;
        }

        .blogs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .blog-card {
          background: var(--surface);
          border-radius: var(--radius);
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
          display: flex;
          flex-direction: column;
        }

        .blog-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.25);
        }

        .blog-card-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          background: rgba(255, 255, 255, 0.05);
        }

        .blog-card-content {
          padding: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .blog-card-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text);
          margin-bottom: 0.75rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .blog-card-meta {
          display: flex;
          gap: 1rem;
          color: var(--subtxt);
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        .blog-card-author {
          font-weight: 500;
        }

        .blog-card-date {
          opacity: 0.8;
        }

        .blog-card-excerpt {
          color: var(--text);
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-bottom: 1rem;
          flex: 1;
        }

        .blog-card-read-more {
          color: var(--accent);
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: gap 0.3s ease;
        }

        .blog-card:hover .blog-card-read-more {
          gap: 0.75rem;
        }

        /* Full Blog Modal */
        .blog-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: flex-start;
          justify-content: center;
          z-index: 1000;
          padding: 2rem 1rem;
          overflow-y: auto;
        }

        .blog-modal {
          background: var(--surface);
          border-radius: var(--radius);
          max-width: 900px;
          width: 100%;
          margin: 2rem auto;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }

        .blog-modal-header {
          position: relative;
        }

        .blog-modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(0, 0, 0, 0.6);
          border: none;
          color: white;
          font-size: 2rem;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s ease;
          z-index: 10;
        }

        .blog-modal-close:hover {
          background: rgba(0, 0, 0, 0.8);
        }

        .blog-modal-image {
          width: 100%;
          height: 400px;
          object-fit: cover;
          background: rgba(255, 255, 255, 0.05);
        }

        .blog-modal-content {
          padding: 2rem;
        }

        .blog-modal-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: 2.5rem;
          color: var(--accent);
          margin: 0 0 1rem 0;
          line-height: 1.2;
        }

        .blog-modal-meta {
          display: flex;
          gap: 1.5rem;
          color: var(--subtxt);
          font-size: 1rem;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #333;
        }

        .blog-modal-author {
          font-weight: 600;
        }

        .blog-modal-date {
          opacity: 0.8;
        }

        .blog-modal-body {
          color: var(--text);
          line-height: 1.8;
          font-size: 1.1rem;
          white-space: pre-wrap;
          word-wrap: break-word;
        }

        .blog-modal-body p {
          margin-bottom: 1.5rem;
        }

        .blog-link-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--accent);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          margin-bottom: 2rem;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }

        .blog-link-button:hover {
          background: #c71821;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(227, 23, 23, 0.3);
        }

        .blog-link-button:active {
          transform: translateY(0);
        }

        .loading {
          text-align: center;
          padding: 4rem 1rem;
          color: var(--subtxt);
          font-size: 1.2rem;
        }

        .empty-state {
          text-align: center;
          padding: 4rem 1rem;
          color: var(--subtxt);
        }

        .empty-state h3 {
          font-size: 2rem;
          color: var(--text);
          margin-bottom: 1rem;
        }

        .empty-state p {
          font-size: 1.1rem;
        }

        @media (max-width: 768px) {
          .blogs-title {
            font-size: 2rem;
          }

          .blogs-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .blog-modal {
            margin: 0;
            border-radius: 0;
            min-height: 100vh;
          }

          .blog-modal-image {
            height: 250px;
          }

          .blog-modal-content {
            padding: 1.5rem;
          }

          .blog-modal-title {
            font-size: 2rem;
          }

          .blog-modal-body {
            font-size: 1rem;
          }
        }
      `}</style>

      <div className="blogs-container">
        <div className="blogs-header">
          <h1 className="blogs-title">Blog</h1>
          <p className="blogs-subtitle">Latest updates and stories from the NC State SolarPack team</p>
        </div>

        {blogs.length === 0 ? (
          <div className="empty-state">
            <h3>No blog posts yet</h3>
            <p>Check back soon for updates from our team!</p>
          </div>
        ) : (
          <div className="blogs-grid">
            {blogs.map(blog => (
              <div key={blog.id} className="blog-card" onClick={() => openBlog(blog)}>
                {blog.image_url && (
                  <img src={blog.image_url} alt={blog.title} className="blog-card-image" />
                )}
                <div className="blog-card-content">
                  <h2 className="blog-card-title">{blog.title}</h2>
                  <div className="blog-card-meta">
                    <span className="blog-card-author">By {blog.author}</span>
                    <span className="blog-card-date">
                      {new Date(blog.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <p className="blog-card-excerpt">{blog.body}</p>
                  <span className="blog-card-read-more">
                    Read More →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedBlog && (
        <div className="blog-modal-overlay" onClick={closeBlog}>
          <div className="blog-modal" onClick={e => e.stopPropagation()}>
            <div className="blog-modal-header">
              <button className="blog-modal-close" onClick={closeBlog}>×</button>
              {selectedBlog.image_url && (
                <img src={selectedBlog.image_url} alt={selectedBlog.title} className="blog-modal-image" />
              )}
            </div>
            <div className="blog-modal-content">
              <h1 className="blog-modal-title">{selectedBlog.title}</h1>
              <div className="blog-modal-meta">
                <span className="blog-modal-author">By {selectedBlog.author}</span>
                <span className="blog-modal-date">
                  {new Date(selectedBlog.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              {selectedBlog.link_url && (
                <a 
                  href={selectedBlog.link_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="blog-link-button"
                >
                  {selectedBlog.link_text || 'Read More'} →
                </a>
              )}
              <div className="blog-modal-body">{selectedBlog.body}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;
