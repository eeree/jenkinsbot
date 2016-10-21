const auth = (admins) => {
    if (!Array.isArray(admins)) {
        throw new Error('Configure admin users, by adding them to your environment.');
    }
};

module.exports = auth;
