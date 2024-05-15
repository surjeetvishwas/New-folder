import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error: any = useRouteError();
    console.error(error);

    return (
        <div id="error-page" style={
            {
                width: "100vw",
                height: "100vh",
                display: "flex", 
                flexDirection: "column",
                justifyContent: "center", 
                alignItems: "center",
                overflow: "wrap",
                margin: "10px",
                textAlign: "center",
            }}>
            <h1>404 Page Not Found</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}