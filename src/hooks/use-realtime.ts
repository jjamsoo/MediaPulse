'use client';

import { useState, useEffect, useRef } from 'react';

export function useRealTimeUpdates(intervalMs: number = 5000) {
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isConnected, setIsConnected] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Simulate real-time connection
    const connect = () => {
      setIsConnected(true);
      intervalRef.current = setInterval(() => {
        setLastUpdate(new Date());

        // Simulate occasional disconnection
        if (Math.random() < 0.05) { // 5% chance of temporary disconnection
          setIsConnected(false);
          setTimeout(() => setIsConnected(true), 2000);
        }
      }, intervalMs);
    };

    connect();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [intervalMs]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return {
    lastUpdate,
    isConnected,
    formatTime
  };
}

export function useSimulatedData<T>(
  initialData: T[],
  updateFn: (data: T[]) => T[],
  intervalMs: number = 10000
) {
  const [data, setData] = useState(initialData);
  const { isConnected } = useRealTimeUpdates(intervalMs);

  useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(() => {
      setData(prevData => updateFn([...prevData]));
    }, intervalMs);

    return () => clearInterval(interval);
  }, [updateFn, intervalMs, isConnected]);

  return { data, isConnected };
}
