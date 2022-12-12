import React, { useEffect, useState, useContext } from "react";

export const JScriptLinks = () => {
  useEffect(() => {
    const script = document.createElement("script");
    const script2 = document.createElement("script");
    script.src = "../../public/assets/js/jquery.min.js";
    script2.src = "../public/assets/js/ruang-admin.min.js";
    script.async = true;
    script2.async = true;
    document.body.appendChild(script);
    document.body.appendChild(script2);
  }, []);
};
