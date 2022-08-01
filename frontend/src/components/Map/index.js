import {useEffect, useState} from 'react';
import {Navbar} from '../navbar';
import styled from 'styled-components';
import Iframe from "react-iframe";
export const Container = styled.div`
    justify-content: center; 
    align-items: center; 
`;
const demos = {
    googlemap:
      'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d923.0090979943103!2d114.17730335333825!3d22.276611255597295!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x8fbc82875994d91a!2z6auY5bOw6YCy5L-u5a246Zmi!5e0!3m2!1szh-TW!2sus!4v1657644470249!5m2!1szh-TW!2sus" width="1920" height="1024" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"',
  };
const styles = {
fontFamily: "sans-serif",
textAlign: "center"
};
function Map() {
    // function Iframe(props) {
    //     return (
    //       <div
    //         dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : "" }}
    //       />
    //     );
    //   }
    const [windowSize, setWindowSize] = useState(getWindowSize());

    useEffect(() => {
        function handleWindowResize() {
        setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
        window.removeEventListener('resize', handleWindowResize);
        };
    }, []);
  return (
      <>
      <Navbar/>
        <Container>
        <h1>Map</h1>
        <div style={styles}>
            {/* <Iframe iframe={demos["googlemap"]} allow="autoplay"/> */}
            <Iframe
                url={demos.googlemap}
                width={windowSize.innerWidth-30}
                height={windowSize.innerHeight-150}
                display="initial"
                position="relative"
                allowFullScreen
            />
        </div>
        
        
        </Container>
      </>
      
  )
}
function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
  }

export default Map