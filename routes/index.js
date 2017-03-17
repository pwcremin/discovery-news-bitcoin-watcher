"use strict";

var express = require( 'express' );
var router = express.Router();


var DiscoveryV1 = require( 'watson-developer-cloud/discovery/v1' );

var discovery = new DiscoveryV1( {
    username: "b38f123d-08de-4ae7-b29f-b23bf01f4a81",
    password: "qrOacVOXkgdo",
    version_date: DiscoveryV1.VERSION_DATE_2016_12_15
} );

discovery.query( {
    environment_id: '9d72194c-bfa5-41ec-b47b-00b7a1943612',
    collection_id: '8854ecb2-6c2b-4bfd-acca-8333a9f4b64e',

    query: 'text:Bitcoin,China,' +
    'yyyymmdd:>20170315,' +
    'docSentiment.score:<-0.1,' +
    'taxonomy.label:finance,' +
    'taxonomy.label:!pets',
    aggregation: '[term(enrichedTitle.text,count:10),average(docSentiment.score)]',
    count: 10,
    return: 'enrichedTitle.text,url,text,taxonomy,docSentiment'

}, function ( err, response )
{
    if ( err )
    {
        console.error( err );
    }
    else
    {
        let queryResult = JSON.stringify( response, null, 2 )

        console.log( queryResult );

        //res.render( 'index', { queryResult } );
    }
} );

/* GET home page. */
router.get( '/', function ( req, res, next )
{
    res.render( 'index', { title: 'Express' } );
} );

router.get( '/news', function ( req, res, next )
{

    discovery.query( {
        environment_id: '9d72194c-bfa5-41ec-b47b-00b7a1943612',
        collection_id: '8854ecb2-6c2b-4bfd-acca-8333a9f4b64e',

        query: 'text:Bitcoin,China,' +
        'yyyymmdd:>20170315,' +
        'docSentiment.score:<-0.1,' +
        'taxonomy.label:finance,' +
        'taxonomy.label:!pets',
        aggregation: '[term(enrichedTitle.text,count:10),average(docSentiment.score)]',
        count: 10,
        return: 'enrichedTitle.text,url,text,taxonomy,docSentiment'

    }, function ( err, response )
    {
        if ( err )
        {
            console.error( err );
            res.status( 500 ).json( err )
        }
        else
        {
            let queryResult = JSON.stringify( response, null, 2 )

            console.log( queryResult );

            res.json( queryResult );
        }
    } );
} );

module.exports = router;
