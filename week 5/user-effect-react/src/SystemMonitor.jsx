import { useEffect, useState } from "react";

function SystemMonitor() {
  const [cpu, setCpu] = useState(25);
  const [memory, setMemory] = useState(40);
  const [network, setNetwork] = useState(10);

  const [alerts, setAlerts] = useState([]);

  const CPU_THRESHOLD = 80;
  const MEMORY_THRESHOLD = 85;
  const NETWORK_THRESHOLD = 90;

  // =========================
  // LOAD SAVED DATA
  // =========================
  useEffect(() => {
    const savedData = localStorage.getItem("systemMonitorData");

    if (savedData) {
      const parsedData = JSON.parse(savedData);

      setCpu(parsedData.cpu || 25);
      setMemory(parsedData.memory || 40);
      setNetwork(parsedData.network || 10);
    }
  }, []);

  // =========================
  // CPU SIMULATION
  // =========================
  useEffect(() => {
    const cpuInterval = setInterval(() => {
      const randomCpu = Math.floor(Math.random() * 101);

      setCpu(randomCpu);
    }, 2000);

    return () => {
      clearInterval(cpuInterval);
    };
  }, []);

  // =========================
  // MEMORY SIMULATION
  // =========================
  useEffect(() => {
    const memoryInterval = setInterval(() => {
      const randomMemory = Math.floor(Math.random() * 101);

      setMemory(randomMemory);
    }, 2500);

    return () => {
      clearInterval(memoryInterval);
    };
  }, []);

  // =========================
  // NETWORK SIMULATION
  // =========================
  useEffect(() => {
    const networkInterval = setInterval(() => {
      const randomNetwork = Math.floor(Math.random() * 101);

      setNetwork(randomNetwork);
    }, 3000);

    return () => {
      clearInterval(networkInterval);
    };
  }, []);

  // =========================
  // ALERT SYSTEM
  // =========================
  useEffect(() => {
    const newAlerts = [];

    if (cpu > CPU_THRESHOLD) {
      newAlerts.push(`High CPU usage: ${cpu}%`);
    }

    if (memory > MEMORY_THRESHOLD) {
      newAlerts.push(`High memory usage: ${memory}%`);
    }

    if (network > NETWORK_THRESHOLD) {
      newAlerts.push(`High network usage: ${network}%`);
    }

    setAlerts(newAlerts);
  }, [cpu, memory, network]);

  // =========================
  // SAVE DATA TO LOCAL STORAGE
  // =========================
  useEffect(() => {
    const data = {
      cpu,
      memory,
      network,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem(
      "systemMonitorData",
      JSON.stringify(data)
    );
  }, [cpu, memory, network]);

  return (
    <div className="monitor-container">
      <h1>System Monitor Dashboard</h1>

      <div className="monitor-grid">
        <div className="monitor-card">
          <h2>CPU Usage</h2>

          <p>{cpu}%</p>

          <progress
            value={cpu}
            max="100"
          ></progress>
        </div>

        <div className="monitor-card">
          <h2>Memory Usage</h2>

          <p>{memory}%</p>

          <progress
            value={memory}
            max="100"
          ></progress>
        </div>

        <div className="monitor-card">
          <h2>Network Usage</h2>

          <p>{network}%</p>

          <progress
            value={network}
            max="100"
          ></progress>
        </div>
      </div>

      <div className="alert-section">
        <h2>System Alerts</h2>

        {alerts.length === 0 ? (
          <p>No alerts. System is running normally.</p>
        ) : (
          alerts.map((alert, index) => (
            <div
              key={index}
              className="alert-message"
            >
              {alert}
            </div>
          ))
        )}
      </div>

      <div className="threshold-section">
        <h2>Threshold Settings</h2>

        <p>CPU Alert: above {CPU_THRESHOLD}%</p>

        <p>
          Memory Alert: above {MEMORY_THRESHOLD}%
        </p>

        <p>
          Network Alert: above {NETWORK_THRESHOLD}%
        </p>
      </div>
    </div>
  );
}

export default SystemMonitor;