
import React from 'react';
import Navbar from '../Components/Navber';
import TopBar from '../Components/TopBar';
import HeroSlider from '../Components/HeroSlider';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

const MainLayout = () => {
    return (
        <div>
            {/* <TopBar></TopBar> */}
            <Navbar></Navbar>
            <div >
                <Outlet></Outlet>
            </div>

            <Footer></Footer>
        </div>
    );
};

export default MainLayout;