import React, { useState } from 'react';
import './TenantFileGallery.css'; // Make sure to have your CSS styles defined as required

async function fetchFilesFromDirectory(apiUrl) {
  let filesList = [];

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Log the full data to inspect its structure
    console.log("Received data:", data);

    if (Array.isArray(data)) {
      // ... existing array handling logic ...
    } else {
      // Check if data has a message property, which typically indicates an error response
      if (data.message) {
        console.error('GitHub API error:', data.message);
      } else {
        // If it's not an error response, handle the single file/directory object
        console.error('Expected an array, but received an object:', data);
      }
    }
  } catch (error) {
    console.error('Error fetching directory:', error);
  }

  return filesList;
}

function TenantFileGallery() {
  const [tenant, setTenant] = useState('');
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  const handleTenantChange = (event) => {
    setTenant(event.target.value);
  };

  const handleSearch = async () => {
    setError(null);
    if (tenant) {
      const apiUrl = `https://api.github.com/repos/PaybotsAI/paybotsai.github.io/contents/vip/${tenant}`;
      const fetchedFiles = await fetchFilesFromDirectory(apiUrl);
      setFiles(fetchedFiles);
    } else {
      setError('Please enter a tenant name.');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={tenant}
        onChange={handleTenantChange}
        placeholder="Enter Tenant Name"
      />
      <button onClick={handleSearch}>Load Tenant Files</button>
      {error && <p className="error-message">{error}</p>}
      <div className="file-gallery">
        {files.map((file, index) => (
          <div key={index} className="file-item">
            <img
              src={file.download_url.replace('.jpg', '_thumbnail.png').replace('.png', '_thumbnail.png')}
              alt={`Thumbnail for ${file.name}`}
            />
            <p>{file.name}</p>
            <a href={file.download_url} target="_blank" rel="noopener noreferrer">
              View
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TenantFileGallery;

