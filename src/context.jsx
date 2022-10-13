import React, {useState, useContext, useEffect } from 'react';

const AppContext = React.createContext()

import axios from 'axios'
const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'

const AppProvider = ({children}) => {

  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const fetchRandomMeal = () => {
    fetchMeals(randomMealUrl)
  }
  
  const fetchMeals = async (url) => {
    setLoading(true)
    try {
        const {data} = await axios.get(url)
        if (data.meals) {
          setMeals(data.meals)
        } else {
          setMeals([])
        }
      } catch (error) {
        console.log(error.response)
      }
      setLoading(false)
    }

  useEffect(() => {
    fetchMeals(allMealsUrl)
  },[])
  
  useEffect(()=>{ 
    if (!searchTerm) return
    fetchMeals(`${allMealsUrl}${searchTerm}`)
  },[searchTerm])
  
  return <AppContext.Provider
           value={{loading, meals, setSearchTerm, fetchRandomMeal}}>
    {children}
  </AppContext.Provider>
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}



export {AppContext, AppProvider}