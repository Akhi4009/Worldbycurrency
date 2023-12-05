import {useState,useEffect} from 'react'
import {Input,InputGroup,InputLeftElement,Card, CardBody,
    Box, CardFooter,Text,Divider,Stack,Image,Grid,
} from "@chakra-ui/react"
import {SearchIcon} from "@chakra-ui/icons"
import axios from "axios"
import useDebounce from '../Custom/Debounce'
import Loading from './Loading'


const SearchBar = () => {

    const [currency,setCurrency]=useState("")
    const [countries,setCountries]=useState([])
    const [loading,setLoading]=useState(false)

    const deCurrency=useDebounce(currency,1000)
   
    useEffect(()=>{

        const SearchCountry=async(currency)=>{

          setLoading(true)

            try{

                const res= await axios.get(`https://restcountries.com/v3.1/currency/${currency}`)
                // console.log(res)
                setCountries(res.data)
                setLoading(false)
               

            }catch(err){
                console.error(err)
                setLoading(false)
            }

        }
        if(deCurrency.length>0){
            SearchCountry(deCurrency)
            
         }
        
    },[deCurrency])

   
  
  return (
    <Box maxW="60%" m={"50px auto"} >
    <InputGroup >
    <InputLeftElement pointerEvents='none'>
    <SearchIcon/>
    </InputLeftElement>
    <Input  type='text' value={currency} onChange={(e)=>setCurrency(e.target.value)} placeholder='Search By currency INR, EUR' />
  </InputGroup>
  <Grid justifyContent={"center"} templateColumns={{base:'1fr',sm:'repeat(2,1fr)'}}gap={6} mt="50px">

  {loading && <Loading/>}
  {
    countries &&countries.map(ele=>

        <Card maxW='xsm' key={ele.cca2}>
  <CardBody>
    <Image
    objectFit='cover'
      src={ele.flags.png}
      borderRadius='md'
    />
    </CardBody>
  <Divider />
  <CardFooter>
  <Stack >
    <Text >Name: {ele.name.common}</Text>
    <Text>Capital: {ele&&ele.capital&&ele.capital[0]}</Text>
    </Stack>
  </CardFooter>
</Card>

        )
  }
  </Grid>
    </Box>
  )
}

export default SearchBar