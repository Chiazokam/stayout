/**
 * description Return json response for methods
 * @param {object} param
 * @returns {object} json object
 */
const Response = (param) => {
  const {
    res, code, message, data, type
  } = param;

  if (type === 'success') {
    return res.status(code).json({
      status: code,
      message,
      data: [data],
    });
  }
  return res.status(code).json({
    status: code,
    errors: data
  });
};

export default Response;
