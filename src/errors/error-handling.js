export const wrapWithErrorHandling = (handler) => async (req, res, next) => {
  try {
    const result = await handler(req, res);
    return result;
  } catch (error) {
    next(error);
  }
};
