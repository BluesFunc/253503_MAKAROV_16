import React, { Component } from "react";
import axios from "../utils/api";

class Merchandise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      searchQuery: "",
      sortOption: "",
    };
  }

  componentDidMount() {
    this.fetchMerchandise();
  }

  fetchMerchandise = async () => {
    try {
      const response = await axios.get("/merchandise");
      this.setState({ items: response.data });
    } catch (error) {
      console.error("Failed to fetch merchandise", error);
    }
  };

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSortChange = (event) => {
    this.setState({ sortOption: event.target.value });
  };

  getFilteredAndSortedItems() {
    const { items, searchQuery, sortOption } = this.state;
    return items
      .filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        if (sortOption === "name") {
          return a.name.localeCompare(b.name);
        } else if (sortOption === "price") {
          return a.price - b.price;
        }
        return 0;
      });
  }

  render() {
    const filteredItems = this.getFilteredAndSortedItems();

    return (
      <div>
        <h2>Merchandise</h2>
        <div>
          <input
            type="text"
            placeholder="Search items..."
            value={this.state.searchQuery}
            onChange={this.handleSearchChange}
          />
          <select onChange={this.handleSortChange}>
            <option value="">Sort by</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </div>
        <div className="card-container">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div className="card" key={item._id}>
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>${item.price}</p>
                <button
                  onClick={() =>
                    (window.location.href = `/merchandise/${item._id}`)
                  }
                >
                  View Item
                </button>
              </div>
            ))
          ) : (
            <p>No merchandise available.</p>
          )}
        </div>
      </div>
    );
  }
}

export default Merchandise;
