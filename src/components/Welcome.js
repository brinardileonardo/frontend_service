import React from 'react'
import { useSelector } from 'react-redux';

export const Welcome = () => {
  const {user} = useSelector((state) => state.auth);

  return (
    <div>
      <h1 className="title">Dashboard</h1>
      <h2 className="subtitle">Hi {user.name} </h2>
    </div>
  )
}