package WebApp::View::Xslate;
use Moose;
use Text::Xslate;
use URI::QueryParam;
use Scalar::Util qw( weaken );

extends 'Catalyst::View::Xslate';

has '+expose_methods' => (
    default => sub {{
        'lc' => 'do_lc',
        'asset' => 'do_asset',
    }}
);

sub build_exposed_method {
    my ( $self, $ctx, $code ) = @_;
    weaken $ctx;
    return sub { $self->$code($ctx, @_) };
}

sub do_asset {
    my ( $self, $c, $uri ) = @_;
    $uri->host($ENV{ASSET_HOST}) if defined $ENV{ASSET_HOST};
    if ( defined $ENV{RELEASE_UUID} ) {
        my @path = $uri->path_segments;
        if ( $path[1] eq 'assets' ) {
            $path[1] .= '_'.$ENV{RELEASE_UUID};
            $uri->path_segments( @path );
        } else {
            $uri->query_param_append( rel => $ENV{RELEASE_UUID} );
        }
    }
    return $uri;
}

sub do_lc {
    my ( $self, $c, $text ) = @_;
    return lc $text;
}

__PACKAGE__->meta->make_immutable;

1;
