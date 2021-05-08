import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { makeAuthRequest } from '../helpers/fetch';

export default useSpotSocket = ({ spotId, user, onUserDataChange }) => {
  const ref = useRef();
  const [currSpot, setSpot] = useState(null);

  const joinSession = () => {
    makeAuthRequest(`http://192.168.1.234:5000/spots/join/${spotId}`, user, 'POST')
      .then(res => {
        if (res.success) {
          onUserDataChange({ ...user, inSession: true });
        }
      }).catch(err => {
        console.log(err.message);
      });
  }

  const leaveSession = () => {
    makeAuthRequest(`http://192.168.1.234:5000/spots/leave/${spotId}`, user, 'POST')
      .then(res => {
        if (res.success) {
          onUserDataChange({ ...user, inSession: false });
        }
      }).catch(err => {
        console.log(err.message);
      });
  }

  const getSpot = () => {
    makeAuthRequest(`http://192.168.1.234:5000/spots/get/${spotId}`)
      .then(res => {
        if (res.status) {
          setSpot(res.spot);
        }
      }).catch(err => {
        console.log(err.message);
      });
  }

  useEffect(() => {
    getSpot();
    const socket = io('http://192.168.1.234:5000');
    socket.emit('watch-spot', spotId);

    socket.on("watch-spot", (spot) => {
      setSpot(spot);
    });

    socket.on('reconnect', () => {
      socket.emit('watch-spot', spotId);
    });

    ref.current = socket;

    return () => {
      socket.disconnect();
    }
  }, []);

  return [currSpot, joinSession, leaveSession];
};