{
    name => 'WebApp',
    encoding => 'utf-8',
    default_view => 'Xslate',
    'View::Xslate' => {
        encode_body => 0,
    },
    'Model::DB' => {
        schema_class => 'WebApp::Schema',
        connect_info => [
            'dbi:Pg:',
            undef, undef, {
                pg_enable_utf8 => 1,
                auto_savepoint => 1,
            }
        ],
    },
};
