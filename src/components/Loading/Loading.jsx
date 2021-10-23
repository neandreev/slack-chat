import classes from './spinner.module.css';
import React from 'react';

const Spinner = () => (
  <span className={classes.Spinner}>
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
  </span>
);

const Loading = () => (
  <div className="fade show" style={{ display: 'block' }}>
    <Spinner />
  </div>
);

export default Loading;
