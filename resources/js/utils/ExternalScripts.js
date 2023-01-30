import React, { useEffect, useState, useContext } from 'react';

export const ExternalScripts = () => {

    useEffect(() => {
        const script = document.createElement('script');
        // const script2 = document.createElement('script');
        // const script3 = document.createElement('script');
        // const script4 = document.createElement('script');
        // const script5 = document.createElement('script');
        // const script6 = document.createElement('script');
        // const script7 = document.createElement('script');
        script.src = "../../js/ruang-admin.min.js";
        //script.src = "../../../assets/js/ruang-admin.min.js";
        // script2.src = "../../../assets/vendor/bootstrap/js/bootstrap2.min.js";
        // script3.src = "../../../assets/js/main.js";
        // script4.src = "../../../assets/vendor/bootstrap/js/bootstrap.bundle.min.js";
        // script5.src = "../../../assets/vendor/glightbox/js/glightbox.min.js";
        // script6.src = "../../../assets/vendor/swiper/swiper-bundle.min.js";
        // script7.src = "../../../assets/js/slider.js";
        script.async = true;
        // script2.async = true;
        // script3.async = true;
        // script4.async = true;
        // script5.async = true;
        // script6.async = true;
        // script7.async = true;

        document.body.appendChild(script);

        // document.body.appendChild(script2);
        // document.body.appendChild(script3);
        // document.body.appendChild(script4);
        // document.body.appendChild(script5);
        // document.body.appendChild(script6);
        // document.body.appendChild(script7);
    }, []);

}
