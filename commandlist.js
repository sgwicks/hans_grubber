const commandlist = fetch('http://18.130.224.118:8080/commandlist')
  .then((res) => res.json())
  .then((json) => json.commandlist)
  .then((commandlist) => {
    commandlist.forEach(({ command_name }) => {
      console.log(command_name);
      const commandLi = document.createElement('li');
      commandLi.innerHTML = command_name;
      document.getElementById('command-list').appendChild(commandLi);
    });
  });
