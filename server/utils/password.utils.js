import bcrypt from 'bcrypt';

/**
 * description Generate hash for password
 * @param {string} password
 * @returns {string} hash
 */
const passwordHash = password => bcrypt.hash(password, 10);

/**
 * @description - Check if Password is correct
 * @param {string} password
 * @param {string} hash
 * @returns {boolean} any
 */
const isPasswordValid = (password, hash) => bcrypt.compareSync(password, hash);

export { passwordHash, isPasswordValid };
