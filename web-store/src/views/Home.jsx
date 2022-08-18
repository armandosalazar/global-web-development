import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import { UilLocationPoint } from '@iconscout/react-unicons';
import { useState } from 'react';

export default function Home() {
  const [location, setLocation] = useState(false);

  return (
    <div className={styles.container}>
      <div>
        <span>WebStore</span>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. In quos,
          similique cum reprehenderit magni cupiditate non neque dolores
          nostrum, nulla ut incidunt laborum! Exercitationem voluptatum placeat
          dignissimos voluptate labore doloremque.
        </p>
        <Link to='register'>
          <button>Register</button>
        </Link>
      </div>
      <div>
        <button
          onClick={() => setLocation(!location)}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <UilLocationPoint />
          <span style={{ display: 'inline-block', marginLeft: '5px' }}></span>
          Location
        </button>
        {location ? (
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14931.230513044644!2d-103.347178!3d20.677404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428b1ef95a50caf%3A0xe322b99cc4a5b06d!2sC.%20Pino%20Su%C3%A1rez%20186%2C%20Zona%20Centro%2C%2044100%20Guadalajara%2C%20Jal.!5e0!3m2!1ses-419!2smx!4v1660803996181!5m2!1ses-419!2smx'
            width='500'
            height='350'
            style={{ border: '1px solid #646cff', borderRadius: '10px' }}
            // style='border:0;'
            // allowfullscreen=''
            // loading='lazy'
            // referrerpolicy='no-referrer-when-downgrade'
          ></iframe>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
