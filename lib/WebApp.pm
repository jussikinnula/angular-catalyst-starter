package WebApp;
use Moose;
use namespace::autoclean;

use Catalyst::Runtime;

use Catalyst qw/
    ConfigLoader
    Static::Simple
/;

extends 'Catalyst';

our $VERSION = '0.01';

# Start the application
__PACKAGE__->setup();

1;
