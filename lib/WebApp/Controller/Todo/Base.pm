package WebApp::Controller::Todo::Base;
use Moose;
use namespace::autoclean;
use utf8;
use Scalar::Util qw(looks_like_number);
use DateTime;
use Data::Dumper;

BEGIN { extends 'WebApp::Controller::Root' }

sub todo_base : Chained("rest_base") PathPart("todo") CaptureArgs(0) {
    my ($self, $c) = @_;
    $c->stash->{todos} = $c->model('DB::Todo');
}

sub index : Chained("todo_base") PathPart("") Args(0) ActionClass("REST") {
}

sub index_GET {
    my ($self, $c) = @_;

    my $todos = $c->stash->{todos};

    my @data = ();
    for my $todo ($todos->all) {
        push @data, $todo->formatted_output;
    }

    $self->status_ok( $c, entity => {
        todos => \@data
    });
}

sub index_POST {
    my ($self, $c) = @_;
    my $params ||= $c->req->data || $c->req->params;
    if ($params and $params->{title} and my $todos = $c->stash->{todos}) {
        $params->{created} = DateTime->now();
        my $todo = $todos->create($params);
        $self->status_ok( $c, entity => $todo->formatted_output );
    } else {
        $self->status_not_found($c, message => "invalid parameters");
    }
}

sub stash_todo : Chained("todo_base") PathPart("") CaptureArgs(1) {
    my ($self, $c, $id) = @_;
    if (my $todos = $c->stash->{todos}) {
        $c->stash->{todo} = $todos->find($id);
    }
}

sub todo : Chained("stash_todo") PathPart("") Args(0) ActionClass("REST") {
}

sub todo_GET {
    my ($self, $c) = @_;
    if (my $todo = $c->stash->{todo}) {
        $self->status_ok( $c, entity => $todo->formatted_output );
    } else {
        $self->status_not_found($c, message => "todo not found");
    }
}

sub todo_PUT {
    my ($self, $c) = @_;
    my $params ||= $c->req->data || $c->req->params;
    if (my $todo = $c->stash->{todo}) {
        delete $params->{created};
        $params->{updated} = DateTime->now();
        $todo->update($params) if $params;        
        $self->status_ok( $c, entity => $todo->formatted_output );
    } else {
        $self->status_not_found($c, message => "todo not found");
    }
}

sub todo_DELETE  {
    my ($self, $c) = @_;
    if (my $todo = $c->stash->{todo}) {
        $todo->delete;
        $self->status_ok( $c, entity => { message => 'ok' } );
    } else {
        $self->status_not_found($c, message => "todo not found");
    }
}

__PACKAGE__->meta->make_immutable;

1;