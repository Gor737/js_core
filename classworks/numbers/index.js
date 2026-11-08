//task1

function capitalize(str) {
  let start = str[0].toUpperCase(); //J
  let end = str.slice(1).toLowerCase();

  return start + end;
}

console.log(capitalize("jAvfsHSg"));

//task2

function getInitials(fullName) {
  const name = fullName.at(0).toUpperCase();
  const surname = fullName.split(" ")[1].at(0).toUpperCase();

  return `${name}.${surname}.`;
}

console.log(getInitials("anna petrosyan")); // → "A.P."

//task3

const getExtension = (fileName) => {
  const index = fileName.lastIndexOf(".");
  return fileName.slice(index);
};

const getFoo = function (file) {
  return 1;
};

console.log(getExtension("photo.final.png"));
