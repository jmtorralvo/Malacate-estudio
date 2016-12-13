var express = require('express'),
    cors = require('cors'),
    app = express();

var mock = {
    "inventors": [
        {
            "id":"00",
            "label" : "Alexander Graham Bell",
            "invention": [{
                "name" : "Teléfono"
            },{
                "name" : "Audímetro"
            } ],
            "date": "s.XX",
            "description" : "Alexander Graham Bell fue un científico, inventor y logopeda británico. Contribuyó al desarrollo de las telecomunicaciones y a la tecnología de la aviación.",
            "thumbnail" : "http://www.desdelaplaza.com/wp-content/uploads/2016/03/Alexander-Graham-Bell.jpg"
        },
        {
            "id":"01",
            "label" : "Isaac Peral",
            "invention": [{
                "name" : "Submarino"
            }],
            "date": "s.XIX",
            "description" : "Isaac Peral y Caballero fue un científico, marino y militar español, teniente de navío de la Armada e inventor del primer submarino torpedero, conocido como el submarino Peral.",
            "thumbnail" : "https://img.vvlcdn.com/pp/http://www.submarinoperal.com/wp-content/uploads/2013/07/isaac_peral.jpg"
        },
        {
            "id":"02",
            "label" : "Johannes Gutenberg",
            "invention": [{
                "name" : "Tipos móviles"
            },{
                "name" : "Imprenta"
            }],
            "date": "s.XVI",
            "description" : "Johannes Gutenberg fue un orfebre alemán, inventor de la prensa de imprenta con tipos móviles moderna. Su trabajo más reconocido es la Biblia de 42 líneas, que se considera el primer libro impreso con tipografía móvil.",
            "thumbnail" : "http://culturizando.com/wp-content/uploads/2016/02/thumb_640x440_Gutenberg.jpg"
        },
        {
            "id":"03",
            "label" : "Nikola Tesla",
            "invention": [{
                "name" : "Corriente alterna"
            },{
                "name" : "Motor asíncrono"
            },{
                "name" : "Campo magnético rotativo"
            },{
                "name" : "Tecnología inalámbrica"
            }],
            "date": "s.XX",
            "description" : "Nikola Tesla, fue un inventor, ingeniero mecánico, ingeniero eléctrico y físico de origen serbio. ",
            "thumbnail" : "http://www.bilgingozel.com/modules/mod_image_show_gk4/cache/nikola_tesla_kehanetlerigk-is-617.jpg"
        },
        {
            "id":"04",
            "label" : "Alessandro Volta",
            "invention": [{
                "name" : "Pila eléctrica"
            }],
            "date": "s.XVIII",
            "description" : "Alessandro Giuseppe Antonio Anastasio Volta fue un físico italiano, famoso principalmente por haber desarrollado la pila eléctrica en 1800.",
            "thumbnail" : "http://www.lasprovincias.es/las_provincias/noticias/201502/18/media/volta.png"
        },
        {
            "id":"05",
            "label" : "James Watt",
            "invention": [{
                "name" : "Máquina de vapor"
            }],
            "date": "s.XIX",
            "description" : "James Watt fue un ingeniero mecánico e inventor escocés. Las mejoras que realizó en la máquina de Newcomen dieron lugar a la conocida como máquina de vapor de agua, que resultaría fundamental",
            "thumbnail" : "http://imperor.net/wp-content/uploads/2015/01/Slika-128-e1421690378908-1440x564_c.jpg"
        }
    ]
};



app.use(cors());

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.get('/getAllInventors', function(req, res) {
    res.send(JSON.stringify({
        inventors: mock.inventors
    }));
});

app.post('/login', function(req, res) {
    res.send(JSON.stringify({
        user: {
            nick: 'Leo_1452',
            name: 'Leonardo',
            surname:'Da Vinci',
            id: '458973495623865',
            thumbnail: 'http://comovemosdamos.com/wp-content/uploads/2016/04/leonardo-da-vinci-y-sus-genes-vivos-en-el-mundo.jpg',
            favorites : []
        }
    }));
});


app.listen(8889, function() {

});
