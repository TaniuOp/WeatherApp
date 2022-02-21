import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDebounce } from 'use-debounce';
import { useAlert } from 'react-alert';

const Main = () => {
  const [cityData, setCityData] = useState([]);
  const [location, setLocation] = useState();
  const [searchedCity, setSearchedCity] = useState('');
  const [cityDebounceInput] = useDebounce(searchedCity, 1500);
  const alert = useAlert();

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation([position.coords.latitude, position.coords.longitude]);
    });
    const getCityWeather = async () => {
      try {
        if (searchedCity) {
          const url = `https://www.metaweather.com/api/location/search/?query=${searchedCity}`;
          const results = await (await axios.get(url)).data;
          console.log(results);
        }
      } catch (err) {
        console.log(err);
        setSearchedCity([]);
      }
    };
    getCityWeather();
  }, [cityDebounceInput]);

  const userLocation = () => {
    sleep(2000).then(() => {
      getLocation();
    });
  };

  const getLocation = async () => {
    try {
      if (location) {
        const url = await axios.get(
          `https://www.metaweather.com/api/location/search/?lattlong=${location[0]},${location[1]}`
        );
        const results = url.data;
        console.log(results);
      } else {
        return alert.show(
          'This app does not have permission to access your location.'
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSearchedCity(event.target.city.value);
  };

  return (
    <div>
      <h1>CITY WEATHER</h1>
      <div className='formDiv'>
        <h1>Search city!</h1>
        <form className='formBounce' onSubmit={handleSubmit}>
          <input
            type='text'
            name='city'
            id='city'
            autoComplete='off'
            onChange={(e) => {
              setSearchedCity(e.target.value);
            }}
            required
          />
        </form>
        <img
          src={require('../assets/gpsblack.png')}
          alt='location'
          onClick={userLocation}
        />
      </div>
      <p>Today</p>
    </div>
  );
};

export default Main;
