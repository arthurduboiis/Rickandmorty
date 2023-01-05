import { useRouteError } from "react-router-dom";

export default function Errorpage() {

    const error = useRouteError();
    console.error(error);

    return (
        <div>
             <h1 className="text-3xl font-bold underline">
                Error page
            </h1>
            <h3>{error.statusText || error.message}</h3>
        </div>
       
        
    );
    }