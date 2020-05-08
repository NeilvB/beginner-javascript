import { sayHi } from './hiNamedExportModule.js';
import { sayYo } from './yoNamedExportModule.js';
import whateverIwantToCallIt from './wassupDefaultExportModule.js';
import alsoWhateverIWantToCallIt, {
  waheyTwo,
  waheyThree as renamedWahey,
} from './waheyMixedDefaultAndNamedExportModule.js';

console.log(`saying hi from a named export module ${sayHi('neil')}`);
console.log(`saying yo from a named export module ${sayYo('neil')}`);
console.log(
  `saying wassup from a default export module ${whateverIwantToCallIt('neil')}`
);

console.log(
  `saying wahey from a default export module ${alsoWhateverIWantToCallIt(
    'neil'
  )}`
);

console.log(`saying wahey from a named export module ${waheyTwo('neil')}`);
console.log(`saying wahey from a named export module ${renamedWahey('neil')}`);
