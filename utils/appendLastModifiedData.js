export default appendLastModifiedData = obj => ({
  ...obj,
  lastModified = Date.now(),
  created = Date.now(),
});
