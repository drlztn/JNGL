/*	GLYPHZ v0.1 BY DRLZTN @ 2020
	LIBRARIES USED:	SVG.js (https://svgjs.com/docs/3.0/), JSZip (https://stuk.github.io/jszip/), Tippy.js (https://atomiks.github.io/tippyjs/)
*/

// Tamaño del canvas SVG
const width = 500,
    height = 500;

// Canvas principal
var draw = SVG().addTo('#canvas')
    .size(width, height)
    .attr({
        id: 'svg'
    });

// ZIP que luego se creará y output
var zip;
var out;

// Funciones para generar números random
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRndFloat(min, max) {
    return (Math.random() * (max - min)) + min;
}

// Crear los símbolos
function grafema(rotation, scale) {
    //Posición inicial de los elementos SVG
    var pos_x = 0,
        pos_y = 0;

    // Arreglos para los elementos SVG
    var texto = [],
        grupo = [],
        rect = [],
        clip = [],
        random_rotation = [];

    // Objeto con "todos" los sistemas de escritura (alfabetos)
    var sistemas_todos = {
        "arabe": 'ابتثجحخدذرزسشصضطظعغفقكلمنهويةءأإ'.split(''),
        "devanagari": 'ऀँंःऄअआइईउऊऋऌऍऎएऐऑऒओऔकखगघङचछजझञटठडढणतथदधनऩपफबभमयरऱलळऴवशषसहऺऻ़ऽािीुूृॄॅॆेैॉॊोौ्ॎॏॐ॒॑॓॔ॕॖॗक़ख़ग़ज़ड़ढ़फ़य़ॠॡॢॣ।॥०१२३४५६७८९॰ॱॲॳॴॵॶॷॸॹॺॻॼॽॾॿ'.split(''),
        "hebreo": 'אבגדהוזחטיךכלםמןנסעףפץצקרשתװױײ'.split(''),
        "tibetano": 'ༀ༁༂༃༄༅༆༇༈༉༊་།༎༏༐༑༒༓༔༕༖༗༘༙༚༛༜༝༞༟༠༡༢༣༤༥༦༧༨༩༪༫༬༭༮༯༰༱༲༳༴༵༶༷༸༹༺༻༼༽༾༿ཀཁགགྷངཅཆཇཉཊཋཌཌྷཎཏཐདདྷནཔཕབབྷམཙཚཛཛྷཝཞཟའཡརལཤཥསཧཨཀྵཪཫཬཱཱཱིིུུྲྀཷླྀཹེཻོཽཾཿ྄ཱྀྀྂྃ྅྆྇ྈྉྊྋྐྑྒྒྷྔྕྖྗྙྚྛྜྜྷྞྟྠྡྡྷྣྤྥྦྦྷྨྩྪྫྫྷྭྮྯྰྱྲླྴྵྶྷྸྐྵྺྻྼ྾྿࿀࿁࿂࿃࿄࿅࿆࿇࿈࿉࿊࿋࿌࿎࿏࿐࿑࿒࿓࿔࿕࿖࿗࿘'.split(''),
        "hangul": 'ᄀᄁᄂᄃᄄᄅᄆᄇᄈᄉᄊᄋᄌᄍᄎᄏᄐᄑ하ᅢᅣᅤᅥᅦᅧᅨᅩᅪᅫᅬᅭᅮᅯᅰᅱᅲᅳᅴᅵᆨᆩᆪᆫᆬᆭᆮᆯᆰᆱᆲᆳᆴᆵᆶᆷᆸᆹᆺᆻᆼᆽᆾᆿᇀᇁᇂ'.split(''),
        "hiragana": 'あかさたなはまやらわがざだばぱいきしちにひみり(ゐ)ぎじぢびぴうくすつぬふむゆるぐずづぶぷえけせてねへめれ(ゑ)げぜでべぺおこそとのほもよろをごぞどぼぽ'.split(''),
        "katakana": 'アカサタナハマヤラワガザダバパヴァイキシチニヒミリ(ヰ)ギジヂビピヴィウクスツヌフムユルグズヅブプヴエケセテネヘメレ(ヱ)ゲゼデベペヴェオコソトノホモヨロヲゴゾドボポヴォ'.split(''),
        "griego": 'ͰͱͲͳʹ͵Ͷͷͺͻͼͽ;Ϳ΄΅Ά·ΈΉΊΌΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώϏϐϑϒϓϔϕϖϗϘϙϚϛϜϝϞϟϠϡϢϣϤϥϦϧϨϩϪϫϬϭϮϯϰϱϲϳϴϵ϶ϷϸϹϺϻϼϽϾϿΨ'.split(''),
        "armenio": 'ԱԲԳԴԵԶԷԸԹԺԻԼԽԾԿՀՁՂՃՄՅՆՇՈՉՊՋՌՍՎՏՐՑՒՓՔՕՖՙ՚՛՜՝՞՟աբգդեզէըթժիլխծկհձղճմյնշոչպջռսվտրցւփքօֆև։֊֏'.split(''),
        "georgiano": 'ႠႡႢႣႤႥႦႧႨႩႪႫႬႭႮႯႰႱႲႳႴႵႶႷႸႹႺႻႼႽႾႿჀჁჂჃჄჅაბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰჱჲჳჴჵჶჷჸჹჺⴀⴁⴂⴃⴄⴅⴆⴇⴈⴉⴊⴋⴌⴍⴎⴏⴐⴑⴒⴓⴔⴕⴖⴗⴘⴙⴚⴛⴜⴝⴞⴟⴠⴡⴢⴣⴤⴥ'.split(''),
        "glagolitico": 'ⰀⰁⰂⰃⰄⰅⰆⰇⰈⰉⰊⰋⰌⰍⰎⰏⰐⰑⰒⰓⰔⰕⰖⰗⰘⰙⰚⰛⰜⰝⰞⰟⰠⰡⰣⰤⰥⰦⰧⰨⰩⰪⰮ'.split(''),
        "cirilico": 'ЀЁЂЃЄЅІЇЈЉЊЋЌЍЎЏАБВГДЕЖЗИЙКЛМНОПСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюяѐёђѓєѕіїјљњћќѝўџѠѡѢѣѤѥѦѧѨѩѪѫѬѭѮѯѰѱѲѳѴѵѶѷѸѹѺѻѼѽѾѿҀҁ҂҃҄҅҆҇҈҉ҊҋҌҍҎҏҐґҒғҔҕҖҗҘҙҚқҜҝҞҟҠҡҢңҤҥҦҧҨҩҪҫҬҭҮүҰұҲҳҴҵҶҷҸҹҺһҼҽҾҿӀӁӂӃӄӅӆӇӈӉӊӋӌӍӎӏӐӑӒӓӔӕӖӗӘәӚӛӜӝӞӟӠӡӢӣӤӥӦӧӨөӪӫӬӭӮӯӰӱӲӳӴӵӶӷӸӹӺӻӼӽӾӿ'.split(''),
        "latino": 'ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz'.split(''),
        "runico": 'ᚠᚡᚢᚣᚤᚥᚦᚧᚨᚩᚪᚫᚬᚭᚮᚯᚰᚱᚲᚳᚴᚵᚶᚷᚸᚹᚺᚻᚼᚽᚾᚿᛀᛁᛂᛃᛄᛅᛆᛇᛈᛉᛊᛋᛌᛍᛎᛏᛐᛑᛒᛓᛔᛕᛖᛗᛘᛙᛚᛛᛜᛝᛞᛟᛠᛡᛢᛣᛤᛥᛦᛧᛨᛩᛪ᛫᛬᛭ᛮᛯᛰ'.split('')
    }

    // Arreglo de alfabetos escogidos que se llena según se escoja
    var sistemas_escogidos = [];

    // Arreglos para seleccionar letras random de un alfabeto random
    var alfabeto = [],
        letra = [];

    // Arreglos para determianr que alfabetos se escogieron
    var check_boxes = document.querySelectorAll('input[type=checkbox]:checked');
    var check_value = [];

    // Tippy por si no ha seleccionado nada
    const tippy_check_empty = tippy(document.querySelector('#boton_crear'));
    const hide_tippy = document.querySelector('#boton_crear').addEventListener("mouseleave", function(){
		tippy_check_empty.disable();
    });
    tippy_check_empty.hideWithInteractivity(hide_tippy);

    // Si no ha seleccionado nada, avise al usuario
    var check_empty = document.querySelectorAll('input[type=checkbox]');
    var empty = [].filter.call(check_empty, function(el) {
        return !el.checked
    });

    if (check_empty.length == empty.length) {
        tippy_check_empty.enable();
        tippy_check_empty.setContent('Seleccione al menos 1 alfabeto');
        tippy_check_empty.show();
        return false;
    }

    // Si se escogió, agregar al arreglo de sistemas escogidos
    for (var i = 0; i < check_boxes.length; i++) {
        if (check_boxes[i].checked) {
            check_value[i] = check_boxes[i].value;
            sistemas_escogidos.push(sistemas_todos[check_value[i]]);
            tippy_check_empty.disable();
        }
    }

    //Cree los símbolos según los alfabetos escogidos
    for (var i = 0; i <= 3; i++) {
        alfabeto[i] = getRndInteger(0, sistemas_escogidos.length - 1);

        letra[i] = sistemas_escogidos[alfabeto[i]][getRndInteger(0, sistemas_escogidos[alfabeto[i]].length - 1)];

        random_rotation[i] = getRndInteger(0, rotation);

        texto[i] = draw.text(letra[i])
            .font({
                family: 'Arial Unicode MS',
                size: 500,
                anchor: 'middle'
            })
            .transform({
                translateX: width / 2,
                translateY: (height / 2) * -1,
                rotate: random_rotation[i],
                scale: getRndFloat(0.5, scale)
            })
            .attr({
                class: 'texto_svg'
            });

        grupo[i] = draw.group()
            .attr({
                id: 'letra ' + i
            });

        grupo[i].add(texto[i]);

        rect[i] = draw.rect(250, 250)
            .attr({
                x: pos_x,
                y: pos_y,
            })
            .transform({
                rotate: random_rotation[i],
            });

        pos_x = pos_x + 250;

        if (pos_x > 250) {
            pos_x = 0;
            pos_y = pos_y + 250;
        }

        clip[i] = draw.clip().add(rect[i]);
        grupo[i].clipWith(clip[i]);
    }
    out = draw.svg();
}

