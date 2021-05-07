import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

export default useMapSocket = ({ user, refreshMap }) => {
    const ref = useRef();

    useEffect(() => {
        const socket = io('http://192.168.1.234:5000');
        socket.emit('watch-map', user._id);

        socket.on("watch-map", () => {
            console.log('refreshing map');
            refreshMap();
        });

        socket.on('reconnect', () => {
            socket.emit('watch-map', user._id);
        });

        ref.current = socket;

        return () => {
            socket.disconnect();
        }
    }, []);
};