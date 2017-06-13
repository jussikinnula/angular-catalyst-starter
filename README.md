# angular-catalyst-starter

A simple starting point to build a web application using Catalyst Framework and Angular frontend.

## Highlights

- Angular 4.1.x framework
- Webpack 2.6 bundling, including lazy routes
- REST API done on Catalyst side, with DBIx classes
- Frontend HTML templates are made with Pug (former Jade) and styles with Stulus
- Easy-to-use date pipe replacement (using MomentJS instead of the default Angular's default date pipe which requires `Intl` support from browser)
- Deployable to Heroku, without pre-compiling any frontend assets (only thing needs pre-compiling, is generated SQL migration scripts to install/upgrade/downgrade PostgreSQL -database)

## Prequisities

### Basic CLI tools and libs

```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
#.. follow the instructions, run "brew doctor" etc.

# for brews, make sure /usr/local/bin is in path before /usr/bin
echo 'export PATH=/usr/local/bin:$PATH' >>~/.bash_profile
exec $SHELL -l  # restart the shell

brew install libpng jpeg giflib libtiff
brew install plenv
brew install perl-build
echo 'if which plenv > /dev/null; then eval "$(plenv init -)"; fi' >>.bash_profile
exec $SHELL -l  # ..or close the terminal window and start a new

plenv install 5.22.0
plenv global 5.22.0
plenv install-cpanm
plenv rehash
exec $SHELL -l  # ..or close the terminal window and start a new

# lots of dependencies you'll need anyway, but not immediately
cpanm --quiet --notest Catalyst
```

### PostgreSQL

```
brew install postgresql # read the instructions
ln -s /usr/local/opt/postgresql/homebrew.mxcl.postgresql.plist ~/Library/LaunchAgents
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
initdb /usr/local/var/postgres -E utf8
```

You can also add the following aliases to your *.aliases* or *.bash_profile* file (then you can use start and stop PostgreSQL by giving command *pgsql.start* and *pgsql.stop*):

```
alias pgsql.start='launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist'
alias pgsql.stop='launchctl unload -w ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist'
```

Note! You should test it before continuing!

```
createdb testing
psql testing
=> ...
dropdb testing
```

This should now install cleanly:

```
cpanm --quiet DBD::Pg
```

### NodeJS

First install: [Homebrew](http://brew.sh/)

Then install NVM (Node Version Manager):

```
brew install nvm
```

Then install and use latest NodeJS version (6.3.1):

```
nvm install v6.3.1
nvm use v6.3.1
```

## Installation

```
git clone git@github.com:jussikinnula/angular-catalyst-starter
cd angular-catalyst-starter
cpanm --installdeps .
npm install
createdb angular-catalyst-starter
PGDATABASE=angular-catalyst-starter database/migrate.pl install
```

## Development

### Full stack development

Full stack development mode runs Catalyst backend (`plackup`) and `webpack-dev-server` using `concurrently`.

```
PGDATABASE=angular-catalyst-starter npm run dev
```

### Run backend and frontend separately:

```
# Start Catalyst backend
PGDATABASE=angular-catalyst-starter npm run dev:plackup
```

```
# Start webpack-dev-server
# (frontend + livereloading + proxies /rest to Catalyst side)
npm run dev:webpack
```

## Database migration

If you add features to the DBIx schema, you need to update the migration files (and remember to bump the version):

```
# bump the version
$EDITOR lib/WebApp/Schema.pm

# generate the migration files
PGDATABASE=angular-catalyst-starter migrate.pl prepare

# check the currently installed version
PGDATABASE=angular-catalyst-starter migrate.pl status

# upgrade
PGDATABASE=angular-catalyst-starter migrate.pl upgrade
```

If you edit the `src` -files (Angular 2 part of the app), you can recompile with simply running `webpack`.

## Deploying to Heroku

```
heroku create --region eu
heroku buildpacks:add https://github.com/pnu/heroku-buildpack-perl.git
heroku buildpacks:add https://github.com/heroku/heroku-buildpack-nodejs
heroku config:set PERL5LIB=/app/local/lib/perl5:/app/vendor/lib/perl5
heroku addons:create heroku-postgresql:hobby-dev
git push heroku master
heroku run database/migrate.pl install
heroku open
```

When updating the DBIx schema, you need to include the generated files in `share` to your commit, and then you can upgrade the database also on Heroku:

```
# remember to check always current status
heroku run database/migrate.pl status

# and upgrade
heroku run database/migrate.pl upgrade
```