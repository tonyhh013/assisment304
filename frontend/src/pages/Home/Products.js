import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Product from './Product'
function Products() {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    useEffect(() => {
        setLoading(true)
        axios({
            method: 'GET',
            baseURL: 'https://api.escuelajs.co',
            url: '/api/v1/products?offset=0&limit=10',
            })
            .then(({ data }) => {
                setData(data)
            })
            .catch(err => console.dir(err))
            .finally(() => setLoading(false))
    }, [])
    
  return (
    <div>
        
         {data && data.map((item,i)=>(<Product data={item} key={i} />))} 
    </div>
    
  )
}

export default Products