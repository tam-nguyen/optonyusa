import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // You can create this for styling
import dateFormat from "dateformat";

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [bodyTypes, setBodyTypes] = useState([]);
  const [maintenanceStatuses, setMaintenanceStatuses] = useState([]);
  const [filterBodyType, setFilterBodyType] = useState("");
  const [filterMaintenanceStatus, setFilterMaintenanceStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const bodyTypesResponse = await axios.get(
          "http://localhost:5001/api/body-types"
        );

        setBodyTypes(bodyTypesResponse.data);
        const maintenanceStatusesResponse = await axios.get(
          "http://localhost:5001/api/maintenance-statuses"
        );
        setMaintenanceStatuses(maintenanceStatusesResponse.data);
      } catch (err) {
        console.error("Error fetching filter options:", err);
        setError("Failed to load filter options.");
      }
    };

    fetchOptions();
  }, []);

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:5001/api/vehicles?bodyType=${filterBodyType}&maintenanceStatus=${filterMaintenanceStatus}`
        );

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
  }, [filterBodyType, filterMaintenanceStatus]);

  const handleBodyTypeChange = (event) => {
    setFilterBodyType(event.target.value);
  };

  const handleMaintenanceStatusChange = (event) => {
    setFilterMaintenanceStatus(event.target.value);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      <h1>City Fleet</h1>

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
          {bodyTypes.map((type) => (
            <option
              key={type}
              value={type}>
              {type}
            </option>
          ))}
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
          {maintenanceStatuses.map((status) => (
            <option
              key={status}
              value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div>Loading vehicles...</div>
      ) : (
        <div className="row mb-5 mt-2">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
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
          {vehicles.length === 0 && !loading && !error && (
            <div>No vehicles match the current filters.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
