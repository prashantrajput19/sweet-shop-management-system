import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function NotFound() {
    const error = useRouteError();
    console.error(error);

    let errorMessage: string;

    if (isRouteErrorResponse(error)) {
        // error is type `ErrorResponse`
        errorMessage = error.statusText || error.data?.message || "Unknown error";
    } else if (error instanceof Error) {
        errorMessage = error.message;
    } else if (typeof error === 'string') {
        errorMessage = error;
    } else {
        errorMessage = 'Unknown error';
    }

    // Check if it's a 404 (status 404 or just general not found if no error logged but we ended up here via * route - though here it is errorElement)
    // If it is the errorElement for the root, it catches everything. 
    // If the error is 404 Not Found (from router), it will be a RouteErrorResponse with status 404.

    // If error is null/undefined, it might just be used as a 404 component? 
    // But in main.tsx it is used as errorElement. 
    // The user also likely wants a 404 page for unmatched routes. 
    // Currently there is no "*" route. So unmatched routes also trigger errorElement of root (since bubble up) with status 404? 
    // Actually, createBrowserRouter throws a 404 error if no match found, which is caught by errorElement.

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Oops!</h1>
            <p className="text-xl mt-2">Sorry, an unexpected error has occurred.</p>
            <p className="text-gray-500 mt-4">
                <i>{errorMessage || "Page Not Found"}</i>
            </p>
        </div>
    )
}