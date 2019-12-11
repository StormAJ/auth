function getCookies() {
  let cookies = [{}];
  const cookieArray = document.cookie.split(";");
  for (var i = 0; i < cookieArray.length; i++) {
    cookies[i].name = cookieArray[i].split("=")[0];
    cookies[i].value = cookieArray[i].split("=")[1];
  }

  return cookies;
}

module.exports = {
  getCookies
};
