import { Container, Row } from "react-bootstrap";
import './MainScreen.css'


const MainScreen = ({ title, children }) => {
    return (
        <div className='mainback'>
            <Container>
                <Row>
                    <div className='page'>
                        {title && (
                                <>
                                <h2 className="heading">{title}</h2>
                                <hr />
                            </>
                            )}
                            {children}
                    </div>
                </Row>
            </Container>
        </div>
    );
};

export default MainScreen;
