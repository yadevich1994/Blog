export const message = (error: {
  errors: { username?: string; email?: string };
}) => {
  let messageResult = "";
  if (error.errors.username)
    messageResult += `This username is already taken. `;
  if (error.errors.email) messageResult += `This email is already taken`;
  return messageResult;
};
