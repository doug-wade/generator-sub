# <%= name %>

<%= name %> is a cli application that uses subcommands to organize functionality into an easily-readable, fluent argument style.

## Installation

<% if (updater === "git") { %>
To install, make sure you have git installed

    sudo apt-get install git

Then clone the repo somewhere on your path

    cd ~/bin
    git clone <%= repo %>

You may have to make the script executable as well

    chmod a+x ~/bin/<%= name %>

<% } %><% if (updater === "npm") { %>
try {
To install, make sure you have node installed

    sudo apt-get install nodejs

Then install <%= name %> globally

    npm install -g <%= name %>
<% } %>

## Use

To get help, or to get the list of all sub commands, simply run `help`

    <%= name %> help

`help` is also used to discover how to use sub commands

    <%= name %> help example
    > An example command.
    > Usage:
    >      sub example
    >      > 'You ran the example command!'

To update <%= name %>, use update

    <%= name %> update

Though if you haven't updated in a while, <%= name %> will remind you 😀

Before you run any commands, you'll need to set up some config by running `init`

    <%= name %> init

Then follow the prompts
