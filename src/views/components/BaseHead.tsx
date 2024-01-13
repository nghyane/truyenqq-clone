export const BaseHead = ({ children }: { children?: JSX.Element }) => {
    return (
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" type="image/x-icon" href="public/img/favicon.ico" />

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;600&display=swap" rel="stylesheet" />
            
            <link rel="stylesheet" href="/public/css/styles.css" />

            <link rel="preconnect" href="https://cdn.jsdelivr.net" />

            {children ? children : undefined}
        </head>
    );
};
