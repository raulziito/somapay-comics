import Header from '../header';
import Footer from '../footer';

const Container = (props) => (
    <>

        <Header data={props}/>

        <main>
            {props.children}
        </main>

        <Footer/>
     
    </>
)
export default Container;
