import React, {useState, useContext, useEffect} from 'react'
import { AccountContext } from './AccountProvider'

const Welcome = () => {
  const [listingData, setListingData] = useState([])
  const {accessToken} = useContext(AccountContext)
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const getData = async () => {
    let config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
    setIsError(false);
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/listings/all', config)
      const lData = await response.json()
      console.log(lData)
      setListingData(lData.listings)
    }catch(err){
      console.error(err);
      setIsError(true);
    }   
    setIsLoading(false);
    
  }

  useEffect(() => {
      getData();
  }, [])

  console.log(listingData)

  const outputs = {
    "true-true": <p>Loading...</p>,
    "true-false": <p>Loading...</p>,
    "false-true": <p>Search error. Please try again.</p>,
    
  }



  return (
    <div  className='data'>
      {outputs[`${isLoading}-${isError}`] }
      {accessToken !== null ? listingData.map((l) => 
        <div>
           <p>{l.pk}</p>
          <p>{l.name}</p>
        </div>
      ) : ""}
    </div>

  )
}

export default Welcome