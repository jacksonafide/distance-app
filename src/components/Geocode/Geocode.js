import React, {useState} from 'react';
import Display from '../Display/Display';
import classes from './Geocode.module.css';

const Geocode = () => {
    let [responseObj, setResponseObj] = useState({});
    let [responseObj2, setResponseObj2] = useState({});
    let [city, setCity] = useState('');
    let [city2, setCity2] = useState('');
    let [error, setError] = useState(false);

    const uriEncodedCity = encodeURIComponent(city);
    const uriEncodedCity2 = encodeURIComponent(city2);

    async function getCity(e) {
        e.preventDefault();

        setResponseObj({});
        setResponseObj2({});

        try {
            let [c1, c2] = await Promise.all([
                fetch(`https://nominatim.openstreetmap.org/search?city=${uriEncodedCity}&format=json&limit=1`).then(response => response.json()),
                fetch(`https://nominatim.openstreetmap.org/search?city=${uriEncodedCity2}&format=json&limit=1`).then(response => response.json())  
            ])
            if (c1[0].licence === undefined || c2[0].licence === undefined) {
                throw new Error();
            } else {
                setResponseObj(c1[0])
                setResponseObj2(c2[0])
            }
        }
        catch (err) {
            setError(true);
            console.log(err.message);
        }
    }

    return (
        <div className = {classes.Container}>
            <form className = {classes.Form} onSubmit = {getCity}>
                <label className = {classes.Title}>
                    Enter first city
                    <input
                        type = "text"
                        placeholder = "E.g. London"
                        maxLength = "50"
                        value = {city}
                        onChange = {(e) => setCity(e.target.value)}
                        className = {classes.TextInput}
                    />
                </label>
                <label className = {classes.Title}>
                    Enter second city
                    <input
                        type = "text"
                        placeholder = "E.g. Berlin"
                        maxLength = "50"
                        value = {city2}
                        onChange = {(e) => setCity2(e.target.value)}
                        className = {classes.TextInput}
                    />
                </label>
                <button type = 'submit' className = {classes.Button}>Calculate distance between</button>
            </form>
            <Display
                responseObj = {[responseObj, responseObj2]}
                error = {error}
            />
        </div>
    )
}

export default Geocode;