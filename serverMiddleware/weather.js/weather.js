import axios from 'axios';



export default async function (req, res) {
  const { key, city } = req.query
  try {
    const response = await axios.get('https://api.weatherapi.com/v1/forecast.json', {
      params: {
        key,
        q: city,
        aqi: 'no',
        alerts: 'no'
      }
    })
    res.json(response.data)
  } catch (err) {
    res.status(500).json({ err: 'Internal Server Error' })
  }
}