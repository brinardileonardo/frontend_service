import React, {useEffect} from 'react';
import { Layout } from './Layout';
import { Welcome } from '../components/Welcome';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { getInfo } from '../features/authSlice';

export const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError} = useSelector((state => state.auth));

  useEffect(()=>{
    dispatch(getInfo());
  }, [dispatch]);

  useEffect(()=>{
    if(isError){
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <Layout>
      <Welcome/>
    </Layout>
  )
}
