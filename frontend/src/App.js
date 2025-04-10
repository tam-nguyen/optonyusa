import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import dateFormat from "dateformat";

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [filterBodyType, setFilterBodyType] = useState("");
  const [filterMaintenanceStatus, setFilterMaintenanceStatus] = useState("");
  const [bodyTypes, setBodyTypes] = useState([]);
  const [maintenanceStatuses, setMaintenanceStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [maintenanceStatus, setMaintenanceStatus] = useState("");

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:5001/api/vehicles`);
        setVehicles(response.data);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
        setError("Failed to load vehicle data.");
        setVehicles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const handleBodyTypeChange = (event) => {
    setFilterBodyType(event.target.value);
  };

  const handleMaintenanceStatusChange = (event) => {
    setFilterMaintenanceStatus(event.target.value);
  };

  const filterItems = vehicles.filter((item) => {
    if (filterBodyType === "" && filterMaintenanceStatus === "") {
      return vehicles;
    } else if (filterBodyType === "") {
      return item.maintenance_status === filterMaintenanceStatus;
    } else if (filterMaintenanceStatus === "") {
      return item.body_type === filterBodyType;
    }
    return (
      item.body_type === filterBodyType &&
      item.maintenance_status === filterMaintenanceStatus
    );
  });

  const handleAddNewVehicle = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "body_type") setBodyType(value);
    if (name === "maintenance_status") setMaintenanceStatus(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newVehicle = {
      id: vehicles.length + 1,
      name: name,
      body_type: bodyType,
      maintenance_status: maintenanceStatus,
      img_url: null,
      last_maintenance: new Date().toISOString(),
    };

    try {
      const response = await axios.post(
        "http://localhost:5001/api/update",
        newVehicle
      );

      setVehicles([...vehicles, response.data]);

      setName("");
      setBodyType("");
      setMaintenanceStatus("");

      alert("Vehicle added successfully!");
    } catch (error) {
      console.error("Error creating vehicle:", error);
      alert("Failed to add vehicle. Please try again.");
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      <h1>City Fleet</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ marginRight: "10px" }}>Name:</label>
            <input
              type="text"
              value={name}
              name="name"
              onChange={handleAddNewVehicle}
              required
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ marginRight: "10px" }}>Body Type:</label>
            <input
              type="text"
              value={bodyType}
              name="body_type"
              onChange={handleAddNewVehicle}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ marginRight: "10px" }}>Maintenance Status:</label>
            <input
              type="text"
              value={maintenanceStatus}
              name="maintenance_status"
              onChange={handleAddNewVehicle}
            />
          </div>
          <button type="submit">Submit</button>
        </div>
      </form>

      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          border: "1px solid #eee",
          borderRadius: "5px",
        }}>
        <h2>Filter Vehicles</h2>
        <label htmlFor="bodyType">Body Type:</label>
        <select
          id="bodyType"
          value={filterBodyType}
          onChange={handleBodyTypeChange}>
          <option value="">All</option>
          <option value="Pickup">Pick up</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
        </select>

        <label
          htmlFor="maintenanceStatus"
          style={{ marginLeft: "20px" }}>
          Maintenance Status:
        </label>
        <select
          id="maintenanceStatus"
          value={filterMaintenanceStatus}
          onChange={handleMaintenanceStatusChange}>
          <option value="">All</option>
          <option value="In Use">In Use</option>
          <option value="Undergoing Maintance">Undergoing Maintance</option>
          <option value="Upcoming Maintancenent">Upcoming Maintancenent</option>
        </select>
      </div>

      {loading ? (
        <div>Loading vehicles...</div>
      ) : (
        <div className="row mb-5 mt-2">
          {filterItems.map((vehicle, index) => (
            <div
              key={index}
              className="standard-inventory col-md-6 col-xl-4 col-xxl-3 si-vehicle-box">
              <div style={{ textAlign: "center" }}>
                {vehicle.img_url && (
                  <img
                    src={vehicle.img_url}
                    alt={vehicle.name}
                    width={400}
                    height={400}
                    style={{ objectFit: "contain" }}
                  />
                )}
                {!vehicle.img_url && <div>No Image</div>}
              </div>
              <div className="section-separator-top"></div>
              <div>
                <h2 className="vehicleName">{vehicle.name}</h2>
                <p>
                  <strong>Asset ID:</strong> {vehicle.id}
                </p>
                <p>
                  <strong>Name:</strong> {vehicle.name}
                </p>
                <p>
                  <strong>Body Type:</strong> {vehicle.body_type}
                </p>
                <p>
                  <strong>Maintenance Status:</strong>{" "}
                  {vehicle.maintenance_status}
                </p>
                <p>
                  <strong>
                    Last Maintenance Date:{" "}
                    {dateFormat(vehicle.last_maintenance, "mmmm dS, yyyy")}
                  </strong>
                </p>
                <div className="certified-img">
                  <img
                    src="https://partnerstatic.carfax.com/img/valuebadge/1own_good.svg"
                    data-vin="1C4PJLLB5KD265292"
                    data-partner="TVO_0"
                    data-key="rtB4JiLdPL5VEEEcXZo76Q=="
                    alt="Carfax one owner"
                    className="certified-img-item"
                  />
                </div>
              </div>
            </div>
          ))}
          {filterItems.length === 0 && !loading && !error && (
            <div>No vehicles match the current filters.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
