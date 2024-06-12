import { Typography } from "@material-tailwind/react";

const NotFoundPage = ({setCurrentRoute}) => {
    setCurrentRoute("/404")
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
        <Typography variant="h1" color="gray">404</Typography>
        <Typography variant="h3" color="gray">Page not found</Typography>
        </div>
    );
}

export default NotFoundPage;