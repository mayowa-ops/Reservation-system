const notFound=(request,respond,next)=>{
    const error=new Error(`Not Found- ${request.originalUrl}`);
    respond.status(404);
    next(error);
};
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports= { notFound, errorHandler };
//export { noteFound, errorHandler };