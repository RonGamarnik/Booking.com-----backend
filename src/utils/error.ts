export const createError = (status: number, message: string) => {
  const err = new Error(message); // You can pass the message directly to the Error constructor
  (err as any).status = status; // Add a custom status property to the error object
  return err;
};
