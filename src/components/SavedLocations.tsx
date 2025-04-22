import React from 'react';
import { MapPin, Star, Edit, Trash2 } from 'lucide-react';
import './SavedLocations.css';

const SavedLocations: React.FC = () => {
  return (
    <div className="saved-locations">
      <div className="section-header">
        <h3>Saved Locations</h3>
        <button className="add-btn">+ Add New</button>
      </div>

      <div className="locations-list">
        <div className="location-item">
          <div className="location-icon">
            <Star size={18} color="#f39c12" fill="#f39c12" />
          </div>
          <div className="location-info">
            <h4>Home Base</h4>
            <p>37.7749° N, 122.4194° W</p>
          </div>
          <div className="location-actions">
            <button className="icon-btn"><MapPin size={16} /></button>
            <button className="icon-btn"><Edit size={16} /></button>
            <button className="icon-btn delete"><Trash2 size={16} /></button>
          </div>
        </div>

        <div className="location-item">
          <div className="location-icon">
            <MapPin size={18} color="#3498db" />
          </div>
          <div className="location-info">
            <h4>City Center</h4>
            <p>37.7847° N, 122.4275° W</p>
          </div>
          <div className="location-actions">
            <button className="icon-btn"><MapPin size={16} /></button>
            <button className="icon-btn"><Edit size={16} /></button>
            <button className="icon-btn delete"><Trash2 size={16} /></button>
          </div>
        </div>

        <div className="location-item">
          <div className="location-icon">
            <MapPin size={18} color="#3498db" />
          </div>
          <div className="location-info">
            <h4>Airport</h4>
            <p>37.6213° N, 122.3790° W</p>
          </div>
          <div className="location-actions">
            <button className="icon-btn"><MapPin size={16} /></button>
            <button className="icon-btn"><Edit size={16} /></button>
            <button className="icon-btn delete"><Trash2 size={16} /></button>
          </div>
        </div>

        <div className="location-item">
          <div className="location-icon">
            <MapPin size={18} color="#3498db" />
          </div>
          <div className="location-info">
            <h4>Golden Gate Bridge</h4>
            <p>37.8199° N, 122.4783° W</p>
          </div>
          <div className="location-actions">
            <button className="icon-btn"><MapPin size={16} /></button>
            <button className="icon-btn"><Edit size={16} /></button>
            <button className="icon-btn delete"><Trash2 size={16} /></button>
          </div>
        </div>

        <div className="location-item">
          <div className="location-icon">
            <MapPin size={18} color="#3498db" />
          </div>
          <div className="location-info">
            <h4>Fisherman's Wharf</h4>
            <p>37.8080° N, 122.4177° W</p>
          </div>
          <div className="location-actions">
            <button className="icon-btn"><MapPin size={16} /></button>
            <button className="icon-btn"><Edit size={16} /></button>
            <button className="icon-btn delete"><Trash2 size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedLocations;