package WebApp::Controller::Root;
use utf8;
use Moose;
use namespace::autoclean;

BEGIN { extends 'Catalyst::Controller::REST' }
__PACKAGE__->config(
    namespace => '',
    default => 'application/json',
    map => { 'application/javascript' => 'JSONP' }
);

sub rest_base : Chained("/") PathPart("") CaptureArgs(0) {}

__PACKAGE__->meta->make_immutable;

1;