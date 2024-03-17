import ActionButtons from "./action-buttons";
import Logo from "./logo";
import { NavigationMenuBar } from "./navigation-bar";

const Navbar = () => {
    return ( <div className="
    flex
    justify-between
    items-center px-5 border-b h-14
    
    ">
       <Logo />
       <NavigationMenuBar />
       <ActionButtons />
    </div> );
}
 
export default Navbar;