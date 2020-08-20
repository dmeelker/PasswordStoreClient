const dev = {
    API_URL: "https://localhost:5001"
};

const prod = {
    API_URL: "https://aap:5001"
};

const config = process.env.REACT_APP_ENVIRONMENT == "production" ? prod : dev;

export default {...config}