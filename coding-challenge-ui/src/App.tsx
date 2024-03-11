import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Orders, SortByType, OrderByType, User } from "./types";
import { orderTableHeaderValues, serverUrl } from "./utils/constants";

import OrderTable from "./components/OrderTable";
import Header from "./components/Header";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppWrapper, Container, ContainerHeading } from "./App.styles";


const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [finalPageNo, setFinalPageNo] = useState<number>(1);
  const [orders, setOrders] = useState<Orders[]>([]);
  const [sortBy, setSortBy] = useState<SortByType>('daysOverdue');
  const [orderBy, setOrderBy] = useState<OrderByType>('desc');

  useEffect(() => {
    fetch(`${serverUrl}user`)
      .then(checkStatusCodeApi)
      .then((data) => {
        setUser(data);
      }).catch(handleApiError)
  }, [])

  useEffect(() => {
    if (page && !loading) {
      setLoading(true)
      fetchOrders()
    }
  }, [page, orderBy, sortBy])



  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center"
      });
      // setTimeout(()=>{

      // })
      setError('')
    }
  }, [error])



  const fetchOrders = () => {
    fetch(`${serverUrl}sales/${page}?sortBy=${sortBy}&orderBy=${orderBy}`)
      .then(checkStatusCodeApi)
      .then((data) => {
        setOrders(data.orders);
        setFinalPageNo(data.finalPageIndex);
        setLoading(false)
      }).catch(e => {
        setLoading(false)
        handleApiError(e)
      })
  }

  const checkStatusCodeApi = (resp:Response) => {
    if (resp.status === 200) {
      return resp.json()
    } else {
      return Promise.reject(resp)
    }
  }


const handleApiError = (e: any) => {
  if (e.message) {
    setError(e.message)
    // console.error(e.message)
  } else {
    e.json().then((err: any) => {
      setError(err.message)
      // console.error(err.message)
    })
  }
}

const handleSort = (header: string) => {
  const headerValue = orderTableHeaderValues.find(({ name }) => name === header)?.value
  if (headerValue) {
    if (sortBy === headerValue) {
      setOrderBy(orderBy === 'desc' ? 'asc' : 'desc')
    } else {
      setSortBy(headerValue as SortByType)
    }
  }
}

return (
  <AppWrapper>
    <Header user={user} />
    <Container>
      <ContainerHeading>Overdue Orders</ContainerHeading>
      <OrderTable handleSort={handleSort} page={page} setPage={setPage} loading={loading} orders={orders} finalPageNo={finalPageNo} />
    </Container>
    <ToastContainer />
  </AppWrapper >
);
};

export default App;
