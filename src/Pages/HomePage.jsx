
import React from 'react';
import HeroSlider from '../Components/HeroSlider';
import PremiumMembers from '../Components/PremiumMembers';
import OurServices from '../Components/OurSevices';
import HowItWorks from '../Components/HowItWorks';
import WelcomeSection from '../Components/WelcomeSection';
import TrustedSection from '../Components/TrustedSection';

const HomePage = () => {
    return (
        <div>
            <HeroSlider/>
            <OurServices/>
            <PremiumMembers/>
            <HowItWorks></HowItWorks>
            <WelcomeSection></WelcomeSection>
            <TrustedSection></TrustedSection>
        </div>
    );
};

export default HomePage;