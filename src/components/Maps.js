import React, { useState } from 'react';
import axios from 'axios';
import Location from './Location';

const Maps = () => {
  const [showMap, setShowMap] = useState(false);
  const [geometry, setGeo] = useState();
  // lat & lng is center point
  const [lat, setLat] = useState(35.72123671702373);
  const [lng, setLng] = useState(139.7315125062222);
  let object = [];

  const getData = async (e) => {
    e.preventDefault();

    const token =
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJzYW5vQDEwNy5jby5qcCIsImRlcGFydG1lbnQiOiIiLCJuYW1lIjoiTm9yaXlhc3UgU2FubyIsImFkZCI6IiIsImxuZyI6MCwibGF0IjowLCJpYXQiOiIyMDIzLTAxLTEzVDE3OjIyOjQ4LjY0MTg5ODIzNloiLCJleHAiOiIyMDIzLTA3LTEyVDE3OjIyOjQ4LjY0MTg5ODIzNloiLCJpc3MiOiIxMDciLCJhdXQiOjN9.m09MKhzrnnCd-tosNJZyHVV12ErWOACExzdOfoeB6DuPc7s3QA6yagWIA8ZADWQgow9Wp0F6VHjfDdYpbh6C9iluLwb7rBmOPdsnzUi6vYKmCEx2ETeer0CjfEdUeu7yqcb-LmYXewOlwxhLR-GOUtD4VGok3bgc8nE-np8na50=';

    const response = await axios.post(
      'https://ato-auto-estimate.107.jp/api/v1/trial',
      { lat: 35.72123671702373, lng: 139.7315125062222 },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const geo = response.data.value.features;

    setGeo(geo);
    setShowMap(true);
  };

  return (
    <div>
      <form className="mb-9">
        <div className="w-full flex justify-center gap-7">
          <div>
            <label htmlFor="lat" className="mb-2 text-sm font-medium text-gray-900">
              Latitude
            </label>
            <input
              type="text"
              id="lat"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="latitude"
              value={35.72123671702373}
              onChange={(e) => setLat(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="lng" className="mb-2 text-sm font-medium text-gray-900 ">
              Longitude
            </label>
            <input
              type="text"
              id="lng"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="longitude"
              value={139.7315125062222}
              onChange={(e) => setLng(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex justify-center mt-3">
          <button type="submit" className="block py-1 px-2 bg-teal-700 text-slate-100 rounded-md" onClick={(e) => getData(e)}>
            Run App
          </button>
        </div>
      </form>

      {geometry &&
        geometry.map((item) => {
          item.geometry.coordinates.map((lang) => {
            lang.map((coor) => {
              const obj = coor.map(([lng, lat]) => ({ lng, lat }));
              object.push(obj);
            });
          });
        })}
      {showMap && (
        <div className="flex justify-center">
          <Location lat={lat} lng={lng} coor={object} />
        </div>
      )}
    </div>
  );
};

export default Maps;
