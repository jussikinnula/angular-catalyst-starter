package WebApp::Schema::Result::Todo;
use utf8;
use strict;
use warnings;
use DateTime;
use DateTime::Format::Pg;
use JSON;
use Data::Dumper;
use base 'DBIx::Class::Core';

__PACKAGE__->table("item");

__PACKAGE__->load_components("InflateColumn::DateTime");

__PACKAGE__->add_columns(
    "id",
    { data_type => "integer", is_auto_increment => 1 },
    "created",
    { data_type => "timestamp with time zone" },
    "updated",
    { data_type => "timestamp with time zone", is_nullable => 1 },
    "title",
    { data_type => "varchar" },
);

__PACKAGE__->set_primary_key("id");

sub formatted_output {
    my ($self) = @_;
    return {
        id => $self->id+0,
        created => $self->created."",
        updated => $self->updated ? $self->updated."" : undef,
        title => $self->title            
    };
}

1;
