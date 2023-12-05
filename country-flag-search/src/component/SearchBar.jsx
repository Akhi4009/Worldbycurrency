import {useState,useEffect} from 'react'
import {Input,InputGroup,InputLeftElement,Card, CardBody,
    Box, CardFooter,Text,Divider,Stack,Image,Grid
} from "@chakra-ui/react"
import {SearchIcon} from "@chakra-ui/icons"
import axios from "axios"
import useDebounce from '../Custom/Debounce'
import Loading from './Loading'


const SearchBar = () => {

    const [currency,setCurrency]=useState("")
    const [countries,setCountries]=useState([])
    const [loading,setLoading]=useState(false)
    const [err,setErr]=useState(false)

    const deCurrency=useDebounce(currency,1000).trim().toLowerCase()
   
    useEffect(()=>{

        const SearchCountry=async(currency)=>{

          setLoading(true)

            try{

                const res= await axios.get(`https://restcountries.com/v3.1/currency/${currency}`)
                // console.log(res)
                setCountries(res.data)
                setLoading(false)
                setErr(false)
               

            }catch(err){
                console.error(err)
                setLoading(false)
                setErr(true)
            }

        }
        if(deCurrency.length>0){
            SearchCountry(deCurrency)
            
         }
        
    },[currency,deCurrency])

   
  
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
  {err && <Text m="auto">No Country found for this currency </Text>}
  {
    !err&& !loading&&countries &&countries.map(ele=>

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