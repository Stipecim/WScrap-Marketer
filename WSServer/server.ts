import readline from 'readline';
import program from './commands/cli-commands';


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Server: ',
});


rl.on('line', (input) => {
  try {
    program.parse(['node', 'cli', ...input.trim().split(' ')]);
  } catch (err: any) {
    rl.prompt();
  }
});

rl.prompt();
