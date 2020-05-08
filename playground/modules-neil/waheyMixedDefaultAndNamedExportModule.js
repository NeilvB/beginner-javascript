function waheyOne(name) {
  return `wahey one ${name}`;
}

function waheyTwo(name) {
  return `wahey two ${name}`;
}

function waheyThree(name) {
  return `wahey three ${name}`;
}

export default waheyOne; // Only one default export allowed per module

export { waheyTwo, waheyThree };
