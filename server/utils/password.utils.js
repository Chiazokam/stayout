import bcrypt from 'bcrypt';

/**
 * description Generate hash for password
 * @param {string} password
 * @returns {string} hash
 */
const passwordHash = password => bcrypt.hash(password, 10);
export default passwordHash;
