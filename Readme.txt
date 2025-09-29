

PURPOSE
-------
An application dedicated to learning TypeScript.

REFERENCE
---------
https://www.typescriptlang.org/docs/handbook/2/basic-types.html

COMMANDS (Node does not read package.json scripts—npm does)
-----------------------------------------------------------
npm install typescript ts-node @types/node --save-dev       // installs compiler
npx tsc --init                                              // creates typescript compiler
npm run start                                               // "start": "ts-node ./precompiled/index.ts",
npm run build                                               // "build": "tsc",
npm run memento                                             // "ts-node ./precompiled/memento-output.ts" runs memento 

CONFIGURATION
-------------
{
  "compilerOptions": {
    "target": "ES6",                 
    "module": "commonjs",            
    "rootDir": "./src",              
    "outDir": "./dist",              
    "strict": true,                  
    "esModuleInterop": true,         
    "skipLibCheck": true,            
    "forceConsistentCasingInFileNames": true
  }
}