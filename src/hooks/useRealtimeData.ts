import { useState, useEffect, useCallback } from 'react';

// Simulate real-time data for the farm system
export function useRealtimeData() {
  const [currentTemp, setCurrentTemp] = useState(24);
  const [humidity, setHumidity] = useState(74);
  const [airQuality, setAirQuality] = useState(85);
  const [lightSensors, setLightSensors] = useState([
    { id: 'galpon1', name: 'Galpón 1', value: 3000, max: 5000 },
    { id: 'galpon2', name: 'Galpón 2', value: 4500, max: 5000 },
    { id: 'galpon3', name: 'Galpón 3', value: 3500, max: 5000 },
  ]);
  const [waterLevels, setWaterLevels] = useState([
    { id: 'tank1', name: 'Tanque Principal', value: 85, max: 100 },
    { id: 'tank2', name: 'Tanque Reserva', value: 65, max: 100 },
    { id: 'bebedero1', name: 'Bebedero A', value: 90, max: 100 },
  ]);
  const [feedLevels, setFeedLevels] = useState([
    { id: 'silo1', name: 'Silo 1', value: 78, max: 100 },
    { id: 'silo2', name: 'Silo 2', value: 45, max: 100 },
    { id: 'silo3', name: 'Silo 3', value: 92, max: 100 },
  ]);
  const [motionData, setMotionData] = useState({
    activity: 65,
    lastDetection: new Date(),
    activeZones: 3
  });
  const [deviceStatus, setDeviceStatus] = useState([
    { id: 'temp_sensor_1', name: 'Sensor Temperatura 1', status: 'online', type: 'temperature' },
    { id: 'temp_sensor_2', name: 'Sensor Temperatura 2', status: 'online', type: 'temperature' },
    { id: 'humidity_sensor', name: 'Sensor Humedad', status: 'online', type: 'humidity' },
    { id: 'light_sensor_1', name: 'Sensor Luz 1', status: 'online', type: 'light' },
    { id: 'light_sensor_2', name: 'Sensor Luz 2', status: 'offline', type: 'light' },
    { id: 'water_level_1', name: 'Sensor Agua 1', status: 'online', type: 'water' },
    { id: 'motion_detector_1', name: 'Detector Movimiento 1', status: 'warning', type: 'motion' },
  ]);

  const generateTemperatureData = useCallback(() => {
    const hours = Array.from({ length: 24 }, (_, i) => {
      const hour = new Date();
      hour.setHours(i, 0, 0, 0);
      return {
        time: hour.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        temperatura: 20 + Math.random() * 10 + Math.sin(i / 4) * 3,
        humedad: 60 + Math.random() * 20 + Math.cos(i / 6) * 10
      };
    });
    return hours;
  }, []);

  const generateAirQualityData = useCallback(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      time: new Date(Date.now() - (19 - i) * 60000).toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      calidad: 70 + Math.random() * 25,
      co2: 400 + Math.random() * 200,
      nh3: 1 + Math.random() * 3
    }));
  }, []);

  const [temperatureHistory] = useState(generateTemperatureData);
  const [airQualityHistory] = useState(generateAirQualityData);

  // Simulate real-time updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Update temperature (realistic variation)
      setCurrentTemp(prev => {
        const variation = (Math.random() - 0.5) * 2; // ±1 degree variation
        return Math.max(18, Math.min(30, prev + variation));
      });

      // Update humidity
      setHumidity(prev => {
        const variation = (Math.random() - 0.5) * 4; // ±2% variation
        return Math.max(40, Math.min(90, prev + variation));
      });

      // Update air quality
      setAirQuality(prev => {
        const variation = (Math.random() - 0.5) * 6; // ±3% variation
        return Math.max(60, Math.min(100, prev + variation));
      });

      // Update light sensors
      setLightSensors(prev => prev.map(sensor => ({
        ...sensor,
        value: Math.max(0, Math.min(sensor.max, sensor.value + (Math.random() - 0.5) * 200))
      })));

      // Update water levels (slow decrease)
      setWaterLevels(prev => prev.map(tank => ({
        ...tank,
        value: Math.max(0, tank.value - Math.random() * 0.5)
      })));

      // Update feed levels (slow decrease)
      setFeedLevels(prev => prev.map(silo => ({
        ...silo,
        value: Math.max(0, silo.value - Math.random() * 0.3)
      })));

      // Update motion data
      setMotionData(prev => ({
        ...prev,
        activity: Math.max(0, Math.min(100, prev.activity + (Math.random() - 0.5) * 10)),
        lastDetection: Math.random() > 0.8 ? new Date() : prev.lastDetection,
        activeZones: Math.floor(Math.random() * 5) + 1
      }));

      // Occasionally change device status
      if (Math.random() > 0.9) {
        setDeviceStatus(prev => prev.map(device => {
          if (Math.random() > 0.8) {
            const statuses = ['online', 'offline', 'warning'];
            return {
              ...device,
              status: statuses[Math.floor(Math.random() * statuses.length)] as any
            };
          }
          return device;
        }));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return {
    currentTemp,
    humidity,
    airQuality,
    lightSensors,
    waterLevels,
    feedLevels,
    motionData,
    deviceStatus,
    temperatureHistory,
    airQualityHistory
  };
}