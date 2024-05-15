import {useState, useEffect} from 'react'
import { useDispatch } from "react-redux";
import ApiService from "../Services/ApiService";
import { setAuthData } from '../store/reducers/AuthReducer';

export function useToken() {
    const [Token, setToken] = useState<string | null>(null);
    const [checking, setChecking] = useState(true);
  
    const dispatch = useDispatch();
  
    useEffect(() => {
      const token = localStorage.getItem("AUTH_TOKEN");
      setToken(token);
      if (token) {
        ApiService.setAuthHeader(token);
        dispatch(setAuthData({ authToken: token }));
      }
      setTimeout(() => {
        setChecking(false);
      }, 3000);
    }, []);
  
    return { Token, checking };
  }