import React from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import SliderComponent from "../Components/Slider/SliderComponent";
import Description from "../Components/Description/Description";

const LandingPage = () => {
    return (
        <div>
            <Header />
            <SliderComponent />
            <Description />
            <Footer />
            
        </div>
    );
}
export default LandingPage;