// Tomar los valores de los sliders
function get_rotation_scale() {
    var rot = document.getElementById('rotacion_graf').value;
    var scl = document.getElementById('tamaño_graf').value;
    return [rot, scl];
}

// Crea un nuevo grafema y lo agrega al ZIP
function nuevo_grafema(id) {
    var [rotation, scale] = get_rotation_scale();
    draw.clear();
    grafema(rotation, scale);
    agregar_svg(id);
}

// Funcion para agregar al ZIP
function agregar_svg(id) {
    zip.file('grafema_' + (id + 1) + '.svg', out);
}

// Función para descargar el ZIP
function descargar_zip() {
    zip.generateAsync({
            type: "blob"
        })
        .then(function(blob) {
            saveAs(blob, "grafemas.zip");
        });
}

// Declara el ZIP como JSZIP, crea x# de grafemas y descarga el ZIP
function graf_batch(cantidad) {
    zip = new JSZip();
    for (var i = 0; i < cantidad; i++) {
        nuevo_grafema(i);
    }
    descargar_zip();
}

// Si hace click en el botón, crea y descarga los archivos
const descargar = document.getElementById("boton_descargar")
    .addEventListener("click", function() {
        var cantidad = document.getElementById('cantidad_numero').value;
        graf_batch(cantidad);
    });

// Si hace click en el botón, crea un símbolo
const generar = document.getElementById("boton_crear")
    .addEventListener("click", function() {
        var [rotation, scale] = get_rotation_scale();
        draw.clear();
        grafema(rotation, scale);
    });

// Si cambia los sliders, crean un símbolo
const rot_slider = document.getElementById("rotacion_graf")
    .addEventListener("input", function() {
        var [rotation, scale] = get_rotation_scale();
        draw.clear();
        grafema(rotation, scale);
    });

const scale_slider = document.getElementById("tamaño_graf")
    .addEventListener("input", function() {
        var [rotation, scale] = get_rotation_scale();
        draw.clear();
        grafema(rotation, scale);
    });

// Siempre empieza la cantidad en 1, tamaño en 0.5 y rotacion en 0
window.onload = function() {
    document.getElementById("cantidad_numero").value = "1";
    document.getElementById("tamaño_graf").value = "0.5";
    document.getElementById("rotacion_graf").value = "0";
}

// Todo bien
console.log('Corriendo');