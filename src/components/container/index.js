import Header from '../header';
import Footer from '../footer';

function Container(props) {
   
  return <>

        <Header data={props}/>

        <main>
            {props.children}
        </main>

        <Footer/>
     
    </>
};
export default Container;
