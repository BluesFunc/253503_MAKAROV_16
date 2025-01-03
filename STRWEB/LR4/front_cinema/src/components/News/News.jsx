import React, { useEffect, useState } from "react";
import axios from "../utils/api";

const News = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("/news");
        setArticles(response.data);
      } catch (error) {
        console.error("Failed to fetch news", error);
      }
    };
    fetchNews();
  }, []);

  return (
    <div>
      <h2>News</h2>
      <div className="news-container">
        {articles.length > 0 ? (
          articles.map((article) => (
            <div className="news-card" key={article._id}>
              <img src={article.image} alt={article.title} />
              <h3>{article.title}</h3>
              <p>{article.content.substring(0, 100)}...</p>
              <button onClick={() => window.location.href = `/news/${article._id}`}>Read More</button>
            </div>
          ))
        ) : (
          <p>No news available.</p>
        )}
      </div>
    </div>
  );
};

export default News;