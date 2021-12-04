import { Container, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./LandingPage.css";
import { useEffect } from "react";

//import ReactNotification from 'react-notifications-component';
//import { store } from "react-notifications-component";
//import "animate.css"
//import "react-notifications-component/dist/theme.css";



const LandingPage = () => {
   
    /*useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");

        if (userInfo) {
            history.push("/home");
        }
    }, [history]);
    */

    
    

    return (
        <div className="main">
            <Container>
                <Row>
                    <div className ='intro-text'>
                        <div>
                            <h1 className="title">Welcome</h1>
                            <p className ="subtitle">Website for Booking Table</p>
                        </div>
                        <div className="buttonContainer">
                            <a href="/bookatable">
                                <Button
                                    size="lg"
                                    className="landingbutton"
                                    variant="primary"
                                    
                                >Book a Table</Button>
                            </a>
                        
                        </div>
                        </div>
                </Row>
            </Container>
        </div>
    );
};

/*function Home(){
    const handleOnClickDefault = () => {
        store.addNotification({
            title: "Alert",
            message: "Guest Users Please Register!",
            type: "success",
            container: "top-left",
            insert: "top",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],

            dismiss: {
                duration: 2000,
                showIcon: true
            }
})
    }
    return (
        <div>
            
            <div className="buttonContainer">
                            <a href="/bookatable">
                                <Button
                                    size="lg"
                                    className="landingbutton"
                                    variant="primary"
                                    
                                >Book a Table</Button>
                            </a>
          </div>
                        
            </div>
    )
}
*/



export default LandingPage
