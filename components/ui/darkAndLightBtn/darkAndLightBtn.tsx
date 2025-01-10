
import { LightAndDarkModeContext } from "@/context/lightAndDarkMode";
import { useContext, useEffect } from "react"
import './style.css'
import sunLightIcon from "../../../public/sunLightIcon.svg"
import moonIcon from "../../../public/moonIcon.svg"



export const DarkAndLightBtn = () => {

    const { isDark, setIsDark } = useContext(LightAndDarkModeContext)!;

    const updateDark = () => {
        setIsDark(!isDark)
        localStorage.setItem("isDark", (!isDark).toString())
    }


    return (
        <>
            <div className="darkAndLightBtn" onClick={updateDark} style={
                isDark ? { backgroundImage: `url(${sunLightIcon.src})` } :
                    { backgroundImage: `url(${moonIcon.src})` }}>
            </div>

        </>
    )
}