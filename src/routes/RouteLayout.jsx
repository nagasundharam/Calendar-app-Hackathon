import { BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "../pages/Calendar";
import Calendar from "../pages/Calendar";


const RouteLayout = () => {
    return ( 
        <>
       
        <BrowserRouter>
         <Routes>
            <Route index   element ={<Calendar/>}/>

          
         </Routes>
        
       
            </BrowserRouter>
            </>

     );
}
 
export default RouteLayout;