import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { CounterContext } from '../../Context/CounterContext';
import RecentProudcts from '../RecentProudcts/RecentProudcts';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import MainSlider from '../MainSlider/MainSlider';

export default function Home() {
  
  return <>
  <MainSlider/>
  <CategoriesSlider/>
<RecentProudcts/>

  </>
}
