import React from "react";

type Props = { children: React.ReactNode }

const Layout = (props: Props) => {
    return ( 
        <div className="h-screen w-full flex justify-center items-center" >
           {props.children}
        </div>
     );
}
 
export default Layout;