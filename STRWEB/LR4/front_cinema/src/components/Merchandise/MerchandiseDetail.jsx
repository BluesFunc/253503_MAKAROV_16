import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/api";

const MerchandiseDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchMerchandiseDetail = async () => {
      try {
        const response = await axios.get(`/merchandise/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error("Failed to fetch merchandise detail", error);
      }
    };

    fetchMerchandiseDetail();
  }, [id]);

  if (!item) {
    return <p>Loading...</p>;
  }

  return (
    <div className="merchandise-detail-container">
      <h2>{item.name}</h2>
      <img src={item.image} alt={item.name} />
      <p>{item.description}</p>
      <p><strong>Price:</strong> ${item.price}</p>
    </div>
  );
};

export default MerchandiseDetail;
