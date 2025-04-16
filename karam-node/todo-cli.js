const { Command } = require('commander');
const program = new Command();

const todos =[]
program
    .name('Todo-CLI')
    .description('Todo application from your command line, add, delete,update');

program.command('add')
    .description('add todos')
    .argument('<task>','task to add')
    .action((task) => addTodo(todos,task));

function addTodo(todos,task){
    todos.push({
        title:task,
        id:todos.length-1
    });
}

program.command('show')
    .description('show all todos')
    .action(() => showTodos(todos));

function showTodos(todos){
    console.log("hey");
    for (todo in  todos){
        console.log(`${todo.id}. ${todo.title}`);
    }
}
    

program.parse();