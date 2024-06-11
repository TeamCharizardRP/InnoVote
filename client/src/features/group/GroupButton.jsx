import React from 'react';

const LoginButton = () => {
  const navigate = () => {
    window.location.href =
      // 'https://skyscraperwerock.auth.us-east-2.amazoncognito.com/oauth2/authorize?client_id=6hjtfh1ddmn4afj4c29ddijj32&response_type=token&scope=email+openid+phone+profile&redirect_uri=https%3A%2F%2Fskyscraper-api.com%2Fdashboard';
      'https://skyscraperwerock.auth.us-east-2.amazoncognito.com/login?client_id=6hjtfh1ddmn4afj4c29ddijj32&response_type=token&scope=email+openid+phone+profile&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fdashboard';
  };

  return (
    <div>
      <button className='log-button' onClick={navigate}>
        Log In
      </button>
    </div>
  );
};

export default LoginButton;
