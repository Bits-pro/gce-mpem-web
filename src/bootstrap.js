let sd = (v, d) => {
    return v === undefined || v === null ? d : v;
};

//window.api_url = sd(process.env.MIX_API_URL, 'https://gce-mpem.herokuapp.com/api');
window.api_url = sd(process.env.MIX_API_URL, 'https://bitspro.info/api');