import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/api";

const NewsDetail = () => {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await axios.get(`/news/${id}`);
        setNewsItem(response.data);
      } catch (error) {
        console.error("Failed to fetch news detail", error);
      }
    };

    fetchNewsDetail();
  }, [id]);

  if (!newsItem) {
    return <p>Loading...</p>;
  }

  return (
    <div className="news-detail-container">
      <h2>{newsItem.title}</h2>
      <img src={newsItem.image} alt={newsItem.title} />
      <p>{newsItem.content}</p>
      <p><strong>Published:</strong> {new Date(newsItem.publishedAt).toLocaleDateString()}</p>
    </div>
  );
};

export default NewsDetail;
