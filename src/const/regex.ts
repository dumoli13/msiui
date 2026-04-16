export const EMAIL_REGEX = /^[^@\s]+@[^@\s.]+\.[^@\s]+$/;
export const URL_REGEX =
  // eslint-disable-next-line sonarjs/regex-complexity -- URL validation requires complex pattern
  /^(?:(https?|ftp):\/\/)?((?:[a-z\d](?:[a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(?::\d+)?(?:\/[^\s?#]*)?(?:\?[^\s#]*)?(?:#[^\s]*)?$/i;
