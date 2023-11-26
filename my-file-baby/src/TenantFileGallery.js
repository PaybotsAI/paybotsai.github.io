import React, { useState, useEffect } from 'react';
import './TenantFileGallery.css'; // We will create this CSS file in the next step

function TenantFileGallery() {
  const [tenant, setTenant] = useState('');
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (tenant) {
      const fetchFiles = async () => {
        try {
          const response = await fetch(`https://api.github.com/repos/PaybotsAI/paybotsai.github.io/contents/vip/${tenant}`);
          const data = await response.json();
          setFiles(data.filter(file => file.name.endsWith('.jpg') || file.name.endsWith('.png')));
        } catch (error) {
          console.error('Error fetching files:', error);
        }
      };

      fetchFiles();
    }
  }, [tenant]);

  const handleTenantChange = (event) => {
    setTenant(event.target.value);
  };

  return (
    <div>
      <input type="text" value={tenant} onChange={handleTenantChange} placeholder="Enter Tenant Name" />
      <div className="file-gallery">
        {files.map(file => (
          <div key={file.name} className="file-item">
            <img src={file.download_url.replace('.jpg', '_thumbnail.png').replace('.png', '_thumbnail.png')} alt={`Thumbnail for ${file.name}`} />
            <p>{file.name}</p>
            <a href={file.download_url} target="_blank" rel="noopener noreferrer">View</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TenantFileGallery;

