import React from 'react';

export const Header = () => {
  return (
    <div style={styles.header}><h1 style={styles.title}>Match My Heat</h1></div>
  );
};

const styles = {
  header: {
    height: '10vh',
    maxHeight: '100px',
    backgroundColor: '#f1f1f1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: '40px'
  }
};
