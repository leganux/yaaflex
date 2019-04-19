module.exports = {
    environment: 'development', // development, qa, production
    session_server: 'redis', // redis, standalone
    activeSSL: false, // true , false
    max_fileupload_size: 1,  // in MB
    body_parser_extended: true, // true,false
    body_parser_json: true, //true , false
    view_engine: 'pug',
    ssl_port: 443,
    no_ssl_port: 80,
    site_theme: 'Darkly',
    default_lang: 'EN',
}

/**
 * Available themes preview  on  https://bootswatch.com v4.3.1
 *
 * Cerulean
 * Cosmo
 * Cyborg
 * Darkly
 * Flatly
 * Journal
 * Litera
 * Lumen
 * Lux
 * Materia
 * Minty
 * Pulse
 * Sandstone
 * Simplex
 * Sketchy
 * Slate
 * Solar
 * Spacelab
 * Superhero
 * United
 * Yeti
 *
 *
 *
 */